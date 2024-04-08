/**
 * 
 */

 window.onload = function(){
	
		document.getElementById("val1").innerHTML = Math.abs(20-25); // 절대값
		
		document.getElementById("val2").innerHTML = Math.ceil(10/4); // 2.5 보다 큰 최소의 정수  ==> 3          
		
		document.getElementById("val3").innerHTML = Math.ceil(10/5); // 2  소수부가 없는 정수라면 그대로 정수가 나오므로 2 이다.  
		
		document.getElementById("val4").innerHTML = Math.floor(10/4); // 2.5 보다 작은 최대의 정수  ==> 2  
		
		document.getElementById("val5").innerHTML = Math.floor(10/5); // 2  소수부가 없는 정수라면 그대로 정수가 나오므로 2 이다.
		
		document.getElementById("val6").innerHTML = Math.max(5,8,10,2,1,4); // 나열된 숫자중에 가장 큰 수를 얻어온다. 10 
		
		document.getElementById("val7").innerHTML = Math.min(5,8,10,2,1,4); // 나열된 숫자중에 가장 작은 수를 얻어온다. 1 
		
		document.getElementById("val8").innerHTML = Math.round(10/4); // 2.5를 반올림 해준다. 3 
		
		document.getElementById("val9").innerHTML = Math.round(10/3); // 3.33333 을 반올림 해준다. 3 
		
		document.getElementById("val10").innerHTML = Math.trunc(10/4); // 2.5를 절삭한다. 소수부는 무조건 잘라버린다. 2             
		
		document.getElementById("val11").innerHTML = Math.trunc(10/3); // 3.33333를 절삭한다. 소수부는 무조건 잘라버린다. 3 
		
		document.getElementById("val12").innerHTML = Math.sign(10-5);  // 10-5 값이 양수이면 1
		document.getElementById("val13").innerHTML = Math.sign(10-10); // 10-10 값이 0 이면 0
		document.getElementById("val14").innerHTML = Math.sign(5-10);  // 5-10 값이 음수이면 -1 
		
		document.getElementById("val15").innerHTML = Math.random(); // Math.random() 은 0을 포함한 0 이상 1 보다 작은 값을 랜덤하게 얻어온다. 0 <= Math.random() < 1            
		
		document.getElementById("val16").innerHTML = "10" + "2.34"; // 문자열 결합  102.34
		
		document.getElementById("val17").innerHTML = parseInt("10") + parseFloat("2.34"); // parseInt()는 정수로 변환, parseFloat()은 실수로 변환
		
		document.getElementById("val18").innerHTML = Number("10") + Number("2.34"); // Number() 는 숫자로 변환	
	 
 }// end of window.onload = function(){}------------------
 	 