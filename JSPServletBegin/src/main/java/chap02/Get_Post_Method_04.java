package chap02;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/*
	=== Servlet 이란 ? 웹서비스 기능을 해주는 자바 클래스를 말한다. ===
	
	*** Servlet 이 되기 위한 조건은 3가지 규칙을 따라야 한다. ***
	1. 서블릿(Servlet)은 반드시 
	   javax.servlet.http.HttpServlet 클래스를 부모 클래스로 상속을 받아와야 한다. 
	   (Tomcat 9 까지)
	   
	   jakarta.servlet.http.HttpServlet 클래스를 부모 클래스로 상속을 받아와야 한다.
	   (Tomcat 10 이후 부터 )
	
	2. 웹클라이언트의 요청방식이 GET 방식으로 요청을 해오면
	   doGet() 메소드로 응답을 해주도록 코딩을 해야하고,
	   웹클라이언트의 요청방식이 POST 방식으로 요청을 해오면
	   doPost() 메소드로 응답을 해주도록 코딩을 해주어야만 한다.
	   그러므로  반드시  doGet() 메소드와  doPost() 메소드를 
	   Overriding(재정의)를 해주어야만 한다.
	   
	   doGet() 메소드와 doPost() 메소드의 
	   첫번째 파라미터는 HttpServletRequest 타입이고,
	   두번째 파라미터는 HttpServletResponse 타입이다. 
	           
	3. 만약에  서블릿(Servlet)에서 결과물을 웹브라우저상에 출력하고자 한다라면 
	   doGet() 메소드와 doPost() 메소드 모두 
	   서블릿(Servlet)의 두번째 파라미터인 HttpServletResponse response 를 
	   사용하여 출력해준다.
*/   

public class Get_Post_Method_04 extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		/*
		 	Tomcat 9 까지는
	        post 방식으로 넘어온 데이터중 영어는 글자가 안깨지지만,
	        한글은 글자모양이 깨져나온다. (Tomcat 10 은 해당 사항 없음)
	        그래서 post 방식에서 넘어온 한글 데이터가 글자가 안깨지게 하려면 
	        아래처럼 request.setCharacterEncoding("UTF-8"); 을 해야 한다.
	        주의할 것은 request.getParameter("변수명"); 보다 먼저 기술을 해주어야 한다는 것이다.     
	        get 파라미터 하기 전에 해야 한다 
		 */
		request.setCharacterEncoding("UTF-8");
		
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
		out.println("<h2>개인 성향 테스트 결과 04("+method+")</h2>");
		
		out.printf("<span style='color:purple; font-weight:bold;'>%s</span>님의 개인 성향은<br><br>",name);
		
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
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		doGet(request, response);
	}
	
}
