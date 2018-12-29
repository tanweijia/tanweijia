'use strict';

document.addEventListener('DOMContentLoaded', function () {
    //打开注册后 购物车信息自动跟新请求查询
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

    var phoneTxt = document.querySelector('#phoneTxt');
    var phoneMes = document.querySelector('#phoneMes');
    var nameOk = false;
    var registerBtn = document.querySelector('#registerBtn'); //name top 不能用作id名
    // var psw=document.querySelector('#pswTxt');
    phoneTxt.onclick = function () {
        var val = phoneTxt.value;
        if (val == "请输入手机号") {
            phoneTxt.value = "";
        }
    };
    phoneTxt.onblur = function () {
        //失去焦点的时候验证
        var val = phoneTxt.value; //获取内容
        var str = checkReg.trim(val); //去掉前后空格
        if (str == "") {
            phoneMes.innerHTML = '';
            phoneMes.style.color = '';
        } else if (str && checkReg.tel(str)) {
            //不为空，并且符合正则
            //验证用户名是否存在：不存在才能注册
            var xhr = new XMLHttpRequest();
            var url = '../api/reg_select.php?phone=' + val + '&time=' + new Date();
            xhr.open('GET', url, true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                    var str = xhr.responseText;
                    // console.log(str);
                    if (str == '0') {
                        //已存在
                        phoneMes.innerHTML = '该手机号已被使用，可直接<a href="../html/login.html" style="text-decoration:underline">登录</a>！';
                        phoneMes.style.display = 'block';
                        phoneTxt.previousElementSibling.className = 'no';
                    } else {
                        //可以注册的用户名
                        phoneMes.innerHTML = '';
                        phoneTxt.previousElementSibling.className = 'yes';
                        nameOk = true;
                    }
                }
            };
        } else {
            phoneMes.innerHTML = '手机号码格式不正确，请重新输入！';
            phoneMes.style.display = 'block';
            phoneTxt.previousElementSibling.className = 'no';
        }
    };
    //验证码
    var codeTxt = document.getElementById('codeTxt');
    var codeMes = document.querySelector('#codeMes');
    var yzmOk = false;

    codeTxt.onclick = function () {
        var val = codeTxt.value;
        if (val == "请输入验证码") {
            codeTxt.value = "";
        }
    };
    var verifyCode = new GVerify("codeBtn");
    //失去焦点的时候验证
    codeTxt.onblur = function () {
        var res = verifyCode.validate(codeTxt.value);
        if (res) {
            codeMes.innerHTML = '';
            yzmOk = true; //正确的情况才打开开关
        } else {
            codeMes.innerHTML = '您输入的验证码有误，请重新输入！';
            codeMes.style.display = 'block';
        }
    };

    //拖拽验证
    //按住滑块，拖拽到最右边，三大事件
    var chizi = document.querySelector('.chizi');
    var fugai = document.querySelector('.fugai');
    var pullX = document.querySelector('.pullX');
    var noend = false;
    access();
    function access() {
        if (fugai.offsetLeft != 0) {

            fugai.onmousedown = function (e) {
                var e = e || window.event;
                var disX = e.clientX - fugai.offsetLeft;
                e.preventDefault();
                document.onmousemove = function (e) {
                    var e = e || window.event;
                    var ox = e.clientX - disX;
                    // console.log(fugai.offsetLeft);
                    if (ox >= 0) {
                        ox = 0;
                        fugai.onmousedown = null;
                    }
                    fugai.style.left = ox + 'px';
                };
            };
            noend = document.onmouseup = function (e) {
                var e = e || window.event;
                e.preventDefault();
                document.onmousemove = null;
                if (fugai.offsetLeft != 0) {
                    fugai.style.left = '-246px';
                } else {
                    fugai.innerHTML = '验证通过！<span class="pullStop"></span>';
                    var stop = fugai.lastElementChild;
                }
                // console.log(stop.className)
                if (stop.className == "pullStop") {
                    noend = true;
                    console.log(noend);
                } else {
                    noend = false;
                }
                return noend;
            };
        }
    }
    // console.log(noend);
    // console.log(stop.className)

    //密码
    var pswTxt = document.getElementById('pswTxt');
    var pswMes = document.querySelector('#pswMes');

    var pswOk = false;
    pswTxt.onblur = function () {
        //失去焦点的时候验证
        var val = pswTxt.value;
        var str = checkReg.trim(val); //去掉前后空格
        if (str == "") {
            pswMes.innerHTML = '';
        } else if (str == phoneTxt.value) {
            pswMes.innerHTML = '密码不能与手机号码一样';
            pswMes.style.display = 'block';
            pswTxt.previousElementSibling.className = 'no';
        } else if (str && checkReg.psweasy(str)) {
            //不为空，并且符合正则
            pswMes.innerHTML = '';
            pswTxt.previousElementSibling.className = 'yes';
            pswOk = true; //正确的情况才打开开关
        } else {
            pswMes.innerHTML = '密码须为6-16位字母,数字,半角符号中至少两种组合';
            pswMes.style.display = 'block';
            pswTxt.previousElementSibling.className = 'no';
        }
    };
    //确认密码
    var psw2Txt = document.getElementById('psw2Txt');
    var psw2Mes = document.querySelector('#psw2Mes');

    var psw2Ok = false;
    psw2Txt.onblur = function () {
        //失去焦点的时候验证
        var val = psw2Txt.value;
        // var str=checkReg.trim(val);//去掉前后空格
        if (psw2Txt.value == "") {
            psw2Mes.innerHTML = '';
        } else if (psw2Txt.value == pswTxt.value) {
            //不为空，并且符合正则
            psw2Txt.previousElementSibling.className = 'yes';
            psw2Mes.innerHTML = '';
            psw2Ok = true; //正确的情况才打开开关
        } else {
            psw2Mes.innerHTML = '两次输入的密码不一致!';
            psw2Mes.style.display = 'block';
            psw2Txt.previousElementSibling.className = 'no';
        }
    };
    //勾选协议
    var check_agree = document.getElementById('check_agree');
    var xieyiMes = document.getElementById('xieyiMes');
    var checkOk = false;
    check_agree.onclick = function () {
        // checkOk=!checkOk;
        // registerBtn.classList.toggle("no");
        // console.log(checkOk);
        if (check_agree.checked == true) {
            checkOk = true;
            registerBtn.className = '';
        } else {
            checkOk = false;
            registerBtn.className = 'no';
        }
    };

    //点击按钮注册
    registerBtn.onclick = function () {
        if (!checkOk) {
            xieyiMes.style.display = 'blcok';
        } else {
            var valphone = phoneTxt.value.trim();
            var valPsw = pswTxt.value.trim();
            //注册功能
            if (nameOk && noend && yzmOk && pswOk && psw2Ok) {
                var xhr = new XMLHttpRequest();
                //改用post方式提交数据:参数是放在send方法里面提交
                xhr.open('POST', '../api/reg_insert.php', true);
                //post方式发送数据，要设置请求头
                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                var data = 'phone=' + valphone + '&psw=' + valPsw;
                xhr.send(data); //post方式，send的实参就是传送给后端的数据

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                        var str = xhr.responseText;
                        console.log(str);
                        if (str == 'yes') {
                            //成功注册跳转到登陆页面
                            location.href = '../html/login.html';
                        } else {
                            alert('注册失败');
                        }
                    }
                };
            } else {
                alert('注册失败');
            }
        }
    };
});