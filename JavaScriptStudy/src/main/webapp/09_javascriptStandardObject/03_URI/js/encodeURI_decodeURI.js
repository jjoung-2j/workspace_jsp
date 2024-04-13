window.onload = function(){
	 
	 document.querySelector("input#inputText").focus();
	 
	 document.querySelector("button#btnOK_1").addEventListener('click', ()=>{ 
		 func_encodeURI_decodeURI();
	 });
	 
	 document.querySelector("button#btnReset_1").addEventListener('click', ()=>{ 
		 document.querySelector("input#inputText").value = "";
		 document.querySelector("td#encode_1").innerHTML = ""; 
		 document.querySelector("td#decode_1").innerHTML = "";
		 document.querySelector("input#inputText").focus();
	 });  
	 
	 document.querySelector("input#inputText").addEventListener('keydown', (e) => {
		 console.log(e.keyCode); // 엔터가 13 이다.
		 // event.keyCode 종류를 알려면 검색어로 "자바스크립트 keyCode" 구글링하면 나온다.
		 
		 if(e.keyCode == 13) { // 13 이 엔터 이다.
			 func_encodeURI_decodeURI();
		 }
	 });
	 
	 ///////////////////////////////////////////////////////////
	 
	 document.querySelector("button#btnOK_2").onclick = () => {
		 func_decodeURI(document.querySelector("input#encode_2").value);
	 };
	 
	 document.querySelector("input#encode_2").onkeydown = (e) => {
		 if(e.keyCode == 13) {
			 func_decodeURI(document.querySelector("input#encode_2").value);
		 }
	 };
	 
	 document.querySelector("button#btnReset_2").onclick = () => {
		 document.querySelector("input#encode_2").value = "";
		 document.querySelector("input#encode_2").focus();
		 document.querySelector("td#decode_2").innerHTML = "";
	 };
	 
 }// end of window.onload = function(){}------------------
 
 
 function func_encodeURI_decodeURI() {

	const inputText = document.querySelector("input#inputText").value;
	const encodeVal = encodeURI(inputText);
	               // encodeURI("문자열"); ==> "문자열"을 웹상에서 컴퓨터가 알아듣는 문자로 변환시켜준다. 
	               
	document.querySelector("td#encode_1").innerHTML = encodeVal;
	
	document.querySelector("td#decode_1").innerHTML = decodeURI(encodeVal); 
	                                               // decodeURI(encodeVal); ==> 웹상에서 컴퓨터가 알아듣는 문자를 사람이 알아볼수 있는 문자로 변환시켜준다.                
 }// end of function func_encodeURI_decodeURI(){}-----------
 
 
 function func_decodeURI(encodeURI_value) {
	 document.querySelector("td#decode_2").innerHTML = decodeURI(encodeURI_value);
 }// end of function func_decodeURI() {}------------------
 
 
 
 
 