package chap05.oracle.model;

import java.sql.SQLException;
import java.util.List;

import chap05.oracle.domain.PersonDTO_02;

public interface PersonDAO_03 {

	// 개인성향을 입력(insert)해주는 추상메소드(미완성메소드)
	int personRegister(PersonDTO_02 psdto) throws SQLException;
	// insert 이므로 int 타입 return
	// sql 문이 잘못되었을 경우 생각하여 throw 설정

	// tbl_person_interest 테이블에 저장되어진 행(데이터)을 읽어오는(select) 추상메소드(미완성메소드)
	List<PersonDTO_02> selectAll()throws SQLException;

	// tbl_person_interest 테이블에 저장되어진 특정 1개 행(데이터)만 읽어오는(select) 추상메소드(미완성메소드) 
	PersonDTO_02 selectOne(String seq) throws SQLException;

	// tbl_person_interest 테이블에 저장되어진 특정 1개 행(데이터)만 삭제해주는(delete) 추상메소드(미완성메소드)
	int deletePerson(String seq) throws SQLException;

	// tbl_person_interest 테이블에 저장되어진 특정 1개 행(데이터)만 수정해주는(update) 추상메소드(미완성메소드)
	int updatePerson(PersonDTO_02 psdto) throws SQLException;;
	
}
