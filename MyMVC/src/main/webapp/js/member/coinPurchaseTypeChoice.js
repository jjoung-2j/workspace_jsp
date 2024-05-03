$(document).ready(function(){

    $("td#error").hide();

    $("input:radio[name='coinmoney']").click(e => {

        const index = $("input:radio[name='coinmoney']").index($(e.target));
        // console.log("확인용 index => ", index);
        // 팝업창에서 F12 를 눌러서 확인해야 한다.
    /*
        확인용 index =>  0
        확인용 index =>  1
        확인용 index =>  2
    */
        $("td>span").removeClass("stylePoint");             // 모두 효과 제거 후
        $("td>span").eq(index).addClass("stylePoint");      // 해당사항만 효과 주기
        // 순수한 자바 querySelectAll("td>span")[index].eq
        // $("td>span").eq(index); ==> $("td>span")중에 index 번째의 요소인 엘리먼트를 선택자로 보는 것이다.
        // $("td>span")은 마치 배열로 보면 된다. $("td>span").eq(index) 은 배열중에서 특정 요소를 끄집어 오는 것으로 보면 된다. 예를 들면 arr[i] 와 비슷한 뜻이다.

    })  // end of $("input:radio[name='coinmoney']").click(e => {})----------

    // === [충전결제하기] 에 마우스를 올리거나 마우스를 빼면 === //
    // hover -> mouseover-mouseout
    $("td#purchase").hover(function(e){
        $(e.target).addClass("purchase");
    }
    ,function(e){
        $(e.target).removeClass("purchase");
    }
    );  // end of $("td#purchase").hover(function(e){},function(e){})

})  // end of $(document).ready(function(){})-------------

////////////////////////////////////////////////////////////////////////////////////////////

// === Function Declaration === //

// === [충전결제하기] 를 클릭했을 때 이벤트 처리하기 === //
function goCoinPayment(ctxPath, userid){

    const checked_cnt = $("input:radio[name='coinmoney']:checked").length;

    if(checked_cnt == 0){   // 결제 금액을 선택하지 않았을 경우
        $("td#error").show();
        return;     // 종료
    }
    else{     // 결제하러 들어간다.
        const coinmoney = $("input:radio[name='coinmoney']:checked").val();     // input 의 value 값 (충전금액)
        // alert(`${coinmoney}원 결제하러 들어간다.`);
        
        /* === 팝업창에서 부모창 함수 호출 방법 3가지 ===
            1-1. 일반적인 방법
            opener.location.href = "javascript:부모창스크립트 함수명();";
                        
            1-2. 일반적인 방법
            window.opener.부모창스크립트 함수명();

            2. jQuery를 이용한 방법
            $(opener.location).attr("href", "javascript:부모창스크립트 함수명();");
        */

            // 1번 방법
            opener.location.href = `javascript:goCoinPurchaseEnd("${ctxPath}", "${coinmoney}", "${userid}")`;    // 문자를 보낼 시 반드시 따옴표를 해주어야 한다.

        self.close();   // 자신의 팝업창을 닫는 것이다.
        
    }

}   // end of function goCoinPayment(ctxPath, userid){}-----------
