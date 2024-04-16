
$(document).ready(function() {
	
	$("div#container > div#firstdiv > img").css('opacity','0.2');
	/*
	   'opacity' 는 광도(빛)값을 나타내어주는 것이다.
	   'opacity' 의 값의 범위는 0.0 ~ 1.0 까지이다.
	    0.0 은 완전투명(안보임)이고, 1.0 은 원본의 광도값이다.
	*/
	
	$("div#container > div#firstdiv > img").hover(e => {
		$(e.target).css({'opacity':'1.0', 'cursor':'pointer', 'border-radius':'50%'}); 
	}, e => {
		$(e.target).css({'opacity':'0.2', 'cursor':'default', 'border-radius':'0'});
	}); 
		
}); // end of $(document).ready(function() {})-------------	
