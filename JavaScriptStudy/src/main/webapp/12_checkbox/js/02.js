window.onload = function(){

    // === 체크박스 여러개 중 라디오 처럼 1개만 선택되도록 만든 것 === //
    const checkbox_list = document.querySelectorAll("input[name = 'product_old']");
    
    for(let checkbox of checkbox_list){
        // checkbox 내가 클릭한 체크박스
        checkbox.addEventListener('click', () => {
            for(let checkbox_product_old of checkbox_list){
                // 클릭한 체크박스와 체크박스리스트 요소들이 다른 경우
                if(checkbox != checkbox_product_old){
                    checkbox_product_old.checked = false;
                }
            }   // end of for~of--------------------
        })
    }   // end of for~of-------------

    // === 체크박스 전체선택/전체해제 === //
    const allCheck = document.querySelector("input[id='allCheck']");

    allCheck.addEventListener('click',() =>{

        const checkbox_list = document.querySelectorAll("input[name='product_usa']");

        for(let checkbox of checkbox_list){
            checkbox.checked = allCheck.checked;
        }   // end of for~of----------------

    })

    // === 체크박스 전체선택/전체해제 에서 
    //     하위 체크박스에 체크가 1개라도 체크가 해제되면 체크박스 전체선택/전체해제 체크박스도 체크가 해제되고
    //     하위 체크박스에 체크가 모두 체크가 되어지면 체크박스 전체선택/전체해제 체크박스도 체크가 되어지도록 하는 것 === //
    const checkbox_usa_list = document.querySelectorAll("input[name='product_usa']");

    // === 이벤트 소스를 잡은것(복수개 이므로 for문을 사용함) === //
    
    for(let checkbox of checkbox_usa_list){
        checkbox.addEventListener('click', () => {
            if(!checkbox.checked){  // 체크박스에 체크를 해제한 클릭인 경우
                document.querySelector("input[id='allCheck']").checked = false;
            }
            else{   // 체크박스에 체크를 한 클릭인 경우
                // ==> name 값이 product_usa 인 모든 체크박스를 검사해서 모든 체크박스가 체크가 되어진 경우라면 
                //     체크박스 전체선택/전체해제 체크박스에 체크를 해주도록 한다. 
                let is_check_all = true;
                for(let checkbox_usa of checkbox_usa_list){

                    if(!checkbox_usa.checked){  // 다른 체크박스의 체크여부 파악
                        is_check_all = false;
                        break;
                    }

                }   // end of for~of-------------
                
                if(is_check_all){
                    document.querySelector("input[id='allCheck']").checked = true;
                }

            }   // end of if~else---------------
        }) 
    }   // end of for~of-----------


}   // end of window.onload = function()--------------------------