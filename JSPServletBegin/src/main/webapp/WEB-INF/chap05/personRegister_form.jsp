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

<title>데이터를 DB로 전송하기</title>

<%-- Bootstrap CSS --%>
<link rel="stylesheet" href="<%= ctxPath%>/bootstrap-4.6.2-dist/css/bootstrap.min.css" type="text/css">
<%-- 사용자 CSS --%>
<link rel="stylesheet" type="text/css" href="<%= ctxPath%>/chap05/css/personRegister.css">

<%-- Optional JavaScript --%>
<script src="<%= ctxPath%>/js/jquery-3.7.1.min.js" type="text/javascript"></script>
<script src="<%= ctxPath%>/bootstrap-4.6.2-dist/js/bootstrap.bundle.min.js" type="text/javascript"></script>
<script src="<%= ctxPath%>/chap05/js/personRegister.js" type="text/javascript"></script>
</head>
<body>
	<div class="container border border-info mt-5 p-4">
		<p class="h3 mb-5">개인성향 데이터를 DB로 전송하기</p>
		<%-- 먼저 div 엘리먼트에 .form-group 으로 <input>, <textarea> 및 <select> 태그를 감싼다.
            .form-control 클래스가 있는 모든 <input>, <textarea> 및 <select> 요소의 너비는 100% 입니다. 
        --%>
		<form name="registerFrm" action="<%= ctxPath%>/personRegister.do" method="post">
			<div class="row">
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
                <div class="col-md-3 offset-md-1 form-group">
                   <input type="submit" class="btn btn-success form-control" value="전송" /> 
                </div>
                <div class="col-md-3 offset-md-1 form-group">
                   <input type="reset" class="btn btn-danger form-control" value="취소" /> 
                </div>
                <div class="col-md-3 offset-md-1 form-group">
                   <a href="personSelect.do" class="btn btn-info">개인성향 모든정보 보기</a>
                </div> 
           </div>
		</form>
	</div>
</body>
</html>