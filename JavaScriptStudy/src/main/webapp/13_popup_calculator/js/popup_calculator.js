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
                                <span id='${item.productId}' >${item.price.toLocaleString('en')}</span>
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
                            <td id='${item.productId}'>0</td>
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

    // === 주문수량이 바뀌면 주문금액에 값을 넣어주기 그리고 부속품중 체크를 한 부속품에 대해서만 부속품 금액을 주문금액에 값을 넣어주기 시작 === //
    const input_number_list = document.querySelectorAll("table#tbl > tbody > tr > td > ul > li > input[type='number']");
    const checkbox_list = document.querySelectorAll("table#tbl > tbody > tr > td > input[type='checkbox']");

    // === 주문수량 이벤트 처리하기 시작 === //
    for(let input_number of input_number_list){

        input_number.addEventListener('change',() => {

            // console.log("확인용", input_number.id);      // ID 값
            /*
                확인용 led
                확인용 camcorder
            */

            // console.log("확인용 input_number.value => ", input_number.value);    // 주문수량
            /*
                확인용 input_number.value =>  1
                확인용 input_number.value =>  2
            */
            
            const str_price = document.querySelector(`span#${input_number.id}`).innerText.split(",").join("");
            
            // console.log("확인용 str_price => ", str_price);  // 가격
            /*
                확인용 str_price =>  200000
                확인용 str_price =>  500000
            */

            // 주문수량에 대한 금액 알아오기
            const su_price = Number(str_price) * Number(input_number.value);
            // console.log("확인용 su_price => ", su_price);
            //  확인용 su_price =>  200000      // 가격 * 주문수량

            // 주문수량에 변경을 준 제품에 대한 부속품 체크박스 중 체크가 되어진 부속품의 금액 알아오기
            let option_price = 0;
            
            checkbox_list.forEach(elmt => {
                if(elmt.checked && (elmt.name == 'option_' + input_number.id)){   
                    // 체크가 되어야만 검사하기 시작 && 체크박스의 이름이 제품의 ID 값과 동일한 경우
                    option_price += Number(elmt.value);
                }
            });

            // 각 제품 당 주문금액
            // console.log("확인용 su_price + option_price => ", (su_price + option_price));
            
            let total_price = 0;

            // 주문수량이 0개 이라면 부속품 체크박스는 모두 체크해제로 만든다.
            if(Number(input_number.value) == 0){
                checkbox_list.forEach(elmt =>{
                    if(elmt.name == 'option_' + input_number.id){
                        elmt.checked = false;
                    }
                })
                
            }

            // 주문수량이 1개 이상이라면 (제품수량 * 단가 + 체크박스에 체크된 부속품 가격)을 구해온다.
            else{
                total_price = su_price + option_price;
            }

            document.querySelector("table#tbl td#" + input_number.id).innerHTML = total_price.toLocaleString('en');
        
        
            // === 모든 제품에 대한 주문총액 함수 호출하기 === //
            sumPrice();
        
        
        })  // end of input_number.addEventListener('change',() => {})----------------

    }   // end of for~of--------------
    // === 주문수량 이벤트 처리하기 끝 === //
    // === 주문수량이 바뀌면 주문금액에 값을 넣어주기 그리고 부속품중 체크를 한 부속품에 대해서만 부속품 금액을 주문금액에 값을 넣어주기 끝 === //

///////////////////////////////////////////////////////////////////////////////////////

    // === 부속품 체크박스 이벤트 처리하기 시작 === //
    for(let checkbox of checkbox_list){

        checkbox.addEventListener('click',() => {

            // console.log(checkbox.name);      // 체크박스의 이름 확인
            /*
                option_led
                option_camcorder
            */

            // 클릭한 체크박스의 name 에서 productId 만 가져오기
            const id = checkbox.name.substring(7);
            // 또는
            // checkbox.name.slice(7);
            // console.log(id);

    ///////////////////////////////////////////////////////////////////////////////////////////////

            // 주문수량에 대한 금액 알아오기
            // 주문 개수
            const su = document.querySelector("table#tbl input[type='number']#" + id).value;
            // console.log("확인용 su => ", su);
            // 확인용 su =>  1

            // 단가
            const price = document.querySelector("table#tbl span#" + id).innerText.split(",").join("");
            // console.log("확인용 price => ", price);
            // 확인용 price =>  200000
            
            // 수량 * 단가
            const su_price =  Number(su) * Number(price);

            // ===체크박스에 선택한 부속품의 금액 알아오기 === //
            let option_price = 0;
            
            checkbox_list.forEach(elmt => {
                if(elmt.checked && (elmt.name == 'option_' + id)){   
                    // 체크가 되어야만 검사하기 시작 && 체크박스의 이름이 제품의 ID 값과 동일한 경우
                    option_price += Number(elmt.value);
                }
            });

            // 각 제품 당 주문금액
            // console.log("확인용 su_price + option_price => ", (su_price + option_price));
            
            let total_price = 0;

            if(su == '0'){
                alert("주문수량이 0개 이므로 부속품을 선택할 수 없습니다.");
                checkbox.checked = false;
            }
            else{
                total_price = su_price + option_price;
            }

            document.querySelector("table#tbl td#" + id).innerHTML = total_price.toLocaleString('en');

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // === 모든 제품에 대한 주문총액 함수 호출하기 === //
            sumPrice();

        })  // end of checkbox.addEventListener('click',() => {})------------------------------

    }   // end of for~of---------------------
    // === 부속품 체크박스 이벤트 처리하기 끝 === //

//////////////////////////////////////////////////////////////////////////////////////////

    // === 모든 제품에 대한 주문총액 함수 만들기 시작 === //
    const sumPrice = function(){

        let sum = 0;
        document.querySelectorAll("table#tbl > tbody > tr > td:last-child").forEach((elmt)=>{
            sum += Number(elmt.innerText.split(",").join(""));
        });
        
        document.querySelector("table#tbl > tfoot > tr > td:last-child").innerHTML = sum.toLocaleString('en');
    };

    // === 모든 제품에 대한 주문총액 함수 만들기 끝 === //

//////////////////////////////////////////////////////////////////////////////////////////////

    // 주문수량 keyup 이벤트 처리하기
/*
    이벤트 소스인 document.querySelectorAll("table#tbl input[type='number']") 을
    이미 위에서 const input_number_list 로 선언해두었다.
*/
    for(let input_number of input_number_list){
        input_number.addEventListener('keyup',() =>{
            alert("주문수량은 마우스로만 입력하세요.");
            input_number.value = "0";
        })
    }   // end of for~of-----------

}   // end of window.onload = function()----------------------

// ======================================================================================== //
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
