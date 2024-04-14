$(document).ready(function(){

    $("div.answerCheck").hide();

    // "정답확인" 버튼을 클릭하였을 경우
    $("button#btnOK").bind('click', function(){

        // 정답이든 오답이든 라디오를 선택했는지 선택을 아예 아무것도 안했는지 유무를 알아오는 용도
        let is_choice = false;
        // 정답을 선택했는지 오답을 선택했는지 알아오는 용도 
        let is_correct = false;

        $("input:radio[name='answer']").each(function(index, elmt){
            
            /*
            if(index > 1){
                return false;   // break와 동일
                // each 내에서 return false; 가 마치 for문 에서의 break; 와 같은 기능이다. 
                // each 내에서 return true; 가 마치 for문 에서의 continue; 와 같은 기능이다.
            }
            */
            // console.log("index => ", index);
            /*
                index =>  0
                index =>  1
            */

            // console.log("라디오 value => ", $(this).val());
            // console.log("라디오 value => ", $(elmt).val());
            // $(this) 와 $(elmt) 은 동일한 엘리먼트를 가리키는 것이다.
            // 즉, $(this) 와 $(elmt) 은 같은 것이다.
            /*
                라디오 value =>  20
                라디오 value =>  30
                라디오 value =>  23
                라디오 value =>  45
            */

        /*
            ==== jQuery 에서 라디오 또는 체크박스에 선택을 했는지를 알아오는 2가지 방법 ====
                
             1. $(라디오 또는 체크박스의 선택자).prop("checked") 
                ==> 선택을 했으면 true, 선택을 안했으면 false
                
             2. $(라디오 또는 체크박스의 선택자).is(":checked")   
                ==> 선택을 했으면 true, 선택을 안했으면 false
         */

            // console.log("라디오 선택여부 => ", $(elmt).prop("checked"));
            // 또는
            // console.log("라디오 선택여부 => ", $(elmt).is(":checked"));
            // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            /*
                라디오 선택여부 =>  false
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                라디오 선택여부 =>  false
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                라디오 선택여부 =>  true
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                라디오 선택여부 =>  false
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            */

            if($(elmt).prop("checked")){
                // 라디오 4개 중 아무거나 1개를 선택한 경우라면
                is_choice = true;

                if((index+1)==3){   // 정답인 3번을 선택한다면
                    is_correct = true;
                }

                return false;   // each 문 내에 존재하니 break 로 적용
            }

        })  // end of $("input:radio[name='answer']").each(function(index, elmt){}----

        // console.log("반복문을 빠져나옴");

        if(!is_choice){
            // 정답이든 오답이든 라디오 선택을 아무것도 안한 경우
            // alert("정답을 선택하세요!!");
            if(confirm("정답을 미기입 하셨는데 정말로 진행하시겠습니까?")){

                $(this).hide();
                // 또는
                // $("button#btnOK").hide();

                $("div.no").show();
            }
        }
        else{   // 정답이든 오답이든 라디오 선택을 한 경우
            $("button#btnOK").hide();
            // 또는
            // $(this).hide();

            if(is_correct){
                $("div.ok").show();
            }
            else{
                $("div.no").show();
            }
        }

///////////////////////////////////////////////////////////////////////////////

        // "다시시작" 버튼을 클릭한 경우
        $("button#btnRestart").bind('click',function(){
            $("button#btnOK").show();
            $("div.answerCheck").hide();

            // name 이 answer 인 모든 라디오의 선택이 안되어지도록 만드는 것이다.
            $("input:radio[name='answer']").prop("checked",false);

        })  // end of $("button#btnRestart").bind('click',function(){})---------

    })  // end of $("button#btnOK").bind('click', function(){})------------

})  // end of $(document).ready(function(){}---------------------