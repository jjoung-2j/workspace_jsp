package login.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberVO;

public class Logout extends AbstractController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		// === 로그아웃 처리하기 === //
		HttpSession session = request.getSession();		// 해당 세션 불러오기
	///////////////////////////////////////////////////////////////////////////////////////////
	// 로그아웃을 하면 시작페이지로 가는 것이 아니라 방금 보았던 그 페이지로 그대로 가기 위한 것임. 
	String goBackURL = (String) session.getAttribute("goBackURL");
	
	if(goBackURL != null) {
		goBackURL = request.getContextPath() + goBackURL;
		// System.out.println("확인용 goBackURL => " + goBackURL);
	}
	
	MemberVO login_user = (MemberVO) session.getAttribute("login_user");
	String login_userid = login_user.getUserid();
	
	///////////////////////////////////////////////////////////////////////////	
		
		// 첫번째 방법 : 세션을 그대로 존재하게끔 해두고, 세션에 저장되어진 어떤 값(지금은 로그인 되어진 회원객체)을 삭제하기
		//session.removeAttribute("login_user");
		
	///////////////////////////////////////////////////////////////////////////
		
		// 두번째 방법 : WAS 메모리 상에서 세션에 저장된 모든 데이터를 삭제해버리기 
		session.invalidate();
		
		super.setRedirect(true);
		
		// => 첫번째 : 특정 데이터, 두번째 : 모든 데이터
		if(goBackURL != null && !"admin".equals(login_userid)) {
			// 관리자가 아닌 일반 사용자로 들어와서 돌아갈 페이지가 있다라면 돌아갈 페이지로 돌아간다.
			super.setViewPage(goBackURL);
		}
		else {	// 돌아갈 페이지가 없거나 또는 관리자로 로그아웃을 하면 무조건 /MyMVC/index.up 페이지로 돌아간다.
			super.setViewPage(request.getContextPath() + "/index.up");
		}
	}

}
