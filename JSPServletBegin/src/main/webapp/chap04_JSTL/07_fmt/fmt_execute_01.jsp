<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
   String[] arr_point_1 = {"10","20.4","30.5","46"};
   request.setAttribute("arr_point_1", arr_point_1);
   
   String[] arr_point_2 = null;
   request.setAttribute("arr_point_2", arr_point_2);
   
   int[] arr_price = {50000, 100000, 250000, 150000, 2000000};
   request.setAttribute("arr_price", arr_price);   
   
   RequestDispatcher dispatcher = request.getRequestDispatcher("fmt_result_02.jsp"); 
    dispatcher.forward(request, response);
%>