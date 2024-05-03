package member.controller;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberVO;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class EditEmailDuplicateCheck extends AbstractController {

	private MemberDAO mdao = null;
	
	public EditEmailDuplicateCheck() {
		mdao = new MemberDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String method = request.getMethod();	// "GET" 또는 "POST"
		
		if("POST".equalsIgnoreCase(method)) {
		
			String email = request.getParameter("email");
			
			HttpSession session = request.getSession();
			MemberVO login_user = (MemberVO) session.getAttribute("login_user");
			
			String userid = login_user.getUserid();
			
			Map<String,String> paraMap = new HashMap<>();
			
			paraMap.put("email", email);
			paraMap.put("userid", userid);
			
			// email 의 존재유무 파악
			boolean isExists = mdao.EmailDuplicateCheck(paraMap);
			
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

	}

}
