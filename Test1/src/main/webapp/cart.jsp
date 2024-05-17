<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%
    String ctxPath = request.getContextPath();
    //    /IGLOO
%>

<jsp:include page="/header.jsp" />

<%-- 직접 만든 CSS --%>
<link rel="stylesheet" type="text/css" href="<%= ctxPath%>/css/order/cart.css" />

<script type="text/javascript">
$(document).ready(function() {
    $(".choiceOneMenu").on("click", function() {
        var checkbox = $(this).prev("input[type='checkbox']");
        checkbox.prop("checked", !checkbox.prop("checked"));
    });
});
</script>
<%-- ======================================================================================= --%>
<%-- 컴퓨터 화면 --%>
<div id="cartContainer">
	<%-- 진행 현황 --%>
	<div id="orderProcedure" class="row justify-content-end">
		<div class="col-md-2 p-0">
			장바구니
		</div>
		<div class="col-md-2 col-lg-2 p-0">
			주문/결제
		</div>
		<div class="col-md-1 p-0">
			완료
		</div>
	</div>   

	<hr style="border: solid 2px #6190BC">

	<div class="totalSelect custom-control form-check mb-5">
		<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
	  	<label class="form-check-label ml-5" for="flexCheckChecked">
	    	전체 선택
	  	</label>
	</div>
	
	<div id="cartview" class="col">
		<div id="choiceTotalMenu" class="custom-control custom-checkbox">
			<%-- 하나의 선택 메뉴 --%>
			<div>
				<%-- 하나의 선택 버튼 --%>
				<input class="custom-control-input" type="checkbox" value="" id="checkboxMenu1" checked>
				<div class="choiceOneMenu row custom-control-label">
					
					<%-- 선택한 메뉴 이미지 --%>
					<div class="col-xl-2 col-lg-2 col-md-2">
						<img class="img-fluid mt-5" src="<%= ctxPath%>/images/img_hj/cup_size/pint.png" alt="Responsive image">
					</div>
	
					<%-- 선택한 제품과 맛 --%>
					<div class="SelectTotalMenu col-xl-3 col-lg-3 col-md-3 ">
						<%-- 선택한 제품 삭제 --%>
						<div class="row justify-content-end">
							<div class="col-2 mt-2">
								<i class="fa-solid fa-xmark"></i>
							</div>
						</div>
						<%-- 선택한 제품 품목 --%>
						<label class="text-center mx-auto mt-3">파인트</label>
						<div class="card p-0 mb-3">
		         			<div class="card-body p-1">
		           			선택한 맛 전부 나열
		         			</div>
		       			</div>
	       			</div>
	       			
	       			<%-- 제품 선택한 맛 나열 --%>
	       			<div class="choiceAlltaste my-auto col-xl-3 col-lg-3 col-md-3 ">
	       				<ul class="list-group list-group-flush">
			  				<li class="list-group-item">첫번째 선택 맛</li>
			  				<li class="list-group-item">두번째 선택 맛</li>
			  				<li class="list-group-item">세번째 선택 맛</li>
						</ul>
						<div class="row justify-content-center">
							<button type="button" class="btn btn-sm btn-outline-info col-10">수정</button>
						</div>
					</div>
					
					<%-- 수량 --%>
					<div class="selectMenucnt justify-content-center col-xl-2 col-lg-2 col-md-2 p-0">
						<div class="d-inline-block"></div>
						<div class="mb-5">
							<div>수량</div>
							<button type="button" class="btn">
								<i class="fa-solid fa-minus"></i>
							</button>
							<span>1</span>
							<button type="button" class="btn">
								<i class="fa-solid fa-plus"></i>
							</button>
						</div>
					</div>
					
					<%-- 금액 --%>
					<div class="selectOneprice my-auto justify-content-center text-center col-xl-2 col-lg-2 col-md-2 p-0">
						<div>
							<span>9800원</span>
						</div>
					</div>
				</div>
			</div>
			<%-- 구분선 --%>
			<hr style="border: solid 1px black">
			
			<%-- 하나의 선택 메뉴 --%>
			<div>
				<%-- 하나의 선택 버튼 --%>
				<input type="checkbox" id="checkboxMenu2" class="custom-control-input" checked>
				<div class="choiceOneMenu row custom-control-label">
					
					<%-- 선택한 메뉴 이미지 --%>
					<div class="col-xl-2 col-lg-2 col-md-2">
						<img class="img-fluid mt-5" src="<%= ctxPath%>/images/img_hj/cup_size/quart.png" alt="Responsive image">
					</div>
	
					<%-- 선택한 제품과 맛 --%>
					<div class="SelectTotalMenu col-xl-3 col-lg-3 col-md-3 ">
						<%-- 선택한 제품 삭제 --%>
						<div class="row justify-content-end">
							<div class="col-2 mt-2">
								<i class="fa-solid fa-xmark"></i>
							</div>
						</div>
						<%-- 선택한 제품 품목 --%>
						<label class="text-center mx-auto mt-3">쿼터</label>
						<div class="card p-0 mb-3">
		         			<div class="card-body p-1">
		           			선택한 맛 전부 나열
		         			</div>
		       			</div>
	       			</div>
	       			
	       			<%-- 제품 선택한 맛 나열 --%>
	       			<div class="choiceAlltaste my-auto col-xl-3 col-lg-3 col-md-3 ">
	       				<ul class="list-group list-group-flush">
			  				<li class="list-group-item">첫번째 선택 맛</li>
			  				<li class="list-group-item">두번째 선택 맛</li>
			  				<li class="list-group-item">세번째 선택 맛</li>
			  				<li class="list-group-item">네번째 선택 맛</li>
						</ul>
						<div class="row justify-content-center">
							<button type="button" class="btn btn-sm btn-outline-info col-10">수정</button>
						</div>
					</div>
					
					<%-- 수량 --%>
					<div class="selectMenucnt justify-content-center col-xl-2 col-lg-2 col-md-2 p-0">
						<div class="d-inline-block"></div>
						<div class="mb-5">
							<div>수량</div>
							<button type="button" class="btn">
								<i class="fa-solid fa-minus"></i>
							</button>
							<span>1</span>
							<button type="button" class="btn">
								<i class="fa-solid fa-plus"></i>
							</button>
						</div>
					</div>
					
					<%-- 금액 --%>
					<div class="selectOneprice my-auto justify-content-center text-center col-xl-2 col-lg-2 col-md-2 p-0">
						<div>
							<span>18500원</span>
						</div>
					</div>
				</div>
			</div>
			
			<%-- 구분선 --%>
			<hr style="border: solid 1px black">
			
			<%-- 선택메뉴 끝 --%>
		</div>
	</div>	<%-- 장바구니 내부 종료 --%>
	
	<%-- 주문금액 --%>
	<div id="orderPrice" class="mt-5 mb-5">
		<div class="row justify-content-end">
			<div class="col-4 col-sm-4 col-md-3 col-lg-2 text-right my-auto">주문금액</div>
			<div class="col-4 col-sm-4 col-md-4 text-success my-auto">28300원</div>
			<div class="mb-5"></div>
			<button type="button" class="btn btn-sm col-5 col-sm-4">2건 주문하기</button>
			<div class="col-1"></div>
		</div>
	</div>
	
	<%-- 하단 바 고정 --%>
	<nav class="row justify-content-end navbar navbar-expand-sm bg-dark text-white navbar-dark fixed-bottom mx-3">
	  	<p class="my-auto col-sm-4 col-md-4">
	  		총&nbsp;
	  		<span style="font-weight: bold;">2건</span>
	  		&nbsp;주문금액
	  	</p>
	  	&nbsp;&nbsp;
	    <p class="my-auto p-0 col-sm-3 col-md-3">28300원</p>
		<button type="button" style="font-weight: bold; font-size:15pt;" class="btn btn-sm btn-secondary ml-3 col-5 col-md-3 col-lg-3 col-xl-3">주문하기</button>
	</nav>
</div>
<%-- ======================================================================================= --%>


<jsp:include page="/footer.jsp" />