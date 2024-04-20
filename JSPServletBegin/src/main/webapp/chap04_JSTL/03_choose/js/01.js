$(document).ready(function(){
   
    $("form").submit(()=>{
    
       // 정규표현식으로 유효성 검사
       const regExp = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-?[1-4][0-9]{6}$/g; 
    
       const jubun_val = $("input:text[name='jubun']").val();
    
       if( !regExp.test(jubun_val) ) {
          alert("올바른 주민번호가 아닙니다.");
          return false; // submit 을 하지 않고 종료한다.
       }
       
    });// end of $("form").submit()------------------
     
    
});// end of $(document).ready(function(){})--------------