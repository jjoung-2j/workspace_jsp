<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<jsp:include page="../header1.jsp" />

<script type="text/javascript" src="${pageContext.request.contextPath}/js/myshop/categoryListJSON.js"></script>
<%-- === HIT 상품을 모두 가져와서 디스플레이(스크롤 방식으로 페이징 처리한 것) === --%>
	<div>
      	<p class="h3 my-3 text-center">- HIT 상품(스크롤) -</p>
	</div>
	
<jsp:include page="../footer1.jsp" />