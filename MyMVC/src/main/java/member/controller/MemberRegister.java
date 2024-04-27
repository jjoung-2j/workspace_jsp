package member.controller;

import java.sql.SQLException;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import member.domain.MemberVO;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class MemberRegister extends AbstractController {

	private MemberDAO mdao = null;
	
	// 기본생성자
	public MemberRegister() {
		mdao = new MemberDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 회원가입 폼 뷰가 나와야 한다.
		
		String method = request.getMethod();	// "GET" 또는 "POST"
		
		if("GET".equalsIgnoreCase(method)) {
			super.setRedirect(false);
			// super.setViewPage("회원가입폼태그.jsp");
			super.setViewPage("/WEB-INF/member/memberRegister.jsp");
		}
		else {	// post 이라면
		
			// request.getParameter("id");
			// getParameter ~~ dto에 담는다.
			
			String name = request.getParameter("name");
			String userid = request.getParameter("userid");
			String pwd = request.getParameter("pwd");
			String email = request.getParameter("email");
			String hp1 = request.getParameter("hp1");
			String hp2 = request.getParameter("hp2");
			String hp3 = request.getParameter("hp3");
			String postcode = request.getParameter("postcode");
			String address = request.getParameter("address");
			String detailaddress = request.getParameter("detailaddress");
			String extraaddress = request.getParameter("extraaddress");
			String gender = request.getParameter("gender");
			String birthday = request.getParameter("birthday");
		
			String mobile = hp1 + hp2 + hp3;
			
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
			member.setGender(gender);
			member.setBirthday(birthday);
			
			// === 회원가입이 성공되어지면 "회원가입 성공" 이라는 alert 를 띄우고 시작페이지로 이동 === //
			String message = "";
			String location = "";
			
			try {
			
				int n = mdao.registerMember(member);	// return 타입 int
			
				if(n==1) {
					message = "회원가입 성공^-^";
					location = request.getContextPath() + "/index.up";	// 시작페이지로 이동
				}
				
			}catch(SQLException e) {
				message = "회원가입 실패ㅠㅠ";
				location = "javascript:history.back()";	// 자바스크립트를 이용한 이전페이지로 이동하는 것
				e.printStackTrace();
			}
			
			request.setAttribute("message", message);
			request.setAttribute("location", location);
			
			super.setRedirect(false);	// forward
			super.setViewPage("/WEB-INF/msg.jsp");
			
		}	// end of if~else--------------------------------------
		
	}

}
