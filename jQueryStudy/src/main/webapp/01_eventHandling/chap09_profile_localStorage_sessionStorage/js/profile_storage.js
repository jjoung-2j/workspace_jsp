
/*   !!!!!! 필수로 기억해야 합니다. !!!!!!
>>>> 로컬 스토리지(localStorage)와 세션 스토리지(sessionStorage) <<<< 
      로컬 스토리지와 세션 스토리지는 HTML5에서 추가된 저장소이다.
      간단한 키와 값을 저장할 수 있다. 키-밸류 스토리지의 형태이다.
    
    ※ 로컬 스토리지와 세션 스토리지의 차이점은 데이터의 영구성이다. 
       로컬 스토리지의 데이터는 사용자가 지우지 않는 이상 계속 브라우저에 남아 있게 된다. 
       만료 기간을 설정할 수 없다.
       하지만 세션 스토리지의 데이터는 윈도우나 브라우저 탭을 닫을 경우 자동적으로 제거된다.
       지속적으로 필요한 데이터(자동 로그인 등)는 로컬 스토리지에 저장하고, 
       잠깐 동안 필요한 정보(일회성 로그인 정보라든가)는 세션 스토리지에 저장하도록 한다. 
       그러나 비밀번호같은 중요한 정보는 절대로 저장하면 안된다.
       왜냐하면 클라이언트 컴퓨터 브라우저에 저장하는 것이기 때문에 타인에 의해 도용당할 수 있기 때문이다.

       로컬 스토리지랑 세션 스토리지가 나오기 이전에도 브라우저에 저장소 역할을 하는 게 있었다.
       바로 쿠키인데 쿠키는 만료 기한이 있는 키-값 저장소이다.

       쿠키는 4kb 용량 제한이 있고, 매번 서버 요청마다 서버로 쿠키가 같이 전송된다.
       만약 4kb 용량 제한을 거의 다 채운 쿠키가 있다면, 요청을 할 때마다 기본 4kb의 데이터를 사용한다. 
       4kb 중에는 서버에 필요하지 않은 데이터들도 있을 수 있다. 
       그러므로 데이터 낭비가 발생할 수 있게 된다. 
       바로 그런 데이터들을 이제 로컬 스토리지와 세션 스토리지에 저장할 수 있다. 
       이 두 저장소의 데이터는 서버로 자동 전송되지 않는다.

   >> 로컬 스토리지(localStorage) <<
      로컬 스토리지는 window.localStorage에 위치한다. 
      키 밸류 저장소이기 때문에 키와 밸류를 순서대로 저장하면 된다. 
      값으로는 문자열, boolean, 숫자, null, undefined 등을 저장할 수 있지만, 
      모두 문자열로 변환된다. 키도 문자열로 변환된다.

      localStorage.setItem('name', '이순신');
      localStorage.setItem('birth', 1994);

      localStorage.getItem('name');        // 이순신
      localStorage.getItem('birth');       // 1994 (문자열)

      localStorage.removeItem('birth');    // birth 삭제
      localStorage.getItem('birth');       // null (삭제됨)

      localStorage.clear();                // 전체 삭제

      localStorage.setItem(키, 값)으로 로컬스토리지에 저장함.
      localStorage.getItem(키)로 조회함. 
      localStorage.removeItem(키)하면 해당 키가 지워지고, 
      localStorage.clear()하면 스토리지 전체가 비워진다.

      localStorage.setItem('object', { userid : 'leess', name : '이순신' });
      localStorage.getItem('object');   // [object Object]
         객체는 제대로 저장되지 않고 toString 메소드가 호출된 형태로 저장된다. 
         [object 생성자]형으로 저장되는 것이다. 
         객체를 저장하려면 두 가지 방법이 있다. 
         그냥 키-값 형식으로 풀어서 여러 개를 저장할 수도 있다. 
         한 번에 한 객체를 통째로 저장하려면 JSON.stringify를 해야된다. 
         객체 형식 그대로 문자열로 변환하는 것이다. 받을 때는 JSON.parse하면 된다.

      localStorage.setItem('object', JSON.stringify({ userid : 'leess', name : '이순신' }));
      JSON.parse(localStorage.getItem('object')); // { userid : 'leess', name : '이순신' }
     
         이와같이 데이터를 지우기 전까지는 계속 저장되어 있기 때문에 
         사용자의 설정(보안에 민감하지 않은)이나 데이터들을 넣어두면 된다.  

   >> 세션 스토리지(sessionStorage) <<
       세션 스토리지는 window.sessionStorage에 위치한다. 
       clear, getItem, setItem, removeItem, key 등 
       모든 메소드가 로컬 스토리지(localStorage)와 같다. 
       단지 로컬스토리지와는 다르게 데이터가 영구적으로 보관되지는 않을 뿐이다. 
            
   >> 로컬 스토리지(localStorage)와 세션 스토리지(sessionStorage) 에 저장된 데이터를 보는 방법 << 
       크롬인 경우 F12(개발자도구) Application 탭에 가면 Storage - LocalStorage 와 SessionStorage 가 보여진다.
       거기에 들어가서 보면 Key 와 Value 값이 보여진다.
*/	

$(document).ready(function() {

     const arr_person = [{name:"김태희", filename:"kimth.jpg", filename2:"kimthLarge.jpg", address:"서울 강동구", email:"kimth@gmail.com", school:"우수대학교", age:30} 
                        ,{name:"아이유", filename:"iyou.jpg", filename2:"iyouLarge.jpg", address:"서울 강서구", email:"iyou@gmail.com", school:"영재대학교", age:27}
                        ,{name:"박보영", filename:"parkby.jpg", filename2:"parkbyLarge.jpg", address:"서울 강남구", email:"parkby@gmail.com", school:"일류대학교", age:29}];
      
     let html = ``;
     
     arr_person.forEach(item => {
		 html += `<span>${item.name}</span>`;
	 });
	 
	 $("div#container > div#firstdiv").html(html);

	 $("div#container > div#firstdiv > span").css('opacity','0.2');
	 
	 $("div#container > div#firstdiv > span").hover(
		 e => { // mouseover
			$(e.target).css({'opacity':'1.0', 'background-color':'navy', 'color':'white', 'border-radius':'40%'}).text('클릭하세요'); 
			const index = $("div#container > div#firstdiv > span").index($(e.target)); 
			let html = `<img src='images/${arr_person[index].filename}' />`; 
			$("div#container > div#face").html(html).css('opacity','0.2'); 
			$("div#container > div#profileInfo").empty();
		 }, 
		 e => { // mouseout
			const index = $("div#container > div#firstdiv > span").index($(e.target));
			$(e.target).css({'opacity':'0.2', 'background-color':'', 'color':'', 'border-radius':'0'}).text(`${arr_person[index].name}`); 
		 }
	 );// end of $("div#container > div#firstdiv > span").hover()--------- 
	 
	 
	 $("div#container > div#firstdiv > span").click(e => {
		 const index = $("div#container > div#firstdiv > span").index($(e.target)); 
		 let html = `<img src='images/${arr_person[index].filename2}' />
		             <ul>
		                 <li><label>성명:</label>${arr_person[index].name}</li>
		                 <li><label>주소:</label>${arr_person[index].address}</li>
		                 <li><label>e메일:</label>${arr_person[index].email}</li>
		             </ul>`;
		 $("div#container > div#face").html(html).css('opacity','1.0'); 
		 
		 // 프로필 더보기
		 $("div#container > div#face").append(`<span id='profileMore'>프로필 더보기</span>`);
		 
		 // *** 누구의 버튼을 클릭했는지 index 값을 storage 저장소에 잠시 보관해둔다.  *** //
		sessionStorage.setItem('index', index);
		 
		// ==================== 연습 시작 ==================== //
		// localStorage.setItem('name', '이순신');
      // localStorage.setItem('birthYear', 1994);
     
      // sessionStorage.setItem('addr', '서울시');
      // sessionStorage.setItem('mobile', '010-3456-7890');
      // ==================== 연습 끝 ==================== //
          
	 });// end of $("div#container > div#firstdiv > span").click(e => {})------------
	 
	 
	 // ========= "프로필 더보기" 를 클릭시 시작 ========== //
 /*
	 $("div#container > div#face > span#profileMore").click(function(){
		alert("프로필 더보기를 클릭하셨군요~~"); 
	 });
 */
	 // **** !!!! 중요 !!!! **** //
	 /*
	    선택자를 잡을때 선택자가 <body>태그에 직접 기술한 것이라면 선택자를 제대로 잡을수가 있으나
	    스크립트내에서 기술한 것이라면 선택자를 못 잡아올수도 있다.
	    이러한 경우는 아래와 해야만 된다.
	    $(document).on("이벤트종류", "선택자", function(){}); 으로 한다.
	 */
	  $(document).on("click", "div#container > div#face > span#profileMore", function(){ 
	  // alert("프로필 더보기를 클릭하셨군요~~");
		 
		// ==================== 연습 시작 ==================== //
      // localStorage.removeItem('name');    // 로컬 스토리지에 name 만 삭제
      // localStorage.clear();               // 로컬 스토리지에 있는 모두 삭제
      // sessionStorage.clear();
      // sessionStorage.removeItem('addr');  // 세션 스토리지에 addr 만 삭제
		// ==================== 연습 끝 ==================== //

		 // 자기 자신인 "프로필 더보기" 삭제하기
		 $("div#container > div#face > span#profileMore").remove();
		 
		 // "프로필 닫기" 버튼을 생성해서 추가한다.
		 $("div#container > div#face").append(`<span id='profileClose'>프로필 닫기</span>`); 
		 
		 // 세션스토리지에 저장되어 있는 key가 'index' 인 밸류(value)값을 불러온다.  
		 const index = sessionStorage.getItem('index');
	  // alert(`확인용 index : ${index}`);
	     /*
	       확인용 index : 0
	       확인용 index : 1
	       확인용 index : 2
	     */  
		 
		 let html = `<ul>
		               <li><label>출신학교:</label>${arr_person[index].school}</li>
		               <li><label>나이:</label>${arr_person[index].age}세</li>
		             </ul>`;
		             
		 $("div#container > div#profileInfo").html(html);            
		 
		 // === 아래의 것은 연습일 뿐이다. 시작 === //
   //    const name = localStorage.getItem('name');           // '이순신'
   //    const birthYear = localStorage.getItem('birthYear'); // 1994
     
   //    const addr = sessionStorage.getItem('addr');     // '서울시'
   //    const mobile = sessionStorage.getItem('mobile'); // '010-3456-7890'
         
   //    alert(`성명:${name}\n생년:${birthYear}\n주소:${addr}\n연락처:${mobile}`); 
         
        /* 
         localStorage.removeItem('name');
         localStorage.removeItem('birthYear');
        */ 
   //    localStorage.clear();
         
        /* 
         sessionStorage.removeItem('addr');
         sessionStorage.removeItem('mobile');
        */ 
   //    sessionStorage.clear();
         // === 아래의 것은 연습일 뿐이다. 끝 === //
	  }); 
	 // ========= "프로필 더보기" 를 클릭시 끝 ========== //
	 
	 
	 
	 // ========= "프로필 닫기" 를 클릭시 시작 ========== //
	 $(document).on("click", "div#container > div#face > span#profileClose", function(){ 
		 
		 // 자기 자신인 "프로필 닫기" 삭제하기
		 $("div#container > div#face > span#profileClose").remove(); 
		 
		 // "프로필 더보기" 버튼을 생성해서 추가한다.
		 $("div#container > div#face").append(`<span id='profileMore'>프로필 더보기</span>`); 
		 
		 // 프로필 더보기 정보를 비워야 한다.
		 $("div#container > div#profileInfo").empty();
		  
	 }); 
	 // ========= "프로필 닫기" 를 클릭시 끝 ========== //
	 	
}); // end of $(document).ready(function() {})-------------	

