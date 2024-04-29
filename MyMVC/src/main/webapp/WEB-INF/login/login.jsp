<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%-- 3자리마다 콤마(,) 찍어주기 => fmt --%>

<%
	
    String ctx_Path = request.getContextPath();
    //    /MyMVC
    // 반드시 변수명을 다르게 지정해주어야 한다. 같을 시 중복 될 수 있다.
%>

<%-- 직접 만든 CSS --%>
<link rel="stylesheet" type="text/css" href="<%= ctx_Path%>/css/login/login.css" />
<%-- 직접 만든 JS --%>
<script type="text/javascript" src="<%= ctx_Path%>/js/login/login.js"></script>

<%-- === 로그인을 하기 위한 폼을 생성 === --%>
<c:if test="${sessionScope.login_user == null}">
<%-- 또는
	<c:if test="${empty sessionScope.login_user}">
 --%>
	<form name="loginFrm" action="<%= ctx_Path%>/login/login.up" method="post">
      <table id="loginTbl">
          <thead>
              <tr>
                 <th colspan="2">LOGIN</th>
              </tr>
          </thead>
          
          <tbody>
              <tr>
                  <td>ID</td>
                  <td><input type="text" name="userid" id="loginUserid" size="20" autocomplete="off" /></td>
              </tr>
              <tr>
                  <td>암호</td>
                  <td><input type="password" name="pwd" id="loginPwd" size="20" /></td>
              </tr>
              
              <%-- ==== 아이디 찾기, 비밀번호 찾기 ==== --%>
              <tr>
                  <td colspan="2">
                     <a style="cursor: pointer;" data-toggle="modal" data-target="#userIdfind" data-dismiss="modal">아이디찾기</a> / 
                     <a style="cursor: pointer;" data-toggle="modal" data-target="#passwdFind" data-dismiss="modal" data-backdrop="static">비밀번호찾기</a>
                  </td>
              </tr>
              
              <tr>
                  <td colspan="2">
                     <input type="checkbox" id="saveid" />&nbsp;<label for="saveid">아이디저장</label> 
                     <button type="button" id="btnSubmit" class="btn btn-primary btn-sm ml-3">로그인</button> 
                  </td>
              </tr>
          </tbody>
      </table>
   </form>
</c:if>

<%-- ========================== 로그인 성공한 경우 ========================== --%>
<c:if test="${not empty sessionScope.login_user}">
	<table style="width: 95%; height: 130px; margin: 0 auto;">
       <tr style="background-color: #f2f2f2;">
           <td style="text-align: center; padding: 20px;">
               <span style="color: blue; font-weight: bold;">${(sessionScope.login_user).name}</span> 
               [<span style="color: red; font-weight: bold;">${(sessionScope.login_user).userid}</span>]님 
               <br><br>
               <div style="text-align: left; line-height: 150%; padding-left: 20px;">
                  <span style="font-weight: bold;">코인액&nbsp;:</span>&nbsp;&nbsp; <fmt:formatNumber value="${(sessionScope.login_user).coin}" pattern="###,###" /> 원
                  <br>
                  <span style="font-weight: bold;">포인트&nbsp;:</span>&nbsp;&nbsp; <fmt:formatNumber value="${(sessionScope.login_user).point}" pattern="###,###" /> POINT  
               </div>
               <br>로그인 중...<br><br>
               [<a href="javascript:goEditMyInfo('${(sessionScope.login_user).userid}','<%= ctx_Path%>')">나의정보</a>]&nbsp;&nbsp;
               [<a href="javascript:goCoinPurchaseTypeChoice('${(sessionScope.login_user).userid}','<%= ctx_Path%>')">코인충전</a>]
               <br><br>
               <button type="button" class="btn btn-danger btn-sm" onclick="javascript:goLogOut('<%= ctx_Path%>')">로그아웃</button>
               <%-- 
               		javascript: 는 적든 안적든 상관없다. 
               		<%= ctx_Path%> 양 옆에 '' 또는 "" 를 붙여주어야 한다
               --%>
           </td>
       </tr>
   </table>
</c:if>
 
