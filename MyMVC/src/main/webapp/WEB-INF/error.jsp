<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	String ctxPath = request.getContextPath();
	//	/MyMVC
%>

<%-- 같은 경로이기 때문에 그냥 header1.jsp 작성 --%>
<jsp:include page="header1.jsp"></jsp:include>
<div class="container">
	<p class="h2 text-danger mt-4">장애발생</p>
    <img src="<%= ctxPath%>/images/error.gif" class="img-fluid" /> <%-- 반응형 이미지 --%>
    <p class="h4 text-primary mt-3">빠른 복구를 위해 최선을 다하겠습니다</p>
</div>
<jsp:include page="footer1.jsp"></jsp:include>