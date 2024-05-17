package common.controller;

import java.sql.SQLException;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import myshop.domain.ImageVO;
import myshop.model.*;

public class IndexController extends AbstractController {

	private ProductDAO pdao = null; 
	
	// 계속 반복해서 쓰지 않고 한번에 호출
	public IndexController() {
		
		pdao = new ProductDAO_imple();
		// System.out.println("~~~~ 확인용 IndexController 생성자 호출함.");
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		try {
		
			List<ImageVO> imgList = pdao.imageSelectAll();
			request.setAttribute("imgList", imgList);
			
			super.setRedirect(false);	// 값을 담아서 이동하므로 false
			super.setViewPage("/WEB-INF/index.jsp");
			// super.setViewPage("/template_orgin.jsp");	// 확인용
		
		}catch(SQLException e) {
			e.printStackTrace();
			super.setRedirect(true);	// 주소이동이므로
			super.setViewPage(request.getContextPath() + "/error.up");
			
			/*
				super.setRedirect(false);
				super.setViewPage("/WEB-INF/error.jsp");
				이렇게 진행할 경우
				주소는 변경되지 않고 화면만 변경된다.
				=> URL 은 /index.up 그대로 유지된다.
				그렇기 때문에 주소이동을 해주는 것이 좋다.
			*/
			
		}

	}

}
