$(document).ready(function(){

    $("input#answer").focus();

    // "정답확인" 버튼을 클릭했을 경우
    $("button#btnOK").bind('click', function(){

        const user_answer = $("input#answer").val().trim();

        if(user_answer == ""){  // 문제를 풀지 않은 경우
            if(confirm("정답을 미기입 하셨는데 정말로 진행하시겠습니까?")){
                
                // 채점
                func_check(user_answer);
            }
            else{
                $("input#answer").val("").focus();
            }
        }
        else{   // 문제를 푼 경우
            // 채점
            func_check(user_answer);
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


// === 함수 선언식 ==== //
// Function Declaration
function func_check(user_answer){
    if(user_answer == 23){      // 정답이라면
        
        $("div.ok").html(`<img src='images/ok.png'/>`);
        // 위의 것만 있을 경우 실행이 한번밖에 되지않는다.
        // 다시시작 이후에도 정답확인을 할 경우를 생각하여 show와 hide 를 설정해야 한다.
        
        $("div.ok").show();
        $("div.no").hide();
        
    }
    else{   // 오답이라면

        $("div.no").html(`<img src='images/no.png'/>`);
        // 위의 것만 있을 경우 실행이 한번밖에 되지않는다.
        // 다시시작 이후에도 정답확인을 할 경우를 생각하여 show와 hide 를 설정해야 한다.
        
        $("div.ok").hide();
        $("div.no").show();
        
    }

}   // end of function func_check(user_answer){}------------------