
// "아이디 중복확인" 을 클릭했는지 클릭을 안했는지 여부를 알아오기 위한 용도
let b_idcheck_click = false;

// "이메일 중복확인" 를 클릭했는지 클릭을 안했는지 여부를 알아오기 위한 용도
let b_emailcheck_click = false;

// "우편번호찾기" 를 클릭했는지 클릭을 안했는지 여부를 알아오기 위한 용도
let b_zipcodeSearch_click = false;

$(document).ready(function(){
	
	$("span.error").hide();

    $("input[name='name']").focus();

    // === event ' blur' => 포커스를 잃어버린경우(다른곳 클릭 또는 탭) === //
    // $("input#name").bind("blur", function(e){ alert("name에 있던 포커스를 잃어버렸습니다."); });
    // 또는
    // $("input#name").blur(function(e){ alert("name에 있던 포커스를 잃어버렸습니다."); });

    $("input#name").blur(e => {
        const name = $(e.target).val().trim();
        if(name == ""){     // 입력하지 않거나 공백만 입력했을 경우
            
            $("table#tblMemberRegister :input").prop('disabled',true);  // 아무것도 작성하지 않고 포커스 잃을 때만 비활성화 된다. 하나라도 작성할 시 비활성화 되지 않는다.
            // 모든 input 태그 비활성화
        /*   
            >>>> .prop() 와 .attr() 의 차이 <<<<            
                .prop() ==> form 태그내에 사용되어지는 엘리먼트의 disabled, selected, checked 의 속성값 확인 또는 변경하는 경우에 사용함. 
                .attr() ==> 그 나머지 엘리먼트의 속성값 확인 또는 변경하는 경우에 사용함.
        */
            $(e.target).prop("disabled",false);
            $(e.target).val("").focus();
            
        //  $(e.target).next().show();
            // 또는
            $(e.target).parent().find("span.error").show();

        }
        else{   // 공백이 아닌 글자를 입력했을 경우

            // 모든 input 태그 비활성화 풀기
            $("table#tblMemberRegister :input").prop('disabled',false);

         //  $(e.target).next().hide();
            // 또는
            $(e.target).parent().find("span.error").hide();   
            
            // [보류] 바깥에 입력한 경우
        //  $(e.target).parent().parent().next().find("td input#userid").focus();

        }   // end of if~else----------------

        // 아이디가 name 인 것은 포커스를 잃어버렸을 경우(blur) 이벤트를 처리해주는 것이다.

    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // 아이디가 userid 인 것은 포커스를 잃어버렸을 경우(blur) 이벤트를 처리해주는 것이다.
    $("input#userid").blur(e => {
        const userid = $(e.target).val().trim();
        if(userid == ""){     // 입력하지 않거나 공백만 입력했을 경우
            
            $("table#tblMemberRegister :input").prop('disabled',true);  // 아무것도 작성하지 않고 포커스 잃을 때만 비활성화 된다. 하나라도 작성할 시 비활성화 되지 않는다.
            // 모든 input 태그 비활성화
        /*   
            >>>> .prop() 와 .attr() 의 차이 <<<<            
                .prop() ==> form 태그내에 사용되어지는 엘리먼트의 disabled, selected, checked 의 속성값 확인 또는 변경하는 경우에 사용함. 
                .attr() ==> 그 나머지 엘리먼트의 속성값 확인 또는 변경하는 경우에 사용함.
        */
            $(e.target).prop("disabled",false);
            $(e.target).val("").focus();
            
        //  $(e.target).next().show();
            // 또는
            $(e.target).parent().find("span.error").show();

        }
        else{   // 공백이 아닌 글자를 입력했을 경우

            // 모든 input 태그 비활성화 풀기
            $("table#tblMemberRegister :input").prop('disabled',false);

         //  $(e.target).next().hide();
            // 또는
            $(e.target).parent().find("span.error").hide(); 
            
            // [보류] 바깥에 입력한 경우
        //  $(e.target).parent().parent().next().find("td input#pwd").focus();

        }   // end of if~else----------------
        
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // === 아이디가 pwd 인 것은 포커스를 잃어버렸을 경우(blur) 이벤트를 처리해주는 것이다. === //
    $("input#pwd").blur(e => {

        // 숫자/문자/특수문자 포함 형태의 8~15자리 이내의 암호 정규표현식 객체 생성
        // const regExp_pwd = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$/g;
        // 또는
        const regExp_pwd = new RegExp(/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$/g);

        const bool = regExp_pwd.test($(e.target).val());

        if(!bool){     // 암호가 정규표현식에 위배된 경우
            
            $("table#tblMemberRegister :input").prop('disabled',true);  // 아무것도 작성하지 않고 포커스 잃을 때만 비활성화 된다. 하나라도 작성할 시 비활성화 되지 않는다.
            // 모든 input 태그 비활성화
        /*   
            >>>> .prop() 와 .attr() 의 차이 <<<<            
                .prop() ==> form 태그내에 사용되어지는 엘리먼트의 disabled, selected, checked 의 속성값 확인 또는 변경하는 경우에 사용함. 
                .attr() ==> 그 나머지 엘리먼트의 속성값 확인 또는 변경하는 경우에 사용함.
        */
            $(e.target).prop("disabled",false);
            $(e.target).val("").focus();
            
        //  $(e.target).next().show();
            // 또는
            $(e.target).parent().find("span.error").show();

        }
        else{   // 암호가 정규표현식에 맞는 경우

            // 모든 input 태그 비활성화 풀기
            $("table#tblMemberRegister :input").prop('disabled',false);

         //  $(e.target).next().hide();
            // 또는
            $(e.target).parent().find("span.error").hide();

        }   // end of if~else----------------
        
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // === 아이디가 pwdcheck 인 것은 포커스를 잃어버렸을 경우(blur) 이벤트를 처리해주는 것이다. === //
    $("input#pwdcheck").blur(e => {

        if($("input#pwd").val() != $(e.target).val()){     // 암호와 암호확인값이 틀린 경우
            
            $("table#tblMemberRegister :input").prop('disabled',true);  // 아무것도 작성하지 않고 포커스 잃을 때만 비활성화 된다. 하나라도 작성할 시 비활성화 되지 않는다.
            // 모든 input 태그 비활성화
        /*   
            >>>> .prop() 와 .attr() 의 차이 <<<<            
                .prop() ==> form 태그내에 사용되어지는 엘리먼트의 disabled, selected, checked 의 속성값 확인 또는 변경하는 경우에 사용함. 
                .attr() ==> 그 나머지 엘리먼트의 속성값 확인 또는 변경하는 경우에 사용함.
        */
            $(e.target).prop("disabled",false);
            $("input#pwd").prop("disabled",false);
            $(e.target).val("");
            $("input#pwd").val("").focus();
            
        //  $(e.target).next().show();
            // 또는
            $(e.target).parent().find("span.error").show();

        }
        else{   // 암호가 정규표현식에 맞는 경우

            // 모든 input 태그 비활성화 풀기
            $("table#tblMemberRegister :input").prop('disabled',false);

         //  $(e.target).next().hide();
            // 또는
            $(e.target).parent().find("span.error").hide(); 
            
        }   // end of if~else----------------
        
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // === 아이디가 email 인 것은 포커스를 잃어버렸을 경우(blur) 이벤트를 처리해주는 것이다. === //
    $("input#email").blur(e => {

        // 이메일 정규표현식 객체 생성 
        // const regExp_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;  
        // 또는
        const regExp_email = new RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);  

        const bool = regExp_email.test($(e.target).val());

        if(!bool){     // 이메일이 정규표현식에 위배된 경우
            
            $("table#tblMemberRegister :input").prop('disabled',true);  // 아무것도 작성하지 않고 포커스 잃을 때만 비활성화 된다. 하나라도 작성할 시 비활성화 되지 않는다.
            // 모든 input 태그 비활성화
        /*   
            >>>> .prop() 와 .attr() 의 차이 <<<<            
                .prop() ==> form 태그내에 사용되어지는 엘리먼트의 disabled, selected, checked 의 속성값 확인 또는 변경하는 경우에 사용함. 
                .attr() ==> 그 나머지 엘리먼트의 속성값 확인 또는 변경하는 경우에 사용함.
        */
            $(e.target).prop("disabled",false);
            $(e.target).val("").focus();
            
        //  $(e.target).next().show();
            // 또는
            $(e.target).parent().find("span.error").show();

        }
        else{   // 이메일이 정규표현식에 맞는 경우

            // 모든 input 태그 비활성화 풀기
            $("table#tblMemberRegister :input").prop('disabled',false);

         //  $(e.target).next().hide();
            // 또는
            $(e.target).parent().find("span.error").hide();    

        }   // end of if~else----------------
        
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 아이디가 hp2 인 것은 포커스를 잃어버렸을 경우(blur) 이벤트를 처리해주는 것이다.
    $("input#hp2").blur( (e) => {
      
        //   const regExp_hp2 = /^[1-9][0-9]{3}$/;  
        //  또는
        const regExp_hp2 = new RegExp(/^[1-9][0-9]{3}$/);  
        // 연락처 국번( 숫자 4자리인데 첫번째 숫자는 1-9 이고 나머지는 0-9) 정규표현식 객체 생성 
        
        const bool = regExp_hp2.test($(e.target).val());   
        
        if(!bool) {
            // 연락처 국번이 정규표현식에 위배된 경우 
            
            $("table#tblMemberRegister :input").prop("disabled", true);  
            $(e.target).prop("disabled", false); 
            
        //   $(e.target).next().next().show();
        //  또는
            $(e.target).parent().find("span.error").show();
                
            $(e.target).val("").focus(); 
        }
        else {
            // 연락처 국번이 정규표현식에 맞는 경우 
            $("table#tblMemberRegister :input").prop("disabled", false);
            
            //   $(e.target).next().next().hide();
            //  또는
            $(e.target).parent().find("span.error").hide();
        }
           
    });
        
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 아이디가 hp3 인 것은 포커스를 잃어버렸을 경우(blur) 이벤트를 처리해주는 것이다.
    $("input#hp3").blur( (e) => {
        
        //   const regExp_hp3 = /^[0-9]{4}$/;  
        //  또는
        //   const regExp_hp3 = /^\d{4}$/;
        const regExp_hp3 = new RegExp(/^\d{4}$/);  
        // 숫자 4자리만 들어오도록 검사해주는 정규표현식 객체 생성 
        
        const bool = regExp_hp3.test($(e.target).val());   
        
        if(!bool) {
            // 마지막 전화번호 4자리가 정규표현식에 위배된 경우 
            
            $("table#tblMemberRegister :input").prop("disabled", true);  
            $(e.target).prop("disabled", false); 
            
        //   $(e.target).next().show();
        //  또는
            $(e.target).parent().find("span.error").show();
                
            $(e.target).val("").focus(); 
        }
        else {
            // 마지막 전화번호 4자리가 정규표현식에 맞는 경우 
            $("table#tblMemberRegister :input").prop("disabled", false);
            
            //   $(e.target).next().hide();
            //  또는
            $(e.target).parent().find("span.error").hide();
        }
        
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 아이디가 postcode 인 것은 포커스를 잃어버렸을 경우(blur) 이벤트를 처리해주는 것이다.
    $("input#postcode").blur( (e) => {
    
        //   const regExp_postcode = /^[0-9]{5}$/;  
        //  또는
        //   const regExp_postcode = /^\d{5}$/;
        const regExp_postcode = new RegExp(/^\d{5}$/);  
        // 숫자 5자리만 들어오도록 검사해주는 정규표현식 객체 생성 
        
        const bool = regExp_postcode.test($(e.target).val());   
        
        if(!bool) {
            // 우편번호가 정규표현식에 위배된 경우 
            
            $("table#tblMemberRegister :input").prop("disabled", true);  
            $(e.target).prop("disabled", false); 
            
        //   $(e.target).next().next().show();
        //  또는
            $(e.target).parent().find("span.error").show();
                
            $(e.target).val("").focus(); 
        }
        else {
            // 우편번호가 정규표현식에 맞는 경우 
            $("table#tblMemberRegister :input").prop("disabled", false);
            
            //   $(e.target).next().next().hide();
            //  또는
            $(e.target).parent().find("span.error").hide();
        }
            
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 우편번호를 읽기전용(readonly) 로 만들기
    $("input#postcode").attr("readonly", true);

    // 주소를 읽기전용(readonly) 로 만들기
    $("input#address").attr("readonly", true);          // 필드에 값이 부여된 이후 읽기전용으로 변경
      
    // 참고항목을 읽기전용(readonly) 로 만들기
    $("input#extraAddress").attr("readonly", true);     // 필드에 값이 부여된 이후 읽기전용으로 변경

    ////////////////////////////////////////////////////////////////////////////////////////////////

    // === "우편번호찾기"를 클릭했을 때 이벤트 처리하기 === //
   $("img#zipcodeSearch").click(function(){
      
        b_zipcodeSearch_click = true;   // 맨위에 선언
        // "우편번호찾기" 를 클릭했는지 클릭을 안했는지 여부를 알아오기 위한 용도  
    
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                let addr = ''; // 주소 변수
                let extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.getElementById("extraAddress").value = extraAddr;
                
                } else {
                    document.getElementById("extraAddress").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('postcode').value = data.zonecode;
                document.getElementById("address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("detailAddress").focus();
            }
        }).open();
      
        // ----------------------------------------------------------------------------------------------

        // 우편번호를 읽기전용(readonly) 로 만들기
        $("input#postcode").attr("readonly", true);

        // 주소를 읽기전용(readonly) 로 만들기
        $("input#address").attr("readonly", true);          // 필드에 값이 부여된 이후 읽기전용으로 변경
      
        // 참고항목을 읽기전용(readonly) 로 만들기
        $("input#extraAddress").attr("readonly", true);     // 필드에 값이 부여된 이후 읽기전용으로 변경
      
        // -----------------------------------------------

        // [참고] 주소를 비활성화 로 만들기
        // $("input#address").attr("disabled", true);
      
        // [참고] 참고항목을 비활성화 로 만들기
        // $("input#extraAddress").attr("disabled", true);

        // ------------------------------------------------

        // [참고] 주소를 쓰기가능 으로 만들기
        // $("input#address").removeAttr("readonly");
      
        // [참고] 참고항목을 쓰기가능 으로 만들기
        // $("input#extraAddress").removeAttr("readonly");
      
        // ------------------------------------------------

        // [참고] 주소를 활성화 시키기
        // $("input#address").removeAttr("disabled");
      
        // [참고] 참고항목을 활성화 시키기
        // $("input#extraAddress").removeAttr("disabled");

        // ----------------------------------------------------------------------------------------------------
      
    });// end of $("img#zipcodeSearch").click()------------

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // === jQuery UI 의 datepicker === //
    $('input#datepicker').datepicker({
        dateFormat: 'yy-mm-dd'  //Input Display Format 변경
        ,showOtherMonths: true   //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
        ,changeYear: true        //콤보박스에서 년 선택 가능
        ,changeMonth: true       //콤보박스에서 월 선택 가능                
      // ,showOn: "both"          //button:버튼을 표시하고,버튼을 눌러야만 달력 표시됨. both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시됨.  
      // ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
      // ,buttonImageOnly: true   //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
      // ,buttonText: "선택"       //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
        ,yearSuffix: "년"         //달력의 년도 부분 뒤에 붙는 텍스트
        ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
        ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
        ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
    //  ,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
    //  ,maxDate: "+1M" //최대 선택일자(+1D:하루후, +1M:한달후, +1Y:일년후)                
    });

    // 초기값을 오늘 날짜로 설정
    // $('input#datepicker').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, +1M:한달후, +1Y:일년후)
    // $('input#datepicker').datepicker('setDate', '-1D'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, +1M:한달후, +1Y:일년후)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // === 전체 datepicker 옵션 일괄 설정하기 ===  
    //     한번의 설정으로 $("input#fromDate"), $('input#toDate')의 옵션을 모두 설정할 수 있다.
    $(function() {
        //모든 datepicker에 대한 공통 옵션 설정
        $.datepicker.setDefaults({
             dateFormat: 'yy-mm-dd' //Input Display Format 변경
            ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
            ,changeYear: true //콤보박스에서 년 선택 가능
            ,changeMonth: true //콤보박스에서 월 선택 가능                
        //  ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시됨. both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시됨.  
        //  ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
        //  ,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
        //  ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
            ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
            ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
            ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
            ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
            ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
        //  ,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        //  ,maxDate: "+1M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)                    
        });
 
        // input을 datepicker로 선언
        $("input#fromDate").datepicker();                    
        $("input#toDate").datepicker();
        
        // From의 초기값을 오늘 날짜로 설정
        $('input#fromDate').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, +1M:한달후, +1Y:일년후)
        
        // To의 초기값을 3일후로 설정
        $('input#toDate').datepicker('setDate', '+3D'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, +1M:한달후, +1Y:일년후)

     });
   
   ///////////////////////////////////////////////////////////////////////

    // 키보드로 입력못하게 하기
    $('input#datepicker').keydown(e => {

        $(e.target).val("").next().show();

    })  // end of $('input#datepicker').keydown(e => {})-------------


    // 생년월일에 마우스로 달력에 있는 날짜를 선택한 경우 이벤트 처리 한것 
    $('input#datepicker').bind("change", e =>{
        if($(e.target).val() != ""){
            $(e.target).next().hide();
        }
    })

    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    // === "아이디 중복확인" 을 클릭했을 때 이벤트 처리하기 시작 === //
    $("img#idcheck").click(function(){

        b_idcheck_click = true;     // 클릭 유무 파악

        // 입력하고자 하는 아이디가 데이터베이스 테이블에 존재하는지, 존재하지 않는지 알아와야 한다.
        /*
            Ajax (Asynchronous JavaScript and XML)란?                         
            ==> 이름만 보면 알 수 있듯이 '비동기 방식의 자바스크립트와 XML' 로서
                Asynchronous JavaScript + XML 인 것이다.
                한마디로 말하면, Ajax 란? Client 와 Server 간에 XML 데이터를 JavaScript 를 사용하여 비동기 통신으로 주고 받는 기술이다.
                하지만 요즘에는 데이터 전송을 위한 데이터 포맷방법으로 XML 을 사용하기 보다는 JSON(Javascript Standard Object Notation) 을 더 많이 사용한다. 
                참고로 HTML은 데이터 표현을 위한 포맷방법이다.
                그리고, 비동기식이란 어떤 하나의 웹페이지에서 여러가지 서로 다른 다양한 일처리가 개별적으로 발생한다는 뜻으로서, 
                어떤 하나의 웹페이지에서 서버와 통신하는 그 일처리가 발생하는 동안 일처리가 마무리 되기전에 또 다른 작업을 할 수 있다는 의미이다.
        */
       
        // === 첫번째 방법 === //
        $.ajax({

            // URL - 상대경로 사용 -> properties에는 그 앞의 경로도 모두 표시해주어야 한다.
            // request.getParameter 해줄때 넣어주는 name 명 => userid
            url: "idDuplicateCheck.up"
            , data: {"userid":$("input#userid").val()}      // data 속성은 http://localhost:9090/MyMVC/member/idDuplicateCheck.up 로 전송해야할 데이터를 말한다.
            , type:"post"       // type을 생략하면 type: "get" 이다.   
            // [주의] method 가 아닌 type 작성!!

            , async:true   // async:true 가 비동기 방식을 말한다. async 을 생략하면 기본값이 비동기 방식인 async:true 이다.
                          // async:false 가 동기 방식이다. 지도를 할때는 반드시 동기방식인 async:false 을 사용해야만 지도가 올바르게 나온다.
            
            , success: function(text){  // text 글자는 임의로 작성한 것 ( text 자리는 이름 상관없음 )

                console.log("text => ", text);
                // text => {"isExists":true}
                // text => {"isExists":false}
                // text 는 idDuplicateCheck.up 을 통해 가져온 결과물인 "{"isExists":true}" 또는 "{"isExists":false}" 로 되어지는 string 타입의 결과물이다.

                console.log("~~~ text 의 데이터타입 : ", typeof text);
                
                const json = JSON.parse(text);
                // JSON.parse(text); 은 JSON.parse("{"isExists":true}"); 또는 JSON.parse("{"isExists":false}"); 와 같은 것인데
                // 그 결과물은 {"isExists":true} 또는 {"isExists":false} 와 같은 문자열을 자바스크립트 객체로 변환해주는 것이다. 
                // 조심할 것은 text 는 반드시 JSON 형식으로 되어진 문자열이어야 한다.

                console.log("json => ", json);
                // json =>  {isExists: true}
		        // json =>  {isExists: false}

                console.log("~~~ json 의 데이터타입 : ", typeof json);
                // ~~~ json 의 데이터타입 :  object

                if(json.isExists){      // DB 에 존재하는 아이디인 경우     // isExists 등록한 key 값
                    // 입력한 userid 가 이미 사용중이라면
                    $("span#idcheckResult").html($("input#userid").val()
                        + " 은 이미 사용중 이므로 다른 아이디를 입력하세요").css({"color":"red"});
                    $("input#userid").val("").focus();
                }
                else{                   // DB 에 존재하지 않는 아이디인 경우
                    // 입력한 userid 가 존재하지 않는 경우
                    $("span#idcheckResult").html($("input#userid").val()
                        + " 은 사용가능합니다. ").css({"color":"navy"});
                }

            },

            // 잘못되어지면 알람을 띄운다. 필수 X
            error: function(request, status, error){
                alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
            }

        }); // end of $.ajax({})-----------------------------

        // === ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ === //
        
        // === 두번째 방법 === //


    })  // end of $("img#idcheck").click(function(){})-------------------------
    // === "아이디 중복확인" 을 클릭했을 때 이벤트 처리하기 끝 === //

    // 아이디 값이 변경되면 가입하기 버튼을 클릭시 "아이디 중복확인" 을 클릭했는지 클릭안했는지를 알아보기위한 용도 초기화 시키기
    $("input#userid").bind("change",function(){

        b_idcheck_click = false;

    })  // end of $("input#userid").bind("change",function(){})----------------

    ///////////////////////////////////////////////////////////////////////

    // === "이메일 중복확인" 을 클릭했을 때 이벤트 처리하기 시작 === //
    $("span#emailcheck").click(function(){

        b_emailcheck_click = true;  // 클릭 유무 파악

        // === 첫번째 방법 === //
        $.ajax({

            // URL - 상대경로 사용 -> properties에는 그 앞의 경로도 모두 표시해주어야 한다.
            // request.getParameter 해줄때 넣어주는 name 명 => userid
            url: "emailDuplicateCheck.up"
            , data: {"email":$("input#email").val()}      // data 속성은 http://localhost:9090/MyMVC/member/EmailDuplicateCheck.up 로 전송해야할 데이터를 말한다.
            , type:"post"       // type을 생략하면 type: "get" 이다.   
            // [주의] method 가 아닌 type 작성!!

            , async:true   // async:true 가 비동기 방식을 말한다. async 을 생략하면 기본값이 비동기 방식인 async:true 이다.
                          // async:false 가 동기 방식이다. 지도를 할때는 반드시 동기방식인 async:false 을 사용해야만 지도가 올바르게 나온다.
            
            , success: function(text){  // text 글자는 임의로 작성한 것 ( text 자리는 이름 상관없음 )

                console.log("text => ", text);
                // text => {"isExists":true}
                // text => {"isExists":false}
                // text 는 EmailDuplicateCheck.up 을 통해 가져온 결과물인 "{"isExists":true}" 또는 "{"isExists":false}" 로 되어지는 string 타입의 결과물이다.

                console.log("~~~ text 의 데이터타입 : ", typeof text);
                
                const json = JSON.parse(text);
                // JSON.parse(text); 은 JSON.parse("{"isExists":true}"); 또는 JSON.parse("{"isExists":false}"); 와 같은 것인데
                // 그 결과물은 {"isExists":true} 또는 {"isExists":false} 와 같은 문자열을 자바스크립트 객체로 변환해주는 것이다. 
                // 조심할 것은 text 는 반드시 JSON 형식으로 되어진 문자열이어야 한다.

                console.log("json => ", json);
                // json =>  {isExists: true}
		        // json =>  {isExists: false}

                console.log("~~~ json 의 데이터타입 : ", typeof json);
                // ~~~ json 의 데이터타입 :  object

                if(json.isExists){      // DB 에 존재하는 이메일인 경우
                    // 입력한 email 가 이미 사용중이라면
                    $("span#emailCheckResult").html($("input#email").val()
                        + " 은 이미 사용중 이므로 다른 이메일을 입력하세요").css({"color":"red"});
                    $("input#email").val("").focus();

                }
                else{                   // DB 에 존재하지 않는 이메일인 경우
                    // 입력한 email 가 존재하지 않는 경우
                    $("span#emailCheckResult").html($("input#email").val()
                        + " 은 사용가능합니다. ").css({"color":"navy"});
                }

            },

            // 잘못되어지면 알람을 띄운다. 필수 X
            error: function(request, status, error){
                alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
            }

        }); // end of $.ajax({})-----------------------------
            
        // === ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ === //

        // === 두번째 방법 === //

    })  // end of $("span#emailcheck").click(function(){})-------------------------
    // === "이메일 중복확인" 을 클릭했을 때 이벤트 처리하기 끝 === //

    // 이메일 값이 변경되면 가입하기 버튼을 클릭시 "이메일 중복확인" 을 클릭했는지 클릭안했는지를 알아보기위한 용도 초기화 시키기
    $("input#email").bind("change",function(){

        b_emailcheck_click = false;

    })  // end of $("input#email").bind("change",function(){})----------------

})	// end of $(document).ready(function(){})--------------------

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Function Declaration
// "가입하기" 버튼 클릭 시 호출되는 함수
function goRegister(){

/*
    // *** 필수입력사항에 모두 입력이 되었는지 검사하기 시작 *** //
    let b_requiredInfo = true;

    // === jQuery === //
    $("input.requiredInfo").each(function(index, elmt){
        const data = $(elmt).val().trim()
        if(data == ""){
            alert("* 표시된 필수입력사항은 모두 입력하셔야 합니다.");
            b_requiredInfo = false;
            return false;   // 반복문 빠져나가기 break; 라는 뜻이다.
        }
    })  // end of $("input.requiredInfo").each(function(index, elmt)--------------------
    
    if(!b_requiredInfo){    // 필수입력이 다 채워지지 않은 경우
        return;     // goRegister() 함수를 종료한다.    
    }
    // *** 필수입력사항에 모두 입력이 되었는지 검사하기 끝** //
*/

    // 또는

    // *** 필수입력사항에 모두 입력이 되었는지 검사하기 시작 *** //
    let b_requiredInfo = true;
    // === javascript === //
    const requiredInfo_list = document.querySelectorAll("input.requiredInfo");

    for(let i=0; i<requiredInfo_list.length; i++){
        const val = requiredInfo_list[i].value.trim();
        if(val == ""){
            alert("* 표시된 필수입력사항은 모두 입력하셔야 합니다.");
            b_requiredInfo = false;
            return false;   //  break; 라는 뜻이다.
        }
    }   // end of for-------------------------------

    if(!b_requiredInfo){    // 필수입력이 다 채워지지 않은 경우
        return;     // goRegister() 함수를 종료한다.
    }
    // *** 필수입력사항에 모두 입력이 되었는지 검사하기 끝** //
    
    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////

    // **** 아이디 중복확인" 을 클릭했는지 검사하기 시작 **** //
    if(!b_idcheck_click){
        // "아이디 중복확인"을 클릭 안 했을 경우
        alert("아이디 중복확인을 클릭하셔야 합니다.");
        return;     // goRegister() 함수를 종료한다.
    }

    // **** 아이디 중복확인" 을 클릭했는지 검사하기 끝 **** //

    ////////////////////////////////////////////////////////////////////////////////////////////////

    // **** 이메일 중복확인" 을 클릭했는지 검사하기 시작 **** //
    if(!b_emailcheck_click){
        // "이메일 중복확인"을 클릭 안 했을 경우
        alert("이메일 중복확인을 클릭하셔야 합니다.");
        return;     // goRegister() 함수를 종료한다.
    }
    // **** 이메일 중복확인" 을 클릭했는지 검사하기 끝 **** //

    ///////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////

    // *** "우편번호찾기" 를 클릭했는지 검사하기 시작 *** //
    if(!b_zipcodeSearch_click){
        alert("우편번호찾기를 클릭하셔서 우편번호를 입력하셔야 합니다.");
        return; // goRegister() 함수를 종료한다.    
        // => button의 type 이 submit 이 아닌 button 타입이므로 return false 가 아니다.
    }
    // *** "우편번호찾기" 를 클릭했는지 검사하기 끝 *** //

    //////////////////////////////////////////////////////////////////////////////////
    
    // *** 우편번호 및 주소에 값을 입력했는지 검사하기 시작 *** //
    const postcode = $("input#postcode").val().trim();
    const address = $("input#address").val().trim();
    const detailAddress = $("input#detailAddress").val().trim();
    // const extraAddress = $("input#extraAddress").val().trim();
   
    if(postcode == "" || address == "" || detailAddress == "" || extraAddress == "") {
        alert("우편번호 및 주소를 입력하셔야 합니다.");
        return; // goRegister() 함수를 종료한다.
    }
    // *** 우편번호 및 주소에 값을 입력했는지 검사하기 끝 *** //
    
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    // *** 성별을 선택했는지 검사하기 시작 *** //
    const radio_checked_length = $("input:radio[name='gender']:checked").length;

    if(radio_checked_length == 0){
        alert("성별을 선택하셔야 합니다.");
        return; // goRegister() 함수를 종료한다.
    }

    // *** 성별을 선택했는지 검사하기 끝 *** //

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // *** 생년월일 값을 입력했는지 검사하기 시작 *** //
    const birthday = $('input#datepicker').val().trim();

    if(birthday == ""){
        alert("생년월일을 입력하셔야 합니다.");
        return; // goRegister() 함수를 종료한다.
    }

    // *** 생년월일 값을 입력했는지 검사하기 끝 *** //

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // *** 약관에 동의를 했는지 검사하기 시작 *** //
    const checkbox_checked_length = $("input:checkbox[id='agree']:checked").length;

    if(checkbox_checked_length == 0){
        alert("이용약관에 동의하셔야 합니다.");
        return; // goRegister() 함수를 종료한다.
    }

    // *** 약관에 동의를 했는지 검사하기 끝 *** //

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////

    const frm = document.registerFrm;
    frm.action = "memberRegister.up";
    frm.method = "post";
    frm.submit();

}   // end of function goRegister()----------------------

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 에러메시지나 중복체크여부 지우기
function goReset(){

    $("span.error").hide();

    $("span#idcheckResult").empty();

    $("span#emailCheckResult").empty();

}   // end of function goReset(){}------------

function goGaib() {
    alert("회원가입에 대한 유효성검사를 한후에 통과되면 submit 하려고 함");
 }