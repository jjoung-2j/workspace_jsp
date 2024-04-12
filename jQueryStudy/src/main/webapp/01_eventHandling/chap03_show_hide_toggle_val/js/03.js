$(document).ready(function(){

    $("div#photo").hide();

    $("button#btn").text("보이기클릭");

    $("button#btn").bind('click',function(){
        if($(this).text() == "보이기클릭"){
            // $(this) 는 이벤트가 발생되어진 자기자신 엘리먼트를 말한다.
            $(this).text("감추기클릭");
            $(this).css({"background-color":"gray", "color":"black"});
            // jQuery 에서는 카멜기법이 아니라 스네이크기법 그대로 사용한다.

        }
        else if($(this).text() == "감추기클릭"){
            // $(this) 는 이벤트가 발생되어진 자기자신 엘리먼트를 말한다.
            $(this).text("보이기클릭");
            $(this).css({"background-color":"", "color":""});
            // jQuery 에서는 카멜기법이 아니라 스네이크기법 그대로 사용한다.
        }

        $("div#photo").toggle();
        // 선택자요소.toggle(); 은 선택자 요소가 현재 사라진 상태라면 .show() 메소드의 동작을 수행하고, 
        // 나타나 있는 상태라면 .hide() 메소드의 동작을 수행한다.  
    })

})  // end of $(document).ready(function(){})---------------------------