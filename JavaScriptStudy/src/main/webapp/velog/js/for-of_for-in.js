window.onload = function(){

    const arr = [{userid:"jjoung", name:"쫑쫑이"}
                , {userid: "bbang", name : "빵빵이"}];

    let html = ``;
    for(let item of arr){
        html += `<ul>`;
        for(let property_name in item){
            html += `<li>${item[property_name]}</li>`;
        }	// end of for--------
        html += `</ul>`;
    }	// end of for------------ 

    document.querySelector("div#div").innerHTML = html;

}