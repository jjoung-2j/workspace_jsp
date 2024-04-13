$(document).ready(function(){

    const arr_person = [{name:"김태희", filename:"kimth.jpg", address:"서울 강동구", email:"kimth@gmail.com"}  
                       ,{name:"아이유", filename:"iyou.jpg", address:"서울 강서구", email:"iyou@gmail.com"}
                       ,{name:"박보영", filename:"parkby.jpg", address:"서울 강남구", email:"parkby@gmail.com"}]; 

    let html = ``;

    arr_person.forEach(item => {

        html += `<span class='buttons'>${item.name}</span>`;

    })  // end of arr_person.forEach(item => {})----------

    $("div#firstdiv").html(html);

/////////////////////////////////////////////////////////////////////////////////

    /*
        선택자.hover(function(){} , function(){}); 
        ==> 첫번째 function(){} 은 mouseover 에 해당하는 내용을 기재하는 것이고,
            두번째 function(){} 은 mouseout 에 해당하는 내용을 기재하는 것이다.
    */
      
    /*   
        $(".buttons").bind("hover", function(event){}); 은 에러이다.
        왜냐하면 hover 는 이벤트가 아니라 jQuery 에서 제공해주는 함수(메소드)
    */

    $("div#container > div#firstdiv > span.buttons").hover(function(e){     // mouseover
        const i =  $("div#container > div#firstdiv > span.buttons").index($(e.target));  
        // console.log(i);     // 0    1   2

        $('div#face').html(`<img src='images/${arr_person[i].filename}'/>`);

        // html 초기화
        html = `<ol>
                    <li><span>성명</span>${arr_person[i].name}</li>
                    <li><span>주소</span>${arr_person[i].address}</li>
                    <li><span>이메일</span>${arr_person[i].email}</li>
               </ol>`;   

        $("div#comment").html(html);

        $(e.target).css({"background-color":"navy", "color":"white"});

        $("div#seconddiv").show();
    }, function(e){     // mouseout
        $(e.target).css({"background-color":"", "color":""});
    })  // end of $("div#container > div#firstdiv > span.buttons").hover--------------------

//////////////////////////////////////////////////////////////////////////////////
/*
    $("div#face > img").mouseover(function(){
        alert("확인용 : 이미지에 마우스를 올렸습니다.");
    })
    위와 같이 하였는데 실행되지 않아 아래와 같이 해야 한다.
*/
    // **** !!!! 중요 !!!! **** //
/*
    선택자를 잡을때 선택자가 <body>태그에 직접 기술한 것이라면 선택자를 제대로 잡을수가 있으나
    스크립트내에서 기술한 것이라면 선택자를 못 잡아올수도 있다.
    이러한 경우는 아래와 해야만 된다.
    $(document).on("이벤트종류", "선택자", function(){}); 으로 한다.
*/

    $(document).on("mouseover", "div#face > img", function(){
        // alert("확인용 : 이미지에 마우스를 올렸습니다.");
        
        // function(e) 일 경우
        // $(e.target).css({'width':'119px', 'height':'149px', 'border-radius':'50%'});
        // 또는
        // $(this).css({'width':'119px', 'height':'149px', 'border-radius':'50%'});
        // 또는
        $(this).addClass('image_custom');   // width 및 height 는 기존것 그대로 사용 됨
    }); 
    $(document).on("mouseout", "div#face > img", function(){
        // alert("확인용 : 이미지에 마우스가 벗어났습니다.");
        // function(e) 일 경우
        // $(e.target).css({'width':'', 'height':'', 'border-radius':''});
        // 또는
        // $(this).css({'width':'', 'height':'', 'border-radius':''});
        // 또는
        $(this).removeClass('image_custom');    // width 및 height 는 기존것 그대로 사용 됨
    }); 

})  // end of $(document).ready(function(){})-----------------