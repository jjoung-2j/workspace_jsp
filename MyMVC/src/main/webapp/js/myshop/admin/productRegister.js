$(document).ready(function(){
	
	let total_fileSize = 0; // 첨부한 파일의 총량을 누적하는 용도

	$("span.error").hide();
	
	// "제품수량" 에 스피너 달아주기
	$("input#spinnerPqty").spinner({
		spin:function(event,ui){
			if(ui.value > 100) {	// 최대 100
				$(this).spinner("value", 100);
				return false;
			}
			else if(ui.value < 1) {	// 최소 1
				$(this).spinner("value", 1);
				return false;
			}
		}
	});// end of $("input#spinnerPqty").spinner()-------
	
	// ==>> 제품이미지 파일선택을 선택하면 화면에 이미지를 미리 보여주기 시작 <<== //
	$(document).on("change","input.img_file", function(e){
		
		const input_file = $(e.target).get(0);
		// jQuery선택자.get(0) 은 jQuery 선택자인 jQuery Object 를 DOM(Document Object Model) element 로 바꿔주는 것이다. 
		// DOM element 로 바꿔주어야 순수한 javascript 문법과 명령어를 사용할 수 있게 된다.
		
		// console.log(input_file);
		// <input type="file" name="pimage1" class="infoData img_file" accept="image/*">
		
		// console.log(input_file.files);		// 내부적으로 파일타입이기 때문에 files 라는 속성이 있다.
		/*
			FileList {0: File, length: 1}
			0: File {name: 'berkelekle심플라운드01.jpg', lastModified: 1715916619465, lastModifiedDate: Fri May 17 2024 12:30:19 GMT+0900 (GMT+09:00), webkitRelativePath: '', size: 71317, …}
			length: 1
			[[Prototype]]:FileListitem: ƒ item()length: (...)constructor: ƒ FileList()Symbol(Symbol.iterator): ƒ values()Symbol(Symbol.toStringTag): "FileList"get length: ƒ length()
		*/

		// console.log(input_file.files[0]);
		// File {name: 'berkelekle심플라운드01.jpg', lastModified: 1715916619465, lastModifiedDate: Fri May 17 2024 12:30:19 GMT+0900 (GMT+09:00), webkitRelativePath: '', size: 71317, …}
		/*
			>>설명<<
            name : 단순 파일의 이름 string타입으로 반환 (경로는 포함하지 않는다.)
            lastModified : 마지막 수정 날짜 number타입으로 반환 (없을 경우, 현재 시간)
            lastModifiedDate: 마지막 수정 날짜 Date객체타입으로 반환
            size : 64비트 정수의 바이트 단위 파일의 크기 number타입으로 반환
            type : 문자열인 파일의 MIME 타입 string타입으로 반환 
                	MIME 타입의 형태는 type/subtype 의 구조를 가지며, 다음과 같은 형태로 쓰인다. 
                   	text/plain
                   	text/html
                   	image/jpeg
                   	image/png
                   	audio/mpeg
                   	video/mp4
                   	...
        */

		// console.log(input_file.files[0].name);
		// berkelekle심플라운드01.jpg

		// 자바스크립트에서 file 객체의 실제 데이터(내용물)에 접근하기 위해 FileReader 객체를 생성하여 사용한다.
		const fileReader = new FileReader();
		
		fileReader.readAsDataURL(input_file.files[0]);
		// FileReader.readAsDataURL() --> 파일을 읽고, result속성에 파일을 나타내는 URL을 저장 시켜준다.

		fileReader.onload = function(){		// FileReader.onload --> 파일 읽기 완료 성공시에만 작동하도록 하는 것임.

			// console.log(fileReader.result);	// 파일을 나타내는 URL 이 저장되어있다.
			/*
              data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAg 
              이러한 형태로 출력되며, img.src 의 값으로 넣어서 사용한다.
            */

			document.getElementById("previewImg").src = fileReader.result;

		}
		///////////////////////////////////////////////////
        // 첨부한 파일의 총량을 누적하는 용도 
		total_fileSize += input_file.files[0].size; 
        ///////////////////////////////////////////////////
	})
	// ==>> 제품이미지 파일선택을 선택하면 화면에 이미지를 미리 보여주기 끝 <<== //
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////
    // == 제품설명서 파일첨부(선택)을 선택하면 total_fileSize 에 파일크기 누적하기 시작 == <<
    $(document).on("change", "input[name='prdmanualFile']", function(e){
       
		const input_file = $(e.target).get(0);
		total_fileSize += input_file.files[0].size; 
	 });
	 // == 제품설명서 파일첨부(선택)을 선택하면 total_fileSize 에 파일크기 누적하기 끝 == <<
	 /////////////////////////////////////////////////////////////////


	//  === jQuery 를 사용하여 드래그앤드롭(DragAndDrop)을 통한 파일 업로드 시작 === 
	let file_arr = [];		// 첨부되어진 파일 정보를 담아둘 배열

	// == 파일 Drag & Drop 만들기 == //
	$("div#fileDrop").on("dragenter",function(e){		// "dragenter" 이벤트는 드롭대상인 박스 안에 Drag 한 파일이 최초로 들어왔을 때

		e.preventDefault();		// 이미지가 바로 보여지는 것을 막음
			/*		
				브라우저에 어떤 파일을 drop 하면 브라우저 기본 동작이 실행된다. 
				이미지를 drop 하면 바로 이미지가 보여지게되고, 만약에 pdf 파일을 drop 하게될 경우도 각 브라우저의 pdf viewer 로 브라우저 내에서 pdf 문서를 열어 보여준다. 
				이것을 방지하기 위해 preventDefault() 를 호출한다. 
				즉, e.preventDefault(); 는 해당 이벤트 이외에 별도로 브라우저에서 발생하는 행동을 막기 위해 사용하는 것이다.
			*/
           
		e.stopPropagation();	// 이벤트 전파 막기
			/*
				propagation 의 사전적의미는 전파, 확산이다.
				stopPropagation 은 부모태그로의 이벤트 전파를 stop 중지하라는 의미이다.
				즉, 이벤트 버블링을 막기위해서 사용하는 것이다. 
				사용예제 사이트 https://devjhs.tistory.com/142 을 보면 이해가 될 것이다. 
			*/


	}).on("dragover", function(e){ 	/* "dragover" 이벤트는 드롭대상인 박스 안에 Drag 한 파일이 머물러 있는 중일 때. 필수이벤트이다. dragover 이벤트를 적용하지 않으면 drop 이벤트가 작동하지 않음 */ 

		e.preventDefault();
		e.stopPropagation();
		$(this).css("background-color", "#ffd8d8");

	}).on("dragleave", function(e){ 	/* "dragleave" 이벤트는 Drag 한 파일이 드롭대상인 박스 밖으로 벗어났을 때  */
	
		e.preventDefault();
		e.stopPropagation();
		$(this).css("background-color", "#fff");
	
	}).on("drop", function(e){      /* "drop" 이벤트는 드롭대상인 박스 안에서 Drag 한것을 Drop(Drag 한 파일(객체)을 놓는것) 했을 때. 필수이벤트이다. */
	
		e.preventDefault();
	
		var files = e.originalEvent.dataTransfer.files;  
        /*
			jQuery 에서 이벤트를 처리할 때는 W3C 표준에 맞게 정규화한 새로운 객체를 생성하여 전달한다.
			이 전달된 객체는 jQuery.Event 객체 이다. 이렇게 정규화된 이벤트 객체 덕분에, 
			웹브라우저별로 차이가 있는 이벤트에 대해 동일한 방법으로 사용할 수 있습니다. (크로스 브라우징 지원)
			순수한 dom 이벤트 객체는 실제 웹브라우저에서 발생한 이벤트 객체로, 네이티브 객체 또는 브라우저 내장 객체 라고 부른다.
        */
		/*  Drag & Drop 동작에서 파일 정보는 DataTransfer 라는 객체를 통해 얻어올 수 있다. 
			jQuery를 이용하는 경우에는 event가 순수한 DOM 이벤트(각기 다른 웹브라우저에서 해당 웹브라우저의 객체에서 발생되는 이벤트)가 아니기 때문에,
			event.originalEvent를 사용해서 순수한 원래의 DOM 이벤트 객체를 가져온다.
			Drop 된 파일은 드롭이벤트가 발생한 객체(여기서는 $("div#fileDrop")임)의 dataTransfer 객체에 담겨오고, 
			담겨진 dataTransfer 객체에서 files 로 접근하면 드롭된 파일의 정보를 가져오는데 그 타입은 FileList 가 되어진다. 
			그러므로 for문을 사용하든지 또는 [0]을 사용하여 파일의 정보를 알아온다. 
        */

      	// console.log(typeof files); // object
        // console.log(files);
        /*
            FileList {0: File, length: 1}
            0: File {name: 'berkelekle단가라포인트03.jpg', lastModified: 1605506138000, lastModifiedDate: Mon Nov 16 2020 14:55:38 GMT+0900 (한국 표준시), webkitRelativePath: '', size: 57641, …}
                     length:1
            [[Prototype]]: FileList

			FileList {0: File, 1: File, 2: File, length: 3}
			0: File {name: 'cloth_buckaroo_4.png', lastModified: 1715916619466, lastModifiedDate: Fri May 17 2024 12:30:19 GMT+0900 (GMT+09:00), webkitRelativePath: '', size: 380185, …}
			1: File {name: 'berkelekle디스트리뷰트06.jpg', lastModified: 1715916619464, lastModifiedDate: Fri May 17 2024 12:30:19 GMT+0900 (GMT+09:00), webkitRelativePath: '', size: 48901, …}
			2: File {name: 'cloth_buckaroo_3.png', lastModified: 1715916619466, lastModifiedDate: Fri May 17 2024 12:30:19 GMT+0900 (GMT+09:00), webkitRelativePath: '', size: 366894, …}
			length: 3
			[[Prototype]]: FileList
        */

		if(files != null && files != undefined){
			// console.log("files.length 는 => " + files.length);  
            // files.length 는 => 1 이 나온다. 
            // files.length 는 => 3 이 나온다. 
               
		/*	
			for(let i=0; i<files.length; i++){
				const f = files[i];
				const fileName = f.name;  // 파일명
				const fileSize = f.size;  // 파일크기
				console.log("파일명 : " + fileName);
				console.log("파일크기 : " + fileSize);
			} // end of for------------------------
		*/

			let html = "";
			const f = files[0]; // 어차피 files.length 의 값이 1 이므로 위의 for문을 사용하지 않고 files[0] 을 사용하여 1개만 가져오면 된다. 
			let fileSize = f.size/1024/1024;  /* 파일의 크기는 MB로 나타내기 위하여 /1024/1024 하였음 */
		
			if( !(f.type == 'image/jpeg' || f.type == 'image/png') ) {
				alert("jpg 또는 png 파일만 가능합니다.");
				$(this).css("background-color", "#fff");
				return;
			}
			
			else if(fileSize >= 10) {
				alert("10MB 이상인 파일은 업로드할 수 없습니다.!!");
				$(this).css("background-color", "#fff");
				return;
			}
			
			else {
				file_arr.push(f);
				const fileName = f.name; // 파일명   
			
				fileSize = fileSize < 1 ? fileSize.toFixed(3) : fileSize.toFixed(1);
				// fileSize 가 1MB 보다 작으면 소수부는 반올림하여 소수점 3자리까지 나타내며, 
				// fileSize 가 1MB 이상이면 소수부는 반올림하여 소수점 1자리까지 나타낸다. 만약에 소수부가 없으면 소수점은 0 으로 표시한다.
				
				/* 
					numObj.toFixed([digits]) 의 toFixed() 메서드는 숫자를 고정 소수점 표기법(fixed-point notation)으로 표시하여 나타난 수를 문자열로 반환해준다. 
									파라미터인 digits 는 소수점 뒤에 나타날 자릿수 로써, 0 이상 20 이하의 값을 사용할 수 있으며, 구현체에 따라 더 넓은 범위의 값을 지원할 수도 있다. 
					digits 값을 지정하지 않으면 0 을 사용한다.
					
					var numObj = 12345.6789;

					numObj.toFixed();       // 결과값 '12346'   : 반올림하며, 소수 부분을 남기지 않는다.
					numObj.toFixed(1);      // 결과값 '12345.7' : 반올림한다.
					numObj.toFixed(6);      // 결과값 '12345.678900': 빈 공간을 0 으로 채운다.
				*/

				html += 
                       "<div class='fileList'>" +
                           "<span class='delete'>&times;</span>" +
                           "<span class='fileName'>"+fileName+"</span>" +
                           "<span class='fileSize'>"+fileSize+" MB</span>" +
                           "<span class='clear'></span>" +
                       "</div>";
                
				$(this).append(html);

				// ===>> 이미지파일 미리보기 시작 <<=== // 
                // 자바스크립트에서 file 객체의 실제 데이터(내용물)에 접근하기 위해 FileReader 객체를 생성하여 사용한다.
				// console.log(f);
				const fileReader = new FileReader();
				fileReader.readAsDataURL(f); // FileReader.readAsDataURL() --> 파일을 읽고, result속성에 파일을 나타내는 URL을 저장 시켜준다. 
				
				fileReader.onload = function() { // FileReader.onload --> 파일 읽기 완료 성공시에만 작동하도록 하는 것임. 
				// console.log(fileReader.result); 
					/*
					data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAg 
					이러한 형태로 출력되며, img.src 의 값으로 넣어서 사용한다.
					*/
					document.getElementById("previewImg").src = fileReader.result;
				};
				// ===>> 이미지파일 미리보기 끝 <<=== //
			}
		}	// end of if(files != null && files != undefined){-------------------------------

		$(this).css("background-color","#fff");
	})
	
	// == Drop 되어진 파일목록 제거하기 == //
	$(document).on("click","span.delete", function(e){

		let idx = $("span.delete").index($(e.target));
		// alert("인덱스 : " + idx);

		file_arr.splice(idx,1);
		// console.log(file_arr);
		/* 
            배열명.splice() : 배열의 특정 위치에 배열 요소를 추가하거나 삭제하는데 사용한다. 
                              삭제할 경우 리턴값은 삭제한 배열 요소이다. 삭제한 요소가 없으면 빈 배열( [] )을 반환한다.
      
            배열명.splice(start, 0, element);  // 배열의 특정 위치에 배열 요소를 추가하는 경우 
                         start   - 수정할 배열 요소의 인덱스
                            0       - 요소를 추가할 경우
                            element - 배열에 추가될 요소
             
            배열명.splice(start, deleteCount); // 배열의 특정 위치의 배열 요소를 삭제하는 경우    
                            start   - 수정할 배열 요소의 인덱스
                            deleteCount - 삭제할 요소 개수
      	*/

		$(e.target).parent().remove();

	})	// end of $(document).on("click","span.delete", function(e){--------

	//  === jQuery 를 사용하여 드래그앤드롭(DragAndDrop)을 통한 파일 업로드 끝 === 

	// 제품 등록하기
	$("input:button[id='btnRegister']").click(function(){

		$("span.error").hide();

		let is_infoData_OK = true;

		$(".infoData").each(function(index,elmt){
			const val = $(elmt).val().trim();
			if(val == ""){
				$(elmt).next().show();
				is_infoData_OK = false;
				return false;	// 일반적인 for문의 break; 와 같은 기능이다.
			}

		})	// end of $(".infoData").each(function(index,elmt){---------------

		if(is_infoData_OK){
			/* 
               FormData 객체는 ajax 로 폼 전송을 가능하게 해주는 자바스크립트 객체이다.
               즉, FormData란 HTML5 의 <form> 태그를 대신 할 수 있는 자바스크립트 객체로서,
               자바스크립트 단에서 ajax 를 사용하여 폼 데이터를 다루는 객체라고 보면 된다. 
               FormData 객체가 필요하는 경우는 ajax로 파일을 업로드할 때 필요하다.
            */ 
    
            /*
				=== FormData 의 사용방법 2가지 ===
				<form id="myform">
					<input type="text" id="title"   name="title" />
					<input type="file" id="imgFile" name="imgFile" />
				</form>
				
				첫번째 방법, 폼에 작성된 전체 데이터 보내기   
				var formData = new FormData($("form#myform").get(0));  // 폼에 작성된 모든것       
				또는
				var formData = new FormData($("form#myform")[0]);  // 폼에 작성된 모든것
				// jQuery선택자.get(0) 은 jQuery 선택자인 jQuery Object 를 DOM(Document Object Model) element 로 바꿔주는 것이다. 
				// DOM element 로 바꿔주어야 순수한 javascript 문법과 명령어를 사용할 수 있게 된다. 
		
				또는
				var formData = new FormData(document.getElementById('myform'));  // 폼에 작성된 모든것
			
				두번째 방법, 폼에 작성된 것 중 필요한 것만 선택하여 데이터 보내기 
				var formData = new FormData();
				// formData.append("key", value값);  // "key" 가 name 값이 되어진다.
				formData.append("title", $("input#title").val());
				formData.append("imgFile", $("input#imgFile")[0].files[0]);
            */  

			var formData = new FormData($("form[name='prodInputFrm']")[0]);		// $("form[name='prodInputFrm']").get(0) 폼 에 작성된 모든 데이터 보내기

			if(file_arr.length > 0){	// 추가 이미지 파일을 추가했을 경우

				// 첨부한 파일의 총합의 크기가 10MB 이상 이라면 전송을 하지 못하게 막는다.
				let sum_file_size = 0;

				for(let i=0; i<file_arr.length; i++){
					sum_file_size += file_arr[i].size;
				}	// end of for--------------

				////////////////////////////////////////
                // 첨부한 파일의 총량을 누적하는 용도 
                total_fileSize += sum_file_size;
              	////////////////////////////////////////

				if( sum_file_size >= 10*1024*1024 ) { // 첨부한 파일의 총합의 크기가 10MB 이상 이라면 
					alert("첨부한 추가이미지 파일의 총합의 크기가 10MB 이상이라서 제품등록을 할 수 없습니다.!!");
					return; // 종료
				}
				else{	// 첨부한 파일의 총합의 크기가 10MB 미만 이라면, formData 속에 첨부파일 넣어주기
					formData.append("attachCount", file_arr.length);	// 추가 이미지 파일 개수
					
					file_arr.forEach(function(item, index){	
						// 첨부파일 추가하기. item 이 첨부파일이다.
						formData.append("attach"+index, item);
					})	// end of forEach----------------
				}
			}	// end of if(file_arr.length > 0){--------

			///////////////////////////////////////
          	// 첨부한 파일의 총량이 20MB 초과시 //   
          	if( total_fileSize > 20*1024*1024 ) {
				alert("ㅋㅋㅋ 첨부한 파일의 총합의 크기가 20MB를 넘어서 제품등록을 할 수 없습니다.!!");
		  		return; // 종료
	  		} 
   			///////////////////////////////////////

			$.ajax({
						
				/* url : "<%= ctxPath%>/shop/admin/productRegister.up", ${pageContext.request.contextPath}/shop/admin/productRegister.up */
				url : "productRegister.up",
				type : "post",
				data : formData,
				processData:false,  // 파일 전송시 설정 => 파일이 있다면 꼭 넣어주어야 한다. default 는 true 이다. 
				contentType:false,  // 파일 전송시 설정 => 파일이 있다면 꼭 넣어주어야 한다. default 는 true 이다.
				dataType:"json",

				success:function(json){
				console.log("~~~ 확인용 : " + JSON.stringify(json));
					// ~~~ 확인용 : {"result":1}
					if(json.result == 1) {
						location.href="/MyMVC/shop/mallHomeMore.up";
					}
				},
				
				error: function(request, status, error){
					// alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
					alert("첨부된 파일의 크기의 총합이 20MB 를 초과하여 제품등록이 실패했습니다.ㅜㅜ");
				}

			})	// end of $.ajax-------------------------

			/*
				processData 관련하여, 일반적으로 서버에 전달되는 데이터는 query string(쿼리 스트링)이라는 형태로 전달된다. 
				ex) http://localhost:9090/board/list.action?searchType=subject&searchWord=안녕
					? 다음에 나오는 searchType=subject&searchWord=안녕 이라는 것이 query string(쿼리 스트링) 이다. 
	
				data 파라미터로 전달된 데이터를 jQuery에서는 내부적으로 query string 으로 만든다. 
				하지만 파일 전송의 경우 내부적으로 query string 으로 만드는 작업을 하지 않아야 한다.
				이와 같이 내부적으로 query string 으로 만드는 작업을 하지 않도록 설정하는 것이 processData: false 이다.
         	*/
          
         	/*
				contentType 은 default 값이 "application/x-www-form-urlencoded; charset=UTF-8" 인데, 
				"multipart/form-data" 로 전송이 되도록 하기 위해서는 false 로 해야 한다. 
				만약에 false 대신에 "multipart/form-data" 를 넣어보면 제대로 작동하지 않는다.
         	*/

		}
	})	// end of $("input:button[id='btnRegister']").click(function(){---------

	// === 등록 취소하기 === //
	$("input[type='reset']").click(function(){

		$("span.error").hide();
		file_arr = [];		// 첨부되어진 파일 정보를 담아 둘 배열 초기화
		$("div#fileDrop").empty();
		$("img#previewImg").hide();		// 이미지는 비우는것이 아니라 숨기는것

	})	// end of $("input[type='reset']").click(function(){--------------

})	// end of $(document).ready(function(){------------