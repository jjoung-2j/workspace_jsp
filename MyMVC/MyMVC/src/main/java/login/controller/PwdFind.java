package login.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class PwdFind extends AbstractController {

	private MemberDAO mdao = null;
	
	public PwdFind() {
		mdao = new MemberDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String method = request.getMethod();	// "GET" 또는 "POST"
		
		if("POST".equalsIgnoreCase(method)) {
		
			// 비밀번호 찾기 모델창에서 "찾기" 버튼을 클릭했을 경우
			String userid = request.getParameter("userid");
			String email = request.getParameter("email");
			
			Map<String,String> paraMap = new HashMap<>();
			
			paraMap.put("userid", userid);
			paraMap.put("email", email);
			
			// === 비밀번호 찾기 === //
			boolean isUserExist =  mdao.isUserExist(paraMap);
			// String userid = "jjoung";	// 테스트용
			
			//////////////////////////////////////////////////////////
			// === 이메일 전송 === //
			boolean sendMailSuccess = false; // 메일이 정상적으로 전송되었는지 유무를 알아오기 위한 용도
			
			if(isUserExist) {	// 존재하는 사용자이면
				// 회원으로 존재하는 경우
				
				// 인증키를 랜덤하게 생성하도록 한다.
	            Random rnd = new Random();
	            
	            String certification_code = "";
	            // 인증키는 영문소문자 5글자 + 숫자 7글자 로 만들겠습니다.
	            
	            char randchar = ' ';
	            for(int i=0; i<5; i++) {	// 영문 5글자
	            /*
	                min 부터 max 사이의 값으로 랜덤한 정수를 얻으려면 
	                int rndnum = rnd.nextInt(max - min + 1) + min;
	                   영문 소문자 'a' 부터 'z' 까지 랜덤하게 1개를 만든다.     
	            */   
	               randchar = (char) (rnd.nextInt('z' - 'a' + 1) + 'a');
	               certification_code += randchar;
	            }// end of for---------------------
	            
	            int randnum = 0;
	            for(int i=0; i<7; i++) {	// 숫자 7글자
	            /*
	                min 부터 max 사이의 값으로 랜덤한 정수를 얻으려면 
	                int rndnum = rnd.nextInt(max - min + 1) + min;
	                   영문 소문자 'a' 부터 'z' 까지 랜덤하게 1개를 만든다.     
	            */   
	               randnum = rnd.nextInt(9 - 0 + 1) + 0;
	               certification_code += randnum;
	            }	// end of for---------------------
	            
	            // System.out.println("~~~~ 확인용 certification_code : " + certification_code);
	            // ~~~~ 확인용 certification_code : nnqtp7093673
				
	        //////////////////////////////////////////////////////////////////
	            
	            // === 이메일에 인증번호 전송 === //
	            // 랜덤하게 생성한 인증코드(certification_code)를 비밀번호 찾기를 하고자 하는 사용자의 email 로 전송시킨다.
	            GoogleMail mail = new GoogleMail();
	            
	            try {
	            	
	            	mail.send_certification_code(email, certification_code);
	            	sendMailSuccess = true;		// 메일 전송 성공
	            	
	            	// === 세션 불러오기 === //
	            	HttpSession session = request.getSession();
	            	session.setAttribute("certification_code", certification_code);
	            	// 발급한 인증코드를 세션에 저장 (다른 클래스나 jsp 파일에서 사용 가능)
	            	
	            }catch(Exception e) {
	            	// 메일 전송이 실패한 경우 
	                e.printStackTrace();
	                sendMailSuccess = false; // 메일 전송 실패
	            }	// end of try~catch--------------
	            
			}	// end of if(isUserExist)------------------
			
		///////////////////////////////////////////////////////////////
			// DB 에 저장할 위치 파악을 위해 userid setAttribute 해주기
			// 현재 인증코드가 어디로 발송된지 표시하기 위해 email setAttribute 해준다.
			request.setAttribute("userid", userid);
			request.setAttribute("email", email);
			request.setAttribute("isUserExist", isUserExist);
			request.setAttribute("sendMailSuccess", sendMailSuccess);
			
		}	// end of if("POST".equalsIgnoreCase(method))-------
		
		request.setAttribute("method", method);
		
		super.setRedirect(false); 	// forward
		super.setViewPage("/WEB-INF/login/pwdFind.jsp");
	}

}
