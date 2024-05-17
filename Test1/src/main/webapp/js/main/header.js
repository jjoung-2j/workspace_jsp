$(document).ready(function(){

    $("button#btnSearch").click(function(){
        search();
    })  // end of $("button#btnSearch").click(function(){}------------------

    $("input#search").click(function(){
        search();
    })  // end of $("input#search").click(function(){})-------------------------

})  // end of $(document).ready(function(){}---------------------------

///////////////////////////////////////////////////////////////////////////////////////

function register(ctxPath){

    location.href = `${ctxPath}/member/register.ice`;

}   // end of function register(ctxPath){})-----------

function login(ctxPath){

    location.href = `${ctxPath}/login/login.ice`;

}   // end of function sign(ctxPath){})-----------

function search(){

    const frm = document.searchFrm;
    frm.submit();

}   // end of function sign(ctxPath){})-----------