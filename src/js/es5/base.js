'use strict';

$(function () {
    // 收货地址插件的执行
    $('.sendcity').kuCity();

    // topbanner轮播图jq方法实现
    topbanner();
    function topbanner() {
        //1.把所有的图片放在右侧，第一个图片放到可视区
        //获取图片宽度
        var iW = $('#topbanner .view li').eq(0).outerWidth(); //JS offsetwidth

        $('#topbanner .view li').css('left', iW);
        $('#topbanner .view li').eq(0).css('left', 0);

        //2.开定时器：每次轮播一个图
        var timer = null;
        clearInterval(timer);
        var now = 0;

        timer = setInterval(next, 3000); //每隔2秒钟切换一个图

        function next() {
            //旧的挪走
            $('#topbanner .view li').eq(now).animate({ 'left': -iW }, 300);
            now = ++now >= $('#topbanner .view li').size() ? 0 : now;
            //新的快速放在右侧，再挪进可视区
            $('#topbanner .view li').eq(now).css('left', iW);
            $('#topbanner .view li').eq(now).animate({ 'left': 0 }, 300);
        }

        //鼠标经过停止，鼠标离开继续运动
        $('#topbanner').hover(function () {
            clearInterval(timer);
        }, function () {
            clearInterval(timer);
            timer = setInterval(next, 3000);
        });
    }

    // 点击搜索框，取消默认搜索框值
    $('.search input').on("focus", function () {
        $(this).val('');
    });
    // 搜索框失去焦点，input有value值
    $('.search input').on("blur", function () {
        $(this).val("褚橙优级果138元10斤");
    });

    // banner用封装的silderimg.js插件完成
    // sliderImg('banner', 'active');

    //回到顶部
    var gotop = document.getElementById("go_top");
    goBackTop(gotop);
    //封装点击回到顶部的函数
    function goBackTop(gotop) {
        var timer;
        //1.当页面滚动到一定的距离1000px，才出现totop
        window.onscroll = function () {
            if (window.scrollY >= 200) {
                gotop.style.display = "block";
            } else if (window.scrollY < 200) {
                gotop.style.display = "none";
            }
        };
        //2.定时器版，点击一点点匀速回顶部
        gotop.onclick = function () {
            clearInterval(timer);
            timer = setInterval(function () {
                //获取当前位置
                var currentY = window.scrollY;
                if (currentY <= 0) {
                    currentY = 0;
                    clearInterval(timer);
                }
                //逐渐减少50
                currentY -= 20;
                window.scrollTo(0, currentY);
            }, 1);
        };
    }

    //点击浮动窗口二维码
    $('#three_code').click(function () {
        $('#threecodeParent').toggle();
    });

    //成功登陆后显示你好，13112341234
    keyUname();
    function keyUname() {
        var unlogin = document.querySelector('#unlogin');
        var loginAndOut = document.querySelector('#loginAndOut');
        var loginUname = document.querySelector('.loginUname');
        console.log(document.cookie);
        if (Cookie.get('uname')) {
            //top
            unlogin.style.display = "none";
            loginAndOut.style.display = "block";
            loginUname.innerHTML = Cookie.get('uname');
            //myHome
            $('#my_nickname .login').css('display', 'none');
            $('#my_nickname .return').css('display', 'block');
            $('#my_nickname .returnUname').html(Cookie.get('uname'));
            // loginUname.innerHTML = Cookie.get('uname');
            console.log("cookie");
        } else if (getSearch(location.search, 'uname')) {
            var uname = getSearch(location.search, 'uname'); //common获取url里某个参数的值
            unlogin.style.display = "none";
            loginAndOut.style.display = "block";
            loginUname.innerHTML = uname;
            //myHome
            $('#my_nickname .login').css('display', 'none');
            $('#my_nickname .return').css('display', 'block');
            $('#my_nickname .returnUname').html(uname);
            console.log("url");
        } else {
            //top
            unlogin.style.display = "block";
            loginAndOut.style.display = "none";
            loginUname.innerHTML = "";
            //myHome
            $('#my_nickname .login').css('display', 'block');
            $('#my_nickname .return').css('display', 'none');
            $('#my_nickname .returnUname').html("");
        }
    }

    //退出用户名
    function unameReturn() {
        var yes = confirm("亲爱的，您确定要退出本来生活吗？");
        if (yes) {
            //top
            $('#unlogin').css('display', 'block');
            $('#loginAndOut').css('display', 'none');
            $('.loginUname.innerHTML').html("");
            //myHome
            $('#my_nickname .login').css('display', 'block');
            $('#my_nickname .return').css('display', 'none');
            $('#my_nickname .returnUname').html("");
            //购物车样式记录隐藏
            $('#go_cart').html("0");
            $('#HeaderCartCount').html("0");
            $('#cartListView ul').css('display', 'none');

            //清除cookie
            Cookie.remove('uname');
            Cookie.remove('upwd');

            // location.href='index.html';
            // location.href='html/login.html';
        }
    }

    //点击头部[退出]
    // console.log($("#loginAndOut a"));
    $("#loginAndOut a").click(function () {
        unameReturn();
    });
    //点击我的本来[退出]
    $('.return a').click(function () {
        unameReturn();
    });

    //点击.nav_y导航条跳转至列表页
    //点击h1标签跳转到首页

});