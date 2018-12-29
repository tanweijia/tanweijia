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