window.onload = function() {

    /*
        1. "문자열".indexOf("찾고자하는문자열", 출발인덱스)
       ===> 검색은 왼쪽에서 오른쪽으로 수행된다.
        ===> "문자열" 에서 "찾고자하는문자열"이 최초로 나오는 위치(인덱스)값을 리턴해준다. 
            만약에 나오는 위치(인덱스)값이 없으면 -1 을 리턴해준다.
       ===> 두번째 파라미터인 출발인덱스를 생략하면 0 이 된다.
       ===> 출발인덱스에 음수가 오면 0 으로 처리된다.
       ===> 검색에 있어서 영문의 대소문자를 구별한다.
    */
        const text = document.getElementById("p").innerText.trim();
        console.log(text);  
        // 쌍용강북교육센터 서울교육대학교 교육문화원
        
        let index = text.indexOf("교육", 0);    // ,0 은 처음부터 이므로 생략 가능하다.
        document.getElementById("indexOf_1").innerHTML = index;
        // 4 
        
        index = text.indexOf("교육"); // 두번째 파라미터인 출발인덱스를 생략하면 0 이 된다. 
        document.getElementById("indexOf_2").innerHTML = index;
        // 4 
        
        index = text.indexOf("교육", 9); 
        document.getElementById("indexOf_3").innerHTML = index;
        // 11 
        
        index = text.indexOf("교육", -2);   // 출발 인덱스에 음수가 나오면 0 으로 처리
        document.getElementById("indexOf_4").innerHTML = index;
        //  4
        
        index = text.indexOf("스크립트");   // 없는 글자 일 경우 -1
        document.getElementById("indexOf_5").innerHTML = index;
        // -1
        
        
    /*
       2. "문자열".lastIndexOf("찾고자하는문자열")
       ===> 검색은 오른쪽에서 왼쪽으로 수행된다. 
       ===> "문자열" 에서 "찾고자하는문자열"이 최초로 나오는 위치(인덱스)값을 리턴해준다.
            만약에 나오는 위치(인덱스)값이 없으면 -1 을 리턴해준다.
       ===> 두번째 파라미터인 출발인덱스를 생략하면 ("문자열"의 길이-1) 이 된다.
       ===> 출발인덱스에 음수가 오면 0 으로 처리된다.
       ===> 검색에 있어서 영문의 대소문자를 구별한다.
    */
        // 쌍용강북교육센터 서울교육대학교 교육문화원
    
        index = text.lastIndexOf("교육");  // 두번째 파라미터인 출발인덱스를 생략하면 ("문자열"의 길이-1) 이 된다.
        document.getElementById("lastIndexOf_1").innerHTML = index;
        // 17
       
        index = text.lastIndexOf("교육", text.length-1);  // 교육문화원 의 원부터 오른쪽에서 왼쪽으로 검색하여 처음으로 나오는 교육의 위치(인덱스)값을 리턴 시켜준다.
        document.getElementById("lastIndexOf_2").innerHTML = index;
        // 17
       
        index = text.lastIndexOf("교육", 6); // 쌍용강북교육센 의 센부터 오른쪽에서 왼쪽으로 검색하여 처음으로 나오는 교육의 위치(인덱스)값을 리턴 시켜준다.   
        document.getElementById("lastIndexOf_3").innerHTML = index; 
        // 4
       
        index = text.lastIndexOf("교육", 15); // 서울교육대학교 의 교부터 오른쪽에서 왼쪽으로 검색하여 처음으로 나오는 교육의 위치(인덱스)값을 리턴 시켜준다.   
        document.getElementById("lastIndexOf_4").innerHTML = index; 
        // 11
       
        index = text.lastIndexOf("교육", 0); // 쌍용강북 의 쌍부터 오른쪽에서 왼쪽으로 검색하여 처음으로 나오는 교육의 위치(인덱스)값을 리턴 시켜준다.    
        document.getElementById("lastIndexOf_5").innerHTML = index; 
        // -1
       
        index = text.lastIndexOf("교육", -1); // 출발인덱스에 음수가 오면 0 으로 처리된다.   
        document.getElementById("lastIndexOf_6").innerHTML = index; 
        // -1
       
        index = text.lastIndexOf("스크립트");
        document.getElementById("lastIndexOf_7").innerHTML = index; 
        // -1 
       
    
    /*
        3. "문자열".search("찾고자하는문자열")
       ===> "문자열" 에서 "찾고자하는문자열"이 최초로 나오는 위치(인덱스)값을 리턴해준다.
    */
        index = text.search("교육");
        document.getElementById("search_1").innerHTML = index;
        // 4   
       
    
    /*
        4. "문자열".search(정규표현식)
       ===> "문자열" 에서 정규표현식에 일치하는 글자가 최초로 나오는 위치(인덱스)값을 리턴해준다.
    */
        
        const text2 = "korea 대한민국 SEOUL 서울";
        index = text2.search(/[가-힣]/g); // 최초로 한글이 나오는 위치를 찾아준다.       
        document.getElementById("search_2").innerHTML = index;
        // 6
         
        index = text2.search(/[A-Z]/gi); // 대소문자와 관계없이 최초로 영문자가 나오는 위치를 찾아준다. 
        //  g 는 모든 문자와 여러 줄 일치(global)
        //  i 는 영어 대소문자를 구분 않고 일치(insensitive, ignore case) 
        document.getElementById("search_3").innerHTML = index;  // 처음부터 영어가 나왔으니 0
        // 0 
       
       
    /*
        5. "문자열".includes("찾고자하는문자열")   
           => ES6 (2015)임
           ===> "문자열" 에서 "찾고자하는문자열" 포함되어 있으면 true, 포함되어 있지 않으면 false 를 리턴해줌.
    */
        // let bool = (text.indexOf("센터") >= 0);
        // 또는
        let bool = text.includes("센터");
        document.getElementById("includes_1").innerHTML = bool; 
        // true
       
        // bool = (text.indexOf("스크립트") >= 0);
        // 또는   
        bool = text.includes("스크립트");
        document.getElementById("includes_2").innerHTML = bool; 
        // false   
       
       
    /*
        6. "문자열".startsWith("찾고자하는문자열") 
           => ES6 (2015)임
           ===> "문자열" 이 "찾고자하는문자열" 로 시작하면 true, 시작하지 않으면 false 를 리턴해줌.
    */
        bool = text.startsWith("쌍용강북");
        document.getElementById("startsWith_1").innerHTML = bool; 
        // true
       
        bool = text.startsWith("강북교육");
        document.getElementById("startsWith_2").innerHTML = bool; 
        // false
    
    /*
        7. "문자열".endsWith("찾고자하는문자열")   
           => ES6 (2015)임 
           ===> "문자열" 이 "찾고자하는문자열" 로 끝나면 true, 끝나지 않으면 false 를 리턴해줌.
    */  
        bool = text.endsWith("문화원");
        document.getElementById("endsWith_1").innerHTML = bool; 
        // true 
       
        bool = text.endsWith("문화센터");
        document.getElementById("endsWith_2").innerHTML = bool; 
        // false   
       
}   // end of window.onload = function()---------------------------------------------