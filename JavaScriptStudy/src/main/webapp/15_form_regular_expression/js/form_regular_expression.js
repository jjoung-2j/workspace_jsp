window.onload = function(){

    const now = new Date();  // 자바스크립트에서 현재날짜시각을 알려주는 것이다.

    const currentYear = now.getFullYear();      // 현재 년도

///////////////////////////////////////////////////////////////////////////////

    let option_birthYear = `<option>출생년도</option>`;

    for(let i=0; i<currentYear-1950+1; i++){
        option_birthYear += `<option>${1950+i}</option>`;
    }   // end of for--------------------
    
    document.querySelector("select#birthYear").innerHTML = option_birthYear;

    let option_birthMonth = `<option>출생월</option>`;

    for(let i=1; i<=12; i++){

        let month = (i<10)?"0" + i:i
        option_birthMonth += `<option>${month}</option>`;

    }   // end of for--------------------

    document.querySelector("select#birthMonth").innerHTML = option_birthMonth;

    let option_birthDate = `<option>출생일</option>`;

    for(let i=1; i<=31; i++){

        let date = (i<10)?"0" + i:i
        option_birthDate += `<option>${date}</option>`;

    }   // end of for--------------------

    document.querySelector("select#birthDate").innerHTML = option_birthDate;

///////////////////////////////////////////////////////////////////////////////////

    // === 만나이 구하기 시작 === //
    const birthSelect_list = document.querySelectorAll("select.birthSelect");

    for(let birthSelect of birthSelect_list){
        // console.log("확인용 : ", birthSelect.id);
        /*
            확인용 :  birthYear
            확인용 :  birthMonth
        */

        // birthSelect.onchange = functionb(){};
        // 또는
        birthSelect.addEventListener('change',function(){
            // onchange 으로 해야지 onChange 하면 작동을 하지 않는다.!!!

            // console.log("확인용 this.value => ", this.value);
            /*
                확인용 this.value =>  1998
                확인용 this.value =>  09
                확인용 this.value =>  출생년도
                확인용 this.value =>  출생월
            */

            // console.log("확인용 ", isNaN(this.value));
            /*
                확인용  false  // 숫자인 경우
                확인용  false
                확인용  true    // 숫자가 아닌 경우(출생년도, 출생월)
                확인용  true
            */

            /*
                NaN ==> Not a Number 
                isNaN(값) ==> 값이 숫자가 아니라면 true
                isNaN(값) ==> 값이 숫자 이라면 false  
            */

            if(isNaN(this.value)){  // "출생년도" 또는 "출생월" 을 선택한 경우

                if(birthSelect.id == "birthYear"){      // this.id 도 가능
                    alert("태어나신 년도를 선택하세요.");
                }
                else{
                    alert("태어나신 월을 선택하세요.");
                }

                document.querySelector("span#age").innerHTML = "";

            }
            else{   // 숫자년도 및 숫자월 그리고 숫자일을 모두 숫자로 선택한 경우

        ///////////////////////////////////////////////////////////////////////////////////
    
                // 숫자로 된 날짜가 실제 달력에 존재하는 날짜인지 검사하도록 하는 함수를 호출 
                // 존재하지 않는 날짜 표현하지 않기 (Ex.2/30)
            /*
                console.log(checkValidDate("2023-04-31"));  // false
                console.log(checkValidDate("2023-08-31"));  // true
                console.log(checkValidDate("2019-02-28"));  // true
                console.log(checkValidDate("2019-02-29"));  // false
                console.log(checkValidDate("2020-02-29"));  // true
            */
                const birthday = document.querySelector("select#birthYear").value + "-" 
                                + document.querySelector("select#birthMonth").value + "-" 
                                + document.querySelector("select#birthDate").value;
                // console.log("확인용 birthday => ", birthday);      

                // 2023-04-31   2023-08-31   2019-02-28   2019-02-29   2020-02-29 에 대한 true,false
                // console.log(checkValidDate(birthday));

                if(checkValidDate(birthday)){   // 달력에 존재하는 날짜라면
                    ///////////////////////////////////////////////////////////////////////////////////
                            const age = go_age(birthday);       // 만나이 구하기
                            document.querySelector("span#age").innerHTML = age;
                }
                /*
                if(!isNaN(document.querySelector("select#birthYear").value)
                    && !isNaN(document.querySelector("select#birthMonth").value)
                    && !isNaN(document.querySelector("select#birthDate").value)
                    && !checkValidDate(birthday)){
                */
               // 또는
                if(!checkValidDate(birthday) 
&& isNaN(birthSelect.value)){
                    alert("달력상에 존재하지 않는 날짜를 선택하셨습니다.");
                    document.querySelector("span#age").innerHTML = "";
                }
            
            }   // end of if~else-----
        })  // end of birthSelect.addEventListener('change',function(){})-------------
    }   // end of for-----------------------
    // === 만나이 구하기 끝 === //

    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
    document.querySelector("button#btn_submit_ok").addEventListener('click',() => {
        alert('전송(type="button")버튼을 클릭하셨군요');
    })

    document.querySelector("button#btn_submit_fail").addEventListener('click',() => {
        alert('전송(type="없음")버튼을 클릭하셨군요');
    })
*/
/*
document.querySelector("button#btn_submit_ok").addEventListener('click',() => {

})
*/
    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

    // =========== 전송(button) 클릭 시 시작 =========== //

/* button 타입 유무별 특징 확인
    // document.querySelector("input[type='button']").addEventListener('click',() => {  // 정상
    // document.querySelector("button#btn_submit_ok").addEventListener('click',() => {  // 정상
    document.querySelector("button#btn_submit_fail").addEventListener('click',() => {   // 비정상 
    // -> 버튼태그에 type을 설정하지 않으면 기본값이 type="submit" 이 되어지므로 submit 이벤트가 실행된다. => 비정상
    // 전송(submit) 주석 처리 하고 확인하기 => button 의 타입이 없는 경우 에러메시지가 떳다가 사라진다.
*/
   
    document.querySelector("input[type='button']").addEventListener('click',() => {  // 정상

        const frm = document.register_form;
        // 문서에서 name 의 값이 register_form 인 태그(오브젝트)를 잡는 것이다.

////////////////////////////////////////////////////////////////////////////
        // ==== 정규표현식 객체 만들기 ==== //
        // 정규표현식 객체는 항상 / 로 시작해서 / 로 끝나고 ; 을 붙여주면 된다.

        // 1. 사용자 ID는 5글자 이상 20글자 이하 이어야 하고, 첫글자는 영문자 이어야 하고 그 나머지는 영문자 또는 숫자로 이루어져야 한다. 
        //    올바른예 : superman , Batman007 , s9man
        //    틀린예  :  007superman, Lees, Batman007$
        const regExp_userid = /^[A-Za-z][A-Za-z0-9]{4,19}$/;

        // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사를 한다.
        const bool_userid = regExp_userid.test(frm.userid.value);
        // frm.userid.value 값이 regExp_userid 패턴에 맞으면 true,
        // frm.userid.value 값이 regExp_userid 패턴에 틀리면 false

        if(!bool_userid){
            document.querySelector("span#err_userid").innerHTML = "아이디는 5글자 이상 20글자 이하 이어야 하고, 첫글자는 영문자 나머지는 소문자 또는 숫자 이어야 합니다.";
            
            frm.userid.value = "";
            frm.userid.focus();
            return;     // 종료
        }
        else{
            document.querySelector("span#err_userid").innerHTML = "";
        }

        // alert("확인용 => 다음으로 암호검사 진행");

    /////////////////////////////////////////////////////////////////////////////////////////////////////

        // 2. 암호는 8글자 이상 15글자 이하이어야 하고, 영문자, 숫자, 특수문자가 혼합되어야만 한다.
        //    올바른 예 : qwer1234$ , Abcd007!
        //    틀린 예  : qw12$ , qwer12345, adfsdf24243@%@#$sdfsdf

        const regExp_passwd = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$/g;

        // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사를 한다.
        const bool_passwd = regExp_passwd.test(frm.passwd.value);
        // frm.passwd.value 값이 regExp_passwd 패턴에 맞으면 true,
        // frm.passwd.value 값이 regExp_passwd 패턴에 틀리면 false

        if(!bool_passwd){
            document.querySelector("span#err_passwd").innerHTML = "암호는 8글자 이상 15글자 이하이어야 하고, 영문자, 숫자, 특수문자가 혼합되어야만 합니다.";
            
            frm.passwd.value = "";
            frm.passwd.focus();
            return;     // 종료
        }
        else{
            document.querySelector("span#err_passwd").innerHTML = "";
        }

        // 3. 암호 입력란과 암호확인 입력란의 데이터가 동일한지 아닌지 검사하기
        const passwd2_val = document.querySelector("input#passwd2").value;

        if(frm.passwd.value != passwd2_val){
            document.querySelector("span#err_passwd2").innerHTML = "암호와 암호확인 값이 서로 다릅니다!!";
            
            frm.passwd.value = "";
            document.querySelector("input#passwd2").value = "";

            frm.passwd.focus();
            return;
        }
        else{
            document.querySelector("span#err_passwd2").innerHTML = "";
        }

////////////////////////////////////////////////////////////////////////////////////////////

        // 4. 성명은 필수 입력사항이므로 반드시 값을 입력해야 한다.
        //    단, 공백없이 한글만 2글자 이상 6글자 이하로만 한다.
        const name_val = frm.name.value;

        const regExp_name = /^[가-힣]{2,6}$/;

        // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사를 한다.
        const bool_name = regExp_name.test(frm.name.value);
        // frm.name.value 값이 regExp_name 패턴에 맞으면 true,
        // frm.name.value 값이 regExp_name 패턴에 틀리면 false

        if(!bool_name){
            document.querySelector("span#err_name").innerHTML = "성명은 공백없이 한글로만 2글자 이상 6글자 이하 까지만 됩니다.";
            
            frm.name.value = "";
            frm.name.focus();
            return;     // 종료
        }
        else{
            document.querySelector("span#err_name").innerHTML = "";
        }

/////////////////////////////////////////////////////////////////////////////

        // 5. 이메일은 필수 입력사항이므로 반드시 값을 입력해야 한다.
        //    올바른예 : leess@naver.com
        //    틀린예  : leessnaver.com , leess@naver.@com
        const regExp_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 
        
        // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사를 한다.
        const bool_email = regExp_email.test(frm.email.value);
        // frm.email.value 값이 regExp_email 패턴에 맞으면 true,
        // frm.email.value 값이 regExp_email 패턴에 틀리면 false 
        
        if(!bool_email) {
            document.querySelector("span#err_email").innerHTML = "email 형식에 맞지 않습니다. 올바른 email 을 입력하세요!!"; 
            
            frm.email.value = "";
            frm.email.focus();
            return; // 종료
        }
        else {
            document.querySelector("span#err_email").innerHTML = "";
        }

///////////////////////////////////////////////////////////////////////////////

        // 6. 성별을 선택했는지 검사하기(라디오에서 선택했는지 안했는지 검사하는 것임) 
        
        const gender_radio_list = frm.gender;
        let gender_bool = false;
        
        for(let gender_radio of gender_radio_list){
            if(gender_radio.checked){   // 라디오를 선택한 경우
                gender_bool = true;
                break;
            }
        }   // end of for~of-----------------------

        if(!gender_bool){
            document.querySelector("span#err_gender").innerHTML = "성별을 선택하세요!!";
            return; // 종료
        }
        else{
            document.querySelector("span#err_gender").innerHTML = "";
        }

/////////////////////////////////////////////////////////////////////////////////

        // 7. 취미를 2개 이상 선택했는지 검사하기(체크박스에 선택했는지 안했는지 검사하는 것임)
        const hobby_checkbox_list = frm.hobby;
        let checked_cnt = 0;
        
        for(let hobby_checkbox of hobby_checkbox_list){
            if(hobby_checkbox.checked){   // 체크박스를 선택한 경우
                checked_cnt++;
            }
        }   // end of for~of-----------------------

        if(checked_cnt < 2){
            document.querySelector("span#err_hobby").innerHTML = "취미는 최소한 2개 이상 선택하셔야 합니다.";
            return; // 종료
        }
        else{
            document.querySelector("span#err_hobby").innerHTML = "";
        }

/////////////////////////////////////////////////////////////////////////////////

        // 8. 생년월일을 선택했는지 검사하기 
        if( isNaN(frm.birthYear.value) || 
            isNaN(frm.birthMonth.value) || 
            isNaN(frm.birthDate.value) || 
            !checkValidDate(frm.birthYear.value+"-"+frm.birthMonth.value+"-"+frm.birthDate.value)  
        ) {
            document.querySelector("span#err_birthday").innerHTML = `"생년월일" 을 올바르게 선택하세요`;
            return; // 종료  
        }
        else {
            document.querySelector("span#err_birthday").innerHTML = ""; 
        }  

////////////////////////////////////////////////////////////////////////////////

        // 9. 최종학력을 선택했는지 검사하기
        if(frm.school.value == "선택하세요"){
            document.querySelector("span#err_school").innerHTML = "최종학력을 올바르게 선택하세요!!"; 
            return; // 종료
        }
        else{
            document.querySelector("span#err_school").innerHTML = "";
        }

////////////////////////////////////////////////////////////////////////////////

        // 10. 가입인사말을 입력했는지 검사하기
        if(frm.registerComment.value.trim() == ""){

            document.querySelector("span#err_registerComment").innerHTML = "가입인사말을 입력하세요!!";
            frm.registerComment.value = "";
            frm.registerComment.focus();
            return; // 종료 

        }
        else{
            document.querySelector("span#err_registerComment").innerHTML = "";
        }

        frm.action = "register.do";
        // frm.action 은 form 태그에 담겨진 데이터를 전송하면 받아서 처리해주는 URL 주소이다.

        frm.submit();   // 전송하기

    })  // end of document.querySelector("input[type='button']").addEventListener('click',() => {}-----
    // =========== 전송(button) 클릭 시 끝 =========== //


    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
    // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

    // =========== 전송(submit) 클릭 시 시작 =========== //

        const frm = document.register_form;
        // 문서에서 name 의 값이 register_form 인 태그(오브젝트)를 잡는 것이다.

    ////////////////////////////////////////////////////////////////////////////

        frm.onsubmit = function(){
            // ==== 정규표현식 객체 만들기 ==== //
            // 정규표현식 객체는 항상 / 로 시작해서 / 로 끝나고 ; 을 붙여주면 된다.

            // 1. 사용자 ID는 5글자 이상 20글자 이하 이어야 하고, 첫글자는 영문자 이어야 하고 그 나머지는 영문자 또는 숫자로 이루어져야 한다. 
            //    올바른예 : superman , Batman007 , s9man
            //    틀린예  :  007superman, Lees, Batman007$
            const regExp_userid = /^[A-Za-z][A-Za-z0-9]{4,19}$/;

            // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사를 한다.
            const bool_userid = regExp_userid.test(frm.userid.value);
            // frm.userid.value 값이 regExp_userid 패턴에 맞으면 true,
            // frm.userid.value 값이 regExp_userid 패턴에 틀리면 false

            if(!bool_userid){
                document.querySelector("span#err_userid").innerHTML = "아이디는 5글자 이상 20글자 이하 이어야 하고, 첫글자는 영문자 나머지는 소문자 또는 숫자 이어야 합니다.";
                
                frm.userid.value = "";
                frm.userid.focus();
                return false;     // submit 을 하지 않는다.
            }
            else{
                document.querySelector("span#err_userid").innerHTML = "";
            }

            // alert("확인용 => 다음으로 암호검사 진행");

        /////////////////////////////////////////////////////////////////////////////////////////////////////

            // 2. 암호는 8글자 이상 15글자 이하이어야 하고, 영문자, 숫자, 특수문자가 혼합되어야만 한다.
            //    올바른 예 : qwer1234$ , Abcd007!
            //    틀린 예  : qw12$ , qwer12345, adfsdf24243@%@#$sdfsdf

            const regExp_passwd = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$/g;

            // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사를 한다.
            const bool_passwd = regExp_passwd.test(frm.passwd.value);
            // frm.passwd.value 값이 regExp_passwd 패턴에 맞으면 true,
            // frm.passwd.value 값이 regExp_passwd 패턴에 틀리면 false

            if(!bool_passwd){
                document.querySelector("span#err_passwd").innerHTML = "암호는 8글자 이상 15글자 이하이어야 하고, 영문자, 숫자, 특수문자가 혼합되어야만 합니다.";
                
                frm.passwd.value = "";
                frm.passwd.focus();
                return false;     // submit 을 하지 않는다.
            }
            else{
                document.querySelector("span#err_passwd").innerHTML = "";
            }

            // 3. 암호 입력란과 암호확인 입력란의 데이터가 동일한지 아닌지 검사하기
            const passwd2_val = document.querySelector("input#passwd2").value;

            if(frm.passwd.value != passwd2_val){
                document.querySelector("span#err_passwd2").innerHTML = "암호와 암호확인 값이 서로 다릅니다!!";
                
                frm.passwd.value = "";
                document.querySelector("input#passwd2").value = "";

                frm.passwd.focus();
                return false;     // submit 을 하지 않는다.
            }
            else{
                document.querySelector("span#err_passwd2").innerHTML = "";
            }

        ////////////////////////////////////////////////////////////////////////////////////////////

            // 4. 성명은 필수 입력사항이므로 반드시 값을 입력해야 한다.
            //    단, 공백없이 한글만 2글자 이상 6글자 이하로만 한다.
            const name_val = frm.name.value;

            const regExp_name = /^[가-힣]{2,6}$/;

            // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사를 한다.
            const bool_name = regExp_name.test(frm.name.value);
            // frm.name.value 값이 regExp_name 패턴에 맞으면 true,
            // frm.name.value 값이 regExp_name 패턴에 틀리면 false

            if(!bool_name){
                document.querySelector("span#err_name").innerHTML = "성명은 공백없이 한글로만 2글자 이상 6글자 이하 까지만 됩니다.";
                
                frm.name.value = "";
                frm.name.focus();
                return false;     // submit 을 하지 않는다.
            }
            else{
                document.querySelector("span#err_name").innerHTML = "";
            }

        /////////////////////////////////////////////////////////////////////////////

            // 5. 이메일은 필수 입력사항이므로 반드시 값을 입력해야 한다.
            //    올바른예 : leess@naver.com
            //    틀린예  : leessnaver.com , leess@naver.@com
            const regExp_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 
            
            // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사를 한다.
            const bool_email = regExp_email.test(frm.email.value);
            // frm.email.value 값이 regExp_email 패턴에 맞으면 true,
            // frm.email.value 값이 regExp_email 패턴에 틀리면 false 
            
            if(!bool_email) {
                document.querySelector("span#err_email").innerHTML = "email 형식에 맞지 않습니다. 올바른 email 을 입력하세요!!"; 
                
                frm.email.value = "";
                frm.email.focus();
                return false;     // submit 을 하지 않는다.
            }
            else {
                document.querySelector("span#err_email").innerHTML = "";
            }

        ///////////////////////////////////////////////////////////////////////////////

            // 6. 성별을 선택했는지 검사하기(라디오에서 선택했는지 안했는지 검사하는 것임) 
            
            const gender_radio_list = frm.gender;
            let gender_bool = false;
            
            for(let gender_radio of gender_radio_list){
                if(gender_radio.checked){   // 라디오를 선택한 경우
                    gender_bool = true;
                    break;
                }
            }   // end of for~of-----------------------

            if(!gender_bool){
                document.querySelector("span#err_gender").innerHTML = "성별을 선택하세요!!";
                return false;     // submit 을 하지 않는다.
            }
            else{
                document.querySelector("span#err_gender").innerHTML = "";
            }

        /////////////////////////////////////////////////////////////////////////////////

            // 7. 취미를 2개 이상 선택했는지 검사하기(체크박스에 선택했는지 안했는지 검사하는 것임)
            const hobby_checkbox_list = frm.hobby;
            let checked_cnt = 0;
            
            for(let hobby_checkbox of hobby_checkbox_list){
                if(hobby_checkbox.checked){   // 체크박스를 선택한 경우
                    checked_cnt++;
                }
            }   // end of for~of-----------------------

            if(checked_cnt < 2){
                document.querySelector("span#err_hobby").innerHTML = "취미는 최소한 2개 이상 선택하셔야 합니다.";
                return false;     // submit 을 하지 않는다.
            }
            else{
                document.querySelector("span#err_hobby").innerHTML = "";
            }

        /////////////////////////////////////////////////////////////////////////////////

            // 8. 생년월일을 선택했는지 검사하기 
            if( isNaN(frm.birthYear.value) || 
                isNaN(frm.birthMonth.value) || 
                isNaN(frm.birthDate.value) || 
                !checkValidDate(frm.birthYear.value+"-"+frm.birthMonth.value+"-"+frm.birthDate.value)  
            ) {
                document.querySelector("span#err_birthday").innerHTML = `"생년월일" 을 올바르게 선택하세요`;
                return false;     // submit 을 하지 않는다.
            }
            else {
                document.querySelector("span#err_birthday").innerHTML = ""; 
            }  

        ////////////////////////////////////////////////////////////////////////////////

            // 9. 최종학력을 선택했는지 검사하기
            if(frm.school.value == "선택하세요"){
                document.querySelector("span#err_school").innerHTML = "최종학력을 올바르게 선택하세요!!"; 
                return false;     // submit 을 하지 않는다.
            }
            else{
                document.querySelector("span#err_school").innerHTML = "";
            }

        ////////////////////////////////////////////////////////////////////////////////

            // 10. 가입인사말을 입력했는지 검사하기
            if(frm.registerComment.value.trim() == ""){

                document.querySelector("span#err_registerComment").innerHTML = "가입인사말을 입력하세요!!";
                frm.registerComment.value = "";
                frm.registerComment.focus();
                return false;     // submit 을 하지 않는다.

            }
            else{
                document.querySelector("span#err_registerComment").innerHTML = "";
            }

            frm.action = "register.do";
            // frm.action 은 form 태그에 담겨진 데이터를 전송하면 받아서 처리해주는 URL 주소이다.

            frm.submit();   // 전송하기

    }  // end of frm.onsubmit = function(){}-------------------------------------
    // =========== 전송(submit) 클릭 시 끝 =========== //

// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

    // =========== 취소(reset) 클릭 시 시작 =========== //
    frm.onreset = function(){
        document.querySelector("span#age").innerHTML = "";      // 나이 지우기

        const errmsg_list = document.querySelectorAll("span.errmsg");   // 에러 메시지 지우기

        errmsg_list.forEach(elmt => {
            elmt.innerHTML = "";
        })  // end of forEach--------------

    }   // end of frm.onreset = function(){}----------------------------------
    // =========== 취소(reset) 클릭 시 끝 =========== //

}   // end of window.onload = function(){}----------------------------

// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ //

// 생년월일을 입력받아서 만나이를 구해주는 함수 만들기
function go_age(birthday){

    const d_birthday = new Date(birthday); // 문자열(날짜형식의 문자열이어야 함)을 날짜로 변경하기
                                           // 날짜형식의 문자열은 2023-09-05 또는 2023/09/05 또는 2023.09.05 이다.
    const birthYear = d_birthday.getFullYear(); // 생일년도(number 타입이다)

    const now = new Date(); // 자바스크립트에서 현재날짜시각을 알려주는 것이다. 
    const currentYear = now.getFullYear(); // 현재년도 

    if(d_birthday.getMonth() < now.getMonth() || 
       (d_birthday.getMonth() == now.getMonth() && d_birthday.getDate() < now.getDate() ) ) { 
       // 생일이 현재일자 보다 작은 경우, 즉 생일이 지난 경우       
       return currentYear - birthYear;
    } 
    else {
       return currentYear - birthYear - 1;
    }

}   // end of function go_age(birthday)-----------------------

//////////////////////////////////////////////////////////////////////////

// 생년월일에서 출생일 select 태그의 값을 변경했을 때 호출되는 함수
function go_birthDate(select){

    if(isNaN(select.value)){  // "출생일" 을 선택한 경우
        
        alert("태어나신 일을 선택하세요.");

        document.querySelector("span#age").innerHTML = "";

    }
    else{   // 출생일을 제외한 숫자를 선택한 경우

///////////////////////////////////////////////////////////////////////////////////

        // 숫자로 된 날짜가 실제 달력에 존재하는 날짜인지 검사하도록 하는 함수를 호출 
   
        const birthday = document.querySelector("select#birthYear").value + "-" 
                        + document.querySelector("select#birthMonth").value + "-" 
                        + document.querySelector("select#birthDate").value;
        // console.log("확인용 birthday => ", birthday);      

        // 2023-04-31   2023-08-31   2019-02-28   2019-02-29   2020-02-29 에 대한 true,false
        // console.log(checkValidDate(birthday));  // true 또는 false 출력

        if(checkValidDate(birthday)){   // 달력에 존재하는 날짜라면
    ///////////////////////////////////////////////////////////////////////////////////
            const age = go_age(birthday);       // 만나이 구하기
            document.querySelector("span#age").innerHTML = age;
        }
        if(!isNaN(document.querySelector("select#birthYear").value)
                    && !isNaN(document.querySelector("select#birthMonth").value)
                    && !isNaN(document.querySelector("select#birthDate").value)
                    && !checkValidDate(birthday)){
         // 또는
    /*
         if(!checkValidDate(birthday) && (birthSelect_list.length == 3)
         && isNaN(birthSelect.value)){
    */
                    alert("달력상에 존재하지 않는 날짜를 선택하셨습니다.");
                    document.querySelector("span#age").innerHTML = "";
                }

    }

}   // end of function go_birthDate(select)--------------------
