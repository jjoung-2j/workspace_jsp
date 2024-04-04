window.onload = function(){

    const arr_person = [{name:"아이유", photo:"iyou.jpg",   age:28, address:"서울시 강동구", special:"가수 겸 탤런트<br/>팬들이 많음"},
                         {name:"김태희", photo:"kimth.jpg",  age:27, address:"서울시 강서구", special:"탤런트<br/>팬들이 많음"},
                         {name:"박보영", photo:"parkby.jpg", age:26, address:"서울시 강남구", special:"탤런트 및 영화배우<br/>팬들이 많음"}];
    
    const btn_list = document.querySelectorAll("body > div:first-child > button");
    console.log(btn_list);   
    // NodeList(4)  [button, button, button, button]

    // 보이기-1 버튼 클릭시
    btn_list[0].onclick =() =>{

        //alert("보이기-1 버튼 클릭하셨군요");
       
        let html = ``;
       
        arr_person.forEach(item => {
            html += `<table>
                     <tr>
                        <td rowspan="3"><img src='images/${item.photo}' /></td>
                        <td class="title">성명</td>
                        <td>${item.name}</td>
                     </tr> 
                     <tr>
                        <td class="title">나이</td>
                        <td>${item.age}</td>
                     </tr> 
                     <tr>
                        <td class="title">주소</td>
                        <td>${item.address}</td>
                     </tr> 
                     <tr>
                        <td colspan="3">특이사항</td>
                     </tr> 
                     <tr>
                        <td colspan="3">${item.special}</td>
                     </tr> 
                 </table>`;
       });

       document.querySelector("div#view").innerHTML = html;
       document.querySelector("div#view").style.display = "";
    }

    // 감추기-1 버튼 클릭시
    btn_list[1].onclick =() =>{
        document.querySelector("div#view").innerHTML = "";
    }

    // ★★★ 문서로딩과 함께 자동으로 btn_list[0] 을 클릭하도록 한다. ★★★ //
    btn_list[0].click();    // 이것을 없애면 마우스를 클릭해야나온다.

/////////////////////////////////////////////////////////////////////////////////

    let html_2 = ``;
        
    arr_person.forEach(item => {
    html_2 += `<table>
                <tr>
                    <td rowspan="3"><img src='images/${item.photo}' /></td>
                    <td class="title">성명</td>
                    <td>${item.name}</td>
                </tr> 
                <tr>
                    <td class="title">나이</td>
                    <td>${item.age}</td>
                </tr> 
                <tr>
                    <td class="title">주소</td>
                    <td>${item.address}</td>
                </tr> 
                <tr>
                    <td colspan="3">특이사항</td>
                </tr> 
                <tr>
                    <td colspan="3">${item.special}</td>
                </tr> 
            </table>`;
    });

    // 보이기-2 버튼 클릭시
    btn_list[2].onclick =() =>{
        // alert("보이기-2 버튼 클릭하셨군요");
       
        document.querySelector("div#view").innerHTML = html_2;
        document.querySelector("div#view").style.display = "";  
        // 감추기에 none 이 되있으므로 여기 초기값을 지정해주어야 한다.(감추기후 보이기 클릭시 보이게 하기 위해)
    }

    // 감추기-2 버튼 클릭시
    btn_list[3].onclick =() =>{
        // alert("감추기-2 버튼 클릭하셨군요");
        document.querySelector("div#view").style.display = "none"; 
    }

    

}   // end of window.onload = function()---------------