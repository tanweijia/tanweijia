"use strict";

$(function () {
    //打开登录后 购物车信息自动跟新请求查询
    var url_carShowNunfrist = "../";
    autoCar(url_carShowNunfrist);

    //点击.nav_y导航条跳转至列表页
    $('.nav_y').on("click", function () {
        location.href = 'list.html';
    });

    //点击h1标签跳转到首页
    $('h1').on("click", function () {
        location.href = '../index.html';
    });

    var phoneTxt = document.getElementById("phoneTxt");
    var phoneMes = document.getElementById("phoneMes");
    var pswTxt = document.getElementById("pswTxt");
    var pswMes = document.getElementById("pswMes");
    var remember_me = document.getElementById("remember_me");
    var registerBtn = document.getElementById("registerBtn");

    //每次进入登录页面渲染
    init();
    function init() {
        //top
        $('#unlogin').css('display', 'block');
        $('#loginAndOut').css('display', 'none');
        $('.loginUname.innerHTML').html("");
        //myHome
        $('#my_nickname .login').css('display', 'block');
        $('#my_nickname .return').css('display', 'none');
        $('#my_nickname .returnUname').html("");

        // if(Cookie.get('uname'))
        var url = "";
        // if(location.search))
    }
    //点击用户输入框，取消输入框默认value值
    phoneTxt.onclick = function () {
        var val = phoneTxt.value;
        if (val == "请输入手机号") {
            phoneTxt.value = "";
        }
    };
    //取出来:取出cookie保存的内容，显示在表单中
    if (Cookie.get('uname') && Cookie.get('uname') != 'undefined') {
        console.log("免登陆");
        var name = Cookie.get('uname');
        var pwdval = Cookie.get('upwd');
        phoneTxt.value = name;
        pswTxt.value = pwdval;
    }

    //1.账号与密码必须存在值，才能点击提交成功登陆.取消浏览器的默认行为
    //  * 注意去除值的前后空格
    registerBtn.onclick = function (e) {
        e.preventDefault();
        var _phoneTxt = phoneTxt.value;
        var _pswTxt = pswTxt.value;
        //3.再次进入页面的时候，拿到所有的cookie，从中判断是否存在用户名及密码的cookie，说明可以直接跳转
        if (Cookie.get('uname')) {
            //用户名和密码正确
            if (phoneTxt.value == Cookie.get('uname') && Cookie.get('upwd') && checkReg.tel(phoneTxt.value)) {
                // if(phoneTxt.value){
                // location.href='../index.html?uname='+phoneTxt.value;
                // var uphone = phoneTxt.value;
                // document.cookie = "uname="+uphone;
                location.href = '../index.html';
                phoneMes.innerHTML = '';
                pswMes.innerHTML = '';

                // }
            } else {
                // console.log(document.cookie);
                phoneMes.innerHTML = '用户名或密码不正确';
            }
        } else {
            //每次登陆或者每次输入用户名和密码
            //两个输入框没填写或为空时
            if ((_phoneTxt.trim().length == 0 || _phoneTxt == "请输入手机号") && _pswTxt.trim().length == 0) {
                phoneMes.innerHTML = '账号或密码为空,请重新输入';
                console.log(666);
            } else if (_pswTxt.trim().length == 0) {
                pswMes.innerHTML = '请输入密码!';
                phoneMes.innerHTML = '';
            } else {
                var xhr = new XMLHttpRequest();
                //改用post方式提交数据:参数是放在send方法里面提交
                xhr.open('POST', '../api/login_select.php', true);
                //post方式发送数据，要设置请求头
                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                var data = "name=" + _phoneTxt + "&psw=" + _pswTxt;
                xhr.send(data); //post方式，send的实参就是数据

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                        var str = xhr.responseText;
                        console.log(str);
                        if (str == 'yes') {
                            //成功注册跳转到登陆页面
                            //2.存数据，如果多选框被选中时，用cookie保存用户名及密码
                            if (remember_me.checked) {
                                // console.log(666);
                                var d = new Date();
                                d.setDate(d.getDate() + 7);
                                document.cookie = "uname=" + _phoneTxt + "; expires=" + d.toUTCString() + "; path=/";
                                document.cookie = "upwd=" + _pswTxt + "; expires=" + d.toUTCString() + "; path=/";
                            } else {
                                document.cookie = "uname=" + _phoneTxt + "; path=/";
                                document.cookie = "upwd=" + _pswTxt + "; path=/";
                            }
                            // location.href='../index.html?uname='+_phoneTxt;
                            location.href = '../index.html';
                            phoneMes.innerHTML = '';
                            pswMes.innerHTML = '';
                        } else if (str == 'new') {
                            phoneMes.innerHTML = '用户名不存在';
                            pswMes.innerHTML = '';
                        } else {
                            phoneMes.innerHTML = '用户名或密码不正确';
                            pswMes.innerHTML = '';
                        }
                    }
                };
            }
        }
    };
});