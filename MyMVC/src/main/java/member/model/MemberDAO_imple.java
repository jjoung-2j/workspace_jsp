package member.model;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

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
			e.printStackTrace();
		} finally {
			close();
		}
		return isExists;
	}	// end of public boolean EmailDuplicateCheck(String email)--------

/////////////////////////////////////////////////////////////////////////////
	
	// 로그인 처리
	@Override
	public MemberVO login(Map<String, String> paraMap) throws SQLException {
		
		MemberVO member = null;		// 로그인이 성공되어져야만 new 데이터를 넣어줄것!
		
		try {
			
			conn = ds.getConnection();
			
			/* === 로그기록 생성 이전 ===
			String sql = " select userid, name, coin, point "
					+ " from tbl_member "
					+ " where status = 1 and userid = ? and pwd = ? ";
			*/
			
			/* === 자동로그인이 있는 경우 ===
			String sql = " SELECT userid, name, coin, point, pwdchangegap, lastlogingap "
					+ " FROM "
					+ " ( "
					+ "    select userid, name, coin, point"
					+ "		, trunc(months_between(sysdate, lastpwdchangedate)) as pwdchangegap "
					+ "    from tbl_member "
					+ "    where status = 1 and userid = ? and pwd = ? "
					+ " )M "
					+ " CROSS JOIN "
					+ " ( "
					+ "    select trunc(months_between(sysdate, max(logindate)),0) as lastlogingap "
					+ "    from tbl_loginhistory "
					+ "    where fk_userid = ? "
					+ ")H ";
			*/
			
			// 자동로그인이 없는 경우( 현재는 자동로그인이므로 바로 위의 것도 가능 )
			// + idle( 휴면유무 ) 컬럼 추가
			String sql = " SELECT userid, name, coin, point , pwdchangegap "
					+ " , nvl(lastlogingap, registerday) as lastlogingap "
					+ " , idle "
					+ " FROM "
					+ " ( "
					+ "    select userid, name, coin, point "
					+ "			, trunc(months_between(sysdate, lastpwdchangedate)) as pwdchangegap "
					+ " 		, trunc(months_between(sysdate, registerday),0) as registerday "
					+ "			, idle "
					+ "    from tbl_member "
					+ "    where status = 1 and userid = ? and pwd = ? "
					+ " )M "
					+ " CROSS JOIN "
					+ " ( "
					+ "    select trunc(months_between(sysdate, max(logindate)),0) as lastlogingap "
					+ "    from tbl_loginhistory "
					+ "    where fk_userid = ? "
					+ " )H ";
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, paraMap.get("userid"));
			pstmt.setString(2, Sha256.encrypt(paraMap.get("pwd")));
			pstmt.setString(3, paraMap.get("userid"));
			
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				
				member = new MemberVO();
				
				member.setUserid(rs.getString("userid"));
				member.setName(rs.getString("name"));
				member.setCoin(rs.getInt("coin"));
				member.setPoint(rs.getInt("point"));
				
				// === 휴면 계정하기 === //
				if(rs.getInt("lastlogingap") >= 12) {
					// 마지막으로 로그인 한 날짜시간이 현재시각으로 부터 1년이 지났으면 휴면으로 지정
					
					member.setIdle(1);	// MemberVO 의 idle 값 변경(휴면)
					
					if(rs.getInt("idle") == 0) {	// 현재 휴면처리가 안된 회원
						// === tbl_member 테이블의 idle 컬럼의 값을 1로 변경하기 === //
						sql = " update tbl_member set idle = 1 "
								+ " where userid = ? ";
						
						pstmt = conn.prepareStatement(sql);
						
						pstmt.setString(1, paraMap.get("userid"));
						
						pstmt.executeUpdate();
					}
				}
				
				// === 1년 이내 로그인 한 회원은 로그기록에 남기기 === //
				if(rs.getInt("lastlogingap") < 12) {
					// === 휴면이 아닌 회원만 tbl_loginhistory(로그인기록) 테이블에 insert 하기 시작 === //
					sql = " insert into tbl_loginhistory(historyno, fk_userid, clientip) "
							+ " values(seq_historyno.nextval, ?, ?) ";
					
					pstmt = conn.prepareStatement(sql);
					
					pstmt.setString(1, paraMap.get("userid"));
					pstmt.setString(2, paraMap.get("clientip"));
					
					pstmt.executeUpdate();
					// === 휴면이 아닌 회원만 tbl_loginhistory(로그인기록) 테이블에 insert 하기 끝 === //
					
					if(rs.getInt("pwdchangegap") >= 3) {	// 암호를 변경한 지 3개월 이상
						// 마지막으로 암호를 변경한 날짜가 현재시각으로 부터 3개월이 지났으면 true
			            // 마지막으로 암호를 변경한 날짜가 현재시각으로 부터 3개월이 지나지 않았으면 false
						
						// 로그인시 암호를 변경해라는 alert 를 띄우도록 할때 사용한다.
						member.setRequirePwdChange(true); 	// 3개월 지남
					}
				}
				
			}	// end of if(rs.next())---------------
			
		} finally {
			close();
		}
		
		return member;
		
	}	// end of public MemberVO login(Map<String, String> paraMap) throws SQLException---

////////////////////////////////////////////////////////////////////////////////////
	
	// 아이디 찾기(성명, 이메일을 입력받아서 해당 사용자의 아이디를 알려준다)
	@Override
	public String findUserid(Map<String, String> paraMap) throws SQLException {
		
		String userid = null;
		
		try {
			conn = ds.getConnection();
			
			String sql = " select userid "
					+ " from tbl_member "
					+ " where status = 1 and name = ? and email = ? ";
			
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, paraMap.get("name"));
			pstmt.setString(2, aes.encrypt(paraMap.get("email")));
			
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				userid = rs.getString("userid");
			}
			
		} catch(UnsupportedEncodingException | GeneralSecurityException e){
			e.printStackTrace();
		}finally {
			close();
		}
		return userid;
		
	}	// end of public String findUserid(Map<String, String> paraMap) throws SQLException-------

///////////////////////////////////////////////////////////////////////////////
	
	// 비밀번호 찾기(아이디, 이메일을 입력받아서 해당 사용자가 존재하는지 유무를 알려준다.)
	@Override
	public boolean isUserExist(Map<String, String> paraMap) throws SQLException {
		boolean isUserExist = false;
	      
	      try {
	         conn = ds.getConnection();
	         
	         String sql = " select userid "
	                    + " from tbl_member "
	                    + " where status = 1 and userid = ? and email = ? ";
	         
	         pstmt = conn.prepareStatement(sql); 
	         pstmt.setString(1, paraMap.get("userid"));
	         pstmt.setString(2, aes.encrypt(paraMap.get("email")) );
	         
	         rs = pstmt.executeQuery();
	         
	         isUserExist = rs.next();
	         
	      } catch(GeneralSecurityException | UnsupportedEncodingException e) {
	         e.printStackTrace();
	      } finally {
	         close();
	      }
	      
	      return isUserExist;   
	}	// end of public boolean isUserExist(Map<String, String> paraMap)-----
	
}
