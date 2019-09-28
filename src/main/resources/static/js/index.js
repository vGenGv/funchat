/**
 * 主界面 js 代码
 *
 * 依赖 funchat.js
 */

!$(function () {
    var iNdex = {
        Ws: {
            ws: undefined,
            openWebSocket: function (func) {
                if (typeof (WebSocket) == "undefined") {
                    console.log("openSocket: 您的浏览器不支持 WebSocket");
                } else {
                    console.log("openSocket: 您的浏览器支持 WebSocket");
                    var socketUrl = "ws://" + window.location.host + "/websocket";
                    console.log(socketUrl);
                    this.ws = new WebSocket(socketUrl);
                    //打开事件
                    this.ws.onopen = function () {
                        console.log("Websocket 已打开");
                        if (typeof (func) == "function")
                            this.onMessage = func;
                    };
                    //获得消息事件
                    this.ws.onmessage = function (msg) {
                        console.log("接收消息:" + msg.data);
                        if (typeof (this.onMessage) == "function")
                            this.onMessage(msg.data);
                    };
                    //关闭事件
                    this.ws.onclose = function () {
                        console.log("Websocket 已关闭");
                    };
                    //发生了错误事件
                    this.ws.onerror = function () {
                        console.log("Websocket 发生了错误");
                    }
                }
            },
            sendMessage: function (data) {
                if (data)
                    this.ws.send(data);
            },
            onMessage: undefined
        },
        Group: {
            current: 0
        },
        sendFriendMessage: function (friendId) {
            iNdex.Ws.sendMessage('[{"cmd":"updateUi","toUserId":"' + friendId + '"}]');
        },
        sendGroupMessage: function (groupId, content) {
            iNdex.Ws.sendMessage(
                '[{"cmd":"sendMessage","toGroupId":"' + groupId + '","contentText":"' + content + '"}]');
        },
        displayGroup: function () {
            funChat.Utils.jsonAjax("/GroupControl", "post",
                {func: "displayGroup"},
                {
                    success_call: function (map) {
                        var list = [];
                        for (var i = 0; i < map.return.length; i++) {
                            var item = {};
                            var o = map.return[i];
                            item.title = o.gropName;
                            item.description = "ID: " + o.gropId + ", 人数: " + o.sum;
                            item.color = "success";
                            item.icon = funChat.Utils.randomLetter(1, 26);
                            item.downlist = [];
                            item.downlist.push({text: "修改", value: "message"});
                            item.downlist.push({text: "删除", value: "delete"});
                            item.datalist = [];
                            item.datalist.push({key: "group-id", value: o.gropId});
                            item.datalist.push({key: "group-name", value: o.gropName});
                            item.datalist.push({key: "group-sum", value: o.sum});
                            item.datalist.push({key: "group-color", value: item.color});
                            item.datalist.push({key: "group-icon", value: item.icon});
                            item.datalist.push({key: "group-info", value: "group-info"});
                            list.push(item);
                        }
                        funChat.List.updateList("chats", list);
                    }
                })
        },

        displaySelf: function () {
            funChat.Utils.jsonAjax("/UserControl", "post",
                {func: "getUserInfo"},
                {
                    success_call: function (map) {
                        var o = $("#android_info");
                        o.attr("data-user-id", map.return.id);
                        o.attr("data-user-name", map.return.username);
                        o.attr("data-user-gender", map.return.geder);
                        o.attr("data-user-tel", map.return.telephone);
                        o.attr("data-user-email", map.return.mail);
                        o.attr("data-user-addr", map.return.addr);
                        o.attr("data-user-sign", map.return.perSignature);
                        o.attr("data-user-birthday", map.return.birthday);
                        o.attr("data-user-color", funChat.Utils.color.green);
                        o.attr("data-user-icon", "U");
                    }
                })
        },

        displayFriend: function () {
            var list = [];
            funChat.Utils.jsonAjax("/FriendControl", "post",
                {func: "getUserFriendsAccept"},
                {
                    success_call: function (map) {
                        for (var i = 0; i < map.return.length; i++) {
                            var item = {};
                            var o = map.return[i];
                            item.title = o.username;
                            item.description = "ID: " + o.id;
                            item.color = funChat.Utils.color.cyan;
                            item.icon = funChat.Utils.randomLetter(1, 26);
                            item.downlist = [];
                            item.downlist.push({text: "删除", value: "delete"});
                            item.datalist = [];
                            item.datalist.push({key: "user-id", value: o.id ? o.id : ""});
                            item.datalist.push({key: "user-name", value: o.username ? o.username : ""});
                            item.datalist.push({key: "user-gender", value: o.geder ? o.geder : ""});
                            item.datalist.push({key: "user-tel", value: o.telephone ? o.telephone : ""});
                            item.datalist.push({key: "user-email", value: o.mail ? o.mail : ""});
                            item.datalist.push({key: "user-addr", value: o.addr ? o.addr : ""});
                            item.datalist.push({key: "user-sign", value: o.perSignature ? o.perSignature : ""});
                            item.datalist.push({key: "user-birthday", value: o.birthday ? o.birthday : ""});
                            item.datalist.push({key: "user-color", value: item.color});
                            item.datalist.push({key: "user-icon", value: item.icon});
                            item.datalist.push({key: "my-toggle", value: "navigation"});
                            item.datalist.push({key: "my-target", value: "contact-information"});
                            item.datalist.push({key: "user-info", value: "contact-information"});
                            list.push(item);
                        }
                        funChat.Utils.jsonAjax("/FriendControl", "post",
                            {func: "getUserWantFriends"}, {
                                success_call: function (map2) {
                                    for (var i = 0; i < map2.return.length; i++) {
                                        var item = {};
                                        var o = map2.return[i];
                                        item.title = "好友申请";
                                        item.description = "名称: " + o.username + ", ID: " + o.id;
                                        item.color = funChat.Utils.color.orange;
                                        item.icon = "Q";
                                        item.downlist = [];
                                        item.downlist.push({text: "接受", value: "accept"});
                                        item.downlist.push({text: "拒绝", value: "reject"});
                                        item.datalist = [];
                                        item.datalist.push({key: "user-id", value: o.id ? o.id : ""});
                                        item.datalist.push({key: "user-name", value: o.username ? o.username : ""});
                                        item.datalist.push({key: "user-gender", value: o.geder ? o.geder : ""});
                                        item.datalist.push({key: "user-tel", value: o.telephone ? o.telephone : ""});
                                        item.datalist.push({key: "user-email", value: o.mail ? o.mail : ""});
                                        item.datalist.push({key: "user-addr", value: o.addr ? o.addr : ""});
                                        item.datalist.push({
                                            key: "user-sign",
                                            value: o.perSignature ? o.perSignature : ""
                                        });
                                        item.datalist.push({key: "user-birthday", value: o.birthday ? o.birthday : ""});
                                        item.datalist.push({key: "user-color", value: item.color});
                                        item.datalist.push({key: "user-icon", value: item.icon});

                                        item.datalist.push({key: "my-toggle", value: "navigation"});
                                        item.datalist.push({key: "my-target", value: "contact-information"});
                                        item.datalist.push({key: "user-info", value: "contact-information"});
                                        list.push(item);
                                    }
                                    funChat.List.updateList("friends", list);
                                }
                            });
                    }
                })
        },
        updateChat: function (item) {
            var chat_head = $('.chat .chat-header .chat-header-user');
            chat_head.empty();
            chat_head.append(
                '<div class="avatar-group">\n' +
                '    <figure class="avatar avatar-lg">\n' +
                '            <span class="avatar-title bg-' + item.color + ' rounded-circle">\n' +
                '                ' + item.icon + '\n' +
                '            </span>\n' +
                '    </figure>\n' +
                '</div>\n' +
                '<div>\n' +
                '    <h5>' + item.name + '</h5>\n' +
                '    <small class="text-muted">\n' +
                '        <i>ID: ' + item.id + ', 人数: ' + item.sum + '</i>\n' +
                '    </small>\n' +
                '</div>');
            $('.chat').attr("data-chat-group-id", item.id);
        }
    };

    //消息处理
    var messageHandle = function (json_str) {
        var data = $.parseJSON(json_str);
        switch (data.cmd) {
            case "updateUi":
                iNdex.displayFriend();
                iNdex.displayGroup();
                break;
            case "sendMessage":
                var user_id = $("#android_info").data("user-id");
                var o = $(".chat .chat-body .messages");
                o.append(
                    '<div class="message-item ' + ((data.fromUserId == user_id) ? 'outgoing-message' : ' ') + '">\n' +
                    '    <div class="message-content">\n' +
                    '        ' + data.contentText + '\n' +
                    '    </div>\n' +
                    '    <div class="message-action">\n' +
                    '        来自: ' + data.fromUserName + '(' + data.fromUserId + ')\n' +
                    '    </div>\n' +
                    '</div>');
                var oo = $(".chat .chat-body");
                oo.scrollTop(oo.get(0).scrollHeight, -1);
                break;
        }
    };

    //初始化
    $(document).ready(function () {
        funChat.Started.pageLoadingClose();
        iNdex.displayGroup();
        iNdex.displayFriend();
        iNdex.displaySelf();
        iNdex.Ws.openWebSocket(messageHandle);
    });

    //搜索好友按钮点击
    $(document).on("click", "#addFriends [data-modal-button='search']", function () {
        var search_name = $(this).closest("form").find("input").val();
        funChat.Utils.jsonAjax("/UserControl", "post",
            {func: "searchUser", searchIdOrName: search_name}, {
                success_call: function (map) {
                    var list = [];
                    for (var i = 0; i < map.return.length; i++) {
                        var item = {};
                        var o = map.return[i];
                        item.title = o.username;
                        item.description = "ID: " + o.id;
                        item.color = funChat.Utils.color.green;
                        item.icon = funChat.Utils.randomLetter(1, 26);
                        item.button_text = "添加";
                        item.button_value = "add";
                        item.datalist = [];
                        item.datalist.push({key: "user-id", value: o.id ? o.id : ""});
                        list.push(item);
                    }
                    funChat.Search.updateList("addFriends", list);
                }
            })
    });

    //添加好友按钮点击
    $(document).on("click", "#addFriends [data-list-button='add']", function () {
        var user_id = $(this).closest(".list-group-item").data("user-id");
        funChat.Utils.jsonAjax("/FriendControl", "post",
            {func: "addFriend", friendId: user_id}, {
                success_call: function (map) {
                    iNdex.sendFriendMessage(user_id);
                    alert("发送好友请求成功！");
                },
                failed_call: function (map) {
                    alert("抱歉：发送好友请求失败！");
                }
            })
    });

    //删除好友下拉菜单点击
    $(document).on("click", "#friends [data-list-dropdown='delete']", function (e) {
        var o = $(this).closest(".list-group-item");
        var user_id = o.data("user-id");
        funChat.Utils.jsonAjax("/FriendControl", "post",
            {func: "deleteFriend", friendId: user_id}, {
                success_call: function (map) {
                    o.remove();
                    iNdex.sendFriendMessage(user_id);
                    var oo = $(".sidebar-group .sidebar#contact-information");
                    oo.removeClass("active");
                    oo.closest(".sidebar-group").removeClass("mobile-open");
                },
                failed_call: function (map) {
                    alert("抱歉：删除好友失败！");
                }
            });
        e.stopPropagation();
    });

    //接受好友下拉菜单点击
    $(document).on("click", "#friends [data-list-dropdown='accept']", function (e) {
        var o = $(this).closest(".list-group-item");
        var user_id = o.data("user-id");
        funChat.Utils.jsonAjax("/FriendControl", "post",
            {func: "acceptFriend", friendId: user_id}, {
                success_call: function (map) {
                    iNdex.displayFriend();
                    iNdex.sendFriendMessage(user_id);
                    var oo = $(".sidebar-group .sidebar#contact-information");
                    oo.removeClass("active");
                    oo.closest(".sidebar-group").removeClass("mobile-open");
                },
                failed_call: function (map) {
                    alert("抱歉：接受好友失败！");
                }
            });
        e.stopPropagation();
    });

    //拒绝好友下拉菜单点击
    $(document).on("click", "#friends [data-list-dropdown='reject']", function (e) {
        var o = $(this).closest(".list-group-item");
        var user_id = o.data("user-id");
        funChat.Utils.jsonAjax("/FriendControl", "post",
            {func: "rejectFriend", friendId: user_id}, {
                success_call: function (map) {
                    iNdex.displayFriend();
                    var oo = $(".sidebar-group .sidebar#contact-information");
                    oo.removeClass("active");
                    oo.closest(".sidebar-group").removeClass("mobile-open");
                },
                failed_call: function (map) {
                    alert("抱歉：拒绝好友失败！");
                }
            });
        e.stopPropagation();
    });


    /*
        var o = $("#android_info");
        o.attr("data-user-id", map.return.id);
        o.attr("data-user-name", map.return.username);
        o.attr("data-user-gender", map.return.geder);
        o.attr("data-user-tel", map.return.telephone);
        o.attr("data-user-email", map.return.mail);
        o.attr("data-user-addr", map.return.addr);
        o.attr("data-user-sign", map.return.perSignature);
        o.attr("data-user-birthday", map.return.birthday);
        o.attr("data-user-color", funChat.Utils.color.green);
        o.attr("data-user-icon", "U");

        */

    //修改个人信息点击
    $(document).on("click", "[data-target='#editProfileModal']", function () {
        var o = $("#android_info");
        var _username = o.data("user-name");
        var _geder = o.data("user-gender");
        var _telephone = o.data("user-tel");
        var _mail = o.data("user-email");
        var _addr = o.data("user-addr");
        var _perSignature = o.data("user-sign");
        var _birthday = o.data("user-birthday");
        $("#editProfileModal .form-group #username").val(_username);
        $("#editProfileModal .form-group #gender").val(_geder);
        $("#editProfileModal .form-group #telephone").val(_telephone);
        $("#editProfileModal .form-group #mail").val(_mail);
        $("#editProfileModal .form-group #addr").val(_addr);
        $("#editProfileModal .form-group #perSignature").val(_perSignature);
        $("#editProfileModal .form-group #birthday ").val(_birthday);
    });

    $(document).on("click", "#save_user_info", function () {
        var _username = $("#editProfileModal .form-group #username").val();
        var _geder = $("#editProfileModal .form-group #gender").val();
        var _telephone = $("#editProfileModal .form-group #telephone").val();
        var _mail = $("#editProfileModal .form-group #mail").val();
        var _addr = $("#editProfileModal .form-group #addr").val();
        var _perSignature = $("#editProfileModal .form-group #perSignature").val();
        var _birthday = $("#editProfileModal .form-group #birthday ").val();

        funChat.Utils.jsonAjax("/UserControl", "post",
            {
                func: "updateUserInfo",
                username: _username,
                geder: _geder,
                birthday: _birthday,
                telephone: _telephone,
                addr: _addr,
                mail: _mail,
                perSignature: _perSignature
            },
            {
                success_call: function (map) {
                    alert("修改信息成功！");
                    $("#editProfileModal").modal('hide');
                },
                failed_call: function (map) {
                    alert("修改信息错误！");
                }
            });
    });

    //搜索群聊按钮点击
    $(document).on("click", "#joinGroups [data-modal-button='search']", function () {
        var search_name = $(this).closest("form").find("input").val();
        funChat.Utils.jsonAjax("/GroupControl", "post",
            {func: "searchGroup", searchIdOrName: search_name}, {
                success_call: function (map) {
                    var list = [];
                    for (var i = 0; i < map.return.length; i++) {
                        var item = {};
                        var o = map.return[i];
                        item.title = o.gropName;
                        item.description = "ID: " + o.gropId + ", 人数: " + o.sum;
                        item.color = funChat.Utils.color.green;
                        item.icon = funChat.Utils.randomLetter(1, 26);
                        item.button_text = "加入";
                        item.button_value = "join";
                        item.datalist = [];
                        item.datalist.push({key: "group-id", value: o.gropId ? o.gropId : ""});
                        list.push(item);
                    }
                    funChat.Search.updateList("joinGroups", list);
                }
            })
    });

    //加入群聊按钮点击
    $(document).on("click", "#joinGroups [data-list-button='join']", function () {
        var group_id = $(this).closest(".list-group-item").data("group-id");
        funChat.Utils.jsonAjax("/GroupControl", "post",
            {func: "joinGroup", groupId: group_id},
            {
                success_call: function (map) {
                    alert("加入群聊成功！");
                    $("#joinGroups").modal('hide');
                    iNdex.displayGroup();
                },
                failed_call: function (map) {
                    alert("加入群聊失败！");
                }
            })
    });

    //用户信息显示点击
    $(document).on("click", "[data-user-info]", function () {
        var e = $(this).data("user-info");
        var list = {};
        list.name = $(this).data("user-name");
        list.id = $(this).data("user-id");
        list.color = $(this).data("user-color");
        list.icon = $(this).data("user-icon");
        list.items = [];
        list.items.push({text: "性别", content: $(this).data("user-gender")});
        list.items.push({text: "生日", content: $(this).data("user-birthday")});
        list.items.push({text: "电话", content: $(this).data("user-tel")});
        list.items.push({text: "地址", content: $(this).data("user-addr")});
        list.items.push({text: "邮箱", content: $(this).data("user-email")});
        list.items.push({text: "签名", content: $(this).data("user-sign")});
        funChat.Info.updateInfo(e, list);
    });


    //群聊切换点击
    $(document).on("click", "[data-group-info]", function () {
        item = {};
        item.id = $(this).data("group-id");
        item.name = $(this).data("group-name");
        item.sum = $(this).data("group-sum");
        item.color = $(this).data("group-color");
        item.icon = $(this).data("group-icon");
        iNdex.updateChat(item);
    });

    $(document).on("click", "#chat-send", function () {
        var toGroupId = $('.chat').data('chat-group-id');
        var contentText = $("#chat-input").val();
        iNdex.sendGroupMessage(toGroupId, contentText);
    });

    //删除群聊
    $(document).on("click", "#chats [data-list-dropdown='delete']", function () {
        // 这个this指向当前点击对象,this是JS对象的一个特殊指针，它的指向根据环境不同而发生变化
        var o = $(this).closest(".list-group-item");
        var group_id = o.data("group-id");
        //暂时我这么理解：获取当前点击的自定义属性（是jquery对象）并把它转化为JavaScript对象.

        funChat.Utils.jsonAjax("/GroupControl", "post",
            {func: "isOwner", groupId: group_id},
            {
                success_call: function (map) {
                    //删除这个类为 list-group-item 的整个对象
                    //o.remove();
                    alert("您是群主！");
                    funChat.Utils.jsonAjax("/GroupControl", "post",
                        {func: "deleteGroup", groupId: group_id},
                        {
                            success_call: function (map) {
                                o.remove();
                                alert("您已解散本群:" + group_id);
                            }
                        });
                },
                failed_call: function (map) {
                    alert("isOwner: false, 不是群主，没有权限！");
                }
            }
        )
    });

    //弹出群聊信息模态框
    $(document).on("click", ".list-group-item [data-list-dropdown='message']", function () {
        var o = $(this).closest(" .list-group-item");
        var group_id = o.data("group-id");
        //让id为 updateGroupInfoModal 的 模态框 显示出来
        $("#updateGroupInfoModal").modal('show');

        //attr('id',"idname")为id为upgrade_groupName的父元素中最近的的div添加一个id为 group_id
        $("#upgrade_groupName").closest("div").attr('id', group_id);
    });

    //修改群聊名称
    $("#update_group_info_btn").on('click', function () {
        //获取id为 upgrade_groupName 的修改后的group_name
        var group_name = $("#upgrade_groupName").val();
        console.log("从模态框取group_name:" + group_name);
        //attr("id")获取被选元素的id
        var group_id = $("#upgrade_groupName").closest("div").attr("id");

        console.log("获取到的id为：" + group_id);

        funChat.Utils.jsonAjax("/GroupControl", "post",
            {func: "updateGroupInfo", groupId: group_id, groupName: group_name},
            {
                success_call: function (map) {
                    alert("更新群聊信息成功！");
                    //隐藏模态框并把群聊列表重新显示出来
                    $("#updateGroupInfoModal").modal('hide');
                    iNdex.displayGroup();
                },
                failed_call: function (map) {
                    alert("没有权限！");
                }
            }
        )

    });

    //添加群聊
    $(document).on('click', "#newGroup .modal-footer .btn", function () {
        var group_name = $(".form-group #group_name").val();
        //console.log(group_name);
        funChat.Utils.jsonAjax("/GroupControl", "post",
            {func: "createGroup", groupName: group_name},
            {
                success_call: function (map) {
                    alert("创建新的群聊成功！");
                    $("#newGroup").modal('hide');
                    iNdex.displayGroup();
                },
                failed_call: function (map) {
                    alert("参数错误！");
                }
            }
        )
    });
});