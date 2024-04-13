/**
 * 
 */

window.onload = function(){
    
	const btnSubmit = document.querySelector("button#btnSubmit"); // "제출하기" 버튼 

	const h2_timer = document.querySelector("h2#timer"); // 타이머를 보여줄 장소 
	 
	let time = 600; // 타이머 시간을 10분으로 지정함.
	 
	// === 타이머 함수 만들기 시작 === //
	const timer = function() {
		   
	   if(time < 0) {
			   alert("시험시간 종료!!\n자동으로 제출됩니다.");
			   
			   clearInterval(interval_timer); // 타이머 삭제하기
			                                  // interval_timer 는 중단해야할 setInterval 함수를 가리키는 것이다. 
			   
		   //  btnSubmit.disabled = true;  // "제출하기" 버튼 비활성화
		   //  또는
               btnSubmit.setAttribute('disabled', 'true'); // "제출하기" 버튼 비활성화
	  
	  // [참고] btnSubmit.disabled = false; // "제출하기" 버튼 활성화
	  //        또는
      //        btnSubmit.removeAttribute('disabled'); // "제출하기" 버튼 활성화
			
			   check(); // 채점하는 함수 호출
		}
		   
		else {
			  let minute = "";
			  let second = "";
		
			  minute = parseInt(time / 60); // 소수부는 없애 버리고 정수부만 가져오는 것이다.  
			  if(minute < 10) {
			      minute = "0" + minute;
			  }
		
			  second = time % 60; // time 을 60으로 나누었을때의 나머지  
			  if(second < 10) {
			      second = "0" + second;
			  }
		
			  h2_timer.innerHTML = `${minute}:${second}`;
			
			  time--;   
		   }
	   };
	 // === 타이머 함수 만들기 끝 === //  
	 
	 timer(); // 타이머 함수 호출 
	 
  // const interval_timer = setInterval(function(){ timer(); }, 1000); // 1초 마다 주기적으로 타이머 함수가 호출되도록 지정함.
  // 또는 	
	 const interval_timer = setInterval(timer, 1000); // 1초 마다 주기적으로 타이머 함수가 호출되도록 지정함. 
	 
	 
	 //////////////////////////////////////////////////////////////////////////////////////////////////
	 
	 
	 const arr_quizData = [
		 {
			 question : "문제1. 대한민국의 수도는?",
			 answers  : {
				 1 : "부산",
				 2 : "수원",
				 3 : "서울",
				 4 : "인천"
			 },
			 correct : 3
		 },
		 
		 {
			question : "문제2. 1+1은?",
     	    answers  : { 
     	    	 1 : "1",
     	    	 2 : "2",
     	    	 3 : "3",
     	    	 4 : "4"
     	     },
     	     correct : 2 
		 },
		 
		 {
			question : "문제3. 미국의 수도는?",
      	    answers  : { 
      	    	 1 : "뉴욕",
      	    	 2 : "파리",
      	    	 3 : "로스엔젤러스",
      	    	 4 : "워싱턴",
      	    	 5 : "런던"
      	     },
      	     correct : 4  
		 },
		 
		 {
			question : "문제4. 사진속의 인물의 이름은?<div><img src='images/iyou.jpg'/></div>",
       	    answers  : { 
       	    	 1 : "엄정화",
       	    	 2 : "아이유",
       	    	 3 : "김태희",
       	    	 4 : "박보영"
       	     },
       	     correct : 2 
		 },
		 
		 {
			question : "문제5. 다음중 가장 잘 생긴 강사를 고르시오.",
       	    answers  : { 
       	    	 1 : "cjwon.jpg",
       	    	 2 : "hanjh.jpg",
       	    	 3 : "kimhj.jpg",
       	    	 4 : "seoyh.jpg"
       	     },
       	     correct : 4 
		 }
	 ];

     const questiones_div = document.querySelector("div#questiones"); // 퀴즈문항을 보여줄 장소 
     
     // === 퀴즈문항을 html 로 만들기 시작 === //
	 let html = ``;
	 
	 arr_quizData.forEach( (item, index) => {
		  html += `<div id="div${index}" style="display: none;">
		              <p id="q${index}">${item.question}</p>
		              <ol>`;

          if(index != 4) {	// 문제의 보기(answers)가 모두 이미지가 아닌 것들   
			  for(let property_name in item.answers){ // 어떤 객체의 속성(키)들을 모두 불러올때는 for문에서 of 가 아니라 in 을 사용한다.   
				    html += `<li><label for="${index}${property_name}">${item.answers[property_name]}</label>&nbsp;<input id="${index}${property_name}" type="radio" name="question${index}" value="${property_name}" /></li>`;   
				              // 객체명.속성명 은 속성명에는 변수가 사용될 수 없다.
	    		              // 객체명[속성명] 은 속성명에 변수가 사용될 수 있다.
	    		              // ${item.answers[property_name]} 는 "부산" 과 같은 것을 말하는 것이다.
	    		              
	    		              // 라디오는 반드시 name 값이 동일해야 한다.
	    		              // value 값은 item.answers 의 속성명인 1 2 3 4 로 되어진다.
			  }
		  }
		  
		  else {  // 문제의 보기(answers)가 모두 이미지로 되어진 것들    
			  let num = 0;
			  for(let property_name in item.answers){ // 어떤 객체의 속성(키)들을 모두 불러올때는 for문에서 of 가 아니라 in 을 사용한다.   
				    html += `${++num}.<li style="display: inline-block; margin-right: 7%;"><img for="${index}${property_name}" src="images/${item.answers[property_name]}" width="100px" />&nbsp;<input id="${index}${property_name}" type="radio" name="question${index}" value="${property_name}" /></li>`;
			  	     
		  	   }
		  }
		  
		  html += `   </ol>
		              <div class='ox' id="ox${index}"></div>
		           </div>`; // 퀴즈문항에 대해 정답인지 틀린것인지 보여줄 장소
		   
	 }); // end of arr_quizData.forEach()---------------------------------------------
	 	 
	 questiones_div.innerHTML = html;
	 
	 document.querySelector("div#div0").style.display = "";
	 // === 퀴즈문항을 html 로 만들기 끝 === //

    /////////////////////////////////////////////////////////////////////////////////////////////////////
     
    let current_index = 0;   // 현재 인덱스 번호
		
	const btn_previous = document.querySelector("button#previous");
	const btn_next = document.querySelector("button#next");
		
	
	// === 다음으로 이동하는 함수 ===  
	const func_next = function() {  
	    
	    const div_question = document.querySelectorAll("div#questiones > div");
	    div_question.forEach(elmt => {elmt.style.display = "none"});
	    
	    if(current_index < arr_quizData.length-1) { // 현재 인덱스 번호가 마지막(지금은 4임)이 아닌 경우
		      document.querySelector(`div#div${++current_index}`).style.display = "";
		      btn_previous.removeAttribute('disabled') // 이전버튼은 활성화 상태로 만든다.
		      document.querySelector("h2#msg").innerHTML = ""; 	
		}
		else { // 현재 인덱스 번호가 마지막(지금은 4임)인 경우 
		      document.querySelector(`div#div${current_index}`).style.display = "";
	          btn_next.setAttribute('disabled', 'true') // 마지막 문제일 때 다음버튼은 비활성화 상태로 만든다.
	          document.querySelector("h2#msg").innerHTML = "마지막 문제 입니다.";
	    }
	};
	
	
	// === 이전으로 이동하는 함수 ===
	const func_previous = function() {
	    
	    const div_question = document.querySelectorAll("div#questiones > div");
	    div_question.forEach(elmt => {elmt.style.display = "none"});
	    
	    if(current_index > 0) { // 현재 인덱스 번호가 처음이 아닌 두번째 이상인 경우 
		      document.querySelector(`div#div${--current_index}`).style.display = "";
		      btn_next.removeAttribute('disabled') // 다음버튼은 활성화 상태로 만든다.
		      document.querySelector("h2#msg").innerHTML = ""; 	
		}
		else { // 현재 인덱스 번호가 처음인 경우 
		      document.querySelector(`div#div${current_index}`).style.display = "";
	          btn_previous.setAttribute('disabled', 'true') // 처음 문제일 때 이전버튼은 비활성화 상태로 만든다.
	          document.querySelector("h2#msg").innerHTML = "처음 문제 입니다.";
	    }
	    
	};
	
	btn_previous.setAttribute('disabled', 'true'); // 이전 버튼은 초기화로 사용하지 못하도록 비활성화 상태로 만든다.
	
	btn_previous.addEventListener("click", func_previous);  // 이전버튼 클릭시 이전으로 이동하는 함수를 호출한다.
	btn_next.addEventListener("click", func_next);  // 다음버튼 클릭시 다음으로 이동하는 함수를 호출한다. 
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////
	 	 
	 
	// === "제출하기" 버튼 클릭시 이벤트 처리하기 시작 === //
	const handleSubmit = function(){
	
	  // 제출하기를 누르면 먼저 수험자가 정답선택을 안한 것이 존재하는지 알아봐서 정답선택이 안한 것이 있다라고 알려주도록 한다.
	  // == 정답선택을 안한 것이 존재하는지 알아보기 시작 == //
	     let is_all_checked = true;  // 정답선택을 모두 했는지 여부를 알아오는 용도 
	     let is_submit = true;       // 정말로 제출을 할 것인지 여부를 알아오는 용도 
		 
		 for(let i=0; i<arr_quizData.length; i++) {	 
			 const radio_list = document.querySelectorAll(`input[name='question${i}']`);
			 let is_checked = false;
			 
			 for(let radio_elmt of radio_list){
				 if(radio_elmt.checked == true) {
					is_checked = true;
					break;			 
				 }
			 }// end of for--------------------
			 
			 if(is_checked == false) {
				 is_all_checked = false;
			 }
		 }// end of for--------------------------
		 
		 if(is_all_checked == false) { // 정답선택을 안한 것이 존재하는 경우  
			 is_submit = confirm("정답을 선택안한 문제가 있습니다.\n그래도 제출을 하시겠습니까?");
		 }
	  // == 정답선택을 안한 것이 존재하는지 알아보기 끝 == //
	  ////////////////////////////////////////////////////////////////////////////////////////
	  
		  
	  if(is_submit == true) {
		  
		  alert("제출이 완료되었습니다.");
		   
		  clearInterval(interval_timer); // 타이머 삭제하기
		                                 // interval_timer 는 중단해야할 setInterval 함수를 가리키는 것이다. 
		  
		  h2_timer.innerHTML = `00:00`;
		  
	   // btnSubmit.disabled = true;  // "제출하기" 버튼 비활성화
	   // 또는
          btnSubmit.setAttribute('disabled', 'true'); // "제출하기" 버튼 비활성화
          
 // [참고] btnSubmit.disabled = false; // "제출하기" 버튼 활성화
 //       또는
 //       btnSubmit.removeAttribute('disabled'); // "제출하기" 버튼 활성화
			
		  check(); // 채점하는 함수 호출
	  }
	};
	 
	 // btnSubmit 은 "제출하기" 버튼이다. 이것은 맨 위에서 만들었다.
	 btnSubmit.addEventListener('click', handleSubmit);
	 // === "제출하기" 버튼 클릭시 이벤트 처리하기 끝 === //


	//////////////////////////////////////////////////////////////
 
	 // === 채점하는 함수 만들기 시작 === //
	 const check = function() {
	     
	     let arr_result = [];  // 각 문항마다 결과정보를 저장하는 용도의 배열로써 시험결과를 보여주는 용도에 사용될 것임.
	     
	     let answer_cnt = 0; // 정답개수 누적용 
	     
	     arr_quizData.forEach( (item, index) => {
			 
		 //	 console.log(`${index+1}번 문제 정답은 ${item.correct}`);
		 /*
		     1번 문제 정답은 3
		     2번 문제 정답은 2
		     3번 문제 정답은 4
		     4번 문제 정답은 2
		     5번 문제 정답은 4
		 */
			 
			 // 퀴즈문항 뒤에 정답번호 공개하기 
			 const question = document.querySelector(`p#q${index}`).innerHTML; // 정답을 보여주기전 문제를 읽어와서 확인해보자. 
		 //	 console.log(question);
			 /*
			    문제1. 대한민국의 수도는?
			    문제2. 1+1은?
			    문제3. 미국의 수도는?
			    문제4. 사진속의 인물의 이름은?
			    문제5. 다음중 가장 잘 생긴 강사를 고르시오.
			 */ 
			
			 document.querySelector(`p#q${index}`).innerHTML = question + `&nbsp;<span style='color:red; font-weight:bold'>${item.correct}</span>`; 
			 // 문제에다가 뒤에 정답을 붙여서 보여준다. 
			 
			 
			 // === 해당 문제의 라디오 개수가 몇개인지 알아오기 === //
		  // let radio_length = document.getElementsByName(`question${index}`).length;
		  // 또는 	 
			 let radio_length = document.querySelectorAll(`input[name='question${index}']`).length; 
			  
			 console.log(`${index+1}번 문제 라디오 개수는 ${radio_length} 개 입니다.`); 
			 /*
			    1번 문제 라디오 개수는 4 개 입니다.
			    2번 문제 라디오 개수는 4 개 입니다.
			    3번 문제 라디오 개수는 5 개 입니다.
			    4번 문제 라디오 개수는 4 개 입니다.
			    5번 문제 라디오 개수는 4 개 입니다.
			 */ 
			
			 let isCheckAnswer = false; // 라디오의 선택유무 검사용 
			 for(let i=0; i<radio_length; i++){
				 if(document.querySelectorAll(`input[name='question${index}']`)[i].checked) {
					 isCheckAnswer = true; 
					 break;
				  }  
			 }// end of for------------------ 
			  
		 //	 console.log(`${index+1}번 문제 답을 선택하셨나요? ${isCheckAnswer}`);    
			 /*
			   1번 문제 답을 선택하셨나요? true
			   2번 문제 답을 선택하셨나요? true
			   3번 문제 답을 선택하셨나요? false
			   4번 문제 답을 선택하셨나요? false
			   5번 문제 답을 선택하셨나요? false
			 */  
			
			 let user_answer;
			 if(isCheckAnswer) { // 답을 선택한 경우 
				 user_answer = document.querySelector(`input[name='question${index}']:checked`).value;  
				                                                    // :checked 은 라디오중에 선택되어진 라디오를 말한다.   
			 }
			 else { // 답을 선택하지 않은 경우 
				 user_answer = "선택안함";
			 }
			  
			 console.log("사용자가 선택한 답번호 => ", user_answer);
			 console.log(""); 
			 
			 let str_ox = "X";
			 
			 if(user_answer == item.correct) {
				 answer_cnt++;
			     document.querySelector(`div#ox${index}`).innerHTML = `<span style='color:blue;'>정답</span>`; 
			     str_ox = "O";
			 }
			 else {
				 document.querySelector(`div#ox${index}`).innerHTML = `<span style='color:red;'>틀림</span>`; 
			 }
			 
			 let result = {};
			 result.user_answer = user_answer; // 사용자가 선택한 답(사용자가 제출한 답)
			 result.ox = str_ox; // 정답이면 "O"  , 답을 선택치 않거나 틀리면 "X" 
			 arr_result.push(result);
			 
		  });// end of arr_quizData.forEach()---------------------------------
		  
		  
		  //////  === "제출하기" 버튼을 클릭하면 시험결과를 테이블로 만들어 출력해주기 시작 === ////
		   
		  
		  html = `<table>
		             <tr>
		             	<th width="20%">문제번호</th>`;
		  
		  for(let i=0; i<arr_quizData.length; i++){
			   html += `<th>${i+1}번문제</th>`;
		  }           	
		  
		       html += `<th width="10%">점수</th>
		            </tr>`;
		            
		  html +=  `<tr>
		                <th>정답</th>`;
		  for(let i=0; i<arr_quizData.length; i++){
			   html += `<td>${arr_quizData[i].correct}</td>`; 
		  }           
		       html += `<td rowspan='3'>${answer_cnt*20}</td>
		            </tr>`;      
		             	
		  html +=  `<tr>
		                <th>제출한답</th>`;
		  for(let i=0; i<arr_quizData.length; i++){
			   html += `<td>${arr_result[i].user_answer}</td>`; 
		  }           	
		  html +=  `</tr>`;           
		             
		  html +=  `<tr>
		                <th>채점결과</th>`;
		  for(let i=0; i<arr_quizData.length; i++){
			   html += `<td>${arr_result[i].ox}</td>`; 
		  }           	
		  html +=  `</tr>
		         </table>`;            
		   
		  document.querySelector("div#score").innerHTML = html; 
		  //////  === "제출하기" 버튼을 클릭하면 시험결과를 테이블로 만들어 출력해주기 끝 === ////
		  
		  document.querySelector("div#submit_div").style.display = "none"; // 제출하기 버튼 영역은 안보이도록 한다.
	     	 
	 }; // end of const check = function() {}---------------------	 
	 // === 채점하는 함수 만들기 끝 === //
	   

}// end of window.onload = function(){}--------------------------------
