window.onload = function(){

    let start = false;

    document.querySelector("button#start").addEventListener("click",()=>{

        document.querySelector("div#start").style.display = "none";
        document.querySelector("div#container").style.display = "block";
        start = true;

    });

    const arr_quizData = [
        {
            question : "문제1. 우리나라의 '초대대통령'은 누구일까요?",
            answers  : {
                1 : "박정희",     // 1을 a 로 변경해도 동일하게 출력
                2 : "전두환",
                3 : "이승만",
                4 : "김대중"
            },
            correct : 3
        },
        
        {
            question : "문제2. 5천원권 지폐에 있는 과일은?",
            answers  : { 
                1 : "복숭아",
                2 : "배",
                3 : "포도",
                4 : "수박"
            },
            correct : 4 
        },
        
        {
            question : "문제3. 신조어 'TMI'에서 'I'가 의미하는 것은?",
            answers  : { 
                1 : "정보",
                2 : "인터넷",
                3 : "호기심",
                4 : "면접",
                5 : "이야기"
            },
            correct : 1  
        },
        
        {
            question : "문제4. 사진속의 인물의 이름은?",
            answers  : { 
                1 : "제프 베이조스",
                2 : "스티브 잡스",
                3 : "마크 저커버그",
                4 : "래리 페이지"
                },
            correct : 2 
        }
    ];

    const quizDiv = document.querySelector("div#quiz_display");     // 퀴즈문항을 보여줄 장소

    // ==== 퀴즈문항을 html 로 만들기 시작 ==== //
    let html = ``;


// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆    
    
    arr_quizData.forEach((item,index) => {

        html += `<div id="image" height = "300px"><p id="q${index}">${item.question}</p>`;   // 여기서 q 는 새로 만든 id

        if(index < 3){
            html += `<ol class = 'ol'>`
        }
        else{
            html += `<div id='q4'><img src='images/steven_jobs.png'/>
                    <ol id = 'ol'>`;
                    
        }


        

        // <li> 의 개수가 모두 다르므로 for 문 사용하기
        // 어떤 객체의 속성(키)들을 모두 불러올때는 for문에서 of 가 아니라 in 을 사용한다.
        for(let property_name in item.answers){     
            if(index < 3){
                html += `<li> <label class = "li_list" for ="${index}${property_name}">${item.answers[property_name]}&nbsp;</label>
                        <input id = "${index}${property_name}" type="radio" name ="question${index}" 
                        value="${property_name}" /></li>`;
                // 객체명.속성명 은 속성명에는 변수가 사용될 수 없다.
                // 객체명[속성명] 은 속성명에 변수가 사용될 수 있다.
                // ${item.answers[property_name]} 는 "부산" 과 같은 것을 말하는 것이다.
                
                // 라디오는 반드시 name 값이 동일해야 한다.
                // value 값은 item.answers 의 속성명인 1 2 3 4 로 되어진다.
            }
            else{
                html += `<li> <label class = "li_list_q4" for ="${index}${property_name}">${item.answers[property_name]}&nbsp;</label>
                        <input id = "${index}${property_name}" type="radio" name ="question${index}" 
                        value="${property_name}" /></li>`;
            }
        }   // end of for--------------

        if(index < 3){
            html += `</ol>`;
        }
        else{
            html += `</ol></div>`
        }
        html += `<div class='ox' id='ox${index}''></div></div>`;      // 퀴즈 문항에 대해 정답인지 틀린것인지 보여줄 장소

    });     // end of arr_quizData.forEach((item,index)------------
    
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆   
    quizDiv.innerHTML = html;
    // ==== 퀴즈문항을 html 로 만들기 끝 ==== //

///////////////////////////////////////////////////////////////////////////////////

    const btnSubmit = document.querySelector("button#submit");

    // === "제출하기" 버튼 클릭시 이벤트 처리하기 시작 === //
    // 제출하기 버튼 클릭시 이벤트함수 만들기
    const handleSubmit = function(){
        alert("제출이 완료되었습니다.")

        // 타이머 삭제하기
        clearInterval(interval_timer);  // interval_timer 는 중단해야할 setInterval 함수를 가리키는 것이다.
    
        timerDiv.innerHTML = `00:00`;   // 제출 후 시간 00:00 으로 지정

        // 제출 후 "제출하기" 버튼 비활성화 하기
        btnSubmit.disabled = true;                      // "제출하기" 버튼 비활성화
   
        check();    // 채점하는 함수 호출

    }

    btnSubmit.addEventListener('click',handleSubmit);
    // === "제출하기" 버튼 클릭시 이벤트 처리하기 끝 === //


//////////////////////////////////////////////////////////////////////////////////

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

        check();    // 채점하는 함수 호출
    
    }
    else{

        if(start){

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

            timerDiv.innerHTML = `시간&nbsp;${minute}:${second}`;

            time--;
        }
        
    }   // end of if~else-------------------------------


}
// ==== 타이머 함수 만들기 끝 ==== //

timer();    // 타이머 함수 호출하기 => 존재할 경우 로딩하자 나온다. 없을 경우 1초 있다가 나온다.

// 1초 마다 주기적으로 타이머 함수가 호출되도록 지정한다.
//  const interval_timer = setInterval(function(){timer();},1000);     
// 또는
const interval_timer = setInterval(timer,1000);                  

///////////////////////////////////////////////////////////////////////////////////

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
                document.querySelector(`div#ox${index}`).innerHTML = `결과 : <span style='color:blue;'>정답</span>`;
                
            }
            else{
                document.querySelector(`div#ox${index}`).innerHTML = `결과 : <span style='color:red;'>오답</span>`;
            }

        });     // end of arr_quizData.forEach((item,index) => {})------------

        document.querySelector("div#score").innerHTML = `<span style='font-weight:bold;'>정답개수 : ${answer_cnt}</span>`;

    }
    // === 채점하는 함수 만들기 끝 === //


//////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

    let current_index = 0;      // 현재 인덱스 번호
    let positionValue = 0;      // images 위치값
    const image_width = 800;    // 한번 이동 시 image_width 만큼 이동한다.

    const btn_previous = document.querySelector("button#previous");
    const btn_next = document.querySelector("button#next");
    const images = document.querySelector("div#quiz_display");

/////////////////////////////////////////////////////////////////////////

    // === 이전으로 이동하는 함수 === //
    const func_previous = function(){

        if(current_index > 0){      // 현재 인덱스번호가 처음이 아닌 두번째 이상인 경우
            
            // btn_next.setAttribute('disabled', false);
            // 또한
            btn_next.removeAttribute('disabled');   // 다음 버튼을 활성화 상태로 만든다.
            
            // images 의 위치를 오른쪽으로 이동시키도록 IMAGE_WIDTH 만큼 증가시켜 positionValue에 저장한다.
            positionValue += image_width;   // 이미지 이동
            // x축 방향(가로방향)으로 positionValue 만큼 이동하도록 변형시킨다.
            images.style.transform = `translateX(${positionValue}px)`;

            // 현재 인덱스번호를 1 감소 시킨다.
            current_index--;

            // 메시지가 안나오게 하기
            document.querySelector("h2#msg").innerHTML = "";

        }
        else{   // 현재 인덱스번호가 처음인 경우
            // 처음 사진일 때 다음버튼을 disabled 로 만든다.
            btn_previous.setAttribute('disabled',true);
            document.querySelector("h2#msg").innerHTML = "처음 문제 입니다.";
        }

    }

    // === 다음으로 이동하는 함수 === //
    const func_next = function(){

        if(current_index < 3){      // 현재 인덱스번호가 마지막(지금은 4)이 아닌 경우
            
            // btn_previous.setAttribute('disabled', false);
            // 또한
            btn_previous.removeAttribute('disabled');   // 이전 버튼을 활성화 상태로 만든다.
            
            // images 의 위치를 왼쪽으로 이동시키도록 IMAGE_WIDTH 만큼 감소시켜 positionValue에 저장한다.
            positionValue -= image_width;   // 이미지 이동
            // x축 방향(가로방향)으로 positionValue 만큼 이동하도록 변형시킨다.
            images.style.transform = `translateX(${positionValue}px)`;

            // 현재 인덱스번호를 1 증가 시킨다.
            current_index++;

            // 메시지가 안나오게 하기
            document.querySelector("h2#msg").innerHTML = "";

        }
        else{   // 현재 인덱스번호가 마지막(지금은 3)인 경우
            // 마지막 사진일 때 다음버튼을 disabled 로 만든다.
            btn_next.setAttribute('disabled',true);
            document.querySelector("h2#msg").innerHTML = "마지막 문제 입니다.";
        }

    }

////////////////////////////////////////////////////////////////////////////////////////////////////

    // 이전 버튼은 초기화로 사용하지 못하도록 disabled 로 만든다.
    btn_previous.setAttribute('disabled', true);

    // btn_next.addEventListener('click',function(){}); 이 방법도 있지만 함수를 밖으로 꺼낼 수 있다.
    // 이전버튼 클릭시 이전으로 이동하는 함수를 호출한다.
    btn_previous.addEventListener('click',func_previous);
    // 다음버튼 클릭시 다음으로 이동하는 함수를 호출한다.
    btn_next.addEventListener('click',func_next);

}   // end of window.onload = function()--------------------