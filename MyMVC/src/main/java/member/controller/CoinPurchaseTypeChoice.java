package member.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberVO;

public class CoinPurchaseTypeChoice extends AbstractController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

		// 코인 충전을 하기 위한 전제조건은 먼저 로그인을 해야 하는 것이다. -> 부모클래스에서 확인
		if(super.checkLogin(request)) {		// 로그인을 했으면
			
			String userid = request.getParameter("userid");
			
			HttpSession session = request.getSession();
			MemberVO login_user = (MemberVO) session.getAttribute("login_user");
			
			if(login_user.getUserid().equals(userid)) {		// 로그인한 사용자가 자신의 코인을 수정하는 경우 
				// super.setRedirect(false);
	            super.setViewPage("/WEB-INF/member/coinPurchaseTypeChoice.jsp");
			}
			else {		// 로그인한 사용자가 다른 사용자의 코인을 충전하려고 시도하는 경우 
	            String message = "다른 사용자의 코인충전 시도는 불가합니다.!!";
	            String location = "javascript:history.back()";
	            
	            request.setAttribute("message", message);
	            request.setAttribute("location", location);
	            
	            // super.setRedirect(false);
	            super.setViewPage("/WEB-INF/msg.jsp");
			}
			
		}
		else {	// 로그인을 안했으면 
	         String message = "코인충전을 하기 위해서는 먼저 로그인을 하세요!!";
	         String location = "javascript:history.back()";
	         
	         request.setAttribute("message", message);
	         request.setAttribute("location", location);
	         
	         // super.setRedirect(false);
	         super.setViewPage("/WEB-INF/msg.jsp");
		}	// end of if~else-------------

	}

}
