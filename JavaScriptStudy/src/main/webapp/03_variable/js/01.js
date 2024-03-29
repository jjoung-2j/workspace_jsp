/**
 * 
 */

window.onload = function(){
    // 문서가 로딩이 끝난 다음에 자동적으로 수행해야할 일들은 여기서 기술해준다.
    document.getElementById("num1").focus();
}

function func_sum_error(){
    var num1= document.getElementById("num1").value;
    var num2= document.getElementById("num2").value;
    
    // typeof(변수명) 은 변수명의 타입을 알려주는 것이다.
    console.log("확인용 num1 타입: ", typeof(num1));    // string
    console.log("확인용 num2 타입: ", typeof(num2));    // string

    var sum_error = num1 + num2;
    
    // var sum = "asfdjknbasdn"   // 자바스크립트에서 string(문자열)을 나타낼때는 "" 또는 '' 을 사용한다.
    // 또한 자바스크립트에서 변수의 타입은 입력되어지는 값에 의해서 결정된다.
    /*
        var sum = 123;      // 콘솔 화면 number
        var sum = "123";    // 콘솔 화면 string
        var sum = '123';    // 콘솔 화면 string 
    */

    document.getElementById("sum").innerHTML = "<span style=\"color:red; font-weight:blod;\">"+sum_error+"</span>";     // string

    console.log("확인용 sum 타입: ", typeof(sum_error));

    // typeof(변수) 사용한 것은 개발자도구(F12) 콘솔에서 확인 가능하다.

}   // end of function func_sum_error()-----------------------

function func_sum_correct(){
    var num1= document.getElementById("num1").value;
    var num2= document.getElementById("num2").value;
    
    // typeof(변수명) 은 변수명의 타입을 알려주는 것이다.
    console.log("확인용 num1 타입: ", typeof(num1));    // string
    console.log("확인용 num2 타입: ", typeof(num2));    // string

    if(isNaN(Number(num1)) || isNaN(Number(num2))){
        console.log("확인용 : ", "num1 및 num2는 숫자로 변환 불가능 합니다.");
        alert("입력하시는 값은 두개 모두 숫자로만 입력하셔야 합니다.");
        func_sum_clear();
        return;     // func_sum_correct() 함수의 종료
    }
    else{
        console.log("확인용 : ", "num1, num2는 숫자로 변환 가능 합니다.");
    }

    var sum_correct = Number(num1) + Number(num2);
    // Number(num1) 은 string 타입은 num1 을 숫자 타입인 number 타입으로 바꾸어주는 것이다.
    // 또한 자바스크립트에서 변수의 타입은 입력되어지는 값에 의해서 결정된다.

    document.getElementById("sum").innerHTML = '<span style="color:blue; font-weight:bold">'+sum_correct+'</span>';     
    
    console.log("확인용 sum 타입: ", typeof(sum_correct));      // number

    // typeof(변수) 사용한 것은 개발자도구(F12) 콘솔에서 확인 가능하다.

}   // end of function func_sum_correct()---------------------

function func_sum_clear(){

    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("sum").innerHTML = "";

    document.getElementById("num1").focus();

}   // end of function func_sum_clear()-----------------------------

function func_minus(){
    var num3= document.getElementById("num3").value;
    var num4= document.getElementById("num4").value;
    // 이미 선언되어진 var num3을 또다시 var num3 으로 선언해서 사용해도 오류가 아니라 정상이다.

    // typeof(변수명) 은 변수명의 타입을 알려주는 것이다.
    console.log("확인용 num3 타입: ", typeof(num3));    // string
    console.log("확인용 num4 타입: ", typeof(num4));    // string

    if(Number(num3) * 0 != 0 || Number(num4) * 0 != 0){
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

    var num3 = "안녕하세요~~^^";
    // 이미 선언되어진 var num3을 또다시 var num3 으로 선언해서 사용해도 오류가 아니라 정상이다.

    document.getElementById("greeting").innerHTML = num3;

    console.log("확인용 num3 타입: ", typeof(num3));    // string
    // typeof(변수) 사용한 것은 개발자도구(F12) 콘솔에서 확인 가능하다.

    num3 = 1.2345;  // var 로 선언되어진 변수는 재사용이 가능하다.

    document.getElementById("float").innerHTML = num3;

    console.log("확인용 num3 타입: ", typeof(num3));    // number

    var num5;
    num5 = 999;
    // var 변수는 선언 후에 값을 넣어줘도 가능함.

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

function func_multiply(){
    var num5= Number(document.getElementById("num5").value);
    var num6= Number(document.getElementById("num6").value);
    // Number 로 바꾸어 선언해주어 var multiply = Number(num5) - Number(num6); 을 안 해주어도 된다.
    
    // typeof(변수명) 은 변수명의 타입을 알려주는 것이다.
    console.log("확인용 num5 타입: ", typeof(num5));    // number
    console.log("확인용 num6 타입: ", typeof(num6));    // number

    /*
        1995년 부터 2015년 까지는 모든 JavaScript 코드에서 변수 선언시 var 를 사용하였음.
        2015년 이후 부터 JavaScript 코드에서 변수 선언시 사용되는 const 와 let 가 추가 되었음. 
    
    ※ ES6(ECMAScript 6) 
    ==> ES6이란? ECMA라는 정보와 통신 시스템을 위한 국제적 표준화 기구에서 만든 ECMAScript 표준문서의 6번째 개정판 문서에 있는 표준 스펙이다.  
        ES5는 2011년에 나왔고, ES6은 2015년에 나왔는데 내용이 2배 이상 많아졌음. 
        ES7은 2016년에 나왔지만 ES6과 ES7은 바뀐것이 거의 없음. 
        그래서 일반적으로 ES7이라고 부르지 않고 ES6이라고 부름.
   */

    /* 옛날 방식(백틱이 아닌, + 사용하는 경우)
        document.getElementById("multiply").innerHTML = "<span>" + 
        "</span>"
    */

    var multiply = num5*num6;

    // 키보드 숫자 1 왼쪽에 있는 ` 을 백틱이라고 부른다.
    // 백틱 사용 방식
    document.getElementById("multiply").innerHTML = `<span style='color:purple; font-weight:bold; font-style:italic;'>
        ${multiply}
    </span>`; 
    // 백틱 안에서 변수 선언시 + 가 아니라 $ 로 표시해준다.

    console.log("확인용 multiply 타입: ", typeof(multiply));      // number
    // typeof(변수) 사용한 것은 개발자도구(F12) 콘솔에서 확인 가능하다

    if(isNaN(multiply)){
        console.log("확인용 : ", "num5 및 num6은 숫자로 변환 불가능 합니다.");
        alert("입력하시는 값은 두개 모두 숫자로만 입력하셔야 합니다.");
        func_multiply_clear();
        return;     // func_multiply() 함수의 종료
    }

}   // end of function func_multiply()---------------------

function func_multiply_clear(){

    document.getElementById("num5").value = "";
    document.getElementById("num6").value = "";
    document.getElementById("multiply").innerHTML = "";
    
    document.getElementById("num5").focus();

}   // end of function func_multiply_clear()-----------------------------