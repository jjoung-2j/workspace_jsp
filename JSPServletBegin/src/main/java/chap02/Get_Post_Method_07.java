package chap02;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/07_get_post_Method.do")
public class Get_Post_Method_07 extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// request.setCharacterEncoding("UTF-8");	을 주석처리한다.
		
		String name = request.getParameter("name");	// 웹의 기본타입은 String
		String school = request.getParameter("school");
		String color = request.getParameter("color");
		String food_arr[] = request.getParameterValues("food");
		
		// === 콘솔에 출력하여 확인하기 시작 === //
		System.out.println("name => " + name);
		System.out.println("school => " + school);

		if(color == null) {
			color = "없음";
		}
		System.out.println("color => " + color);
		
		if(food_arr != null) {
			for(int i=0; i<food_arr.length; i++) {
				System.out.println("food_arr["+i+"] => " + food_arr[i]);
			}
			String like_foods = String.join(",", food_arr);
			
			System.out.println("like_foods => " + like_foods);
		}
		else {
			System.out.println("좋아하는 음식이 없습니다.");
		}
		// === 콘솔에 출력하여 확인하기 끝 === //
		
		// === 웹브라우저에 출력하여 확인하기 시작 === //
		// HttpServletResponse response 객체는 전송되어져온 데이터를 조작해서 결과물을 나타내고자 할때 쓰인다.
		
		// *** 클라이언트(form 태그가 있는 .jsp 파일)에서 넘어온 method 방식이 GET 인지 POST 인지 알아오기 *** //
		String method = request.getMethod();	// GET 또는 POST
		
		response.setContentType("text/html; charset=UTF-8"); 
		
		PrintWriter out = response.getWriter(); 
		// out 은 웹브라우저에 기술하는 대상체라고 생각하자.
		
		out.println("<html>");
		out.println("<head><title>개인 성향 테스트 결과화면</title></head>");
		out.println("<body>");
		out.println("<h2>개인 성향 테스트 결과 07("+method+")</h2>");
		
		out.printf("<span style='color:navy; font-weight:bold;'>%s</span>님의 개인 성향은<br><br>",name);
		
		if(!"없음".equals(color)) {
			out.printf("학력은 %s이며, %s색을 좋아합니다.<br><br>", school, color);
		}
		else {
			out.printf("학력은 %s이며, 좋아하는 색이 없습니다.<br><br>", school);
		}
		/*
	        %s ==> string  문자열
	        %d ==> decimal 정수
	        %f ==> float   실수 
		*/
		
		String foods = "";
		if(food_arr != null) {
			foods = String.join(",", food_arr) + " 입니다.";
		}
		else {
			foods = "없습니다.";
		}
		out.println("좋아하는 음식은 " + foods);
		
		out.println("</body>");
		out.println("</html>");
	      
		// === 웹브라우저에 출력하여 확인하기 끝 === //
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
