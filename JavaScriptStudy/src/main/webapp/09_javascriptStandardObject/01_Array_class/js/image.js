window.onload = function(){

    const person_arr = [{name:"아이유",photo:"iyou.jpg", age:25, address: "서울시 강남구", largePhoto:"iyouLarge.jpg"}    
                        ,{name:"김태희",photo:"kimth.jpg", age:27, address: "서울시 마포구", largePhoto:"kimthLarge.jpg"}   
                        ,{name:"박보영",photo:"parkby.jpg", age:30, address: "인천시 미추홀구", largePhoto:"parkbyLarge.jpg"}];   
    // "name":"아이유" 가능
    // 속성값에 띄어쓰기 있는 경우 "" 무조건 사용

    let html_1 = ``;
    person_arr.forEach(function(item,index,array){
        html_1 += `<th>${item.name}</th>`;
    })

    const name_tr = document.querySelector("div#container > table > thead > tr");
    name_tr.innerHTML = html_1;
    
    const th_list = document.querySelectorAll("#container > table > thead > tr > th");
    const photo_tr = document.querySelector("div#container > table > tbody> tr:first-child");
    const info = document.querySelector("div#container > table > tbody> tr:last-child");

    photo_tr.innerHTML = `<td colspan='3'>
        <img src='images/${person_arr[0].photo}'/></td>`;   // 기본 이미지로 0번째 등록


    th_list.forEach(function(elmt,index,array){     // 태그라면 elmt라고 한다.  

        elmt.onmouseover = function(){
            // alert("확인용 헤헤헤");
            // alert(index);
            // alert(person_arr[index].photo);
            
            photo_tr.innerHTML = `<td colspan='3'>
                                    <img src='images/${person_arr[index].photo}'/></td>`;

            const img = document.querySelector("div#container > table > tbody > tr > td > img");
            img.style.opacity = "1.0";
            img.style.transition = "3s";     // 안되넹 ㅠㅠ

            elmt.style.backgroundColor = "navy";
            elmt.style.color = "white";
            elmt.style.cursor = "pointer";
            elmt.style.transition = "3s";   // 라벨에 마우스를 올리면 3초

            elmt.innerHTML = "클릭하세요";
            elmt.style.width = "33.3333%";

        }

        elmt.onmouseout = function(){
            
            const img = document.querySelector("div#container > table > tbody > tr > td > img");

            img.style.opacity = "";
            // img.style.transition = "3s";    // 안되는중

            elmt.style.backgroundColor = "";
            elmt.style.color = "";
            elmt.style.cursor = "";
            // elmt.style.transition = "3s";   // 필요한가?? - 마우스 올릴때나 뗄때 하나만 적용해도 적용이 되는중
            elmt.innerHTML = person_arr[index].name;
            elmt.style.width = "";

            info.innerHTML = "";
            photo_tr.innerHTML = `<td colspan='3'>
            <img src='images/${person_arr[index].photo}'/></td>`;
            
        }

        elmt.onclick = function(){
            // alert("확인용 : 클릭하였습니다.");
            
            info.innerHTML = `<td colspan='3'><div style="font-weight: bold;">나이 : ${person_arr[index].age}</div>
                            <div style="font-weight: bold;">주소 : ${person_arr[index].address}</div></td>`;
                            
            photo_tr.innerHTML = `<td colspan='3'>
                                <img src='images/${person_arr[index].largePhoto}'/></td>`;

            const img = document.querySelector("div#container > table > tbody > tr > td > img");

            img.style.opacity = "1.0";

        }
    })  // end of th_list.forEach(function(elmt,index,array)-----------------

}   // end of window.onload = function()----------------------+