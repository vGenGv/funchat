function new_login(){
    // 获取输入的用户名和密码
    var username = $("#username").val();
    var password = $("#password").val();
    $.ajax({
        url: "/login",
        type: "post",
        // data表示发送的数据
        data: JSON.stringify({username: username, password: password}),
        // 定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=UTF-8",
        //定义回调响应的数据格式为JSON字符串,该属性可以省略
        dataType: "json",
        //成功响应的结果
        success: function (map) {
            if (map != null) {
                alert(map.msg);
            }
        }
    });
}

function register() {
    // 获取输入的用户名和密码
    var username = $("#rusername").val();
    var password = $("#rpassword").val();
    var telephone = $("#rtelephone").val();
    var email= $("#remail").val();
    $.ajax({
        url: "/register",
        type: "post",
        // data表示发送的数据
        data: JSON.stringify({username: username, password: password,telephone:telephone,email:email}),
        // 定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=UTF-8",
        //定义回调响应的数据格式为JSON字符串,该属性可以省略
        dataType: "json",
        //成功响应的结果
        success: function (map) {
            if (map != null) {
                alert(map.msg);
            }
        }
    });
}
function turn_to_login(){
    document.getElementById('login_form').style.display = "block";
    document.getElementById('register_form').style.display = "none";
}
 function turn_to_register() {
    document.getElementById('login_form').style.display = "none";
    document.getElementById('register_form').style.display = "block";
}