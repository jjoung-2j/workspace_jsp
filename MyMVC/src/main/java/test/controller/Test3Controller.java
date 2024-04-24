package test.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Test3Controller extends AbstractController{

	/* 기본생성자 생략되어져 있음 default 값
	public Test3Controller() {
		// /test3.up
		System.out.println("@@@ 확인용 Test3Controller 클래스 생성자 호출함");
	}
	*/

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setAttribute("center", "쌍용강북교육센터");
		
		// super.setRedirect(false);
		super.setViewPage("/WEB-INF/test/test3.jsp");
	}
	
}
