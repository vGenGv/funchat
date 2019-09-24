
// 获取ajax开发核心对象
function getXhr() {
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}




function sendMessage(){
    var msg_id = $("#msg_id").val();
    var sender_id = $("#sender_id").val();
    var receiver_id = $("#receiver_id").val();
    var message = $("#message_content").val();
    var image = $("#image").val();
    var file = $("#file").val();

    $.ajax({
        type:"post", //数据提交方式（post/get）
        url: "",    //提交到的url
        data: {"msg_id":msg_id,"sender_id":sender_id,"receiver_id":receiver_id,"message":message,"image":image,"file":file}, //提交的数据
        dataType:"json",  //的数据类型格式
        success: function (msg) {
            if (msg.success()){//修改成功

                //修改成功处理代码...
            }else{ //修改失败
                //修改失败处理代码...
            }
        }
    });

}

/* 获取当前时间*/
function getNow(s) {
    return s < 10 ? '0' + s: s;
}

function getMessage() {

    var myDate = new Date();
    //获取当前年
    var year=myDate.getFullYear();
    //获取当前月
    var month=myDate.getMonth()+1;
    //获取当前日
    var date=myDate.getDate();
    var h=myDate.getHours();       //获取当前小时数(0-23)
    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
    var s=myDate.getSeconds();
    //定义当前时间
    var now=year+'-'+getNow(month)+"-"+getNow(date)+" "+getNow(h)+':'+getNow(m)+":"+getNow(s);

    $.ajax({
        type: "post",
        url:"",     //后台请求的数据
        dataType: "json",
        success: function (data) {
            var html;
            for(var i=0;i<data.length;i++){    //遍历data数
                var ls = data[i];
                html = '<div class="message-item outgoing-message">'+
                    '<div class="message-content">'+
                   ls+
                '</div>"+"<div class="message-action">'+
                    now +'<i class="ti-double-check"></i>'+
                    "</div>"+
                    "</div>" ;
            }
            $("#messages").append(html); //在html页面id=messages的标签里添加html内容

        },
    });
}

setTimeout(function () {
    ChatosExamle.Message.add();
}, 3000);

setTimeout(function () {
    ChatosExamle.Message.add();
}, 3500);




