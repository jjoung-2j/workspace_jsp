/**
 * 
 */

window.onload = function(){
    // 문서가 로딩이 끝난 다음에 자동적으로 수행해야할 일들은 여기서 기술해준다.
    document.getElementById("num1").focus();
}

function func_sum(){
    const num1= document.getElementById("num1").value;
    // ◆ const num1= document.getElementById("num1").value; ◆
    // 블록 범위 변수 'num1'을(를) 다시 선언할 수 없습니다. ts(2451)
    // const num1 이 이미 선언되어져 있으므로 또 선언하는 것은 오류이다.!!

    // ◆ num1= document.getElementById("num1").value; ◆
    // Uncaught TypeError: Assignment to constant variable.
    // --- num1 은 const 타입이므로 num1 에 이미 값이 할당된 이후에 또 값을 할당하는 것은 오류이다.
    // --- 그러므로 const 는 자바의 final 변수와 비슷한 상수변수 형태로 사용된다.

    const num2= document.getElementById("num2").value;

    // typeof(변수명) 은 변수명의 타입을 알려주는 것이다.
    console.log("확인용 num1 타입: ", typeof(num1));    // string
    console.log("확인용 num2 타입: ", typeof(num2));    // string

    document.getElementById("sum").innerHTML = 
    `<span style="color:blue; font-weight:bold;">
       ${Number(num1)+Number(num2)}
       </span>`;     
    
    console.log("확인용 sum 타입: ", typeof(sum));      // number

    // typeof(변수) 사용한 것은 개발자도구(F12) 콘솔에서 확인 가능하다.

}   // end of function func_sum()---------------------

function func_sum_clear(){

    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("sum").innerHTML = "";

    document.getElementById("num1").focus();

}   // end of function func_sum_clear()-----------------------------

function func_minus(){
    let num3 = Number(document.getElementById("num3").value);
    // ◆ let num3= Number(document.getElementById("num4").value); ◆
    // 블록 범위 변수 'num3'을(를) 다시 선언할 수 없습니다.ts(2451)
    // --- let num3 은 이미 선언되어져 있으므로 또 선언하는 것은 오류이다.!!

    num3 = "호호호 하하하";
    num3 = Number(document.getElementById("num3").value);
    // --- num3 은 let 타입이므로 num3 에 이미 값이 할당된 이후에 또 값을 할당해도 가능하다.!!

    let num4 = Number(document.getElementById("num4").value);

     // typeof(변수명) 은 변수명의 타입을 알려주는 것이다.
     console.log("확인용 num3 타입: ", typeof(num3));    // number
     console.log("확인용 num4 타입: ", typeof(num4));    // number
     console.log("확인용 num3 의 값:", num3);           // 확인용 num3 의 값: 숫자 or NaN
     console.log("확인용 num4 의 값:", num4);           // 확인용 num4 의 값: 숫자 or NaN

    if(num3 * 0 != 0 || num4 * 0 != 0){     
        console.log("확인용 : ", "num3 및 num4는 숫자로 변환 불가능 합니다.");
        alert("입력하시는 값은 두개 모두 숫자로만 입력하셔야 합니다.");
        func_minus_clear();
        return;
    }

    document.getElementById("minus").innerHTML = 
    `<span style="color:red; font-weight:bold;">
       ${num3-num4}
       </span>`;     

    if(Number(num3) * 0 != 0 || Number(num4) * 0 != 0){     
        // 또는 isNaN(Number(num3)) || isNaN(Number(num4))
        console.log("확인용 : ", "num3 및 num4는 숫자로 변환 불가능 합니다.");
        alert("입력하시는 값은 두개 모두 숫자로만 입력하셔야 합니다.");
        func_minus_clear();
        return;     // func_minus() 함수의 종료
    }
    else{
        console.log("확인용 : ", "num3, num4는 숫자로 변환 가능 합니다.");
    }

    var minus = Number(num3) - Number(num4);
    // !!! 자바스크립트는 변수에 자바처럼 데이터 타입이 정해져 있지 않고,
    //     변수에 입력되어지는 데이터값에 따라 데이터 타입이 정해진다.  !!!

    document.getElementById("minus").innerHTML = '<span style="color:green; font-weight:bold; font-style:italic;">' + minus + '</span>';     
    
    console.log("확인용 minus 타입: ", typeof(minus));      // number
    // typeof(변수) 사용한 것은 개발자도구(F12) 콘솔에서 확인 가능하다

    num3 = "안녕하세요~~^^";
    // let로 선언되어진 변수는 다른값을 받아서 쓸 수 있는 재사용이 가능하다.
    // 이미 선언되어진 var num3을 또다시 var num3 으로 선언해서 사용해도 오류가 아니라 정상이다.

    document.getElementById("greeting").innerHTML = num3;

    console.log("확인용 num3 타입: ", typeof(num3));    // string
    // typeof(변수) 사용한 것은 개발자도구(F12) 콘솔에서 확인 가능하다.

    num3 = 1.2345;  // var 로 선언되어진 변수는 재사용이 가능하다.

    document.getElementById("float").innerHTML = num3;

    console.log("확인용 num3 타입: ", typeof(num3));    // number

    /*  오류사항
        const num5;
        num5 = 999;
    */
    // --- 'const' declarations must be initialized.ts(1155)
    // --- const는 반드시 변수의 선언과 함께 값을 넣어주어야 한다.
    // --- 위와 같이 하면 오류가 발생한다.

    let num5 = 100;
    num5 = 999;
    // let 변수는 선언 후에 값을 넣어줘도 가능함.

    document.getElementById("point").innerHTML = num5;

    console.log("확인용 num5 타입: ", typeof(num5));

    
   
}   // end of function func_minus()---------------------

function func_minus_clear(){

    document.getElementById("num3").value = "";
    document.getElementById("num4").value = "";
    document.getElementById("minus").innerHTML = "";

    document.getElementById("greeting").innerHTML = "";
    document.getElementById("float").innerHTML = "";
    document.getElementById("point").innerHTML = "";

    document.getElementById("num3").focus();

}   // end of function func_minus_clear()-----------------------------