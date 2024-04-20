<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String firstNum = request.getParameter("firstNum");
	String secondNum = request.getParameter("secondNum");
	int result = Integer.valueOf(firstNum) * Integer.valueOf(secondNum);
%>

<%-- === JSTL(JSP Standard Tag Library) 사용하기 --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%-- === 태그를 사용하여 변수를 선언하기 === --%>
<c:set var = "num1" value="${param.firstNum}"/>		<%-- parameter.name --%>
<c:set var = "num2" value="${param.secondNum}"/>
<c:set var = "result" value="${num1 * num2}"/>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>두개의 수를 입력받아서 곱셈한 결과 출력하기</title>
</head>
<body>
	두개의 수를 입력받아서 곱셈한 결과 출력하기
	<br>
	<%= firstNum%>와 <%= secondNum%>의 곱은 <%= result%>입니다.
	
	<br>
	<hr style='border:solid 1px red;'>
	${param.firstNum}와 ${param.secondNum}의 곱은 ${num1 * num2}입니다.
	
	<br>
	<hr style='border:solid 1px blue;'>
	${num1}와 ${num2}의 곱은 ${result}입니다.
</body>
</html>