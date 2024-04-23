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

@WebServlet("/personDetail.do")
public class PersonDetail_07 extends HttpServlet{

private static final long serialVersionUID = 1L;
	
	// 인터페이스 받아오기
	PersonDAO_03 dao = new PersonDAO_imple_04();

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String seq = request.getParameter("seq");
		
		String pathname = "";
		
		
		try {
			Integer.parseInt(seq);
			
			PersonDTO_02 psdto = dao.selectOne(seq);
			
			if(psdto != null) {
			
				request.setAttribute("psdto", psdto);
			
				pathname = "/WEB-INF/chap05/personDetail.jsp";
			}
			else {
				response.sendRedirect(request.getContextPath()+"/personSelect.do");
				return;
			}
		} catch(SQLException e) {
			e.printStackTrace();
			pathname = "/WEB-INF/chap05/error.jsp";
		} catch(NumberFormatException e) {
			// pathname = "/WEB-INF/chap05/장난치지마.jsp";
			
			// 암기 !! 자바에서 URL 페이지 이동시키기 !! 
			response.sendRedirect(request.getContextPath()+"/personSelect.do");
			// request.getContextPath(); 이 컨텍스트 패스명을 알아오는 것이다. 즉,  /JSPServletBegin 이다.
			
			return;	// 종료
			
		}	// end of try~catch-------------
		
		RequestDispatcher dispatcher = request.getRequestDispatcher(pathname);
		
		dispatcher.forward(request, response);
		
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
}
