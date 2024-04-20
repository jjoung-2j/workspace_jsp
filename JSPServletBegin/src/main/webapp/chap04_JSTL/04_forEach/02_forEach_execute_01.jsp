<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="chap04.PersonDTO, java.util.*" %>
<%
	String[] arr_friend_name = {"김환진","이나영","이진욱","아이유","이준호","배인혁"};
	request.setAttribute("arr_friend_name", arr_friend_name);
	
	////////////////////////////////////////////////////////////////////////
	
	PersonDTO person_1 = new PersonDTO();
	person_1.setName("이순신");
	person_1.setSchool("대졸");
	person_1.setColor("red");
	person_1.setFood("김밥,라면,짜장면".split(","));
	
	PersonDTO person_2 = new PersonDTO();
	person_2.setName("엄정화");
	person_2.setSchool("대학원졸");
	person_2.setColor("blue");
	person_2.setFood("김밥,라면,냉모밀,제육볶음".split(","));
	
	PersonDTO person_3 = new PersonDTO();
	person_3.setName("홍길동");
	person_3.setSchool("초대졸");
	person_3.setColor("green");
	person_3.setFood("계란말이,빵,수제비,칼국수".split(","));
	
	PersonDTO person_4 = new PersonDTO();
	person_4.setName("유관순");
	person_4.setSchool("대졸");
	person_4.setColor("yellow");
	person_4.setFood("라면,공기밥,짜장면,한식뷔페".split(","));
	
	List<PersonDTO> person_List = new ArrayList<>();
	person_List.add(person_1);
	person_List.add(person_2);
	person_List.add(person_3);
	person_List.add(person_4);
	
	/////////////////////////////////////////////////////////
	
	request.setAttribute("person_List", person_List);
	// request.setAttribute("person_List", null);	// null 데이터가 없는 경우
	
	Map<String, String> paraMap_1 = new HashMap<>();
	
	paraMap_1.put("irum","김승진");
	paraMap_1.put("gender","남");
	paraMap_1.put("address","경기도 일산시");
	
	Map<String, String> paraMap_2 = new HashMap<>();
	
	paraMap_2.put("irum","이정연");
	paraMap_2.put("gender","남");
	paraMap_2.put("address","경기도 일산시");
	
	Map<String, String> paraMap_3 = new HashMap<>();
	
	paraMap_3.put("irum","이지윤");
	paraMap_3.put("gender","여");
	paraMap_3.put("address","인천광역시 부평구");
	
	List<Map<String,String>> student_List = new ArrayList<>();
	
	student_List.add(paraMap_1);
	student_List.add(paraMap_2);
	student_List.add(paraMap_3);
	
	request.setAttribute("student_List",student_List);
	
	//////////////////////////////////////////////////////////////////////////////////////////////
	
	RequestDispatcher dispatcher = request.getRequestDispatcher("02_forEach_Array_List_result_02.jsp");
	
	dispatcher.forward(request, response);
	
	
	
%>