/**
 * 
 */

function myFunction() {

    // 일반적으로 window 는 생략한다. \n 이 줄바꿈을 말하는 것이다.
    window.alert("확인버튼을 클릭하셨군요~~^^");
    // 알림창이 뜬다.
    alert("좋은하루 \n행복한 하루 되세요!!");
    // window 생략 가능

    document.getElementById("name").innerHTML = "양혜정";   
}

function myClear(){
    document.getElementById("name").innerHTML = "";
}
// clear 는 명령어이므로 함수명으로 사용이 불가능하다.
