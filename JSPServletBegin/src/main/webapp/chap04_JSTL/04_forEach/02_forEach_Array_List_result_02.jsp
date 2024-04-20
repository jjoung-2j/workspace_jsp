<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%-- === JSTL(JSP Standard Tag Library) 사용하기 --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
	String ctxPath = request.getContextPath();
	// default : /JSPServletBegin
%>

<!DOCTYPE html>
<html>
<head>
<%-- === Bootstrap === --%>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>친구명단 출력하기</title>
<%-- === Bootstrap === --%>
<link rel="stylesheet" href="<%= ctxPath%>/bootstrap-4.6.2-dist/css/bootstrap.min.css" type="text/css">
</head>
<body>
	<div class="container">
		<c:if test="${empty requestScope.arr_friend_name}">
			<div>
				<span style="color:red;">나는 친구가 없어요 ㅠㅠ</span>
			</div>
		</c:if>
		<c:if test="${not empty requestScope.arr_friend_name}">
			<div>
				<ol>
					<c:forEach var="friend_name" items="${requestScope.arr_friend_name}">
						<%-- items="${ }" 에 들어오는 것은 배열 또는 List 이다. --%>     
	                    <%-- 반복의 회수는 배열길이 또는 List 의 size 만큼 반복된다. --%>
						<li style="color:blue;">${friend_name}</li>
					</c:forEach>
				</ol>
			</div>
		</c:if>
	
		<hr style="border: solid 1px red;">
	
		<div style="border: solid 0px blue; width : 60%; margin : 0 auto;">
			<table class="table table-bordered">
				  <thead>
				    <tr>
				      <th>번호</th>
				      <th>성명</th>
				      <th>학력</th>
				      <th>색상</th>
				      <th>선호음식</th>
				    </tr>
				  </thead>
				  <tbody>
				  	<c:if test="${empty requestScope.person_List}">
				  		<tr>
				  			<td colspan="5" style="text-align:center;">데이터가 없습니다.</td>
				  		</tr>
				  	</c:if>
				  	<c:if test="${not empty requestScope.person_List}">
				  		<c:forEach var="person_dto" items="${requestScope.person_List}" varStatus= "status">
				  			<tr>
				  				<td>${status.count}</td>	<%-- index 는 0부터 / count 는 1부터 --%>
				  				<td>${person_dto.name}</td>		<%-- dto. 뒤에는 get 다음 ~~ 가 들어간다.(소문자) --%>
				  				<td>${person_dto.school}</td>
				  				<td>${person_dto.color}</td>
				  				<td>${person_dto.strFood}</td>
				  			</tr>
				  		</c:forEach>
				  	</c:if>
				  </tbody>
			</table>
		</div>
		
		<hr style="border: solid 1px blue;">
		
		<div style="border: solid 0px blue; width : 60%; margin : 0 auto;">
			<table class="table table-bordered table-dark">
				  <thead>
				    <tr>
				      <th>번호</th>
				      <th>성명</th>
				      <th>성별</th>
				      <th>주소</th>
				    </tr>
				  </thead>
				  <tbody>
				  	<c:if test="${empty requestScope.student_List}">
				  		<tr>
				  			<td colspan="5" style="text-align:center;">데이터가 없습니다.</td>
				  		</tr>
				  	</c:if>
				  	<c:if test="${not empty requestScope.student_List}">
				  		<c:forEach var="map" items="${requestScope.student_List}" varStatus= "status">
				  			<tr>
				  				<td>${status.count}</td>	<%-- index 는 0부터 / count 는 1부터 --%>
				  				<td>${map.irum}</td>		<%-- dto. 뒤에는 get 다음 ~~ 가 들어간다.(소문자) --%>
				  				<td>${map.gender}</td>
				  				<td>${map.address}</td>
				  			</tr>
				  		</c:forEach>
				  	</c:if>
				  </tbody>
			</table>
		</div>
		
	</div>
</body>
</html>