
$(document).ready(function() {

    const arrPerson = [{name:"김태희", filename:"kimth.jpg", filename2:"kimthLarge.jpg", address:"서울 강동구", email:"kimth@gmail.com", school:"우수대학교", age:30} 
                      ,{name:"아이유", filename:"iyou.jpg", filename2:"iyouLarge.jpg", address:"서울 강서구", email:"iyou@gmail.com", school:"영재대학교", age:27}
                      ,{name:"박보영", filename:"parkby.jpg", filename2:"parkbyLarge.jpg", address:"서울 강남구", email:"parkby@gmail.com", school:"일류대학교", age:29}]; 
   
    // ==== 메뉴넣기 시작 ==== //
    let menu_html = ``;
	
	arrPerson.forEach( (item) => {
		menu_html += `<span class='buttons'>${item.name}</span>`;
	});
	
	$("div#menu").html(menu_html);
	// ==== 메뉴넣기 끝 ==== //


	// ==== 내용물넣기 시작 ==== //
	let content_html = ``;
	
	for(let i=0; i<arrPerson.length; i++){
		
		content_html += `<div class="personInfo" style="position: relative; top: 50px; left: ${100+(i*100)}px;">
		                   <img src='images/${arrPerson[i].filename2}' />
		                   <ul>
		                     <li>${arrPerson[i].name}</li>
		                     <li>${arrPerson[i].address}</li>
		                     <li>${arrPerson[i].email}</li>
		                     <li style='margin: 30px; color:blue; cursor:pointer;'>프로필더보기</li>
		                   </ul>
		           
				           <ul id='moreProfile${i}' style="list-style-type: none; padding: 0px;">
				              <li>${arrPerson[i].school}</li>
				              <li>${arrPerson[i].age}세</li>
				              <li style='margin: 30px; color:red; cursor:pointer;'>프로필감추기</li>
				           </ul>
				        </div>`;
		
	}// end of for----------------------------
	
	$("div#content").html(content_html);
	// ==== 내용물넣기 끝 ==== //
	
	
/*	
	$("div.personInfo:eq(0)").css('border','solid 1px red');
	$("div.personInfo").eq(1).css('border','solid 1px green');
	$("div.personInfo:eq(2)").css('border','solid 1px blue');
*/	
    $("div.personInfo").hide();
	
    for(let i=1; i<=arrPerson.length; i++){
		setTimeout(function(){
		//	$("div.personInfo").eq(i-1).show();
			$("div.personInfo").eq(i-1).fadeIn('normal');
		}, (i*500));
	}// end of for-----------------
    
    
//	$("div.personInfo > ul:last-child").css('border','solid 3px red');
    
    $("div.personInfo > ul:last-child").hide();
    // 학력, 나이 정보를 감추었다.
    
    // 프로필더보기를 클릭했을때 감추어진 해당 인물의 학력, 나이 정보를 3초 동안 서서히 보여라. 
//  $("div.personInfo > ul:nth-child(2) > li:last-child").css('border','solid 3px red');
    
    $("div.personInfo > ul:nth-child(2) > li:last-child").each(function(i, elmt){
    	
    	$(elmt).click(function(){
    		$("div.personInfo").find("ul#moreProfile"+i).fadeIn(3000);
    	});
    	
    });// end of $("div.personInfo > ul:nth-child(2) > li:last-child").each()------------
    
    
    // 프로필감추기를 클릭했을때 보여졌던 해당 인물의 학력, 나이 정보를 3초동안 서서히 숨겨라.
    // $("div.personInfo > ul:last-child > li:last-child").css('border','solid 3px blue');
    
    $("div.personInfo > ul:last-child > li:last-child").each(function(i, elmt){ 
    	
    	$(elmt).click(function(){
    	 //	$(this).parent().fadeOut(3000);
    		/*
    		   선택자.fadeOut(3000); 은 선택자에 해당되는 내용물을 숫자(단위는 밀리초) 밀리초 동안 천천히 보이지말라는 말이다.
	           3000은 3초 이다.
    		*/
    	  	$(this).parent().fadeOut('slow'); 
    	  /*   
 		       숫자 3000 대신에 'slow'   를 쓰면 600 과 같다. 즉, 0.6초 이다.
 		       숫자 3000 대신에 'normal' 를 쓰면 400 과 같다. 즉, 0.4초 이다.
 		       숫자 3000 대신에 'fast'   를 쓰면 200 과 같다. 즉, 0.2초 이다.
 		   */
    	});
    	
    });// end of $("div.personInfo > ul:last-child > li:last-child").each()----------
	
}); // end of $(document).ready(function() {})-------------	

	