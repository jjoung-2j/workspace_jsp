
$(document).ready(function() {
   
    const arr_contents = [{'title':'Java', 
                           'content':'자바는 자바로 기술된 프로그램 개발 및 실행을 할 수 있는 소프트웨어 모임의 총칭이다. 자바 프로그램은 운영체제나 하드웨어에 의존하지 않는 바이트 코드인 추상적인 코드로 구현된다.'}
                         ,{'title':'Oracle DataBase',
                           'content':'오라클 데이터베이스는 미국 오라클사의 관계형 데이터베이스 관리 시스템의 이름이다. 현재 유닉스 환경에서 가장 널리 사용되는 RDBMS이다. 검색이나 업데이트용 언어로는 국제표준화기구의 표준 구조화 조회 언어와 PL/SQL을 지원한다.'} 
                         ,{'title':'HTML', 
                           'content':'HTML은 하이퍼텍스트 마크업 언어(HyperText Markup Language)라는 의미의 웹 페이지를 위한 마크업 언어다.'}
                         ,{'title':'CSS', 
                           'content':'CSS는 Casting Style Sheets의 약자로 html 요소들이 각종 디자인, 레이아웃 등 사용자에게 어떻게 보여지는지 정의하는 스타일 시트 언어입니다.'}
                         ,{'title':'JavaScript', 
                           'content':'자바스크립트는 1995년에 넷스케이프(Netscape)의 브렌던 아이크(Brendan Eich)에 의해 만들어졌습니다.'}
                         ,{'title':'jQuery',
                           'content':'jQuery는 HTML의 클라이언트 사이드 조작을 단순화 하도록 설계된 크로스 플랫폼의 자바스크립트 라이브러리다. 존 레식이 2006년 뉴욕 시 바캠프에서 공식적으로 소개하였다. jQuery는 오늘날 가장 인기있는 자바스크립트 라이브러리 중 하나이다.'} 
                         ];
                         
    let html = ``;
    
    arr_contents.forEach(item => {
       
       html += `<button class="accordion">${item.title}</button>
                 <div class="panel">
                    <p>${item.content}</p>
                  </div>`;
       
    });// end of arr_contents.forEach(function(item, index, array){})-------                    
    
    $("div#container").html(html);
                         
    
    // $("div.panel").hide();
    // 또는
    // $("div.panel").css({'display':'none'});
    // 또는 css 에 줄 값이 1개만 있는 경우라면 아래와 같이 할 수도 있다. 
       $("div.panel").css('display','none'); // 안 보이도록 한다.
       
       $("button.accordion").click(function(e){
          
          $("button.accordion").css({'background-color':'', 'color':''}); 
          $(e.target).css({'background-color':'navy', 'color':'white'}); 
          
          const $panel = $(e.target).next();
          // $(e.target).next(); 은 $(e.target) 엘리먼트의 형제태그중 $(e.target) 엘리먼트 바로 다음에 나오는 형제태그를 가리키는 것이다. 
          // 즉, <div class="panel"></div> 중에 하나를 말하는 것이다.
          /*
             선택자.next()는 이벤트가 발생되어진 곳의 바로 다음 형제태그(요소)를 선택자로 잡는 것임.
          */
       //  console.log("확인용 : ", $panel.html());
          /*
             <p>자바스크립트는 1995년에 넷스케이프(Netscape)의 브렌던 아이크(Brendan Eich)에 의해 만들어졌습니다.</p>
          */
       
       /*      
          const panel_display = $panel.css('display'); // CSS display 속성값을 읽어온다.
       //  console.log("확인용 : ", panel_display);
          // 확인용 :  none
          
          if(panel_display == 'none') {
             // $panel 의 display 상태가 보이지 않는 상태라면 
             $panel.css('display','');
          }
          else {
             // $panel 의 display 상태가 보이는 상태라면 
             $panel.css('display','none');
          }
        */      
          
          $panel.toggle();
       /*
          선택자 $panel 이 display 가 none 인 상태라면 선택자 $panel 을 보여주는 것이고,
          선택자 $panel 이 display 가 보여지는 상태라면 선택자 $panel 의 display 상태를 none 으로 해주는 것이다.    
       */
           
       });// end of $("button.accordion").click(function(e){})-------
         
       
       $("button.accordion").eq(0).trigger('click');
       
 }); // end of $(document).ready(function() {})-------------   
 
 
 
 