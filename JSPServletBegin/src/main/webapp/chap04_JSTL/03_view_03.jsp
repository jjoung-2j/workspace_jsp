<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%-- === JSTL(JSP Standard Tag Library) 사용하기 --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- 
	c : custom
	http://java.sun.com/jsp/jstl/core 3번째 껄로 잡기
	이것이 실행되기 위해서는 library 에 파일이 존재해야 한다.
--%>

<%
	String ctxPath = request.getContextPath();		// 현재 /JSPServletBegin
	
	String name = (String)request.getAttribute("name");
	String school = (String)request.getAttribute("school");
	String color = (String)request.getAttribute("color");
	String foods = (String)request.getAttribute("foods");
	
	String[] arr_food = (String[])request.getAttribute("arr_food");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>개인 성향 테스트 결과</title>
</head>
<body>

	<h2>개인 성향 테스트 결과</h2>
	
	<h3>스크립틀릿을 사용한 것</h3>
	<div>
		<ol>
			<li>성명 : <%= name%></li>
			<li>학력 : <%= school%></li>
			<li>색상 : <%= color%>
				<%-- link css 파일을 하지 않은 경우 --%> 
				<div style='display: inline-block; width : 10px; height : 10px; background-color:<%= color%>; border-radius: 50%;'></div>
			</li>
			<li>음식 : 
				<%-- <%= foods%>  == ${requestScope.foods} --%>
				<%-- 고전적인 방식 : java 와 html 혼용하여 설정 --%>
				<% for(int i=0;i< arr_food.length; i++){ %>
						<img width='76.5px' height='57px' src="<%= ctxPath%>/chap04_JSTL/images/<%= arr_food[i]%>" />
				<% }%>
			</li>
		</ol>
	</div>
	
	<hr style="border: solid 1px blue;">
	
	<h3>Expression Language(EL) 및 JSTL(JSP Standard Tag Library) 을 사용한 것</h3>
	<div>
		<ol>
			<li>성명 : ${requestScope.name}</li>
			<%-- 기본이 requestScope 이므로 ${name} 으로도 사용 가능하
			
			다. --%>
			<li>학력 : ${requestScope.school}</li>
			<li>색상 : ${requestScope.color}
				<%-- link css 파일을 하지 않은 경우 --%>
				<div style='display: inline-block; width : 10px; height : 10px; background-color:${requestScope.color}; border-radius: 50%;'></div>
			</li>
			<li>음식 : 
				<%-- ${requestScope.foods} --%>
				<%-- 커스텀 액션 --%>
				<c:forEach var="food_img" items="${requestScope.arr_food}">
					<%-- items="${ }" 에 들어오는 것은 배열 또는 List 이다. --%>
					<%-- 반복의 회수는 배열길이 또는 List 의 size 만큼 반복된다. --%>
					<img width='76.5px' height='57px' src="<%= ctxPath%>/chap04_JSTL/images/${food_img}"/>
				</c:forEach>
			</li>
		</ol>
	</div>
</body>
</html>