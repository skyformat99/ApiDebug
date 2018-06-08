/***********获取本地存储的数据**********/
function getLocalData(key, def){
    try{
        var value = localStorage[key];
        if(value){
            return value;
        }
        if (def) {
            return def;
        }else{
            return "[]";
        }
    }catch(e){
        console.error(e);
        if (def) {
            return def;
        }else{
            return "[]";
        }
    }
}

function getLocalJson(key, def) {
    return $.parseJSON( getLocalData(key, def) );
}

/********* html基本操作方法**********/
function setHtml(id, html) {
    $("#" + id).html(html);
}
function showDiv(id) {
    $("#" + id).removeClass("ndis");
}
function hidenDiv(id) {
    $("#" + id).addClass("ndis");
}
function fadeIn(id, time) {
    $("#" + id).fadeIn(time);
}
function fadeOut(id, time) {
    $("#" + id).fadeOut(time);
}

/*********存储数据至本地***********/
function saveLocalData(key,value){
    try{
        localStorage[key] = value;
        return true;
    }catch(e){
        console.error(e);
        return false;
    }
}

function saveLocalJson(key,value){
    try{
        localStorage[key] = JSON.stringify(value);
        return true;
    }catch(e){
        console.error(e);
        return false;
    }
}

/********* http *******/
function httpPost(url, myData, myAsync, callBack){
    var result;
    $.ajax({
        type: "POST",
        url: url,
        async: myAsync,
        data: myData,
        beforeSend: function (request) {
            // 通过body传递参数时后需要设置
            //request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        },
        complete: function (responseData, textStatus) {
            if (textStatus == "error") {
                alert("网络异常，Status:" + responseData.status + "\nStatusText:" + responseData.statusText + "\nTextStatus: " + textStatus, 5, "error");
                result = $.parseJSON("{\"success\":0,\"data\":null,\"error\":{\"code\":\"未知错误\",\"message\":网络异常\"\"}}")
            }

            else if (textStatus == "success") {
                var responseJson = $.parseJSON(responseData.responseText);
                result = responseJson;
                if (callBack) {
                    callBack(responseJson);
                }
            }
        }
    });
    return result;
}