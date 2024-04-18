<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	//컨텍스트 패스명(context path name)을 알아오고자 한다.
	String ctxPath = request.getContextPath();
	// Servers -> Tomcat v10.1 Server 더블클릭 -> Moudules -> 클릭하여 주소 확인
	// Edit 를 통해 Path 변경 가능

	// System.out.println("ctxPath => " + ctxPath);		// 확인
	// ctxPath => /JSPServletBegin	<== WAS (톰캣서버) path 설정의 기본값임
	// ctxPath => /gclass			<== WAS (톰캣서버) path 설정의 /gclass 로 변경한 경우임
	// ctxPath => 					<== WAS (톰캣서버) path 설정의 / 또는 아무것도 없는 것으로 변경한 경우임
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>GET/POST 방식으로 데이터 전송하기</title>
<link rel="stylesheet" type="text/css" href="<%= ctxPath%>/chap03_StandardAction/css/03.css">
<%-- 안전빵으로 상대경로보다는 절대경로로 작성하는 것이 좋다. servlet 파일로 실행시에도 css 적용할 수 있도록 --%>
<script type="text/javascript" src="<%= ctxPath%>/js/jquery-3.7.1.min.js"></script>
<script type="text/javascript" src="<%= ctxPath%>/chap03_StandardAction/js/03.js"></script>
</head>
<body>
	<div id="container">
		
		<form name="registerFrm" action="<%= ctxPath%>/registerPerson.do" method="post">
		
			<fieldset>
            <legend>개인성향 테스트 (GET/POST method)</legend>
            <ul>
            <li>
               <label for="name">성명</label>
               <input type="text" name="name" id="name" placeholder="성명입력"/> 
            </li>
            <li>
               <label>학력</label>
               <select name="school">
                  <option>선택하세요</option>
                  <option>고졸</option> 
                  <option>초대졸</option>
                  <option>대졸</option>
                  <option>대학원졸</option>
               </select>
            </li>
            <li>
               <label>좋아하는 색상</label>
               <div>
                   <label for="red">빨강</label>
                   <input type="radio" name="color" id="red" value="red" />
                   
                   <label for="blue">파랑</label>
                   <input type="radio" name="color" id="blue" value="blue" />
                   
                   <label for="green">초록</label>
                   <input type="radio" name="color" id="green" value="green" />
                   
                   <label for="yellow">노랑</label>
                   <input type="radio" name="color" id="yellow" value="yellow" />
               </div>
            </li>
            <li>
               <label>좋아하는 음식(다중선택)</label>
               <div>
                   <label for="food1">짜장면</label>
                   <input type="checkbox" name="food" id="food1" value="jjm.png" />
                   
                   <label for="food2">짬뽕</label>
                   <input type="checkbox" name="food" id="food2" value="jjbong.png" />
                   
                   <label for="food3">탕수육</label>
                   <input type="checkbox" name="food" id="food3" value="tangsy.png" />
                   
                   <label for="food4">양장피</label>
                   <input type="checkbox" name="food" id="food4" value="yang.png" />
                   
                   <label for="food5">팔보채</label>
                   <input type="checkbox" name="food" id="food5" value="palbc.png" />
               </div>
            </li>
            <li>
               <input type="submit" value="전송" />
               <input type="reset"  value="취소" />
            </li>         
            </ul>
        </fieldset>
		</form>
	</div>

</body>
</html>