function func_1(){
    
    var num1 = 10;  // num1은 10 임
    var num2 = 20;

    {
        var num1 = 30;  // num1은 30임
    }

    var sum = num1 + num2;
    //          30 + 20

    document.getElementById("span1").innerHTML = sum;   // 50

}   // end of function func_1()-------------------------

function func_2(){
    
    const num1 = 10;  // num1은 10 임
    const num2 = 20;

    {
        const num1 = 30;  // num1은 30임
        // { } block 속에 선언된 const num1 은 { } 내에서만 사용가능한 것이며, { } 을 벗어나는 순간 자동적으로 소멸 되어진다.
        // 그러므로 { } 내에서는 새로 선언이 가능하다.!!  

        const sum = num1 + num2;
        //          30 + 20
        // { } block 속에 선언된 const num1 은 { } 내에서만 사용가능한 것이다.
        // { } 을 벗어나는 순간 const sum 은 자동적으로 소멸 되어진다.
        
        // ◆ 오류 ◆ sum = num1 - num2;
        // Uncaught TypeError: Assignment to constant variable
        // ---- const sum 에 이미 값을 할당한 후 재할당은 불가하므로 오류이다.!!

        document.getElementById("span2-1").innerHTML = sum;   // 50

    }

    const sum = num1 + num2     // num1 은 10 임
    //            10 + 20

    // ◆ 오류 ◆ sum = num1 - num2;
    // Uncaught TypeError: Assignment to constant variable
    // ---- const sum 에 이미 값을 할당한 후 재할당은 불가하므로 오류이다.!!

    document.getElementById("span2-2").innerHTML = sum;     // 30

}   // end of function func_2()-------------------------

function func_3(){
    
    let num1 = 10;  // num1은 10 임
    let num2 = 20;

    {
        let num1 = 30;  // num1은 30임
        // { } block 속에 선언된 let num1 은 { } 내에서만 사용가능한 것이며, { } 을 벗어나는 순간 자동적으로 소멸 되어진다.
        // 그러므로 { } 내에서는 새로 선언이 가능하다.!!  

        let sum = num1 + num2;
        //          30 + 20
        // { } block 속에 선언된 letlet num1 은 { } 내에서만 사용가능한 것이다.
        // { } 을 벗어나는 순간 let sum 은 자동적으로 소멸 되어진다.
        
        sum = num1 - num2;
        //      30  - 20

        document.getElementById("span3-1").innerHTML = sum;   // 10

    }

    let sum = num1 + num2     // num1 은 10 임
    //            10 + 20

    sum = num1 - num2;
    //      10 - 20

    document.getElementById("span3-2").innerHTML = sum;     // -10

}   // end of function func_3()-------------------------

function func_4() {
    
    const num1 = 10; // num1 은 10임
    // ◆ 오류 ◆ let num1 = 20;
    // Uncaught SyntaxError: Identifier 'num1' has already been declared 
  
     let num2 = 20;
    // ◆ 오류 ◆ const num2 = 30; 
    // Uncaught SyntaxError: Identifier 'num2' has already been declared 
    
    // ◆ 오류 ◆ num1 += num2;  // num1 = num1 + num2;
    //   Uncaught TypeError: ㄴAssignment to constant variable.
    // --- num1 은 const 이므로 값을 할당한 후 재할당이 불가하므로 오류이다.!!
    
    num2 += num1;  // num2 = num2 + num1;
    // --- num2 은 let 이므로 값을 할당한 후 재할당이 가능하다.!!   
        
    document.getElementById("span4").innerHTML = num2; // 30  
  }// end of function func_4()-------------------