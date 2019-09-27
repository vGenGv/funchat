/**
 * 主界面 js 代码
 *
 * 依赖 funchat.js
 */

!$(function () {
    var iNdex = {
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
                            item.downlist.push({text: "信息", value: "message"});
                            item.downlist.push({text: "删除", value: "delete"});
                            item.datalist = [];
                            item.datalist.push({key: "group-id", value: o.gropId});
                            item.datalist.push({key: "group-name", value: o.gropName});
                            list.push(item);
                        }
                        funChat.List.updateList("chats", list);
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
                                        item.icon = funChat.Utils.randomLetter(1, 26);
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
                                        list.push(item);
                                    }
                                    funChat.List.updateList("friends", list);
                                }
                            });
                    }
                })
        }
    };

    //初始化
    $(document).ready(function () {
        funChat.Started.pageLoadingClose();
        iNdex.displayGroup();
        iNdex.displayFriend();
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
                    alert("发送好友请求成功！");
                },
                failed_call: function (map) {
                    alert("抱歉：发送好友请求失败！");
                }
            })
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

    $(document).on("click", "#chats [data-list-dropdown='delete']", function () {
        // 这个this指向当前点击对象,this是JS对象的一个特殊指针，它的指向根据环境不同而发生变化
        var o = $(this).closest(".list-group-item");
        var group_id = o.data("group-id");
        //暂时我这么理解：获取当前点击的自定义属性（是jquery对象）并把它转化为JavaScript对象.

        funChat.Utils.jsonAjax("/GroupControl", "post",
            {func: "isOwner", groupId: group_id},
            {
                success_call: function (map) {
                    o.remove();
                    alert("删除groupId为" + group_id + "的群成功！");
                },
                failed_call: function (map) {
                    alert("isOwner: false, 不是群主，没有权限！");
                }
            }
        )
    });

});