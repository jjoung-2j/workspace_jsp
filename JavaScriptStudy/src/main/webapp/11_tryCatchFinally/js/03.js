/**
 * 
 */

 window.onload = function(){

    try {
		func_plus(2,3);
	} catch(e){
	 //	alert(e);  // ReferenceError: func_plus is not defined
	 //	console.log(e); // ReferenceError: func_plus is not defined 
	    document.querySelector("div#error").innerHTML = `<span style='color:red;'>오류발생 : ${e}</span>`; 
	} finally {
	    document.querySelector("div#mydiv").innerHTML = `<span style='color:blue;'>안녕하세요?</span>`;	
	}
	
 }// end of window.onload = function(){}------------------	

	 