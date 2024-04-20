<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	String friend_name_1 = "김환진,이나영,이진욱,아이유,이준호,배인혁";
	String friend_name_2 = "이순신,엄정화.홍길동/유관순,차은우";
	
	request.setAttribute("friend_name_1", friend_name_1);
	request.setAttribute("friend_name_2", friend_name_2);
	
	//////////////////////////////////////////////////////////////////////////////////////////////
	
	RequestDispatcher dispatcher = request.getRequestDispatcher("forTokens_result_02.jsp");
	
	dispatcher.forward(request, response);
	
	
	
%>