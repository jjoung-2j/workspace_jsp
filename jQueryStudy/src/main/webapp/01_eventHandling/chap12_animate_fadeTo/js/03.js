
$(document).ready(function() {
	
	scroll_loop();
	
}); // end of $(document).ready(function() {})-------------


function scroll_loop() {

/*
   선택자.animate(properties
		       ,speed
		       ,callback함수);
    -- properties : 선택자(엘리먼트)가 에니메이션이 끝나고 갖게 될 속성을 의미한다.
    -- speed : 에니메이션이 완료되어지는 시간으로 단위는 밀리초 이다.
              'slow'   == 600 밀리초
              'normal' == 400 밀리초
              'fast'   == 200 밀리초
              
    -- callback함수 : 에니메이션이 끝나고 나서 자동적으로 실행되어지는 함수이다.(콜백함수)  
*/
	$("img#fish").animate({left:600, top:400, width:300, height:240}
		                 ,'slow'
		                 ,function(){ // callback함수
		                     $(this).fadeTo(1000, 0.0); // $(this) 가 $("img#fish") 이다.
		                     $(this).fadeTo(1000, 1.0);
		                     $(this).animate({left:0, top:0, width:150, height:120}
		                                     ,'slow'
		                                     ,scroll_loop);
		                                   // 콜백함수
		                  });
	
}// end of function scroll_loop()--------------------------

