window.onload = function(){
    /*    
    const arr_person = [{name:"아이유", photo:"iyou.jpg",   age:28, address:"서울시 강동구", special:"가수 겸 탤런트<br/>팬들이 많음"},
                         {name:"김태희", photo:"kimth.jpg",  age:27, address:"서울시 강서구", special:"탤런트<br/>팬들이 많음"},
                         {name:"박보영", photo:"parkby.jpg", age:26, address:"서울시 강남구", special:"탤런트 및 영화배우<br/>팬들이 많음"}]; 
    */
  
    // 위의 처럼 하지 않고 ES6(ECMAScript 6) 나온 class 를 사용하여 만들어 보겠다.
    
    // JavaScript Class 는 ES6(ECMAScript 6) 이다.
    /* 
        >> 문법 << 
        class ClassName {
         
            속성명 = 초기값;
            
            constructor() { ... }
            
            set xxx(value) {  // 세터
                this.속성명 = value;
            }
            
            get xxx() { return this.속성명; }  // 게터
            
            method_1() { ... }
            method_2() { ... }
            method_3() { ... }
        }
    */

    class Member{

        // birthYear = 0;   // birthYear 의 접근제한자는 public 이며, 외부에서도 접근이 가능하다.
        #birthYear = 0;     // #birthYear 의 접근제한자는 private 이며, 이것은 클래스안에서만 접근이 가능하다.
                            // 접근제한자 private 은 속성(프로퍼티)명 앞에 # 을 붙인다.  
    
        // 생성자 함수
        constructor(name,photo,address,special) {
            this.name = name;
            this.photo = photo;
            this.address = address;
            this.special = special;
        }

        // Setter //
        set setBirthYear(value){

            if(isNaN(value)){
                throw new Error('생년은 숫자로만 가능합니다.');
            }
            else{
                if(value <= 0){
                    throw new Error('생년은 0 또는 음수가 될 수 없습니다.');
                    // 사용자가 정의하는 오류를 발생시킨다. F12(개발자도구) 콘솔창에 오류메시지가 나타난다.
                }
                else{
                    this.#birthYear = value;
                }
            }

        }

        // Getter //
        get getBirthYear(){
            return this.#birthYear;
        }

        // 나이를 알려주는 함수
        age(){
            const currentDate = new Date(); // 자바스크립트에서 현재 날짜및시각을 알아오는 것
            // currentDate.getFullYear(); // 현재 년도 이다.

            return currentDate.getFullYear() - this.#birthYear + 1; // 현재 한국나이

        };

    }   // end of class Member---------------------------------

    const iyou_mbr = new Member("아이유", "iyou.jpg", "서울시 강동구", "가수 겸 탤런트&nbsp;팬들이 많음");
    
    /* public 일 경우
    // birthYear 은 public 이므로 외부에서 직접적으로 접근이 가능하다. 그러므로 생년에 음수도 입력이 가능함.
     iyou_mbr.bitrthYear = -1995;

    // #birthYear 은 private 이므로 외부에서 직접적으로 접근이 불가하다.
      Uncaught SyntaxError: Private field '#birthYear' must be declared in an enclosing class
      iyou_mbr.#birthYear = 1995;
    */
   
    // == 잘못된 경우 == //
    // iyou_mbr.setBirthYear(1995); // 잘못된 세터를 호출함
    // [주의사항] 위와 같이 iyou_mbr.setBirthYear(1995); 하면 아래와 같은 오류가 뜬다. 
    // Uncaught TypeError: iyou_mbr.setBirthYear is not a function

    // == 올바른 경우 == //
    // iyou_mbr.setBirthYear = "하하헤헤헤~~";       // 세터를 호출함.
    // Uncaught Error: 생년은 숫자로만 가능합니다.
    // iyou_mbr.setBirthYear = "-1995";             // 세터를 호출함.
    // Uncaught Error: 생년은 0 또는 음수가 될 수 없습니다.

    iyou_mbr.setBirthYear = "1995";                 // 세터를 호출함

    // == 잘못된 경우 == //
    // console.log(iyou_mbr.getBirthYear());   // 잘못된 게터를 호출함
    // [주의사항] 위와 같이 iyou_mbr.getBirthYear() 하면 아래와 같은 오류가 뜬다. 
    // Uncaught TypeError: iyou_mbr.getBirthYear is not a function

    // == 올바른 경우 == //
    console.log(iyou_mbr.getBirthYear);             // 게터를 호출함
    // 1995

    console.log(iyou_mbr.age());    // 30

///////////////////////////////////////////////////////////////////////////////////

    const kimth_mbr = new Member("김태희", "kimth.jpg", "서울시 강서구", "탤런트&nbsp;팬들이 많음"); 
    kimth_mbr.setBirthYear = 1996; // 세터를 호출함. 
    
    const parkby_mbr = new Member("박보영", "parkby.jpg", "서울시 강남구", "탤런트 및 영화배우&nbsp;팬들이 많음"); 
    parkby_mbr.setBirthYear = 1997; // 세터를 호출함.

    const arr_member = [];  // 아이유, 김태희, 박보영을 배열 속에 넣기
    arr_member.push(iyou_mbr);
    arr_member.push(kimth_mbr);
    arr_member.push(parkby_mbr);

////////////////////////////////////////////////////////////////////////////////////

    const select_obj = document.querySelector("select#select");     // select 개체

    let html = `<option>선택하세요</option>`;

    arr_member.forEach(item =>{
        html += `<option>${item.name}</option>`;
    })

    select_obj.innerHTML = html;

//////////////////////////////////////////////////////////////////////////////////

    // !!!! select 태그의 이벤트는 click 이 아니라 change 이다. !!!! //
    /*
      select_obj.onchange = function(){};  
      select_obj.onchange = ()=>{};
      select_obj.addEventListener('change', function(){});
      select_obj.addEventListener('change', ()=>{});
    */ 

    /* 아래의 방법처럼 사용할 경우 안됨( 아래 주석글 참고하기 )
    => const n_selectedIndex = this.selectedIndex;
    => 화살표 함수를 사용할 시 this 를 인식하지 못하므로 this를 사용하려면 화살표함수를 사용하지 말아야 한다.
    select_obj.addEventListener('change', function() {
        const n_selectedIndex = this.selectedIndex;   // this 가 가능하다.
 
        alert(n_selectedIndex);
    });
    */

    // 4가지 방법 동일, 그 중 마지막꺼 사용
    select_obj.addEventListener('change', () => {
        const n_selectedIndex = select_obj.selectedIndex;   // ★ 꼭 암기하기 ★
        // !!!! select_obj.selectedIndex 은 <option>태그의 index 번호를 말한다. !!!!
        // 즉, 첫번째 <option>태그는 0 이고, 두번째 <option>태그는 1 이고, 세번째 <option>태그는 2 이고, 네번째 <option>태그는 3 이다. ~~~  
         
        // 화살표 함수는 this 를 인식하지 못하므로 select_obj.selectedIndex; 와 같이 해야만 한다.
        // 그런데 화살표 함수가 아닌 function(){} 을 사용하면 select_obj.selectedIndex; 대신에 this.selectedIndex; 를 사용할 수 있다. 
        // 이때 this 는 이벤트가 발생된 이벤트소스 자기자신을 가리키는 것이다. 
          
        // alert(n_selectedIndex);
        /*
            <option>선택하세요</option>은 n_selectedIndex 가 0
            <option>아이유</option>은 n_selectedIndex 가 1
            <option>김태희</option>은 n_selectedIndex 가 2
            <option>박보영</option>은 n_selectedIndex 가 3 이 된다.
        */

        const idx = n_selectedIndex -1;     // 인덱스 -1 을 하면 멤버들의 배열 순서
        // console.log(arr_member[idx]);
        /*
             arr_member[0] 은 iyou_mbr 이고,
             arr_member[1] 은 kimth_mbr 이고,
             arr_member[2] 은 parkby_mbr 이다.
        */

////////////////////////////////////////////////////////////////////////////////

    /* if문 처리하기 전(선택하세요의 경우에도 이미지가 보인다.)
        const img = document.querySelector("div#person > img#img");
        
        // constructor(name,photo,address,special) 참고
        img.src = `images/${arr_member[idx].photo}`;
    */

        if(idx < 0){    // "선택하세요" 로 변경되었을 경우
            document.querySelector("div#person").style.display = "none";
        }
        else{
            const img = document.querySelector("div#person > img#img");
        
            // constructor(name,photo,address,special) 참고
            img.src = `images/${arr_member[idx].photo}`;
            img.width = '119';  // '119px' 하면 이미지가 안보인다.
            img.height = '149'; // '149px' 하면 이미지가 안보인다.

            document.querySelector("div#person").style.display = "";
            // CSS 에 적용된 내용대로 display를 적용시켜라는 말이다.
            // 그런데 CSS 에 적용된 것이 없다라면 div 의 display 기본값인 "block" 으로 되어진다.
        
        ///////////////////////////////////////////////////////////////////////////
        // 마무리하기(적용)

            html = `<ul>
                      <li><label>성명</label>${arr_member[idx].name}</li>
                      <li><label>생년</label>${arr_member[idx].getBirthYear}</li>  ${'' /* 게터를 호출함. 주의사항 arr_member[idx].getBirthYear() 와 같이 하면 오류이다. */}  
                      <li><label>나이</label>${arr_member[idx].age()}세</li>
                      <li><label>주소</label>${arr_member[idx].address}</li>
                      <li><label>특이사항</label>${arr_member[idx].special}</li>
                    </ul>`;

            document.querySelector("div#information").innerHTML = html;

        }

    });     // end of select_obj.addEventListener('change', () => {}-------------

//////////////////////////////////////////////////////////////////////////////////////

    // 프로그램 실행 시 이미지 바로 뜨게 하기
    /* !!!!! ◆◆◆ >>>>> 중요 <<<<<< ◆◆◆ !!!!!
      
    >>>> 자바스크립트에서 자동으로 select 태그에 change 이벤트 발생 시키기 <<<<
        document.querySelector("select#select").value = "아이유";
        document.querySelector("select#select").dispatchEvent(new Event('change'));

    >>>> jQuery 에서 자동으로 select 태그에 change 이벤트 발생 시키기 <<<<
        $("select#select").val("아이유").trigger('change');
    */

    // 위에서 이미 
    // const select_obj = document.querySelector("select#select"); 이라고 만들어 두었다.

    select_obj.value = "아이유";
    select_obj.dispatchEvent(new Event('change'));

}   // end of window.onload = function()-----------------------------