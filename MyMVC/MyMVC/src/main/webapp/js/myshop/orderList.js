$(document).ready(function(){
	
	$("input#btnDeliverStart").click(function(){    // 배송하기 버튼 클릭시
        
        const chkDeliverStart_length = $("input:checkbox[class='chkDeliverStart custom_input']:checked").length;
        // 배송하기 체크박스에 체크가 되어진 개수
        // class 가 복합으로 이루어진 경우 class='chkDeliverStart custom_input' 와 같이 해야하지 class=chkDeliverStart 으로 하면 안된다.
        
        const chkDeliverEnd_length = $("input:checkbox[class='chkDeliverEnd custom_input']:checked").length;
        // 배송완료 체크박스에 체크가 되어진 개수
        // class 가 복합으로 이루어진 경우 class='chkDeliverEnd custom_input' 와 같이 해야하지 class=chkDeliverStart 으로 하면 안된다.
     
        if(chkDeliverStart_length == 0) {
           alert("먼저 하나이상의 배송을 시작할 제품을 선택하셔야 합니다.");
           return; // 종료 
        }
        
        if(chkDeliverEnd_length > 0) {
           alert("배송하기만 선택하셔야 합니다.");
           return; // 종료 
        }
        
        $("input.custom_input").prop("disabled", true); 
        // 배송하기 및 배송완료 관련 모든 input 태그 비활성화 시키기
        
        $("input:checkbox[class='chkDeliverStart custom_input']:checked").prop("disabled", false);
        // 체크되어진 배송하기 체크박스(제품번호값을 가지고 있음)만 활성화 시키기
        
        $("input:checkbox[class='chkDeliverStart custom_input']:checked").next().next().prop("disabled", false);
        // 체크되어진 배송하기의 주문코드(전표)만 활성화 시키기
        
        const frm = document.frmDeliver;
        frm.method = "post";
        frm.action = "admin/deliverStart.up";        // <%= ctxPath%>/shop/admin/deliverStart.up
        frm.submit();

    });// end of $("input#btnDeliverStart").click()------------------
     
     
    $("input#btnDeliverEnd").click(function(){      // 배송완료 버튼 클릭시
        
        const chkDeliverStart_length = $("input:checkbox[class='chkDeliverStart custom_input']:checked").length;
        // 배송하기 체크박스에 체크가 되어진 개수
        // class 가 복합으로 이루어진 경우 class='chkDeliverStart custom_input' 와 같이 해야하지 class=chkDeliverStart 으로 하면 안된다.
        
        const chkDeliverEnd_length = $("input:checkbox[class='chkDeliverEnd custom_input']:checked").length;
        // 배송완료 체크박스에 체크가 되어진 개수
        // class 가 복합으로 이루어진 경우 class='chkDeliverEnd custom_input' 와 같이 해야하지 class=chkDeliverStart 으로 하면 안된다.
     
        
        if(chkDeliverEnd_length == 0) {
           alert("먼저 하나이상의 배송을 완료할 제품을 선택하셔야 합니다.");
           return; // 종료 
        }
        
        if(chkDeliverStart_length > 0) {
           alert("배송완료만 선택하셔야 합니다.");
           return; // 종료 
        }
        
        $("input.custom_input").prop("disabled", true); 
        // 배송하기 및 배송완료 관련 모든 input 태그 비활성화 시키기
        
        $("input:checkbox[class='chkDeliverEnd custom_input']:checked").prop("disabled", false);
        // 체크되어진 배송완료 체크박스(제품번호값을 가지고 있음)만 활성화 시키기
        
        $("input:checkbox[class='chkDeliverEnd custom_input']:checked").next().next().prop("disabled", false);
        // 체크되어진 배송완료의 주문코드(전표)만 활성화 시키기
        
        const frm = document.frmDeliver;
        frm.method = "post";
        frm.action = "admin/deliverEnd.up";      // <%= ctxPath%>/shop/admin/deliverEnd.up
        frm.submit();   
        
    });// end of $("input#btnDeliverEnd").click()------------------
	
})// end of $(document).ready(function(){--------------

////////////////////////////////////////////////////////////////////////////////

// === Function Declaration === //
function openMember_Modal(odrcode){

    $.ajax({
        url:"odrcodeOwnerMemberInfoJSON.up",     // <%= ctxPath%>/shop/odrcodeOwnerMemberInfoJSON.up
        data:{"odrcode":odrcode},
        dataType:"json",
        success:function(json){

            // console.log(JSON.stringify(json));
            /*
                {"birthday":"1999-05-20","registerday":"2024-04-29","detailaddress":"개발팀","address":"경기 성남시 분당구 서판교로 32"
                ,"gender":"2","mobile":"01034392566","postcode":"13479","userid":"jjoung","point":14535,"extraaddress":" (판교동)"
                ,"name":"양혜정","email":"hemint@naver.com","coin":4742900}
            */
            let v_html = `<table id="personInfoTbl">
                            <tr>
                                <td class="title">▷ 아이디</td>
                                <td>${json.userid}</td>
                            </tr>
                     
                            <tr>
                                <td class="title">▷ 성명</td>
                                <td>${json.name}</td>
                            </tr>
                                    
                            <tr>
                                <td class="title">▷ 이메일</td>
                                <td>${json.email}</td>
                            </tr>
                            
                            <tr>
                                <td class="title">▷ 연락처</td>
                                <td>${json.mobile}</td>
                            </tr>
                            
                            <tr>
                                <td class="title">▷ 우편번호</td>
                                <td>${json.postcode}</td>
                            </tr>
                            
                            <tr>
                                <td class="title">▷ 주소</td>
                                <td>${json.address}<br>${json.detailaddress}&nbsp;${json.extraaddress}</td>
                            </tr>
                        </table>`;;

            $("div#odrcode_owner_modal-body").html(v_html);

        }
        , error: function(request, status, error){
            alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
        } 

    })  // end of $.ajax({--------------

}   // end of function openMember_Modal(odrcode){--------------------

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// === 전체 배송하기 체크 === //
function allCheckStart(){

    $("input.custom_input").prop("disabled", false); // 모든 배송하기 및 배송완료 input 태그 활성화 시키기
      
    const bool = $("input#allCheckDeliverStart").is(':checked');
    $("input.chkDeliverStart").prop('checked', bool);

 }// end of function allCheckBoxStart()------------
 
// === 전체 배송완료 체크 === // 
function allCheckEnd() {

    $("input.custom_input").prop("disabled", false); // 모든 배송하기 및 배송완료 input 태그 활성화 시키기
    
    const bool = $("input#allCheckDeliverEnd").is(':checked');
    $("input.chkDeliverEnd").prop('checked', bool);

}   // end of function allCheckEnd() {----------------------------