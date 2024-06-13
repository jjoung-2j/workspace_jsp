$(document).ready(function(){
    $("input:text[name='searchWord']").bind("keydown",function(e) {

        if(e.keyCode == 13){
            goSearch();
        }

    })  // end of $("input:text[name='searchWord'").bind("keydown",e => {})-------------

    // === select 태그에 대한 이벤트는 click 이 아니라 change 이다. === //
    $("select[name='sizePerPage']").bind("change",function(){

        const frm = document.member_search_frm;

        // frm.action = "memberList.up";    // form 태그에 action 이 명기되지 않았으면 현재보이는 URL 경로로 submit 되어진다.
        // frm.method = "get";              // form 태그에 method 를 명기하지 않으면 "get" 방식이다.
        frm.submit();
        
    })  // end of $("select[name='sizePerPage']").bind("change",function(){})--------------

})  // end of $(document).ready(function(){})-------

//////////////////////////////////////////////////////////////////////////

function goSearch(){

    const searchType = $("select[name='searchType']").val();

    if(searchType == ""){
        alert("검색대상을 선택하세요!!");
        return;     // goSearch() 함수를 종료
    }
    
    const frm = document.member_search_frm;

    // frm.action = "memberList.up";    // form 태그에 action 이 명기되지 않았으면 현재보이는 URL 경로로 submit 되어진다.
    // frm.method = "get";              // form 태그에 method 를 명기하지 않으면 "get" 방식이다.
    frm.submit();

}   // end of function goSearch()--------