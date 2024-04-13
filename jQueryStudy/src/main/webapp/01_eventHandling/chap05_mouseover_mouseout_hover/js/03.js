$(document).ready(function(){

    const arr_person = [{name:"김태희", filename:"kimth.jpg", address:"서울 강동구", email:"kimth@gmail.com"}  
                       ,{name:"아이유", filename:"iyou.jpg", address:"서울 강서구", email:"iyou@gmail.com"}
                       ,{name:"박보영", filename:"parkby.jpg", address:"서울 강남구", email:"parkby@gmail.com"}]; 

    let html = ``;

    arr_person.forEach(item => {

        html += `<span class='buttons'>${item.name}</span>`;

    })  // end of arr_person.forEach(item => {})----------

    $("div#firstdiv").html(html);

    // $("div#container > div#firstdiv > span.buttons").bind('mouseover', function(e){
    // 또는
    // $("div#container > div#firstdiv > span.buttons").mouseover(e => {
    // 또는
    $("div#container > div#firstdiv > span.buttons").mouseover(function(e){

        const i =  $("div#container > div#firstdiv > span.buttons").index($(e.target));  
        console.log(i);     // 0    1   2

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