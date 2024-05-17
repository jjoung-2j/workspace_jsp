$(document).ready(function(){

    $("div#Periodgroup > div > button:first-child").css("background-color", "#FD8A69");

    $("div#Periodgroup > div > button:first-child").click(function(){
        $("div#Periodgroup > div > button").not(this).css("background-color", "");
        $(this).css("background-color", "#FD8A69");
    })  // end of $("div#Periodgroup > div > button:first-child").click(function(){-----

    $("div#Periodgroup > div > button:nth-child(2)").click(function(){
        $("div#Periodgroup > div > button").not(this).css("background-color", "");
        $(this).css("background-color", "#FFCD4A");
    })  // end of $("div#Periodgroup > div > button:nth-child(2)").click(function(){----
    
    $("div#Periodgroup > div > button:nth-child(3)").click(function(){
        $("div#Periodgroup > div > button").not(this).css("background-color", "");
        $(this).css("background-color", "#AFD485");
    })  // end of $("div#Periodgroup > div > button:nth-child(3)").click(function(){----

    $("div#Periodgroup > div > button:nth-child(4)").click(function(){
        $("div#Periodgroup > div > button").not(this).css("background-color", "");
        $(this).css("background-color", "#82CBC4");
    })  // end of $("div#Periodgroup > div > button:nth-child(4)").click(function(){----

    $("div#Periodgroup > div > button:last-child").click(function(){
        $("div#Periodgroup > div > button").not(this).css("background-color", "");
        $(this).css("background-color", "#58CCFF");
    })  // end of $("div#Periodgroup > div > button:last-child").click(function(){----


})  // end of $(document).ready(function(){----------