package member.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import common.controller.AbstractController;
import member.domain.MemberVO;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class MemberRegister extends AbstractController {

	private MemberDAO mdao = null;

	// === 기본생성자 === //
	public MemberRegister(){
		mdao = new MemberDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String method = request.getMethod();
	    if("GET".equalsIgnoreCase(method)){
	    	super.setRedirect(false);
	        super.setViewPage("/WEB-INF/member/memberRegister.jsp"); 
	    }
	    else{	// "POST"
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
	        member.setName(name);
			member.setEmail(email);
			member.setMobile(mobile);
			member.setPostcode(postcode);
			member.setAddress(address);
			member.setDetailaddress(detailaddress);
			member.setExtraaddress(extraaddress);
			member.setGender(gender);
			member.setBirthday(birthday);
	        
	        // === 회원가입 성공/실패 시 메시지와 이동 === //
	        String message = "";
	        String location = "";
	        
	        try{
	        	int n = mdao.registerMember(member);
	            
	            if(n==1){
	            	message = "회원가입 성공^-^";
	                location = request.getContextPath() + "/index.do";
	            }
	        } catch(SQLException e) {
	        	message = "회원가입 실패ㅠㅠ";
	            location = "javascript:history.back()";	// 이전페이지 이동
	            e.printStackTrace();
	        }	// end of try~catch--------------------
	        
	        request.setAttribute("message",message);
	        request.setAttribute("location",location);
	        
	        super.setRedirect(false);	// forward
	        super.setViewPage("/WEB-INF/msg.jsp");
	        
	    }	// end of if~else--------------

	}	// end of public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception---

}
