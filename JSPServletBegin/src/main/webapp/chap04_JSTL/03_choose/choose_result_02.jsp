<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%-- === JSTL(JSP Standard Tag Library) 사용하기 --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>choose 를 사용하여 전송되어져온 주민번호를 가지고 성별을 파악한 결과물 출력하기</title>
</head>
<body>
	<c:set var="jubun" value="${param.jubun}"/>
	<c:set var="gender" value="${fn:substring(jubun,7,8)}" />

	주민번호 : ${jubun}<br>

	<c:choose>
		<c:when test="${gender eq '1' or gender eq '3'}">
			남자 입니다.<br>
		</c:when>
		<%--
			<c:when test="${gender eq '2' or gender eq '4'}">
			여자 입니다.<br>
		</c:when>
		--%>
		<c:otherwise>
			여자입니다.<br>
		</c:otherwise>
	</c:choose>
</body>
</html>