$(document).ready(function() {
   
    $("div").click(function(e){

        // 엘리먼트와 엘리먼트가 같은지 다른지 비교할때 is 를 사용한다.
        // 선택자1.is(선택자2) 은 선택자1과 선택자2가 동일한 엘리먼트를 가리키는 것이라면 true 이고, 
        // 선택자1.is(선택자2) 은 선택자1과 선택자2가 동일한 엘리먼트를 가리키는 것이 아니라면 false 이다.
        if($(e.target).is("span.s")){
            alert("span 엘리먼트를 클릭했습니다.");
        }
        else if($(e.target).is("p.p")){
            alert("p 엘리먼트를 클릭했습니다.");
        }
        else{
            alert("div 엘리먼트를 클릭했습니다.");
        }
    });
    
    /*
       HTML 파일의 DOM(Document Object Model)에서
       가장 상위의 엘리먼트는 div 엘리먼트이고,
       그 아래에 문단(p) 엘리먼트(<p> 는 <div>의 자식 엘리먼트 ),
       그리고 마지막에 span 엘리먼트(<span> 는 <p>의 자식 엘리먼트 )가 
       나오고 있다.
    */   
    
 }); // end of $(document).ready(function() {})-------------