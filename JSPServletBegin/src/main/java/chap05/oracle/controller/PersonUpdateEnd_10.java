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

@WebServlet("/personRegisterEnd.do")
public class PersonUpdateEnd_10 extends HttpServlet{

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
			// POST 방식으로 서브밋 되어져온 데이터를 받아서 DB로 보내서 update(수정) 해주어야 한다.
			
			String seq = request.getParameter("seq");	// 수정해야할 회원번호
			String name = request.getParameter("name");
			String school = request.getParameter("school");
			String color = request.getParameter("color");
			String arr_food[] = request.getParameterValues("food");
			
			PersonDTO_02 psdto = new PersonDTO_02();
			psdto.setSeq(Integer.parseInt(seq));
			psdto.setName(name);
			psdto.setSchool(school);
			psdto.setColor(color);
			psdto.setFood(arr_food);
			
			String pathname = "";
			try {
				int n = dao.updatePerson(psdto);	// 회원정보를 수정한다.
				
				if(n==1) {	// 회원정보를 변경한 이후에 변경된 회원정보를 조회해주도록 한다.
					response.sendRedirect(request.getContextPath() + "/personDetail.do?seq=" + seq);
				}
			} catch (SQLException e) {
				e.printStackTrace();
				pathname = "/WEB-INF/chap05/error.jsp";
				
				RequestDispatcher dispatcher = request.getRequestDispatcher(pathname);
				
				dispatcher.forward(request, response);
			}	// end of try~catch-------
			
		}
	}
		
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
}
