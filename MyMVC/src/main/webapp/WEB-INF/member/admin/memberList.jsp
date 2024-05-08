<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%
	String ctxPath = request.getContextPath();
	// 	/MyMVC
%>

<%-- CSS 와 JS 적용을 위해 header 를 맨 위에 놓기 --%>
<jsp:include page="../../header2.jsp" />

<%-- 직접 만든 CSS --%>
<link rel="stylesheet" type="text/css" href="<%= ctxPath%>/css/member/admin.css" />
    
<%-- 직접 만든 JS --%>
<script type="text/javascript" src="<%= ctxPath%>/js/member/admin.js"></script>

<script type="text/javascript">
$(document).ready(function(){
	
	if("${requestScope.searchType}" != ""
			&& "${requestScope.searchWord}" != ""){		
	<%-- 
		[주의] 자바에서 문자열이여도 자바스크립트가 인식할 수 있게 "" 붙여주기!!
		붙이지 않을 경우 변수로 인식한다.
	--%>
		$("select[name='searchType']").val("${requestScope.searchType}");
		$("input:text[name='searchWord']").val("${requestScope.searchWord}");
		
	}
	
	if("${requestScope.sizePerPage}" != ""){		

		$("select[name='sizePerPage']").val("${requestScope.sizePerPage}");
	
	}
	
})	// end of $(document).ready(function(){}-----------------
</script>

<div class="container" style="padding: 3% 0; border:solid 1px red;">
   <h2 class="text-center mb-5">::: 회원전체 목록 :::</h2>
   <%--
   <button onclick="reflesh()" class="p-5 mx-5">
   		<h2 class="text-center">::: 회원전체 목록 :::</h2>
   </button>
   --%>
   <form name="member_search_frm">
      <select name="searchType" >
         <option value="">검색대상</option>
         <option value="name">회원명</option>
         <option value="userid">아이디</option>
         <option value="email">이메일</option>
      </select>
      &nbsp;
      <input type="text" name="searchWord" />
      <%--
             form 태그내에서 데이터를 전송해야 할 input 태그가 만약에 1개 밖에 없을 경우에는
             input 태그내에 값을 넣고나서 그냥 엔터를 해버리면 submit 되어져 버린다.
             그래서 유효성 검사를 거친후 submit 을 하고 싶어도 input 태그가 만약에 1개 밖에 없을 경우라면 
             유효성검사가 있더라도 유효성검사를 거치지 않고 바로 submit 되어진다. 
             이것을 막으려면 input 태그가 2개 이상 존재하면 된다.  
             그런데 실제 화면에 보여질 input 태그는 1개 이어야 한다.
             이럴 경우 아래와 같이 해주면 된다. 
             또한 form 태그에 action 이 명기되지 않았으면 현재보이는 URL 경로로 submit 되어진다.   
        --%>
      <input type="text" style="display: none;" /> <%-- 조심할 것은 type="hidden" 이 아니다. --%> 
      <%-- 
      <input type="text" />
      	form 태그 내에서
      	input 태그가 하나일 경우 무조건 submit 이 되지만 두개일 경우는 submit 되지 않는다.
      	URL 변동이 없다.
      	하나일 경우 유효성 검사를 거치지 않고 submit 이 된다.
      	[주의] <input type="hidden" /> 을 하지말고, <input type="text" style="display: none;" /> 이렇게 해주어야 한다.
      --%>
      <button type="button" class="btn btn-secondary" onclick="goSearch()">검색</button>
      
      <span style="font-size: 12pt; font-weight: bold;">페이지당 회원명수&nbsp;-&nbsp;</span>
      <select name="sizePerPage">
         <option value="10">10명</option>
         <option value="5">5명</option>
         <option value="3">3명</option>      
      </select>
   </form>
   
   <table class="table table-bordered" id="memberTbl">
      <thead>
          <tr>
             <th>번호</th>
             <th>아이디</th>
             <th>회원명</th>
             <th>이메일</th>
             <th>성별</th>
          </tr>
      </thead>
      
      <tbody>
          <c:if test="${not empty requestScope.memberList}">
          	<c:forEach var="membervo" items="${requestScope.memberList}" varStatus="status" >
          		<tr>
          			<fmt:parseNumber var="currentShowPageNo" value="${equestScope.currentShowPageNo}" />
          			<fmt:parseNumber var="sizePerPage" value="${equestScope.sizePerPage}" />
          			<%-- fmt:parseNumber 은 문자열을 숫자형식으로 형변환 시키는 것이다. --%>
          			<td>${requestScope.totalMemberCount - (currentShowPageNo - 1) * sizePerPage - (status.index)} </td>
          			<%-- 
          				>>> 페이징 처리시 보여주는 순번 공식 <<<
	                     데이터개수 - (페이지번호 - 1) * 1페이지당보여줄개수 - 인덱스번호 => 순번 
	                  
	                     <예제>
	                     데이터개수 : 12
	                     1페이지당보여줄개수 : 5
	                  
	                     ==> 1 페이지       
	                     12 - (1-1) * 5 - 0  => 12
	                     12 - (1-1) * 5 - 1  => 11
	                     12 - (1-1) * 5 - 2  => 10
	                     12 - (1-1) * 5 - 3  =>  9
	                     12 - (1-1) * 5 - 4  =>  8
	                  
	                     ==> 2 페이지
	                     12 - (2-1) * 5 - 0  =>  7
	                     12 - (2-1) * 5 - 1  =>  6
	                     12 - (2-1) * 5 - 2  =>  5
	                     12 - (2-1) * 5 - 3  =>  4
	                     12 - (2-1) * 5 - 4  =>  3
	                  
	                     ==> 3 페이지
	                     12 - (3-1) * 5 - 0  =>  2
	                     12 - (3-1) * 5 - 1  =>  1 
                 	--%>
          			<td>${membervo.userid}</td>		<%-- get 다음 ~~ 에 오는 것을 . 뒤에 놓기 --%>
          			<td>${membervo.name}</td>
          			<td>${membervo.email}</td>
          			<td>
          				<c:choose>
          					<c:when test="${membervo.gender == '1'}">
          						남
          					</c:when>
          					<c:otherwise>
          						여
          					</c:otherwise>
          				</c:choose> 
          			</td>
          		</tr>
          	</c:forEach>
          </c:if>
          <c:if test="${empty requestScope.memberList}">
          	<tr>
          		<td colspan="5">데이터가 존재하지 않습니다.</td>
          	</tr>
          </c:if>
      </tbody>
   </table>     

    <div id="pageBar">
       <nav>
          
       </nav>
    </div>
</div>
<jsp:include page="../../footer2.jsp" />