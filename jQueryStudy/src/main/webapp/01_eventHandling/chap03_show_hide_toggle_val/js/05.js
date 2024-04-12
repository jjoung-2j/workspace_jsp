$(document).ready(function(){

    $("div.answerCheck").hide();

    // ==== 체크박스를 라디오 처럼 만들어 주기 시작 ==== //
    $("input:checkbox[name='answer']").click(function(e){
        // console.log("확인용");
        $("input:checkbox[name='answer']").prop("checked",false);
        $(e.target).prop("checked",true);
        // $(e.target) 은 실제로 이벤트가 발생되어진 엘리먼트를 말한다.
    });
    // ==== 체크박스를 라디오 처럼 만들어 주기 끝 ==== //

///////////////////////////////////////////////////////////////////////////////////////


    // "정답확인" 버튼을 클릭하였을 경우
    $("button#btnOK").bind('click', function(){

        // 정답이든 오답이든 체크박스를 선택했는지 선택을 아예 아무것도 안했는지 유무를 알아오는 용도
        let is_choice = false;
        // 정답을 선택했는지 오답을 선택했는지 알아오는 용도 
        let is_correct = false;

        $("input:checkbox[name='answer']").each(function(index, elmt){
            
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

            // console.log("체크박스 value => ", $(this).val());
            // console.log("체크박스 value => ", $(elmt).val());
            // $(this) 와 $(elmt) 은 동일한 엘리먼트를 가리키는 것이다.
            // 즉, $(this) 와 $(elmt) 은 같은 것이다.
            /*
                체크박스 value =>  20
                체크박스 value =>  30
                체크박스 value =>  23
                체크박스 value =>  45
            */

        /*
            ==== jQuery 에서 체크박스 또는 체크박스에 선택을 했는지를 알아오는 2가지 방법 ====
                
             1. $(라디오 또는 체크박스의 선택자).prop("checked") 
                ==> 선택을 했으면 true, 선택을 안했으면 false
                
             2. $(라디오 또는 체크박스의 선택자).is(":checked")   
                ==> 선택을 했으면 true, 선택을 안했으면 false
         */

            // console.log("체크박스 선택여부 => ", $(elmt).prop("checked"));
            // 또는
            // console.log("체크박스 선택여부 => ", $(elmt).is(":checked"));
            // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            /*
                체크박스 선택여부 =>  false
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                체크박스 선택여부 =>  false
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                체크박스 선택여부 =>  true
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                체크박스 선택여부 =>  false
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            */

            if($(elmt).prop("checked")){
                // 체크박스 4개 중 아무거나 1개를 선택한 경우라면
                is_choice = true;

                if((index+1)==3){   // 정답인 3번을 선택한다면
                    is_correct = true;
                }

                return false;   // break 와 같은 기능
            }

        })  // end of $("input:radio[name='answer']").each(function(index, elmt){}----

        // console.log("반복문을 빠져나옴");

        if(!is_choice){
            // 정답이든 오답이든 체크박스 선택을 아무것도 안한 경우
            // alert("정답을 선택하세요!!");
            if(confirm("정답을 미기입 하셨는데 정말로 진행하시겠습니까?")){

                $(this).hide();
                // 또는
                // $("button#btnOK").hide();

                $("div.no").show();
            }
        }
        else{   // 정답이든 오답이든 체크박스 선택을 한 경우
            $("button#btnOK").hide();
            // 또는
            // $(this).hide();

            if(is_correct){
                $("div.ok").show();
            }
            else{
                $("div.no").show();
            }

        ///////////////////////////////////////////////////////////////
            // 정답확인 이후 체크박스의 선택 변경을 하지 못하게 비활성화 하기
            // $("input:checkbox[name='answer']").prop('disabled',true);
            // 또는
            $("input:checkbox[name='answer']").attr('disabled',true);
        ////////////////////////////////////////////////////////////////
        }

///////////////////////////////////////////////////////////////////////////////

        // "다시시작" 버튼을 클릭한 경우
        $("button#btnRestart").bind('click',function(){
            $("button#btnOK").show();
            $("div.answerCheck").hide();

            // name 이 answer 인 모든 체크박스의 선택이 안되어지도록 만드는 것이다.
            $("input:checkbox[name='answer']").prop("checked",false);

        /////////////////////////////////////////////////////////////////////////
            // 정답확인 이후 체크박스의 선택 변경을 하지 못하게 비활성화했던 것을 제거하기
            // $("input:checkbox[name='answer']").attr('disabled',false);
            // 또는
            // $("input:checkbox[name='answer']").prop('disabled',false);
            // 또는
            $("input:checkbox[name='answer']").removeAttr('disabled');
        /////////////////////////////////////////////////////////////////////


        })  // end of $("button#btnRestart").bind('click',function(){})---------

    })  // end of $("button#btnOK").bind('click', function(){})------------

})  // end of $(document).ready(function(){}---------------------