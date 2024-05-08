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

public class MemberList extends AbstractController {

	private MemberDAO mdao = null;
	
	public MemberList() {
		mdao = new MemberDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		// === 관리자(admin)로 로그인 했을 때만 회원조회가 가능하도록 해야 한다. === //
		
		HttpSession session = request.getSession();
		MemberVO login_user = (MemberVO) session.getAttribute("login_user");
		
		if(login_user != null && "admin".equals(login_user.getUserid())) {
			// 관리자(admin) 으로 로그인 했을 경우
			
			String searchType = request.getParameter("searchType");
			String searchWord = request.getParameter("searchWord");
			
			if(searchType == null 
				|| ("name".equals(searchType) && "userid".equals(searchType) && "email".equals(searchType))) {
	        	 searchType = "";
	        }
	        if(searchWord == null
	        		|| (searchWord != null && searchWord.trim().isBlank())) {	// 11 이상 버전 isBlank, 8버전 isEmpty
	        	 searchWord = "";
	        }
	        // || 와 && 가 만나면 && 먼저이지만 확실히 하기 위해 () 해주기!!
			
			Map<String,String> paraMap = new HashMap<>();
			
			paraMap.put("searchType", searchType);
			paraMap.put("searchWord", searchWord);
			
			// === 페이징 처리를 안한 모든 회원 또는 검색한 회원 목록 보여주기 === //
			// List<MemberVO> memberList = mdao.select_Member_nopaging(paraMap);
			
			// === 페이징 처리를 한 모든 회원 또는 검색한 회원 목록 보여주기 === //
			String sizePerPage = request.getParameter("sizePerPage");
	        
			if(sizePerPage == null
				|| (!"10".equals(sizePerPage) && !"5".equals(sizePerPage) && !"3".equals(sizePerPage))) {
				sizePerPage = "10";
			}
			
			//////////////////////////////////////////////////////////////////////////
			
			String currentShowPageNo = "1";
			
			paraMap.put("currentShowPageNo", currentShowPageNo);
			paraMap.put("sizePerPage", sizePerPage);	// 한 페이지당 보여줄 행의 개수
			
			request.setAttribute("sizePerPage", sizePerPage);
			
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
