<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

${requestScope.json}

<%--
	주석문을 써야 한다라면 반드시 JSP 주석문 형식으로 해야 한다.
	주석문을 <!-- --> 로 작성할 시 js 에서 text 를 
	JSON.parse(text) 에서 변환이 안되므로 오류가 발생한다.
--%>