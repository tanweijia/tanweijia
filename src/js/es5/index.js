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