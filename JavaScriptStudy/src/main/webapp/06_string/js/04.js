window.onload = function() {

    /*
        1. "문자열".toUpperCase()
       ===> 문자열을 모두 대문자로 변경하여 리턴해준다.
    */
       const str = "Please visit Microsoft! ORACLE / Microsoft MS-SQL";
       
       let new_str = str.toUpperCase();
       document.getElementById("toUpperCase").innerHTML = new_str;   
       // PLEASE VISIT MICROSOFT! ORACLE / MICROSOFT MS-SQL
       
       document.getElementById("str").innerHTML = str;
        // Please visit Microsoft! ORACLE / Microsoft MS-SQL
        // 원본 "문자열"은 그대로 유지된다. 
    
    /*       
       2. "문자열".toLowerCase()
       ===> 문자열을 모두 소문자로 변경하여 리턴해준다.
    */
       new_str = str.toLowerCase();
       document.getElementById("toLowerCase").innerHTML = new_str;  
       // please visit microsoft! oracle / microsoft ms-sql
       
       
    /*   
       3. 문자열을 합치는 concat()
       ===> concat() 대신에 + 를 사용해도 된다.
    */
        const text1 = "Hello";
       const text2 = "World";
       const text3 = text1.concat(" ", text2);
       document.getElementById("concat").innerHTML = text3;
       // Hello World
       
       document.getElementById("plus").innerHTML = text1+" "+text2;
       // Hello World   
       
       
    /*    
       4. "문자열".trim()
       ===> 문자열의 좌,우 공백을 없애서 리턴해준다.
    */
        const text4 = "java";
       const text5 = "         script        ";
       const text6 = "/jQuery";
       
       document.getElementById("trim").innerHTML = text4 + text5.trim() + text6; 
       // javascript/jQuery   
       
    
    /*
        5. "문자열".padStart(확보길이,'채울글자');  // ECMAScript 2017 feature.
       6. "문자열".padEnd(확보길이,'채울글자');    // ECMAScript 2017 feature.
    */
       const str2 = "안녕하세요";
       new_str = str2.padStart(10,'*');
       document.getElementById("padStart").innerHTML = new_str; 
       // *****안녕하세요
       
       new_str = str2.padEnd(10,'*');
       document.getElementById("padEnd").innerHTML = new_str; 
       // 안녕하세요*****   
        
    
    /*
        7. "문자열".charAt(index) 
        ==> "문자열" 에서 특정 index 에서 위치한 문자를 리턴해준다.
    */    
    
        const text7 = "HELLO WORLD";
        let ch = text7.charAt(0);
        document.getElementById("charAt").innerHTML = ch;
        // H 
    
        ch = text7[0]; // ECMAScript 5 (2009)
        document.getElementById("ch").innerHTML = ch;
       // H 
       
       let str_quiz = "";
       
       for(let i=0; i<text7.length; i++) {
          if(text7[i] != " " && i<text7.length-1) {         //H-E-L-L-O- W-O-R-L
             str_quiz += text7[i]+"-";
          }
          else if(text7[i] == " " && i<text7.length-1) {    // " " 은 그대로 놔두기
             str_quiz = str_quiz.slice(0, str_quiz.length-1);
             str_quiz += text7[i];
          }
          else {                                            // D 는 그냥 붙이기
             str_quiz += text7[i];
          }
          
       }// end of for--------------------
          
       console.log("str_quiz : ", str_quiz);
       // str_quiz :  H-E-L-L-O W-O-R-L-D
       
       document.getElementById("quiz").innerHTML = str_quiz;
       // H-E-L-L-O W-O-R-L-D
          
    } 