<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
	String ctxPath = request.getContextPath();
%>

<%-- 직접 만든 CSS --%>
<link rel="stylesheet" type="text/css" href="<%= ctxPath%>/css/main/main.css" />

<jsp:include page="header.jsp" />

<div class="container">
	<div>
    	<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        	<ol class="carousel-indicators">
            	<c:if test="${not empty requestScope.imgList}">
            		<c:forEach items="${requestScope.imgList}" varStatus="status">
                		<c:if test="${status.index == 0}">
                			<li data-target="#carouselExampleIndicators" data-slide-to="${status.index}" class="active"></li>
                		</c:if>
                		<c:if test="${status.index > 0}">
			  				<li data-target="#carouselExampleIndicators" data-slide-to="${status.index}" ></li>
			  			</c:if>
             		</c:forEach>
            	</c:if>
        	</ol>
            <div class="carousel-inner">
            	<c:if test="${not empty requestScope.imgList}">
			  		<c:forEach var="imgvo" items="${requestScope.imgList}" varStatus="status">
			  			<c:if test="${status.index == 0}">
			  				<div class="carousel-item active">
						    	<img src="<%= ctxPath %>/images/${imgvo.imgfilename}" class="d-block w-100" alt="..."> <!-- d-block 은 display: block; 이고  w-100 은 width 의 크기는 <div class="carousel-item active">의 width 100% 로 잡으라는 것이다. -->
						    	<%-- 상품명 컬럼이 있는 경우
						    	<div class="carousel-caption d-none d-md-block"> <!-- d-none 은 display : none; 이므로 화면에 보이지 않다가, d-md-block 이므로 d-md-block 은 width 가 768px이상인 것에서만 display: block; 으로 보여라는 말이다.  --> 
							  		<h5>Koala</h5>
							    	<p>Koala Content</p>
							  	</div>
							  	--%>
						   	</div>
			  			</c:if>
			  			<c:if test="${status.index > 0}">
			  				<div class="carousel-item">
						    	<img src="<%= ctxPath %>/images/${imgvo.imgfilename}" class="d-block w-100" alt="...">	      
						    </div>
			  			</c:if>
			  		</c:forEach>
			  	</c:if>
             </div>
             <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
			    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span class="sr-only">Previous</span>
			  </a>
			  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
			    <span class="carousel-control-next-icon" aria-hidden="true"></span>
			    <span class="sr-only">Next</span>
			  </a>
        </div>
        설명글
    </div>
</div>
<jsp:include page="footer.jsp" />