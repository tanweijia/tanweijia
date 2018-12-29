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
'use strict';

$(function () {
    //点击h1标签跳转到首页
    $('h1').on("click", function () {
        location.href = '../index.html';
    });

    //用户历史  有    加入购物车的数量
    function fnyes(arr) {
        $('.car_none').css('display', 'none');
        $('.car_have').css('display', 'block');
        $('.order_content').html('');
        var i = 0;
        var res = arr.adminlist.map(function (item) {
            var imgurl1 = item.imgurl1;
            var idtotalprice = item.qty * item.cutprice;
            i = ++i;
            var idx = i - 1;
            return '<ul class="order_lists" data-id="' + item.goodsid + '">\n                        <li class="list_chk">\n                            <input type="checkbox" id="checkbox_' + idx + '" class="son_check">\n                            <label for="checkbox_' + idx + '"></label>\n                        </li>\n                        <li class="list_con">\n                            <div class="list_img"><a href="javascript:;"><img src="' + imgurl1 + '" alt=""></a></div>\n                            <div class="list_text"><a href="javascript:;">' + item.name + '</a></div>\n                        </li>\n                        <li class="list_info">\n                            <p>\u5546\u54C1id\u53F7\uFF1Ablsh' + item.goodsid + '</p>\n                            <p>\u5546\u54C1\u8FFD\u52A0\u65F6\u95F4\uFF1A' + item.timer + '</p>\n                        </li>\n                        <li class="list_price">\n                        <p class="price">\uFFE5<span>' + item.cutprice + '</span></p>\n                        </li>\n                        <li class="list_amount">\n                            <div class="amount_box">\n                                <a href="javascript:;" class="reduce reSty">-</a>\n                                <input type="text" value="' + item.qty + '" class="sum">\n                                <a href="javascript:;" class="plus">+</a>\n                            </div>\n                        </li>\n                        <li class="list_sum">\n                        <p class="sum_price">\uFFE5 <span class="sum_idprice">' + idtotalprice.toFixed(2) + '</span></p>\n                        </li>\n                        <li class="list_op">\n                            <p class="del"><a href="javascript:;" class="delBtn">\u79FB\u9664\u5546\u54C1</a></p>\n                        </li>\n                    </ul>';
        }).join('');
        $('.order_content').html(res);
    }

    //用户历史  没有  加入购物车的数量
    function fnno() {
        $('.car_none').css('display', 'block');
        $('.car_have').css('display', 'none');
    }

    // 没有登录
    function fnunlogin() {
        $('.car_none').css('display', 'block');
        $('.car_have').css('display', 'none');
    }
    //打开首页后 购物车信息自动更新请求查询
    autoCar("../", fnyes, fnno, fnunlogin);

    //渲染数据：jq的ajax

    //  $.ajax({
    //      type: "get",
    //      url: "api/getname.php",
    //      async: true,
    //      data: {
    //          'num': num
    //      },
    //      success: function(str) {
    //          var arr = JSON.parse(str);
    //          //渲染到购物车：dom，字符串模板
    //      }
    //
    //  });


    //全局每个input点击后label的样式
    $('.car_have').on("click", "input", function () {
        if ($(this).is(':checked')) {
            $(this).next('label').addClass('mark');
        } else {
            $(this).next('label').removeClass('mark');
        }
    });
    //结算按钮是否点亮
    function light_jiesuan() {
        var total_count = $('.piece_num').html();
        var total_money = $('.total_text').html();
        var calBtn = $('.calBtn a');
        if (total_money != 0 && total_count != 0) {
            if (!calBtn.hasClass('btn_sty')) {
                calBtn.addClass('btn_sty');
            }
        } else {
            if (calBtn.hasClass('btn_sty')) {
                calBtn.removeClass('btn_sty');
            }
        }
    }
    //点击全选1
    $('.car_have').on('click', ".whole_check", function () {
        if ($(this).is(':checked')) {
            //全选 attr()只能帮到普通属性  id class title ;prop()添加有行为的属性：一般用在单选和复选框
            $(this).prop('checked', 'checked'); //全选1
            $(this).next('label').addClass('mark'); //全选1 label
            $(this).parent().parent().parent().next('.cartBox').find('.son_check').prop('checked', 'checked'); //遍历 商品input
            $(this).parent().parent().parent().next('.cartBox').find('label').addClass('mark');; //遍历 商品input
            $('.whole_check2').prop('checked', 'checked'); //全选2
            $('.whole_check2').next().addClass('mark'); //全选2 label

            //计算数量
            var sum_idqty = $(this).parent().parent().parent().next('.cartBox').find('.sum');
            var sum_qty = 0;
            for (var i = 0; i < sum_idqty.length; i++) {
                sum_qty += Number(sum_idqty[i].value);
            }
            $('.piece_num').html(sum_qty);
            //计算价格
            var sum_idprice = $(this).parent().parent().parent().next('.cartBox').find('.sum_idprice');
            var sum_price = 0;
            for (var i = 0; i < sum_idprice.length; i++) {
                sum_price += Number(sum_idprice[i].innerHTML);
            }
            $('.total_text').html(sum_price.toFixed(2));
        } else {
            //不选
            $(this).removeAttr('checked'); //全选1 input
            $(this).next('label').removeClass('mark'); //全选1 label
            $(this).parent().parent().parent().next('.cartBox').find('.son_check').removeAttr('checked'); //遍历 商品input
            $(this).parent().parent().parent().next('.cartBox').find('label').removeClass('mark'); //遍历 商品label
            $('.whole_check2').removeAttr('checked'); //全选2
            $('.whole_check2').next().removeClass('mark'); //全选2 label
            //计算数量
            $('.piece_num').html(0);
            //计算价格
            $('.total_text').html(0.00);
        }
        light_jiesuan();
    });

    //点击全选2
    $('.car_have').on('click', ".whole_check2", function () {
        if ($(this).is(':checked')) {
            //全选 attr()只能帮到普通属性  id class title ;prop()添加有行为的属性：一般用在单选和复选框
            $(this).prop('checked', 'checked'); //全选2
            $(this).next('label').addClass('mark'); //全选2 label
            $(this).parent().parent().parent().prev('.cartBox').find('.son_check').prop('checked', 'checked'); //遍历 商品input
            $(this).parent().parent().parent().prev('.cartBox').find('label').addClass('mark'); //遍历 商品input
            // console.log($(this).parent().parent().parent().prev('.cartBox').find('.mark').size());
            $('.whole_check').prop('checked', 'checked'); //全选1
            $('.whole_check').next().addClass('mark'); //全选1 label
            //计算数量
            var sum_idqty = $(this).parent().parent().parent().prev('.cartBox').find('.sum');
            var sum_qty = 0;
            for (var i = 0; i < sum_idqty.length; i++) {
                sum_qty += Number(sum_idqty[i].value);
            }
            $('.piece_num').html(sum_qty);
            //计算价格
            var sum_idprice = $(this).parent().parent().parent().prev('.cartBox').find('.sum_idprice');
            var sum_price = 0;
            for (var i = 0; i < sum_idprice.length; i++) {
                sum_price += Number(sum_idprice[i].innerHTML);
            }
            $('.total_text').html(sum_price.toFixed(2));
        } else {
            //不选
            $(this).removeAttr('checked'); //全选2 input
            $(this).next('label').removeClass('mark'); //全选2 label
            $(this).parent().parent().parent().prev('.cartBox').find('.son_check').removeAttr('checked'); //遍历 商品input
            $(this).parent().parent().parent().prev('.cartBox').find('label').removeClass('mark'); //遍历 商品label
            $('.whole_check').removeAttr('checked'); //全选1
            $('.whole_check').next().removeClass('mark'); //全选1 label
            //计算数量
            $('.piece_num').html(0);
            //计算价格
            $('.total_text').html(0.00);
        }
        light_jiesuan();
    });

    //点击每个商品的input
    $('.cartBox').on('click', "input", function () {
        //获取全选栏初始数量
        var sum_qty = $('.piece_num').html() * 1;
        //获取全选栏初始价格
        var sum_price = $('.total_text').html() * 1;
        //产品行数量
        var sum_idqty = $(this).parent().parent().find('.sum').val() * 1;
        //产品行小计
        var sum_idprice = $(this).parent().parent().find('.sum_idprice').html() * 1;

        if ($(this).is(':checked')) {
            $(this).prop('checked', 'checked');
            $(this).next('label').addClass('mark');
            var marks = $(this).parent().parent().parent().find('.mark'); //已点击选中的产品数量
            var label = $(this).parent().parent().parent().find('label'); //全部商品数量
            // 总数量追加
            $('.piece_num').html(sum_qty + sum_idqty);
            // 总价格追加
            $('.total_text').html((sum_price + sum_idprice).toFixed(2));
            if (marks.length == label.length) {
                //控制是否全选勾上
                //证明全被勾选
                $('.whole_check').prop('checked', 'checked'); //全选1
                $('.whole_check').next().addClass('mark'); //全选1 label 
                $('.whole_check2').prop('checked', 'checked'); //全选2
                $('.whole_check2').next().addClass('mark'); //全选2 label
            } else {
                $('.whole_check').removeAttr('checked'); //全选1
                $('.whole_check').next().removeClass('mark'); //全选1 label
                $('.whole_check2').removeAttr('checked'); //全选2
                $('.whole_check2').next().removeClass('mark'); //全选2 label
            }
        } else {
            $(this).removeAttr('checked');
            $(this).next('label').removeClass('mark');
            $('.whole_check').removeAttr('checked'); //全选1
            $('.whole_check').next().removeClass('mark'); //全选1 label
            $('.whole_check2').removeAttr('checked'); //全选2
            $('.whole_check2').next().removeClass('mark'); //全选2 label

            // 总数量追减
            $('.piece_num').html(sum_qty - sum_idqty);
            // 总价格追减
            $('.total_text').html((sum_price - sum_idprice).toFixed(2));
        }
        light_jiesuan();
    });

    //加数量:事件委托方式
    $('.cartBox').on('click', '.plus', function () {
        if ($(this).parent().parent().parent().find('.son_check').is(':checked')) {
            //点击前 加入合计的产品行数量
            //点击前 加入合计的产品小计
            var sum_oldidqty = 0;
            var sum_oldidprice = 0;
        } else {
            var sum_oldidqty = $(this).prev().val() * 1;
            var sum_oldidprice = $(this).parent().parent().parent().find('.sum_idprice').html() * 1;
        }
        //点击获取对应行的数量，加1再赋值
        var val = $(this).prev().val();
        val++;
        if (val >= 100) {
            //库存量
            val = 100;
        }
        $(this).prev().val(val);
        $(this).parent().parent().parent().find('.son_check').prop('checked', 'checked'); //遍历 商品input
        $(this).parent().parent().parent().find('label').addClass('mark');; //遍历 商品input

        //刷新小计
        var sum_idqty = $(this).prev().val() * 1; //产品行数量
        var idprice = $(this).parent().parent().parent().find('.price span').html() * 1; //单价
        var sum_idprice = sum_idqty * idprice; //产品行小计
        $(this).parent().parent().parent().find('.sum_idprice').html(sum_idprice.toFixed(2));

        //获取全选栏初始数量
        var sum_qty = $('.piece_num').html() * 1;
        //获取全选栏初始价格
        var sum_price = $('.total_text').html() * 1;

        // 总数量追加
        $('.piece_num').html(sum_qty + sum_oldidqty + 1);
        // 总价格追加
        $('.total_text').html((sum_price + sum_oldidprice + idprice).toFixed(2));

        //判断全选按钮是够勾选上
        var marks = $(this).parent().parent().parent().parent().find('.mark'); //已点击选中的产品数量
        var label = $(this).parent().parent().parent().parent().find('label'); //全部商品数量
        if (marks.length == label.length) {
            //控制是否全选勾上
            //证明全被勾选
            $('.whole_check').prop('checked', 'checked'); //全选1
            $('.whole_check').next().addClass('mark'); //全选1 label 
            $('.whole_check2').prop('checked', 'checked'); //全选2
            $('.whole_check2').next().addClass('mark'); //全选2 label
        } else {
            $('.whole_check').removeAttr('checked'); //全选1
            $('.whole_check').next().removeClass('mark'); //全选1 label
            $('.whole_check2').removeAttr('checked'); //全选2
            $('.whole_check2').next().removeClass('mark'); //全选2 label
        }

        light_jiesuan();
        //接口2：更新数据库数量
        //1
        //获取用户名 var admin = $('.loginUname').text();
        //点击获取对应商品id, var goodsid = $(this).parent().parent().data("id");
        //获取数量$(this).parent().find('.addCarNum');
        var admin = Cookie.get('uname');
        var goodsid = $(this).parent().parent().parent().data("id");
        var addqty = 1;
        //2请求查询  
        $.ajax({
            type: "POST",
            url: "../api/car.php",
            data: 'admin=' + admin + '&goodsid=' + goodsid + '&addqty=' + addqty,
            success: function success(msg) {
                console.log('数据库 增加 修改成功');
            }
        });
    });

    //减去数量
    $('.cartBox').on('click', '.reduce', function () {

        //获取全选栏 初始数量
        var sum_qty = $('.piece_num').html() * 1;
        //获取全选栏 初始价格
        var sum_price = $('.total_text').html() * 1;
        //单价
        var idprice = $(this).parent().parent().parent().find('.price span').html() * 1;
        //点击前是否已选中过
        var ok = $(this).parent().parent().parent().find('.son_check').is(':checked');

        //未勾选 且最终数量为1时
        jianno_sum_qty = sum_qty + 1;
        jianno_sum_price = sum_price + idprice;

        //点击前获取对应行的数量，减1再赋值
        var val = $(this).next().val() * 1; //2
        var valKeepqty = val; //2 桥梁 存储点击获取对应行的数量
        val--;
        if (val <= 1) {
            //库存量
            val = 1;
        }
        $(this).next().val(val);

        var sum_idqty = $(this).next().val() * 1; //产品行数量
        var sum_idprice = sum_idqty * idprice; //产品行小计
        $(this).parent().parent().parent().find('.sum_idprice').html(sum_idprice.toFixed(2));

        if (ok) {
            //点击前已勾选
            if (val > 1) {
                // 总数量追减
                $('.piece_num').html(sum_qty - 1);
                // 总价格追减
                $('.total_text').html((sum_price - idprice).toFixed(2));
            } else if (valKeepqty == 2) {
                // 总数量追减
                $('.piece_num').html(sum_qty - 1);
                // 总价格追减
                $('.total_text').html((sum_price - idprice).toFixed(2));
            } else {
                jian_sum_qty = sum_qty - 1;

                // 总数量追减
                $('.piece_num').html(sum_qty);
                // 总价格追减
                $('.total_text').html(sum_price.toFixed(2));
            }
        } else {
            if (val > 1) {
                //点击前未勾选
                // 总数量追减
                $('.piece_num').html(sum_qty + sum_idqty);
                // 总价格追减
                $('.total_text').html((sum_price + sum_idprice).toFixed(2));
            } else {
                // 总数量追减
                $('.piece_num').html(jianno_sum_qty);
                // 总价格追减
                $('.total_text').html(jianno_sum_price.toFixed(2));
            }
        }

        //点击时添加样式
        $(this).parent().parent().parent().find('.son_check').prop('checked', 'checked'); //遍历 商品input
        // console.log($(this).parent().parent().parent().find('.son_check'));
        $(this).parent().parent().parent().find('label').addClass('mark'); //遍历 商品input

        //判断全选按钮是够勾选上
        var marks = $(this).parent().parent().parent().parent().find('.mark'); //已点击选中的产品数量
        var label = $(this).parent().parent().parent().parent().find('label'); //全部商品数量
        if (marks.length == label.length) {
            //控制是否全选勾上
            //证明全被勾选
            $('.whole_check').prop('checked', 'checked'); //全选1
            $('.whole_check').next().addClass('mark'); //全选1 label 
            $('.whole_check2').prop('checked', 'checked'); //全选2
            $('.whole_check2').next().addClass('mark'); //全选2 label
        } else {
            $('.whole_check').removeAttr('checked'); //全选1
            $('.whole_check').next().removeClass('mark'); //全选1 label
            $('.whole_check2').removeAttr('checked'); //全选2
            $('.whole_check2').next().removeClass('mark'); //全选2 label
        }

        light_jiesuan();
        //接口2：更新数据库数量
        //1获取用户名 
        //点击获取对应商品id, 
        //获取数量
        var admin = Cookie.get('uname');
        var goodsid = $(this).parent().parent().parent().data("id");
        var addqty = -1;
        console.log(valKeepqty);
        //2请求查询  
        $.ajax({
            type: "POST",
            url: "../api/car.php",
            data: 'admin=' + admin + '&goodsid=' + goodsid + '&addqty=' + addqty + '&valKeepqty=' + valKeepqty,
            success: function success(msg) {
                console.log('数据库减 数量 修改成功');
            }
        });
    });

    //===================================移除商品========================================
    var $order_lists_input = false; //桥梁 删除的input是否有勾选
    var $order_lists = null; //桥梁 把要删除的商品装进这
    var $order_lists_idqty = null; //桥梁 把要删除的商品数量装进这
    var $order_lists_idsum = null; //桥梁 把要删除的商品小计装进这
    var $order_lists_id = null; //桥梁 把要删除的商品id装进这
    var $uls = null;
    $('.order_content').on("click", ".delBtn", function () {
        $order_lists = $(this).parent().parent().parent(); //每一个商品
        $uls = $(this).parent().parent().parent().parent().find('ul').size();
        $order_lists_id = $(this).parent().parent().parent().data("id");

        console.log($order_lists_id);
        if ($(this).parent().parent().parent().find('.son_check').is(':checked')) {
            $order_lists_input = true;
            $order_lists_idqty = $(this).parent().parent().parent().find('.amount_box').find('input').val() * 1;
            $order_lists_idsum = $(this).parent().parent().parent().find('.sum_idprice').html() * 1;
        }
        $('.model_bg').fadeIn(300); //遮罩层出现
        $('.my_model').fadeIn(300); //遮罩层出现
    });

    //关闭模态框 
    $('.closeModel').click(function () {
        //点击X
        closeM();
    });
    $('.dialog-close').click(function () {
        //点击关闭
        closeM();
    });
    //确定按钮，移除商品
    $('.dialog-sure').click(function () {
        $order_lists.remove();

        //获取全选栏初始数量
        var sum_qty = $('.piece_num').html() * 1;
        //获取全选栏初始价格
        var sum_price = $('.total_text').html() * 1;
        if ($order_lists_input) {
            // 总数量追减
            $('.piece_num').html(sum_qty - $order_lists_idqty);
            // 总价格追减
            $('.total_text').html((sum_price - $order_lists_idsum).toFixed(2));
        }
        //判断是否删除完
        if ($uls == 1) {
            $('.car_have').css('display', 'none');
            $('.car_none').css('display', 'block');
        }
        closeM();

        var admin = Cookie.get('uname');
        var goodsid = $order_lists_id;
        var deleteall = 0;
        //2请求查询  
        $.ajax({
            type: "POST",
            url: "../api/car_delete.php",
            data: 'admin=' + admin + '&goodsid=' + goodsid + '&deleteall=' + deleteall,
            success: function success(msg) {
                console.log(msg);
            }
        });
    });
    function closeM() {
        $('.model_bg').fadeOut(300); //遮罩层隐藏
        $('.my_model').fadeOut(300); //提示框隐藏
    }
});
'use strict';

/*
	公共函数：经常会使用到的函数，大家都可以调用
*/

/*
 	randomNum(min, max):
 	说明：返回min到max之间的一个随机数
 	参数一：最小值
 	参数二：最大值
 */

function randomNum(min, max) {
  //返回min到max之间是随机数
  //最新小：Math.random()+min 0-1之间   0-0.99999
  //最大的：Math.random()*max+1
  return parseInt(Math.random() * (max - min + 1)) + min;
}

//-------------------------------------------------------------

/*
 	getid(id):
 	说明：通过id查找元素
 	参数：传id名进来
 	
 */
function getid(id) {
  return document.getElementById(id);
}

//-------------------------------------------------------

/*
 	filterTex(str):
 	说明：过滤敏感词
 	参数：传要过滤的字符串进来，返回一个过滤后的字符串，敏感词变成**
 
 * */

function filterTex(str) {

  //敏感
  var sensitive = ['傻B', '妈蛋', 'bitch', 'fuck', '操', '小学生', '反清复明'];

  for (var i = 0; i < sensitive.length; i++) {
    var reg = new RegExp(sensitive[i], 'gi');
    str = str.replace(reg, '**');
  }

  return str;
}

//--------------------------------------------------

/*
 	randomColor(str):
 	说明：生成随机颜色
 	参数：如果传16进来，生成16进制颜色，如果传rgb进来，传rgb颜色
 
 * */

function randomColor(str) {
  //生成随机颜色
  if (str == 16) {
    //生成16进制的   '0123456789abcdef'  #666677
    var str = '0123456789abcdef';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += str.charAt(parseInt(Math.random() * str.length));
    }

    return color;
  } else if (str == 'rgb') {
    //rgb(255,255,0) 生成3个随机数，每个随机数应该在  0-255
    var r = parseInt(Math.random() * 256);
    var g = parseInt(Math.random() * 256);
    var b = parseInt(Math.random() * 256);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else {
    alert('参数传错了');
  }
}

//-----------------------------
//补零操作
function setDb(num) {
  //小于10的，补零
  if (num < 10) {
    return '0' + num;
  } else {
    return '' + num;
  }
}

//---------------------------

//封装时间函数，把毫秒转成xx天xx时xx分xx秒   return {}

function setTime(diffTime) {

  var sec = setDb(diffTime % 60); //秒
  var min = setDb(Math.floor(diffTime / 60) % 60); //分
  var hour = setDb(Math.floor(diffTime / 60 / 60) % 24); //小时
  var day = Math.floor(diffTime / 60 / 60 / 24);

  return { //想返回多个数的时候，做成json数据
    'sec': sec,
    'min': min,
    'hour': hour,
    'day': day
  };
}

//------------------------

//字符串转成对象
//传的参数： id=001&name=iphone7 plugs&imgurl=img/ip7.jpg&price=5899&sale=5888&color=土豪金
//返回值：{id: "001", name: "iphone7 plugs", imgurl: "img/ip7.jpg", price: "5899", sale: "5888", …}

function strToObj(str) {
  //	var str = str.slice(1);
  var arr = str.split('&');
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split('=');
    obj[arr2[0]] = arr2[1];
  }

  return obj;
}

//-----------------------------

//对象转成字符串方法封装

//传的参数：{id: "001", name: "iphone7 plugs", imgurl: "img/ip7.jpg", price: "5899", sale: "5888", …}
//返回值： id=001&name=iphone7 plugs&imgurl=img/ip7.jpg&price=5899&sale=5888&color=土豪金

function objToStr(obj) {
  var html = '';
  for (var key in obj) {
    html += key + '=' + obj[key] + '&';
  }

  html = html.slice(0, -1);
  return html;
}

//获取url里某个参数的值
//传递的参数一： location.search,
//传递的参数二： 'uname' 字符串格式
function getSearch(locationSearch, attr) {
  var data = decodeURI(locationSearch);
  var str = data.slice(1);
  var obj = strToObj(str);
  for (var key in obj) {
    if (obj[key] == obj[attr]) {
      var val = obj[key];
      return val;
    } else {
      return;
    }
  }
}

/*
 	事件监听兼容性处理：
 	参数一：节点名
 	参数二：事件名称
 	参数三：事件处理函数
 
 */

function bind(ele, type, fn) {
  if (ele.addEventListener) {
    //ie9+ 主流
    ele.addEventListener(type, fn, false);
  } else {
    //ie8-
    ele.attachEvent('on' + type, fn);
  }
}

//-----------------------------------------------------------
/*
	获取样式：可以获取行内和非行内样式
	参数一：ele 节点名
	参数二：attr 属性名	
 
 * */

function getstyle(ele, attr) {
  //获取样式
  if (window.getComputedStyle) {
    //主流浏览器
    return getComputedStyle(ele, false)[attr];
  } else if (ele.currentStyle) {
    //ie8-
    return ele.currentStyle[attr];
  } else {
    //内联样式
    return ele.style[attr];;
  }
}

/*
	运动框架封装：startMove()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

  clearInterval(obj.timer);
  obj.timer = setInterval(function () {

    var istrue = true;

    //1.获取属性名，获取键名：属性名->初始值
    for (var key in json) {
      // console.log(key); //width heigth opacity
      var cur = 0; //存初始值

      if (key == 'opacity') {
        cur = getstyle(obj, key) * 100; //透明度
      } else {
        cur = parseInt(getstyle(obj, key)); //width heigth borderwidth px为单位的
      }

      //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
      //距离越大，速度越大,下面的公式具备方向
      var speed = (json[key] - cur) / 6;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

      if (cur != json[key]) {
        istrue = false; //如果没有达到目标值，开关false
      } else {
        istrue = true;
      }

      //3、运动
      if (key == 'opacity') {
        obj.style.opacity = (cur + speed) / 100;
        obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
      } else {
        obj.style[key] = cur + speed + 'px';
      }
    }
    //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
    if (istrue) {
      //如果为true,证明以上属性都达到目标值了
      clearInterval(obj.timer);

      if (fnend) {
        fnend();
      }
    }
  }, 30); //obj.timer 每个对象都有自己定时器
}

/*
 checkReg:函数可以进行表单验证
 	.trim() :去掉前后空格
 	.tel() :号码
 
 */

var checkReg = {
  trim: function trim(str) {
    //去掉前后空格
    var reg = /^\s+|\s+$/g;
    return str.replace(reg, '');
  },
  tel: function tel(str) {
    //号码
    var reg = /^1[3-9]\d{9}$/;
    return reg.test(str);
  },
  email: function email(str) {
    //邮箱正则
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //网上推荐
    return reg.test(str);
  },
  idcard: function idcard(str) {
    //身份证
    var reg = /^(\d{17}|\d{14})[\dX]$/;
    return reg.test(str);
  },
  psweasy: function psweasy(str) {
    //6-16位首字母开头
    // var reg = /^[a-zA-Z]\w{5,15}$/;
    var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{6,16}$/;
    return reg.test(str);
  },
  pwwagain: function pwwagain(str1, str2) {
    return str1 === str2; //全等 恒等
  },
  urladr: function urladr(str) {
    var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
    return reg.test(str);
  },
  name: function name(str) {
    //账号字母开头,6-20位
    var reg = /^[a-zA-Z][\w\-]{5,19}$/;
    return reg.test(str);
  },
  chinese: function chinese(str) {
    var reg = /^[\u2E80-\u9FFF]+$/;
    return reg.test(str);
  }

  /*
   	封装cookie函数:
   	存: Cookie.set()
   	取:	Cookie.get()
   	删: Cookie.remove()
   */

};var Cookie = {

  set: function set(name, value, prop) {
    //设置cookie
    //存数据到cookie里面:必写的
    var str = name + '=' + value;

    //json存后面一些可选参数
    if (prop) {
      //expires:设置失效时间
      if (prop.expires) {
        str += ';expires=' + prop.expires.toUTCString(); //把时间转成字符串
      }

      //设置path路径

      if (prop.path) {
        //如果设置了
        str += ';path=' + prop.path;
      }

      //domain设置可访问cookie的域名
      if (prop.domain) {
        str += ';domain=' + prop.domain;
      }
    }

    //写到cookie
    document.cookie = str;
  },
  get: function get(key) {
    var cookies = document.cookie; //name=tiantian; age=18; usn=yuanyuan; pws=456123
    var arr = cookies.split('; '); //['name=tiantian','age=18','usn=yuanyuan','pws=456123']
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('='); //['name','tiantian']
      if (key == arr2[0]) {
        return arr2[1];
      }
    }
  },
  remove: function remove(key) {

    //删的原理:设置过期时间
    var now = new Date();
    now.setDate(now.getDate() - 1);
    this.set(key, 'no', { expires: now, path: "/" });
  }

  /**
   * [点击回到顶部的]
   * @param  {String} ele    [元素变量名]
   * @param  {String} speed ["fast"立即到顶部，"slow"缓慢回到顶部]
   * @param  {Number} time [延迟执行，数字越大越慢]
   */
  // backTop('backtop1',"slow",5);
  // backTop('backtop2',"fast");
};function backTop(ele, speed, time) {
  // var ele = document.getElementById(id)
  time = time || 30;
  window.onscroll = function () {
    var scrollTop = window.scrollY;
    //滚动滑轮到达300px的时候，出现回到顶部按钮
    if (scrollTop >= 300) {
      ele.style.display = 'block';
    } else {
      ele.style.display = 'none';
    }
  };
  if (speed === "fast") {
    //点击快速回到顶部
    ele.onclick = function () {
      window.scrollTo(0, 0); //一下子回到顶部
    };
  } else {
    //点击回到顶部，缓慢回到顶部
    ele.onclick = function () {
      var timer = setInterval(function () {
        var scrollTop = window.scrollY; //
        if (scrollTop > 0) {
          window.scrollTo(0, scrollTop - 20);
        } else {
          clearInterval(timer);
        }
      }, time);
    };
  }
}
/**
 * [下拉菜单的函数]
 * @param  {String} id   [ul列表标签的id名]
 * @param  {String} mousetype ["onclick"点击事件，"onmouseover"||"onmouseout"抚摸触发]
 */
function pullDownMenu(id, mousetype) {
  //获取ul的id名下的每个li,再点开li下的每个ul
  var list = document.getElementById(id);
  var ali = list.children;
  //抚摸时触发
  if (mousetype == "onmouseout" || mousetype == "onmouseover") {
    for (var i = 0; i < ali.length; i++) {
      //鼠标经过让二级菜单出现
      ali[i].onmouseover = function () {
        this.children[0].style.display = 'block';
      };
      ali[i].onmouseout = function () {
        this.children[0].style.display = 'none';
      };
    }
  }
  //点击时触发
  if (mousetype == "onclick") {
    for (var i = 0; i < ali.length; i++) {
      //鼠标经过让二级菜单出现
      ali[i].idx = i;
      ali[i].istrue = true; //开关
      ali[i].onclick = function () {
        if (this.istrue) {
          this.children[0].style.display = 'block';
        } else {
          this.children[0].style.display = 'none';
        }
        this.istrue = !this.istrue; //开关
      };
    }
  }
}
/**
 * [选项卡tab切换函数]
 * @param {String} id        [tab大盒子的id名]
 * @param {String} highlight [高亮的类名]
 */
function setTab(id, highlight) {
  var tabBigbox = document.getElementById(id);
  var tabHead = tabBigbox.children[0];
  var tabs = tabHead.children;
  var content = tabBigbox.children[1];
  var contents = content.children;
  /*1.初始化
                  * 高亮第一个tab
                  * 隐藏除第一张以外的图片*/
  tabs[0].className = highlight;
  contents[0].style.display = "block";
  /* 2）切换：*/
  //遍历所有tab元素，给他们都添加点击事件
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].idx = i;
    tabs[i].onclick = function () {
      // * 遍历所有的tab，去除所有的高亮及隐藏所有的图片
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = "";
        contents[i].style.display = "none";
      }
      // * 当前被点击的tab高亮，及对应的图片显示
      this.className = highlight;
      contents[this.idx].style.display = "block";
    };
  }
}

/**
 * [侧边栏出现，隐藏动画]
 * @param  {[string]} id        [侧边栏最大的盒子id名]
 * @param  {[string]} side      [left or right]
 * @param  {[string]} mousetype [鼠标触动类型]
 */
function sidebar(id, side, mousetype) {
  var box = document.getElementById(id);
  var maxlen = box.offsetWidth;
  console.log(maxlen);
  //抚摸时触发
  if (mousetype == "onmouseout" || mousetype == "onmouseover") {
    //鼠标移入
    box.onmouseenter = function () {
      //left  0
      side == "left" ? startMove(box, { 'left': 0 }) : startMove(box, { 'right': 0 });
    };
    //鼠标离开
    box.onmouseleave = function () {
      //left -200
      side == "left" ? startMove(box, { 'left': -maxlen }) : startMove(box, { 'right': -maxlen });
    };
  }
  //点击时触发
  if (mousetype == "onclick") {
    var istrue = true; //开关
    box.onclick = function () {
      if (istrue) {
        //left  0
        side == "left" ? startMove(box, { 'left': 0 }) : startMove(box, { 'right': 0 });
      } else {
        side == "left" ? startMove(box, { 'left': -maxlen }) : startMove(box, { 'right': -maxlen });
      }
      istrue = !istrue; //开关
    };
  }
}

// =================================================================================
// =================================================================================
// =================================================================================


//打开首页后 购物车信息自动更新请求查询 (首页和其他页面路径要不同../)
function autoCar(urlphp, fnyes, fnNo, fnunlogin) {
  //传参 首页url="" 其他页面url=../
  var totalqty = 0;
  if (Cookie.get('uname')) {
    //已登录
    var admin = Cookie.get('uname');
    console.log(admin);
    $.ajax({
      type: "POST",
      // url: "../api/carShowNunfrist_select.php",
      url: urlphp + 'api/carShowNunfrist_select.php',
      data: 'admin=' + admin,
      success: function success(msg) {
        var arr = JSON.parse(msg);
        // var arr = msg;
        console.log("用户历史进购物车清单");
        console.log(arr.adminlist);
        console.log(Array.isArray(arr.adminlist));
        //用户历史有加入购物车的数量
        if (arr.adminlist) {
          arr.adminlist.map(function (item) {
            totalqty += Number(item.qty);
          });
          $('#HeaderCartCount').html(totalqty);
          $('#go_cart').html(totalqty);
          $('#cartListView .buy').css('display', 'block');
          $('#cartListView .none_car').css('display', 'none');
          creatAddMycar(arr, urlphp); //执行渲染函数
          $('#carListTotalCount').html(totalqty);
          //执行回调函数
          if (fnyes) {
            fnyes(arr);
          }
        } else {
          //登录但商品为0时
          totalqty = 0;
          $('#HeaderCartCount').html(0);
          $('#go_cart').html(0);
          $('#cartListView ul').html('');
          $('#cartListView .buy').css('display', 'none');
          $('#cartListView .none_car').css('display', 'block');
          //执行回调函数
          if (fnno) {
            fnno();
          }
        }
      }
    });
  } else {
    //未登录状态
    $('#HeaderCartCount').html(0);
    $('#go_cart').html(0);
    $('#cartListView ul').html('');
    $('#cartListView .buy').css('display', 'none');
    $('#cartListView .none_car').css('display', 'block');
    //执行回调函数
    if (fnunlogin) {
      fnunlogin();
    }
  }
}

//点击加入购物车时 搜索框-我的购物车渲染
function creatAddMycar(arr, urltype) {
  //数据渲染函数封装
  $('#cartListView ul').html('');
  var totalprice = 0;
  var res = arr.adminlist.map(function (item) {
    var imgurl1 = item.imgurl1;
    totalprice += item.cutprice * item.qty;
    if (urltype) {
      //其他页面url=../
      imgurl1 = item.imgurl1;
    } else {
      //传参 首页url=""
      imgurl1 = imgurl1.slice(3);
    }
    return '<li data-id="' + item.goodsid + '">\n                    <div class="pic">\n                        <a href="" target="_blank" title="' + item.name + '">\n                        <img src="' + imgurl1 + '"></a>\n                    </div>\n                    <div class="name">\n                        <a href="" target="_blank" title="' + item.name + '">' + item.name + '\n                        <span></span></a>\n                    </div>\n                    <div class="price">\uFFE5' + item.cutprice + '</div>\n                    <div class="talqty"><span>\xD7</span>' + item.qty + '</div>\n                </li>';
  }).join('');
  console.log(totalprice.toFixed(2));
  $('#cartListView ul').html(res);
  $('#carListTotalCount').next().html(totalprice.toFixed(2));
}

//点击加入购物车 侧边栏购物车渲染变化显示
function creatAddCarSide(arr, addqty, totalqty) {
  //数据渲染函数封装
  $('#item_add').html("");
  var res = '<li class="b0">\n                    <div class="pic">\n                        <img src="' + arr.imgurl1 + '">\n                    </div>\n                    <div class="name">' + arr.name + '<br>\n                        <span>X ' + addqty + ' \u52A0\u5165\u6210\u529F</span>\n                    </div>\n                    <div class="price">\uFFE5' + arr.cutprice + '</div>\n                </li>';
  $('#item_add').html(res);
  $('#go_cart').html(totalqty);
  $('#HeaderCartCount').html(totalqty);
  $('.new_car').css({ "right": "-250px", "display": "block" });
  $('.new_car').animate({ right: "52px", display: "block" }, 1000);
  $('.car_buy').addClass('move');
  $('.new_car').animate({ right: "52px", display: "block" }, 1500, function () {
    $('.car_buy').removeClass('move');
  });
  $('.new_car').animate({ right: "-350px", display: "none" }, "slow");
}
"use strict";

$(function () {
    //打开详细页后 购物车信息自动跟新请求查询
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

    //打开详细页后 自动渲染
    autodetail();
    function autodetail() {
        var goodsid = getSearch(location.search, 'goodsid'); //common获取url里某个参数的值
        console.log(goodsid);
        $.ajax({
            type: "GET",
            url: "../api/list_select.php?goodsid=" + goodsid + "&time=new Date()",
            success: function success(msg) {
                var arr = JSON.parse(msg);
                var goodsinfArr = arr.goodsid[0];
                console.log("对应商品id详细信息");
                console.log(goodsinfArr);
                //放大镜=======================================================
                //数组假数据，换成你们数据库查询的数据即可
                var arrSmall = [goodsinfArr.imgurl1, goodsinfArr.imgurl2, goodsinfArr.imgurl3, goodsinfArr.imgurl1, goodsinfArr.imgurl2, goodsinfArr.imgurl3];
                var arrBig = [goodsinfArr.imgurl1, goodsinfArr.imgurl2, goodsinfArr.imgurl3, goodsinfArr.imgurl1, goodsinfArr.imgurl2, goodsinfArr.imgurl3];

                //渲染数据  
                var resPicHtml = '';
                for (var i = 0; i < arrSmall.length; i++) {
                    resPicHtml += "<li><img src=\"" + arrSmall[i] + "\" data-lsrc=\"" + arrSmall[i] + "\" data-maxSrc=\"" + arrBig[i] + "\"></li>";
                }
                $('#MagnifierWrap2 .spec-items ul').html(resPicHtml); //生成节点
                $('#MagnifierWrap2 .spec-items ul li').eq(0).addClass('on'); //第一个li样式为on

                //第一个大图的渲染
                var bigPic = "<img class=\"MagTargetImg\" src=\"" + arrSmall[0] + "\" data-src=\"" + arrBig[0] + "\">";
                $('#MagnifierWrap2 .MagnifierMain').html(bigPic);

                //调用放大镜插件：传最大盒子id即可
                MagnifierF("MagnifierWrap2");
                //放大镜结束======================================================

                //数据渲染
                var h2 = goodsinfArr.name + "<span>" + goodsinfArr.title + "</span>";
                $('.goodsinfval h2').html(h2); //名字
                $('.goodsinfval .cutprice').html(goodsinfArr.cutprice); //价格
                $('.goodsinfval .oldprice').html(goodsinfArr.oldprice); //原价
                $('.goodsinfval .sellqty').html(goodsinfArr.sellqty); //销售量
                $('.goodsinfval .commentqty').html(goodsinfArr.comment); //评论
            }
        });
    }

    //减数量
    $('.changeqty').on('click', '.jian', function () {
        //点击获取对应行的数量，加1在赋值
        var val = $(this).parent().find('input').val();
        val--;
        if (val <= 1) {
            //库存量
            val = 1;
        }
        $(this).parent().find('input').val(val);
    });

    //加数量
    $('.changeqty').on('click', '.jia', function () {
        //点击获取对应行的数量，加1在赋值
        var val = $(this).prev().val();
        val++;
        if (val >= 100) {
            //库存量
            val = 100;
        }
        $(this).prev().val(val);
    });

    //点击加入购物车（请求渲染）-我的购物车+浮动窗口购物车
    $('.goodsinfval').on("click", '.buy_btn_detail', function () {
        console.log('buy_btn_detail');

        var admin = Cookie.get('uname'); //获取用户名
        var goodsid = getSearch(location.search, 'goodsid'); //商品id common获取url里某个参数的值
        var addqty = $(this).prev().find('input').val(); //获取数量
        // console.log(qty);

        //2请求查询  
        $.ajax({
            type: "POST",
            url: "../api/car.php",
            data: "admin=" + admin + "&goodsid=" + goodsid + "&addqty=" + addqty,
            success: function success(msg) {
                var arr = JSON.parse(msg);
                console.log(msg);
                console.log(arr);
                console.log(arr.adminlist);
                console.log(Array.isArray(arr.adminlist));
                //用户历史加入购物车的数量
                var totalqty = 0;
                if (arr.adminlist) {
                    arr.adminlist.map(function (item) {
                        totalqty += Number(item.qty);
                    });
                } else {
                    totalqty = 0;
                }
                creatAddMycar(arr); //我的购物车（common.js）
                creatAddCarSide(arr, addqty, totalqty); //侧边栏购物车（common.js）
            }
        });
    });
});
"use strict";

(function (k, m) {
  var g = "3.7.0";var d = k.html5 || {};var h = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;var c = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;var q;var i = "_html5shiv";var a = 0;var o = {};var e;(function () {
    try {
      var t = m.createElement("a");t.innerHTML = "<xyz></xyz>";q = "hidden" in t;e = t.childNodes.length == 1 || function () {
        m.createElement("a");var v = m.createDocumentFragment();return typeof v.cloneNode == "undefined" || typeof v.createDocumentFragment == "undefined" || typeof v.createElement == "undefined";
      }();
    } catch (u) {
      q = true;e = true;
    }
  })();function f(t, v) {
    var w = t.createElement("p"),
        u = t.getElementsByTagName("head")[0] || t.documentElement;w.innerHTML = "x<style>" + v + "</style>";return u.insertBefore(w.lastChild, u.firstChild);
  }function l() {
    var t = j.elements;return typeof t == "string" ? t.split(" ") : t;
  }function p(t) {
    var u = o[t[i]];if (!u) {
      u = {};a++;t[i] = a;o[a] = u;
    }return u;
  }function n(w, t, v) {
    if (!t) {
      t = m;
    }if (e) {
      return t.createElement(w);
    }if (!v) {
      v = p(t);
    }var u;if (v.cache[w]) {
      u = v.cache[w].cloneNode();
    } else {
      if (c.test(w)) {
        u = (v.cache[w] = v.createElem(w)).cloneNode();
      } else {
        u = v.createElem(w);
      }
    }return u.canHaveChildren && !h.test(w) ? v.frag.appendChild(u) : u;
  }function r(v, x) {
    if (!v) {
      v = m;
    }if (e) {
      return v.createDocumentFragment();
    }x = x || p(v);var y = x.frag.cloneNode(),
        w = 0,
        u = l(),
        t = u.length;for (; w < t; w++) {
      y.createElement(u[w]);
    }return y;
  }function s(t, u) {
    if (!u.cache) {
      u.cache = {};u.createElem = t.createElement;u.createFrag = t.createDocumentFragment;u.frag = u.createFrag();
    }t.createElement = function (v) {
      if (!j.shivMethods) {
        return u.createElem(v);
      }return n(v, t, u);
    };t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/[\w\-]+/g, function (v) {
      u.createElem(v);u.frag.createElement(v);return 'c("' + v + '")';
    }) + ");return n}")(j, u.frag);
  }function b(t) {
    if (!t) {
      t = m;
    }var u = p(t);if (j.shivCSS && !q && !u.hasCSS) {
      u.hasCSS = !!f(t, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}");
    }if (!e) {
      s(t, u);
    }return t;
  }var j = { elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video", version: g, shivCSS: d.shivCSS !== false, supportsUnknownElements: e, shivMethods: d.shivMethods !== false, type: "default", shivDocument: b, createElement: n, createDocumentFragment: r };k.html5 = j;b(m);
})(undefined, document);
"use strict";

$(function () {
    //打开首页后 购物车信息自动跟新请求查询
    var url_carShowNunfrist = "";
    autoCar(url_carShowNunfrist);

    //点击.nav_y导航条跳转至列表页
    $('.nav_y').on("click", function () {
        location.href = 'html/list.html';
    });

    //点击h1标签跳转到首页
    $('h1').on("click", function () {
        console.log(111);
        location.href = 'index.html';
    });

    // banner用封装的silderimg.js插件完成
    sliderImg('banner', 'active');

    //选项卡
    setTab("tabs", "active");

    //main主要产品选项卡

    setTab("bigbox", "active");

    //打开首页后 购物车信息自动跟新请求查询
    /*autoCar_index();
    function autoCar_index(){
        var totalqty=0;
        if(Cookie.get('uname')){//已登录
            var admin = Cookie.get('uname');
            console.log(admin);
            $.ajax({
                type: "POST",
                url: "api/carShowNunfrist_select.php",
                data: `admin=${admin}`,
                success: function(msg){
                    var arr=JSON.parse(msg);
                    console.log("用户历史进购物车清单");
                    console.log(arr.adminlist);
                    console.log(Array.isArray(arr.adminlist));
                    //用户历史有加入购物车的数量
                    if(arr.adminlist){
                        arr.adminlist.map(function(item){
                            totalqty += Number(item.qty);
                        })
                        $('#HeaderCartCount').html(totalqty);
                        $('#go_cart').html(totalqty);
                        $('#cartListView .buy').css('display','block');
                        $('#cartListView .none_car').css('display','none');
                        creatMycar(arr);
                        
                       //搜索框-我的购物车渲染
                        function creatMycar(arr){//数据渲染函数封装
                            $('#cartListView ul').html('');
                            var totalprice = 0
                            var res=arr.adminlist.map(function(item){
                                        var imgurl1 = item.imgurl1.slice(3);
                                        totalprice += item.cutprice * item.qty;
                                return `<li data-id="${item.goodsid}">
                                            <div class="pic">
                                                <a href="" target="_blank" title="${item.name}">
                                                <img src="${imgurl1}"></a>
                                            </div>
                                            <div class="name">
                                                <a href="" target="_blank" title="${item.name}">${item.name}
                                                <span></span></a>
                                            </div>
                                            <div class="price">￥${item.cutprice}</div>
                                            <div class="talqty"><span>×</span>${item.qty}</div>
                                        </li>`;
                            }).join('');
                            
                            $('#cartListView ul').html(res);
                            $('#carListTotalCount').next().html(totalprice.toFixed(2));   
                        }
                        $('#carListTotalCount').html(totalqty);
                    }else{//登录但商品为0时
                        totalqty = 0;
                        $('#HeaderCartCount').html(0);
                        $('#go_cart').html(0);
                        $('#cartListView ul').html('');
                        $('#cartListView .buy').css('display','none');
                        $('#cartListView .none_car').css('display','block');
                    }
                }
            });
        }else{//未登录状态
            $('#HeaderCartCount').html(0);
            $('#go_cart').html(0);
            $('#cartListView ul').html('');
            $('#cartListView .buy').css('display','none');
            $('#cartListView .none_car').css('display','block');
        }
        
    }*/
});
"use strict";

$(function () {
    //打开列表页后 购物车信息自动跟新请求查询
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
    //列表页渲染页面
    // creatList();
    // function creatList(){
    /*
        * ajax连接接口，获取数据库的数据，进行渲染
        * 根据数据的长度计算，创建翻页节点
        * 点击翻页可以跳转到对应数据
        * 增加上一页下一页
    */
    var list_ku = document.querySelector('.list_ku');
    var page = document.querySelector('#page');
    var prev = document.querySelector('#prev');
    var next = document.querySelector('#next');

    var rows = 0;
    //初始化数据

    var sortURL = 'way=asc&key=goodsid';

    function creat(arr) {
        //数据渲染函数封装
        list_ku.innerHTML = "";
        var res = arr.datalist.map(function (item) {
            return "<li data-id=\"" + item.goodsid + "\">\n                            <div class=\"box\">\n                                <p class=\"jump pic\"><img src=\"" + item.imgurl1 + "\"/></p>\n                                <p class=\"jump name\">\n                                    <a href=\"javascript:;\">" + item.name + "</a>\n                                    <span>" + item.title + "</span>\n                                </p>\n                                <p class=\"price\">\uFFE5" + item.cutprice + "<span>\uFFE5" + item.oldprice + "</span></p>\n                                <p class=\"qty\">\n                                    <a href=\"javascript:;\" class=\"jian\"></a>\n                                    <input type=\"text\" value=\"1\" class=\"addCarNum\"/>\n                                    <a href=\"javascript:;\"javascript:; class=\"jia\"></a>\n                                </p>\n                                <p class=\"btn\"><img src=\"../images/listAddCar.gif\"/></p>\n                            </div>\n                        </li>";
        }).join('');

        list_ku.innerHTML = res;
    }

    //1.创建对象
    var xhr = new XMLHttpRequest();
    var url = "../api/list_select.php?page=1&qty=16&time=new Date()";
    xhr.open('GET', url, true);

    //2.发送请求
    xhr.send();

    //3.后台接口制作

    //4.接收数据做渲染
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var str = xhr.responseText;
            var arr = JSON.parse(str);
            console.log(arr);

            //数据渲染：数据
            creat(arr);

            //根据数据总长度，创建页码
            var num = Math.ceil(arr.total / arr.qty);
            rows = num; //总页数

            for (var i = 0; i < num; i++) {
                page.innerHTML += "<span>" + (i + 1) + "</span>";
            }

            page.children[0].className = 'active';

            //判断是否需要显示上一页，下一页
            if (num >= 2) {
                prev.style.display = 'block';
                next.style.display = 'block';
            }
        }
    };

    //5.利用事件委托绑定事件
    var now = 1;
    var timer;

    page.onclick = function (ev) {
        var ev = ev || window.event;
        //点哪个是哪个
        if (ev.target.tagName.toLowerCase() == 'span') {
            //ev.target  等同  this
            now = ev.target.innerText; //获取页码
            //console.log(num);
            //设置参数

            // url=`../api/list_select.php?page=${now}&qty=16&way=asc&key=goodsid&time=new Date()`;
            url = "../api/list_select.php?page=" + now + "&qty=16&time=new Date()&" + sortURL;
            xhr.open('GET', url, true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var str = xhr.responseText;
                    var arr = JSON.parse(str);
                    creat(arr); //渲染数据

                    //清空
                    for (var i = 0; i < page.children.length; i++) {
                        page.children[i].className = '';
                    }
                    page.children[now - 1].className = 'active';

                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        //回到顶部
                        window.scrollTo(0, 0);
                    }, 1000);
                }
            };
        }
    };

    //6.至少有两页，才出现，如果已经是第一页：prev隐藏；如果是最后一页了，next隐藏

    prev.onclick = function () {
        now--;
        if (now <= 1) {
            now = 1; //最小第一页
        }
        var url = "../api/list_select.php?page=" + now + "&qty=16&time=new Date()&" + sortURL;
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var str = xhr.responseText;
                var arr = JSON.parse(str);
                creat(arr); //渲染数据

                //清空
                for (var i = 0; i < page.children.length; i++) {
                    page.children[i].className = '';
                }
                page.children[now - 1].className = 'active';

                clearTimeout(timer);
                timer = setTimeout(function () {
                    //回到顶部
                    window.scrollTo(0, 0);
                    console.log(111);
                }, 1000);
            }
        };
    };

    next.onclick = function () {
        now++;
        if (now >= rows) {
            now = rows; //最大就是最后一页
        }
        var url = "../api/list_select.php?page=" + now + "&qty=16&time=new Date()&" + sortURL;
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var str = xhr.responseText;
                var arr = JSON.parse(str);
                creat(arr); //渲染数据

                //清空
                for (var i = 0; i < page.children.length; i++) {
                    page.children[i].className = '';
                }
                page.children[now - 1].className = 'active';

                clearTimeout(timer);
                timer = setTimeout(function () {
                    //回到顶部
                    window.scrollTo(0, 0);
                }, 1000);
            }
        };
    };

    //点击默认排序
    // $('.list_sort .default').click(function(){
    //     $.ajax({
    //        type: "GET",
    //        url: "../api/list_select.php?page=1&qty=16&way=asc&key=goodsid&time=new Date()",//默认
    //        // url: "../api/list_select.php?page=1&qty=16&way=asc&key=timer&time=new Date()",//时间
    //        // url: "../api/list_select.php?page=1&qty=16&way=asc&key=sellqty&time=new Date()",//销量
    //        // url: "../api/list_select.php?page=1&qty=16&way=asc&key=cutprice&time=new Date()",//价格
    //        // url: "../api/list_select.php?page=1&qty=16&way=asc&key=oldprice&time=new Date()",//评论
    //        success: function(msg){
    //          // alert( "Data Saved: " + msg );
    //          var arr=JSON.parse(msg);
    //          console.log(arr);
    //          //数据渲染：数据
    //         creat(arr);

    //        }
    //     });

    // })


    //
    //way-'asc'/'desc'
    //key-'排序字段名'
    function sortcreat(way, key) {
        $.ajax({
            type: "GET",
            url: "../api/list_select.php?page=1&qty=16&way=" + way + "&key=" + key + "&time=new Date()",
            success: function success(msg) {
                var arr = JSON.parse(msg);
                console.log(arr);

                creat(arr); //数据渲染：数据
            }
        });
    }

    //所有开关true默认asc的排序 
    var timerok = true; //时间
    var qtyok = true; //销量
    var priceok = true; //价格
    var commentok = true; //评论
    var timeway = 'desc';
    $('.list_sort').on("click", "li", function () {
        //排序
        //每次点击前清除之前添加的类名；
        $('.list_sort li a').removeClass("on");
        $('.list_sort li span').removeClass("up");
        $('.list_sort li span').removeClass("down");
        var way;
        var key;
        if ($(this).is('.default')) {
            //默认
            // console.log('default');
            way = "asc";
            key = "goodsid";
        } else if ($(this).is('.times')) {
            //时间
            // console.log('times');
            $('.times a').addClass("on");
            key = "timer";
            if (timerok) {
                $('.times span').addClass("up");
                way = "asc";
            } else {
                $('.times span').addClass("down");
                way = "desc";
            }
            timerok = !timerok; //开关用过就置反
        } else if ($(this).is('.sellqty')) {
            //销量
            // console.log('sellqty');
            $('.sellqty a').addClass("on");
            key = "sellqty";
            if (qtyok) {
                $('.sellqty span').addClass("up");
                way = "asc";
            } else {
                $('.sellqty span').addClass("down");
                way = "desc";
            }
            qtyok = !qtyok; //开关用过就置反
        } else if ($(this).is('.price')) {
            //价格
            // console.log('price');
            $('.price a').addClass("on");
            key = "cutprice";
            if (priceok) {
                $('.price span').addClass("up");
                way = "asc";
            } else {
                $('.price span').addClass("down");
                way = "desc";
            }
            priceok = !priceok; //开关用过就置反
        } else if ($(this).is('.comment')) {
            //评论
            // console.log('comment');
            $('.comment a').addClass("on");
            key = "sellqty";
            if (commentok) {
                $('.comment span').addClass("up");
                way = "asc";
            } else {
                $('.comment span').addClass("down");
                way = "desc";
            }
            commentok = !commentok; //开关用过就置反
        }
        sortcreat(way, key);
        sortURL = "way=" + way + "&key=" + key;
    });

    //减数量
    $('.list_ku').on('click', '.jian', function () {
        //点击获取对应行的数量，加1在赋值
        var val = $(this).next().val();
        val--;
        if (val <= 1) {
            //库存量
            val = 1;
        }
        $(this).next().val(val);
    });

    //加数量
    $('.list_ku').on('click', '.jia', function () {
        //点击获取对应行的数量，加1在赋值
        var val = $(this).prev().val();
        val++;
        if (val >= 100) {
            //库存量
            val = 100;
        }
        $(this).prev().val(val);
    });

    //点击加入购物车（请求渲染）-我的购物车+浮动窗口购物车
    $('.list_ku').on("click", '.btn', function () {
        console.log('btn');
        //1
        //获取用户名 var admin = $('.loginUname').text();
        //点击获取对应商品id, var goodsid = $(this).parent().parent().data("id");
        //获取数量$(this).parent().find('.addCarNum');
        var admin = Cookie.get('uname');
        var goodsid = $(this).parent().parent().data("id");
        var addqty = $(this).parent().find('.addCarNum').val();
        // console.log(qty);

        //2请求查询  
        $.ajax({
            type: "POST",
            url: "../api/car.php",
            data: "admin=" + admin + "&goodsid=" + goodsid + "&addqty=" + addqty,
            success: function success(msg) {
                var arr = JSON.parse(msg);
                console.log(msg);
                console.log(arr);
                console.log(arr.adminlist);
                console.log(Array.isArray(arr.adminlist));
                //用户历史加入购物车的数量
                var totalqty = 0;
                if (arr.adminlist) {
                    arr.adminlist.map(function (item) {
                        totalqty += Number(item.qty);
                    });
                } else {
                    totalqty = 0;
                }
                creatAddMycar(arr, '../'); //我的购物车（common.js）
                creatAddCarSide(arr, addqty, totalqty); //侧边栏购物车（common.js）
            }
        });
    });

    //点击商品img跳转至详情页
    $('.list_ku ').on("click", '.pic', function () {
        var goodsid = $(this).parent().parent().data("id");
        location.href = "detail.html?goodsid=" + goodsid;
    });
    //点解商品name调至详情页
    $('.list_ku ').on("click", '.name', function () {
        var goodsid = $(this).parent().parent().data("id");
        location.href = "detail.html?goodsid=" + goodsid;
    });

    // }
});
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
'use strict';

/*
#lunbotu{
                width: 520px;
                height: 280px;
                background: #ccc;
                margin: 50px auto;
                position: relative;
                overflow: hidden;
            }
            #lunbotu ul li{
                position: absolute;
                left: 0;
                top: 0;
            }

            #lunbotu .light{
                position: absolute;
                left: 50%;
                bottom:5px ;
                transform:translate(-50px,0);
                width: 80px;
                height: 12px;
                background: rgba(255,255,255,0.3);
                padding-right: 5px;
                border-radius: 6px;
                padding-top: 2px;
            }
            #lunbotu .light span{
                display: block;
                width: 8px;
                height: 8px;
                background: #fff;
                border-radius: 50%;
                float: left;
                margin-left: 5px;
                cursor: pointer;
            }
            #lunbotu .light .active{
                background: #ff5000;
            }

            #lunbotu .pis{
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 100%;
                height: 50px;
            }

            #lunbotu .pis p{
                position: absolute;
                width: 30px;
                height: 30px;
                line-height: 26px;
                font-size: 26px;
                text-align: center;
                background: #777;
                cursor: pointer;
                color:#fff;
                opacity:0.6;
            }

            #lunbotu .prev{
                float: left;
                left:-5px;
                border-radius: 0 50% 50% 0;
            }
            #lunbotu .next{
                float: right;
                right:-5px;
                border-radius:50% 0 0 50%;
            }
 */

/*    <div id="lunbotu">
        <!--放图片-->
        <div class="view">
            <ul class="ul">
                <li>
                    <a href="#"><img src="../images/taobao1.png"/></a>
                </li>
                <li>
                    <a href="#"><img src="../images/taobao2.png"/></a>
                </li>
                <li>
                    <a href="#"><img src="../images/taobao3.png"/></a>
                </li>
                <li>
                    <a href="#"><img src="../images/taobao4.png"/></a>
                </li>
                <li>
                    <a href="#"><img src="../images/taobao5.png"/></a>
                </li>
            </ul>
        </div>
        <!--焦点-->
        <p class="light">
            <span class="active"></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </p>
        <!--上下箭头-->
        <div class="pis">
            <p class="prev">上一张</p>
            <p class="next">下一张</p>
        </div>
    </div>
 
/*
 
3、js 特效

 1）、开定时器，让图片运动：旧图挪走，新图进入可视区
 2）、(鼠标经过停止)点击上下按钮：可以切换下一张和上一张
 3）、焦点跟随，点击焦点可以切到对应的图片
 
 做插件：把代码封装，把不同的地方做成参数
 
 * */

/**
 * [轮播图水平方向滚动]
 * @param  {String} id      [轮播图最大盒子的id名]
 * @param  {String} special [点击焦点高亮的类名]
 * @return {[type]}         [description]
 */
function sliderImg(id, special) {

    var slideimg = getid(id); //最大盒子
    var ul = slideimg.children[0].children[0];
    var alis = ul.children;
    var iW = alis[0].offsetWidth; //获取一个图片的宽度
    var num = 0; //可视区内图片下标，当前的那张
    var light = slideimg.children[1];
    var aspan = light.children; //焦点
    var pis = slideimg.children[2];
    var prevImg = pis.children[0]; //上一张
    var nextImg = pis.children[1]; //下一张


    //1.图片都在右侧
    for (var i = 0; i < alis.length; i++) {
        alis[i].style.left = iW + 'px';
    }

    //2.第一个图放到可视区
    alis[0].style.left = 0;

    //3、不断的轮下一张，开定时器：旧图挪走，新图进入可视区
    var timer = null;
    clearInterval(timer);
    timer = setInterval(next, 3500); //每隔2秒切一张图

    function next() {
        //切一个图片
        //旧图挪走 num=0
        startMove(alis[num], {
            'left': -iW
        });

        //新图进入可视区  num=1,先把新图放在右侧，再挪进来
        //      num++;
        num = ++num >= alis.length ? 0 : num;
        alis[num].style.left = iW + 'px';
        startMove(alis[num], {
            'left': 0
        }); //挪到可视区

        spanAvtive();
    }

    function prev() {
        //旧图挪到右侧 num 0
        startMove(alis[num], {
            'left': iW
        });
        //新图快速放到左侧，再挪进可视区
        //      num--; //num 5
        num = --num < 0 ? alis.length - 1 : num;
        alis[num].style.left = -iW + 'px';
        startMove(alis[num], {
            'left': 0
        }); //可视区
        spanAvtive(); //焦点跟随
    }
    prevImg.style.display = 'none';
    nextImg.style.display = 'none';
    //4、鼠标经过停止，鼠标离开继续轮播
    slideimg.onmouseenter = function () {
        clearInterval(timer); //鼠标经过清除定时器
        prevImg.style.display = 'block';
        nextImg.style.display = 'block';
    };

    slideimg.onmouseleave = function () {
        clearInterval(timer); //放在定时器叠加
        timer = setInterval(next, 3500);
        prevImg.style.display = 'none';
        nextImg.style.display = 'none';
    };

    //5.点击上下按钮：可以切换下一张和上一张
    prevImg.onclick = function () {
        //上一张
        prev();
    };

    nextImg.onclick = function () {
        //下一张
        next();
    };

    //6、焦点跟随，点击焦点可以切到对应的图片
    function spanAvtive() {
        for (var i = 0; i < aspan.length; i++) {
            aspan[i].className = '';
        }
        aspan[num].className = special;
    }
    //点击焦点可以切到对应的图片
    for (var i = 0; i < aspan.length; i++) {
        aspan[i].index = i;
        aspan[i].onclick = function () {
            //给每一个焦点绑定点击事件
            var index = this.index;

            //判断方向
            if (index > num) {
                //从右边切到可视区
                //旧图 num 挪到左边
                startMove(alis[num], {
                    'left': -iW
                });
                //新图 index 先放在右侧，再挪进可视区
                alis[index].style.left = iW + 'px';
                startMove(alis[index], {
                    'left': 0
                });
                num = index;
                spanAvtive();
            }
            if (index < num) {
                //从左边切入
                //旧图挪到右侧
                startMove(alis[num], {
                    'left': iW
                });
                //新的快速放左边，再进入可视区  index
                alis[index].style.left = -iW + 'px';
                startMove(alis[index], {
                    'left': 0
                });
                num = index;
                spanAvtive();
            }
        };
    }
}