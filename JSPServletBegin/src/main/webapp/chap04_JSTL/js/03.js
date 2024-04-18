$(document).ready(function(){

    // === submit 에 대한 이벤트 처리 === //
    $("form[name='registerFrm']").submit(() => {
        
        // === 유효성 검사하기 === //

        // 1. 성명 필수입력 검사
        const name_length = $("input:text[name='name']").val().trim().length;

        if(name_length == 0){
            alert("성명을 입력하세요!!");
            $("input:text[name='name']").val("").focus();
            return false;   // 중요!! submit 을 하지 않고 종료한다.
        }

        // 2. 학력 필수입력 검사
        const school_val = $("select[name='school']").val();

        if(school_val == "선택하세요"){
            alert("학력을 선택하세요!!");
            return false;   // 중요!! submit 을 하지 않고 종료한다.
        }

        // 3. 색상 필수입력 검사
        const color_cheecked_length = $("input:radio[name='color']:checked").length;

        if(color_cheecked_length == "0"){
            alert("색상을 선택하세요!!");
            return false;   // 중요!! submit 을 하지 않고 종료한다.
        }

        // 4. 음식 필수입력 검사
        const food_cheecked_length = $("input:checkbox[name='food']:checked").length;

        if(food_cheecked_length == "0"){
            alert("선호하는 음식을 최소한 1개 이상 선택하세요!!");
            return false;   // 중요!! submit 을 하지 않고 종료한다.
        }

    });     // end of $("form[name='registerFrm']").submit(() => {})_---------------------

})  // end of $(document).ready(function(){})----------------