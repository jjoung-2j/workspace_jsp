package chap04;

import java.io.IOException;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/registerPerson2.do")
public class RegisterPerson extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String method = request.getMethod();	// GET 또는 POST
		
		if("post".equalsIgnoreCase(method)) {
			
			String name = request.getParameter("name");
			String school = request.getParameter("school");
			String color = request.getParameter("color");
			String[] arr_food = request.getParameterValues("food");
			
			// String foods = String.join(",", arr_food);
			
			// request 는 저장소 역할
			request.setAttribute("name", name);	
			request.setAttribute("school", school);	
			request.setAttribute("color", color);	
			// request.setAttribute("foods", foods);	
			request.setAttribute("arr_food", arr_food);
			
			RequestDispatcher dispatcher = request.getRequestDispatcher("chap04_JSTL/03_view_03.jsp");	
			
			dispatcher.forward(request, response);
			
		}
		else {		// GET 방식으로 들어온 경우
			// System.out.println("=== 확인용 : 접근을 금지합니다. ===");
			
//			RequestDispatcher dispatcher = request.getRequestDispatcher("chap03_StandardAction/03_forbidden_02.jsp");	
			// ip:포트번호/dynamic web file name 생략되어 있다.
			// 결과물을 보여줄 jsp 파일 이름
			RequestDispatcher dispatcher = request.getRequestDispatcher("chap04_JSTL/03_useBean_form_execute_01.jsp");
			// 처음 회원가입 모습으로 보여주는것도 가능하다
			
			dispatcher.forward(request, response);	// 경로 위치에 있는 화면을 표현하기
			// request 를 넘겨주는 것이 없더라도 
			// 무조건 dispatcher.forward(request, response) 형식으로 작성해야 한다.
			// 하나의 문법!
			
		}
		
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
}
