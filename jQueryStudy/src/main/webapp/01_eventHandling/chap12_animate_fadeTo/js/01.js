
$(document).ready(function() {
	
	$("img#fish1").click((e)=>{
		$(e.target).animate({left:600, top:500}, 5000).slideUp(3000); 
	});
	/*
		선택자인 이미지를 position(relative)에 따라
		왼쪽에서 부터 600px(left:600), 위에서 부터 500px(top:500) 떨어진 위치로
		5000 밀리초(== 5초) 동안 옮겨라는 말이다.
		5000 대신에 'slow'(==600), 'normal'(==400), 'fast'(==200)를 사용할 수 있다.
	*/
	
	$("img#fish2").click((e)=>{
		$(e.target).animate({left:600, top:500}, 5000).slideUp(3000); 
	});
	/*
		선택자인 이미지를 position(absolute)에 따라
		왼쪽에서 부터 600px(left:600), 위에서 부터 500px(top:500) 떨어진 위치로
		5000 밀리초(== 5초) 동안 옮겨라는 말이다.
		5000 대신에 'slow'(==600), 'normal'(==400), 'fast'(==200)를 사용할 수 있다.
	*/
	
}); // end of $(document).ready(function() {})-------------	
