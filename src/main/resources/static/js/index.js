/**
 * 主界面 js 代码
 *
 * 依赖 funchat.js
 */

!$(function () {
    var iNdex = {};

    //初始化
    $(document).ready(function () {
        funChat.Started.pageLoadingClose();
        funChat.List.updateList("friends",
            [{
                title: funChat.Utils.randomLetter(1, 26),
                description: "HaHaHa",
                color: "warning",
                datalist: [{key: "hahaha", value: "123"}, {key: "aaa", value: "456"}]
            }]);
    });

});