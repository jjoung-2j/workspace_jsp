package member.model;

import java.sql.SQLException;

import member.domain.MemberVO;

public interface MemberDAO {

	// 회원가입을 해주는 메소드 (tbl_member 테이블에 insert)
	int registerMember(MemberVO member) throws SQLException;

	// ID 중복검사 (tbl_member 테이블에서 userid 가 존재하면 true 를 리턴해주고, userid 가 존재하지 않으면 false 를 리턴한다)
	boolean idDuplicateCheck(String userid) throws SQLException;

	// Email 중복검사 (tbl_member 테이블에서 email 가 존재하면 true 를 리턴해주고, email 가 존재하지 않으면 false 를 리턴한다)
	boolean EmailDuplicateCheck(String email) throws SQLException;
	
}
