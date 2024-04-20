<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String ctxPath = request.getContextPath();
	// default : /JSPServletBegin
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>세개의 문자열를 입력받아서 같은지 다른지 검사하기</title>
<script type="text/javascript" src="<%= ctxPath%>/js/jquery-3.7.1.min.js"></script>
<script type="text/javascript" src="<%= ctxPath%>/chap04_JSTL/02_if/js/01.js"></script>
</head>
<body>
	<form name="myFrm" action="if_result_02.jsp">
      첫번째 입력란 : <input type="text" name="first" />
      두번째 입력란 : <input type="text" name="second" />
       세번째 입력란 : <input type="text" name="third" /> 
      <br>
      <input type="submit" value="확인" />
      <input type="reset" value="취소" /> 
   </form>
</body>
</html>