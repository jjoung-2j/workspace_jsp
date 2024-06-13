$(document).ready(function(){
	   
	$("select#searchType").change(function(e){
		func_choice($(e.target).val());
	})
	   
	// 문서가 로드 되어지면 나의 카테고리별주문 통계 페이지가 보이도록 한다.
	$("select#searchType").val("myPurchase_byCategory").trigger("change");

});// end of $(document).ready(function(){})---------------------------

