window.onload = function(){

    ///////////////////////////////////////
    // 추가질문(중지클릭하지 않은채 중지이후이어서시작을 입력한 경우)
    let is_stop_click = false;
    //////////////////////////////////////

    const timerDiv = document.querySelector("div#timer");// 타이머를 보여줄 장소

    let time = 600;     // 타이머 시간을 600초(== 10분)로 지정함.
                         
    let time_continue = 0;  // 타이머가 중지했던 그때의 time 값을 기억하는 용도.

    // === 타이머 함수 만들기 시작 === //
    const timer = function(){

        let minute = "";
        let second = "";

        minute = parseInt(time/60); // 소수부는 없애 버리고 정수부만 가져오는 것이다.

        if(minute < 10){
            minute = "0" + minute;  // 10보다 작은경우 앞에 0 붙여주기
        }

        second = time%60;   // time 을 60으로 나누었을때의 나머지

        if(second < 10){
            second = "0" + second;  // 10보다 작은경우 앞에 0 붙여주기
        }

        const html = `${minute}:${second}`;

        timerDiv.innerHTML = html;

        time--;
    }
    // === 타이머 함수 만들기 끝 === //

    timer();    // 타이머 함수 호출

    // 1초 마다 주기적으로 타이머 함수가 호출되도록 지정함.
    // let interval_timer = setInterval(function() {timer();},1000);
    // 또는
    let interval_timer = setInterval(timer,1000);

/////////////////////////////////////////////////////////////////////////////////////

    // === 타이머 중지 시작=== //
    const btnTimerClear = document.querySelector("div#timerclear > button#btnTimerClear");

    btnTimerClear.addEventListener('click',() =>{

        ////////////////////////////////////////////////
        is_stop_click = true;
        ////////////////////////////////////////////////

        clearInterval(interval_timer);    // 타이머 삭제하기
        // interval_timer 는 중단해야할 setInterval 함수를 가리키는 것이다.

        /*
         만약에 setTimeout 으로 지정된 것이라면 clearTimeout(interval_timer); 으로 한다.
         interval_timer 는 중단해야할 setTimeout 함수를 가리키는 것이다. 
        */

        time_continue = time;    // 타이머가 중지했던 그때의 time 값을 기억하는 용도

    })
    // === 타이머 중지 끝=== //

///////////////////////////////////////////////////////////////////////////////////

    // === 타이머 처음부터 시작의 시작 === //
    const btnTimerRestart = document.querySelector("div#timerclear > button#btnTimerRestart");

    btnTimerRestart.addEventListener('click',() =>{
        
        /* 타이머를 다시 생성하려면 먼저 타이머를 없애고 만들어야 한다. */
        clearInterval(interval_timer);      // 타이머 삭제하기
                                            // interval_timer 는 중단해야할 setInterval 함수를 가리키는 것이다.
        
        time = 600;     // 기존의 사용했던 것이 있으니 time 을 초기화 해주어야 한다.

        interval_timer = setInterval(timer,1000);

    })
    // === 타이머 처음부터 시작의 끝 === //

///////////////////////////////////////////////////////////////////////////////////

    // === 타이머 중지이후 부터 이어서 시작의 시작 === //
    const btnTimerContinue = document.querySelector("div#timerclear > button#btnTimerContinue");

    btnTimerContinue.addEventListener('click',() =>{

        //////////////////////////////////////////////////
        if(!is_stop_click) {
            alert("먼저 중지를 클릭하세요!!");
            return;
        }

        /////////////////////////////////////////////////
        
        /* 타이머를 다시 생성하려면 먼저 타이머를 없애고 만들어야 한다. */
        time = time_continue;     // 타이머 시간은 중지한 시간 이후부터 지정함.

        clearInterval(interval_timer);      // 타이머 삭제하기
                                            // interval_timer 는 중단해야할 setInterval 함수를 가리키는 것이다.
        
        interval_timer = setInterval(timer,1000);

    })
    // === 타이머 중지이후 부터 이어서 시작의 끝 === //

}   // end of window.onload = function()----------------------