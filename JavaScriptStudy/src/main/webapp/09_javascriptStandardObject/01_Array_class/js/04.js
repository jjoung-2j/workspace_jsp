window.onload = function(){

    const tbl = document.querySelector("table#tbl");

/* 이벤트 change
    tbl.onchange = function(){
        alert("확인용1")
    }
    // 또는
    tbl.addEventListener('change',function(){
        alert("확인용2")
    })
*/
/*  이벤트 keydown, keyup
    tbl.onkeydown = function(){ // 키보드를 누르고 있는 동안
        alert("확인용3")
    }
    // 또는
     tbl.addEventListener('keydown',function(){
        alert("확인용3")
    })

    tbl.onkeyup = function(){   // 키보드를 눌렀다가 손을 떼는 순간
        alert("확인용4")
    }
    // 또는
     tbl.addEventListener('keyup',function(){
        alert("확인용4")
    })
*/

    tbl.addEventListener('change',function(e){
        // alert(e.target.value)     // e.target 은 change 가 발생되어지는 element
        // e.target.id => apple    strawberry  melon
        // e.target.value => 0 1 2 3 4 5 6 7 8 9 10

        /*
            노드.parentNode.parentNode - 부모노드 의 부모노드
            노드.parentNode      - 부모노드
            노드.childNodes      - 모든자식노드들
            노드.firstChild      - 첫째자식노드
            노드.lastChild       - 막내자식노드
            노드.nextSibling     - 나의바로밑동생노드(형제노드)
            노드.previousSibling - 나의바로위형노드(형제노드)
            
            !! 조심할 사항은 태그사이에 띄어쓰기를 하거나 태그를 줄 바꿈을 해버리면
                띄어쓰기나 줄바꿈을 텍스트 노드(text node)로 취급해버리므로 
                원하는 노드의 값을 가지고 오지 않고 undefined 가 나온다.  
                            
            이렇게 undefined 가 나오지 않도록 하기 위해서 우리는 노드에 id 값을 주어서 처리하도록 한다. 
        */

        alert(e.target.parentNode.innerText);   // "1,000"  "2,000"     "3,000"
                                                // ["1","000"] ["2","000"] ["3","000"]
                                                // "1000"   "2000"  "3000"
                                                // 1000     2000    3000

        let price = e.target.parentNode.innerText;  // "1,000"  "2,000"     "3,000"

        price = Number(price.split(",").join(""));   
        // -> split ["1","000"] ["2","000"] ["3","000"] 
        // -> join "1000"   "2000"  "3000" 
        // -> Number  1000     2000    3000

        alert(price);
        alert(typeof price);

    })

}   // end of window.onload = function()-------------------------