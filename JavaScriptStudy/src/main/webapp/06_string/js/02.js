window.onload = function(){
    /*
        자바스크립트에서 문자열을 발췌하여 리턴하는 메소드는 3가지가 있다.
        3가지 모두 원본 문자열은 그대로 변경되지 않고 그대로 유지하게 된다.
    
        1. "문자열".slice(startIndex, endIndex)
        ===> 문자열에서 startIndex 부터 endIndex 앞 까지만 발췌하여 리턴해준다.
            역방향을 사용시 startIndex 와 endIndex 에 -를 사용하면 된다.  
    */
    const str = "Apple, Banana, Kiwi";

    let part = str.slice(7, 13);    // 7번째글자부터 12까지(13의 앞까지) => Banana
    document.getElementById("slice_forward").innerHTML = part; // Banana
    
    part = str.slice(-12, -6); // Banana
    
    document.getElementById("slice_reverse").innerHTML = part;
    
    /*
        2. "문자열".substring(startIndex, endIndex)
        ===> 문자열에서 startIndex 부터 endIndex 앞 까지만 발췌하여 리턴해준다.
            위의 slice 와 같지만 차이점은 - 를 사용하여 역방향을 사용할 수 없다는 것이다.
    */

    part = str.substring(7, 13);    // 7번째글자부터 12까지(13의 앞까지) => Banana
    document.getElementById("substring").innerHTML = part; // Banana

    /*
        3. "문자열".substr(startIndex, length)
        ===> 문자열에서 startIndex 부터 length 길이만큼 발췌하여 리턴해준다.
            출발점을 역방향으로 하려면 -startIndex 을 사용하면 된다.
            
        ===> "문자열".substr(startIndex) 
            문자열에서 startIndex 부터 문자열 끝까지 발췌하여 리턴해준다.
            출발점을 역방향으로 하려면 -startIndex 을 사용하면 된다.
  */

        // - 가 뜨는이유는 사용되지만 권장 X
        part = str.substr(7,6);     // 7번째글자부터 6글자 => Banana    
        document.getElementById("substr_forward1").innerHTML = part; // Banana

        part = str.substr(7);       // 7번째글자부터 끝까지 => Banana, Kiwi    
        document.getElementById("substr_forward2").innerHTML = part; // Banana, Kiwi

        part = str.substr(-12,6);   // 뒤에서 12번째글자부터 6글자 => Banana    
        document.getElementById("substr_reverse1").innerHTML = part; // Banana

        part = str.substr(-12);     // 뒤에서 12번째글자부터 끝까지  => Banana, Kiwi    
        document.getElementById("substr_reverse2").innerHTML = part; // Banana, Kiwi

        document.getElementById("str").innerHTML = str;

}