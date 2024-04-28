package common.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class IndexController extends AbstractController {

	private ProductDAO pdao = null;

	public IndexController(){
		pdao = new ProductDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		try{
			// === 모든 이미지 리스트 뽑기 === //
			List<ImageVO> imgList = pdao.imageSelectALL();
		    request.setAttribute("imgList",imgList);
		    
		    super.setRedirect(false);
		    super.setViewPage("/WEB-INF/index.jsp");
		} catch(SQLException e){
			super.setRedirect(true);
		    super.setViewPage(request.getContextPath() + "/error.do");
		}

	}

}
