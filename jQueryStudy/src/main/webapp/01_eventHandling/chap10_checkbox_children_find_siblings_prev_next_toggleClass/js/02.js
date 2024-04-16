$(document).ready(function(){

/*
    $("div#firstDiv span.buttons > label").click(e =>{
        alert("헤헤헤");
    })
*/
    // 또는
    $("div#firstDiv").find("label").click(e =>{
        // alert("호호호");

    /*   
       선택자.toggleClass("클래스명1");
        ==> 이것은 선택자에 "클래스명1" 이 이미 적용되어 있으면 선택자에 "클래스명1" 을 제거해주고, 
             만약에 선택자에 "클래스명1" 이 적용되어 있지 않으면 선택자에 "클래스명1" 을 추가해주는 것.
             
        한마디로 addClass("클래스명1") 와 removeClass("클래스명1") 를 합친것 이라고 보면 된다.     
    */  

        $(e.target).toggleClass("changeCSSname");
        // label 태그에 클릭을 했을때에 label 태그에 CSS 클래스 changeCSSname 이 
        // 적용이 안되어진 상태이라면 label 태그에 CSS 클래스 changeCSSname 을 적용시켜주고,
        // 이미 적용이 되어진 상태이라면 label 태그에 CSS 클래스 changeCSSname 을 해제시켜준다.

    })  // end of $("div#firstDiv").find("label").click(e =>{})----------------
/////////////////////////////////////////////////////////////////////////////////////////////////

        // === 체크박스  전체선택/전체해제 === //
/*
        $("div#firstDiv input:checkbox[id='checkall']").click( (e) => {
            alert("확인용1");
        });
*/   

/*
        $("div#firstDiv input#checkall").click( (e) => {
            alert("확인용2");
        });
*/   

/*   
        $("div#firstDiv").find("input#checkall").click( (e) => {
            alert("확인용3");
        }); 
*/   
   /*
        === 선택자의 class 알아오기 === 
            선택자.attr('class')  또는  선택자.prop('class') 
             
        === 선택자의 id 알아오기 === 
            선택자.attr('id')     또는  선택자.prop('id') 
             
        === 선택자의 name 알아오기 ===     
            선택자.attr('name')   또는  선택자.prop('name')
             
        >>>> .prop() 와 .attr() 의 차이 <<<<            
          .prop() ==> form 태그내에 사용되어지는 엘리먼트의 disabled, selected, checked 의 속성값 확인 또는 변경하는 경우에 사용함. 
         .attr() ==> 그 나머지 엘리먼트의 속성값 확인 또는 변경하는 경우에 사용함.    
       */

        // === 전체 선택/해제 을(를) 클릭한 경우 === //
        $("div#firstDiv input:checkbox[id='checkall']").click( (e) => {     
            // const bool = $(e.target).is(":checked");
            // 또는
            const bool = $(e.target).prop("checked");

            // console.log("확인용 bool => ", bool);
            // 전체선택/전체해제 체크박스에 클릭을 했을때에 체크가 되어진 클릭이라면 bool 은 true 를 가지고,
            // 전체선택/전체해제 체크박스에 클릭을 했을때에 체크를 해제하는 클릭이라면 bool 은 false 를 가진다.
        
            $("div#firstDiv input:checkbox[name='person']").prop("checked",bool);

            // 선택자.prev() 는 선택자의 바로 앞의 형제요소(형제태그)를 가리키는 것이다.
            if(bool){   // 전체선택이 체크된 경우
                // $(e.target).prev().addClass("changeCSSname");    // 아래 label 에 모두 포함된다.
                $("div#firstDiv").find("label").addClass("changeCSSname");
            }
            else{       // 전체선택이 체크되지 않은 경우
                // $(e.target).prev().removeClass("changeCSSname");
                $("div#firstDiv").find("label").removeClass("changeCSSname");
            }
            
        });     // end of $("div#firstDiv input:checkbox[id='checkall']").click( (e) => {})--------

////////////////////////////////////////////////////////////////////////////////////////

        // === 각각의 버튼을 클릭한 경우 === //
        $("div#firstDiv input:checkbox[name='person']").click(e =>{
            // name 이 person 인 체크박스에 대해서 클릭하면

            const bool = $(e.target).prop("checked");   // 클릭한 체크박스의 체크유무를 알아온다.

            // 선택자.prev() 는 선택자의 바로 앞의 형제요소(형제태그)를 가리키는 것이다.

            if(bool){   // 클릭한 체크박스가 체크된 경우

                $(e.target).prev().addClass("changeCSSname");
            ////////////////////////////////////////////////////////////////////////////////////
                // === 하위 체크박스에 따른 상위 체크박스 체크 === //

                let b_all_checked = true;

                // === name 이 person 인 모든 체크박스를 검사해서 모두 체크가 되어진 상태인지 알아온다. === //
                $("div#firstDiv input:checkbox[name='person']").each((i,elt) =>{

                    // $(elmt) 이 $("div#firstDiv input:checkbox[name='person']") 중 반복되어지는 하나의 요소(element)이다.
                    const b_checked = $(elt).prop("checked");

                    // 반복을 돌면서 해당 체크박스가 체크가 되었는지 아닌지 알아본다.
                    if(!b_checked){     // 체크가 안되었으면
                        b_all_checked = false;
                        return false;   // each 문에서의 break
                    }
                })  // end of $("div#firstDiv input:checkbox[id='checkall']").each((i,elt) =>{})-------    
                
                if(b_all_checked){
                        // name 이 person 인 모드 체크박스를 하나하나씩 체크유무 검사를 마쳤을때 
                        // 모든 체크박스가 체크가 되어진 상태이라면 

                        // "전체선택/전체해제 체크박스" 에 체크한다.
                        $("div#firstDiv input:checkbox[id='checkall']").prop("checked",true);

                        // "전체선택/전체해제 체크박스" 의 한단계 앞에 있는 형제엘리먼트(형제태그)인 모두 체크/해제 label 태그에 CSS changeCSSname 을 설정 시켜준다.
                        $("div#firstDiv input:checkbox[id='checkall']").prev().addClass("changeCSSname");
                }

            }
            else{       // 클릭한 체크박스가 체크되지 않은 경우

                $(e.target).prev().removeClass("changeCSSname");

            /////////////////////////////////////////////////////////////////////////////
                // === 하위 체크박스에 따른 상위 체크박스 체크 === //

                // "전체선택/전체해제 체크박스" 에 체크를 해제한다.
                $("div#firstDiv input:checkbox[id='checkall']").prop("checked",false);

                // "전체선택/전체해제 체크박스" 의 한단계 앞에 있는 형제엘리먼트(형제태그)인 모두 체크/해제 label 태그에 CSS changeCSSname 을 해제 시켜준다.
                $("div#firstDiv input:checkbox[id='checkall']").prev().removeClass("changeCSSname");

            }
            
        })  // end of $("div#firstDiv input:checkbox[name='person']").click(e =>{})----

///////////////////////////////////////////////////////////////////////////////////////////////

    // ========== 확인 버튼을 클릭하면 ========== //
    $("button#btnOK").click(e =>{
        // === name 이 person 인 체크박스의 개수 === //
        const length_person = $("div#firstDiv input:checkbox[name='person']").length;
        $("div#checkboxCnt").find("span#cnt").html(length_person);

        // === name 이 person 인 체크박스중 체크가 되어진 체크박스의 개수 === //
        const length_person_checked = $("div#firstDiv input:checkbox[name='person']:checked").length;
        $("div#checkboxCnt").find("span#checkedCnt").html(length_person_checked);

        if(length_person_checked == 2){
            //   const arr_checked_val = [];
            //  또는   
            const arr_checked_val = new Array();
      
            $("div#firstDiv input:checkbox[name='person']:checked").each((i, elt)=>{
                arr_checked_val.push($(elt).val()); 
            });// end of $("div#firstDiv input:checkbox[name='person']:checked").each()------- 
           
            // === 2명 선택할 경우에만 value 값이 나온다 === //
            $("div#checkboxCnt").find("span#checkedValue").html(arr_checked_val.join(","));
        }
        else{
            alert("2명만 선택하세요!!");
        }

    })  // end of $("button#btnOK").click(e =>{})----------------

//////////////////////////////////////////////////////////////////////////////////

    // ==== 체크박스 여러개중 라디오 처럼 1개만 선택되도록 만든다. ==== //
    $("p#p input:checkbox[name='person2']").click(e => {

        // 전부 체크하지 못하게 한 후 클릭한 곳만 허용한다.
        $("p#p input:checkbox[name='person2']").prop("checked",false);
        $(e.target).prop("checked",true);

        /////////////////////////////////////////////////////
      
        // 선택자.parent() 는 선택자의 부모요소(부모태그)를 가리키는 것이다.
        // 선택자.parent().parent() 는 선택자의 부모요소의 부모요소(부모태그의 부모태그)를 가리키는 것이다. 
        // 선택자.siblings() 는 선택자의 형제요소(형제태그)중 선택자(자기자신)을 제외한 나머지 모든 형제요소(형제태그)를 가리키는 것이다. 
        $(e.target).parent().siblings().css('opacity','0.2');
        $(e.target).parent().css('opacity','1.0');
       
        $(e.target).parent().parent().find("label").removeClass("blueColor greenColor");
        // addClass() 및 removeClass() 사용시 복수개의 클래스명을 사용할 수 있다.  
       
        $(e.target).prev().addClass("blueColor");
        // 선택자.prev() 는 선택자의 바로 앞의 형제요소(형제태그)를 가리키는 것이다.
       
        $(e.target).next().addClass("greenColor");
        // 선택자.next() 는 선택자의 바로 뒤의 형제요소(형제태그)를 가리키는 것이다.

    })  // end of $("p#p input:checkbox[name='person2']").click(e => {})-------------------


})  // end of $(document).ready(function(){}--------------------