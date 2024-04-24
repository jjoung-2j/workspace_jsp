package test.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Test2Controller extends AbstractController{

	/* 기본생성자 생략되어져 있음 default 값
	public Test2Controller() {
		// /test1/test2.up
		System.out.println("$$$ 확인용 Test2Controller 클래스 생성자 호출함");
	}
	*/

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		super.setRedirect(true); 	// 페이지 이동
		super.setViewPage(request.getContextPath() + "/test1.up");
		
	}
	
}
