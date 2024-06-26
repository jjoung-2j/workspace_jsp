package member.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberVO;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;
import my.util.Myutil;

public class MemberList extends AbstractController {

	private MemberDAO mdao = null;
	
	public MemberList() {
		mdao = new MemberDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		// 로그인 또는 로그아웃을 하면 시작페이지로 가는 것이 아니라 방금 보았던 그 페이지로 그대로 가기 위한 것임.
		// super.goBackURL(request);	// 넣으면 안되는데 실수로 넣은경우 로그아웃가서 admin 인 경우를 변경해주어야 한다.
		
		// === 관리자(admin)로 로그인 했을 때만 회원조회가 가능하도록 해야 한다. === //
		
		HttpSession session = request.getSession();
		MemberVO login_user = (MemberVO) session.getAttribute("login_user");
		
		if(login_user != null && "admin".equals(login_user.getUserid())) {
			// 관리자(admin) 으로 로그인 했을 경우
			
			String searchType = request.getParameter("searchType");
			String searchWord = request.getParameter("searchWord");
			String sizePerPage = request.getParameter("sizePerPage");
			String currentShowPageNo = request.getParameter("currentShowPageNo");
			
			// System.out.println(currentShowPageNo);
			
			if(searchType == null 
				|| ("name".equals(searchType) && "userid".equals(searchType) && "email".equals(searchType))) {
	        	 searchType = "";
	        }
	        if(searchWord == null
	        		|| (searchWord != null && searchWord.trim().isBlank())) {	// 11 이상 버전 isBlank, 8버전 isEmpty
	        	 searchWord = "";
	        }
	        // || 와 && 가 만나면 && 먼저이지만 확실히 하기 위해 () 해주기!!
	        if(sizePerPage == null
					|| (!"10".equals(sizePerPage) && !"5".equals(sizePerPage) && !"3".equals(sizePerPage))) {
					sizePerPage = "10";
			}
	        if(currentShowPageNo == null) {
	        	currentShowPageNo = "1";
	        }
	        /*
	        System.out.println("==========");
	        System.out.println(searchType);
	        System.out.println(searchWord);
	        System.out.println(sizePerPage);
	        System.out.println(currentShowPageNo);
	        */
	        
			Map<String,String> paraMap = new HashMap<>();
			
			paraMap.put("searchType", searchType);
			paraMap.put("searchWord", searchWord);
			
			// === 페이징 처리를 안한 모든 회원 또는 검색한 회원 목록 보여주기 === //
			// List<MemberVO> memberList = mdao.select_Member_nopaging(paraMap);
			
			//////////////////////////////////////////////////////////////////////////
			
			// === 페이징 처리를 한 모든 회원 또는 검색한 회원 목록 보여주기 === //
			paraMap.put("currentShowPageNo", currentShowPageNo);
			paraMap.put("sizePerPage", sizePerPage);	// 한 페이지당 보여줄 행의 개수
			
			request.setAttribute("sizePerPage", sizePerPage);

			// === 페이징 처리를 위한 검색이 있는 또는 검색이 없는 회원에 대한 총 페이지 수 알아오기 === //
	     	int totalPage = mdao.getTotalPage(paraMap);
	        
	     	// System.out.println("~~~ 확인용 totalPage => " + totalPage);
	     	
	     	// === GET 방식이므로 사용자가 웹브라우저 주소창에서 currentShowPageNo 에 totalPage 값 보다 더 큰값을 입력하여 장난친 경우
	        // === GET 방식이므로 사용자가 웹브라우저 주소창에서 currentShowPageNo 에 0 또는 음수를 입력하여 장난친 경우
	        // === GET 방식이므로 사용자가 웹브라우저 주소창에서 currentShowPageNo 에 숫자가 아닌 문자열을 입력하여 장난친 경우 
	        // 아래처럼 막아주도록 하겠다.
	     	
	     	try {
	     		
	     		if(Integer.parseInt(currentShowPageNo) > totalPage
	     				|| Integer.parseInt(currentShowPageNo) <= 0) {
	     			currentShowPageNo = "1";
	     			paraMap.put("currentShowPageNo", currentShowPageNo);		
	     		}

	     	} catch(NumberFormatException e) {
	     		currentShowPageNo = "1";
	     		paraMap.put("currentShowPageNo", currentShowPageNo);
	     	}	// end of try~catch-----------------------
	     	
	     	// =========================================================================== //
	     	/*
	          1개 블럭당 10개씩 잘라서 페이지 만든다.
	          1개 페이지당 3개행 또는 5개행 또는 10개행을 보여주는데
	              만약에 1개 페이지당 5개행을 보여준다라면 
	              총 몇개 블럭이 나와야 할까? 
	              총 회원수가 207명 이고, 1개 페이지당 보여줄 회원수가 5 이라면
	          207/5 = 41.4 ==> 42(totalPage)        
	              
	          1블럭               1 2 3 4 5 6 7 8 9 10 [다음][마지막]
	          2블럭   [맨처음][이전] 11 12 13 14 15 16 17 18 19 20 [다음][마지막]
	          3블럭   [맨처음][이전] 21 22 23 24 25 26 27 28 29 30 [다음][마지막]
	          4블럭   [맨처음][이전] 31 32 33 34 35 36 37 38 39 40 [다음][마지막]
	          5블럭   [맨처음][이전] 41 42 
	       */
	      
	      // ==== !!! pageNo 구하는 공식 !!! ==== // 
	     	// ★ => 페이지에서 맨처음 시작되는 수를 구하는 것 ★
	   /*
	       1  2  3  4  5  6  7  8  9  10  -- 첫번째 블럭의 페이지번호 시작값(pageNo)은  1 이다.
	       11 12 13 14 15 16 17 18 19 20  -- 두번째 블럭의 페이지번호 시작값(pageNo)은 11 이다.   
	       21 22 23 24 25 26 27 28 29 30  -- 세번째 블럭의 페이지번호 시작값(pageNo)은 21 이다.
	       
	        currentShowPageNo        pageNo  ==> ( (currentShowPageNo - 1)/blockSize ) * blockSize + 1 
	       ---------------------------------------------------------------------------------------------
	              1                   1 = ( (1 - 1)/10 ) * 10 + 1 
	              2                   1 = ( (2 - 1)/10 ) * 10 + 1 
	              3                   1 = ( (3 - 1)/10 ) * 10 + 1 
	              4                   1 = ( (4 - 1)/10 ) * 10 + 1  
	              5                   1 = ( (5 - 1)/10 ) * 10 + 1 
	              6                   1 = ( (6 - 1)/10 ) * 10 + 1 
	              7                   1 = ( (7 - 1)/10 ) * 10 + 1 
	              8                   1 = ( (8 - 1)/10 ) * 10 + 1 
	              9                   1 = ( (9 - 1)/10 ) * 10 + 1 
	             10                   1 = ( (10 - 1)/10 ) * 10 + 1 
	              
	             11                  11 = ( (11 - 1)/10 ) * 10 + 1 
	             12                  11 = ( (12 - 1)/10 ) * 10 + 1
	             13                  11 = ( (13 - 1)/10 ) * 10 + 1
	             14                  11 = ( (14 - 1)/10 ) * 10 + 1
	             15                  11 = ( (15 - 1)/10 ) * 10 + 1
	             16                  11 = ( (16 - 1)/10 ) * 10 + 1
	             17                  11 = ( (17 - 1)/10 ) * 10 + 1
	             18                  11 = ( (18 - 1)/10 ) * 10 + 1 
	             19                  11 = ( (19 - 1)/10 ) * 10 + 1
	             20                  11 = ( (20 - 1)/10 ) * 10 + 1
	              
	             21                  21 = ( (21 - 1)/10 ) * 10 + 1 
	             22                  21 = ( (22 - 1)/10 ) * 10 + 1
	             23                  21 = ( (23 - 1)/10 ) * 10 + 1
	             24                  21 = ( (24 - 1)/10 ) * 10 + 1
	             25                  21 = ( (25 - 1)/10 ) * 10 + 1
	             26                  21 = ( (26 - 1)/10 ) * 10 + 1
	             27                  21 = ( (27 - 1)/10 ) * 10 + 1
	             28                  21 = ( (28 - 1)/10 ) * 10 + 1 
	             29                  21 = ( (29 - 1)/10 ) * 10 + 1
	             30                  21 = ( (30 - 1)/10 ) * 10 + 1                    

	    */
	     	String pageBar = "";
	     	
	     	int blockSize = 10;
	     	// blockSize 는 블럭(토막)당 보여지는 페이지 번호의 개수이다.
	     	
	     	int loop = 1;
	     	// loop 는 1 부터 증가하여 1개 블럭을 이루는 페이지번호의 개수(지금은 10개)까지만 증가하는 용도이다.
	     	
	   /*
	     	// ==== !!! pageNo 구하는 공식 !!! ==== // 
	       	1  2  3  4  5  6  7  8  9  10  -- 첫번째 블럭의 페이지번호 시작값(pageNo)은  1 이다.
	       	11 12 13 14 15 16 17 18 19 20  -- 두번째 블럭의 페이지번호 시작값(pageNo)은 11 이다.   
	       	21 22 23 24 25 26 27 28 29 30  -- 세번째 블럭의 페이지번호 시작값(pageNo)은 21 이다.
	       
	        currentShowPageNo        pageNo  ==> ( (currentShowPageNo - 1)/blockSize ) * blockSize + 1 
	   */
	     	// 페이징바에서 보여지는 첫번째 번호
	     	int pageNo = ((Integer.parseInt(currentShowPageNo) - 1)/ blockSize ) * blockSize + 1 ;
	     	
	     	// === ★★★★★ 페이징 바 만들기 시작 ★★★★★ === //
	     	
	     	// === [맨처음] [이전] 만들기 === //
	     	if(pageNo != 1) {
	     		pageBar += "<li class='page-item'><a class='page-link' href='memberList.up?searchType="+searchType+"&searchWord="+searchWord+"&sizePerPage="+sizePerPage+"&currentShowPageNo=1'>[맨처음]</a></li>";
	     		pageBar += "<li class='page-item'><a class='page-link' href='memberList.up?searchType="+searchType+"&searchWord="+searchWord+"&sizePerPage="+sizePerPage+"&currentShowPageNo="+(pageNo-1)+"'>[이전]</a></li>";
	     	}
	     	
	     	while(!(loop > blockSize || pageNo > totalPage)) {
	     		
	     		if(pageNo==Integer.parseInt(currentShowPageNo)) {
	     			pageBar += "<li class='page-item active'><a class='page-link' href='#'>"+pageNo+"</a></li>";
	     		}
	     		else {
	     			pageBar += "<li class='page-item'><a class='page-link' href='memberList.up?searchType="+searchType+"&searchWord="+searchWord+"&sizePerPage="+sizePerPage+"&currentShowPageNo="+pageNo+"'>"+pageNo+"</a></li>";
	     		}
	     		
	     		loop++;		// 1 2 3 4 5 6 7 8 9 10
	     		pageNo++;	//  1  2  3  4  5  6  7  8  9 10
     						// 11 12 13 14 15 16 17 18 19 20
				     		// 21 22 23 24 25 26 27 28 29 30
				     		// 31 32 33 34 35 36 37 38 39 40
	     					// 마지막 페이지가 42 이므로 그 뒤는 나오면 안된다.
	     		
	     	}	// end of while()-----------
	     	
	     	// === [다음] [마지막] 만들기 === //
	     	if(pageNo <= totalPage) {	// 맨마지막 페이지가 아니라면
	     		pageBar += "<li class='page-item'><a class='page-link' href='memberList.up?searchType="+searchType+"&searchWord="+searchWord+"&sizePerPage="+sizePerPage+"&currentShowPageNo="+pageNo+"'>[다음]</a></li>";
	     		pageBar += "<li class='page-item'><a class='page-link' href='memberList.up?searchType="+searchType+"&searchWord="+searchWord+"&sizePerPage="+sizePerPage+"&currentShowPageNo="+totalPage+"'>[마지막]</a></li>";
	     	}
	     	request.setAttribute("pageBar", pageBar);
	     	// === 페이징 바 만들기 끝 === //
			
			/////////////////////////////////////////////////////////////////////////
			
	     	// *** ====== 현재 페이지를 돌아갈 페이지(goBackURL)로 주소 지정하기 ======= *** //
	     	String currentURL = Myutil.getCurrentURL(request);
	     	
	     	// 회원조회를 했을시 현재 그 페이지로 그대로 되돌아가길 위한 용도로 쓰임.
	     	// System.out.println("currentURL => " + currentURL);
	     	// currentURL => /member/memberList.up?searchType=name&searchWord=%EC%9C%A0&sizePerPage=5&currentShowPageNo=15
	     	
	     	/////////////////////////////////////////////////////////////////////////
	     	
			List<MemberVO> memberList = mdao.select_Member_paging(paraMap);
			
			request.setAttribute("memberList", memberList);
			
			if(searchType != null 
					&& ("name".equals(searchType) || "userid".equals(searchType) || "email".equals(searchType))) {
				request.setAttribute("searchType", searchType);
	        }
	        if(searchWord != null
	        		&& !searchWord.trim().isBlank()) {	// 11 이상 버전 isBlank, 8버전 isEmpty
	        	request.setAttribute("searchWord", searchWord);
	        }
			
	        ///////////////////////////////////////////////////////////////////////////////
	        
	        // >>> 뷰단(memberList.jsp)에서 "페이징 처리시 보여주는 순번 공식" 에서 사용하기 위해 
	        // === 검색이 있는 또는 검색이 없는 회원의 총개수 알아오기 시작 === //
	        int totalMemberCount = mdao.getTotalMemberCount(paraMap);
	        
	        // System.out.println("### 확인용 totalMemberCount : " + totalMemberCount);
	        /*
	        	그냥 회원목록 클릭시 -> ### 확인용 totalMemberCount : 209
				회원명 유 입력시 -> ### 확인용 totalMemberCount : 102
				회원명 변 입력시 -> ### 확인용 totalMemberCount : 100
	        */
	        request.setAttribute("currentShowPageNo", currentShowPageNo);
	        request.setAttribute("totalMemberCount", totalMemberCount);
	        
	        // === 검색이 있는 또는 검색이 없는 회원의 총개수 알아오기 끝 === //
	        
	        ////////////////////////////////////////////////////////////////////////////////
	     	
	        // === 돌아가야 할 페이지 지정 === //
	        request.setAttribute("currentURL", currentURL);
	        
			// super.setRedirect(false);
			super.setViewPage("/WEB-INF/member/admin/memberList.jsp");
			
		}
		else {
	         // 로그인을 안한 경우 또는 일반사용자로 로그인 한 경우 
	         String message = "관리자만 접근이 가능합니다.";
	         String location = "javascript:history.back()";
	         
	         request.setAttribute("message", message);
	         request.setAttribute("location", location);
	         
	         // super.setRedirect(false);
	         super.setViewPage("/WEB-INF/msg.jsp");
	   }
	}	// end of public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception-------

}
