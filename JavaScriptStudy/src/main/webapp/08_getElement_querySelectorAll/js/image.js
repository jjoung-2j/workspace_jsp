window.onload = function(){

   /*
    const thList = document.getElementsByTagName("th");
    const imgList = document.getElementsByTagName("img");
   */

   const thList = document.querySelectorAll("body > div#container > table:first-child  th");
   const imgList = document.querySelectorAll("body > div#container > table:first-child img.face ");

    for(let i=0; i<thList.length; i++){

         // === 엘리먼트(객체)에 마우스가 올라가면 발생하는 이벤트 핸들러 생성하기 === //
         thList[i].onmouseover = function(){
            this.style.backgroundColor = "navy";    // this = thList[i]
            this.style.color = "white";
            this.style.cursor = "pointer";
            this.style.transition = "3s";

            imgList[i].style.transition = "2s";
            imgList[i].style.opacity = "1.0";

         }

         // === 엘리먼트(객체)에 마우스가 올라갔다가 빠지면 발생하는 이벤트 핸들러 생성하기 === //
         thList[i].onmouseout = function(){
            this.style.backgroundColor = "";    // this = thList[i]
            this.style.color = "";
            this.style.cursor = "";
            this.style.transition = "3s";       // CSS 에 준 것이 없으므로 적용하기
            
            imgList[i].style.transition = "2s";
            imgList[i].style.opacity = "";      // CSS 에 0.2 를 주었다.
         }

    }   // end of for----------------------



}   // end of window.onload = function--------------------------