/*
   웹브라우저에 HTML문서(documet)가 로드되고 나면 
   자동적으로 실행할 내용이 있으면 그 내용은 아래와 같이 기술해주면 된다.
*/
$(document).ready(function(){
    // alert("Hello~~");

    // 팝업창 띄우기 
    window.open("popup_contents.html", "my_popup", "left=100px, top=100px, width=400px, height=350px");

    $("span#test").html("Hello?<br>jQuery");

    $("span.example").html("Welcome to^^<br>제이쿼리");
});
