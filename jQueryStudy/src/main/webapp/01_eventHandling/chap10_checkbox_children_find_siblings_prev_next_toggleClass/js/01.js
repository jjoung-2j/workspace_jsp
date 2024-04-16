$(document).ready(function(){

    // 선택자.children() 은 선택자의 자식(손자는 아님)태그(자식요소)만을 가리키는 것이다.
    $("div#container1").children().css({'border':'solid 1px red', 'margin' : '20px'});

    $("div#container1").find(".baseball").append("&nbsp;<span style='color:blue;'>야구는 영어로 Baseball</span>");   
    // li.baseball 도 가능 == .baseball

    $("div#container1").find("#football").prepend("<span style='color:green;'>축구는 영어로 football</span>&nbsp;"); 
    // 선택자1.find(선택자2)은 선택자1 안에 있는 선택자2 를 가리키는 것이다.

    $("div#container2").find("*").css({'border':'solid 1px blue', 'margin':'20px'});
   // 선택자.find("*") 은 선택자안에 있는 모든 하위요소(자식 뿐만 아니라 자손까지 포함)를 가리키는 것이다. 

})  // end of $(document).ready(function(){}-------------------