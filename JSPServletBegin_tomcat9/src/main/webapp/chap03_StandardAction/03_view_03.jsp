<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
				<%-- <%= foods%> --%>
				<%-- 고전적인 방식 : java 와 html 혼용하여 설정 --%> 
				<% for(int i=0;i< arr_food.length; i++){ %>
						<img width='76.5px' height='57px' src="<%= ctxPath%>/chap03_StandardAction/images/<%= arr_food[i]%>" />
				<% }%>
			</li>
		</ol>
	</div>
	
	<hr style="border: solid 1px blue;">
	
	<h3>EL을 사용한 것</h3>
	<div>
		<ol>
			<li>성명 : ${requestScope.name}</li>
			<%-- 기본이 requestScope 이므로 ${name} 으로도 사용 가능하다. --%>
			<li>학력 : ${requestScope.school}</li>
			<li>색상 : ${requestScope.color}
				<%-- link css 파일을 하지 않은 경우 --%>
				<div style='display: inline-block; width : 10px; height : 10px; background-color:${requestScope.color}; border-radius: 50%;'></div>
			</li>
			<li>음식 : 
				<%-- ${requestScope.foods} --%>
				<%-- 고전적인 방식 : java 와 html 혼용하여 설정 --%>
				<% for(int i=0;i< arr_food.length; i++){ %>
						<img width='76.5px' height='57px' src="<%= ctxPath%>/chap03_StandardAction/images/<%= arr_food[i]%>" />
				<% }%>
			</li>
		</ol>
	</div>
</body>
</html>