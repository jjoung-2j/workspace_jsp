const data = {
    serviceKey : "t18H0wc1LlracvIWqfFfc8Y4aWsblSv9Bvsntzf26kWqSnakUeTEZG1u27WFuRWVe819MPwqiiJW2wfD7YyPIg=="
    ,numOfRows : 5
    ,pageNo : 1
    ,apiType: "JSON"
    ,year: 2017
}

function result(){
    // alert("버튼확인용");
    $.ajax({
        url:"http://apis.data.go.kr/1352000/ODMS_STAT_12/callStat12Api?serviceKey"
        , method:"get"
        , data : data
        ,async : false
        , success:function(json){
            console.log("resultCode : ", json.resultCode);
            console.log("resultMsg : ", json.resultMsg);
            
            let v_html = `${json.year}`;
            $("div#year").html(v_html);

            v_html = `${json.dvs}`;
            $("div#dvs").html(v_html);

            v_html = `${json.output}`
            $("div#output").html(v_html);

            v_html = `${json.adms}`
            $("div#adms").html(v_html);

            v_html = `${json.none}`
            $("div#none").html(v_html);

            v_html = `${json.numOfRows}`
            $("div#numOfRows").html(v_html);

            v_html = `${json.pageNo}`
            $("div#pageNo").html(v_html);

            v_html = `${json.totalCount}`
            $("div#totalCount").html(v_html);

            console.log("numOfRows : ", json.numOfRows);
            console.log("pageNo : ", json.pageNo);
            console.log("totalCount : ", json.totalCount);
            console.log("year : ", json.year);
            console.log("dvs : ", json.dvs);
            console.log("output : ", json.output);
            console.log("adms : ", json.adms);
            console.log("none : ", json.none);
        }
    })

    //////////////////////////////////////////////////////////////////////////////////////
    // http://apis.data.go.kr/1352000/ODMS_STAT_12/callStat12Api?serviceKey=인증키(URL Encode)&numOfRows=10&pageNo=1&apiType=XML&year=2019&dvs=연령__40~49세
}