<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%
   String ctxPath = request.getContextPath();
    //     /MyMVC     
%>
<jsp:include page="../header1.jsp" />

<%-- 직접 만든 CSS --%>
<link rel="stylesheet" type="text/css" href="<%= ctxPath%>/css/myshop/orderList.css" />

<%-- 직접 만든 JS --%>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/myshop/categoryListJSON.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/myshop/orderList.js"></script>

<div class="container-fluid" style="border: solid 0px red">
	<div class="my-3">
    	<c:set var="userid" value="${(sessionScope.login_user).userid}" />
      		<c:if test='${userid eq "admin"}'>
         		<p class="h4 text-center">&raquo;&nbsp;&nbsp;주문내역 전체목록&nbsp;&nbsp;&laquo;</p>
      		</c:if>
      		<c:if test='${userid ne "admin"}'>
         		<p class="h4 text-center">&raquo;&nbsp;&nbsp;${(sessionScope.login_user).name} 님[ ${userid} ] 주문내역 목록&nbsp;&nbsp;&laquo;</p>   
      		</c:if>
   </div>
   
   <div>
      	<form name="frmDeliver">
         	<table id="tblorder_map_List" style="width: 95%;">
           		<c:if test='${userid eq "admin"}'>
            		<tr>   
               			<th colspan="7" style="text-align: right; border: none;"> 
			            	<input type="checkbox" id="allCheckDeliverStart" onclick="allCheckStart()">&nbsp;<label for="allCheckDeliverStart"><span style="color: green; font-weight: bold; font-size: 9pt;">전체선택(배송하기)</span></label>&nbsp;
			                <input type="button" name="btnDeliverStart" id="btnDeliverStart" value="배송하기" class="btn btn-outline-success btn-sm mr-3" />
                  
			                <input type="checkbox" id="allCheckDeliverEnd" onclick="allCheckEnd()">&nbsp;<label for="allCheckDeliverEnd"><span style="color: red; font-weight: bold; font-size: 9pt;">전체선택(배송완료)</span></label>&nbsp;
			                <input type="button" name="btnDeliverEnd" id="btnDeliverEnd" value="배송완료" class="btn btn-outline-danger btn-sm" />
               			</th>
            		</tr>
           		</c:if>
               
             	<tr bgcolor="#cfcfcf">
	               	<th width="8%" style="text-align: center;">번호</th>
	               	<th width="12%" style="text-align: center;">주문코드(전표)</th>
	               	<th width="10%" style="text-align: center;">주문일자</th>
	               	<th width="36%" style="text-align: center;">제품정보</th> <%-- 제품번호,제품명,제품이미지1,판매정가,판매세일가,포인트 --%> 
	               	<th width="7%"  style="text-align: center;">주문수량</th>
	               	<th width="10%" style="text-align: center;">주문총액</th>   
	               	<th width="7%"  style="text-align: center;">총포인트</th>
	               	<th width="10%" style="text-align: center;">배송상태</th>
             	</tr>
            	<c:if test="${empty requestScope.order_map_List}" > 
              		<tr>
                 		<td colspan="8" align="center">
                 			<span style="color: red; font-weight: bold;">주문내역이 없습니다.</span>
             			</td>
             		</tr>
            	</c:if>
         
            <%-- ============================================ --%>
            	<c:if test="${not empty requestScope.order_map_List}">
               		<c:forEach var="odrmap" items="${requestScope.order_map_List}" varStatus="status">
                  <%--
                      varStatus 는 반복문의 상태정보를 알려주는 애트리뷰트이다.
                      status.index : 0 부터 시작한다.
                      status.count : 반복문 횟수를 알려주는 것이다.
                   --%>
                  		<tr>
                  			<%-- fmt:parseNumber 은 문자열을 숫자형식으로 형변환 시키는 것이다. --%>
                  			<fmt:parseNumber var="currentShowPageNo" value="${requestScope.currentShowPageNo}" />
                         	<td align="center">
                         		${ (requestScope.totalCountOrder) - (currentShowPageNo -1) * (requestScope.sizePerPage) - (status.index) }
                         		<%-- >>> 페이징 처리시 보여주는 순번 공식 <<<
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
                         	</td>
                         	<td align="center"> 
	                         	<%-- 
	                         		주문코드(전표) 출력하기. 
		                           	만약에 관리자로 들어와서 주문내역을 볼 경우 해당 주문코드(전표)를 클릭하면 
		                           	주문코드(전표)를 소유한 회원정보를 조회하도록 한다.  
		                        --%>
                     			<c:if test="${userid eq 'admin'}">
                     				<%-- 주문코드(전표) 소유주를 모달로 띄우기 --%>
                     				<span style="cursor: pointer" data-toggle="modal" data-target="#odrcode_owner_modal_view" data-dismiss="modal" onclick="openMember_Modal('${odrmap.ODRCODE}')">${odrmap.ODRCODE}</span>
                     			</c:if>
                     	
                     			<c:if test="${userid ne 'admin'}">
                     				<span>${odrmap.ODRCODE}</span>
                     			</c:if>
                     		</td>
                     
                     		<td align="center"> <%-- 주문일자 --%>
                        		${odrmap.ODRDATE}
                     		</td>
                     
		                    <td>  <%-- === 제품정보 넣기 === --%>
		                        <div style="display: flex; padding-top: 10px; justify-content: space-between;">
	                            <%-- 
	                            	flex 아이템들은 width의 기본값은 내용물 만큼 잡히고 height 값들은 동일하게 설정되어 inline 형태로 보여진다.
	                                justify-content: space-between; 은 flex 아이템들 사이에 간격을 균일하게 만들어 주는 것이다.
	                                이것이 없으면  flex 아이템들은 간격없이 죽~~붙어서 나오게 된다. 
	                            --%>
                            	</div>
                            	<div style="width: 44%;">
                            		<img src="<%= ctxPath%>/images/${odrmap.PIMAGE1}" width="100%"/>	<%-- 제품이미지1 --%>
                            	</div>
                            	<div style="width: 54%;">
                            		<ul class="list-unstyled">
                                  		<li>제품번호 : ${odrmap.FK_PNUM}</li> <%-- 제품번호 --%>
                                  		<li>제품명 : ${odrmap.PNAME}</li>    <%-- 제품명 --%> 
                                  		<li>정&nbsp;가 : <%-- 제품개당 판매정가 --%> 
                                  			<span style="text-decoration: line-through;">
                                  				<fmt:formatNumber value="${odrmap.PRICE}" pattern="###,###" />
                                  			</span> 원
                                  		</li>   
                                  		<li>판매가 : 	<%-- 제품개당 판매세일가 --%>
                                  			<span class="text-danger font-weight-bold">
                                  				<fmt:formatNumber value="${odrmap.SALEPRICE}" pattern="###,###" />
                                  			</span> 원
                                  		</li> 
                                  		<li>포인트 : 	<%-- 제품개당 포인트 --%>
                                  			<span class="text-danger font-weight-bold">
                                  				<fmt:formatNumber value="${odrmap.POINT}" pattern="###,###" />
                                  			</span> POINT
                                  		</li>  
                               		</ul>
                           		</div>
		                   	</td>
		                     
		                    <td align="center">    
		                    	<%-- 수량 --%>
		                        ${odrmap.OQTY} 개
		                    </td>
		                     
		                    <td align="center">
		                    	<%-- 금액 --%>
		                    	<c:set var="su" value="${odrmap.OQTY}" />
		                    	<c:set var="danga" value="${odrmap.SALEPRICE}" />
		                    	<c:set var="totalmoney" value="${su * danga}" />
		                    	<fmt:formatNumber value="${totalmoney}" pattern="###,###" /> 원
		                    </td>
		                     
		                    <td align="center">
		                    	<%-- 포인트 --%>
		                        <c:set var="point" value="${odrmap.POINT}" />
                          		<c:set var="totalpoint" value="${su * point}" />
                         		<fmt:formatNumber value="${totalpoint}" pattern="###,###" /> P
		                    </td>
		                     
		                    <td align="center">
		                    	<%-- 배송상태 --%>
		                        <c:if test="${userid ne 'admin'}">
                     				<c:choose>
                     					<c:when test="${odrmap.DELIVERSTATUS == '주문완료'}">
                     						<span style="color: blue; font-weight: bold; font-size: 12pt;">주문완료</span><br>
                     					</c:when>
                     					<c:when test="${odrmap.DELIVERSTATUS == '배송중'}">
                     						<span style="color: green; font-weight: bold; font-size: 12pt;">배송중</span><br>
                     					</c:when>
                     					<c:when test="${odrmap.DELIVERSTATUS == '배송완료'}">
                     						<span style="color: red; font-weight: bold; font-size: 12pt;">배송완료</span><br>
                     					</c:when>
                     				</c:choose>
                     			</c:if>
                     	
                     			<c:if test="${userid eq 'admin'}">
                     				<c:if test="${odrmap.DELIVERSTATUS == '주문완료'}">
                              			<input type="checkbox" class="chkDeliverStart custom_input" name="pnum" id="chkDeliverStart${status.index}" value="${odrmap.FK_PNUM}">&nbsp;
                              			<label for="chkDeliverStart${status.index}">배송하기</label> 
                         				<%-- type="text" / type="hidden" 해서 확인하기 --%>
                               			<input type="hidden" class="odrcodeDeliverStart custom_input" name="odrcode" value="${odrmap.ODRCODE}" />  
                           			</c:if>
                           			<br>
                           			<c:if test="${odrmap.DELIVERSTATUS == '주문완료' or odrmap.DELIVERSTATUS == '배송중'}">
                              			<input type="checkbox" class="chkDeliverEnd custom_input" name="pnum" id="chkDeliverEnd${status.index}" value="${odrmap.FK_PNUM}">&nbsp;
                              			<label for="chkDeliverEnd${status.index}">배송완료</label>
                          				<%-- type="text" / type="hidden" 해서 확인하기 --%>
                               			<input type="hidden" class="odrcodeDeliverEnd custom_input" name="odrcode" value="${odrmap.ODRCODE}" /> 
                           			</c:if>
                     			</c:if>
		                    </td>
                  		</tr>
                   </c:forEach>
               </c:if>
         </table>
      </form>  
   </div> 
    
   <%-- === 페이지바 === --%>
   <nav class="my-5">
       	<div style='display:flex; width:80%; margin: 0 auto;'>
       		<ul class="pagination" style='margin:auto;'>${requestScope.pageBar}</ul>
        </div>
   </nav> 
 
</div>

<%-- ****** 주문코드(전표) 소유주 보여주기 Modal 시작 ****** --%>
<div class="modal fade" id="odrcode_owner_modal_view"> <%-- 만약에 모달이 안보이거나 뒤로 가버릴 경우에는 모달의 class 에서 fade 를 뺀 class="modal" 로 하고서 해당 모달의 css 에서 zindex 값을 1050; 으로 주면 된다. --%> 
	<div class="modal-dialog modal-lg">
    	<div class="modal-content">
      
	        <!-- Modal header -->
	        <div class="modal-header">
	        	<h4 class="modal-title">주문자 정보 보기</h4>
	          	<button type="button" class="close idFindClose" data-dismiss="modal">&times;</button>
	        </div>
	        
	        <!-- Modal body -->
	        <div class="modal-body" id="odrcode_owner_modal-body">
	        </div>
	        
	        <!-- Modal footer -->
	        <div class="modal-footer">
	        	<button type="button" class="btn btn-danger idFindClose" data-dismiss="modal">Close</button>
	        </div>
		</div>
	</div>
</div>
<%-- ****** 주문코드(전표) 소유주 보여주기 Modal 끝 ****** --%>

<jsp:include page="../footer1.jsp" />