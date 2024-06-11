$(document).ready(function(){

    $("div.loader").hide();

    $("p#order_error_msg").css({'display':'none'});     // 코인잔액 부족시 주문이 안된다는 표시를 해주는 곳.

    $(".spinner").spinner({
        spin: function(event, ui) {
            if(ui.value > 100) {
                $(this).spinner("value", 100);
                return false;
            }
            else if(ui.value < 0) {
                $(this).spinner("value", 0);
                return false;
            }
        }
    });     // end of $(".spinner").spinner({});-----------------

    // 제품번호의 모든 체크박스가 체크가 되었다가 그 중 하나만 이라도 체크를 해제하면 전체선택 체크박스에도 체크를 해제하도록 한다.
    $("input:checkbox[name='pnum']").click(function(){

        let bFlag = false;

        $("input:checkbox[name='pnum']").each(function(index,elmt){
            
            const is_checked = $(elmt).prop("checked");

            if(!is_checked){
                $("input:checkbox[id='allCheckOrNone']").prop("checked",false);
                bFlag = true;
                return false;   // break
            }

        })  // end of $("input:checkbox[name='pnum']").each(function(index,elmt){-------

        if(!bFlag){     // 체크가 모두 된 상태
            $("input:checkbox[id='allCheckOrNone']").prop("checked",true);
        }
    })  // end of $("input:checkbox[name='pnum']").click(function(){----------

})  // end of $(document).ready(function(){--------------

// === 장바구니 현재주문수량 수정하기 === //
function goOqtyEdit(obj){

    const index = $("button.updateBtn").index(obj);
    // alert(index);

    const cartno = $("input.cartno").eq(index).val();  // 장바구니 번호
    // alert(cartno);
    
    const oqty = $("input.oqty").eq(index).val();       // 수량 개수
    // alert(oqty);

    // === 숫자만 체크하는 정규표현식 === //
    const regExp = /^[0-9]+$/g;
    const bool = regExp.test(oqty);
      
    if(!bool) {
        alert("수정하시려는 수량은 0개 이상이어야 합니다.");
        location.href="javascript:history.go(0)";
        return; // goOqtyEdit 함수 종료
    }

    const pqty = $("input.pqty").eq(index).val();    // 잔고개수
    // alert("주문량 : "+ oqty + ", 잔고량 : " + pqty);  // 주문량 : "3", 잔고량 : "15"
    //   alert(typeof oqty + " , " + typeof pqty);      // string , string 
  
    //   !!! 조심할 것 !!! //
    //   if(oqty > pqty) { 으로 하면 꽝됨!! 왜냐하면 string 타입으로 비교하기에
    //   if("2" > "19") {  참이됨
    //   if(2 > 19) {  거짓이됨    

    if(Number(oqty) > Number(pqty)){
        alert("주문개수가 잔고개수 보다 더 커서 진행할 수 없습니다.");
        location.href="javascript:history.go(0)";
        return; // goOqtyEdit 함수 종료
    }

    if(oqty == "0"){    
        goDel(cartno);      // 해당 장바구니 번호 비우기
    }
    else{
        $.ajax({

            url:"cartEdit.up"      // <%= ctxPath%>/shop/cartEdit.up
            , type:"post"
            , data:{"cartno":cartno
                , "oqty":oqty
            }
            , dataType:"json"
            , success:function(json){
                console.log("~~~ 확인용", JSON.stringify(json));
                // ~~~ 확인용 {"n":1}

                if(json.n == 1){
                    alert("주문수량이 변경되었습니다.");
                    location.href="cartList.up";    // 장바구니 보기 페이지로 간다.      // <%= ctxPath%>/shop/cartList.up
                }
            }
            , error: function(request, status, error){
                alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
            }

        })  // end of $.ajax({-----------
    }   // end of if~else-------------------

}   // end of function goOqtyEdit(obj){-------------

// === 장바구니에서 특정 제품을 비우기 === //
function goDel(cartno){

    const pname = $(event.target).parent().parent().find("span.cart_pname").text();
/*
    if(confirm(pname + "을(를) 장바구니에서 제거하시는 것이 맞습니까?")){

    }
    else{
        alert("장바구니에서 "+pname+" 제품 삭제를 취소하셨습니다.");
    }
*/

    if(confirm(`${pname}을(를) 장바구니에서 제거하시는 것이 맞습니까?`)){       // jsp 에서 작성할 경우 \${pname}
        $.ajax({

            url:"cartDel.up"      // <%= ctxPath%>/shop/cartDel.up
            , type:"post"
            , data:{"cartno":cartno}
            , dataType:"json"
            , success:function(json){
                console.log("~~~ 확인용", JSON.stringify(json));
                // ~~~ 확인용 {"n":1}

                if(json.n == 1){
                    alert("주문수량이 변경되었습니다.");
                    location.href="cartList.up";    // 장바구니 보기 페이지로 간다.      // <%= ctxPath%>/shop/cartList.up
                }
            }
            , error: function(request, status, error){
                alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
            }



        })
    }
    else{
        alert(`장바구니에서 ${pname}제품 삭제를 취소하셨습니다.`);
    }

}   // end of function goDel(cartno){--------------

// // === 장바구니에서 제품 주문하기 === //
// function goOrder(){

//     // === 체크박스의 체크된 개수(checked 속성이용) === //
//     const checkCnt = $("input:checkbox[name='pnum']:checked").length;

//     if(checkCnt < 1){
//         alert("주문하실 제품을 선택하세요!!");
//         return;     // 종료
//     }
//     else{
//         // === 체크박스의 체크된 value값(checked 속성이용) === //

//         // === 체크가 된 것만 읽어와서 배열에 넣어준다. === //
//         const allCnt = $("input:checkbox[name='pnum']").length;

//         const pnumArr = new Array();        // 또는 const pnumArr = [];         // 제품번호
//         const oqtyArr = new Array();        // 또는 const oqtyArr = [];         // 주문량
//         const pqtyArr = new Array();        // 또는 const pqtyArr = [];         // 잔고량
//         const cartnoArr = new Array();      // 또는 const cartnoArr = [];       // 장바구니번호(비울내용)
//         const totalPriceArr = new Array();  // 또는 const totalPriceArr = [];   // 주문총액
//         const totalPointArr = new Array();  // 또는 const totalPointArr = [];   // 포인트

//         for(let i=0; i<allCnt; i++){

//             if($("input:checkbox[name='pnum']").eq(i).prop("checked")){
//                 /*
//                 console.log("제품번호 : " , $("input:checkbox[name='pnum']").eq(i).val() ); 
//                 console.log("주문량 : " ,  $("input.oqty").eq(i).val() );
//                 console.log("잔고량 : " ,  $("input.pqty").eq(i).val() );
//                 console.log("삭제해야할 장바구니 번호 : " , $("input.cartno").eq(i).val() ); 
//                 console.log("주문한 제품의 개수에 따른 가격합계 : " , $("input.totalPrice").eq(i).val() );
//                 console.log("주문한 제품의 개수에 따른 포인트합계 : " , $("input.totalPoint").eq(i).val() );
//                 console.log("======================================");
//                 */
//                pnumArr.push($("input:checkbox[name='pnum']").eq(i).val());  // 배열 넣기 => push
//                oqtyArr.push($("input.oqty").eq(i).val());
//                pqtyArr.push($("input.pqty").eq(i).val());
//                cartnoArr.push($("input.cartno").eq(i).val());
//                totalPriceArr.push($("input.totalPrice").eq(i).val());
//                totalPointArr.push($("input.totalPoint").eq(i).val());
//             }
//         }   // end of for------------

//         for(let i=0; i<checkCnt; i++) {
//             // console.log("확인용 제품번호: " + pnumArr[i] + ", 주문량: " + oqtyArr[i] + ", 잔고량: " + pqtyArr[i] + ", 장바구니번호 : " + cartnoArr[i] + ", 주문금액: " + totalPriceArr[i] + ", 포인트: " + totalPointArr[i]);
//             /*
//                 확인용 제품번호: 4, 주문량: 2, 잔고량: 50, 장바구니번호 : 7, 주문금액: 26000, 포인트: 20
//                 확인용 제품번호: 36, 주문량: 60, 잔고량: 100, 장바구니번호 : 4, 주문금액: 60000000, 포인트: 3600
//                 확인용 제품번호: 3, 주문량: 5, 잔고량: 20, 장바구니번호 : 2, 주문금액: 50000, 포인트: 25
//             */
//         }   // end of for-------------------    

//         for(let i=0; i<checkCnt; i++) {
        
//             if(Number(pqtyArr[i]) < Number(oqtyArr[i])){    // 잔고량이 주문량보다 작을 경우
//                 // 주문할 제품중 아무거나 하나가 잔고량이 주문량 보다 적을 경우
                   
//                 alert("제품번호 "+ pnumArr[i] +" 의 주문개수가 잔고개수 보다 더 커서 진행할 수 없습니다.");
//                 location.href="javascript:history.go(0)";
//                 return; // goOrder 함수 종료
//             }

//         }   // end of for---------------

//         const str_pnum = pnumArr.join();    // join("구분자") 구분자를 안 적을 경우 default ',' 이다.
//         const str_oqty = oqtyArr.join();
//         const str_cartno = cartnoArr.join();
//         const str_totalPrice = totalPriceArr.join();
//         const str_totalPoint = totalPointArr.join();

//         let n_sum_totalPrice = 0;
//         for(let i=0; i<totalPriceArr.length; i++){
//             n_sum_totalPrice += Number(totalPriceArr[i]);
//         }   // end of for-----------

//         let n_sum_totalPoint = 0;
//         for(let i=0; i<totalPointArr.length; i++){
//             n_sum_totalPoint += Number(totalPointArr[i]);
//         }   // end of for-----------

//     /*
//         console.log("확인용 str_pnum : ", str_pnum);                 // 확인용 str_pnum : 4,36,3
//         console.log("확인용 str_oqty : ", str_oqty);                 // 확인용 str_oqty : 2,60,5
//         console.log("확인용 str_cartno : ", str_cartno);             // 확인용 str_cartno : 7,4,2
//         console.log("확인용 str_totalPrice : ", str_totalPrice);     // 확인용 str_totalPrice : 26000,60000000,50000
//         console.log("확인용 str_totalPoint : ", str_totalPoint);     // 확인용 str_totalPoint : 20,3600,25
//         console.log("확인용 n_sum_totalPrice : ", n_sum_totalPrice); // 확인용 n_sum_totalPrice : 60076000
//         console.log("확인용 n_sum_totalPoint : ", n_sum_totalPoint); // 확인용 n_sum_totalPoint : 3645
//     */

// /*
//         $.ajax({
//             url:"orderAdd.up"      // <%= ctxPath%>/shop/orderAdd.up
//             , type:"post"
//             , data:{"n_sum_totalPrice":n_sum_totalPrice
//                 , "n_sum_totalPoint":n_sum_totalPoint
//                 , "str_pnum_join":str_pnum
//                 , "str_oqty_join":str_oqty
//                 , "str_totalPrice_join":str_totalPrice
//                 , "str_cartno_join":str_cartno
//             }
//             , success:function(json){

//             }
//             , error: function(request, status, error){
//                 alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
//             }
//         })
// */
//     }   // end of if~else--------------------------------

// }   // end of function goOrder(){-----------------------

// === 전체선택, 전체해제 === //
function allCheckBox(){

    const bool = $("input:checkbox[id='allCheckOrNone']").is(":checked");
    /*
        $("input:checkbox[id='allCheckOrNone']").is(":checked"); 은
        선택자 $("input:checkbox[id='allCheckOrNone']") 이 체크되어지면 true를 나타내고,
        선택자 $("input:checkbox[id='allCheckOrNone']") 이 체크가 해제되어지면 false를 나타내어주는 것이다.
    */

    $("input:checkbox[name='pnum']").prop("checked", bool);

}   // end of function allCheckBox(){--------------