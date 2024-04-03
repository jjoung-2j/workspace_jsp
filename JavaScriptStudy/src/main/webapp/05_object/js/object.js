window.onload = function(){

    const member = {
        id: "leess"
        , passwd : "qwer1234$"
        , name : "이순신"
        , address : "서울시 마포구"
        , mobile : "010-2345-6789"

        , info1 :function(){    // 오리지널 기법
            return this.id + " " + this.name + " " + this.address; 
        }

        // ECAMScript 6 에서는 속성값이 함수이면 function 키워드 없이 함수명만 적으면 된다.
        , info2(){              // ECAM 6 기법
            return this.id + " " + this.name + " " + this.address; 
        }

        , info3(salary){
            return salary * 3;
        }

    }

    document.getElementById("div_1").innerHTML = member.info1;
    // function(){ // 오리지널 기법 return this.id + " " + this.name + " " + this.address; }

    document.getElementById("div_2").innerHTML = member.info1();    // 함수니까 () 을 꼭 해주어야 한다.
    // leess 이순신 서울시 마포구

    /* 
      member 의 형태가 const 이므로 member 의 객체를 다른 객체로 변경할 수는 없는 것이지 
      member 객체의 필드값은 변경이 가능하다.!!!! 
    */
    member.id = "eomjh";
    member.name = "엄정화";
    member.address = "경기도 군포시";

    document.getElementById("div_3").innerHTML = member.info1();
    // eomjh 엄정화 경기도 군포시

    document.getElementById("div_4").innerHTML = member.info2();
    // eomjh 엄정화 경기도 군포시

    console.log(member.info3(100));     // 300

}   // end of window.onload = function()------------------------------------------------