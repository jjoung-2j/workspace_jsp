<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	//컨텍스트 패스명(context path name)을 알아오고자 한다.
	String ctxPath = request.getContextPath();
	// Servers -> Tomcat v10.1 Server 더블클릭 -> Moudules -> 클릭하여 주소 확인
	// Edit 를 통해 Path 변경 가능

	// System.out.println("ctxPath => " + ctxPath);		// 확인
	// ctxPath => /JSPServletBegin_tomcat9	<== WAS (톰캣서버) path 설정의 기본값임
	// ctxPath => /gclass					<== WAS (톰캣서버) path 설정의 /gclass 로 변경한 경우임
	// ctxPath => 							<== WAS (톰캣서버) path 설정의 / 또는 아무것도 없는 것으로 변경한 경우임
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>GET 방식으로 데이터 전송하기</title>
<link rel="stylesheet" type="text/css" href="css/01.css">
</head>
<body>
	<div id="container">
		<%--<form action="/JSPServletBegin_tomcat9/01_getMethod.do">--%>
		<%-- 컨텍스트 패스명을 사용해서 적는 이유
			컨텍스트 패스명이 동일하다면 괜찮지만 그렇지 않을 경우 원하는 주소값을 얻지 못할 수 있다.
			컨텍스트 패스명과 action 뒤 맨앞에 적힌 글씨가 동일하다면 같게 나오지만 그것이 아닐 경우
			URI 주소 : 컨텍스트 패스명 / action 뒤에 작성된 주소 로 나타날 수 있다.
		--%>
		<form action="<%= ctxPath%>/01_getMethod.do" method="get">
		<%-- !! 중요 !!
          확장자가 .jsp 또는 .html 인 파일에서 URL경로를 나타낼때 맨 앞에 / 가 오면
          그 앞에는  http://ip주소:포트번호 가 자동으로 붙게 된다.
          현재 <%= ctxPath%> 이  /JSPServletBegin_tomcat9 이므로 <%= ctxPath%>/01_getMethod.do 의 뜻은     
          http://localhost:9090/JSPServletBegin_tomcat9/01_getMethod.do 이라는 말이다.        
     	--%>
     	<%-- form 태그에서 submit(전송)을 하면
	       http://localhost:9090/JSPServletBegin/01_getMethod.do 으로 데이터를 전송시킨다.
	       만약에 method 를 생략하면 method="get" 으로 되어진다.
	       
	       GET방식은  웹브라우저 주소창에  http://URL주소?전송되어질데이터 와 같이 나타내주는 것이며 ,
	       ? 를 중심으로 왼쪽은 사이트 URL 주소이며, 오른쪽은 전송되어질데이터를 나타낸다.
	       전송되어질 데이터는 예를 들어 name=이순신&school=대졸 와 같이 나오는데 & 는 데이터구분자 역할을 해준다.
	       
	       GET방식은 웹브라우저 주소창에 데이터를 공개하므로 보안성이 떨어지지만 속도는 POST 방식보다 빠르다.
	       그래서 일반적으로 보안과 관계없는 데이터조회(예: 물품정보 조회)와 같은 select 절에서 주로 사용된다. 
       --%>
       <%-- 
	        submit 을 하면 <%= ctxPath%>/01_getMethod.do 로 보내어서 처리를 요청한다.
	        /JSPServletBegin_tomcat9/01_getMethod.do 은 누가 처리를 해주는지는 배치서술자인 web.xml 에 기술되어져 있어야 한다.
	       web.xml 에 가보면 <servlet-mapping>에 URL 패턴으로 /01_getMethod.do 가 기술되어져 있고,
	       이어서 실제로 처리를 해주는 <servlet-class>에 클래스명이 기술되어져 있다.
	       바로 이렇게 기술되어진 <servlet-class>클래스명이 action 일처리를 해주게 된다.
	           
	       !!! 아주 중요한 것은 web.xml은 언제 읽어들이는냐? 하면
	       WAS가 구동(start)되어질때 web.xml 파일에 기술된 내용을 딱 1번만 읽어들여서 web.xml 파일에 기술된 내용대로 WAS가 작동하도록 되어진다. 
	       그러므로 web.xml 파일에 내용을 추가하거나 삭제하는 등 변경되어지면 변경된 내용대로 작동하기 위해서는 반드시 WAS를 껐다가 켜야만 변경되어진 내용이 적용된다. !!!     
     --%>
			<fieldset>
            <legend>개인성향 테스트 01(GET method)</legend>
            <ul>
            <li>
               <label for="name">성명</label>
               <input type="text" name="name" id="name" placeholder="성명입력" required /> 
            </li>
            <li>
               <label>학력</label>
               <select name="school">
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
                   <input type="checkbox" name="food" id="food1" value="짜장면" />
                   
                   <label for="food2">짬뽕</label>
                   <input type="checkbox" name="food" id="food2" value="짬뽕" />
                   
                   <label for="food3">탕수육</label>
                   <input type="checkbox" name="food" id="food3" value="탕수육" />
                   
                   <label for="food4">양장피</label>
                   <input type="checkbox" name="food" id="food4" value="양장피" />
                   
                   <label for="food5">팔보채</label>
                   <input type="checkbox" name="food" id="food5" value="팔보채" />
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