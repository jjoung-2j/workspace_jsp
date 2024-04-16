
$(document).ready(function() {
	
	  const arr_person = [{name:"김태희", filename:"kimth.jpg", filename2:"kimthLarge.jpg", address:"서울 강동구", email:"kimth@gmail.com"}
                         ,{name:"아이유", filename:"iyou.jpg", filename2:"iyouLarge.jpg", address:"서울 강서구", email:"iyou@gmail.com"}
                         ,{name:"박보영", filename:"parkby.jpg", filename2:"parkbyLarge.jpg", address:"서울 강남구", email:"parkby@gmail.com"}]; 
	
      let html = "";
      
      arr_person.forEach((item) => {
      //  html += "<span>"+item.name+"</span>";
    	  html += `<span>${item.name}</span>`;
      });
      
      $("div#container > div#firstdiv").html(html);
      
      $("div#container > div#firstdiv > span").css('opacity','0.2');
      
      $("div#container > div#firstdiv > span").hover( e => {
	    	  $(e.target).css({'opacity':'1.0','background-color':'navy','color':'white', 'border-radius':'40%'}).text("클릭하세요");
	    	  const index = $("div#container > div#firstdiv > span").index($(e.target));
	    	  let html = `<img src='images/${arr_person[index].filename}' />`;
	    	  $("div#container > div#face").html(html).css('opacity','0.2');
          } , 
          e => {
    	   	  const index = $("div#container > div#firstdiv > span").index($(e.target));
    	      $(e.target).css({'opacity':'0.2','background-color':'red','color':'yellow', 'border-radius':'0'}).text(`${arr_person[index].name}`);   
    	
	       // $("div#container > div#face").html("");
	       // 또는 
	          $("div#container > div#face").empty();
       
      });// end of $("div#container > div#firstdiv > span").hover()-----------------------
      
      
      $("div#container > div#firstdiv > span").click( e => {
    	  const index = $("div#container > div#firstdiv > span").index($(e.target));
    	  $(e.target).css({'opacity':'1.0','background-color':'navy','color':'white', 'border-radius':'0'}).text(`${arr_person[index].name}`);  
    	  
    	  let html = `<img src='images/${arr_person[index].filename2}' style='border-radius:20%' />
	    	          <ul>
	    	             <li><label>성명 :</label>${arr_person[index].name}</li>
	    	             <li><label>주소 :</label>${arr_person[index].address}</li>
	    	             <li><label>e메일 :</label>${arr_person[index].email}</li>
	    	          </ul>`;
    	  
    	  $("div#container > div#face").html(html).css('opacity','1.0');       
    	         
      });// end of $("div#container > div#firstdiv > span").click(function(){})--------------------	 
 
		
}); // end of $(document).ready(function() {})-------------	
