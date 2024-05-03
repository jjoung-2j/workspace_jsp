package member.controller;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberVO;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class CoinUpdateLoginUser extends AbstractController {

	private MemberDAO mdao = null;
	
	public CoinUpdateLoginUser() {
		mdao = new MemberDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String method = request.getMethod(); // "GET" 또는 "POST"
		int n = 0;		// json 의 값을 주기 위해 밖으로 뺀다.  
		String message = "";
        String location = "";
		
	      if("POST".equalsIgnoreCase(method)) {
	         // POST 방식이라면
	         
	         String userid = request.getParameter("userid");
	         String coinmoney = request.getParameter("coinmoney");
	         
	         Map<String,String> paraMap = new HashMap<>();
	         
	         paraMap.put("userid", userid);
	         paraMap.put("coinmoney", coinmoney);
	         
	         try {
	        	 
	        	// === 회원의 코인 및 포인트 증가하기 === //
	        	 n = mdao.coinUpdateLoginUser(paraMap);
	        	 
	        	 if(n==1) {
	        		 
	        		 HttpSession session = request.getSession();
	        		 MemberVO login_user = (MemberVO) session.getAttribute("login_user");
	        		 
	        		 // !!!!! 세션값을 변경하기 !!!!! //
	        		 login_user.setCoin(login_user.getCoin() + Integer.parseInt(coinmoney));
	        		 login_user.setPoint(login_user.getPoint() + (int)(Integer.parseInt(coinmoney)*0.01));;
	        		 
	        		 DecimalFormat df = new DecimalFormat("#,###");
	                 // 예를 들면
	                 // System.out.println(df.format(2005100));
	                 //  "2,005,100" 
	        		 
	        		 message = login_user.getName() + "님의 " + df.format(Long.parseLong(coinmoney)) + "원 결제가 완료되었습니다.";
	        		 location = request.getContextPath() + "/index.up";
	        	 }
	        	 
	         } catch(SQLException e) {
	        	 e.printStackTrace();
	        	 message = "코인액 결제가 DB오류로 인해 실패되었습니다.";
	        	 location = "javascript:history.back()";
	         }	// end of try~catch---------------
	         
	         // === JSONObject 사용 이전 === //
	         // request.setAttribute("message", message);
	         // request.setAttribute("location", location);
	         
	         // super.setRedirect(false);	// forward
	         // super.setViewPage("/WEB-INF/msg.jsp");
	         
	      }
	      else {	// POST 방식이 아니라면
	         
	         message = "비정상적인 경로로 들어왔습니다.";
	         location = "javascript:history.back()";
	         
	         // === JSONObject 사용 이전 === //
	         // request.setAttribute("message", message);
	         // request.setAttribute("location", location);
	         
	         // super.setRedirect(false);	// forward
	         // super.setViewPage("/WEB-INF/msg.jsp");
	      }
	      
	      JSONObject jsonObj = new JSONObject();
	      
	      jsonObj.put("n", n);	// {"n":1} 또는 {"n":0}
	      // n 은 객체의 필드 / 1또는 0의 값
	      
	      jsonObj.put("message", message);	// {"n":1, "message":"양혜정님의 300,000원 결제가 완료되었습니다."}
	      jsonObj.put("location", location);// {"n":1, "message":"양혜정님의 300,000원 결제가 완료되었습니다.", "location":"/MYMVC/index.up"}
	
	      String json = jsonObj.toString();
	      // " {"n":1, "message":"양혜정님의 300,000원 결제가 완료되었습니다.", "location":"/MYMVC/index.up"}"
	      request.setAttribute("json", json);
	      
	      super.setRedirect(false);
	      super.setViewPage("/WEB-INF/jsonview.jsp");
	      
	}

}
