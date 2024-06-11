<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
   String ctxPath = request.getContextPath();
    //     /MyMVC     
%>

<jsp:include page="../header1.jsp" />

<%-- 직접 만든 CSS --%>
<link rel="stylesheet" type="text/css" href="<%= ctxPath%>/css/myshop/storeLocation.css" />

<div id="ctxPath" style="display:none;"><%= ctxPath%></div>
<div id="title">매장지도</div>
<div id="map" style="width:90%; height:600px;"></div> <%-- 실제 지도가 보여질 자리 --%> 
<div id="latlngResult"></div>

<%-- 
   <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY(JavaScript 키)를 넣으시면 됩니다."></script> 
 --%>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=16695e6ff612a1dbaa353fda89e2424d"></script>

<%-- 직접 만든 JS --%>
<script type="text/javascript" src="<%= ctxPath%>/js/myshop/storeLocation.js"></script>

<jsp:include page="../footer1.jsp" />