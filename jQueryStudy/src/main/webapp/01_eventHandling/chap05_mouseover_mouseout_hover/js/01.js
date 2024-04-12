$(document).ready(function(){

    const arr_person = [{name:"김태희", filename:"kimth.jpg", address:"서울 강동구", email:"kimth@gmail.com"}  
                       ,{name:"아이유", filename:"iyou.jpg", address:"서울 강서구", email:"iyou@gmail.com"}
                       ,{name:"박보영", filename:"parkby.jpg", address:"서울 강남구", email:"parkby@gmail.com"}]; 

    let html = ``;

    arr_person.forEach((item, index) => {

        html += `<span class='buttons' id='${index}'>${item.name}</span>`;

    })  // end of arr_person.forEach((item, index) => {})----------

    $("div#firstdiv").html(html);

    // $("div#container > div#firstdiv > span.buttons").bind('mouseover', function(e){
    // 또는
    // $("div#container > div#firstdiv > span.buttons").mouseover(e => {
    // 또는
    $("div#container > div#firstdiv > span.buttons").mouseover(function(e){

        // 마우스 올린 곳의 이름 알아오기
        // console.log($(e.target).text());    // 김태희   아이유  박보영

        // console.log($(e.target).attr('class'));         // buttons  buttons buttons
        // console.log($(e.target).attr('id'));            // 0    1   2

    /*
        ===== 선택자의 class 명 알아오기 =====
            선택자.attr('class')  또는  선택자.prop('class')  
         
        ===== 선택자의 id 명 알아오기 =====
            선택자.attr('id')  또는  선택자.prop('id')
                  
        ===== 선택자의 name 명 알아오기 =====   
            선택자.attr('name')  또는  선택자.prop('name')
         
                     
        >>>> .prop() 와 .attr() 의 차이 <<<<            
        .prop() ==> form 태그내에 사용되어지는 엘리먼트의 disabled, selected, checked 의 속성값 확인 또는 변경하는 경우에 사용함. 
        .attr() ==> 그 나머지 엘리먼트의 속성값 확인 또는 변경하는 경우에 사용함.
    */

        const i = Number($(e.target).attr('id'));   // 0    1   2

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

    })  // end of $("div#container > div#firstdiv > span.buttons").bind('mouseover', function(e){})-----------

//////////////////////////////////////////////////////////////////////////////////

// $("div#container > div#firstdiv > span.buttons").bind('mouseout', function(e){
// 또는
// $("div#container > div#firstdiv > span.buttons").mouseout(function(e){
$("div#container > div#firstdiv > span.buttons").mouseout(e => {
    $(e.target).css({"background-color":"", "color":""});
    $("div#seconddiv").hide();
})  // end of $("div#container > div#firstdiv > span.buttons").bind('mouseout', function(e){})-------

})  // end of $(document).ready(function(){})-----------------