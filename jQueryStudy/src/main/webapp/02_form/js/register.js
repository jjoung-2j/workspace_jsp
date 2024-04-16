/* 
    <<요구사항>>

   1. 폼 회원가입에서 회원가입 버튼을 클릭하면 registermember.do 로 이동한다.
   2. 아이디, 패스워드, 패스워드확인, 이름, 이메일 모든 항목은 반드시 입력해야 한다.
   3. 아이디는 라벨을 클릭해도 해당 입력 상자로 포커스 이동한다.
   4. 취소 버튼을 이용해서 입력 상자를 초기화 한다.
   5. 아이디는 입력시 첫글자는 대문자이고 나머지 글자는 영문자, 숫자로 총 5글자 이상 20글자 이하만 가능하다.
   6. 아이디 입력 후 포커스를 잃는 경우에 조건 체크 한다.
   7. 조건 체크에 만족하지 않으면 '5글자이상, 첫글자는 대문자이고 영문자, 숫자만 가능" 이라는 글자가 나타난다.
   8. 입력한 아이디 값도 삭제한다.
   9. 패스워드 입력 하지 않고 패스워드확인을 입력한 경우 "패스워드를 입력하세요"라는 대화 상자가 나타나고
      패스워드확인 값 삭제하고 패스워드 입력 상자로 포커스 이동한다.
      패스워드 입력창 옆에 패스워드와 패스워드확인이 일치하면 '패스워드가 일치합니다'라는 문자를 초록색 진하게 출력하고,
      일치하지 않으면 '패스워드가 일치하지 않습니다'를 빨간색으로 진하게 출력한다.
   10. 성명은 공백없이 한글로만 입력해야 한다. 글자수는 2글자 이상 10글자 이하만 가능하다.
   11. 이메일은 올바르게 입력해야 한다.
   12. 성별입력은 회원가입 버튼을 클릭시 남 또는 여 radio 버튼 선택여부 확인한다.
       성별입력을 선택하지 않은 경우 "성별을 선택하세요"라는 메시지 출력하고 submit 이벤트 발생하지 않는다.
*/

$(document).ready(function() {

    // 선택자.bind("blur", () => {}); 은 선택자에 포커스가 있다가 포커스를 잃어버렸을때 발생하는 이벤트 처리이다. 
    // 또는
    // 선택자.blur(() => {}); 도 같은 것이다.
    
  /*   
    $("form[name='registerFrm'] input:text[id='userid']").bind("blur", () => {
       console.log("사용자ID 입력란에 포커스가 있다가 포커스를 잃어버렸을때 발생하는 이벤트 입니다."); 
    });
  */ 
  
  /*
     $("form[name='registerFrm'] input:text[id='userid']").blur(() => {
       alert("사용자ID 입력란에 포커스가 있다가 포커스를 잃어버렸을때 발생하는 이벤트 입니다."); 
    });   
  )*/ 
  
     $("form[name='registerFrm'] input:text[id='userid']").bind("blur", (e) => {
       // 아이디는 입력시 첫글자는 대문자이고 나머지 글자는 영문자, 숫자로 총 5글자 이상 20글자 이하만 가능하다.
       
       /*
          == 정규표현식 객체 만들기 ==
             항상 / 로 시작해서 / 로 끝나고 ; 을 붙인다.
       */
       const regExp_userid = /^[A-Z][A-Za-z0-9]{4,19}$/;
       
       // 생성된 정규표현식 객체속에 데이터를 넣어서 검사하기 
       const bool = regExp_userid.test($(e.target).val()); // 리턴타입이 boolean 이다. 
       
       if(!bool) {
          $(e.target).next().html("5글자 이상 20글자 이하 이며, 첫글자는 대문자이고 나머지는 영문자,숫자만 가능합니다.").css({'color':'red', 'font-size':'8pt'}); 
          $(e.target).val("");
          $(e.target).focus();      
       } 
       else {   // 올바르게 입력한 경우
          $(e.target).next().empty();   // 에러메시지 위치 비우기
       }
        
    });// end of $("form[name='registerFrm'] input:text[id='userid']").bind("blur", () => {})------------     
     
     
     $("form[name='registerFrm'] input:password[id='passwd2']").bind("keydown", (e) => {
        
        const passwd1_val = $("form[name='registerFrm'] input:password[id='passwd1']").val(); 
        
        if(passwd1_val == ""){
          $("form[name='registerFrm'] input:password[id='passwd1']").next().html("암호를 입력하세요").css({'color':'red', 'font-size':'8pt'});
       } 
           
    });// end of $("form[name='registerFrm'] input:password[id='passwd2']").bind("keydown", (e) => {})------------
    
    
    $("form[name='registerFrm'] input:password[id='passwd1']").bind("keydown", (e) => {
        
        $(e.target).next().empty(); 
           
    });// end of $("form[name='registerFrm'] input:password[id='passwd2']").bind("keydown", (e) => {})------------
     
     
     $("form[name='registerFrm'] input:password[id='passwd1']").bind("blur", (e) => { func_passwd_equal_check(); }); 
     $("form[name='registerFrm'] input:password[id='passwd2']").bind("blur", (e) => { func_passwd_equal_check(); });   
     
     $("form[name='registerFrm'] input:text[id='name']").bind("blur", (e) => {
        /*
          == 정규표현식 객체 만들기 ==
             항상 / 로 시작해서 / 로 끝나고 ; 을 붙인다.
       */
       // 성명은 공백없이 한글로만 입력해야 한다. 글자수는 2글자 이상 10글자 이하만 가능하다.
       const regExp_name = /^[가-힣]{2,10}$/; 
       
       // 생성된 정규표현식 객체속에 데이터를 넣어서 검사하기 
       const bool = regExp_name.test($(e.target).val()); // 리턴타입이 boolean 이다.  
       
       if(!bool) {
          $(e.target).next().html("성명은 공백없이 한글로만 입력해야 한다").css({'color':'red', 'font-size':'8pt'}); 
          $(e.target).val("");
          $(e.target).focus();      
       } 
       else {
          $(e.target).next().empty();
       }    
    }); 
    
    
     $("form[name='registerFrm'] input:text[id='email']").bind("blur", (e) => {
        /*
          == 정규표현식 객체 만들기 ==
             항상 / 로 시작해서 / 로 끝나고 ; 을 붙인다.
       */
       // 이메일 정규표현식
       const regExp_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 
       
       // 생성된 정규표현식 객체속에 데이터를 넣어서 검사하기 
       const bool = regExp_email.test($(e.target).val()); // 리턴타입이 boolean 이다.  
       
       if(!bool) {
          $(e.target).next().html("이메일 형식에 맞지 않습니다").css({'color':'red', 'font-size':'8pt'}); 
          $(e.target).val("");
          $(e.target).focus();      
       } 
       else {
          $(e.target).next().empty();
       }    
    });   
     
     
     // !!! === submit 에 대한 이벤트 처리 시작 === !!! //
  /*
     $("form[name='registerFrm']").bind("submit", ()=>{});
  // 또는
     $("form[name='registerFrm']").submit(()=>{});
  */
     
     $("form[name='registerFrm']").bind("submit", ()=>{
        
       const checked_length = $("form[name='registerFrm'] input:radio[name='gender']:checked").length;
       // 체크(선택)가 되어진 라디오의 개수
       
       if(checked_length == 0) { // 성별을 선택하지 않은 상태이라면
          $("form[name='registerFrm']").find("span#err_gender").html("성별을 선택하세요").css({'color':'red', 'font-size':'8pt'}); 
          return false; // return false; 가 서브밋(전송)을 하지 말라는 뜻이다. 
       } 
        
    });
     // !!! === submit 에 대한 이벤트 처리 끝 === !!! //
     
     
     $("form[name='registerFrm'] input:reset").bind('click', ()=>{
        
        // 페이지 새로 고침
          history.go(0);
        // 또는
        // location.reload();
    });
    
 }); // end of $(document).ready(function() {})-------------   
 
 
 function func_passwd_equal_check(){
    
    const passwd1 = $("form[name='registerFrm'] input:password[id='passwd1']").val(); 
     const passwd2 =   $("form[name='registerFrm'] input:password[id='passwd2']").val(); 
     
     if(passwd1 != passwd2) {
       $("form[name='registerFrm'] input:password[id='passwd2']").next().html("입력하신 암호값과 암호확인 값이 같지 않습니다").css({'color':'red', 'font-size':'8pt'}); 
    } 
    else {
       $("form[name='registerFrm'] input:password[id='passwd2']").next().empty();
    }   
    
 }// end of function func_passwd_equal_check(){}------------
  