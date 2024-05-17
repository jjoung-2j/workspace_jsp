<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<jsp:include page="header.jsp" />

<%
    String ctxPath = request.getContextPath();
    //    /IGLOO
%>

<%-- 직접 만든 CSS --%>
<link rel="stylesheet" type="text/css" href="<%= ctxPath%>/css/sidebar.css" />


<div id="container" class="mx-auto">
	<div class="row justify-content-center">
		<div id="sidebardiv" class="col-3 mt-5 w-25">
		
			<div id="sidebar" class="mx-auto">
				<div id="mypage">
					<div>마이페이지</div>
				</div>
				<div id="mypageContents">
					<br>
					
					<div class="mypageTopmanage">주문관리</div>
					<a class="mypagelink mb-2 mt-2" href="<%= ctxPath %>.ice">
						주문조회
					</a>
					
					<br>
					
					<div class="mypageTopmanage">게시물 관리</div>
					<a class="mypagelink mb-2 mt-2" href="<%= ctxPath %>.ice">
						내가 쓴 리뷰
					</a>
					<a class="mypagelink mb-2" href="<%= ctxPath %>.ice">
						1:1 문의 내역
					</a>
					
					<br>
					
					<div class="mypageTopmanage">정보관리</div>
					<a class="mypagelink mb-2 mt-2" href="<%= ctxPath %>.ice">
						회원정보 변경
					</a>
					<a class="mypagelink mb-2" href="<%= ctxPath %>.ice">
						비밀번호 변경
					</a>
					
					<br>
				</div>
			</div>
		
		</div>
		
		<div id=”content” class="col-9">
<%-- 	
	본 내용에 이거 넣고 마무리하기	
			</div>
		</div>
	</div>
--%>