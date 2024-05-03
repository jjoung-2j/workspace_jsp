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

    // === X 를 누르거나 닫기 입력시 입력한 값과 결과값 지우기  => class : close 로 묶음 === //
    // == 비밀번호 찾기에서 close 버튼을 클릭하면 새로고침을 해주겠다. == //
    $("button.passwdFindClose").click(function(){
    
        javascript:history.go(0);
    /*   
        [ 참고 ]
        location.href="javascript:history.go(-2);";  // 이전이전 페이지로 이동 
        location.href="javascript:history.go(-1);";  // 이전 페이지로 이동
        location.href="javascript:history.go(0);";   // 현재 페이지로 이동(==새로고침) 캐시에서 읽어옴.
        location.href="javascript:history.go(1);";   // 다음 페이지로 이동.
        
        location.href="javascript:history.back();";       // 이전 페이지로 이동 
        location.href="javascript:location.reload(true)"; // 현재 페이지로 이동(==새로고침) 서버에 가서 다시 읽어옴. 
        location.href="javascript:history.forward();";    // 다음 페이지로 이동.
    */
        // 현재 페이지를 새로고침을 함으로써 모달창에 입력한 userid 와 email 의 값이 텍스트박스에 남겨있지 않고 삭제하는 효과를 누린다. 
      
        /* === 새로고침(다시읽기) 방법 3가지 차이점 ===
         >>> 1. 일반적인 다시읽기 <<<
         window.location.reload();
         ==> 이렇게 하면 컴퓨터의 캐시에서 우선 파일을 찾아본다.
             없으면 서버에서 받아온다. 
         
         >>> 2. 강력하고 강제적인 다시읽기 <<<
         window.location.reload(true);
         ==> true 라는 파라미터를 입력하면, 무조건 서버에서 직접 파일을 가져오게 된다.
             캐시는 완전히 무시된다.
         
         >>> 3. 부드럽고 소극적인 다시읽기 <<<
         history.go(0);
         ==> 이렇게 하면 캐시에서 현재 페이지의 파일들을 항상 우선적으로 찾는다.
        */

    })  // end of $("button.passwdFindClose").click(function(){})----------------------

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*   !!!!!! 필수로 기억해야 합니다. !!!!!!
      >>>> 로컬 스토리지(localStorage)와 세션 스토리지(sessionStorage) <<<< 
      로컬 스토리지와 세션 스토리지는 HTML5에서 추가된 저장소이다.
      간단한 키와 값을 저장할 수 있다. 키-밸류 스토리지의 형태이다.
    
    ※ 로컬 스토리지와 세션 스토리지의 차이점은 데이터의 영구성이다. 
       로컬 스토리지의 데이터는 사용자가 지우지 않는 이상 계속 브라우저에 남아 있게 된다. 
       만료 기간을 설정할 수 없다.
       하지만 세션 스토리지의 데이터는 윈도우나 브라우저 탭을 닫을 경우 자동적으로 제거된다.
       지속적으로 필요한 데이터(자동 로그인 등)는 로컬 스토리지에 저장하고, 
       잠깐 동안 필요한 정보(일회성 로그인 정보라든가)는 세션 스토리지에 저장하도록 한다. 
       그러나 비밀번호같은 중요한 정보는 절대로 저장하면 안된다.
       왜냐하면 클라이언트 컴퓨터 브라우저에 저장하는 것이기 때문에 타인에 의해 도용당할 수 있기 때문이다.

       로컬 스토리지랑 세션 스토리지가 나오기 이전에도 브라우저에 저장소 역할을 하는 게 있었다.
       바로 쿠키인데 쿠키는 만료 기한이 있는 키-값 저장소이다.

       쿠키는 4kb 용량 제한이 있고, 매번 서버 요청마다 서버로 쿠키가 같이 전송된다.
       만약 4kb 용량 제한을 거의 다 채운 쿠키가 있다면, 요청을 할 때마다 기본 4kb의 데이터를 사용한다. 
       4kb 중에는 서버에 필요하지 않은 데이터들도 있을 수 있다. 
       그러므로 데이터 낭비가 발생할 수 있게 된다. 
       바로 그런 데이터들을 이제 로컬 스토리지와 세션 스토리지에 저장할 수 있다. 
       이 두 저장소의 데이터는 서버로 자동 전송되지 않는다.

   >> 로컬 스토리지(localStorage) <<
      로컬 스토리지는 window.localStorage에 위치한다. 
      키 밸류 저장소이기 때문에 키와 밸류를 순서대로 저장하면 된다. 
      값으로는 문자열, boolean, 숫자, null, undefined 등을 저장할 수 있지만, 
      모두 문자열로 변환된다. 키도 문자열로 변환된다.

      localStorage.setItem('name', '이순신');
      localStorage.setItem('birth', 1994);

      localStorage.getItem('name');        // 이순신
      localStorage.getItem('birth');       // 1994 (문자열)

      localStorage.removeItem('birth');    // birth 삭제
      localStorage.getItem('birth');       // null (삭제됨)

      localStorage.clear();                // 전체 삭제

      localStorage.setItem(키, 값)으로 로컬스토리지에 저장함.
      localStorage.getItem(키)로 조회함. 
      localStorage.removeItem(키)하면 해당 키가 지워지고, 
      localStorage.clear()하면 스토리지 전체가 비워진다.

      localStorage.setItem('object', { userid : 'leess', name : '이순신' });
      localStorage.getItem('object');   // [object Object]
         객체는 제대로 저장되지 않고 toString 메소드가 호출된 형태로 저장된다. 
         [object 생성자]형으로 저장되는 것이다. 
         객체를 저장하려면 두 가지 방법이 있다. 
         그냥 키-값 형식으로 풀어서 여러 개를 저장할 수도 있다. 
         한 번에 한 객체를 통째로 저장하려면 JSON.stringify를 해야된다. 
         객체 형식 그대로 문자열로 변환하는 것이다. 받을 때는 JSON.parse하면 된다.

      localStorage.setItem('object', JSON.stringify({ userid : 'leess', name : '이순신' }));
      JSON.parse(localStorage.getItem('object')); // { userid : 'leess', name : '이순신' }
     
         이와같이 데이터를 지우기 전까지는 계속 저장되어 있기 때문에 
         사용자의 설정(보안에 민감하지 않은)이나 데이터들을 넣어두면 된다.  

   >> 세션 스토리지(sessionStorage) <<
       세션 스토리지는 window.sessionStorage에 위치한다. 
       clear, getItem, setItem, removeItem, key 등 
       모든 메소드가 로컬 스토리지(localStorage)와 같다. 
       단지 로컬스토리지와는 다르게 데이터가 영구적으로 보관되지는 않을 뿐이다. 
            
   >> 로컬 스토리지(localStorage)와 세션 스토리지(sessionStorage) 에 저장된 데이터를 보는 방법 << 
       크롬인 경우 F12(개발자도구) Application 탭에 가면 Storage - LocalStorage 와 SessionStorage 가 보여진다.
       거기에 들어가서 보면 Key 와 Value 값이 보여진다.
      
    ▶▶▶ goLogin 
       로컬스토리지(localStorage)에 저장된 key가 'saveid' 인 userid 값을 불러와서 
        input 태그 userid 에 넣어주기 ===
 */ 
     
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})  // end of $(document).ready(function(){})--------------------

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////

    // === 로그인을 하지 않은 상태일 때 
    //     로컬스토리지(localStorage)에 저장된 key가 'saveid' 인 userid 값을 불러와서 
    //     input 태그 userid 에 넣어주기 ===
    if($("input:checkbox[id='saveid']").prop("checked")){   // 체크하였으면
        // alert("아이디 저장 체크를 하였습니다.");
        localStorage.setItem('saveid',$("input#loginUserid").val());
    }
    else{
        // alert("아이디 저장 체크를 해제 하였습니다.");
        localStorage.removeItem('saveid');
    }
    	
/*
    // === 암호저장 체크 유무 === //
    if($("input:checkbox[id='savepwd']").prop("checked")){   // 체크하였으면
        // alert("암호 저장 체크를 하였습니다.");
        localStorage.setItem('savepwd',$("input#loginPwd").val());
    }
    else{
        // alert("암호 저장 체크를 해제 하였습니다.");
        localStorage.removeItem('savepwd');
    }
*/
    /*
		보안상 민감한 데이터는 로컬스토리지 또는 세션스토리지에 저장시켜두면 안된다.!!!
		현재 암호저장 체크박스를 주석문 처리했다.
	*/

/////////////////////////////////////////////////////////////////////////////////////

    const frm = document.loginFrm;
    frm.submit();   // () 반드시 쓰기!

}   // end of function goLogin(){}-----------------

// === 로그아웃 처리 === //
function goLogOut(ctx_Path){
    
    // 로그아웃을 처리해주는 페이지로 이동
    location.href=`${ctx_Path}/login/logout.up`;
    // script 가 jsp 속에 들어있는 경우 \${ctx_Path} 로 작성해야 한다.

}   // end of function goLogOut(ctx_Path){}-----------------------

//////////////////////////////////////////////////////////////////////////////////////////

// === 코인충전 결제금액 선택하기(실제로 카드 결제) === //
function goCoinPurchaseTypeChoice(userid,ctx_Path){

    const url = `${ctx_Path}/member/coinPurchaseTypeChoice.up?userid=${userid}`;

    // 너비 650, 높이 570 인 팝업창을 화면 가운데 위치시키기
    const width = 650;
    const height = 570;

    const left = Math.ceil((window.screen.width  - width)/2);  // window.screen.width : 내 화면 너비
    //                          1400 - 650  = 750 | 750/2 = 375
    // Math.ceil(숫자) => 정수로 만듬

    const top = Math.ceil((window.screen.height  - height)/2);  // window.screen.height : 내 화면 높이
    

    // 코인충전 결제금액 선택하기 팝업창 띄우기
    window.open(url, "coinPurchaseTypeChoice"
                , `left=${left}, top=${top}, width=${width}, height=${height}`);      

}   // end of function goCoinPurchaseTypeChoice(userid,ctx_Path){}-------------------------

// === 포트원(구 아임포트) 결제를 해주는 함수 === //
function goCoinPurchaseEnd(ctxPath, coinmoney, userid){

    // alert(`확인용 부모창의 함수 호출함. \n 결제금액 : ${coinmoney}원, 사용자 ID : ${userid}`);

    // === 포트원(구 아임포트) 결제 팝업창 띄우기 === //
    // 너비 1000, 높이 600 인 팝업창을 화면 가운데 위치시키기
    const width = 1000;
    const height = 600;

    const left = Math.ceil((window.screen.width  - width)/2);  // window.screen.width : 내 화면 너비
    // Math.ceil(숫자) => 정수로 만듬

    const top = Math.ceil((window.screen.height  - height)/2);  // window.screen.height : 내 화면 높이

    const url = `${ctxPath}/member/coinPurchaseEnd.up?coinmoney=${coinmoney}&userid=${userid}`;

    // 팝업창 띄우기
    window.open(url, "coinPurchaseEnd"
                , `left=${left}, top=${top}, width=${width}, height=${height}`);

}   // end of function goCoinPurchaseEnd(ctxPath, coinmoney, userid){}-----------

function goCoinUpdate(ctxPath, userid, coinmoney){

    // console.log(`~~ 확인용 userid : ${userid}, coinmoney : ${coinmoney}원`);

    // === 자바스크립트에서 자바 또는 DB 로 데이터 전송하기 위해 === //
    $.ajax({

        url: ctxPath + "/member/coinUpdateLoginUser.up"
        , data: {"userid":userid, "coinmoney":coinmoney}
        , type:"post"       // type을 생략하면 type: "get" 이다.   
        // [주의] method 가 아닌 type 작성!!

        , async:true   // async:true 가 비동기 방식을 말한다. async 을 생략하면 기본값이 비동기 방식인 async:true 이다.
                      // async:false 가 동기 방식이다. 지도를 할때는 반드시 동기방식인 async:false 을 사용해야만 지도가 올바르게 나온다.
        
        , dataType : "json"     // 주의. dataType 의 T 는 대문자!! / 데이터 타입을 String 에서 json 형식으로 바꾼다.

        , success: function(json){  // 결과물을 json 형식으로 주기 때문의 임의로 json 이름 작성
            
            // console.log("~~ 확인용 json => ",json);
            /*
                ~~ 확인용 json =>  
                location: "/MyMVC/index.up"
                message: "양혜정님의 300,000원 결제가 완료되었습니다."
                n: 1
            */
           
            alert(json.message);
            location.href=json.location;
            
/*
            if(json.isExists){      // DB 에 존재하는 아이디인 경우     // isExists 등록한 key 값
               
            }
            else{                   // DB 에 존재하지 않는 아이디인 경우
               
            }
*/
        },

        // 잘못되어지면 알람을 띄운다. 필수 X
        error: function(request, status, error){
            alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
        }

    }); // end of $.ajax({})-----------------------------

}   // end of function goCoinUpdate(userid, coinmoney){}--------------

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function goEditMyInfo(userid,ctx_Path){

    const url = `${ctx_Path}/member/memberEdit.up?userid=${userid}`;

    // 너비 650, 높이 570 인 팝업창을 화면 가운데 위치시키기
    const width = 650;
    const height = 570;

    const left = Math.ceil((window.screen.width  - width)/2);  // window.screen.width : 내 화면 너비
    //                          1400 - 650  = 750 | 750/2 = 375
    // Math.ceil(숫자) => 정수로 만듬

    const top = Math.ceil((window.screen.height  - height)/2);  // window.screen.height : 내 화면 높이
    

    // 코인충전 결제금액 선택하기 팝업창 띄우기
    window.open(url, "memberEdit"
                , `left=${left}, top=${top}, width=${width}, height=${height}`);      
}
