<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%
    // 컨텍스트 패스명(context path name)을 알아오고자 한다.
    String ctxPath = request.getContextPath();
    // ctxPath ==> /JSPServletBegin 
%> 
    
<!DOCTYPE html>
<html>
<head>

<%-- Bootstrap 사용 --%>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<title>개인성향 데이터 수정하기</title>

<%-- Bootstrap CSS --%>
<link rel="stylesheet" href="<%= ctxPath%>/bootstrap-4.6.2-dist/css/bootstrap.min.css" type="text/css">
<%-- 사용자 CSS --%>
<link rel="stylesheet" type="text/css" href="<%= ctxPath%>/chap05/css/personUpdate.css">

<%-- Optional JavaScript --%>
<script src="<%= ctxPath%>/js/jquery-3.7.1.min.js" type="text/javascript"></script>
<script src="<%= ctxPath%>/bootstrap-4.6.2-dist/js/bootstrap.bundle.min.js" type="text/javascript"></script>

<script type="text/javascript">
	<%-- requestScope 를 주기 위해 밖에 직접 선언 --%>
	$(document).ready(function(){
		
		// 1. 성명 입력해주기
		$("input:text[name='name']").val("${requestScope.psdto.name}");
		
		// 2. 학력 입력해주기
		$("select[name='school']").val("${requestScope.psdto.school}")
		
		// 3. 색상 입력해주기
		$("input:radio[value='${requestScope.psdto.color}']").prop("checked",true);
		
		// 4. 음식 입력해주기
		const user_foodes = "${requestScope.psdto.strFood}";
		console.log(user_foodes);	// 없음 / 짬뽕,탕수육
		
		if(user_foodes != "없음"){
			
			const arr_food = user_foodes.split(",");
			// arr_food => ["짬뽕","탕수육"]
			
			arr_food.forEach(function(item, index, array) {
				$("input:checkbox[value='"+item+"']").prop("checked",true);
			})
		}
		
		// 5. 회원번호 입력해주기
		$("input:hidden[name='seq']").val("${requestScope.psdto.seq}");
		
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
		// === 회원가입 유효성 검사 === //
		$("form[name='updateFrm']").submit(()=>{
        
			if(confirm("정말로 수정하시겠습니까?")){
				
				// === 유효성 검사 === //
		        // 1. 성명
		        const name_length = $("input:text[name='name']").val().trim().length; 
		        if(name_length == 0) {
		           alert("성명을 입력하세요!!");
		           $("input:text[name='name']").val("").focus();
		           return false; // submit 을 하지 않고 종료한다.
		        } 
		        
		        // 2. 학력
		        const school_val = $("select[name='school']").val();
		        if(school_val == "") {
		           alert("학력을 선택하세요!!");
		           return false; // submit 을 하지 않고 종료한다.
		        }
		        
		        // 3. 색상
		        const color_length = $("input:radio[name='color']:checked").length; 
		        if(color_length == 0) {
		           alert("색상을 선택하세요!!");
		           return false; // submit 을 하지 않고 종료한다.
		        }
		        
		        // 4. 음식은 좋아하는 음식이 없다라면 선택을 안하더라도 허용하겠다.
		      /*   
		        const food_length = $("input:checkbox[name='food']:checked").length;
		        if(food_length == 0) {
		           alert("선호하는 음식을 최소한 1개 이상 선택하세요!!");
		           return false; // submit 을 하지 않고 종료한다.
		        } 
		      */   
			}
			else{
				return false;	// submit 을 하지 않고 종료한다.
			}
	        
        
     	});// end of $("form[name='registerFrm']").submit()-------
		
	})	// end of $(document).ready(function(){})-------
	
</script>

</head>
<body>
	<div class="container border border-info mt-5 p-4">
		<p class="h3 mb-5">${requestScope.psdto.name}님 성향 정보 수정하기</p>
		<%-- 먼저 div 엘리먼트에 .form-group 으로 <input>, <textarea> 및 <select> 태그를 감싼다.
            .form-control 클래스가 있는 모든 <input>, <textarea> 및 <select> 요소의 너비는 100% 입니다. 
        --%>
		<form name="updateFrm" action="<%= ctxPath%>/personRegisterEnd.do" method="post">
			<div class="row">
				<input type="hidden" name="seq"/>
                <label class="col-md-4" for="name">성명</label>
                <div class="col-md-8 form-group">
                   <input type="text" class="form-control" name="name" id="name" autofocus autocomplete="off" /> 
                </div>
           </div>
           
           <div class="row">
                <label class="col-md-4">학력</label>
                <div class="col-md-8 form-group">
                   <select class="form-control" name="school">
                       <option value="">선택하세요</option>
                       <option>고졸</option>
                       <option>초대졸</option>
                       <option>대졸</option>
                       <option>대학원졸</option>
                   </select>
                </div>
           </div>
           
           <div class="row">
                <label class="col-md-4">좋아하는 색상</label>
                <div class="col-md-8">
                   <div class="row form-group">
                    <div class="col-md-2">
                        <label for="red">빨강</label>
                        <input type="radio" name="color" id="red" value="red" />
                    </div>
                    
                    <div class="col-md-2 offset-md-1">
                        <label for="blue">파랑</label>
                        <input type="radio" name="color" id="blue" value="blue" />
                    </div>
                    
                    <div class="col-md-2 offset-md-1">
                        <label for="green">초록</label>
                        <input type="radio" name="color" id="green" value="green" />
                    </div>
                    
                    <div class="col-md-2 offset-md-1">
                        <label for="yellow">노랑</label>
                        <input type="radio" name="color" id="yellow" value="yellow" />
                    </div>
                   </div>
                </div>
           </div>
           
           <div class="row">
                <label class="col-md-4">좋아하는 음식(다중선택)</label>
                <div class="col-md-8">
                   <div class="row form-group">
                    <div class="col-md-2">
                        <label for="food_1">짜장면</label>
                        <input type="checkbox" name="food" id="food_1" value="짜장면" />
                    </div>
                    
                    <div class="col-md-2">
                        <label for="food_2">짬뽕</label>
                        <input type="checkbox" name="food" id="food_2" value="짬뽕" />
                    </div>
                    
                    <div class="col-md-2">
                        <label for="food_3">탕수육</label>
                        <input type="checkbox" name="food" id="food_3" value="탕수육" />
                    </div>
                    
                    <div class="col-md-2">
                        <label for="food_4">양장피</label>
                        <input type="checkbox" name="food" id="food_4" value="양장피" />
                    </div>
                    
                    <div class="col-md-2">
                        <label for="food_5">팔보채</label>
                        <input type="checkbox" name="food" id="food_5" value="팔보채" />
                    </div>
                   </div>
                </div>
           </div>
           
           <div class="row mt-4">
                <div class="col-md-2 offset-md-4 form-group">
                   <input type="submit" class="btn btn-success form-control" value="수정완료" /> 
                </div>
                <div class="col-md-2 offset-md-4 form-group">
                   <input type="reset" class="btn btn-danger form-control" value="수정취소" /> 
                </div>
                <!-- <div class="col-md-3 offset-md-4 form-group">
                   <a href="personSelect.do" class="btn btn-info">개인성향 모든정보 보기</a>
                </div>  -->
           </div>
		</form>
	</div>
</body>
</html>