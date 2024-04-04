window.onload = function(){
    /*
       자바스크립트 new Date() 란?
      ==> ﻿new Date() 는 new Date() 가 실행되는 시점에 날짜 및 시간 데이터를 갖고 오는 것이다.
           출력하게 되면 요일명 월 일 년도 시:분:초 GMT기준시간을 표시해준다.
       
        자바스크립트 get날짜함수란? 
      ==> ﻿getFullYear / getMonth / getDate 등 get날짜함수는 날짜 데이터에서 필요한 형식만 갖고 오는 함수이다.
          
         종류               리턴값
         -----------------------------------
         getFullYear()      YYYY
           getMonth()         MM     자바스크립트의 월은 0부터 시작하기 때문에 1을 더해야 정상적인 월이 된다.
           getDate()          DD
           getDay()           0 ~ 6 (일 ~ 토)
           getHours()         HH
           getMinutes()       MM
           getSeconds()       SS
           getMilliseconds()  mmm
      
       자바스크립트 set날짜함수란? 
      ==> setFullYear / setMonth / setDate 등 set날짜함수는 날짜 데이터의 원하는 형식의 값으로 대입해주는 함수이다.
          종류 : setFullYear(), setMonth(), setDate(), 
                setHours(), setMinutes(), setSeconde(), setMilliseconds()
    */   

    // Function Expression (함수 표현식)
    /*
    const func_currentDate = function() {
        return "함수 표현식";     
    }; 
    */
   
    // 함수 표현식과 함수 선언식 확인할 때 사용
    // document.querySelector("td#current_date_1").innerHTML = func_currentDate();
    
/*
    // Function Expression (함수 표현식)
    const func_timebomb_1 = function() {
        alert("5초 뒤에 터지는 시한폭탄!!");    
    };

    setTimeout(func_timebomb_1, 5000);       // 함수표현식 에 선언된 func_timebomb_2
    // 5000 밀리초(== 5초) 후에 func_timebomb_1 함수를 실행해라는 말이다.
*/
    // setTimeout(func_timebomb_2, 8000);    // 함수선언식 에 선언된 func_timebomb_2
    
/////////////////////////////////////////////////////////////////////////////////////

    // 현재 시간을 알려주는 함수 사용(함수 선언식)
    // func_currentDate();

    // document.querySelector("td#current_date_1").innerHTML = func_currentDate();

    // 함수 선언
    const func_clock_loop = function(){
        document.querySelector("td#current_date_1").innerHTML = func_currentDate();
        setTimeout(func_clock_loop,1000);   // 1초 뒤에 재호출(반복)
    }

    func_clock_loop();  // 함수 실행하기

    // 함수 선언
    const func_clock = function(){
        document.querySelector("td#current_date_2").innerHTML = func_currentDate();
        
    }

    func_clock();   // 함수 실행하기(페이지 로딩하자마자 뜨게하는 것)

    // 페이지가 뜬 이후 1초 이후 실행 interval
    // 주기적으로 1000 밀리초(== 1초) 마다 함수 func_clock(); 를 실행해라는 말이다. 
    // setInterval(function(){func_clock();}, 1000);

    // 또는
    setInterval(() =>func_clock(), 1000);
}  // end of window.onload = function-----------------------

// Function Declaration (함수 선언식)
/*
function func_currentDate() {
    return "함수 선언식";     
}
*/
function func_timebomb_2() {
    alert("8초 뒤에 터지는 시한폭탄");
    
    const body = document.querySelector("body");

    body.style.backgroundColor = "yellow";

}  // end of function func_timebomb_2()------------------------

///////////////////////////////////////////////////////////////////////////////////

// 현재 시간을 알려주는 function
function func_currentDate(){

    const now = new Date();
    // 자바스크립트에서 현재날짜시각을 알려주는 것이다.
     
    console.log(now);
    //  Thu  Apr 04 2024 15:44:10 GMT+0900 (GMT+09:00)
    // 요일명 월  일 년도 시 분 초  GMT기준시간

    console.log(now.toLocaleString());
    // 2024. 4. 4. 오후 3:46:36

    const year  = now.getFullYear();        // 현재년도 2024
    let month  = now.getMonth()+1;        // 현재월   4
    let date  = now.getDate();            // 현재일   4

    if(month < 10){
        month = "0"+month;
    }
    if(date < 10){
        date = "0"+date;
    }

    console.log(year + " " + month + " " + date);

    let   hours   = now.getHours();   // 현재시각   15
    let   minutes = now.getMinutes(); // 현재분     47
    let   seconds = now.getSeconds(); // 현채초     10

    if(hours < 10)
       hours = "0"+hours;
       
    if(minutes < 10)
       minutes = "0"+minutes;
       
    if(seconds < 10)
       seconds = "0"+seconds;   

    const day = now.getDay();   // 현재요일명(0 ~ 6) (일 ~ 토)

    let dayName;
    switch (day) {
        case 0:     // "0" 이 아닌 0 으로 표시하기
            dayName = "일요일";
            break;
        case 1:
            dayName = "월요일";
            break;
        case 2:
            dayName = "화요일";
            break;
        case 3:
            dayName = "수요일";
            break;
        case 4:
            dayName = "목요일";
            break;
        case 5:
            dayName = "금요일";
            break;
        case 6:
            dayName = "토요일";
            break;
    }

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds} ${dayName}`;

}   // end of function func_currentDate()---------------