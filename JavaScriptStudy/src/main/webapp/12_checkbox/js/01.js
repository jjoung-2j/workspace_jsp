// === 체크박스 여러개 중 라디오 처럼 1개만 선택되도록 만든 것 === //
function onlyOneCheck(obj){
    const checkbox_list = document.querySelectorAll("input[name='product_old']");

    for(let checkbox of checkbox_list){
        // checkbox != obj 은 체크박스에 체크를 하지 않은 나머지 모든 체크박스를 말한다.
        if(checkbox != obj){
            checkbox.checked = false;
        }
    }   // end of for~of--------------------
}   // end of function onlyOneCheck(obj)----------------------

// === 체크박스 전체선택/전체해제 === //
function func_allCheck(bool){
    const checkbox_list = document.querySelectorAll("input[name='product_usa']");

    for(let checkbox of checkbox_list){
 
        checkbox.checked = bool;    // 체크박스의 체크유무를 동일하게 지정
    
    }   // end of for~of-----------------
}   // end of function func_allCheck(bool)----------------------

// === 체크박스 전체선택/전체해제 에서 
//     하위 체크박스에 체크가 1개라도 체크가 해제되면 체크박스 전체선택/전체해제 체크박스도 체크가 해제되고
//     하위 체크박스에 체크가 모두 체크가 되어지면 체크박스 전체선택/전체해제 체크박스도 체크가 되어지도록 하는 것 === //
function func_usaCheck(bool){

    // 미국산 체크박스 6개중 클릭한 체크박스가 체크가 해제 되어진 상태로 넘어온 경우 
    // if(!bool){
    // 또는
    if(bool == false){
        document.querySelector("input#allCheck").checked = false;
        // 또는 input[id='allCheck']
    }
    // 미국산 체크박스 6개중 클릭한 체크박스가 체크가 되어진 상태로 넘어온 경우 
    else{

        const checkbox_list = document.querySelectorAll("input[name='product_usa']");

        let is_all_checked = true;

        for(let checkbox of checkbox_list){
            // 미국산 체크박스 6개를 반복할때, 해당 체크박스가 체크가 해제 되어진 경우라면
            if(!checkbox.checked){
                is_all_checked = false;
                break;
            }
        }   // end of for------------

        // 미국산 체크박스 6개를 반복할때, 해당 체크박스가 체크가 해제 되어진 경우라면
        if(is_all_checked){      
            document.querySelector("input[id='allCheck']").checked = true;
        }
    }

}   // end of function func_usaCheck(bool)-----------------------