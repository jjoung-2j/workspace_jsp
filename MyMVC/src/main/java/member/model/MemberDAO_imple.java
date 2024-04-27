package member.model;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import member.domain.MemberVO;
import util.security.AES256;
import util.security.SecretMyKey;
import util.security.Sha256;

public class MemberDAO_imple implements MemberDAO {

	private DataSource ds;	// DataSource ds 는 아파치톰캣이 제공하는 DBCP(DB Connection Pool)이다.
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	
	private AES256 aes;
	
	// 생성자
	public MemberDAO_imple() {
		try {
			Context initContext = new InitialContext();
		    Context envContext  = (Context)initContext.lookup("java:/comp/env");
		    ds = (DataSource)envContext.lookup("jdbc/myoracle");
		    
		    aes = new AES256(SecretMyKey.key);
		    // SecretMyKey.KEY 은 우리가 만든 암호화/복호화 키이다.
		    
		}catch(NamingException e) {
			e.printStackTrace();
		} catch(UnsupportedEncodingException e){
			e.printStackTrace();
		}
	}
	
	// 사용한 자원을 반납하는 close() 메소드 생성하기 
	private void close() {
		try {
			if(rs != null)    {rs.close();    rs=null;}
			if(pstmt != null) {pstmt.close(); pstmt=null;}
			if(conn != null)  {conn.close();  conn=null;}
		} catch(SQLException e) {
			e.printStackTrace();
		}
	}

///////////////////////////////////////////////////////////////////////////////////
	
	// 회원가입을 해주는 메소드 (tbl_member 테이블에 insert)
	@Override
	public int registerMember(MemberVO member) throws SQLException {
		
		int result = 0;
		
		try {
			conn = ds.getConnection();	// db 로 부터 땡겨오기
			
			String sql = " insert into tbl_member(userid, pwd, name, email, mobile, postcode, address, detailaddress, extraaddress, gender, birthday) " 
	                  + " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) "; 
					
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, member.getUserid());
			
			// 암호를 SHA256 알고리즘으로 단방향 암호화 시킨다.
			pstmt.setString(2, Sha256.encrypt(member.getPwd()) );
			
			pstmt.setString(3, member.getName());
			
			// 이메일을 AES256 알고리즘으로 양방향 암호화 시킨다.
			pstmt.setString(4, aes.encrypt(member.getEmail()));
			// 휴대폰 번호를 AES256 알고리즘으로 양방향 암호화 시킨다.
			pstmt.setString(5, aes.encrypt(member.getMobile()));
			
			pstmt.setString(6, member.getPostcode());
	        pstmt.setString(7, member.getAddress());
	        pstmt.setString(8, member.getDetailaddress());
	        pstmt.setString(9, member.getExtraaddress());
	        pstmt.setString(10, member.getGender());
	        pstmt.setString(11, member.getBirthday());
			
	        result = pstmt.executeUpdate();		// return 타입은 int
	        
		} catch(UnsupportedEncodingException | GeneralSecurityException e){
			e.printStackTrace();
		}	finally {
			close();
		}
		
		return result;
	}	// end of public int registerMember(MemberVO member) throws SQLException------

////////////////////////////////////////////////////////////////////////////////////////////////////	
	
	// ID 중복검사 (tbl_member 테이블에서 userid 가 존재하면 true 를 리턴해주고, userid 가 존재하지 않으면 false 를 리턴한다)
	@Override
	public boolean idDuplicateCheck(String userid) throws SQLException {
		 
		boolean isExists = false;
		
		try {
			conn = ds.getConnection();
			
			String sql = " select userid "
					+ " from tbl_member "
					+ " where userid = ? ";
			
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userid);
			
			rs = pstmt.executeQuery();
			
			isExists = rs.next();
			// 행이 있으면(중복된 userid) true,
            // 행이 없으면(사용가능한 userid) false
			
		}finally {
			close();
		}
		return isExists;
	}	// end of public boolean idDuplicateCheck(String userid) throws SQLException-----

///////////////////////////////////////////////////////////////////////////////////////////
	
	// Email 중복검사 (tbl_member 테이블에서 email 가 존재하면 true 를 리턴해주고, email 가 존재하지 않으면 false 를 리턴한다)
	@Override
	public boolean EmailDuplicateCheck(String email) throws SQLException {
		boolean isExists = false;
		
		try {
			conn = ds.getConnection();
			
			String sql = " select email "
					+ " from tbl_member "
					+ " where email = ? ";
			
			pstmt = conn.prepareStatement(sql);
			
			// pstmt.setString(1, email) 이 아닌 다시 암호화하여 같은지 확인해주어야 한다.
			pstmt.setString(1, aes.encrypt(email));
			
			rs = pstmt.executeQuery();
			
			isExists = rs.next();
			// 행이 있으면(중복된 email) true,
            // 행이 없으면(사용가능한 email) false
			
		} catch(UnsupportedEncodingException | GeneralSecurityException e){
		} finally {
			close();
		}
		return isExists;
	}	// end of public boolean EmailDuplicateCheck(String email)--------
	
}
