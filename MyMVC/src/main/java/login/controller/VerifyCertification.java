package login.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class VerifyCertification extends AbstractController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// VerifyCertification 호출한 클래스 PwdFind.jsp
		String method = request.getMethod();
		
		if("POST".equalsIgnoreCase(method)) {
			
			// === 작성한 인증코드 === //
			String userCertificationCode = request.getParameter("userCertificationCode");
			
			// === 작성한 userid === //
			String userid = request.getParameter("userid");
			
			// === 세션 불러오기 === //
        	HttpSession session = request.getSession();
        	String certification_code = (String)session.getAttribute("certification_code");	// object 타입 string 으로 casting
        	
        	String message = "";
        	String location = "";
        	if(certification_code.equals(userCertificationCode)) {
        		message = "인증 성공되었습니다.";
        		location = request.getContextPath() + "/login/pwdUpdateEnd.up?userid=" + userid;
        	}
        	else {
        		message = "발급된 인증코드가 아닙니다.\\n인증코드를 다시 발급받으세요!!";
        		// alert의 줄바꿈 => \\n
        		location = request.getContextPath() + "/login/pwdFind.up";
        	}
        	
        	request.setAttribute("message", message);
        	request.setAttribute("location", location);
        	
        	super.setRedirect(false);
        	super.setViewPage("/WEB-INF/msg.jsp");
        	
        	// !!!! 중요 !!!! //
            // !!!! 세션에 저장된 인증코드 삭제하기 !!!! //
        	session.removeAttribute(certification_code);
			// [참고] session.invalidate();	// session 에 있는 모든 것을 없앤다.
        	
		}	// end of if("POST".equalsIgnoreCase(method))-------------

	}

}
