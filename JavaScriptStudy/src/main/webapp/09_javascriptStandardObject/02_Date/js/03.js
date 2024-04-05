window.onload = function(){

    const btnSubmit = document.querySelector("button#btnSubmit");      // "제출하기" 버튼

    const timerDiv = document.querySelector("div#timer");              // 타이머를 보여줄 장소

    let time = 600;     // 타이머 시간을 10분으로 지정함.

    // ==== 타이머 함수 만들기 시작 ==== //
    const timer = function(){

        if(time < 0){   // 시간이 다 된 경우
            alert("시험시간 종료!!\n자동으로제출됩니다.");

            // 타이머 삭제하기
            clearInterval(interval_timer);  // interval_timer 는 중단해야할 setInterval 함수를 가리키는 것이다.

            // 제출 후 "제출하기" 버튼 삭제하기
            btnSubmit.disabled = true;      // "제출하기" 버튼 비활성화  
        //  btnSubmit.disabled = false;     // "제출하기" 버튼 활성화[참고]
            // 또는
        //  btnSubmit.setAttribute('disabled',true);        // "제출하기" 버튼 비활성화
        //  btnSubmit.setAttribute('disabled',false);       // "제출하기" 버튼 비활성화

            check();    // 채점하는 함수 호출
        
        }
        else{
            let minute = "";
            let second = "";

            minute = parseInt(time/60);      // 소수부는 없애 버리고 정수부만 가져오는 것이다.
            if(minute < 10){
                minute = "0" + minute;
            }

            second = time%60;               // time 을 60으로 나누었을때의 나머지
            if(second < 10){
                second = "0" + second;
            }

            timerDiv.innerHTML = `${minute}:${second}`;

            time--;

        }   // end of if~else-------------------------------


    }
    // ==== 타이머 함수 만들기 끝 ==== //

    timer();    // 타이머 함수 호출하기 => 존재할 경우 로딩하자 나온다. 없을 경우 1초 있다가 나온다.

    // 1초 마다 주기적으로 타이머 함수가 호출되도록 지정한다.
//  const interval_timer = setInterval(function(){timer();},1000);     
    // 또는
    const interval_timer = setInterval(timer,1000);                  

/*
    btnSubmit.onclick = function(){
        alert("확인용 : 제출하기 비활성화/활성화 체크\n => time > 0 으로 설정후(disabled)")
    }
*/

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

    const arr_quizData = [
        {
            question : "문제1. 대한민국의 수도는?",
            answers  : {
                1 : "부산",     // 1을 a 로 변경해도 동일하게 출력
                2 : "수원",
                3 : "서울",
                4 : "인천"
            },
            correct : 3
        },
        
        {
            question : "문제2. 1+1은?",
            answers  : { 
                1 : "1",
                2 : "2",
                3 : "3",
                4 : "4"
            },
            correct : 2 
        },
        
        {
            question : "문제3. 미국의 수도는?",
            answers  : { 
                1 : "뉴욕",
                2 : "파리",
                3 : "로스엔젤러스",
                4 : "워싱턴",
                5 : "런던"
            },
            correct : 4  
        },
        
        {
            question : "문제4. 사진속의 인물의 이름은?<div><img src='images/iyou.jpg'/></div>",
            answers  : { 
                1 : "엄정화",
                2 : "아이유",
                3 : "김태희",
                4 : "박보영"
                },
            correct : 2 
        }
    ];

    const quizDiv = document.querySelector("div#quiz_display");     // 퀴즈문항을 보여줄 장소

    // ==== 퀴즈문항을 html 로 만들기 시작 ==== //
    let html = ``;

    arr_quizData.forEach((item,index) => {

        html += `<p id="q${index}">${item.question}</p>`;   // 여기서 q 는 새로 만든 id

        html += `<ol>`;

        // <li> 의 개수가 모두 다르므로 for 문 사용하기
        // 어떤 객체의 속성(키)들을 모두 불러올때는 for문에서 of 가 아니라 in 을 사용한다.
        for(let property_name in item.answers){     

            html += `<li> <label for ="${index}${property_name}">${item.answers[property_name]}&nbsp;</label>
                    <input id = "${index}${property_name}" type="radio" name ="question${index}" 
                    value="${property_name}" /></li>`;
            // 객체명.속성명 은 속성명에는 변수가 사용될 수 없다.
            // 객체명[속성명] 은 속성명에 변수가 사용될 수 있다.
            // ${item.answers[property_name]} 는 "부산" 과 같은 것을 말하는 것이다.
            
            // 라디오는 반드시 name 값이 동일해야 한다.
            // value 값은 item.answers 의 속성명인 1 2 3 4 로 되어진다.

        }   // end of for--------------

        html += `</ol>`;

        html += `<div class='ox' id='ox${index}''></div>`;      // 퀴즈 문항에 대해 정답인지 틀린것인지 보여줄 장소

    });     // end of arr_quizData.forEach((item,index)------------

    quizDiv.innerHTML = html;
    // ==== 퀴즈문항을 html 로 만들기 끝 ==== //

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

    // === "제출하기" 버튼 클릭시 이벤트 처리하기 시작 === //
    // 제출하기 버튼 클릭시 이벤트함수 만들기
    const handleSubmit = function(){
        alert("제출이 완료되었습니다.")

        // 타이머 삭제하기
        clearInterval(interval_timer);  // interval_timer 는 중단해야할 setInterval 함수를 가리키는 것이다.
    
        timerDiv.innerHTML = `00:00`;   // 제출 후 시간 00:00 으로 지정

        // 제출 후 "제출하기" 버튼 비활성화 하기
        btnSubmit.disabled = true;                      // "제출하기" 버튼 비활성화
        // 또는
    //  btnSubmit.setAttribute('disabled',true);        // "제출하기" 버튼 비활성화
        // 또는
    //  btnSubmit.setAttribute('disabled',false);       // "제출하기" 버튼 비활성화

        check();    // 채점하는 함수 호출

    }

    // 이벤트 실행하기 => btnSubmit 은 "제출하기" 버튼이다. 이것은 맨 위에서 만들었다.
    // btnSubmit.onclick = function(){}
    // 또는
    btnSubmit.addEventListener('click',handleSubmit);

    // === "제출하기" 버튼 클릭시 이벤트 처리하기 끝 === //

//////////////////////////////////////////////////////////////////////////////////

    // === 채점하는 함수 만들기 시작 === //
    const check = function(){

        let answer_cnt = 0;     // 정답개수 누적용

        // 문항 수 만큼 채점하기
        arr_quizData.forEach((item,index) => {
            // console.log(`${index+1}번 문제 정답은 ${item.correct}`);
            /*
                1번 문제 정답은 3
                2번 문제 정답은 2
                3번 문제 정답은 4
                4번 문제 정답은 2
            */

            // === 퀴즈 문항 뒤에 정답번호 공개하기 === //
            // 정답을 보여주기전 문제를 읽어와서 확인해본다.
            const question = document.querySelector(`p#q${index}`).innerHTML;    
            // console.log(question);
            /*
                문제1. 대한민국의 수도는?
                문제2. 1+1은?
                문제3. 미국의 수도는?
                문제4. 사진속의 인물의 이름은?
            */

            // 원래 있던 문제 장소에 새롭게 덮어쓰기(정답표출 추가) => 문제에다가 뒤에 정답을 붙여서 보여준다.
            document.querySelector(`p#q${index}`).innerHTML = question + `&nbsp;<span style='color:red; font-weight:bold;'>${item.correct}</span>`;
            
            // === 해당 문제의 라디오 개수가 몇개인지 알아보기 === //
            let radio_length = document.querySelectorAll(`input[name ="question${index}"]`).length;
            
            // console.log(`${index+1}번 문제의 라디오 개수는 ${radio_length} 개 입니다.`);
            /*
                1번 문제의 라디오 개수는 4 개 입니다.
                2번 문제의 라디오 개수는 4 개 입니다.
                3번 문제의 라디오 개수는 5 개 입니다.
                4번 문제의 라디오 개수는 4 개 입니다.
            */

            let isCheckAnswer = false;      // 라디오의 선택유무 검사용

            // 해당 문항마다 선택을 했는지 안했는지 알아보기
            for(let i=0; i<radio_length; i++){
                if(document.querySelectorAll(`input[name ="question${index}"]`)[i].checked){
                    isCheckAnswer = true;
                    break;
                }
            }   // end of for-----------------------------

            // console.log(`${index+1}번 문제 답을 선택하셨나요? ${isCheckAnswer}`);
            /*
                1번 문제 답을 선택하셨나요? false
                2번 문제 답을 선택하셨나요? false
                3번 문제 답을 선택하셨나요? true
                4번 문제 답을 선택하셨나요? true
            */

            let user_answer;

            if(isCheckAnswer){      // 사용자가 답을 선택한 경우
                // :checked 은 라디오 중 에 선택되어진 라디오를 말한다.
                user_answer = document.querySelector(`input[name ="question${index}"]:checked`).value
            }
            else{                   // 사용자가 답을 선택하지 않은 경우
                user_answer = "선택안함";
            }

            // console.log("사용자가 선택한 답번호 => ", user_answer);
            if(user_answer == item.correct){
                answer_cnt++;
                document.querySelector(`div#ox${index}`).innerHTML = `<span style='color:blue;'>정답</span>`;
                
            }
            else{
                document.querySelector(`div#ox${index}`).innerHTML = `<span style='color:red;'>오답</span>`;
            }

        });     // end of arr_quizData.forEach((item,index) => {})------------

        document.querySelector("div#score").innerHTML = `<span style='font-weight:bold;'>정답개수 : ${answer_cnt}</span>`;

    }
    // === 채점하는 함수 만들기 끝 === //



}   // end of window.onload = function()------------------