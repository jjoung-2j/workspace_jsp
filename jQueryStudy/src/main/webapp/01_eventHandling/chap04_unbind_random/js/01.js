$(document).ready(function(){

    $("div#result").hide();

    $("span.buttons").bind('click', function(e){

        if($(e.target).is("span.lucky")){
            // $(e.target) 은 실제로 이벤트가 발생되어진 엘리먼트를 말한다.
      
            // 엘리먼트와 엘리먼트가 같은지 다른지 비교할때 is 를 사용한다.
            // 선택자1.is(선택자2) 은 선택자1과 선택자2가 동일한 엘리먼트를 가리키는 것이라면 true 이고, 
            // 선택자1.is(선택자2) 은 선택자1과 선택자2가 동일한 엘리먼트를 가리키는 것이 아니라면 false 이다.
        
            $("div#result").html(`<span style='color:blue;'>당첨!! 축하합니다.</span>`);

        }
        
        $("div#result").show();

        // 선택자 $("span.buttons") 에 대해 click 이벤트가 발생하지 않도록 한다.
        $("span.buttons").unbind('click');

    })  // end of  $("span.buttons").bind('click', function(e){})-------------

})  // end of $(document).ready(function(){})----------