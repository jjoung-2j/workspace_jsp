$(document).ready(function(){

    $("div#result").hide();

    $("span.buttons").bind('click', function(e){

		// == 자바스크립트에서 난수 발생시키기 ==
    /*
        Math.random(); 은 
        0 이상 1 미만의 랜덤한 실수가 발생되어진다.
        0 <= Math.random() < 1 
         
        == 1 부터 5까지 의 난수를 발생시키기 ==
            공식 :  Math.floor( Math.random()*(max-min+1) ) + min; 
          
        Math.random() 이 0 이 나왔다라면
        Math.floor( 0*(5-1+1) ) + 1;
        Math.floor( 0 ) + 1; ==> 0+1 ==> 1
        
        Math.random() 이 0.4 이 나왔다라면
        Math.floor( 0.4*(5-1+1) ) + 1;
        Math.floor( 2.0 ) + 1; ==> 2+1 ==> 3
        
        Math.random() 이 0.9 이 나왔다라면
        Math.floor( 0.9*(5-1+1) ) + 1;
        Math.floor( 4.5 ) + 1; ==> 4+1 ==> 5
    */
        
        const n_random = Math.floor( Math.random()*(5-1+1) ) + 1; 
        // n_random 은 1 ~ 5 까지 중 하나이다.

        const s_user_choice = $(e.target).text();
        // 이벤트(지금은 click)가 발생되어진 엘리먼트의 내용물의 값을 얻어온다.

    /////////////////////////////////////////////////////////////////////////

        if(s_user_choice == n_random){  
            // 또는 
            // Number(s_user_choice) === n_random
            // 또는
            // s_user_choice == String(n_random) 
            // 또는 
            // s_user_choice == n_random.toString()

            $("div#result").html(`<span style='color:blue;'>당첨!! 축하합니다.</span>`);

        }
        
        $("div#result").show();

        // 선택자.empty(); 은 선택자 안에 들어있는 내용물을 모두 비운다는 말이다.
        $("div#firstdiv").empty();

    })  // end of  $("span.buttons").bind('click', function(e){})-------------

})  // end of $(document).ready(function(){})----------