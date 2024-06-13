package member.controller;

import java.sql.SQLException;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberVO;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class MemberEditEnd extends AbstractController {

	private MemberDAO mdao = null;
	
	public MemberEditEnd() {
		mdao = new MemberDAO_imple();
	}	
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String method = request.getMethod(); // "GET" 또는 "POST" 
		
		if("POST".equalsIgnoreCase(method)) {
           // **** POST 방식으로 넘어온 것이라면 **** //
		
		   String userid = request.getParameter("userid");	
		   String name = request.getParameter("name");
		   String pwd = request.getParameter("pwd");
		   String email = request.getParameter("email");
    	   String hp1 = request.getParameter("hp1");
		   String hp2 = request.getParameter("hp2");
		   String hp3 = request.getParameter("hp3");
 		   String postcode = request.getParameter("postcode");
		   String address = request.getParameter("address");
		   String detailaddress = request.getParameter("detailaddress");
		   String extraaddress = request.getParameter("extraaddress");
			
		   String mobile = hp1+hp2+hp3;
			
		   MemberVO member = new MemberVO();
		   member.setUserid(userid);
		   member.setPwd(pwd);
		   member.setName(name);
		   member.setEmail(email);
		   member.setMobile(mobile);
		   member.setPostcode(postcode);
		   member.setAddress(address);
		   member.setDetailaddress(detailaddress);
		   member.setExtraaddress(extraaddress);
			
		   // === 회원수정이 성공되어지면 "회원정보 수정 성공!!" 이라는 alert 를 띄우고 시작페이지로 이동한다. === //
		   String message = "";
		   String location = "";
			
			try {
				int n = mdao.updateMember(member); 
				
				if(n==1) {
					
					// !!!! session 에 저장된 loginuser 를 변경된 사용자의 정보값으로 변경해주어야 한다. !!!!
					HttpSession session = request.getSession();
					MemberVO login_user = (MemberVO) session.getAttribute("login_user");
					
					login_user.setName(name);
					login_user.setPwd(pwd);
					login_user.setEmail(email);
					login_user.setMobile(mobile);
					login_user.setPostcode(postcode);
					login_user.setAddress(address);
					login_user.setDetailaddress(detailaddress);
					login_user.setExtraaddress(extraaddress);
					
					message = "회원정보 수정 성공!!";
					location = request.getContextPath()+"/index.up"; // 시작페이지로 이동한다.
				}
			} catch(SQLException e) {
				message = "SQL구문 에러발생";
				location = "javascript:history.back()"; // 자바스크립트를 이용한 이전페이지로 이동하는 것. 
				e.printStackTrace();
			}
			
			request.setAttribute("message", message);
			request.setAttribute("location", location);
			
			request.setAttribute("memberEditEnd", true);
			
			// super.setRedirect(false); 
			super.setViewPage("/WEB-INF/msg.jsp");
		}		
		
	}

}
