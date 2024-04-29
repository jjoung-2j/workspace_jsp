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