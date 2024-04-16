
$(document).ready(function() {
	
	const personArr = [{name:"김태희", age:25, school:"우수대학교", smImage:"kimth.jpg", lgImage:"kimthLarge.jpg"}
	                  ,{name:"아이유", age:28, school:"영재대학교", smImage:"iyou.jpg", lgImage:"iyouLarge.jpg"}
	                  ,{name:"박보영", age:30, school:"일류대학교", smImage:"parkby.jpg", lgImage:"parkbyLarge.jpg"}
	                  ];
		
	let html = `<ul>`;
	
	for(const person of personArr) {
		html += `<li class='friendname'>${person.name}</li>`;
	}
	
	html += `</ul>`;
	
	$(document).on("mouseover","li.friendname", (e) => { 
		             $(e.target).addClass("changeMenuColor"); 
      	           });
	
	$(document).on("mouseout","li.friendname", (e) => {
		             $(e.target).removeClass("changeMenuColor"); 
                  });
	
	
	$("div#header").html(html);
	
	// ============== flipCard 넣어주기 시작  ============== //
	for(const person of personArr) {
		html = `<div class="flip-card" style="display: inline-block; margin-right: 30px;">
		           <div class="flip-card-inner">
	                  <div class="flip-card-front">
	                     ${''/* <h1>앞면</h1> 이것이 백틱에서 주석을 달아주는 방법이다. */}
                         <img src="images/${person.lgImage}" style="width:228px;height:178px;">
	                  </div>
	                  <div class="flip-card-back">
	                     <h1>${person.name}</h1> 
	                     <p>${person.age}세</p> 
	                     <p>${person.school}</p>
	                  </div>
	               </div>
	            </div>`;
	    
	 // $("div#content").append(html);
	 // $("선택자").append(내용물);
	    
	 // 또는
	    
	    $(html).appendTo("div#content");
	 // $(내용물).appendTo("선택자");
	    
	}// end of for------------------------------------
    // ============== flipCard 넣어주기 끝  ============== //
	
}); // end of $(document).ready(function() {})-------------
	