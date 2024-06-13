package myshop.controller;

import java.sql.SQLException;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberVO;
import myshop.model.ProductDAO;
import myshop.model.ProductDAO_imple;

public class DeliverEnd extends AbstractController {

	private ProductDAO pdao = null;

	public DeliverEnd() {
		pdao = new ProductDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String method = request.getMethod();
	      
	      if(!"POST".equalsIgnoreCase(method)) {
	         String message = "비정상적인 경로로 들어왔습니다.";
	         String location = "javascript:history.back();";
	         
	         request.setAttribute("message", message);
	         request.setAttribute("location", location);
	         
	         super.setRedirect(false);
	         super.setViewPage("/WEB-INF/msg.jsp");
	         
	         return; // 종료 
	      }
	      
	      // === 로그인 유무 검사하기 === //
	      if(!super.checkLogin(request)) {
	         request.setAttribute("message", "배송완료를 하시려면 먼저 로그인 부터 하세요!!");
	         request.setAttribute("location", "javascript:history.back()"); 
	         
	      //   super.setRedirect(false);
	         super.setViewPage("/WEB-INF/msg.jsp");
	         return;  // 종료
	      }
	      
	      else {
	         HttpSession session = request.getSession();
	         
	         MemberVO login_user = (MemberVO)session.getAttribute("login_user");
	         String userid = login_user.getUserid();
	         
	         if(!"admin".equals(userid) ) {
	            String message = "접근불가!! 관리자가 아닙니다.";
	            String location = "javascript:history.back()";
	            
	            request.setAttribute("message", message);
	            request.setAttribute("location", location);
	            
	            super.setRedirect(false);
	            super.setViewPage("/WEB-INF/msg.jsp");
	            
	            return;  // 종료
	         }
	         
	         else {
	            // admin(관리자)으로 로그인 한 경우 
	            String[] odrcodeArr = request.getParameterValues("odrcode");
	            String[] pnumArr = request.getParameterValues("pnum"); 
	             
	            
	            StringBuilder sb = new StringBuilder();
	            // sql 문에 이러한 방식으로 들어가게 만들기!!
	        	// 's20240529-33/76','s20240529-31/76', 's20240529-29/76'
	        	// 's20240529-33' 는 주문코드(전표)'이고 /뒤에 붙은 '76' 은 제품번호이다.
	        	// 's20240529-31' 는 주문코드(전표)'이고 /뒤에 붙은 '76' 은 제품번호이다.
	        	// 's20240529-29' 는 주문코드(전표)'이고 /뒤에 붙은 '76' 은 제품번호이다.
	        	// 이것은 오라클에서 주문코드(전표)컬럼||'/'||제품번호 로 하겠다는 말이다.
	        	 
	            
	            for(int i=0; i<odrcodeArr.length; i++) {
	               sb.append("\'"+odrcodeArr[i]+"/"+pnumArr[i]+"\',");
	               // sql 문의 where 절에  fk_odrcode || '/' || fk_pnum in('전표/제품번호','전표/제품번호','전표/제품번호') 을 사용하기 위한 것이다. 
	            }
	            
	            String odrcodePnum = sb.toString();
	            
	            // 맨뒤의 콤마(,)제거하기 
	            odrcodePnum = odrcodePnum.substring(0, odrcodePnum.length()-1); 
	            
	            // System.out.println("~~~ 확인용 odrcodePnum => " + odrcodePnum);
	            // ~~~ 확인용 odrcodePnum => 's20240529-33/76','s20240529-31/76', 's20240529-29/76'
	            
	            // tbl_orderdetail 테이블의 deliverstatus(배송상태) 컬럼의 값을 3(배송완료)로 변경하기
	            int n = 0;
	            
	            try {
	                n = pdao.updateDeliverEnd(odrcodePnum);
	            } catch(SQLException e) {
	               e.printStackTrace();
	            }
	            
	            if(n == odrcodeArr.length) {
	                
	               String message = "선택하신 제품들은 배송완료로 변경되었습니다.";
	               String location = request.getContextPath()+"/shop/orderList.up";
	               
	               request.setAttribute("message", message);
	               request.setAttribute("location", location);
	               
	               super.setRedirect(false);
	               super.setViewPage("/WEB-INF/msg.jsp");
	            }
	            
	            else {
	               String message = "선택하신 제품들은 배송완료로 변경이 실패되었습니다.";
	               String location = "javascript:history.back();";
	               
	               request.setAttribute("message", message);
	               request.setAttribute("location", location);
	               
	               super.setRedirect(false);
	               super.setViewPage("/WEB-INF/msg.jsp");
	            }
	            
	         }
	      
	      }
	
	}

}
