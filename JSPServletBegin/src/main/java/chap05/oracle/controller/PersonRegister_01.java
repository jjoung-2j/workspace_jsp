package chap05.oracle.controller;

import java.io.IOException;
import java.sql.SQLException;

import chap05.oracle.domain.PersonDTO_02;
import chap05.oracle.model.PersonDAO_03;
import chap05.oracle.model.PersonDAO_imple_04;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/personRegister.do")
public class PersonRegister_01 extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	// 인터페이스 받아오기
	PersonDAO_03 dao = new PersonDAO_imple_04();

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// "GET" 또는 "POST" 방식 확인
		String method = request.getMethod();
		
		if("GET".equalsIgnoreCase(method)) {
			// == http://localhost:9090/JSPServletBegin/personRegister.do 을 하면 개인성향 입력창(form 태그)을 띄우도록 한다. == //
			
			RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/chap05/personRegister_form.jsp");
//			RequestDispatcher dispatcher = request.getRequestDispatcher("/chap05_mistake/personRegister_form.jsp");
			// 경로는 항상 WEB-INF 에 넣어야 한다. 보안상 문제
			
			dispatcher.forward(request, response);
			
		}
		else {
			// POST 방식으로 http://localhost:9090/JSPServletBegin/personRegister.do 을 호출한 경우이라면 
	        // 서브밋 되어져온 데이터를 받아서 DB로 보내야 한다.
			String name = request.getParameter("name");
			String school = request.getParameter("school");
			String color = request.getParameter("color");
			String arr_food[] = request.getParameterValues("food");
			
			PersonDTO_02 psdto = new PersonDTO_02();
			psdto.setName(name);
			psdto.setSchool(school);
			psdto.setColor(color);
			psdto.setFood(arr_food);
			
			String pathname = "";
			try {
				int n = dao.personRegister(psdto);
				
				if(n==1) {	// 정상적으로 입력된 경우
					pathname = "/WEB-INF/chap05/personRegister_success.jsp";
				}
			} catch (SQLException e) {
				e.printStackTrace();
				pathname = "/WEB-INF/chap05/error.jsp";
			}	// end of try~catch-------
			
			RequestDispatcher dispatcher = request.getRequestDispatcher(pathname);
			
			dispatcher.forward(request, response);
			
		}
		
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
}
