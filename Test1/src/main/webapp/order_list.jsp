<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
    String ctxPath = request.getContextPath();
    //    /IGLOO
%>

<jsp:include page="/header.jsp" />
<jsp:include page="/sidebar.jsp" />

<%-- 직접 만든 CSS --%>
<link rel="stylesheet" type="text/css" href="<%= ctxPath%>/css/order/order_list.css" />
<%-- 직접 만든 JS --%>
<script type="text/javascript" src="<%= ctxPath%>/js/order/order_list.js"></script>

<%-- 주문내역 --%>
<div id="orderlistContents" class="mt-5">
	<span id="input_searchlist">주문내역 검색</span>
	
	<%-- 검색창 --%>
	<div class="input_text row justify-content-center mt-3">
		<label class="my-auto col-6 p-0">
			<input class="my-sm-0" type="text" name="orderlist_search" id="orderlist_search" required="required">
		</label>
		<button id="btnSearch" class="btn my-sm-0 px-0 pt-0 col-1" type="submit">
			<img src="<%= ctxPath%>/images/img_hj/search.png" class="img-fluid" alt="Responsive image">
		</button>
	</div>	
	
	<hr>
		
	<%-- 기간 설정 --%>
	<div class="mb-5">
		<div id="setDuration" class="ml-4 my-3">기간 설정</div>	
		<div id="Periodgroup" class="mx-auto text-center">
			<div class="btn-group" role="group" class="mx-auto">
				<button type="button" class="btn btn-light">전체</button>
			  	<button type="button" class="btn btn-light">1개월</button>
			  	<button type="button" class="btn btn-light">3개월</button>
			  	<button type="button" class="btn btn-light">6개월</button>
			  	<button type="button" class="btn btn-light">1년</button>
			</div>
		</div>
	</div>
		
	<%-- 기간 표시 --%>
	<div class="ml-4 my-3">
		기간 : 2024.01.01 ~ 2024.05.13
	</div>
	
	<hr style="border: solid 2px #6190BC">
	
	<%-- 주문내역 결과창 --%>
	<div id="SearchorderlistContents">
		<div class="orderdate ml-4">2024.05.13</div>
		
		<div class="Oneorderdate">
			<%-- 해당 날짜 주문시간과 주문코드 --%>
			<div class="dateorderlist my-3 ml-4">
				<div>2024.05.13 23:33:35</div>
				<div>주문코드 : P-000001</div>
			</div>
				
			<%-- 해당 날짜 주문내역 --%>
			<div id="orderlist" class="row justify-content-center mb-3">
				<%-- 선택한 메뉴 이미지 --%>
				<div class="col-xl-2 col-lg-2 ">
					<img class="img-fluid mt-5" src="<%= ctxPath%>/images/img_hj/cup_size/pint.png" alt="Responsive image">
				</div>
			
				<%-- 선택한 제품과 맛 --%>
				<div class="orderMenu col-xl-3 col-lg-3 ">
						
					<%-- 선택한 제품 품목 --%>
					<label class="text-center mx-auto mt-3">파인트</label>
						
	       			<%-- 제품 선택한 맛 나열 --%>
	       			<div class="choiceAlltaste my-auto">
	       				<ul class="list-group list-group-flush">
			  				<li class="list-group-item">첫번째 선택 맛</li>
			  				<li class="list-group-item">두번째 선택 맛</li>
			  				<li class="list-group-item">세번째 선택 맛</li>
						</ul>
					</div>
				</div>
				
				<%-- 수량 --%>
				<div class="selectMenucnt justify-content-center text-center col-xl-2 col-lg-2 p-0">
					<div class="mt-5">
						<div class="d-inline-block"></div>
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
				<div class="selectOrderprice justify-content-center text-center col-xl-2 col-lg-2 p-0">
					<div class="mt-5 mb-5">
						<div class="d-inline-block"></div>
						<div>9800원</div>
					</div>
				</div>
					
				<%-- 주문상태 --%>
				<div class="Ordersituation justify-content-center text-center col-xl-2 col-lg-2 p-0">
					<div class="mt-5 mb-5">
						<div class="d-inline-block"></div>
						<div>주문완료</div>
					</div>
				</div>
			</div>
			<%-- 주문목록 하나 완료 --%>
			
			<hr>
			
			<div class="Oneorderdate">
				<%-- 해당 날짜 주문시간과 주문코드 --%>
				<div class="dateorderlist my-3 ml-5">
					<div>2024.05.13 23:43:35</div>
					<div>주문코드 : Q-000002</div>
				</div>
			
				<%-- 해당 날짜 주문내역 --%>
				<div id="orderlist" class="row justify-content-center mb-3">
					<%-- 선택한 메뉴 이미지 --%>
					<div class="col-xl-2 col-lg-2 ">
						<img class="img-fluid mt-5" src="<%= ctxPath%>/images/img_hj/cup_size/quart.png" alt="Responsive image">
					</div>
				
					<%-- 선택한 제품과 맛 --%>
					<div class="orderMenu col-xl-3 col-lg-3 ">
							
						<%-- 선택한 제품 품목 --%>
						<label class="text-center mx-auto mt-3">쿼터</label>
							
		       			<%-- 제품 선택한 맛 나열 --%>
		       			<div class="choiceAlltaste my-auto">
		       				<ul class="list-group list-group-flush">
				  				<li class="list-group-item">첫번째 선택 맛</li>
				  				<li class="list-group-item">두번째 선택 맛</li>
				  				<li class="list-group-item">세번째 선택 맛</li>
				  				<li class="list-group-item">네번째 선택 맛</li>
							</ul>
						</div>
					</div>
					
					<%-- 수량 --%>
					<div class="selectMenucnt justify-content-center text-center col-xl-2 col-lg-2 p-0">
						<div class="mt-5">
							<div class="d-inline-block"></div>
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
					<div class="selectOrderprice justify-content-center text-center col-xl-2 col-lg-2 p-0">
						<div class="mt-5 mb-5">
							<div class="d-inline-block"></div>
							<div>18500원</div>
						</div>
					</div>
					
					<%-- 주문상태 --%>
					<div class="Ordersituation justify-content-center text-center col-xl-2 col-lg-2 p-0">
						<div class="mt-5 mb-5">
							<div class="d-inline-block"></div>
							<div>주문완료</div>
						</div>
					</div>
				</div>
				<%-- 주문목록 하나 완료 --%>
			
				<hr style="border: solid 2px #6190BC">
			</div>	
		</div>	
	</div>
</div>

<%-- sidebar 닫기 --%>
		</div>
	</div>
</div>

<jsp:include page="/footer.jsp" />