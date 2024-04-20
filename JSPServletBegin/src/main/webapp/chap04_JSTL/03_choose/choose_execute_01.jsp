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
<title>입력한 주민번호를 가지고 성별 파악하기</title>
<script type="text/javascript" src="<%= ctxPath%>/js/jquery-3.7.1.min.js"></script>
<script type="text/javascript" src="<%= ctxPath%>/chap04_JSTL/03_choose/js/01.js"></script>
</head>
<body>
	<form action="choose_result_02.jsp">
      주민번호 : <input type="text" name="jubun" size="14" maxlength="14" />
      <input type="submit" value="확인" />
      <input type="reset" value="취소" /> 
   </form>
</body>
</html>