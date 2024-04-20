<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%-- === JSTL(JSP Standard Tag Library) 사용하기 --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>forTokens 를 이용하여 친구이름 출력하기, split 함수를 이용하여 친구이름 출력하기</title>
</head>
<body>
	<h2 style="background-color: navy; color: white;">forTokens 를 이용하여 친구이름 출력하기</h2>

	<c:if test="${requestScope.friend_name_1 == null}">
		<div>
			<span style="color:red;">친구가 없으시군요...</span>
		</div>
	</c:if>
	
	<c:if test="${requestScope.friend_name_1 != null}">
		<div>
			<ol>
				<c:forTokens var="name" items="${requestScope.friend_name_1}" delims=",">
					<%-- forTokens 에서 items="${}" 에 들어오는 것은 배열이나 List가 아닌 하나의 문자열이 들어온다. --%>
					<%-- 문자열을 , 로 잘라서 배열로 만들어준다. --%>
					<li>${name}</li>
				</c:forTokens>
			</ol>
		</div>
	</c:if>
	
	<hr style="border: solid 1px red;">
	<%-- ///////////////////////////////////////////////////////////////////////////////// --%>
	
	<c:if test="${empty requestScope.friend_name_2}">
		<div>
			<span style="color:red;">친구가 없으시군요...</span>
		</div>
	</c:if>
	
	<c:if test="${not empty requestScope.friend_name_2}">
		<div>
			<ol>
				<c:forTokens var="name" items="${requestScope.friend_name_2}" delims=",./">
					<%-- forTokens 에서 items="${}" 에 들어오는 것은 배열이나 List가 아닌 하나의 문자열이 들어온다. --%>
					<%-- 문자열을 , 또는 . 또는 / 로 잘라서 배열로 만들어준다. --%>
					<li>${name}</li>
				</c:forTokens>
			</ol>
		</div>
	</c:if>
	
	<hr style="border: solid 1px blue;">
<%-- ///////////////////////////////////////////////////////////////////////////////// --%>
	
	<h2 style="background-color: black; color: yellow;">split 함수를 사용하여 배열로 만든 다음 forEach 를 사용하여 친구이름 출력하기</h2>
	
	<c:if test="${empty requestScope.friend_name_1}">
		<div>
			<span style="color:red;">친구가 없으시군요...</span>
		</div>
	</c:if>
	
	<c:if test="${not empty requestScope.friend_name_1}">
		<c:set var="arr_friend_name_1" value="${fn:split(requestScope.friend_name_1, ',')}" />
		<div>
			<ol>
				<c:forEach var="name" items="${arr_friend_name_1}">
					<li>${name}</li>
				</c:forEach>
			</ol>
		</div>
	</c:if>
	
	<hr style="border: solid 1px red;">
	
	<c:if test="${empty requestScope.friend_name_1}">
		<div>
			<span style="color:red;">친구가 없으시군요...</span>
		</div>
	</c:if>
	
	<c:if test="${not empty requestScope.friend_name_2}">
		<c:set var="arr_friend_name_2" value="${fn:split(requestScope.friend_name_2, ',./')}" />
		<div>
			<ol>
				<c:forEach var="name" items="${arr_friend_name_2}">
					<li>${name}</li>
				</c:forEach>
			</ol>
		</div>
	</c:if>
	
</body>
</html>