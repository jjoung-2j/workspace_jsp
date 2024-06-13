$(document).ready(function(){

    $("div.loader").hide();
    
    // ======= 추가이미지 캐러젤로 보여주기(Bootstrap Carousel 4개 표시 하되 1번에 1개 진행) 시작 ======= //
    $('div#recipeCarousel').carousel({
        interval : 2000 // 2000 밀리초(== 2초) 마다 자동으로 넘어가도록 함(2초마다 캐러젤을 클릭한다는 말이다.)
    });

    $('div.carousel div.carousel-item').each(function(index, elmt){
    
        // console.log($(elmt).html());
        
        /*    
        <img class="d-block col-3 img-fluid" src="/MyMVC/images/berkelekle단가라포인트033.jpg">
        <img class="d-block col-3 img-fluid" src="/MyMVC/images/berkelekle덩크043.jpg">
        <img class="d-block col-3 img-fluid" src="/MyMVC/images/berkelekle트랜디053.jpg">
        <img class="d-block col-3 img-fluid" src="/MyMVC/images/berkelekle디스트리뷰트063.jpg">
        */
    
        let next = $(elmt).next();      //  다음엘리먼트
        //  console.log(next.length); // 다음엘리먼트개수
        //  1  1  1  0

        // console.log("다음엘리먼트 내용 : " + next.html());
    /*     
        다음엘리먼트 내용 : <img class="d-block col-3 img-fluid" src="/MyMVC/images/berkelekle덩크043.jpg">
        다음엘리먼트 내용 : <img class="d-block col-3 img-fluid" src="/MyMVC/images/berkelekle트랜디053.jpg">
        다음엘리먼트 내용 : <img class="d-block col-3 img-fluid" src="/MyMVC/images/berkelekle디스트리뷰트063.jpg">
        다음엘리먼트 내용 : undefined
    */    
        if (next.length == 0) {   // 다음엘리먼트가 없다라면
                    
            // console.log("다음엘리먼트가 없는 엘리먼트 내용 : " + $(elmt).html());
            
            // 다음엘리먼트가 없는 엘리먼트 내용 : <img class="d-block col-3 img-fluid" src="/MyMVC/images/berkelekle디스트리뷰트063.jpg">
            
        
            //  next = $('div.carousel div.carousel-item').eq(0);
            //  또는   
            //   next = $(elmt).siblings(':first');     // 해당엘리먼트의 형제요소중 해당엘리먼트를 제외한 모든 형제엘리먼트중 제일 첫번째 엘리먼트
            //  또는 
            next = $(elmt).siblings().first(); // 해당엘리먼트의 형제요소중 해당엘리먼트를 제외한 모든 형제엘리먼트중 제일 첫번째 엘리먼트
                /* 
                선택자.siblings() 는 선택자의 형제요소(형제태그)중 선택자(자기자신)을 제외한 나머지 모든 형제요소(형제태그)를 가리키는 것이다.
                :first   는 선택된 요소 중 첫번째 요소를 가리키는 것이다.
                :last   는 선택된 요소 중 마지막 요소를 가리키는 것이다. 
                참조사이트 : https://stalker5217.netlify.app/javascript/jquery/
                
                .first()   선택한 요소 중에서 첫 번째 요소를 선택함.
                .last()   선택한 요소 중에서 마지막 요소를 선택함.
                참조사이트 : https://www.devkuma.com/docs/jquery/%ED%95%84%ED%84%B0%EB%A7%81-%EB%A9%94%EC%86%8C%EB%93%9C-first--last--eq--filter--not--is-/ 
                */ 
        }
        
        $(elmt).append(next.children(':first-child').clone());
            /*
                next.children(':first-child') 은 결국엔 img 태그가 되어진다.
                선택자.clone() 은 선택자 엘리먼트를 복사본을 만드는 것이다
                즉, 다음번 클래스가 carousel-item 인 div 의 자식태그인 img 태그를 복사한 img 태그를 만들어서 
                    $(elmt) 태그속에 있는 기존 img 태그 뒤에 붙여준다.
            */
        for(let i=0; i<2; i++) {    // 남은 나머지 2개를 위처럼 동일하게 만든다.
            next = next.next(); 
            
            if (next.length == 0) {
                //   next = $(elmt).siblings(':first');
                //  또는
                next = $(elmt).siblings().first();
            }
            
            $(elmt).append(next.children(':first-child').clone());
        }// end of for--------------------------
        
        // console.log(index+" => "+$(elmt).html()); 
    
    }); // end of $('div.carousel div.carousel-item').each(function(index, elmt)----

    // ======= 추가이미지 캐러젤로 보여주기(Bootstrap Carousel 4개 표시 하되 1번에 1개 진행) 끝 ======= //

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // === 개수 증가 감소 spinner 추가해주기 === //
    $("input#spinner").spinner( {
        spin: function(event, ui) {
           if(ui.value > 100) {
              $(this).spinner("value", 100);
              return false;
           }
           else if(ui.value < 1) {
              $(this).spinner("value", 1);
              return false;
           }
        }
    } );// end of $("input#spinner").spinner({});----------------

})  // end of $(document).ready(function(){--------------------------------

///////////////////////////////////////////////////////////////////////////////

// === 팝업창으로 열기 === //
let popup; // 추가이미지 파일을 클릭했을때 기존에 띄어진 팝업창에 추가이미지가 또 추가되지 않도록 하기 위해 밖으로 뺌.   
   
function openPopup(src) {
    
// alert(src);

if(popup != undefined) { // 기존에 띄어진 팝업창이 있을 경우 
    popup.close(); // 팝업창을 먼저 닫도록 한다.
}
    
// 너비 800, 높이 480 인 팝업창을 화면 가운데 위치시키기
const width = 800;
const height = 480;
const left = Math.ceil((window.screen.width - width)/2);  // 정수로 만듬 
const top = Math.ceil((window.screen.height - height)/2); // 정수로 만듬

popup = window.open("", "imgInfo", 
                    `left=${left}, top=${top}, width=${width}, height=${height}`);  
                    // jsp 에서 작성할 경우 => left=\${left}, top=\${top}, width=\${width}, height=\${height}

popup.document.writeln("<html>");
popup.document.writeln("<head><title>제품이미지 확대보기</title></head>");
popup.document.writeln("<body align='center'>");
popup.document.writeln("<img src='"+src+"' />");
popup.document.writeln("<br><br><br>");
popup.document.writeln("<button type='button' onclick='window.close()'>팝업창닫기</button>");
popup.document.writeln("</body>");
popup.document.writeln("</html>");
    
}// end of function openPopup(src)-------------------

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// === 모델창으로 이미지 열기 === //
function modal_content(img){

    // alert("모달창속에 이미지를 넣어주어야 합니다.ㅎㅎㅎ");
    // alert(img.src);
    $("div#add_image_modal-body").html("<img src='" + img.src + "' class='d-block img-fluid' />")

}   // end of function modal_content(img){-----------------

// === 장바구니 담기 === //
function goCart(){
	
    // === 주문량에 대한 유효성 검사하기 === //
    const frm = document.cartOrderFrm;
    
    const regExp = /^[1-9][0-9]*$/;    // 숫자만 체크하는 정규표현식
    // * 은 앞선언조건이 나와도 되고 안나와도된다.

    // === 수량 name : oqty === //
    let oqty = frm.oqty.value;
    
    const bool = regExp.test(oqty);

    if(!bool){      // 숫자 이외의 값이 들어오거나 첫번째 숫자가 0인 경우
        alert("주문개수는 1개 이상이어야 합니다.");
        frm.oqty.value = "1";
        frm.oqty.focus();
        return;
    }

    // ${requestScope.pvo.pqty}

    let  balancecount = Number($("span#balancecount").text());

    if(Number(oqty) > balancecount){     // 주문개수가 잔고개수보다 클 경우

        // console.log("확인용 balancecount : " + balancecount);
        // console.log("확인용 oqty : " + oqty);

        alert("주문개수가 잔고개수보다 더 커서 진행할 수 없습니다.");
        frm.oqty.value = "1";
        frm.oqty.focus();
        return;
    }

    // 주문개수가 1개 이상인 경우
    frm.method = "post";
    frm.action = "cartAdd.up"      // <%= ctxPath%>/shop/cartAdd.up
    frm.submit();

}   // end of function goCart(){------------------------

/////////////////////////////////////////////////////////////////////////////////////
