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
<title>두개의 수를 입력받아서 곱셈하기</title>
<script type="text/javascript" src="<%= ctxPath%>/chap04_JSTL/01_set/js/01.js"></script>
</head>
<body>
	<form name="myFrm">
      <p>
         첫번째 수 : <input type="text" name="firstNum" size="5" maxlength="5" /><br/>
         두번째 수 : <input type="text" name="secondNum" size="5" maxlength="5" /><br/>
         <br>
         <button type="button" onclick="goSubmit()">계산하기</button> 
         <button type="reset">취소</button> 
      </p>
   </form>
</body>
</html>