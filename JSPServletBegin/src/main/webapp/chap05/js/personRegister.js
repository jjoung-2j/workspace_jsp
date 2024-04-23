$(document).ready(function(){
    /*
     $("form[name='registerFrm']").bind("submit", function(){});
     또는
     $("form[name='registerFrm']").submit(function(){});
     또는
     $("form[name='registerFrm']").submit(()=>{});
    */
     
     $("form[name='registerFrm']").submit(()=>{
        
        // === 유효성 검사 === //
        // 1. 성명
        const name_length = $("input:text[name='name']").val().trim().length; 
        if(name_length == 0) {
           alert("성명을 입력하세요!!");
           $("input:text[name='name']").val("").focus();
           return false; // submit 을 하지 않고 종료한다.
        } 
        
        // 2. 학력
        const school_val = $("select[name='school']").val();
        if(school_val == "") {
           alert("학력을 선택하세요!!");
           return false; // submit 을 하지 않고 종료한다.
        }
        
        // 3. 색상
        const color_length = $("input:radio[name='color']:checked").length; 
        if(color_length == 0) {
           alert("색상을 선택하세요!!");
           return false; // submit 을 하지 않고 종료한다.
        }
        
        // 4. 음식은 좋아하는 음식이 없다라면 선택을 안하더라도 허용하겠다.
      /*   
        const food_length = $("input:checkbox[name='food']:checked").length;
        if(food_length == 0) {
           alert("선호하는 음식을 최소한 1개 이상 선택하세요!!");
           return false; // submit 을 하지 않고 종료한다.
        } 
      */   
        
     });// end of $("form[name='registerFrm']").submit()-------
     
  });// end of $(document).ready(function(){})------------------