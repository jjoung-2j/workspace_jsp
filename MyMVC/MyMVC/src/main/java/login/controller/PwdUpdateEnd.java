package login.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class PwdUpdateEnd extends AbstractController {

	private MemberDAO mdao = null;
	
	public PwdUpdateEnd() {
		mdao = new MemberDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// PwdUpdateEnd 호출한 클래스는 VerifyCertification
		// 주소 뒤에 ? 를 찍고 userid 를 받아온다.
		String userid = request.getParameter("userid");
		
		String method = request.getMethod(); // "GET" 또는 "POST" 
		
		if("POST".equalsIgnoreCase(method)) {	// "암호 변경하기" 버튼을 클릭했을 경우 
			
			// === POST 방식일 때만 pwd 를 받아온다 === //
			String new_pwd = request.getParameter("pwd");
			
			Map<String,String> paraMap = new HashMap<>();
			
			paraMap.put("userid", userid);
			paraMap.put("new_pwd", new_pwd);
			
			int n = 0;
			try {
				// === 비밀번호 변경 === //
				n = mdao.pwdUpdate(paraMap);
			}catch(SQLException e) {
				
			}
			
			// === 성공유무 확인 (n = 1) 성공 === //
			request.setAttribute("n", n);
			// n ==> 1 또는 n ==> 0
			
		}	// end of 		if("POST".equalsIgnoreCase(method))-------
		
		request.setAttribute("userid", userid);
		request.setAttribute("method", method);
		
		super.setRedirect(false);	// forward
		super.setViewPage("/WEB-INF/login/pwdUpdateEnd.jsp");

	}

}
