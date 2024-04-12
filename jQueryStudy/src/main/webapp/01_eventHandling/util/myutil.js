// 키보드 F5(116) 와 F12(123) 막기 
function keydowncheck(event) {
   
    let result = true;
    let keycode = event.keyCode; 
    // () 에 event 가 아닌 e 클릭시 e.keyCode 로 작성
    
    if(keycode == 116) {
       alert("F5는 사용불가 합니다.");
       result = false;
    }
    
    if(keycode == 123 ) {
       alert("F12는 사용불가 합니다.");
       result = false;
    }
    
    return result;
 }