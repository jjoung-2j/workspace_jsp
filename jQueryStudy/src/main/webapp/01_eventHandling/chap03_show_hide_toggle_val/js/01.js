$(document).ready(function(){

    $("div.answerCheck").hide();

    $("input#answer").focus();

    // "정답확인" 버튼을 클릭했을 경우
    $("button#btnOK").bind('click', function(){

        const user_answer = $("input#answer").val().trim();

        if(user_answer == ""){  // 문제를 풀지 않은 경우
            if(confirm("정답을 미기입 하셨는데 정말로 진행하시겠습니까?")){
                $("div.ok").hide();
                $("div.no").show();
            }
            else{
                $("input#answer").focus();
            }
        }
        else{   // 문제를 푼 경우
            if(user_answer == 17){      // 정답이라면
            // if(user_answer === "17"){    
            // 타입과 값이 모두 같은경우를 찾는 , string 타입이므로 ' " ' 을 사용해주어야 한다.
                $("div.ok").show();
                $("div.no").hide();
            }
            else{       // 오답이라면
                $("div.ok").hide();
                $("div.no").show();
            }

        }

    })      // end of $("button#btnOK").bind('click', function(){})---------------------

    // "다시시작" 버튼을 클릭했을 경우
    $("button#btnRestart").bind('click', function(){

        // 값을 비우고 focus 주기
        $("input#answer").val("").focus();
        
        // 정답 확인 결과 감추기
        $("div.answerCheck").hide();

    })      // end of $("button#btnRestart").bind('click', function(){})------------

})      // end of $(document).ready(function(){}------------------