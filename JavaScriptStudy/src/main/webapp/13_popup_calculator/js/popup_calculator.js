window.onload = function(){
    const arr_product = [
        {productId : "led",
         productName : "led모니터",
         image : "monitor.jpg",
         price : 200000,
         option : [
                     {optionId:"HDMI",      optionName : "HDMI케이블", price : 1000},
                  {optionId:"3Dglasses", optionName : "3D안경",    price : 2000} 
                 ] 
         },
        {productId : "camcorder",
         productName : "캠코더",
        image : "cam.jpg",
        price : 500000,
        option : [
                   {optionId:"3Pedestal", optionName : "3각받침대", price : 10000}, 
                     {optionId:"limokon",   optionName : "리모컨",   price : 20000},
                  {optionId:"charger",   optionName : "충전기",   price : 30000}
                ] 
        }
    ];

    let html = `<table id='tbl'>
                <thead>
                    <tr>
                        <th colspan='4'>제품선택</th>
                    </tr>
                    <tr>
                        <th width='22%'>제품사진</th>
                        <th width='30%'>제품정보</th>
                        <th width='33%'>부속품</th>
                        <th width='15%'>주문금액</th>
                    </tr>
                </thead>
                <tbody>
              `;

    arr_product.forEach(function(item,index,array){
        html +=`<tr>
                    <td style='text-align:center;'>
                        <img src="images/${item.image}" title='클릭하면 원본이미지가 보입니다.'/>
                    </td>
                    <td>
                        <ul>
                            <li>
                                <label>제품명 : </label>
                                ${item.productName}
                            </li>
                            <li>
                                <label>가격 : </label>
                                <span>${item.price.toLocaleString('en')}</span>
                            </li>
                            <li>
                                <label>주문수량 : </label>
                                <input type='number' min='0' max='20' value='0' id='${item.productId}' />
                            </li>
                        </ul>
                    </td>
                    <td>`;
                    item.option.forEach(function (elt, i) {
                        html += `<label for='${elt.optionId}'>${elt.optionName}</label>
                                    <input type='checkbox' name='option_${item.productId}' value='${elt.price}' id='${elt.optionId}' />&nbsp;&nbsp;`;  
                    })
                    html += `</td>
                            <td>주문수량</td>
                        </tr>`;
    })  // end of forEach------------------------------------------

    html += `</tbody>
            <tfoot>
                <tr>
                    <td colspan='3'>주문총액</td>
                    <td>0</td>
                </tr>
            </tfoot>
            </table>`;

    // console.log(html);
    document.querySelector("div#view").innerHTML = html;

//////////////////////////////////////////////////////////////////////////////
    // === 이미지를 클릭하면 팝업창 띄우는 것 만들기 시작 === //
    const img_list = document.querySelectorAll("div#container > div#view > table#tbl > tbody > tr > td:first-child > img");

    for(let img of img_list){
        img.addEventListener('click',() =>{
            // console.log(img.src);
            /*
                http://192.168.0.192:5500/13_popup_calculator/images/monitor.jpg
                http://192.168.0.192:5500/13_popup_calculator/images/cam.jpg
            */
           
            open_popup(img.src);    // 팝업창을 띄워주도록 만든 함수를 호출하도록 하자.
           
        })
    }   // end of for~of-------------

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // === 함수 표현식 === //
    const open_popup = (src) => {
        // 팝업창 띄우기
        // 확인용
        // window.open("popup_contents.html", "my_popup", "left=100px, top=100px, width=400px, height=350px");
        
        // 팝업창 띄우기
        const popup = window.open("", "my_popup", "left=100px, top=100px, width=400px, height=350px");

        popup.document.writeln("<html>");

        popup.document.writeln("<head><title>제품이미지 확대보기</title></head>");
        popup.document.writeln("<body align='center'>");

        popup.document.writeln("<img src = '"+ src + "'/>");
        popup.document.writeln("<br><br><br>")
        popup.document.writeln("<button type='button' onclick='window.close()'>팝업창닫기</button>")
        popup.document.writeln("</body></html>");
    }   // end of function open_popup(src)-----------
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
    // === 이미지를 클릭하면 팝업창 띄우는 것 만들기 끝 === //
/////////////////////////////////////////////////////////////////////////////
}   // end of window.onload = function()----------------------

// ======================================================================================== //
// === 함수 선언식 ===//
function open_popup(src){
    // 팝업창 띄우기
    // 확인용
    // window.open("popup_contents.html", "my_popup", "left=100px, top=100px, width=400px, height=350px");
    
    // 팝업창 띄우기
    const popup = window.open("", "my_popup", "left=100px, top=100px, width=400px, height=350px");

    popup.document.writeln("<html>");

    popup.document.writeln("<head><title>제품이미지 확대보기</title></head>");
    popup.document.writeln("<body align='center'>");

    popup.document.writeln("<img src = '"+ src + "'/>");
    popup.document.writeln("<br><br><br>")
    popup.document.writeln("<button type='button' onclick='window.close()'>팝업창닫기</button>")
    popup.document.writeln("</body></html>");

}   // end of function open_popup(src)-----------
// ======================================================================================= //