package member.model;

import java.sql.SQLException;

import member.domain.MemberVO;

public interface MemberDAO {

	// === 회원가입 === //
	int registerMember(MemberVO member) throws SQLException;
}
