/**
 * 
 */
    window.onload = function(){
        // 브라우저에 페이지 로딩이 끝나면 자동적으로 호출되어지는 것이다.
        // 자동적으로 호출되어 실행되어야할 명령은 function() {} 안에 기술해준다.
        document.getElementById("demo").innerHTML = "p태그의 내용이 변경되었습니다";
        document.getElementById("demo").innerHTML = "변경전 p 태그"

        document.getElementById("h1").innerHTML = "<span style='color: orange;'>h1</span> 태그 입니다.";
    }

    function myFunction() {
        document.getElementById("demo").innerHTML = "p태그의 <span style='color: navy; font-weight: bold;'>내용이 변경</span>되었습니다";
    }

    	

