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

	private DataSource ds;
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;

	private AES256 aes;		// 암호화-복호화

	// === 기본 생성자 === //
	public  MemberDAO_imple(){
		try{
	    	Context initContext = new InitialContext();
	        Context envContext = (Context)initContext.lookup("java:/comp/env");
	        ds = (DataSource)envContext.lookup("jdbc/myoracle");
	        aes = new AES256(SecretMyKey.key);
	    } catch(NamingException e){
	    	e.printStackTrace();
	    } catch(UnsupportedEncodingException e){
	    	e.printStackTrace();
	    }	// end of try~catch--------------------------
	}

	// === 자원반납 메소드 === //
	private void close(){
		try{
	    	if(rs != null){
	        	rs.close();
	            rs=null;
	        }
	        if(pstmt != null){
	        	pstmt.close();
	            pstmt=null;
	        }
	        if(conn != null){
	        	conn.close();
	            conn=null;
	        }
	    } catch(SQLException e){
	    	e.printStackTrace();
	    }	// end of try~catch--------
	}	// end of close()----------------
	
	// === 회원가입 === //
	@Override
	public int registerMember(MemberVO member) throws SQLException {
		int result = 0;
	    try{
	    	conn = ds.getConnection();
	        String sql = " insert into 테이블명(userid, pwd, name, ... 컬럼명) "
	        		+ " values( ?, ?, ? ...) ";
	        pstmt = conn.prepareStatement(sql);
	        pstmt.setString(1, member.getUserid());
	        
	        // === SHA256 ( 암호화 ) === // 
	        pstmt.setString(2, Sha256.encrypt(member.getPwd()));
	        
	        pstmt.setString(3, member.getName());
	        
	        // === AES256 ( 암호화 - 복호화 ) === //
	        pstmt.setString(4, aes.encrypt(member.getEmail()));
	        
	        pstmt.setString(5, aes.encrypt(member.getMobile()));
			
			pstmt.setString(6, member.getPostcode());
	        pstmt.setString(7, member.getAddress());
	        pstmt.setString(8, member.getDetailaddress());
	        pstmt.setString(9, member.getExtraaddress());
	        pstmt.setString(10, member.getGender());
	        pstmt.setString(11, member.getBirthday());
	        
	        result = pstmt.executeUpdate();
	    } catch(UnsupportedEncodingException | GeneralSecurityException e){
	    	e.printStackTrace();
	    } finally{
	    	close();
	    }	// end of try~catch~finally-----------------
	    return result;
	}	// end of public int registerMember(MemberVO member) throws SQLException---

}
