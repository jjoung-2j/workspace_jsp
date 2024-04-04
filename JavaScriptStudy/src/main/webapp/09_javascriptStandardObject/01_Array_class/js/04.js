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

    tbl.addEventListener('keyup', function(e){
        func_calculate(e.target);   // e.target 이 input 태그를 가리키는 것이다.
    })

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

        // alert(e.target.parentNode.innerText);   // "1,000"  "2,000"     "3,000"
                                                // ["1","000"] ["2","000"] ["3","000"]
                                                // "1000"   "2000"  "3000"
                                                // 1000     2000    3000

        let price = e.target.parentNode.innerText;  // "1,000"  "2,000"     "3,000"

        price = Number(price.split(",").join(""));   
        // -> split ["1","000"] ["2","000"] ["3","000"] 
        // -> join "1000"   "2000"  "3000" 
        // -> Number  1000     2000    3000

        // alert(price);
        // alert(typeof price);

        let su = Number(e.target.value);  // 개수

        price *= su;    // price = price * su;      // price는 개수 * 단가인 금액

        //  alert(`가격: ${price}`);    // 1000 2000    3000

        // 숫자.toLocaleString('en'); => 숫자를 3자리마다 콤마를 찍어서 문자열로 리턴시켜줌.
        // alert(`가격: ${price.toLocaleString('en')}`);    // 1000 2000    3000

        // alert("확인용: " + e.target.parentNode.nextSibling.innerHTML);  // 사과는 0, 딸기도 0, 참외는 undefined 나옴.!

        const id = e.target.id; // apple    strawberry  melon
        // alert("확인용 : " + document.querySelector(`td#${id}`).innerHTML);

        document.querySelector(`td#${id}`).innerHTML = price.toLocaleString('en');
        // 숫자.toLocaleString('en'); => 숫자를 3자리마다 콤마를 찍어서 문자열로 리턴시켜줌.

        const td_list = document.querySelectorAll("table#tbl > tbody > tr > td:last-child");

        const arr_td = Array.from(td_list, item => item.innerText.split(",").join(""));
        // console.log(arr_td);
        /*
            (3) ['1000', '0', '0']
            (3) ['1000', '2000', '0']
            (3) ['1000', '2000', '3000']
        */

        let sum = 0;
        for(let price of arr_td){
            sum += Number(price);
        }

        // console.log("확인용 sum => ", sum);
        /*
            1000
            3000
            6000
        */

        document.querySelector("table#tbl > tfoot > tr > td:last-child").innerHTML = sum.toLocaleString('en');

    })

}   // end of window.onload = function()-------------------------

// Function Declaration (함수의 선언부)
function func_calculate(target){

    // alert(`확인용 : ${target.value}`);

    // 수량에 대한 제한넣기
    const su = Number(target.value);  // 개수

    if(su < 0 || su > 10){
        document.querySelector("div#display_error > span").style.display = "inline";
        target.value = "0";
        document.querySelector(`td#${target.id}`).innerHTML = "0";
    }
    else{
        document.querySelector("div#display_error > span").style.display = "";
    
        let price = target.parentNode.innerText;  // "1,000"  "2,000"     "3,000"

        price = Number(price.split(",").join(""));   
        // -> split ["1","000"] ["2","000"] ["3","000"] 
        // -> join "1000"   "2000"  "3000" 
        // -> Number  1000     2000    3000

        // alert(price);
        // alert(typeof price);

        price *= su;    // price = price * su;      // price는 개수 * 단가인 금액

        //  alert(`가격: ${price}`);    // 1000 2000    3000

        // 숫자.toLocaleString('en'); => 숫자를 3자리마다 콤마를 찍어서 문자열로 리턴시켜줌.
        // alert(`가격: ${price.toLocaleString('en')}`);    // 1000 2000    3000

        // alert("확인용: " + e.target.parentNode.nextSibling.innerHTML);  // 사과는 0, 딸기도 0, 참외는 undefined 나옴.!

        const id = target.id; // apple    strawberry  melon
        // alert("확인용 : " + document.querySelector(`td#${id}`).innerHTML);

        document.querySelector(`td#${id}`).innerHTML = price.toLocaleString('en');
        // 숫자.toLocaleString('en'); => 숫자를 3자리마다 콤마를 찍어서 문자열로 리턴시켜줌.

        const td_list = document.querySelectorAll("table#tbl > tbody > tr > td:last-child");

        const arr_td = Array.from(td_list, item => item.innerText.split(",").join(""));
        // console.log(arr_td);
        /*
            (3) ['1000', '0', '0']
            (3) ['1000', '2000', '0']
            (3) ['1000', '2000', '3000']
        */

        let sum = 0;
        for(let price of arr_td){
            sum += Number(price);
        }

        // console.log("확인용 sum => ", sum);
        /*
            1000
            3000
            6000
        */

        document.querySelector("table#tbl > tfoot > tr > td:last-child").innerHTML = sum.toLocaleString('en');
    }

}   // end of function func_calculate(target)---------------------------