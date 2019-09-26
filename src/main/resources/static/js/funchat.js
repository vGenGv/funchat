!$(function () {
    //初始化分装对象
    var i = {
        Started: {
            //更好的进度条样式
            niceScrollStyle: {
                cursorcolor: "rgba(66, 66, 66, 0.20)",
                cursorwidth: "4px",
                cursorborder: "0px"
            },
            //是否是小屏幕
            mobile: false,
            //关闭加载页面-减淡消失
            pageLoadingClose: function () {
                $(".page-loading").fadeOut(500, function () {
                    $(this).remove();
                })
            },
            //小屏幕判断
            mobileDetect: function () {
                var w = window.innerWidth;
                this.mobile = w <= 1020;
            },
            //初始化
            init: function () {
                this.pageLoadingClose();
                this.mobileDetect();
            }
        }
    };

    //启用 tooltip
    $('[data-toggle="tooltip"]').tooltip();

    //初始化
    $(document).ready(function () {
        i.Started.init();
    });

    //窗口大小改变
    $(window).on("resize", function () {
        i.Started.mobileDetect();
        $(".sidebar-group").removeClass("mobile-open");
        $(".chat+.sidebar-group .sidebar").removeClass("active");
    });

    //点击导航切换 sidebar
    $(document).on("click", "[data-navigation-target]", function () {
        //获取源对象和目标对象
        var e = $(this).data("navigation-target"),
            o = $(".sidebar-group .sidebar#" + e);
        //sidebar 切换
        o.closest(".sidebar-group").find(".sidebar").removeClass("active");
        o.addClass("active");
        //设置 sidebar 内的焦点
        o.find("form input:first").focus();
        //导航切换
        $("[data-navigation-target]").removeClass("active");
        $('[data-navigation-target="' + e + '"]').addClass("active");
        i.Started.mobile && ($(".sidebar-group").removeClass("mobile-open"),
            o.closest(".sidebar-group").addClass("mobile-open"));
    });

    //关闭 sidebar
    $(document).on("click", ".sidebar-close", function (e) {
        i.Started.mobile ?
            $(".sidebar-group").removeClass("mobile-open") :
            $(this).closest(".sidebar.active").removeClass("active");
    });
});