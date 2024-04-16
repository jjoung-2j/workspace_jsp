
$(document).ready(function() {
	
	$("input:text[id='text1']").bind("keydown", function(e){
		$("input:text[id='text2']").val( $(e.target).val() );
		console.log(e.keyCode);
	});
	
	$("input:text[id='text3']").bind("keyup", function(e){
		$("input:text[id='text4']").val( $(e.target).val() );
		console.log(e.keyCode);
	});
	
}); // end of $(document).ready(function() {})-------------	