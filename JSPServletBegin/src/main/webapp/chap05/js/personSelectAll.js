$(document).ready(function(){

    $("tbody > tr").click(e =>{
        // alert("헤헤헤");

        // console.log($(e.target).html());
        // $(e.target) 은 <td> 태그이다. - 내가 실제로 클릭한 곳

        const seq = $(e.target).parent().find("span").text();

        console.log("확인용 seq => ", seq);

        // ★★★ 암기 ★★★ //
        // 자바스크립트에서 URL 페이지 이동은 location.href="이동하고자하는 URL주소"; 이다.
        location.href = `personDetail.do?seq=${seq}`;  // ' / ' 가 없는 상대경로 
        // 또는 "personDetail.do?seq"+ seq;

    })  // end of $("tbody > tr").click(e =>{})-------------------------

})  // end of $(document).ready(function(){})----------