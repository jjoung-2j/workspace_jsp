package member.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberVO;

public class CoinPurchaseEnd extends AbstractController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		// 원포트(구 아임포트) 결제창을 하기 위한 전제조건은 먼저 로그인을 해야 하는 것이다. 
		if(super.checkLogin(request)) {		// 로그인을 했으면
			
			// ? 뒤에 넘어오는 것
			String userid = request.getParameter("userid");
			
			HttpSession session = request.getSession();
			MemberVO login_user = (MemberVO) session.getAttribute("login_user");
			
			if(login_user.getUserid().equals(userid)) {		// 로그인 한 사용자가 자신의 코인을 수정하는 경우
				
				String coinmoney = request.getParameter("coinmoney");
				// int productPrice = Integer.parseInt(coinmoney);
				
				String productName = "새우깡";
				// int productPrice = 50000;
				
				request.setAttribute("productName", productName);	// 상품명
				// request.setAttribute("productPrice", productPrice);	// 상품가격
				request.setAttribute("productPrice",100);
				
				request.setAttribute("email", login_user.getEmail());
				request.setAttribute("name", login_user.getName());
				request.setAttribute("mobile", login_user.getMobile());
				request.setAttribute("address", login_user.getAddress());
				request.setAttribute("postcode", login_user.getPostcode());
				
				// System.out.println("확인용 email : " + login_user.getEmail());
				// System.out.println("확인용 mobile : " + login_user.getMobile());
								
				request.setAttribute("userid", userid);
				request.setAttribute("coinmoney", coinmoney);
				
				super.setRedirect(false);	// forward
				super.setViewPage("/WEB-INF/member/paymentGateway.jsp");
			}
			else {		// 로그인한 사용자가 다른 사용자의 코인을 충전하려고 결제를 시도하는 경우 
				
	            String message = "다른 사용자의 코인충전 결제 시도는 불가합니다.!!";
	            String location = "javascript:history.back()";
	            
	            request.setAttribute("message", message);
	            request.setAttribute("location", location);
	            
	            // super.setRedirect(false);
	            super.setViewPage("/WEB-INF/msg.jsp");
				
			}	// end of if~else(로그인아이디와 코인충전아이디의 동일 유무)
			
		}
		else {	// 로그인을 안했으면 
	         String message = "코인충전 결제를 하기 위해서는 먼저 로그인을 하세요!!";
	         String location = "javascript:history.back()";
	         
	         request.setAttribute("message", message);
	         request.setAttribute("location", location);
	         
	         // super.setRedirect(false);	// forward
	         super.setViewPage("/WEB-INF/msg.jsp");
		}
	}

}
