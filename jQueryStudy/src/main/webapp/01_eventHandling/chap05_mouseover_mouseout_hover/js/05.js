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
        $("div#seconddiv").hide();
    })  // end of $("div#container > div#firstdiv > span.buttons").hover--------------------

})  // end of $(document).ready(function(){})-----------------