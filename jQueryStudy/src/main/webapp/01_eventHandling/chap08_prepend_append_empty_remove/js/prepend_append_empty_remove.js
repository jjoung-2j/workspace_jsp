$(document).ready(function() {

    let cnt = 0;
    
     const lovecountrysong1 = "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 <span style='color: red; font-weight: bold;'>우리나라</span> 만세"; 
    const lovecountrysong2 = "무궁화 삼천리 화려강산 대한사람 대한으로 <span style='color: blue; font-weight: bold;'>길이보전</span> 하세"; 
    
    $("div#container > div#divBtn > span.add").click(function(){
       cnt++;
       
       $("div.div1").prepend(`<p>${cnt}.${lovecountrysong1}</p>`);
       // 선택자.prepend("내용물"); 은 내용물을 선택자에 앞(위)쪽 방향으로 덧붙여 가는 것.
       
       $("div.div2").append(`<p>${cnt}.${lovecountrysong2}</p>`);
       // 선택자.append("내용물"); 은 내용물을 선택자에 뒤(아래)쪽 방향으로 덧붙여 가는 것. 
       
    });// end of $("div#container > div#divBtn > span.add").click(function(){})----------
    
    
    $("div#container > div#divBtn > span.empty").click(function(){
       $("div.div1").empty();
       $("div.div2").empty();
       // 선택자.empty(); 는 선택자 태그속에 들어있는 내용물을 비우는 것.
       
    });// end of $("div#container > div#divBtn > span.empty").click(function(){})-------- 
    
    
    $("div#container > div#divBtn > span.remove").click(function(){
       $("div.div1").remove();
       $("div.div2").remove();
       // 선택자.remove(); 는 선택자 태그를 삭제하는 것.
       
    });// end of $("div#container > div#divBtn > span.remove").click(function(){})-------- 
    
       
 }); // end of $(document).ready(function() {})-------------   