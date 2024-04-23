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

<title>개인성향 입력한 결과가 성공인 경우에 보여주는 페이지</title>

<%-- Bootstrap CSS --%>
<link rel="stylesheet" href="<%= ctxPath%>
/bootstrap-4.6.2-dist/css/bootstrap.min.css" type="text/css">

<%-- Optional JavaScript --%>
<script src="<%= ctxPath%>/js/jquery-3.7.1.min.js" type="text/javascript"></script>
<script src="<%= ctxPath%>/bootstrap-4.6.2-dist/js/bootstrap.bundle.min.js" type="text/javascript"></script>

</head>
<body>
	<div class="container py-5">
		<p class="h3 mb-3">개인성향 입력 성공</p>
		<a class="btn btn-success" href="<%= ctxPath%>/personSelect.do">입력결과 조회하기</a>
	</div>
</body>
</html>