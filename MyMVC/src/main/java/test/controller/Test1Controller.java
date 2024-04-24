package test.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Test1Controller extends AbstractController{

	/* 기본생성자 생략되어져 있음 default 값
	public Test1Controller() {
		// /test1.up
		System.out.println("### 확인용 Test1Controller 클래스 생성자 호출함");
	}
	*/

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setAttribute("name", "양혜정");
		
		// super.setRedirect(false);	// 부모클래스에서 기본값으로 설정되어있다.
		super.setViewPage("/WEB-INF/test/test1.jsp");
	}
	
}
