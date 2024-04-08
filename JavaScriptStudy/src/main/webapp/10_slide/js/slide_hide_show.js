window.onload = function(){

    let current_index = 0;      // 현재 인덱스 번호

    const btn_previous = document.querySelector("button#previous");
    const btn_next = document.querySelector("button#next");
    const images = document.querySelectorAll("div#images > img");
    
    // 초기 설정으로 모든 이미지들은 안보이게 만든다.
    images.forEach(elmt => {elmt.style.display = "none";});

    // 초기 설정으로 첫번째 이미지만 보이게 만든다.
    images[0].style.display = "";

/////////////////////////////////////////////////////////////////////////

    // === 이전으로 이동하는 함수 === //
    const func_previous = function(){

        if(current_index > 0){      // 현재 인덱스번호가 처음이 아닌 두번째 이상인 경우
            
            btn_next.removeAttribute('disabled');   // 다음 버튼을 활성화 상태로 만든다.
            // 또는
            // btn_previous.setAttribute('disabled', false);    // 이전 버튼을 활성화 상태로 만든다.
            // 또는
            // btn_previous.disabled = false;   // 이전 버튼을 활성화 상태로 만든다.

            // 초기 설정으로 모든 이미지들은 안보이게 만든다.
            images.forEach(elmt => {elmt.style.display = "none";});

            const img = images[--current_index];
            img.style.display = "";   // 이전 이미지만 보이게 만든다.

        ///////////////////////////////////////////////////////////////////////////////////////
            // === 이미지에 애니메이션 효과 주기(transition) 시작 === //
            img.style.opacity = "0.3";
            // img.style.opacity = "1.0";   ===================> 점점 희미해지기

            let opc = img.style.opacity;
            console.log(`opc : ${opc}`);

            let increase = 0;
            // let del = 0;   // 감소값     ===================> 점점 희미해지기
            const func_img_opacity = setInterval(function(){
                increase += 0.005;
                // del += 0.005;            ===================> 점점 희미해지기
                img.style.opacity = `${Number(opc) + increase}`;
                // img.style.opacity = `${Number(opc) - del}`;  ====> 점점 희미해지기
                // img.style.opacity = `${opc + increase}`; 이 되지않는다. opc 가 string 타입
                // 이 때문에 img.style.opacity = `${Number(opc) + increase}`; 로 해주어야 한다.
                console.log(img.style.opacity);

                if(Number(img.style.opacity) == "1.0"){
                // if(Number(img.style.opacity) == "0.3"){  ========> 점점 희미해지기
                    console.log("그만");
                    console.log("=======================================");
                    clearInterval(func_img_opacity);
                }
            },10);
            // === 이미지에 애니메이션 효과 주기(transition) 끝 === //
        ///////////////////////////////////////////////////////////////////////////////////////

            // 메시지가 안나오게 하기
            document.querySelector("h2#msg").innerHTML = "";

        }
        else{   // 현재 인덱스번호가 처음인 경우
            // 처음 사진일 때 다음버튼을 disabled 로 만든다.
            btn_previous.setAttribute('disabled',true);     // 비활성화
            // 또는
            // btn_previous.disabled = true;                // 비활성화
            document.querySelector("h2#msg").innerHTML = "처음 사진 입니다.";
        }

    }

    // === 다음으로 이동하는 함수 === //
    const func_next = function(){

        if(current_index < 3){      // 현재 인덱스번호가 마지막(지금은 3)이 아닌 경우
            
            btn_previous.removeAttribute('disabled');   // 이전 버튼을 활성화 상태로 만든다.
            // 또는
            // btn_previous.setAttribute('disabled', false);    // 이전 버튼을 활성화 상태로 만든다.
            // 또는
            // btn_previous.disabled = false;   // 이전 버튼을 활성화 상태로 만든다.

            // 초기 설정으로 모든 이미지들은 안보이게 만든다.
            images.forEach(elmt => {elmt.style.display = "none";});

            const img = images[++current_index];
            img.style.display = "";   // 다음번 이미지만 보이게 만든다.

        ///////////////////////////////////////////////////////////////////////////////////////
            // === 이미지에 애니메이션 효과 주기(transition) 시작(점점 진해지기) === //
            img.style.opacity = "0.3";
            // img.style.opacity = "1.0";   ===================> 점점 희미해지기

            let opc = img.style.opacity;
            console.log(`opc : ${opc}`);

            let increase = 0;   // 증가값
            // let del = 0;   // 감소값     ===================> 점점 희미해지기
            const func_img_opacity = setInterval(function(){
                increase += 0.005;
                // del += 0.005;            ===================> 점점 희미해지기
                img.style.opacity = `${Number(opc) + increase}`;
                // img.style.opacity = `${Number(opc) - del}`;  ====> 점점 희미해지기
                // img.style.opacity = `${opc + increase}`; 이 되지않는다. opc 가 string 타입
                // 이 때문에 img.style.opacity = `${Number(opc) + increase}`; 로 해주어야 한다.
                console.log(img.style.opacity);

                if(Number(img.style.opacity) == "1.0"){
                // if(Number(img.style.opacity) == "0.3"){  ========> 점점 희미해지기
                    console.log("그만");
                    console.log("=======================================");
                    clearInterval(func_img_opacity);
                }
            },10);
            // === 이미지에 애니메이션 효과 주기(transition) 끝 === //
        ///////////////////////////////////////////////////////////////////////////////////////


            // 메시지가 안나오게 하기
            document.querySelector("h2#msg").innerHTML = "";

        }
        else{   // 현재 인덱스번호가 마지막(지금은 3)인 경우
            // 마지막 사진일 때 다음버튼을 disabled 로 만든다.
            btn_next.setAttribute('disabled',true);     // 비활성화
            // 또는
            // btn_previous.disabled = true;            // 비활성화
            document.querySelector("h2#msg").innerHTML = "마지막 사진 입니다.";
        }

    }

////////////////////////////////////////////////////////////////////////////////////////////////////

    // 이전 버튼은 초기화로 사용하지 못하도록 disabled 로 만든다.
    btn_previous.setAttribute('disabled', true);    // 비활성화

    // btn_next.addEventListener('click',function(){}); 이 방법도 있지만 함수를 밖으로 꺼낼 수 있다.
    // 이전버튼 클릭시 이전으로 이동하는 함수를 호출한다.
    btn_previous.addEventListener('click',func_previous);
    // 다음버튼 클릭시 다음으로 이동하는 함수를 호출한다.
    btn_next.addEventListener('click',func_next);

}   // end of window.onload = function()------------------------