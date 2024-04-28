package common.controller;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class FrontController
 */
@WebServlet(
		description = "사용자가 웹에서 *.up 을 했을 경우 이 서블릿이 응답을 해주도록 한다.", 
		urlPatterns = { "*.do" }, 
		initParams = { 
				@WebInitParam(name = "propertyConfig", value = "C:\\NCS\\workspace_jsp\\MyMVC_9\\src\\main\\webapp\\WEB-INF\\Command.properties", description = "*.up에 대한 클래스의 매핑파일")
		})
public class FrontController extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	private Map<String, Object> cmdMap = new HashMap<>();
	
	public void init(ServletConfig config) throws ServletException {
		
		// === 특정 파일에 있는 내용 읽어오기 === //
		FileInputStream fis = null;
		
		String props = config.getInitParameter("propertyConfig");
		// props = Servlet 에 지정한 value 값(location)
		
		try {
			// 읽어오기 위한 용도로 쓰이는 객체
			fis = new FileInputStream(props);
			
			Properties pr = new Properties();
			
			pr.load(fis);
			// fis 객체를 사용하여 props(location 위치의 파일)을 읽어
		    // pr 에 load 한다. ( 왼쪽 key, 오른쪽 value 로 인식 )
			
			Enumeration<Object> en = pr.keys();
			 // pr에 저장한 모든 key 값들 가져오기
			
			while(en.hasMoreElements()) {
				String key = (String)en.nextElement();
				String className = pr.getProperty(key);
				if(className != null) {
					className = className.trim();
					
					 // === 1. 클래스화 === //
					Class<?> cls = Class.forName(className);
					
					// 생성자를 만들 수 있는 객체
					Constructor<?> constrt = cls.getDeclaredConstructor();

					 // === 2. 인스턴스화 === //
					Object obj = constrt.newInstance();
					
					// === 3. Mapping === //
					cmdMap.put(key, obj);
					// url 을 key 로 해서 obj 를 넣어주기
				}	// end of if-------------
			}	// end of while--------------------
		}catch(FileNotFoundException e){
			System.out.println("~~ value값인 properties 파일 location 존재 X");
		} catch(ClassNotFoundException e){
			System.out.println("클래스명의 클래스가 존재 X");
		} catch(Exception e){
			e.printStackTrace();
		}
	}	// end of public void init(ServletConfig config) throws ServletException-----

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// === 웹브라우저 주소창입력 === //
		String uri = request.getRequestURI();
		String key = uri.substring(request.getContextPath().length());
		AbstractController action = (AbstractController) cmdMap.get(key);
		if(action == null){
			System.out.println(">>> " + key + " 은 URI 패턴에 매핑된 클래스는 없습니다. <<<");
		}
		else{
			try{
		    	action.execute(request, response);
		        
		        // === 나만의 loot 지정 === //
		        boolean bool = action.isRedirect();
		       	String viewPage = action.getViewPage();
		        
		        if(!bool){	// => forward
		        	// 특징 : forward 되어진 페이지로 데이터 전달 가능
		        	if(viewPage != null){
		            	RequestDispatcher dispatcher = request.getRequestDispatcher(viewPage);
		                dispatcher.forward(request,response);
		            }
		        }
		        else{	// sendRedirect
		        	// 특징 : 단순 페이지 이동, 데이터 전달 X
		        	if(viewPage != null){
		            	response.sendRedirect(viewPage);
		            }
		        }	// end of if~else------------------
		    } catch(Exception e){
		    	e.printStackTrace();
		    }	// end of try~catch----------
		}	// end of if~else-----------
	}	// end of protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException----

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
