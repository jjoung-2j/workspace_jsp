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

@WebServlet("/personUpdate.do")
public class PersonUpdate_09 extends HttpServlet{
	
	private static final long serialVersionUID = 1L;
	
	// 인터페이스 받아오기
	PersonDAO_03 dao = new PersonDAO_imple_04();

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
		String method = request.getMethod();	// "GET" 또는 "POST"
		
		if("GET".equalsIgnoreCase(method)) {
			// 사용자가 장난쳐 온 것이므로 URL 이동을 시켜버린다.
			response.sendRedirect(request.getContextPath() + "/personSelect.do");
			// 페이지 강제 이동
			return;
		}
		else {
			// POST 방식으로 서브밋 되어져온 데이터를 받아서 DB로 보내서 delete 해야 한다.
			String seq = request.getParameter("seq");
			String pathname = "";
			
			try {
				// === 특정 회원을 수정하기 전 수정하기전의 회원의 정보를 먼저 알아온다. === //
				
				PersonDTO_02  psdto = dao.selectOne(seq);
				request.setAttribute("psdto", psdto);
				
				pathname = "/WEB-INF/chap05/personUpdate.jsp";
				
			} catch(SQLException e){
				e.printStackTrace();
				pathname = "/WEB-INF/chap05/error.jsp";
			}
			
			RequestDispatcher dispatcher = request.getRequestDispatcher(pathname);
			
			dispatcher.forward(request, response);
			
		}
	}
		
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
