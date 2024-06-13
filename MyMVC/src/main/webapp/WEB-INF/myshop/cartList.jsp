<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%
    String ctxPath = request.getContextPath();
    //    /MyMVC
%>

<jsp:include page="../header1.jsp" />

<%-- 직접 만든 CSS --%>
<link rel="stylesheet" type="text/css" href="<%= ctxPath%>/css/myshop/cartList.css" />

<%-- 직접 만든 JS --%>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/myshop/categoryListJSON.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/myshop/cartList.js"></script>
<script type="text/javascript">
//=== 장바구니에서 제품 주문하기 === //
function goOrder(){

    // === 체크박스의 체크된 개수(checked 속성이용) === //
    const checkCnt = $("input:checkbox[name='pnum']:checked").length;

    if(checkCnt < 1){
        alert("주문하실 제품을 선택하세요!!");
        return;     // 종료
    }
    else{
        // === 체크박스의 체크된 value값(checked 속성이용) === //

        // === 체크가 된 것만 읽어와서 배열에 넣어준다. === //
        const allCnt = $("input:checkbox[name='pnum']").length;

        const pnumArr = new Array();        // 또는 const pnumArr = [];         // 제품번호
        const oqtyArr = new Array();        // 또는 const oqtyArr = [];         // 주문량
        const pqtyArr = new Array();        // 또는 const pqtyArr = [];         // 잔고량
        const cartnoArr = new Array();      // 또는 const cartnoArr = [];       // 장바구니번호(비울내용)
        const totalPriceArr = new Array();  // 또는 const totalPriceArr = [];   // 주문총액
        const totalPointArr = new Array();  // 또는 const totalPointArr = [];   // 포인트

        for(let i=0; i<allCnt; i++){

            if($("input:checkbox[name='pnum']").eq(i).prop("checked")){
                /*
                console.log("제품번호 : " , $("input:checkbox[name='pnum']").eq(i).val() ); 
                console.log("주문량 : " ,  $("input.oqty").eq(i).val() );
                console.log("잔고량 : " ,  $("input.pqty").eq(i).val() );
                console.log("삭제해야할 장바구니 번호 : " , $("input.cartno").eq(i).val() ); 
                console.log("주문한 제품의 개수에 따른 가격합계 : " , $("input.totalPrice").eq(i).val() );
                console.log("주문한 제품의 개수에 따른 포인트합계 : " , $("input.totalPoint").eq(i).val() );
                console.log("======================================");
                */
               pnumArr.push($("input:checkbox[name='pnum']").eq(i).val());  // 배열 넣기 => push
               oqtyArr.push($("input.oqty").eq(i).val());
               pqtyArr.push($("input.pqty").eq(i).val());
               cartnoArr.push($("input.cartno").eq(i).val());
               totalPriceArr.push($("input.totalPrice").eq(i).val());
               totalPointArr.push($("input.totalPoint").eq(i).val());
            }
        }   // end of for------------

        for(let i=0; i<checkCnt; i++) {
            // console.log("확인용 제품번호: " + pnumArr[i] + ", 주문량: " + oqtyArr[i] + ", 잔고량: " + pqtyArr[i] + ", 장바구니번호 : " + cartnoArr[i] + ", 주문금액: " + totalPriceArr[i] + ", 포인트: " + totalPointArr[i]);
            /*
                확인용 제품번호: 4, 주문량: 2, 잔고량: 50, 장바구니번호 : 7, 주문금액: 26000, 포인트: 20
                확인용 제품번호: 36, 주문량: 60, 잔고량: 100, 장바구니번호 : 4, 주문금액: 60000000, 포인트: 3600
                확인용 제품번호: 3, 주문량: 5, 잔고량: 20, 장바구니번호 : 2, 주문금액: 50000, 포인트: 25
            */
        }   // end of for-------------------    

        for(let i=0; i<checkCnt; i++) {
        
            if(Number(pqtyArr[i]) < Number(oqtyArr[i])){    // 잔고량이 주문량보다 작을 경우
                // 주문할 제품중 아무거나 하나가 잔고량이 주문량 보다 적을 경우
                   
                alert("제품번호 "+ pnumArr[i] +" 의 주문개수가 잔고개수 보다 더 커서 진행할 수 없습니다.");
                location.href="javascript:history.go(0)";
                return; // goOrder 함수 종료
            }

        }   // end of for---------------

        const str_pnum = pnumArr.join();    // join("구분자") 구분자를 안 적을 경우 default ',' 이다.
        const str_oqty = oqtyArr.join();
        const str_cartno = cartnoArr.join();
        const str_totalPrice = totalPriceArr.join();
        const str_totalPoint = totalPointArr.join();

        let n_sum_totalPrice = 0;
        for(let i=0; i<totalPriceArr.length; i++){
            n_sum_totalPrice += Number(totalPriceArr[i]);
        }   // end of for-----------

        let n_sum_totalPoint = 0;
        for(let i=0; i<totalPointArr.length; i++){
            n_sum_totalPoint += Number(totalPointArr[i]);
        }   // end of for-----------

    /*
        console.log("확인용 str_pnum : ", str_pnum);                 // 확인용 str_pnum : 4,36,3
        console.log("확인용 str_oqty : ", str_oqty);                 // 확인용 str_oqty : 2,60,5
        console.log("확인용 str_cartno : ", str_cartno);             // 확인용 str_cartno : 7,4,2
        console.log("확인용 str_totalPrice : ", str_totalPrice);     // 확인용 str_totalPrice : 26000,60000000,50000
        console.log("확인용 str_totalPoint : ", str_totalPoint);     // 확인용 str_totalPoint : 20,3600,25
        console.log("확인용 n_sum_totalPrice : ", n_sum_totalPrice); // 확인용 n_sum_totalPrice : 60076000
        console.log("확인용 n_sum_totalPoint : ", n_sum_totalPoint); // 확인용 n_sum_totalPoint : 3645
    */

    	const current_coin = ${sessionScope.login_user.coin};
    	
    	if(current_coin < n_sum_totalPrice){
    		$("p#order_error_msg").html("코인잔액이 부족하므로 주문이 불가합니다.<br>주문총액 : "+ n_sum_totalPrice.toLocaleString('en') +"원 / 코인잔액 : "+ current_coin.toLocaleString('en') +"원").css({'display':''}); 
            // 숫자.toLocaleString('en') 이 자바스크립트에서 숫자 3자리마다 콤마 찍어주기 이다.   
            return; // 종료
    	}
    	else{
    		$("p#order_error_msg").css({'display':'none'});
    		if( confirm("총주문액 "+ n_sum_totalPrice.toLocaleString('en') + "원을 주문하시겠습니까?") ) {
    			
    			$("div.loader").show();
    			
    			$.ajax({
    	            url:"<%= ctxPath%>/shop/orderAdd.up", 
    	            type:"post", 
    	            data:{"n_sum_totalPrice":n_sum_totalPrice
    	                , "n_sum_totalPoint":n_sum_totalPoint
    	                , "str_pnum_join":str_pnum
    	                , "str_oqty_join":str_oqty
    	                , "str_totalPrice_join":str_totalPrice
    	                , "str_cartno_join":str_cartno
    	            }, 
    	            dataType:"json",
    	            success:function(json){
    	            	// alert(json.isSuccess);	
    	            
    	            	// json => {"isSuccess":1} 또는 {"isSuccess":0}
    	            	if(json.isSuccess==1){
    	            		location.href="<%= ctxPath%>/shop/orderList.up";
    	            	}
    	            	else {
                            location.href="<%= ctxPath%>/shop/orderError.up";
                        }
    	            }
    	            , error: function(request, status, error){
    	                alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
    	            }
    	        })	// end of $.ajax({-------------
    	        
    		}
    	}

    }   // end of if~else--------------------------------

}   // end of function goOrder(){-----------------------
</script>

<div class="container-fluid" style="border: solid 0px red">
	<div class="my-3">
   		<p class="h4 text-center">&raquo;&nbsp;&nbsp;${sessionScope.login_user.name}[${sessionScope.login_user.userid}]님 장바구니 목록&nbsp;&nbsp;&laquo;</p>
   	</div>
   	<div>
       	<table id="tblCartList" class="mx-auto" style="width: 90%">
         	<thead>
            	<tr>
             		<th style="border-right-style: none;">
                 		<input type="checkbox" id="allCheckOrNone" onclick="allCheckBox()" />
                 		<span style="font-size: 10pt;"><label for="allCheckOrNone">전체선택</label></span>
             		</th>
             		<th colspan="5" style="border-left-style: none; font-size: 12pt; text-align: center;">
                 		<marquee>주문을 하시려면 먼저 제품번호를 선택하신 후 [주문하기] 를 클릭하세요</marquee>
             		</th>
            	</tr>
         
            	<tr style="background-color: #cfcfcf;">
              		<th style="width:10%; text-align: center; height: 30px;">제품번호</th>
              		<th style="width:23%; text-align: center;">제품명</th>
                 	<th style="width:17%; text-align: center;">현재주문수량</th>
                 	<th style="width:20%; text-align: center;">판매가/포인트(개당)</th>
                 	<th style="width:20%; text-align: center;">주문총액/총포인트</th>
                 	<th style="width:10%; text-align: center;">비우기</th>
            	</tr>   
         	</thead>
       
         	<tbody>
            	<c:if test="${empty requestScope.cartList}">
            		<tr>
                    	<td colspan="6" align="center">
                      		<span style="color: red; font-weight: bold;">
                         		장바구니에 담긴 상품이 없습니다.
                      		</span>
                    	</td>   
               		</tr>
            	</c:if>
            	<c:if test="${not empty requestScope.cartList}">
            		<c:forEach var="cartvo" items="${requestScope.cartList}" varStatus="status">
            			<tr>
            				<td>
            					<input type="checkbox" id="pnum${status.index}" name="pnum" value="${cartvo.fk_pnum}"/>&nbsp;
            					<label for="pnum${status.index}" class="label_pnum">${cartvo.fk_pnum}</label>
            				</td>
            				<%-- 제품이미지1 및 제품명 --%>
            				<td align="center">
            					<a href="<%= ctxPath%>/shop/prodView.up?pnum=${cartvo.fk_pnum}">
            						<img src="<%= ctxPath%>/images/${cartvo.prod.pimage1}" class="img-thumbnail" width="130px" height="100px"/>
            					</a>
            					<br>
            					<span class="cart_pname">${cartvo.prod.pname}</span>
            				</td>
            				<td align="center">
            					<%-- 현재주문수량 --%>
                              	<input class="spinner oqty" name="oqty" value="${cartvo.oqty}" style="width: 30px; height: 20px;">개
                              	<button type="button" class="btn btn-outline-secondary btn-sm updateBtn" onclick="goOqtyEdit(this)">수정</button>
                              
                              	<%-- 잔고량 --%>
                              	<input type="hidden" class="pqty" value="${cartvo.prod.pqty}" />
                              
                              	<%-- 장바구니 테이블에서 특정제품의 현재주문수량을 변경하여 적용하려면 먼저 장바구니번호(시퀀스)를 알아야 한다 --%>
                              	<input type="hidden" class="cartno" value="${cartvo.cartno}" />
            				</td>
            				<td align="right">
            					<%-- 판매가/포인트(개당) --%>
            					<fmt:formatNumber value="${cartvo.prod.saleprice}" pattern="###,###" /> 원<br>
                            	<fmt:formatNumber value="${cartvo.prod.point}" pattern="###,###" /> POINT
            				</td>
            				<td align="right">
            					<%-- 주문총액/총포인트 --%> 
                            	<fmt:formatNumber value="${cartvo.prod.totalPrice}" pattern="###,###" /> 원<br>
	                            <fmt:formatNumber value="${cartvo.prod.totalPoint}" pattern="###,###" /> POINT
	                            <input type="hidden" class="totalPrice" value="${cartvo.prod.totalPrice}" />
	                            <input type="hidden" class="totalPoint" value="${cartvo.prod.totalPoint}" />
                        	</td>
            				<td align="center">
            					<%-- 장바구니에서 해당 특정 제품 비우기 --%> 
                            	<button type="button" class="btn btn-outline-danger btn-sm" onclick="goDel('${cartvo.cartno}')">삭제</button>  
                        	</td>
            			</tr>
            		</c:forEach>
            	</c:if>
            	<tr>
                	<td colspan="3" align="right">
                    	<span style="font-weight: bold;">장바구니 총액 :</span>
                  		<span style="color: red; font-weight: bold;"><fmt:formatNumber value="${requestScope.sumMap.SUMTOTALPRICE}" pattern="###,###" /></span> 원  
                     	<br>
                     	<span style="font-weight: bold;">총 포인트 :</span> 
                  		<span style="color: red; font-weight: bold;"><fmt:formatNumber value="${requestScope.sumMap.SUMTOTALPOINT}" pattern="###,###" /></span> POINT 
                 	</td>
                 	<td colspan="3" align="center">
                  		<button type="button" class="btn btn-outline-dark btn-sm mr-3" onclick="goOrder()">주문하기</button>
                    	<a class="btn btn-outline-dark btn-sm" href="<%= ctxPath%>/shop/mallHomeMore.up" role="button">계속쇼핑</a>
                 	</td>
            	</tr>
         	</tbody>
      	</table> 
   	</div>
   
    <div>
        <p id="order_error_msg" class="text-center text-danger font-weight-bold h4"></p>
    </div>
    
    <%-- CSS 로딩화면 구현한것--%>
    <div style="display: flex; position: absolute; top: 30%; left: 37%; border: solid 0px blue;">
   		<div class="loader" style="margin: auto"></div>
    </div>
    
</div>

<jsp:include page="../footer1.jsp" />