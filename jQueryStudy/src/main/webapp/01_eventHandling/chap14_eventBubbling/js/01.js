$(document).ready(function() {
   
    $("div").click(function(){
       alert("div 엘리먼트를 클릭했습니다.");
    });
    
    $("p").click(function(){
       alert("p 엘리먼트를 클릭했습니다.");
    });
    
    $("span").click(function(){
       alert("span 엘리먼트를 클릭했습니다.");
    });
    
    /*
       HTML 파일의 DOM(Document Object Model)에서
       가장 상위의 엘리먼트는 div 엘리먼트이고,
       그 아래에 문단(p) 엘리먼트(<p> 는 <div>의 자식 엘리먼트 ),
       그리고 마지막에 span 엘리먼트(<span> 는 <p>의 자식 엘리먼트 )가 
       나오고 있다.
    */   
    
 }); // end of $(document).ready(function() {})-------------