package member.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberVO;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class MemberEdit extends AbstractController {

	private MemberDAO mdao = null;
	
	// 기본생성자
	public MemberEdit() {
		mdao = new MemberDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String method = request.getMethod();
		
		HttpSession session = request.getSession();
		MemberVO login_user = null;
		
		if("GET".equalsIgnoreCase(method)) {
			if(super.checkLogin(request)) {		// 로그인을 했으면
				
				String userid = request.getParameter("userid");
				
				login_user = (MemberVO) session.getAttribute("login_user");
				
				if(login_user.getUserid().equals(userid)) {		// 로그인한 사용자가 자신의 정보을 수정하는 경우 
					request.setAttribute("name", login_user.getName());
					request.setAttribute("email", login_user.getEmail());
								
					request.setAttribute("h1", login_user.getMobile().substring(0, 3));
					request.setAttribute("h2", login_user.getMobile().substring(3, 7));
					request.setAttribute("h3", login_user.getMobile().substring(7));
					
					request.setAttribute("postcode", login_user.getPostcode());
					request.setAttribute("address", login_user.getAddress());
					request.setAttribute("detailaddress", login_user.getDetailaddress());
					request.setAttribute("extraaddress", login_user.getExtraaddress());
					
					// super.setRedirect(false);
		            super.setViewPage("/WEB-INF/member/memberEdit.jsp");
				}
				else {		// 로그인한 사용자가 다른 사용자의 코인을 충전하려고 시도하는 경우 
		            String message = "다른 사용자의 정보 변경은 불가합니다.!!";
		            String location = "javascript:history.back()";
		            
		            request.setAttribute("message", message);
		            request.setAttribute("location", location);
		            
		            // super.setRedirect(false);
		            super.setViewPage("/WEB-INF/msg.jsp");
				}
				
			}
			else {	// 로그인을 안했으면 
		         String message = "회원정보를 수정 하기 위해서는 먼저 로그인을 하세요!!";
		         String location = "javascript:history.back()";
		         
		         request.setAttribute("message", message);
		         request.setAttribute("location", location);
		         
		         // super.setRedirect(false);
		         super.setViewPage("/WEB-INF/msg.jsp");
			}	// end of if~else-------------
		}
		else {	// "POST" 방식
			String name = request.getParameter("name");
			String email = request.getParameter("email");
			String hp1 = request.getParameter("hp1");
			String hp2 = request.getParameter("hp2");
			String hp3 = request.getParameter("hp3");
			String postcode = request.getParameter("postcode");
			String address = request.getParameter("address");
			String detailaddress = request.getParameter("detailaddress");
			String extraaddress = request.getParameter("extraaddress");
		
			String mobile = hp1 + hp2 + hp3;
			
			Map<String,String> paraMap = new HashMap<>();
			
			login_user = (MemberVO) session.getAttribute("login_user");
			
			paraMap.put("userid", login_user.getUserid());
			paraMap.put("name", name);
			paraMap.put("email", email);
			paraMap.put("mobile", mobile);
			paraMap.put("postcode", postcode);
			paraMap.put("address", address);
			paraMap.put("detailaddress", detailaddress);
			paraMap.put("extraaddress", extraaddress);
			
			try {
				
				int n = mdao.updateInfo(paraMap);	// return 타입 int
			
				if(n==1) {
					
					MemberVO member = new MemberVO();
					member.setName(paraMap.get("name"));
					member.setEmail(paraMap.get("email"));
					member.setMobile(paraMap.get("mobile"));
					member.setPostcode(paraMap.get("postcode"));
					member.setAddress(paraMap.get("address"));
					member.setDetailaddress(paraMap.get("detailaddress"));
					member.setExtraaddress(paraMap.get("extraaddress"));
					
					String message = "회원정보 성공!!";
					String location = "javascript:history.go(0)";
				
					login_user.setName(member.getName());
					login_user.setEmail(member.getEmail());
					login_user.setMobile(member.getMobile());
					login_user.setPostcode(member.getPostcode());
					login_user.setAddress(member.getAddress());
					login_user.setDetailaddress(member.getDetailaddress());
					login_user.setExtraaddress(member.getExtraaddress());
					
					request.setAttribute("message", message);
					request.setAttribute("location", location);
					
				}
				
			}catch(SQLException e) {
				e.printStackTrace();
				
				String message = "회원정보 수정 실패ㅠㅠ";
				String location = "javascript:history.back()";	// 자바스크립트를 이용한 이전페이지로 이동하는 것
				
				request.setAttribute("message", message);
				request.setAttribute("location", location);
				
			}	// end of try~catch------------
			
			super.setRedirect(false);	// forward
			super.setViewPage("/WEB-INF/msg.jsp");
		}
	}

}
