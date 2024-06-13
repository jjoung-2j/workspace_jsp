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
<link rel="stylesheet" type="text/css" href="<%= ctxPath%>/css/myshop/prodView.css" />
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css" /> 
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>

<%-- 직접 만든 JS --%>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/myshop/categoryListJSON.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/myshop/prodView.js"></script>
<script type="text/javascript">
let isOrderOK = false;
// 로그인한 사용자가 해당 제품을 구매한 상태인지 구매하지 않은 상태인지 알아오는 용도.
// isOrderOK 값이 true 이면  로그인한 사용자가 해당 제품을 구매한 상태이고,
// isOrderOK 값이 false 이면 로그인한 사용자가 해당 제품을 구매하지 않은 상태로 할 것임.

$(document).ready(function(){
	
    // === 주문개수가 변경되어지면 총주문액 변경해주기 시작 === //
    let jumun_cnt = Number($("input#spinner").val());
    let totalSaleprice = ${requestScope.pvo.saleprice} * jumun_cnt;
	$("span#totalSaleprice").html(totalSaleprice.toLocaleString('en') + "원");
	
	// spinner 은 spinstop 이다!!(change 가 아님)
	$(document).on("spinstop",$("input#spinner"), function(){
		jumun_cnt = Number($("input#spinner").val());
		totalSaleprice = ${requestScope.pvo.saleprice} * jumun_cnt;
		$("span#totalSaleprice").html(totalSaleprice.toLocaleString('en') + "원");
	})
	
	$("p#order_error_msg").css('display','none'); // 코인잔액 부족시 주문이 안된다는 표시해주는 곳.
	
    // === 주문개수가 변경되어지면 총주문액 변경해주기 끝 === //
    
    /////////////////////////////////////////////////////////////////////////
    // === 로그인한 사용자가 해당 제품을 구매한 상태인지 구매하지 않은 상태인지 먼저 알아온다 === // 
    $.ajax({
           url:"<%= ctxPath%>/shop/isOrder.up",
            type:"get",
            data:{"fk_pnum":"${requestScope.pvo.pnum}"
               ,"fk_userid":"${sessionScope.login_user.userid}"},
            dataType:"json",
         
            async:false,   // 동기처리
       // async:true,    // 비동기처리(기본값임) 
         
          success:function(json){
          //   console.log("~~ 확인용 : " + JSON.stringify(json));
             // ~~ 확인용 : {"isOrder":true}   해당제품을 구매한 경우
             // ~~ 확인용 : {"isOrder":false}  해당제품을 구매하지 않은 경우
             
             isOrderOK = json.isOrder;
               // json.isOrder 값이 true  이면 로그인한 사용자가 해당 제품을 구매한 경우이고
               // json.isOrder 값이 false 이면 로그인한 사용자가 해당 제품을 구매하지 않은 경우이다.
            },
           error: function(request, status, error){
            alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
            }
     });
     ////////////////////////////////////////////////////////////////////////// 
    
    goLikeDislikeCount();	// 좋아요, 싫어요 갯수를 보여주도록 하는 것이다.
    goReviewListView(); 	// 제품 구매후기를 보여주는 것.
     
    ////////////////////////////////////////////////////////////////////////////
 	// **** 제품후기 쓰기(로그인하여 실제 해당 제품을 구매했을 때만 딱 1번만 작성할 수 있는 것. 제품후기를 삭제했을 경우에는 다시 작성할 수 있는 것임.) ****// 
    $("button#btnCommentOK").click(function(){
    	
    	if(${empty sessionScope.login_user}) {
        	alert("제품사용 후기를 작성하시려면 먼저 로그인 하셔야 합니다.");
        	return; // 종료
     	}
    	
    	if(!isOrderOK){		// 해당 제품을 구매하지 않은 경우이라면
    		alert("${requestScope.pvo.pname} 제품을 구매하셔만 후기작성이 가능합니다.");
    	}
    	else{	// 해당 제품을 구매한 경우이라면
			const review_contents = $("textarea[name='contents']").val().trim(); 
            
            if(review_contents == "") {
               alert("제품후기 내용을 입력하세요!!");
               $("textarea[name='contents']").val(""); // 공백제거
               return; // 종료
            } 
             
            //////////////////////////////////////////////////////////////////////
         	// >>> 보내야할 데이터를 선정하는 첫번째 방법 <<<
            <%--  
                  const queryString = {"fk_userid":"${sessionScope.login_user.userid}"
                                    ,"fk_pnum":"${requestScope.pvo.pnum}"
                                    ,"contents":$("textarea[name='contents']").val()};
            --%>  
         	// >>> 보내야할 데이터를 선정하는 두번째 방법 <<< 
            // jQuery 에서 사용하는 것으로써,
            // form태그의 선택자.serialize(); 을 해주면 form 태그내의 모든 값들을 name 속성값을 키값으로 만들어서 보내준다. 
            const queryString = $("form[name='commentFrm']").serialize();
            /*
                queryString 은 아래와 같이 되어진다.
                
                {"contents":$("textarea[name='contents']").val(),
                "fk_userid":$("input[name='fk_userid']").val(),
                "fk_pnum":$(input[name='fk_pnum']).val()}
            */
            //////////////////////////////////////////////////////////////////////
            $.ajax({
                url:"<%= ctxPath%>/shop/reviewRegister.up",
                type:"post",
                data:queryString,
                dataType:"json",
                success:function(json){ 
                   // console.log(JSON.stringify(json));
                   /*
                      {"n":1} 또는 {"n":-1} 또는 {"n":0}
                   */
                   
                   if(json.n == 1) {
                       // 제품후기 등록(insert)이 성공했으므로 제품후기글을 새로이 보여줘야(select) 한다.
                       goReviewListView(); // 제품후기글을 보여주는 함수 호출하기 
                       // alert("리뷰작성 성공");
                     }
                     else if(json.n == -1)  {
                   // 동일한 제품에 대하여 동일한 회원이 제품후기를 2번 쓰려고 경우 unique 제약에 위배됨 
                   // alert("이미 후기를 작성하셨습니다.\n작성하시려면 기존의 제품후기를\n삭제하시고 다시 쓰세요.");
                      swal("이미 후기를 작성하셨습니다.\n작성하시려면 기존의 제품후기를\n삭제하시고 다시 쓰세요.");
                   }
                     else  {
                        // 제품후기 등록(insert)이 실패한 경우 
                        alert("제품후기 글쓰기가 실패했습니다.");
                     }
                   
                   $("textarea[name='contents']").val("").focus();
                },
                error: function(request, status, error){
                   alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
                }
             });
            
    	}
    })	// end of $("button#btnCommentOK").click(function(){-------------
    
})	// end of $(document).ready(function(){------------------
// (form 태그를 사용하지 않고 Ajax 를 사용하여 처리해 보겠습니다.)
function goOrder(){

    if(${not empty sessionScope.login_user}){
    	
    	const currentCoin = Number("${sessionScope.login_user.coin}");		// 현재코인액
    	
    	let str_totalSaleprice = $("span#totalSaleprice").text();		// 제품 총 판매가
    	str_totalSaleprice = str_totalSaleprice.substring(0,str_totalSaleprice.length-1);
    	
    	const totalSaleprice = Number(str_totalSaleprice.split(",").join(""));
    	
    	if(currentCoin < totalSaleprice){
    		$("p#order_error_msg").html("코인잔액이 부족하므로 주문이 불가합니다.<br>총주문액 : " + totalSaleprice.toLocaleString('en')+"원, 현재코인액 : " + currentCoin.toLocaleString('en')+"원").css('display','');
            return; // 종료
    	}
    	else{
    		
    		$("p#order_error_msg").css('display','none');
    		
    		if(confirm("총주문액 : "+ totalSaleprice.toLocaleString('en') + "원 주문하시겠습니까?" )) {

    			$("div.loader").show();
    			
    			$.ajax({
                    url: "<%= ctxPath%>/shop/orderAdd.up",
                    type: "post",
                    data: {"n_sum_totalPrice":totalSaleprice,
                          "n_sum_totalPoint":Number("${requestScope.pvo.point}") * Number( $("input#spinner").val() ),
                          "str_pnum_join":"${requestScope.pvo.pnum}",
                              "str_oqty_join":$("input#spinner").val(),
                              "str_totalPrice_join":totalSaleprice
                              },
                    dataType: "json",
                    success: function(json) { // json => {"isSuccess":1} 또는 {"isSuccess":0} 
                       	// alert(json.isSuccess)
                    	if(json.isSuccess == 1) {
                       		location.href="<%= ctxPath%>/shop/orderList.up";
                       }
                       else {
                       		location.href="<%= ctxPath%>/shop/orderError.up";
                       }
                    },
                    error: function(request, status, error){
                          alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
                       }
                 
                 });// end of $.ajax({})--------------------

    		}	// end of if(confirm("총주문액 : "+ totalSaleprice.toLocaleString('en') + "원 주문하시겠습니까?" )) {}------
    	}	// end of if~else--------------------------
    }
    else{
    	alert("주문을 하시려면 먼저 로그인 하세요!!");
        // 만약에 로그인을 해주는 페이지가 따로 존재한다라면 로그인을 해주는 페이지로 이동시켜줘야 한다.
    }

}   // end of function goOrder(){-----------------------------

/////////////////////////////////////////////////////////////////////


//**** 특정제품에 대한 좋아요 등록하기 **** //
function golikeAdd(pnum){

	if(${empty sessionScope.login_user}) {
    	alert("좋아요 하시려면 먼저 로그인 하셔야 합니다.");
    	return; // 종료
 	}
	
	if(!isOrderOK){		// 해당 제품을 구매하지 않은 경우이라면
		alert("${requestScope.pvo.pname} 제품을 구매하셔만 좋아요 투표가 가능합니다.");
	}
	else{	// 해당 제품을 구매한 경우이라면
		$.ajax({
            url:"<%= ctxPath%>/shop/likeAdd.up",
            type:"post",
            data:{"pnum":pnum,
                 "userid":"${sessionScope.login_user.userid}"},
            dataType:"json", 
            success:function(json) {
            // console.log(JSON.stringify(json));
                // {"msg":"해당제품에\n 좋아요를 클릭하셨습니다."}
                  // 또는
                  // {"msg":"이미 좋아요를 클릭하셨기에\n 두번 이상 좋아요는 불가합니다."}
                  
               // alert(json.msg);
                  swal(json.msg);	// 이쁜 alert
                  goLikeDislikeCount();
            },
            error: function(request, status, error){
               alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
            }
         });	// end of ajax----------------
	}	// end of if~else-------------------------

}   // end of function golikeAdd(pnum)---------------

//**** 특정제품에 대한 싫어요 등록하기 **** //
function godisLikeAdd(pnum){
	if(${empty sessionScope.login_user}) {
    	alert("싫어요 하시려면 먼저 로그인 하셔야 합니다.");
    	return; // 종료
 	}
	
	if(!isOrderOK){		// 해당 제품을 구매하지 않은 경우이라면
		alert("${requestScope.pvo.pname} 제품을 구매하셔만 싫어요 투표가 가능합니다.");
	}
	else{	// 해당 제품을 구매한 경우이라면
		$.ajax({
            url:"<%= ctxPath%>/shop/dislikeAdd.up",
            type:"post",
            data:{"pnum":pnum,
                 "userid":"${sessionScope.login_user.userid}"},
            dataType:"json", 
            success:function(json) {
            // console.log(JSON.stringify(json));
                // {"msg":"해당제품에\n 싫어요를 클릭하셨습니다."}
                  // 또는
                  // {"msg":"이미 싫어요를 클릭하셨기에\n 두번 이상 좋아요는 불가합니다."}
                  
               // alert(json.msg);
                  swal(json.msg);	// 이쁜 alert
                  goLikeDislikeCount();
            },
            error: function(request, status, error){
               alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
            }
         });	// end of ajax----------------
	}	// end of if~else-------------------------
}	// end of function godisLikeAdd(pnum)

//////////////////////////////////////////////////////////////////

// **** 특정 제품에 대한 좋아요, 싫어요 갯수를 보여주기 **** //
function goLikeDislikeCount(){
	
	$.ajax({
        url:"<%= ctxPath%>/shop/likeDislikeCount.up",
     // type:"get",
        data:{"pnum":"${requestScope.pvo.pnum}"},
        dataType:"json", 
        success:function(json) {
           // console.log(JSON.stringify(json));
           // {"likecnt":1, "dislikecnt":0}
            
           $("span#likeCnt").html(json.likecnt);
           $("span#dislikeCnt").html(json.dislikecnt);
        },
        error: function(request, status, error){
           alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
        }
     });    
	
}	// end of function goLikeDislikeCount(){---------------
	
///////////////////////////////////////////////////////////////////////////
// 특정 제품의 제품후기글들을 보여주는 함수
function goReviewListView(){
	
	$.ajax({
		
		url:"<%= ctxPath%>/shop/reviewList.up",
        type:"get",
        data:{"fk_pnum":"${requestScope.pvo.pnum}"},
        dataType:"json",
        success:function(json) {
        	// console.log(JSON.stringify(json));
        	/*
        	[{"contents":"집사람이 너무너무 좋아해요~~^^","name":"이순신","writeDate":"2024-06-05 12:47:34","review_seq":2,"userid":"leess"}
        	,{"contents":"너무 저렴해서 사기인줄..","name":"양혜정","writeDate":"2024-06-05 12:45:36","review_seq":1,"userid":"jjoung"}]
        	*/
			let v_html = "";
            
            if (json.length > 0) {    
               $.each(json, function(index, item){ 
                  let writeuserid = item.userid;
                  let loginuserid = "${sessionScope.login_user.userid}";
                                 
                   v_html += "<div id='review"+index+"'><span class='markColor'>▶</span>&nbsp;"+item.contents+"</div>"
                           + "<div class='customDisplay'>"+item.name+"</div>"      
                           + "<div class='customDisplay'>"+item.writeDate+"</div>";
                   
                   if( loginuserid == "") { 
                      // 로그인을 안한 경우 
                      v_html += "<div class='customDisplay spacediv'>&nbsp;</div>";
                   }      
                   else if( loginuserid != "" && writeuserid != loginuserid ) { 
                      // 로그인을 했으나 후기글이 로그인한 사용자 쓴 글이 아니라 다른 사용자 쓴 후기글 이라면  
                      v_html += "<div class='customDisplay spacediv'>&nbsp;</div>";
                   }    
                   else if( loginuserid != "" && writeuserid == loginuserid ) {
                      // 로그인을 했고 후기글이 로그인한 사용자 쓴 글 이라면
                      v_html += "<div class='customDisplay spacediv commentDel' onclick='delMyReview("+item.review_seq+")'>후기삭제</div>"; 
                      v_html += "<div class='customDisplay spacediv commentDel commentUpdate' onclick='updateMyReview("+index+","+item.review_seq+")'>후기수정</div>"; 
                   }
               } ); 
            }// end of if -----------------------
            
            else {
               v_html += "<div>등록된 상품후기가 없습니다.</div>";
            }// end of else ---------------------
            
            $("div#viewComments").html(v_html);
        },
        error: function(request, status, error){
            alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
        }
		
	})	// end of $.ajax({-----------
	
	
}	// end of function goReviewListView(){------------------------
	
////////////////////////////////////////////////////////////////////////////
// 특정 제품의 제품후기를 삭제하는 함수
function delMyReview(review_seq){
	
	if(confirm("정말로 제품후기를 삭제하시겠습니까?")) {
        $.ajax({
           url:"<%= ctxPath%>/shop/reviewDel.up",
           type:"post",
           data:{"review_seq":review_seq},
           dataType:"json",
           success:function(json){
           // console.log(JSON.stringify(json));
           // {"n":1} 또는 {"n":0}
           
              if(json.n == 1) {
                 alert("제품후기 삭제가 성공되었습니다.");
                 goReviewListView(); // 특정 제품의 제품후기글들을 보여주는 함수 호출하기 
              } 
              else {
                 alert("제품후기 삭제가 실패했습니다.");
              }
           
           },
           error: function(request, status, error){
              alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
           }
        });
     }  
	
}	// end of function delMyReview(review_seq){------------
	
////////////////////////////////////////////////////////////////////////////////////////
// 특정 제품의 제품후기를 수정하는 함수
function updateMyReview(index, review_seq){
	
	const origin_elmt = $("div#review"+index).html();	// 원래의 제품후기 엘리먼트
	
	// alert(origin_elmt);
	// <span class="markColor">▶</span>&nbsp;너무 저렴해서 사기인줄...
	
	// alert($("div#review"+index).text());
	// ▶ 너무 저렴해서 사기인줄..
	
	const review_contents = $("div#review"+index).text().substring(2);
	// alert(review_contents);
	// 너무 저렴해서 사기인줄..
	
	$("div.commentUpdate").hide();	// "후기수정" 글자 감추기
	
	// "후기수정" 을 위한 엘리먼트 만들기 
    let v_html = "<textarea id='edit_textarea' style='font-size: 12pt; width: 40%; height: 50px;'>"+review_contents+"</textarea>";
    v_html += "<div style='display: inline-block; position: relative; top: -20px; left: 10px;'><button type='button' class='btn btn-sm btn-outline-secondary' id='btnReviewUpdate_OK'>수정완료</button></div>"; 
    v_html += "<div style='display: inline-block; position: relative; top: -20px; left: 20px;'><button type='button' class='btn btn-sm btn-outline-secondary' id='btnReviewUpdate_NO'>수정취소</button></div>";
	
 	// 원래의 제품후기 엘리먼트에 위에서 만든 "후기수정" 을 위한 엘리먼트로 교체하기  
    $("div#review"+index).html(v_html);
 	
 	// 수정취소 버튼 클릭시
 	$(document).on("click", "button#btnReviewUpdate_NO", function(){
 		$("div#review"+index).html(origin_elmt);	// 원래의 제품후기 엘리먼트로 복원하기
        $("div.commentUpdate").show();  // "후기수정" 글자 보여주기
    });
 	
 	///////////////////////////////////////////////////////////////////
 	
 	// 수정완료 버튼 클릭시
 	$(document).on("click", "button#btnReviewUpdate_OK", function(){
 		
 		$.ajax({
            url:"<%= ctxPath%>/shop/reviewUpdate.up",
            type:"post",
            data:{"review_seq":review_seq
            	,"contents":$("textarea#edit_textarea").val()
            },
            dataType:"json",
            success:function(json){
            // console.log(JSON.stringify(json));
            // {"n":1} 또는 {"n":0}
            
               if(json.n == 1) {
                  goReviewListView(); // 특정 제품의 제품후기글들을 보여주는 함수 호출하기 
               } 
               else {
                  alert("제품후기 수정이 실패했습니다.");
                  goReviewListView(); // 특정 제품의 제품후기글들을 보여주는 함수 호출하기 
               }
            
            },
            error: function(request, status, error){
               alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
            }
         });
 		
    });
    
}	// end of function updateMyReview(index, review_seq){----------------
</script>
<div style="width: 95%;">
   <div class="my-3">
      <p class="h4 text-center">&raquo;&nbsp;&nbsp;제품 상세 정보&nbsp;&nbsp;&laquo;</p>
   </div>
   
   <div class="row my-3 text-left">
      <div class="col-md-6">
          <div class="flip-card">
              <div class="flip-card-inner">         
              <div class="flip-card-front">
                  <img src="<%= ctxPath%>/images/${requestScope.pvo.pimage1}" class="img-fluid" style="width:100%;" />
               </div>
               <div class="flip-card-back">
                   <img src="<%= ctxPath%>/images/${requestScope.pvo.pimage2}" class="img-fluid" style="width: 100%;" />
               </div>
            </div>
         </div>
      </div>
      
      <div class="col-md-6 pl-5">
          <ul class="list-unstyled">
            <li><span style="color: red; font-size: 12pt; font-weight: bold;">${requestScope.pvo.spvo.sname}</span></li>
            <li>제품번호: ${requestScope.pvo.pnum}</li>
            <li>제품이름: ${requestScope.pvo.pname}</li>
            <li>제조회사: ${requestScope.pvo.pcompany}</li>
            <li>제품설명서: 
              <c:if test="${requestScope.pvo.prdmanual_orginFileName ne '없음'}">
                 <a href="<%= ctxPath%>/shop/fileDownload.up?pnum=${pvo.pnum}">${pvo.prdmanual_orginFileName}</a>
              </c:if>
              <c:if test="${requestScope.pvo.prdmanual_orginFileName eq '없음'}">
                 첨부파일없음
              </c:if>
              </li>
              <li>제품정가: <span style="text-decoration: line-through;"><fmt:formatNumber value="${requestScope.pvo.price}" pattern="###,###" />원</span></li>
              <li>제품판매가: <span style="color: blue; font-weight: bold;"><fmt:formatNumber value="${requestScope.pvo.saleprice}" pattern="###,###" />원</span></li>
              <li>할인율: <span style="color: maroon; font-weight: bold;">[${requestScope.pvo.discountPercent}% 할인]</span></li>
              <li>포인트: <span style="color: green; font-weight: bold;">${requestScope.pvo.point} POINT</span></li>
              <li>잔고갯수: <span id="balancecount" style="color: maroon; font-weight: bold;">${requestScope.pvo.pqty}</span> 개</li>
              <li>총주문액: <span id="totalSaleprice" style="color: maroon; font-weight: bold;"></span></li>          
          </ul>
          <%-- ==== 장바구니담기 또는 바로주문하기 폼 ==== --%>
          <form name="cartOrderFrm">       
             <ul class="list-unstyled mt-3">
                <li>
                    <label for="spinner">주문개수&nbsp;</label>
                    <input id="spinner" name="oqty" value="1" style="width: 110px;">
               </li>
               <li>
                  <button type="button" class="btn btn-secondary btn-sm mr-3" onclick="goCart()">장바구니담기</button>
                  <button type="button" class="btn btn-danger btn-sm" onclick="goOrder()">바로주문하기</button>
               </li>
            </ul>
            <input type="hidden" name="pnum" value="${requestScope.pvo.pnum}" />
         </form>   
              
      </div>
   </div>
   
   <%-- CSS 로딩화면 구현한것--%>
    <div style="display: flex; position: absolute; top: 30%; left: 37%; border: solid 0px blue;">
      <div class="loader" style="margin: auto"></div>
   </div>
   
   <%-- === 추가이미지 보여주기 시작 === --%>
   <c:if test="${not empty requestScope.imgList}">
   	<%--
      <%-- === 그냥 이미지로 보여주는 것 시작 === --%>
      <%-- 
      <div class="row">
        <c:forEach var="imgfilename" items="${requestScope.imgList}">
          <div class="col-md-6 my-3">
             <img src="<%= ctxPath%>/images/${imgfilename}" class="img-fluid" style="width:100%;" />
          </div>
        </c:forEach>
      </div>
      --%>
      <%-- === 그냥 이미지로 보여주는 것 끝 === --%>
      
      <%-- /////// 추가이미지 캐러젤로 보여주는 것 시작 //////// --%>
      <div class="row mx-auto my-auto" style="width: 100%;">
           <div id="recipeCarousel" class="carousel slide w-100" data-ride="carousel">
               <div class="carousel-inner w-100" role="listbox">
                   <c:forEach var="imgfilename" items="${requestScope.imgList}" varStatus="status">
                      <c:if test="${status.index == 0}">
                         <div class="carousel-item active">
                           <%-- 팝업으로 여는 방법
                           		<img class="d-block col-3 img-fluid" src="<%= ctxPath%>/images/${imgfilename}" style="cursor: pointer;" onclick="openPopup('<%= ctxPath%>/images/${imgfilename}')" / --%> 
                                <%-- 모델창으로 여는 방법 --%>
                                <img class="d-block col-3 img-fluid" src="<%= ctxPath%>/images/${imgfilename}" style="cursor: pointer;" data-toggle="modal" data-target="#add_image_modal_view" data-dismiss="modal" onclick="modal_content(this)" />   
                         </div>
                      </c:if>
                      <c:if test="${status.index > 0}">
                         <div class="carousel-item">
                           <%-- 팝업으로 여는 방법
                           		<img class="d-block col-3 img-fluid" src="<%= ctxPath%>/images/${imgfilename}" style="cursor: pointer;" onclick="openPopup('<%= ctxPath%>/images/${imgfilename}')" /> --%> 
                                <%-- 모델창으로 여는 방법 --%>
                                <img class="d-block col-3 img-fluid" src="<%= ctxPath%>/images/${imgfilename}" style="cursor: pointer;" data-toggle="modal" data-target="#add_image_modal_view" data-dismiss="modal" onclick="modal_content(this)" />   
                         </div>
                      </c:if>
                   </c:forEach>
               </div>
               <a class="carousel-control-prev" href="#recipeCarousel" role="button" data-slide="prev">
                   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                   <span class="sr-only">Previous</span>
               </a>
               <a class="carousel-control-next" href="#recipeCarousel" role="button" data-slide="next">
                   <span class="carousel-control-next-icon" aria-hidden="true"></span>
                   <span class="sr-only">Next</span>
               </a>
           </div>
       </div>
      <%-- /////// 추가이미지 캐러젤로 보여주는 것 끝 //////// --%>
   </c:if>
   <%-- === 추가이미지 보여주기 끝 === --%>
   
   <div>
        <p id="order_error_msg" class="text-center text-danger font-weight-bold h4"></p>
    </div>
      
   <div class="jumbotron mt-5">
        
        <div class="text-left" style="margin-top: -5%;">
           <p class="h4 bg-secondary text-white w-50">${requestScope.pvo.pname} 제품의 특징</p>
           <p>${requestScope.pvo.pcontent}</p>   
       </div>
    
      <div class="row">
         <div class="col" style="display: flex">
               <h3 style="margin: auto">
                  <i class="fas fa-thumbs-up fa-2x" style="cursor: pointer;" onclick="golikeAdd('${requestScope.pvo.pnum}')"></i> 
                  <span id="likeCnt" class="badge badge-primary"></span>
                </h3>
         </div>
         
         <div class="col" style="display: flex">
             <h3 style="margin: auto">
                <i class="fas fa-thumbs-down fa-2x" style="cursor: pointer;" onclick="godisLikeAdd('${requestScope.pvo.pnum}')"></i> 
                <span id="dislikeCnt" class="badge badge-danger"></span>
             </h3>       
         </div>
      </div>
   
   </div>
   
   <div class="text-left">
       <p class="h4 text-muted">${requestScope.pvo.pname} 제품 사용후기</p>
       
       <div id="viewComments">
          <%-- 여기가 제품사용 후기 내용이 들어오는 곳이다. --%>
       </div>
    </div>
     
    <div class="row">
        <div class="col-lg-10">
          <form name="commentFrm">
              <textarea name="contents" style="font-size: 12pt; width: 100%; height: 150px;"></textarea>
              <input type="hidden" name="fk_userid" value="${sessionScope.login_user.userid}" />
                  <input type="hidden" name="fk_pnum" value="${requestScope.pvo.pnum}" />
          </form>
       </div>
       <div class="col-lg-2" style="display: flex;">
          <button type="button" class="btn btn-outline-secondary w-100 h-100" id="btnCommentOK" style="margin: auto;"><span class="h5">후기등록</span></button>
       </div>
    </div>
   
</div>


<%-- ****** 추가이미지 보여주기 Modal 시작 ****** --%>
  <div class="modal fade" id="add_image_modal_view"> <%-- 만약에 모달이 안보이거나 뒤로 가버릴 경우에는 모달의 class 에서 fade 를 뺀 class="modal" 로 하고서 해당 모달의 css 에서 zindex 값을 1050; 으로 주면 된다. --%> 
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
      
        <!-- Modal header -->
        <div class="modal-header">
          <h4 class="modal-title">추가 이미지 원래크기 보기</h4>
          <button type="button" class="close idFindClose" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body" id="add_image_modal-body">
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger idFindClose" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
<%-- ****** 추가이미지 보여주기 Modal 끝 ****** --%>

<jsp:include page="../footer1.jsp" />