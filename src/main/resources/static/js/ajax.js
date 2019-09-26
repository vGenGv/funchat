
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
        url: "/GroupControl",    //提交到的url
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
        type: "get",
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

/**
 * 搜索群
 */
function searchGroup() {
    var groupName = $("#search_Group").val();

    $.ajax({
        type:"psot",
        url: "/GroupControl",//提交到的url
        dataType: "json",

        data: {"func": "searchGroup", "groupName": groupName},

        // 定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=UTF-8",
        success: function (map) {
            if( map.result )

            return
        }
    });
}

/**
 * 加入群
 */
function joinGroup() {
    //var groupId = $(#xxxxxxxxxxxx).val();  //根据groupId，点击加入对应的群聊

    $.ajax({
        type:"psot",
        url: "/GroupControl",//提交到的url
        dataType: "json",

        data: {"func":"joinGroup","groupId":groupId},

        // 定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=UTF-8",
        success: function () {

        }
    });
}

/**
 * 退出群
 */
function leaveGroup() {
    //var groupId = $(#xxxxxxxxxxx).val();  //根据groupId，点击退出对应的群聊

    $.ajax({
        type:"psot",
        url: "/GroupControl",//提交到的url
        dataType: "json",

        data: {"func":"leaveGroup", "groupId":groupId},
        // 定义发送请求的数据格式为JSON字符串

        contentType: "application/json;charset=UTF-8",
        success: function () {

        }
    });
}

/**
 * 创建群
 */
function createGroup() {
    //var groupName = $(#xxxxxxxxxxx).val();  //创建名为“groupName”的群聊

    $.ajax({
        type:"psot",
        url: "/GroupControl",//提交到的url
        dataType: "json",

        data: {"func":"createGroup", "groupName":groupName},
        // 定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=UTF-8",
        success: function () {

        }
    });
}

//此函数的目的是获取用户加入的所有群聊

displayGroup = function(){


    DisplayChatosGroup = {
        groupList:{
            showGroup:function (groupId, groupName) {

                var chat_groupbody = $('.layout .content .list-group .list-group-item');
                if (chat_groupbody.length > 0) {

                    $('#list_chat_group ').append(
                        '<li id="GroupId'+groupId+'" class="list-group-item " >\n'+
                        '<div>\n' +
                        '<figure class="avatar">\n' + '<img src="./media/img/man_avatar3.jpg" class="rounded-circle">\n' + ' </figure>\n' + '</div>' + '<div class="users-list-body"><h5>' + groupName +'</h5>'+' <div class="users-list-action action-toggle">\n' +
                        '<div class="dropdown">\n' +
                        '<a data-toggle="dropdown" href="#">\n' +
                        '<i class="ti-more"></i>\n' +
                        '</a>\n' +
                        '<div class="dropdown-menu dropdown-menu-right">\n' +
                        '<a href="#" class="dropdown-item">Open</a>\n' +
                        '<a href="#" data-navigation-target="contact-information" class="dropdown-item">Profile</a>\n' +
                        '<a href="#" class="dropdown-item">Add to archive</a>\n' +
                        '<a href="#" class="dropdown-item">Update</a>\n' +
                        '<a href="#" class="dropdown-item">Delete</a>\n' +
                        '</div>\n' +
                        '</div>\n' +
                        '</div>\n' +
                        '</div>\n'+
                        '</li>');
/*
                    chat_groupbody.scrollTop(chat_groupbody.get(0).scrollHeight, -1).niceScroll({
                        cursorcolor: 'rgba(66, 66, 66, 0.20)',
                        cursorwidth: "4px",
                        cursorborder: '0px'
                    });
*/
                }
            }
        }
    };

    //alert("测试用，通过！");

    $.ajax({
        type:"post",
        url: "/GroupControl",//提交到的url
        dataType: "json",
        //因为ajax默认是异步调用的，所以得到的返回值是空值，要得到值必须改成同步
        //async: false,
        //将JavaScript对象转换为JSON对象
        data: JSON.stringify({func:"displayGroup"}),
        // 定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=UTF-8",

        success: function (json) {
            var json_str = JSON.stringify(json);
            console.log(json_str);
            var data = eval("("+json_str+")");
            if(data.result === "success"){
                for(i = 0; i<data.return.length; i++){
                    DisplayChatosGroup.groupList.showGroup(data.return[i].gropId, data.return[i].gropName);//传入groupId和groupName并显示出来
                }
                alert("群组显示成功！");

            }else if(data.result === "failed"){
                //return false;
                alert("显示群组信息失败！");
            }else if(data.result === "error"){
                alert(data.error_info);
            }

            //返回群聊信息数组
        }
    });
}


function updateGroupInfo() {
    //var groupId = $(#xxxxxxxxxxx).val();    //修改对应groupId的群聊Id。
    //var groupName = $(#xxxxxxxxxxx).val();  //修改对应groupName的群聊名称。

    $.ajax({
        type:"psot",
        url: "/GroupControl",//提交到的url
        dataType: "json",

        //参数：groupId：群聊Id 和 groupName：群聊名称
        data: {"func":"displayGroup","groupId":groupId, "groupName":groupName},

        // 定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=UTF-8",
        success: function () {
                            //无返回值
        }
    });
}

function getGroupMember() {
    //var groupId = $(#xxxxxxxxx).val();  //获取对应groupId的群聊的所有成员。

    $.ajax({
        type:"psot",
        url: "/GroupControl",//提交到的url
        dataType: "json",

        data: {"func":"getGroupMember","groupId":groupId},
        // 定义发送请求的数据格式为JSON字符串

        contentType: "application/json;charset=UTF-8",
        success: function () {

            return   //返回用户信息数组
        }
    });
}


function isOwner() {
    var rs;

    $.ajax({
        type:"psot",
        url: "/GroupControl",//提交到的url
        // 定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        data: JSON.stringify({func:"isOwner"}),
        success: function () {
            if(map.result == "success"){
                alert("是群主！");
                rs = true;

            }else if(map.result == "failed"){
                //alert("不是群主，没有权限！");
                rs = false;

            }else {

            }
        }
    });

    return rs;
}

function deleteGroup() {

    //这里准备动态调用groupId
    var groupId = $(this).attr("id");
    alert(groupId);
/*
    $.ajax({
        type:"psot",
        url: "/GroupControl",//提交到的url
        // 定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        data: JSON.stringify({func:"deleteGroup", groupId:groupId}),
        success: function () {
            if(isOwner()){
                //
                //这里用jQuery写删除该群的代码
                //

                $("#groupId").remove(); //删除被选Id=groupId的元素


                alert("删除群聊成功！");
            }else {
                alert("删除失败，您不是群主，没有权限！");
            }


        }
    });
*/
}


function kickMember() {
        //var removeId = $("#xxxxxxxxxx").val();

    $.ajax({
        type:"psot",
        url: "/GroupControl",//提交到的url
        // 定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        data: JSON.stringify({func:"kickMember", remvoeId:remvoeId, groupId:groupId}),
        success: function () {

            //无返回
        }
    });
}