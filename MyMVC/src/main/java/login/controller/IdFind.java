package login.controller;

import java.util.HashMap;
import java.util.Map;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class IdFind extends AbstractController {

	private MemberDAO mdao = null;
	
	public IdFind() {
		mdao = new MemberDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String method = request.getMethod();	// "GET" 또는 "POST"
		
		if("POST".equalsIgnoreCase(method)) {
		
			// 아이디 찾기 모델창에서 "찾기" 버튼을 클릭했을 경우
			String name = request.getParameter("name");
			String email = request.getParameter("email");
			
			Map<String,String> paraMap = new HashMap<>();
			
			paraMap.put("name", name);
			paraMap.put("email", email);
			
			// === 아이디 찾기 === //
			String userid = mdao.findUserid(paraMap);
			// String userid = "jjoung";	// 테스트용
			
			if(userid != null) {
				request.setAttribute("userid", userid);
			}
			else {
				request.setAttribute("userid", "존재하지 않습니다.");
			}	// end of if~else-----------
			
			request.setAttribute("name", name);
			request.setAttribute("email", email);
			
		}	// end of if("POST".equalsIgnoreCase(method))-------
		
		request.setAttribute("method", method);
		
		super.setRedirect(false); 	// forward
		super.setViewPage("/WEB-INF/login/idFind.jsp");

	}

}
