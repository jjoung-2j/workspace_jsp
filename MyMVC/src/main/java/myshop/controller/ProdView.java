package myshop.controller;

import java.util.List;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import myshop.domain.ProductVO;
import myshop.model.ProductDAO;
import myshop.model.ProductDAO_imple;

public class ProdView extends AbstractController {

	private ProductDAO pdao = null;

	public ProdView() {
		pdao = new ProductDAO_imple();
	}

	private void redirect(HttpServletRequest request) {
		super.setRedirect(true);
		super.setViewPage(request.getContextPath() + "/shop/mallHomeMore.up");
	}

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

		/////////////////////////////////////////////////////////////
		// === GET 방식 시도 자체를 막는 방법 === //
		String referer = request.getHeader("referer");
		// request.getHeader("referer"); 은 이전 페이지의 URL을 가져오는 것이다.
		
		// System.out.println("referer => " + referer);
		// referer => http://localhost:9090/MyMVC/shop/mallHomeMore.up
		// referer => http://localhost:9090/MyMVC/shop/mallHomeScroll.up
		// referer => null
		
		if(referer == null) {	// 웹브라우저 주소창에 URL 을 직접 입력하고 들어온 경우
			super.setRedirect(true);
			super.setViewPage(request.getContextPath() + "/index.up");
			return;
		}
		/*
			**** GET 방식을 막는 또 다른 방법 ==> 웹브라우저 주소창에서 직접입력하지 못하게 막아버리면 된다. **** //
		    이것의 단점은 웹브라우저에서 북마크(즐겨찾기)를 했을 경우 접속이 안된다는 것이다.
		    왜냐하면 이전 페이지가 없이 웹브라우저 주소창에서 직접입력한 것과 동일하기 때문이다.
		*/
		
		/////////////////////////////////////////////////////////////
		
		// 로그인 또는 로그아웃을 하면 시작페이지로 가는 것이 아니라 방금 보았던 그 페이지로 그대로 가기 위한 것임.
		super.goBackURL(request);
		// 로그인을 하지 않은 상태에서 특정제품을 조회한 후 "장바구니 담기"나 "바로주문하기" 할때와 "제품후기쓰기" 를 할때
		// 로그인 하라는 메시지를 받은 후 로그인 하면 시작페이지로 가는 것이 아니라 방금 조회한 특정제품 페이지로 돌아가기 위한 것임.

		
		String pnum = request.getParameter("pnum"); // 제품번호
		
		try {
			Integer.parseInt(pnum);
		} catch (NumberFormatException e) {
			redirect(request);
			return;
		} // end of try~catch------------

		// 제품번호를 가지고서 해당 제품의 정보를 조회해오기
		ProductVO pvo = pdao.selectOneProductByPnum(pnum);

		if (pvo == null) {
			redirect(request);
			return;
		}

		// 제품번호를 가지고서 해당 제품의 추가된 이미지 정보를 조회해오기
		List<String> imgList = pdao.getImagesByPnum(pnum);

		request.setAttribute("pvo", pvo); // 제품의 정보
		request.setAttribute("imgList", imgList); // 해당 제품의 추가된 이미지 정보

		super.setRedirect(false); // true 와 같이 사용되면 반드시 주석을 풀고 사용해야 한다!!
		super.setViewPage("/WEB-INF/myshop/prodView.jsp");

		
	}

}
