package member.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberVO;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class MemberOneDetail extends AbstractController {

	private MemberDAO mdao = null;
	
	public MemberOneDetail() {
		mdao = new MemberDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

		// === 관리자(admin)로 로그인 했을때만 조회가 가능하도록 한다. === //
		
		HttpSession session = request.getSession();
		MemberVO login_user = (MemberVO) session.getAttribute("login_user");
		
		if(login_user != null && "admin".equals(login_user.getUserid())) {	// 관리자(admin)로 로그인 했을 경우
		
			String method = request.getMethod();
			
			if("POST".equalsIgnoreCase(method)) {	// POST 방식
				
				String userid = request.getParameter("userid");		// name
				
				// === 돌아갈 페이지 === //
				String goBackURL = request.getParameter("goBackURL");
				
				// System.out.println("goBackURL => " + goBackURL);
				// goBackURL => /member/memberList.up?searchType=name&searchWord=%EC%9C%A0&sizePerPage=5&currentShowPageNo=15
				
				// 입력받은 userid 를 가지고 한명의 회원정보를 리턴시켜주는 메소드
				MemberVO mvo = mdao.selectOneMember(userid);
				
				request.setAttribute("mvo", mvo);
				request.setAttribute("goBackURL", goBackURL);
				
				// super.setRedirect(false);	// forward
		        super.setViewPage("/WEB-INF/member/admin/memberOneDetail.jsp");
			}
		}
		else {	// 로그인을 안하거나 관리자(admin)가 아닌 사용자로 로그인 했을 경우
	         String message = "관리자만 접근이 가능합니다.";
	         String location = "javascript:history.back()";
	         
	         request.setAttribute("message", message);
	         request.setAttribute("location", location);
	         
	         // super.setRedirect(false);	// forward
	         super.setViewPage("/WEB-INF/msg.jsp");
	   }
	}

}
