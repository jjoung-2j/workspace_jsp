package chap05.oracle.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import chap05.oracle.domain.PersonDTO_02;

public class PersonDAO_imple_04 implements PersonDAO_03 {

	private Connection conn = MyDBConnection_05.getConn();
	private PreparedStatement pstmt;
	private ResultSet rs;
	
	private void close() {
		try {
			if(rs != null) {
				rs.close();
				rs = null;
			}
			if(pstmt != null) {
				pstmt.close();
				pstmt = null;
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}	// end of try~catch--------
	}	// end of close()------------------------
	
/////////////////////////////////////////////////////////////////////
	
	// 개인성향을 입력(insert)해주는 추상메소드(미완성메소드)
	@Override
	public int personRegister(PersonDTO_02 psdto) throws SQLException {
		
		int n = 0;
		
		try {
			String sql = "insert into tbl_person_interest(seq, name, school, color, food)"
					+ "values(person_seq.nextval, ?,?,?,?)";
			// registerday 와 update 는 현재 사용할 필요가 없다.
			
			// 우편배달부 생성
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, psdto.getName());
			pstmt.setString(2, psdto.getSchool());
			pstmt.setString(3, psdto.getColor());
			
			if(psdto.getFood() != null) {
				pstmt.setString(4, String.join(",",psdto.getFood()));
			}
			else {
				pstmt.setString(4, null);
			}
			
			n = pstmt.executeUpdate();	// insert 이므로 update
			
		}finally {
			close();
		}
		return n;
		
	}	// end of public int personRegister(PersonDTO_02 psdto) throws SQLException-----

/////////////////////////////////////////////////////////////////////////////////////////
	
	// tbl_person_interest 테이블에 저장되어진 행(데이터)을 읽어오는(select) 추상메소드(미완성메소드)
	@Override
	public List<PersonDTO_02> selectAll() throws SQLException {
		
		List<PersonDTO_02> personList = new ArrayList<>();
		
		try {
			
			String sql = " select seq, name, school, color, food "
					+ "     , to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') AS registerday "
					+ "     , nvl(to_char(updateday, 'yyyy-mm-dd hh24:mi:ss'),' ') AS updateday "
					+ " from tbl_person_interest "
					+ " order by seq ";
			
			pstmt = conn.prepareStatement(sql);
			
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				
				PersonDTO_02 psdto = new PersonDTO_02();
				
				psdto.setSeq(rs.getInt("SEQ"));				// 또는 psdto.setName(rs.getString(1));
				psdto.setName(rs.getString("NAME"));		// 또는 psdto.setName(rs.getString(2));
				psdto.setSchool(rs.getString("school"));	// 컬럼name 소문자도 가능
				psdto.setColor(rs.getString("COLOR"));
				
				String foodes = rs.getString("FOOD");
				if(foodes != null) {
					psdto.setFood(foodes.split("\\,"));
				}
				else {
					psdto.setFood(null);
				}
				
				psdto.setRegisterday(rs.getString("REGISTERDAY"));
				
				psdto.setUpdateday(rs.getString("UPDATEDAY"));
				
				personList.add(psdto);
				
			}	// end of while(rs.next())---------
			
		}finally {
			close();
		}
		
		return personList;
		
	}	// end of public List<PersonDTO_02> selectAll() throws SQLException------

/////////////////////////////////////////////////////////////////////////////////////
	
	// tbl_person_interest 테이블에 저장되어진 특정 1개 행(데이터)만 읽어오는(select) 추상메소드(미완성메소드) 
	@Override
	public PersonDTO_02 selectOne(String seq) throws SQLException {

		PersonDTO_02 psdto = null;	// get 방식이기 때문에 new 아닌 null 주기
		
		try {
			
			String sql = " select seq, name, school, color, food "
					+ "     , to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') AS registerday "
					+ "     , nvl(to_char(updateday, 'yyyy-mm-dd hh24:mi:ss'),' ') AS updateday "
					+ " from tbl_person_interest "
					+ " where seq = ? ";
			
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, seq);
			
			rs = pstmt.executeQuery();
			
			if(rs.next()) {		// 나올 값이 1개 뿐
				
				psdto = new PersonDTO_02();
				
				psdto.setSeq(rs.getInt("SEQ"));
				psdto.setName(rs.getString("name"));		
				psdto.setSchool(rs.getString("school"));
				psdto.setColor(rs.getString("color"));
				
				String foodes = rs.getString("food");
				if(foodes != null) {
					psdto.setFood(foodes.split("\\,"));
				}
				else {
					psdto.setFood(null);
				}
				
				psdto.setRegisterday(rs.getString("registerday"));
				
				psdto.setUpdateday(rs.getString("updateday"));
				
			}	// end of if---------
			
		} finally {
			close();
		}
		
		return psdto;
	}	// end of public PersonDTO_02 selectOne(String seq)-------

///////////////////////////////////////////////////////////////////////////
	
	// tbl_person_interest 테이블에 저장되어진 특정 1개 행(데이터)만 삭제해주는(delete) 추상메소드(미완성메소드)
	@Override
	public int deletePerson(String seq) throws SQLException {
		
		int n = 0;
		
		try {
			String sql = " delete from tbl_person_interest "
					+ "    where seq = ? ";
			
			// 우편배달부 생성
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, seq);
			
			n = pstmt.executeUpdate();	// delete 이므로 update
			
		}finally {
			close();
		}
		return n;
		
	}	// end of public int deletePerson(String seq) throws SQLException---------

/////////////////////////////////////////////////////////////////////////////////////
	
	// tbl_person_interest 테이블에 저장되어진 특정 1개 행(데이터)만 수정해주는(update) 추상메소드(미완성메소드)
	@Override
	public int updatePerson(PersonDTO_02 psdto) throws SQLException {
		int n = 0;
		
		try {
			String sql = "update tbl_person_interest set name = ?, school = ?, color = ?, food = ?, updateday = sysdate "
					+ " where seq = ? ";
			
			
			// 우편배달부 생성
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, psdto.getName());
			pstmt.setString(2, psdto.getSchool());
			pstmt.setString(3, psdto.getColor());
	
			if(psdto.getFood() != null) {
				pstmt.setString(4, String.join(",",psdto.getFood()));
			}
			else {
				pstmt.setString(4, null);
			}
			
			pstmt.setInt(5, psdto.getSeq());
			
			n = pstmt.executeUpdate();	// insert 이므로 update
			
		}finally {
			close();
		}
		return n;
	}

}
