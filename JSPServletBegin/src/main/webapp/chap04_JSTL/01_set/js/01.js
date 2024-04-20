// Function Declaration
function goSubmit(){

    // 정규표현식으로 유효성 검사
    const regExp = /^[0-9]{1,5}$/;       // /^\d/; 과 동일     
    // 만약 숫자가 아닌 것 : /^[^0-9]/ 또는 /^\D/;

    const frm = document.myFrm;

    const num1 = frm.firstNum.value.trim();  // 현재 jquery 를 script 하지 않았기에 javascript 용어 사용
    const num2 = frm.secondNum.value.trim();

    if(!(regExp.test(num1) && regExp.test(num2))){
        alert("숫자로만 입력하세요!!");
        frm.firstNum.value = "";
        frm.secondNum.value = "";
        frm.firstNum.focus();
        return;     // 함수의 종료
    }

    frm.action = "multiply_result_02.jsp";      // 나중에 .do 로 변경할 것
    // frm.method = "get";     // method 를 명기하지 않으면 기본은 "get" 이다.
    frm.submit();

}   // end of function goSubmit(){}------------