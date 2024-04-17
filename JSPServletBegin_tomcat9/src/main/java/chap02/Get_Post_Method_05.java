package chap02;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*
	-- === 중요 ===
   확장자가 .xml 또는 .java 인 파일에서 URL경로를 나타낼때 맨 앞에 / 가 오면
   그 앞에는  http://ip주소:포트번호/컨텍스트패스명 이 자동으로 붙게 된다.
   우리의 컨텍스트 패스명은  /JSPServletBegin 이다.      
   즉, 우리는  http://localhost:9090/JSPServletBegin/05_get_post_Method.do 으로 된다.
   
   == 배치서술자인 web.xml 에 기술하지 않고 @WebServlet 어노테이션을 사용한 예제 ==
   http://localhost:9099s/JSPServletBegin/05_get_post_Method.do 을 처리해주는 서블릿은 GetPostMethod_05 이다.
*/

@WebServlet("/05_get_post_Method.do")	// JSPServletBegin/05_get_post_Method.do 이렇게 작성시 더블된다.
public class Get_Post_Method_05 extends HttpServlet{

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
		out.println("<h2>개인 성향 테스트 결과 05("+method+")</h2>");
		
		out.printf("<span style='color:yellow; font-weight:bold;'>%s</span>님의 개인 성향은<br><br>",name);
		
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
