window.onload = function() {
    
    const num1 = document.getElementById("num1").innerText;
    const num2 = document.getElementById("num2").innerText;
    let result = `${num1+num2}`; // 2030
    document.getElementById("num3").innerHTML = result;
    // 20+30=2030 
    
    const num4 = document.getElementById("num4").innerText;
    const num5 = document.getElementById("num5").innerText;
    result = `${Number(num4)+Number(num5)}`; // 50
    document.getElementById("num6").innerHTML = result;
    // 20+30=50 
    
   //////////////////////////////////////////////////////////////////
   // ====  parseInt("문자열"), parseFloat("문자열"), Number("문자열") ==== //
   
   const num7 = document.getElementById("num7").innerText;
   const num8 = document.getElementById("num8").innerText;
   result = `${parseInt(num7)+parseInt(num8)}`; // 20+30
   document.getElementById("num9").innerHTML = result;
   // 20+30=50
   
   const num10 = document.getElementById("num10").innerText;
   const num11 = document.getElementById("num11").innerText;
   result = `${parseInt(num10)+parseFloat(num11)}`; // 20+30.5
   document.getElementById("num12").innerHTML = result;
   // 20+30.5=50.5
   
   const num13 = document.getElementById("num13").innerText;
   const num14 = document.getElementById("num14").innerText;
   result = `${Number(num13)+Number(num14)}`; // 20+30.5
   document.getElementById("num15").innerHTML = result;
   // 20+30.5=50.5
   
   
   let sum = Number(result) + 60; // 50.5 + 60 
   document.getElementById("div_1").innerHTML = sum;
   // 110.5
   
   
   //////////////////////////////////////////////////////////////////
    // ==== 숫자를 문자열로 변환하기 ==== 
    // String(숫자) 
    // 또는 
    // 숫자.toString()
    
    let str_1 = String(sum) + 9;    // "110.5" + 9
    let str_2 = sum.toString() + 9;             // "110.5" + 9
    document.getElementById("div_2").innerHTML = `${str_1}, ${str_2}`;
    //110.59, 110.59

    // ==== 숫자.toLocaleString('en'); ==== //
    let num = 1234567890;
    document.getElementById("div_3").innerHTML = num.toLocaleString('en');
    // 숫자.toLocaleString('en'); ==> 숫자를 3자리 마다 콤마를 찍어서 문자열로 리턴시켜준다.
    // 1,234,567,890

    //////////////////////////////////////////////////////////////////
    // 반올림하기 - 1
    // ====  숫자.toFixed() ==== //
   
    let x = 9.656;
    document.getElementById("p_1").innerHTML = x.toFixed(0); // "10"   
    // 정수부까지만 반올림하여 나타냄(결과값은 string 타입이 됨)
   
    document.getElementById("p_2").innerHTML = x.toFixed(0) + 20;  // "1020"
    // 정수부까지만 반올림하여 나타냄(결과값은 string 타입이 됨)
   
    document.getElementById("p_3").innerHTML = x.toFixed(2); // "9.66"
    // 소수부 2째 자리까지만 반올림하여 나타냄(결과값은 string 타입이 됨)
   
    document.getElementById("p_4").innerHTML = x.toFixed(4); // "9.6560"
    // 소수부 4째 자리까지만 반올림하여 나타냄(결과값은 string 타입이 됨)
   
    document.getElementById("p_5").innerHTML = x.toFixed(6); // "9.656000"
    // 소수부 6째 자리까지만 반올림하여 나타냄(결과값은 string 타입이 됨)   
   

    //////////////////////////////////////////////////////////////////
    // 반올림하기 - 2
    // ====  숫자.toPrecision() ==== //
    
    document.getElementById("p_6").innerHTML = x.toPrecision(); // 9.656   
    // 주어진 길이 만큼의 숫자를 반올림하여 가져와서 string 타입으로 리턴함.
   
    document.getElementById("p_7").innerHTML = x.toPrecision() + 20;  // 9.65620  
    // 주어진 길이 만큼의 숫자를 반올림하여 가져와서 string 타입으로 리턴함.
   
    document.getElementById("p_8").innerHTML = x.toPrecision(2); // 9.7
    // 주어진 길이 만큼의 숫자를 반올림하여 가져와서 string 타입으로 리턴함.
   
    document.getElementById("p_9").innerHTML = x.toPrecision(4); // 9.656
    // 주어진 길이 만큼의 숫자를 반올림하여 가져와서 string 타입으로 리턴함.
   
    document.getElementById("p_10").innerHTML = x.toPrecision(6); // 9.65600
    // 주어진 길이 만큼의 숫자를 반올림하여 가져와서 string 타입으로 리턴함.
    
 }