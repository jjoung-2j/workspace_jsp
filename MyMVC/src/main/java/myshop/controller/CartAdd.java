package myshop.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberVO;
import myshop.model.ProductDAO;
import myshop.model.ProductDAO_imple;

public class CartAdd extends AbstractController {

	private ProductDAO pdao = null;
	   
	public CartAdd() {
		pdao = new ProductDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

		// == 로그인 유무 검사하기 == //
	    if( !super.checkLogin(request) ) { //  부모클래스에 checkLogin 이 있음
	    	// 로그인을 하지 않은 상태라면
	        request.setAttribute("message", "장바구니에 담으려면 먼저 로그인 부터 하세요!!");
	        request.setAttribute("location", "javascript:history.back()" ); // 로그인 안하고 장바구니 넣으면
	         
	        // super.setRedirect(false);
	        super.setViewPage("/WEB-INF/msg.jsp");
	         
	        return;
	    }
	    else {	// 로그인을 한 상태이라면 
	           	// 장바구니 테이블(tbl_cart)에 해당 제품을 담아야 한다.
	           	// 장바구니 테이블에 해당 제품이 존재하지 않는 경우에는 tbl_cart 테이블에 insert 를 해야하고, 
	           	// 장바구니 테이블에 해당 제품이 존재하는 경우에는 또 그 제품을 추가해서 장바구니 담기를 한다라면 tbl_cart 테이블에 update 를 해야한다.
	         
	    	String method = request.getMethod();
	         
	        if("POST".equalsIgnoreCase(method)) {	// POST 방식이라면 -> 장바구니에 들어와야만 보여준다.(DB 에 insert)
	            
	        	String pnum = request.getParameter("pnum"); // 제품번호 
	            String oqty = request.getParameter("oqty"); // 주문량
	            
	            HttpSession session = request.getSession();
	            MemberVO login_user = (MemberVO) session.getAttribute("login_user");
	            String userid = login_user.getUserid(); // 사용자ID
	            
	            Map<String, String> paraMap = new HashMap<>(); 
	            paraMap.put("pnum", pnum);
	            paraMap.put("oqty", oqty);
	            paraMap.put("userid", userid);
	            
	            // System.out.println(pnum);
	            // System.out.println(userid);
	            // System.out.println(paraMap.get("userid"));
	            try {
	            	int n = pdao.addCart(paraMap); // insert, update 는 int 
	                                    // 장바구니에 해당사용자의 기존 제품이 없을경우 insert 하고,
	                                       // 장바구니에 해당사용자의 기존 제품이 있을경우 update 한다.
	            
	            	if(n == 1) {
	            		super.setRedirect(true);
	            		super.setViewPage(request.getContextPath() + "/shop/cartList.up");
	            	}
	            }catch(SQLException e) {
	            	e.printStackTrace();
	            	request.setAttribute("message", "장바구니 담기 실패!!");
	                request.setAttribute("location", "javascript:history.back()");
	            
	                // super.setRedirect(false);   
	                super.setViewPage("/WEB-INF/msg.jsp");
	                
	            }	// end of try~catch----------

	        }	// end of "POST"방식-----------------------
	        else {	// GET 방식이라면
            String message = "비정상적인 경로로 들어왔습니다";
            String location = "javascript:history.back()";
               
            request.setAttribute("message", message);
            request.setAttribute("location", location);
              
            // super.setRedirect(false);   
            super.setViewPage("/WEB-INF/msg.jsp");
	        }	// end of if~else(method)----------------
	    }	// end of (로그인 유무)----------------------

	}

}
