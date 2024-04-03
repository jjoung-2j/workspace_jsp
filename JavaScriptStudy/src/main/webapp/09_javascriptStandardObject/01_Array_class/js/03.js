window.onload = function(){

    // === Array.from() === //
    // ES6에 새로 도입된 메소드로서 유사 배열 객체나 반복 가능한 객체를 실제 배열로 변환시켜주는 것이다. 
    
    const li_list = document.querySelectorAll("div#div_fruit > ul:first-child > li"); 
    
    console.log(li_list);
    // NodeList(4) [li, li, li, li]
    
    // **** Array.from(유사배열객체) **** //
    const li_arr = Array.from(li_list);  // 유사배열객체인 li_list 를 배열로 바꾸어 준다. 
    console.log(li_arr);
    // (4) [li, li, li, li]
    
    const fruitname_arr = li_arr.map(item => item.innerText);   // li_arr 안에 존재하는 내용을 배열로 만들어준다.
    console.log(fruitname_arr);
    // (4) ['사과', '딸기', '수박', '참외']
    
    const fruitnames = fruitname_arr.join(", ");
    console.log(fruitnames);
    // 사과, 딸기, 수박, 참외
    
    document.querySelector("div#fruit_hangul").innerHTML = fruitnames; 
    
    //////////////////////////////////////////////////////////////////

    // *** Array.from(유사배열객체 , map()메소드와 비슷한 1:1 매핑 시켜주는 함수정의) *** // 
    
    const li_list2 = document.querySelectorAll("div#div_fruit > ul:last-child > li");
    
    const fruitname2_arr = Array.from(li_list2, function(item, index, array) {
                                                     // item 은 배열요소인 li 이다.
                                         return item.innerText;                   
                                      });
    
    console.log(fruitname2_arr);  
    // (4) ['apple', 'strawberry', 'watermelon', 'melon']                                
    
    document.querySelector("div#fruit_english").innerHTML = fruitname2_arr.join(", "); 
    
    // function / index,array / return 생략
    const fruitname3_arr = Array.from(li_list2, item => item.innerText);    
    document.querySelector("div#fruit_english2").innerHTML = fruitname3_arr.join(", ");

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
    
    // ==== td 태그에 나열된 점수를 가져와서 합계 및 평균 구하기 시작 ==== //
    const td_list = document.querySelectorAll("table#tbl > tbody > tr > td:last-child");
    console.log("td_list => ", td_list);
    // td_list => NodeList(5) [td, td, td, td, td]

    const point_arr = Array.from(td_list, item => item.innerText);
    console.log("point_arr => ", point_arr);    // string 타입으로 나온다.
    // point_arr => (5) ['90', '100', '50', '70', '80']

    let sum = 0;
    
    for(let point of point_arr){
        sum += Number(point);
    }

    console.log("sum => ", sum);

    console.log("sum/point_arr.length => ", sum/point_arr.length);
    
    document.querySelector("table#tbl > tfoot > tr:first-child > td:last-child").innerHTML = sum; 
    
    document.querySelector("table#tbl > tfoot > tr:last-child > td:last-child").innerHTML = sum/point_arr.length;  

    // ==== td 태그에 나열된 점수를 가져와서 합계 및 평균 구하기 끝 ==== //

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const arr_member = [{userid:"leess", passwd:"qwer1234$", name:"이순신", age:25},
                        {userid:"eomjh", passwd:"qwer1234$", name:"엄정화", age:47},
                        {userid:"seokj", passwd:"qwer1234$", name:"서강준", age:23},
                        {userid:"sunsin", passwd:"qwer1234$", name:"이순신", age:38},
                        {userid:"youks", passwd:"qwer1234$", name:"유관순", age:24}];

    const arr_leess = [];   // 빈 배열 선언

    for(let item of arr_member) {
        if(item.name.trim() == '이순신') {
            arr_leess.push(item);
        }
    }// end of for-----------------                    

    let html = `<table>
                    <thead>
                        <tr>
                            <th>아이디</th>
                            <th>암호</th>
                            <th>성명</th>
                            <th>나이</th>
                        </tr>
                    </thead>
                <tbody>`;

    if(arr_leess.length > 0) {

        for(let item of arr_leess) {
            html += `<tr>
                        <td>${item.userid}</td>
                        <td>${item.passwd}</td>
                        <td>${item.name}</td>
                        <td>${item.age}</td>
                    </tr>`;    
        }// end of for----------------
    
    }

    else {
        html += `<tr>
                    <td colspan="4">데이터가 존재하지 않습니다</td>
                </tr>`;
    }

    html += `  </tbody></table>`;

    document.querySelector("div#quiz").innerHTML = html;         

//////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////

    // ---- **** 배열명.find() **** ----
    // ES6에서 새로 도입된 메소드로서 판별함수의 조건에 만족하는 배열요소가 있으면 첫번째 배열요소를 리턴 시켜주고 끝내고, 
    // 판별함수의 조건에 만족하는 배열요소가 없으면 undefinded
    
    // 1번
    let member = arr_member.find( function(item, index, array) {
        // item 은 필수
        // index, array 은 생략가능하다.
        if(item.name.trim() == "엄정화") {
            return item;
        }                   
    });
    
    console.log(member);                               
    // {userid: 'eomjh', passwd: 'qwer1234$', name: '엄정화', age: 47}

    // 2번
    member = arr_member.find(item => item.name.trim() == "엄정화");
    console.log(member);
    // {userid: 'eomjh', passwd: 'qwer1234$', name: '엄정화', age: 47} 

    member = arr_member.find(item => item.name.trim() == "이순신");
    console.log(member);
    // {userid: 'leess', passwd: 'qwer1234$', name: '이순신', age: 25} 

    // === !!!! ★★★ 암기  배열명.find() 은 고유한 값(primary key)으로 검색할 때 사용한다. ★★★ !!!! === // 
    member = arr_member.find(item => item.userid == "sunsin");
    console.log(member);
    // {userid: 'sunsin', passwd: 'qwer1234$', name: '이순신', age: 38} 

    member = arr_member.find(item => item.userid == "yanghyejoung");   // 없는 아이디
    console.log(member);
    // undefined

/////////////////////////////////////////////////////////////////////////////////////////////////////

    // ---- **** 배열명.filter() **** ----
    // 판별함수의 조건에 만족하는 배열요소가 있으면 모든 배열요소를 담은 배열로 리턴 시켜주고,
    // 판별함수의 조건에 만족하는 배열요소가 없으면 빈배열 [] 을 리턴시켜준다.   

    let member_arr = arr_member.filter(item => item.name.trim() == "이순신");  
    console.log(member_arr);
    // (2) [{…}, {…}]

    if(member_arr.length > 0) {
        for(let mbr of member_arr) {

        for(let property_name in mbr) {     // mbr : 객체, property_name : 속성명
            console.log(`${mbr[property_name]}`); 
        }
        console.log(`--------------------`);

        }// end of for-------------------------
    }
    /*
        leess
        qwer1234$
        이순신
        25
        --------------------
        sunsin
        qwer1234$
        이순신
        38
        --------------------
    */

    member_arr = arr_member.filter(item => item.name.trim() == "양혜정");   // 없는 이름 
    console.log(member_arr);
    // [] 


    //////////////////////////////////////////////////////////////

    // ---- **** 배열명.findIndex() **** ----
    // ES6에서 새로 도입된 메소드로서 판별함수의 조건에 만족하는 배열요소가 있으면 첫번째 배열요소의 인덱스번호만 리턴 시켜주고 끝내고, 
    // 판별함수의 조건에 만족하는 배열요소가 없으면 -1 이 나온다.

    // ==> 배열 arr_member 에서 나이가 20대인 회원의 배열인덱스번호를 출력시켜보자. <== // 
    //  20    ==> 2     21 ==> 2         27 ==> 2        29 ==> 2
    //  20/10 ==> 2     21/10 ==> 2.1    27/10 ==> 2.7   29/10 ==> 2.9
    //  Math.floor(2)   ==> 2   
    //  Math.floor(2.1) ==> 2  
    //  Math.floor(2.7) ==> 2  
    //  Math.floor(2.9) ==> 2
    //  parseInt("2.9") ==> 2

    let idx = arr_member.findIndex(item => Math.floor(item.age/10) == 2); 
    console.log(idx);
    // 0

    // === !!!! 암기  배열명.findIndex() 은 고유한 값(primary key)으로 검색할 때 사용한다. !!! === // 
    idx = arr_member.findIndex(item => item.userid == "seokj"); 
    console.log(idx);
    // 2

    console.log(arr_member[idx]);
    // {userid: 'seokj', passwd: 'qwer1234$', name: '서강준', age: 23}

    if(idx != -1) {     // 존재한다면
        for(let property_name in arr_member[idx]) {
            console.log(arr_member[idx][property_name]);
        }
    }
    /*
        seokj
        qwer1234$
        서강준
        23
    */

    idx = arr_member.findIndex(item => item.userid == "yanghyejoung"); 
    console.log(idx);
    // -1

    if(idx == -1) {
        console.log("userid 가 yanghyejoung 인 회원은 없습니다.");
    }
    else {
        console.log(arr_member[idx]);
    }
    // userid 가 yanghyejoung 인 회원은 없습니다.


    // ---- **** 배열명.some() **** ----
    // 배열명에서 판별함수의 조건에 만족하는 배열요소가 하나라도 있으면 true 를 리턴 시켜주고 조건검사를 중지한다.
    // 배열명에서 판별함수의 조건에 만족하는 배열요소가 하나라도 없으면 false 를 리턴 시켜준다.

    arr_member.push({userid:"teen", 
                    passwd:"qwer1234$", 
                    name:"나어려", 
                    age:12});    

    let bool = arr_member.some(item => item.age < 20);

    console.log(bool);
    // true

    if( arr_member.some(item => item.age < 20) ) {
        console.log("회원중에 20대 미만인 회원이 존재합니다.");
    }
    else {
        console.log("모든 회원들의 나이는 20세 이상입니다.");
    }
    // 회원중에 20대 미만인 회원이 존재합니다.



    // ---- **** 배열명.every() **** ----
    // 배열명에서 판별함수의 조건에 만족하는 배열요소가 하나라도 없으면 false 를 리턴 시켜주고 조건검사를 중지한다.
    // 배열명에서 판별함수의 조건에 만족하는 배열요소가 모두 존재해야만 true 를 리턴 시켜준다.

    bool = arr_member.every(item => item.age >= 10);
    console.log(bool); 
    // true

    bool = arr_member.every(item => item.age >= 30);
    console.log(bool);
    // false

    if( arr_member.every(item => item.age >= 10) ) {
        console.log("모든 회원들의 나이는 10세 이상입니다.");
    }
    else {
        console.log("회원중에 나이가 10세 미만인 회원이 존재합니다.");
    }
    // 모든 회원들의 나이는 10세 이상입니다.
    
    }   // end of window.onload = function()---------------------------