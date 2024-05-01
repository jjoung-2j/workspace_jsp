$(document).ready(function(){

    // 버튼 클릭과 엔터 클릭 할 시 로그인 시도하는 함수 만들기
    $("button#btnSubmit").click(function(){
        goLogin();      // 로그인 시도
    })

    $("input#loginPwd").bind("keydown",function(e){

        // keyCode -> C 대문자
        if(e.keyCode == 13){    // 암호 입력란에 엔터를 했을 경우
            goLogin();      // 로그인 시도
        }

    })  // end of $("input#loginPwd").bind("keydown",function(e){})-------

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // === X 를 누르거나 닫기 입력시 입력한 값과 결과값 지우기  => class : close 로 묶음 === //
    // == 아이디 찾기에서 close 버튼을 클릭하면 iframe 의 form 태그에 입력된 값을 지우기 == //
    $("button.idFindClose").click(function(){

        const iframe_idFind = document.getElementById("iframe_idFind");     // iframe태그는 순수한 자바스크립트로 밖에 안 잡힌다.!!!
        // 대상 아이프레임을 선택한다.
        // 선택자를 잡을때 jQuery를 사용하여 ${} 으로 잡으면 안되고, 순수한 자바스크립트를 사용하여 선택자를 잡아야 한다.
        // 주석문을 jsp 에서 작성할 때 ${} 이 들어가면 <%-- --%> 주석문을 사용해야 한다.
        
        const iframe_window = iframe_idFind.contentWindow;                  // => 자바스크립트 문법
        // iframe 요소에 접근하는 contentWindow 와 contentDocument 의 차이점은 아래와 같다.
        // contentWindow 와 contentDocument 둘 모두 iframe 하위 요소에 접근 할 수 있는 방법이다.
        // contentWindow 는 iframe의 window(전체)을 의미하는 것이다.
        // 참고로, contentWindow.document 은 contentDocument 와 같은 것이다.
        // contentWindow 가 contentDocument 의 상위 요소이다.
        
        iframe_window.func_form_reset_empty();
        // func_form_reset_empty() 함수는 idFind.jsp 파일에 정의해 둠.

    })  // end of $("button.idFindClose").click(function(){})-------------

})  // end of $(document).ready(function(){})--------------------

// === Function Declaration === //

// === 로그인 처리 함수 === //
function goLogin(){
    
    // alert("확인용 => 로그인 처리 진행");

    // === 아이디, 비번 입력하지 않은 경우 === //
    if($("input#loginUserid").val().trim() == ""){
        alert("아이디를 입력하세요!!");
        $("input#loginUserid").val("").focus();
        return;     // goLogin() 함수 종료
    }

    if($("input#loginPwd").val().trim() == ""){
        alert("암호를 입력하세요!!");
        $("input#loginPwd").val("").focus();
        return;     // goLogin() 함수 종료
    }






//////////////////////////////////////////////////////////////

    const frm = document.loginFrm;
    frm.submit();   // () 반드시 쓰기!

}   // end of function goLogin(){}-----------------

// === 로그아웃 처리 === //
function goLogOut(ctx_Path){
    
    // 로그아웃을 처리해주는 페이지로 이동
    location.href=`${ctx_Path}/login/logout.up`;
    // script 가 jsp 속에 들어있는 경우 \${ctx_Path} 로 작성해야 한다.

}   // end of function goLogOut(ctx_Path){}-----------------------