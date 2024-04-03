window.onload = function() {
 
    let carName1 = "현대 제네시스"; // 쌍따옴표 
    let carName2 = '기아 K9';     // 홑따옴표  
    
    document.getElementById("demo1").innerHTML = carName1 + " VS " + carName2; 
    document.getElementById("demo2").innerHTML = `${carName1} VS ${carName2}`; 
    
    carName1 = "현대 '제네시스'"; // 쌍따옴표 
    carName2 = '기아 "K9"';     // 홑따옴표  
    
    document.getElementById("demo3").innerHTML = carName1 + " VS " + carName2; 
    
    carName1 = "현대 \"제네시스\""; // 쌍따옴표 
    carName2 = '기아 \'K9\'';     // 홑따옴표  
    
    document.getElementById("demo4").innerHTML = carName1 + " VS " + carName2;
    
    document.getElementById("demo5").innerHTML = carName1 + " 의 문자열 길이는 " + carName1.length + " 입니다.";
    // 현대 "제네시스" 의 문자열 길이는 9 입니다.  
    
    document.getElementById("demo6").innerHTML = `${carName2} 의 문자열 길이는 ${carName2.length} 입니다.`;  
     // 기아 'K9' 의 문자열 길이는 7 입니다.
}