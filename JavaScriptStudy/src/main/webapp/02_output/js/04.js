/**
 * 
 */

function myFunction() {

    console.log("확인 버튼을 클릭하셨군요~~^^")
    // 크롬 웹브라우저에서 F12(개발자도구)를 눌러서 콘솔에서 확인하는 것이다.
    
    document.getElementById("name").innerHTML = "양혜정";   
}

function myClear(){
    document.getElementById("name").innerHTML = "";
}
// clear 는 명령어이므로 함수명으로 사용이 불가능하다.
