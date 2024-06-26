<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%-- ==== JSTL(JSP Standard Tag Library) 사용하기 ==== --%>     
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>  

<%--
     fmt 태그는 Formatting 태그로 포맷에 관련된 태그입니다.
     참조사이트  https://sinna94.tistory.com/11
--%>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>문자열로 되어진 숫자를 누적한 결과값(자동형변환, 형변환) 나타내기 및 정수로 되어진 데이터를 세자리마다 콤마를 찍어서 나타내어주기</title>
</head>
<body>
	<h2>문자열로 되어진 숫자를 누적한 결과값(자동형변환) 나타내기(JSTL을 사용한것)</h2>
   
   <c:set var="sum" value="0" />
   <c:if test="${not empty requestScope.arr_point_1}">
       <ul>
          <c:forEach var="point" items="${requestScope.arr_point_1}">
             <li>${point}</li>
             <c:set var="sum" value="${sum + point}" />
          </c:forEach>
       </ul>
       arr_point_1 누적의 합계 : ${sum}
   </c:if>
   
   <br><br>
   
<%-- ////////////////////////////////////////////////////////////////////////////////////// --%>
   
   <hr style="border: solid 1px orange;">
   <br>
   
   <h2>문자열로 되어진 숫자를 정수로 형변환하여 누적한 결과값 나타내기(JSTL을 사용한것)</h2>
   
   <c:set var="sum" value="0" />
   <c:if test="${not empty requestScope.arr_point_1}">
       <ul style="list-style-type: circle;">
          <c:forEach var="point" items="${requestScope.arr_point_1}">
             <li>
                <fmt:parseNumber var="pointInt" value="${point}" integerOnly="true" />  
                <%-- fmt:parseNumber 은 문자열을 숫자형식으로 형변환 시키는 것이다.
                 integerOnly="true" 은 소수점은 절삭해버리고 정수만 취해오는 것이다.
                 정수만 취해온 값을 변수 pointInt 에 넣어줌.
             --%>
                ${pointInt}  
             </li>
             <c:set var="sum" value="${sum + pointInt}" />
          </c:forEach>
       </ul>
       arr_point_1 을 실수를 절삭하여 정수만 취해온 누적의 합계 : ${sum}
   </c:if>
   <br><br>
   
<%-- /////////////////////////////////////////////////////////////////////////////////// --%>
   
   <hr style="border: solid 1px blue;">
   <br>
   
   <h2>정수로 되어진 데이터를 세자리 마다 콤마를 찍어서 나타내어 주기(JSTL을 사용한 것)</h2>

   <c:set var="sum" value="0" />
   <c:if test="${not empty requestScope.arr_price}">
       <ul>
          <c:forEach var="price" items="${requestScope.arr_price}">
             <li>${price}</li>
             <c:set var="sum" value="${sum + price}" />
          </c:forEach>
       </ul>
       arr_price 누적의 합계 : ${sum}
   </c:if>
   
   <br><br>
   
   <c:set var="sum" value="0" />
   <c:if test="${not empty requestScope.arr_price}">
       <ul>
          <c:forEach var="price" items="${requestScope.arr_price}">
             <li><fmt:formatNumber value="${price}" pattern = "#,###" /></li>
             <c:set var="sum" value="${sum + price}" />
          </c:forEach>
       </ul>
       arr_price 누적의 합계 : <fmt:formatNumber value="${sum}" pattern = "#,###" />
   </c:if>
</body>
</html>