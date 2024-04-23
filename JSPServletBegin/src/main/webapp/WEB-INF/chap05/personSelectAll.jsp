<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import= "java.util.List, chap05.oracle.domain.PersonDTO_02" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
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

<title>개인성향 모든 정보 출력 페이지</title>

<%-- Bootstrap CSS --%>
<link rel="stylesheet" href="<%= ctxPath%>/bootstrap-4.6.2-dist/css/bootstrap.min.css" type="text/css">
<%-- 사용자 CSS --%>
<link rel="stylesheet" href="<%= ctxPath%>/chap05/css/personSelectAll.css" type="text/css">

<%-- Optional JavaScript --%>
<script src="<%= ctxPath%>/js/jquery-3.7.1.min.js" type="text/javascript"></script>
<script src="<%= ctxPath%>/bootstrap-4.6.2-dist/js/bootstrap.bundle.min.js" type="text/javascript"></script>
<%-- 사용자 JS --%>
<script src="<%= ctxPath%>/chap05/js/personSelectAll.js" type="text/javascript"></script>

</head>
<body>
	<%-- 스크립틀릿 --%>
	<div id="div1">
		<h3>개인성향 모든 정보 출력 페이지(스크립틀릿을 사용하여 작성한 것)</h3>
		<%
			List<PersonDTO_02> personList = (List<PersonDTO_02>)request.getAttribute("personList");
			
			if(personList.size() > 0){%>
				<table>
					<thead>
			            <tr>
			              <th>성명</th>
			              <th>학력</th>
			              <th>색상</th>
			              <th>음식</th>
			              <th>등록일자</th>
			              <th>변경일자</th>
			            </tr>
			        </thead>
			        <tbody>
			        <% for( PersonDTO_02 psdto : personList){ %>
			        	<tr>
			        		<td><span><%= psdto.getSeq()%></span><%= psdto.getName()%></td>
			        		<td><%= psdto.getSchool()%></td>
			        		<td><%= psdto.getColor()%></td>
			        		<%-- 
			        			오류
			        			<td><%= psdto.getFood()%></td>
			        		--%>
			        		<td><%= psdto.getStrFood() %></td>
			        		<td><%= psdto.getRegisterday() %></td>
			        		<td><%= psdto.getUpdateday()%></td>
			        	</tr>
			        <% } // end of for-------------------------%>	
			        </tbody>
				</table>
			<%}
			else{%>
				<span style="color : red;">데이터가 존재하지 않습니다.</span>
			<%}%>
	</div>
	
	<hr style="border: solid 1px red; margin:30px auto; width:80%;">
	
	<%-- JSTL --%>
	<div id="div2">
		<div class="container">
			<h3 class="mb-4">개인성향 모든 정보 출력 페이지(JSTL을 사용하여 작성한 것)</h3>
			<c:if test="${empty requestScope.personList}">
				<span style="color : red;">데이터가 존재하지 않습니다.</span>
			</c:if>
			<c:if test="${not empty requestScope.personList}">
				<table class="table table-hover">
					<thead>
			            <tr>
			              <th>성명</th>
			              <th>학력</th>
			              <th>색상</th>
			              <th>음식</th>
			              <th>등록일자</th>
			              <th>변경일자</th>
			            </tr>
			        </thead>
			        <tbody>
			        	<c:forEach var="psdto" items="${requestScope.personList}">
			        		<tr>
			        			<td><span>${psdto.seq}</span>${psdto.name}</td>
			        			<td>${psdto.school}</td>
			        			<td>${psdto.color}</td>
			        			<td>${psdto.strFood}</td>
			        			<td>${psdto.registerday}</td>
			        			<td>${psdto.updateday}</td>
			        		</tr>
			        	</c:forEach>
			        </tbody>
			   </table>
			</c:if>
			<div class="text-center mt-5">
				<a href="personRegister.do" class= "btn btn-info">개인성향입력하기</a>
			</div>
		</div>
	</div>
</body>
</html>