<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>오늘의 메뉴</title>
<link rel="stylesheet" type="text/css" href="css/04.css" />
</head>
<body>
	<h3>오늘의 메뉴</h3>
   	<ol>
      <li>햄버거 5,000원</li>
      <li>짜장면 5,000원</li>
      <li>짬뽕   6,000원</li>
      <li>팔보채 8,000원</li>
   	</ol>
   	
   	<p id="today">
   		현재시각 : <%@ include file="04_01_todayTime.jsp"%>
   		<%-- 
   			include directive(지시어)인 <%@ include  %> 을 사용하여
         	04_01_todayTime.jsp 파일의 내용을 불러와서 넣어주는 것이다.
     	--%>
   	</p>
</body>
</html>