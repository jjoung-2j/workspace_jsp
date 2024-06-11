package member.controller;

import org.json.JSONObject;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class EmailDuplicateCheck extends AbstractController {

	private MemberDAO mdao = null;
	
	public EmailDuplicateCheck() {
		mdao = new MemberDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String method = request.getMethod();	// "GET" 또는 "POST"
		
		if("POST".equalsIgnoreCase(method)) {
		
			String email = request.getParameter("email");
			
			// email 의 존재유무 파악
			boolean isExists = mdao.EmailDuplicateCheck(email);
			
			JSONObject jsonObj = new JSONObject();	// {}	// JSONObject import
			
			// {"key":value} => json put 해준다
			jsonObj.put("isExists", isExists);	// {"isExists": true} 또는 {"isExists": false}
			
			// 문자열 형태인 "{"isExists":true}" 또는 "{"isExists":false}" 으로 만들어준다.
			String json = jsonObj.toString();
			
			// System.out.println(">> 확인용 json => " + json);
			/*
				>> 확인용 json => {"isExists":true}
				>> 확인용 json => {"isExists":false}
			*/
			
			request.setAttribute("json", json);
			
			super.setRedirect(false);
			super.setViewPage("/WEB-INF/jsonview.jsp");
		}
		
	}	// end of public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception----

	

}
