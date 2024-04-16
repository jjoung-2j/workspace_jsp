
$(document).ready(function() {
	
	$("div#div1 > img#fish1").click((e)=>{
		$(e.target).animate({left:600, top:400}, 3000).fadeTo(2500, 0.1, func_myimg); 
		                                                              // func_myimg 을 콜백함수 라고 부른다.       
	});
	/*                                                                             
		선택자인 이미지를 position(relative)에 따라
		왼쪽에서 부터 600px(left:600), 위에서 부터 400px(top:400) 떨어진 위치로
		3000 밀리초(== 3초) 동안 옮겨라는 말이다.
		3000 대신에 'slow'(==600), 'normal'(==400), 'fast'(==200)를 사용할 수 있다.
		
		선택자.fadeTo(2500, 0.1, 함수이름만) 는 선택자를  2500 밀리초(== 2.5초) 동안 opacity(투명도)를 0.1로 만든 후 함수이름에 해당 하는 함수를 실행시켜라는 말이다. 
		함수이름에 해당 하는 함수를 콜백함수(callback function)라고 부른다.
	*/
	
}); // end of $(document).ready(function() {})-------------


function func_myimg() {
	$("div#div1").html("<img src='images/kimthLarge.jpg' />");
}


