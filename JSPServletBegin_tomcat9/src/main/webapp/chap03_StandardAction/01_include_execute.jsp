<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	int price = 500;
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>JSP 표준액션 중 include 에 대해서 알아봅니다.</title>
</head>
<body>
	<h3>책소개</h3>
   	도서명 : 난중일기<br/>
   	저자 : 이순신<br/>
   	페이지: 300페이지<br/>
   	<br>
   	
   	<%-- include directive(지시어)인 <%@ include  %> 을 사용한것은 소스파일을 끼워넣어주는 것이다. --%>
<%--
   	<div>
   		<%@ include file= "01_include.jsp"%>
   		==> 오류 발생함. 왜냐하면 지역변수 price 가 중복되었으므로.
   	</div>
--%>
	<hr>
	
   	<%-- JSP 표준액션(standard action)중 include 액션을 사용한것은 실행결과물을 끼워넣어주는 것이다. --%>
   	
   	<div>
   		<jsp:include page="01_include.jsp" />
   		<%-- 오류가 발생하지 않는다. 실행결과물만 끼워 넣어주므로 --%>
   	</div>

   	
</body>
</html>