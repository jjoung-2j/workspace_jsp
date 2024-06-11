package my.util;

import jakarta.servlet.http.HttpServletRequest;

public class Myutil {

	// *** ? 다음의 데이터까지 포함한 현재 URL 주소를 알려주는 메소드를 생성 *** //
	public static String getCurrentURL(HttpServletRequest request) {
		
		String currentURL = request.getRequestURL().toString();
		
		// System.out.println("currentURL => "+ currentURL);
		// currentURL => http://localhost:9090/MyMVC/member/memberList.up
		
		String queryString = request.getQueryString();
		// System.out.println("queryString => " + queryString);
		// queryString => searchType=name&searchWord=%EC%9C%A0&sizePerPage=5&currentShowPageNo=15
		
		// 실제 인터넷 URI(디코딩 값) 
		// searchType=name&searchWord=유&sizePerPage=5&currentShowPageNo=15
		
		// queryString => null(POST 방식일 경우)
		if(queryString != null) {	// GET 방식일 경우
			currentURL += '?' + queryString;
			// currentURL => http://localhost:9090/MyMVC/member/memberList.up?searchType=name&searchWord=%EC%9C%A0&sizePerPage=5&currentShowPageNo=15
		}
		
		String ctxPath = request.getContextPath();
		// /MyMVC
		
		int beginIndex = currentURL.indexOf(ctxPath) + ctxPath.length();	
		//		27	   =			21				 +		6
		// currentURL.indexOf(ctxPath) => /MyMVC 가 최초로 나오는 숫자
		
		// 돌아갈 페이지 지정
		currentURL = currentURL.substring(beginIndex);
		// System.out.println("currentURL => " + currentURL);
		// currentURL => /member/memberList.up?searchType=name&searchWord=%EC%9C%A0&sizePerPage=5&currentShowPageNo=15
		
		return currentURL;
	}	// end of public static String getCurrentURL(HttpServletRequest request) {----
}