package member.model;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
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
					+ " , idle, email, mobile, postcode, address, detailaddress, extraaddress "
					+ " FROM "
					+ " ( "
					+ "    select userid, name, coin, point "
					+ "			, trunc(months_between(sysdate, lastpwdchangedate)) as pwdchangegap "
					+ " 		, trunc(months_between(sysdate, registerday),0) as registerday "
					+ "			, idle, email, mobile, postcode, address, detailaddress, extraaddress "
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
				
				member.setEmail(aes.decrypt(rs.getString("email")));
				member.setMobile(aes.decrypt(rs.getString("mobile")));
				
				member.setPostcode(rs.getString("postcode"));
				member.setAddress(rs.getString("address"));
				member.setDetailaddress(rs.getString("detailaddress"));
				member.setExtraaddress(rs.getString("extraaddress"));
				
			}	// end of if(rs.next())---------------
			
		} catch(UnsupportedEncodingException | GeneralSecurityException e){
			e.printStackTrace();
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
	}	// end of public boolean isUserExist(Map<String, String> paraMap) throws SQLException-----

///////////////////////////////////////////////////////////////////////////////////
	
	// 비밀번호 변경
	@Override
	public int pwdUpdate(Map<String, String> paraMap) throws SQLException {
		
		int result = 0;
		
		try {
			conn = ds.getConnection();	// db 로 부터 땡겨오기
			
			String sql = " update tbl_member set pwd = ?, lastpwdchangedate = sysdate "
					+ " where userid = ? "; 
					
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, Sha256.encrypt(paraMap.get("new_pwd")));		// 단방향 암호화
			pstmt.setString(2, paraMap.get("userid"));
			
	        result = pstmt.executeUpdate();		// return 타입은 int
	        
		} finally {
			close();
		}	// end of try~finally---------------------
		
		return result;
		
	}	// end of public int pwdUpdate(Map<String, String> paraMap) throws SQLException------------

///////////////////////////////////////////////////////////////////////////////////////////////
	
	// === 회원의 코인 및 포인트 증가하기 === //
	@Override
	public int coinUpdateLoginUser(Map<String, String> paraMap) throws SQLException {
		
		int result = 0;
		
		try {
			conn = ds.getConnection();	// db 로 부터 땡겨오기
			
			String sql = " update tbl_member set coin = coin + ?, point = point + ? "
					+ " where userid = ? "; 
					
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setInt(1, Integer.parseInt(paraMap.get("coinmoney")));
			pstmt.setInt(2, (int)(Integer.parseInt(paraMap.get("coinmoney"))*0.01));
			pstmt.setString(3, paraMap.get("userid"));
			
	        result = pstmt.executeUpdate();		// return 타입은 int
	        
		} finally {
			close();
		}	// end of try~finally---------------------
		
		return result;
		
	}	// end of public int coinUpdateLoginUser(Map<String, String> paraMap) throws SQLException---

////////////////////////////////////////////////////////////////
	
	// 정보 수정에서의 이메일 중복 체크
	@Override
	public boolean EmailDuplicateCheck(Map<String, String> paraMap) throws SQLException {
		boolean isExists = false;
		
		try {
			conn = ds.getConnection();
			
			String sql = " select email "
					+ " from tbl_member "
					+ " where userid != ? and email = ? ";
			
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, paraMap.get("userid"));
			pstmt.setString(2, aes.encrypt(paraMap.get("email")));
			
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
	}	// end of public boolean EmailDuplicateCheck(Map<String, String> paraMap) throws SQLException---

///////////////////////////////////////////////////////////////////////////////////////////
	
	// 회원정보 수정
	@Override
	public int updateInfo(Map<String, String> paraMap) throws SQLException {
		int result = 0;
		
		try {
			conn = ds.getConnection();	// db 로 부터 땡겨오기
			
			String sql = " update tbl_member set name = ?, email = ?, mobile = ? "
					+ " , postcode = ?, address = ?, detailaddress = ?, extraaddress = ? "
					+ " where userid = ? "; 
					
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, paraMap.get("name"));
			pstmt.setString(2, aes.encrypt(paraMap.get("email")));
			pstmt.setString(3, aes.encrypt(paraMap.get("mobile")));
			pstmt.setString(4, paraMap.get("postcode"));
			pstmt.setString(5, paraMap.get("address"));
			pstmt.setString(6, paraMap.get("detailaddress"));
			pstmt.setString(7, paraMap.get("extraaddress"));
			pstmt.setString(8, paraMap.get("userid"));
			
	        result = pstmt.executeUpdate();		// return 타입은 int
	        
		} catch(UnsupportedEncodingException | GeneralSecurityException e){
			e.printStackTrace();
		} finally {
			close();
		}	// end of try~finally---------------------
		
		return result;
	}

//////////////////////////////////////////////////////////////////////////////////////////////
	
	// 비밀번호 변경시 현재 사용중인 비밀번호인지 아닌지 알아오기(현재 사용중인 비밀번호 이라면 true, 새로운 비밀번호이라면 false)
	@Override
	public boolean duplicatePwdCheck(Map<String, String> paraMap) throws SQLException {
		
	      boolean isExists = false;
	      
	      try {
	         conn = ds.getConnection();
	         
	         String sql = " select pwd "
	                  + " from tbl_member "
	                  + " where userid = ? and pwd = ? ";
	         
	         pstmt = conn.prepareStatement(sql); 
	         pstmt.setString(1, paraMap.get("userid"));
	         pstmt.setString(2, Sha256.encrypt(paraMap.get("new_pwd")));
	         
	         rs = pstmt.executeQuery();
	         
	         isExists = rs.next(); // 행이 있으면(현재 사용중인 비밀번호) true,
	                               // 행이 없으면(새로운 비밀번호) false
	         
	      } finally {
	         close();
	      }
	      
	      return isExists;            
		      
	}	// end of public boolean duplicatePwdCheck(Map<String, String> paraMap) throws SQLException-------

//////////////////////////////////////////////////////////////////////////////////////////////////
	
	// 회원의 개인 정보 변경하기 
	@Override
	public int updateMember(MemberVO member) throws SQLException {

		int result = 0;
      
		try {
			conn = ds.getConnection();
         
			String sql = " update tbl_member set name = ? "
	                  + "                     , pwd = ? "
	                  + "                     , email = ? "
	                  + "                     , mobile = ? "
	                  + "                     , postcode = ? " 
	                  + "                     , address = ? "
	                  + "                     , detailaddress = ? "
	                  + "                     , extraaddress = ? "
	                  + "                     , lastpwdchangedate = sysdate "
	                  + " where userid = ? ";
                  
			pstmt = conn.prepareStatement(sql);
         
			pstmt.setString(1, member.getName());
			pstmt.setString(2, Sha256.encrypt(member.getPwd()) ); // 암호를 SHA256 알고리즘으로 단방향 암호화 시킨다.
			pstmt.setString(3, aes.encrypt(member.getEmail()) );  // 이메일을 AES256 알고리즘으로 양방향 암호화 시킨다. 
			pstmt.setString(4, aes.encrypt(member.getMobile()) ); // 휴대폰번호를 AES256 알고리즘으로 양방향 암호화 시킨다. 
			pstmt.setString(5, member.getPostcode());
			pstmt.setString(6, member.getAddress());
			pstmt.setString(7, member.getDetailaddress());
			pstmt.setString(8, member.getExtraaddress());
			pstmt.setString(9, member.getUserid());
                  
			result = pstmt.executeUpdate();
         
		} catch(GeneralSecurityException | UnsupportedEncodingException e) {
			e.printStackTrace();
		} finally {
			close();
		}
      
		return result;      
      
   }// end of public int updateMember(MemberVO member) throws SQLException---------

//////////////////////////////////////////////////////////////////////////
	
	// 페이징 처리를 안한 모든 회원 또는 검색한 회원 목록 보여주기
	@Override
	public List<MemberVO> select_Member_nopaging(Map<String,String> paraMap) throws SQLException {
		
		// 아이디		회원명	이메일	성별
		
		List<MemberVO> memberList = new ArrayList<>();
		
		try {
	         conn = ds.getConnection();
	         /* 관리자를 제외한 모든 회원 검색
	         String sql = "select userid, name, email, gender "
	         		+ " from tbl_member "
	         		+ " where userid != 'admin' "
	         		+ " order by registerday desc ";
	         */
	         
	         String sql = "select userid, name, email, gender "
	         		+ " from tbl_member "
	         		+ " where userid != 'admin' ";
	         		
	         // 검색 대상에 따라 where 절 추가문을 다르게 하기
	         String colname = paraMap.get("searchType");
	         String searchWord = paraMap.get("searchWord");
	         
	         if(colname != null && !colname.trim().isEmpty()
		        && searchWord != null && !searchWord.trim().isEmpty()) {
		         
	        	 if("email".equals(paraMap.get("searchType"))){		// 검색 대상이 이메일 인 경우
		        	 
	        		 searchWord = aes.encrypt(paraMap.get("searchWord"));
		         }
		         
		         // 컬럼명과 테이블명은 위치홀더(?)로 사용하면 꽝!!! 이다.
		         // 위치홀더(?)로 들어오는 것은 컬럼명과 테이블명이 아닌 오로지 데이터값만 들어온다.!!!!
		         sql += " and " + colname + " like '%' || ? || '%' ";
	         
		         sql += " order by registerday desc ";
		         
		         pstmt = conn.prepareStatement(sql); 
		         
		         pstmt.setString(1, searchWord);
	         }
	         else {
	        	 sql += " order by registerday desc ";
		         
		         pstmt = conn.prepareStatement(sql);
	         }
	         
	         rs = pstmt.executeQuery();
	         
	         while(rs.next()) {
	        	 MemberVO member = new MemberVO();
	        	 
	        	 member.setUserid(rs.getString("userid"));
	        	 member.setName(rs.getString("name"));
	        	 member.setEmail(aes.decrypt(rs.getString("email")));
	        	 member.setGender(rs.getString("gender"));
	         
	        	 memberList.add(member);
	         }
	         
	      } catch(GeneralSecurityException | UnsupportedEncodingException e) {
	    	  e.printStackTrace();
	      } finally {
	    	  close();
	      }
		return memberList;
		
	}	// end of public List<MemberVO> select_Member_nopaging() throws SQLException------

/////////////////////////////////////////////////////////////////////////////////////////////	

	// 페이징 처리를 한 모든 회원 또는 검색한 회원 목록 보여주기
	@Override
	public List<MemberVO> select_Member_paging(Map<String, String> paraMap) throws SQLException {
		
		List<MemberVO> memberList = new ArrayList<>();
		
		try {
	         conn = ds.getConnection();
	         
	         String sql = " SELECT rno, userid, name, email, gender "
	         		+ " FROM "
	         		+ " ( "
	         		+ "    select rownum as rno "
	         		+ "        , userid, name, email, gender "
	         		+ "    from "
	         		+ "    ( "
	         		+ "        select userid, name, email, gender "
	         		+ "        from tbl_member "
	         		+ "        where userid != 'admin' ";
	         		
	         // 검색 대상에 따라 where 절 추가문을 다르게 하기
	         String colname = paraMap.get("searchType");
	         String searchWord = paraMap.get("searchWord");
	         int currentShowPageNo = Integer.parseInt(paraMap.get("currentShowPageNo"));
	         int sizePerPage = Integer.parseInt(paraMap.get("sizePerPage"));
	         
	         if(colname != null && !colname.trim().isEmpty()
		        && searchWord != null && !searchWord.trim().isEmpty()) {	// 검색이 있는 경우
		         
	        	 if("email".equals(paraMap.get("searchType"))){		// 검색 대상이 이메일 인 경우
		        	 
	        		 searchWord = aes.encrypt(paraMap.get("searchWord"));
		         }
		         
		         // 컬럼명과 테이블명은 위치홀더(?)로 사용하면 꽝!!! 이다.
		         // 위치홀더(?)로 들어오는 것은 컬럼명과 테이블명이 아닌 오로지 데이터값만 들어온다.!!!!
		         sql += " and " + colname + " like '%' || ? || '%' ";
	         
		         sql += " order by registerday desc "
	        	 		+ "    ) V "
	        	 		+ " ) T "
	        	 		+ " WHERE rno between ? and ? ";
		        
		         /*
		         	=== 페이징 처리 공식 ===
					where RNO between (조회하고자하는페이지번호 * 한페이지당보여줄행의개수) - (한페이지당보여줄행의개수 - 1) and (조회하고자하는페이지번호 * 한페이지당보여줄행의개수);
		         */
		         
		         pstmt = conn.prepareStatement(sql); 
		         
		         pstmt.setString(1, searchWord);
		         pstmt.setInt(2, (currentShowPageNo * sizePerPage) - (sizePerPage - 1));
		         pstmt.setInt(3, (currentShowPageNo * sizePerPage));
		         
	         }
	         else {		// 검색이 없는 경우
	        	 sql += " order by registerday desc "
	        	 		+ "    ) V "
	        	 		+ " ) T "
	        	 		+ " WHERE rno between ? and ? ";
		         
		         pstmt = conn.prepareStatement(sql);
		         
		         pstmt.setInt(1, (currentShowPageNo * sizePerPage) - (sizePerPage - 1));
		         pstmt.setInt(2, (currentShowPageNo * sizePerPage));
		         
	         }	// end of if~else(검색유무)--------------
	         
	         rs = pstmt.executeQuery();
	         
	         while(rs.next()) {
	        	 MemberVO member = new MemberVO();
	        	 
	        	 member.setUserid(rs.getString("userid"));
	        	 member.setName(rs.getString("name"));
	        	 member.setEmail(aes.decrypt(rs.getString("email")));
	        	 member.setGender(rs.getString("gender"));
	         
	        	 memberList.add(member);
	         }
	         
	      } catch(GeneralSecurityException | UnsupportedEncodingException e) {
	    	  e.printStackTrace();
	      } finally {
	    	  close();
	      }
		return memberList;
		
	}	// end of public List<MemberVO> select_Member_paging(Map<String, String> paraMap) throws SQLException------

//////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// === 검색이 있는 또는 검색이 없는 회원의 총개수 알아오기 === //
	@Override
	public int getTotalMemberCount(Map<String, String> paraMap) throws SQLException {
		
		int totalMemberCount = 0;
		
		try {
	         conn = ds.getConnection();
	         
	         String sql = " select count(*) "
	         		+ " from tbl_member "
	         		+ " where userid != 'admin' ";
	         		
	         // 검색 대상에 따라 where 절 추가문을 다르게 하기
	         String colname = paraMap.get("searchType");
	         String searchWord = paraMap.get("searchWord");
	         
	         if(colname != null && !colname.trim().isEmpty()
		        && searchWord != null && !searchWord.trim().isEmpty()) {	// 검색이 있는 경우
		         
	        	 if("email".equals(paraMap.get("searchType"))){		// 검색 대상이 이메일 인 경우
		        	 
	        		 searchWord = aes.encrypt(paraMap.get("searchWord"));
		         }
		         
		         // 컬럼명과 테이블명은 위치홀더(?)로 사용하면 꽝!!! 이다.
		         // 위치홀더(?)로 들어오는 것은 컬럼명과 테이블명이 아닌 오로지 데이터값만 들어온다.!!!!
		         sql += " and " + colname + " like '%' || ? || '%' ";
	         
		         pstmt = conn.prepareStatement(sql); 
		         
		         pstmt.setString(1, searchWord);
		         
		         
	         }
	         else {		// 검색이 없는 경우
	        	 
		         pstmt = conn.prepareStatement(sql);
		         
	         }	// end of if~else(검색유무)--------------
	         
	         rs = pstmt.executeQuery();
	         
	         rs.next(); // 존재하지 않는 사람도 검색할 수 있기 때문에 if 문 사용 X
	         
	         totalMemberCount = rs.getInt(1);	// 첫번째 컬럼
	         
	      } catch(GeneralSecurityException | UnsupportedEncodingException e) {
	    	  e.printStackTrace();
	      } finally {
	    	  close();
	      }
		return totalMemberCount;
		
	}	// end of public int getTotalMemberCount(Map<String, String> paraMap) throws SQLException---------------

//////////////////////////////////////////////////////////////////////////////////////////
	
	// === 페이징 처리를 위한 검색이 있는 또는 검색이 없는 회원에 대한 총 페이지 수 알아오기 === //
	@Override
	public int getTotalPage(Map<String, String> paraMap) throws SQLException {
		
		int TotalPage = 0;
        
        try {
           conn = ds.getConnection();
           
           String sql = " select ceil(count(*)/?) "
                      + " from tbl_member "
                      + " where userid != 'admin' ";
           
                    
           String colname =  paraMap.get("searchType");
           String searchWord =  paraMap.get("searchWord");
           
           if("email".equals(colname) ) {
              // 검색대상이 email인 경우
              searchWord =  aes.encrypt(searchWord);  
           }
           
           if( (colname != null && !colname.trim().isEmpty()) &&
              (searchWord != null && !searchWord.trim().isEmpty()) ) {
              
              sql += " and "+colname+" like '%'|| ? ||'%' ";
              // 컬럼명과 테이블명은 위치홀더(?)로 사용하면 꽝!!! 이다.
              // 위치홀더(?)로 들어오는 것은 컬럼명과 테이블명이 아닌 오로지 데이터값만 들어온다.!!!!
           }
           
           pstmt = conn.prepareStatement(sql);
           
           pstmt.setInt(1,  Integer.parseInt(paraMap.get("sizePerPage")) );
           
           if( (colname != null && !colname.trim().isEmpty()) &&
                  (searchWord != null && !searchWord.trim().isEmpty()) ) {
              // 검색이 있는 경우
              pstmt.setString(2, searchWord);
           }
           
           rs = pstmt.executeQuery();
           
           rs.next();
           TotalPage = rs.getInt(1); //count(*)이 첫번째 컬럼이므로
           
        } catch(GeneralSecurityException | UnsupportedEncodingException e) {
           e.printStackTrace();
        } finally {
           close();
        }
        
        return TotalPage;

	}	// end of public int getTotalPage(Map<String, String> paraMap) throws SQLException----------

////////////////////////////////////////////////////////////////////////////////////////////
	
	// === 입력받은 userid 를 가지고 한명의 회원정보를 리턴시켜주는 메소드 === //
	@Override
	public MemberVO selectOneMember(String userid) throws SQLException {

		MemberVO member = null;
	      
	    try {
	    	conn = ds.getConnection();
	         
	        String sql =  " select userid, name, email, mobile, postcode, address, detailaddress, extraaddress, gender "
	                  + "      , birthday, coin, point, to_char(registerday, 'yyyy-mm-dd') AS registerday "
	                  + " from tbl_member "
	                  + " where status = 1 and userid = ? ";
	                     
	        pstmt = conn.prepareStatement(sql);
	         
	        pstmt.setString(1, userid);
	         
	        rs = pstmt.executeQuery();
	         
	        if(rs.next()) {
	        	member = new MemberVO();
	            
	            member.setUserid(rs.getString(1));
	            member.setName(rs.getString(2));
	            member.setEmail( aes.decrypt(rs.getString(3)) );  // 복호화
	            member.setMobile( aes.decrypt(rs.getString(4)) ); // 복호화
	            member.setPostcode(rs.getString(5));
	            member.setAddress(rs.getString(6));
	            member.setDetailaddress(rs.getString(7));
	            member.setExtraaddress(rs.getString(8));
	            member.setGender(rs.getString(9));
	            member.setBirthday(rs.getString(10));
	            member.setCoin(rs.getInt(11));
	            member.setPoint(rs.getInt(12));
	            member.setRegisterday(rs.getString(13));
	        } // end of if(rs.next())-------------------
	         
	     } catch(GeneralSecurityException | UnsupportedEncodingException e) {
	    	 e.printStackTrace();
	     } finally {
	         close();
	     }
	      
	     return member;
		
	}	// end of public MemberVO selectOneMember(String userid) throws SQLException-------
	
}
