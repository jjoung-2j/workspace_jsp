$(document).ready(function(){
  
    // 굵게
    $("span.bold").bind('click',function(){
        $("div#result").html("<span id='result_bold'>" + $(this).text() + "버튼을 클릭하셨군요</span>");
    })

    // 기울임꼴
    $("span.italic").bind('click',function(){
        $("div#result").html("<span id='result_italic'>" + $(this).text() + "버튼을 클릭하셨군요</span>");
    })

    // 지우기
    $("span.clear").bind('click',function(){
        $("div#result").html("");
    })

})   // end of $(document).ready(function(){}------------------------------