$(function () {

    //左侧导航
    if ($(".floors").children().length > 0) {
        $(".floor-nav li").click(function () {
            var currentE = $(".floor").eq($(this).index());
            $("html,body").stop().animate({ scrollTop: currentE.offset().top - 1 }, 600);
        });

        $(window).scroll(function () {
            if ($(document).scrollTop() > ($('.floor').first().offset().top - $(window).height() / 2 - 100) && $(document).scrollTop() + $(window).height() < $(document).height() - 200) {
                $('.floor-nav').fadeIn()
            } else {
                $('.floor-nav').fadeOut()
            }

            $(".floor").each(function () {
                if ($(this).offset().top <= $(document).scrollTop() + $(window).height() / 2) {
                    $(".floor-nav li").delay(300).eq($(this).index()).addClass("cur").siblings().removeClass();
                    
                }
            })
        });
    }

    var timeoutid;
    $(".floorA .floorA-hd ul li").each(function (index) {
        $(this).mouseover(function () {
            var t = $(this);
            timeoutid = setTimeout(function () {

                t.addClass("active").siblings().removeClass("active");

                $(".floorA .floorA-right .tab-right").eq(index).addClass("current").siblings().removeClass("current");
            }, 300);
        }).mouseout(function () {
            clearTimeout(timeoutid);
        });
    });
   
    //关闭首页弹层
    $('.tc').find('.close').click(function () {
        $('.tc').hide();
        addCookie('tc', '1', 4);
    });
    checkCookie();
})
function checkCookie() {
    var date = getCookie('tc');
    if (date != '') {
        $('.tc').hide();
        addCookie(10, 1);
    } else {
        $('.tc').show();
    }
}
//写Cookie
function addCookie(objName, objValue, objHours) {
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}

//读Cookie
function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
    return "";
}


//倒计时
String.format = function () {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};
function TimeFormat(time) {
    if (parseInt(time) < 10) {
        return "0" + time
    } else {
        return time;
    }
}

function CountDown(TimeHtml) {
    $(".countdown").each(function () {
        //var lxfday = $(this).attr("lxfday"); //用来判断是否显示天数的变量  
        var time = $(this).attr("endtime"); //获取到时间  

        //如果时间格式是2012-2-12需要转换成2012/2/12  
        //time = time.replace(/-/g, "/"); //替换所有“-”，g为全局标志，另外如果加i就忽略大小写：2010/01/05  
        //var nowtime = time.replace((/-/g, "/"); //替换所有“-”，g为全局标志，另外如果加i就忽略大小写：2010/01/05  

        var endtime = new Date(time).getTime(); //取结束日期(毫秒值)  
        var nowtime = new Date().getTime();        //今天的日期(毫秒值)  
        var youtime = endtime - nowtime; //还有多久(毫秒值)  
        var seconds = youtime / 1000;
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var CDay = days;
        var CHour = hours % 24;
        var CMinute = minutes % 60;
        var CSecond = Math.floor(seconds % 60); //"%"是取余运算，可以理解为60进一后取余数，然后只要余数。

        var minuteSeconds = youtime.toString();
        var CMinuteSeconds = minuteSeconds.substring((minuteSeconds.length - 3), (minuteSeconds.length - 2));

        if (endtime <= nowtime) {
            $(this).html("已过期")//如果结束日期小于当前日期就提示过期啦  
        } else {
            var html = String.format(TimeHtml, TimeFormat(CDay), TimeFormat(CHour), TimeFormat(CMinute), TimeFormat(CSecond), CMinuteSeconds);
            $(this).html(html);
        }
    });

    setTimeout("CountDown('还剩{0}天{1}时{2}分{3}结束')", 100);
};
CountDown('还剩{0}天{1}时{2}分{3}结束');



