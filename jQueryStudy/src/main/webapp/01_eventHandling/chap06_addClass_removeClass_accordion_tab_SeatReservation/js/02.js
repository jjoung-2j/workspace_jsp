$(document).ready(function(){

    const arr_btn = [{color:"red", hangul:"빨강"}
                  ,{color:"orange", hangul:"주황"}
                  ,{color:"yellow", hangul:"노랑"}
                  ,{color:"green", hangul:"초록"}
                  ,{color:"blue", hangul:"파랑"}
                  ,{color:"navy", hangul:"남색"}
                  ,{color:"purple", hangul:"보라"}
                 ];

    let html = `<span>버튼을 눌러보세요</span>`;

    arr_btn.forEach(item => {
        html += `<button type='button'>${item.color}</button>`;
    })

    $("div#btnsDiv").html(html);

    $("div#container > div#btnsDiv > button").click(function(e){

        const i =  $("div#container > div#btnsDiv > button").index($(e.target));  
        // console.log(i);
        //  선택자.index(특정엘리먼트); 
        // ==> 선택자가 복수개 엘리먼트를 가리키는 것일때 특정엘리먼트가 복수개 엘리먼트중 몇 번째 index 값을 가지는지를 알려주는 것이다.

        const color = arr_btn[i].color;

        $('div#colorDiv').css({'width':'150px','height':'150px','background-color':`${color}`});
        $('div#hangulDiv').html(`${arr_btn[i].hangul}`);
        $('div#hangulDiv').css({'color': `${color}`});

    })  // end of $("<button>${item.color}</button>").click(function(e){})-------

    // trigger 설정
    $("div#container > div#btnsDiv > button").eq(0).trigger('click');

})      // end of $(document).ready(function(){})-------------------