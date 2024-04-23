<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%
    // 컨텍스트 패스명(context path name)을 알아오고자 한다.
    String ctxPath = request.getContextPath();
    // ctxPath ==> /JSPServletBegin 
%> 

<!DOCTYPE html>
<html>
<head>

<%-- Bootstrap 사용 --%>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<title>SQL 장애가 발생한 경우에 보여주는 페이지</title>

<%-- Bootstrap CSS --%>
<link rel="stylesheet" href="<%= ctxPath%>
/bootstrap-4.6.2-dist/css/bootstrap.min.css" type="text/css">

<%-- Optional JavaScript --%>
<script src="<%= ctxPath%>/js/jquery-3.7.1.min.js" type="text/javascript"></script>
<script src="<%= ctxPath%>/bootstrap-4.6.2-dist/js/bootstrap.bundle.min.js" type="text/javascript"></script>

</head>
<body>
	<div class="container py-5">
		<p class="h2 text-danger">장애발생</p>
		<%-- 반응형 이미지 --%>
		<img class="img-fluid" src="<%= ctxPath%>/chap05/images/error.gif">
		<p class="h4 text-primary mt-3">빠른 복구를 위해 최선을 다하겠습니다</p>
	</div>
</body>
</html>