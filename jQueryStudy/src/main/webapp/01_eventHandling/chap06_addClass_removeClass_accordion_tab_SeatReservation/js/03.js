$(document).ready(function(){
    const arr_btn = [{seatName:"A1", x:0, y:0, reservation_status:0}
                  ,{seatName:"A2", x:1, y:0, reservation_status:0}
                  ,{seatName:"A3", x:2, y:0, reservation_status:0}
                  ,{seatName:"A4", x:3, y:0, reservation_status:0}
                  ,{seatName:"A5", x:4, y:0, reservation_status:0}
                  ,{seatName:"A6", x:5, y:0, reservation_status:0}
                  ,{seatName:"A7", x:6, y:0, reservation_status:0}
                  ,{seatName:"A8", x:7, y:0, reservation_status:0}
                  ,{seatName:"A9", x:8, y:0, reservation_status:0}
                  ,{seatName:"A10", x:9, y:0, reservation_status:0}
                  ,{seatName:"B1", x:0, y:1, reservation_status:0}
                  ,{seatName:"B2", x:1, y:1, reservation_status:0}
                  ,{seatName:"B3", x:2, y:1, reservation_status:0}
                  ,{seatName:"B4", x:3, y:1, reservation_status:1}
                  ,{seatName:"B5", x:4, y:1, reservation_status:1}
                  ,{seatName:"B6", x:5, y:1, reservation_status:0}
                  ,{seatName:"B7", x:6, y:1, reservation_status:0}
                  ,{seatName:"B8", x:7, y:1, reservation_status:0}
                  ,{seatName:"B9", x:8, y:1, reservation_status:0}
                  ,{seatName:"B10", x:9, y:1, reservation_status:0}
                  ,{seatName:"C1", x:0, y:2, reservation_status:0}
                  ,{seatName:"C2", x:1, y:2, reservation_status:0}
                  ,{seatName:"C3", x:2, y:2, reservation_status:0}
                  ,{seatName:"C4", x:3, y:2, reservation_status:0}
                  ,{seatName:"C5", x:4, y:2, reservation_status:0}
                  ,{seatName:"C6", x:5, y:2, reservation_status:0}
                  ,{seatName:"C7", x:6, y:2, reservation_status:0}
                  ,{seatName:"C8", x:7, y:2, reservation_status:0}
                  ,{seatName:"C9", x:8, y:2, reservation_status:0}
                  ,{seatName:"C10", x:9, y:2, reservation_status:0}
                 ];

/////////////////////////////////////////////////////////////////////////////////////////////////////////
                
    $("div#container > div#age_cnt_div > button:reset").prop("disabled",true);
    $("div#container > div#reservation_div").hide();
    $("div#container > div#sum_pay").hide();    // 다시 좌석지정을 할 경우 메시지가 뜨지않게 하기

    let age = "";
    let cnt = 0;           

    $(document).on('click',"div#container > div#age_cnt_div > button#seat_btn", function(){

        age = $("div#container > div#age_cnt_div > select").val();
        cnt = Number($("div#container > div#age_cnt_div > input").val());

        if(age == "" || cnt == 0){
            alert("연령대와 예매수를 지정하세요!!");
        }
        else{
            $("div#container > div#reservation_div").show();
        }

    })  // end of $(document).on('click',"div#container > div#age_cnt_div > button#seat_btn", function(){})------

    let html = `<div>예매하실 좌석을 클릭하세요</div>`;
    $("div#container > div#reservation_div > div#titleDiv").html(html)

    html = `<div>스크린</div>`;
    $("div#container > div#reservation_div > div#screenDiv").html(html)

//////////////////////////////////////////////////////////////////////////////////

    html = ``;

    arr_btn.forEach((item,index) => {

        // 좌석 배치
        if(`${item.reservation_status}` == 0){
            html += `<button type='button'>${item.seatName}</button>`;
        }
        else{
            html += `<button type='button' style='background-color:red; color:white; font-size:14pt;'>예매불가</button>`;
        }

        // 좌석라인
        if((index+1)%10 == 0){
            html += `<br>`;
        }

        // 통로
        if((index+1)%10 == 5){      // 5로 나누면 10이 겹치기 때문에 10으로 표현
            // html += `<span>통로</span>`;     // 확인용
            html += `<span></span>`
        }

    })  // end of foreach-------------

    $("div#container > div#reservation_div > div#btnsDiv").html(html);

////////////////////////////////////////////////////////////////////////////////////////

    let sum_pay = 0;    // 가격

    // 좌석버튼 클릭시 
    $(document).on('click','div#container > div#reservation_div > div#btnsDiv > button',e => {

        const idx = $('div#container > div#reservation_div > div#btnsDiv > button').index($(e.target));
        //  선택자.index(특정엘리먼트); 
        // ==> 선택자가 복수개 엘리먼트를 가리키는 것일때 특정엘리먼트가 복수개 엘리먼트중 몇 번째 index 값을 가지는지를 알려주는 것이다.

        // 자바스크립트에서 숫자를 문자형태로 변환은 ==> 숫자.toString() 또는 String(숫자)
        // alert(arr_btn[idx].x.toString() + arr_btn[idx].y.toString());   // 좌표값 : xy
      
        // 자바스크립트에서 숫자를 알파벳으로 변환은 ==> String.fromCharCode(숫자);
        // alert(String.fromCharCode(65));     // A
      
        // 자바스크립트에서 알파벳을 숫자로 변환은  ==> "A".charCodeAt(0);
        // alert("A".charCodeAt(0));           // 65

        const reservation_status = arr_btn[idx].reservation_status;

        // console.log(reservation_status);

        if(reservation_status == 0 && cnt > 0){    // 빈 좌석인 경우 + 예매 가능수가  0 이상
            alert(`앞으로 좌석예매를 ${cnt}번 하셔야 합니다.`);
            
            const seatName = String.fromCharCode(arr_btn[idx].y+65) + (arr_btn[idx].x+1);

            if(confirm(`${seatName} 좌석을 ${age}예매하시겠습니까?`)){
            // confirm(`${arr_btn[idx].seatName} 좌석을 ${age}예매하시겠습니까?`);
                alert(`${seatName} 좌석을 예약하셨습니다.`);
                
                cnt--;  // 예매수
                arr_btn[idx].reservation_status = 1;   // 더이상 예매하지 못하게 하기

                $(e.target).html(`${age}`).css({'background-color':'red', 'color':'white','font-size':'14pt'});
                // $(e.target).html(`예매완료`).css({'background-color':'red', 'color':'white','font-size':'14pt'});

                // === 금액 알려주기 === //
                switch (`${age}`) {
                    case `성인`:
                        sum_pay += 14000;
                        break;
                    case '청소년':
                        sum_pay += 10000;
                        break;
                    case '어린이':
                        sum_pay += 8000;
                        break;
                }   // end of switch (`${age}`)------------------

                if(cnt == 0){   // 예매 횟수 만큼 좌석을 모두 선택한 경우
                    if(confirm("[주의] 예매를 계속 또 하시겠습니까?")){

                        $("div#container > div#age_cnt_div > select").val("");      // 연령대(select) 초기화
                        $("div#container > div#age_cnt_div > input").val("0");      // 예매수(input) 초기화 
                        $("div#container > div#reservation_div").hide();    // 좌석 화면 보이지 않게 하기

                        $("div#container > div#sum_pay").show();
                        $("div#container > div#sum_pay").html(`계속해서 예매가 진행중입니다.<br>좌석지정하기 버튼을 클릭하세요`);

                    }
                    else{   // 더 이상 예매를 진행하지 않고 예매종료를 할 경우

                        alert("예매가 종료되었습니다.");
                        $("div#container > div#age_cnt_div > select").val("");      // 연령대(select) 초기화
                        $("div#container > div#age_cnt_div > input").val("0");      // 예매수(input) 초기화 
                        $("div#container > div#age_cnt_div > button#seat_btn").prop("disabled", true);  // 좌석지정하기 버튼 disabled
                        $("div#container > div#age_cnt_div > button:reset").prop("disabled", false);    // 초기화 버튼 살리기

                        // 결제 금액 표시
                        $("div#container > div#sum_pay").show();
                        $("div#container > div#sum_pay").html(`결제금액 : <span style='color:red; font-weight:bolder;'>${sum_pay.toLocaleString('en')}</span>원`);

                        return;

                    }   // end of 예매를 계속 더 진행할 지 유무

                }   // end of 예매 횟수 만큼 좌석을 모두 선택한 경우
            }   // end of 선택한 좌석을 예매할 지 유무
            
        }   // 빈 좌석을 선택한 경우
        else if(reservation_status == 1 && cnt > 0){   // 좌석이 예매완료된 경우 + 예매 가능수가  0 이상
            alert("이미 예매 되어진 좌석입니다.");
        }
        else{   // 예매 가능수가 0 일때 버튼을 누른 경우
            alert("예매가 종료되었으므로 예매를 처음부터 다시하려면 초기화하기 버튼을 클릭하세요!!");
        }

    })  // end of $(document).on('click','div#container > div#reservation_div > div#btnsDiv > button',e => {})------

})  // end of $(document).ready(function(){})---------------