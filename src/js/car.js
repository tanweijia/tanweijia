

$(function(){
    //点击h1标签跳转到首页
    $('h1').on("click",function(){
        location.href='../index.html';
    })

    //用户历史  有    加入购物车的数量
    function fnyes(arr){
        $('.car_none').css('display','none');
        $('.car_have').css('display','block');
        $('.order_content').html('');
        var i=0;
        var res=arr.adminlist.map(function(item){
            var imgurl1 = item.imgurl1;
            var idtotalprice = item.qty*item.cutprice;
            i=++i;
            var idx = i-1;
            return `<ul class="order_lists" data-id="${item.goodsid}">
                        <li class="list_chk">
                            <input type="checkbox" id="checkbox_${idx}" class="son_check">
                            <label for="checkbox_${idx}"></label>
                        </li>
                        <li class="list_con">
                            <div class="list_img"><a href="javascript:;"><img src="${imgurl1}" alt=""></a></div>
                            <div class="list_text"><a href="javascript:;">${item.name}</a></div>
                        </li>
                        <li class="list_info">
                            <p>商品id号：blsh${item.goodsid}</p>
                            <p>商品追加时间：${item.timer}</p>
                        </li>
                        <li class="list_price">
                        <p class="price">￥<span>${item.cutprice}</span></p>
                        </li>
                        <li class="list_amount">
                            <div class="amount_box">
                                <a href="javascript:;" class="reduce reSty">-</a>
                                <input type="text" value="${item.qty}" class="sum">
                                <a href="javascript:;" class="plus">+</a>
                            </div>
                        </li>
                        <li class="list_sum">
                        <p class="sum_price">￥ <span class="sum_idprice">${idtotalprice.toFixed(2)}</span></p>
                        </li>
                        <li class="list_op">
                            <p class="del"><a href="javascript:;" class="delBtn">移除商品</a></p>
                        </li>
                    </ul>`;
        }).join('');
        $('.order_content').html(res);
    }

    //用户历史  没有  加入购物车的数量
    function fnno(){
        $('.car_none').css('display','block');
        $('.car_have').css('display','none');
    }


    // 没有登录
    function fnunlogin(){
        $('.car_none').css('display','block');
        $('.car_have').css('display','none');
    }
    //打开首页后 购物车信息自动更新请求查询
    autoCar("../",fnyes,fnno,fnunlogin);

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
    $('.car_have').on("click","input",function(){
        if($(this).is(':checked')) {
            $(this).next('label').addClass('mark');
        } else {
            $(this).next('label').removeClass('mark')
        }
    });
    //结算按钮是否点亮
    function light_jiesuan(){
        var total_count = $('.piece_num').html();
        var total_money = $('.total_text').html();
        var calBtn = $('.calBtn a');
        if(total_money != 0 && total_count != 0) {
            if(!calBtn.hasClass('btn_sty')) {
                calBtn.addClass('btn_sty');
            }
        } else {
            if(calBtn.hasClass('btn_sty')) {
                calBtn.removeClass('btn_sty');
            }
        }
    }
    //点击全选1
    $('.car_have').on('click',".whole_check", function() {
        if($(this).is(':checked')) {
            //全选 attr()只能帮到普通属性  id class title ;prop()添加有行为的属性：一般用在单选和复选框
            $(this).prop('checked', 'checked');//全选1
            $(this).next('label').addClass('mark');//全选1 label
            $(this).parent().parent().parent().next('.cartBox').find('.son_check').prop('checked', 'checked');//遍历 商品input
            $(this).parent().parent().parent().next('.cartBox').find('label').addClass('mark');;//遍历 商品input
            $('.whole_check2').prop('checked', 'checked');//全选2
            $('.whole_check2').next().addClass('mark');//全选2 label

            //计算数量
            var sum_idqty = $(this).parent().parent().parent().next('.cartBox').find('.sum');
            var sum_qty =0;
            for ( var i = 0; i <sum_idqty.length; i++){
                sum_qty += Number(sum_idqty[i].value);
            }
            $('.piece_num').html(sum_qty);
            //计算价格
            var sum_idprice = $(this).parent().parent().parent().next('.cartBox').find('.sum_idprice');
            var sum_price =0;
            for ( var i = 0; i <sum_idprice.length; i++){
                sum_price += Number(sum_idprice[i].innerHTML);
            }
            $('.total_text').html(sum_price.toFixed(2));
        } else {
            //不选
            $(this).removeAttr('checked');//全选1 input
            $(this).next('label').removeClass('mark');//全选1 label
            $(this).parent().parent().parent().next('.cartBox').find('.son_check').removeAttr('checked');//遍历 商品input
            $(this).parent().parent().parent().next('.cartBox').find('label').removeClass('mark');//遍历 商品label
            $('.whole_check2').removeAttr('checked');//全选2
            $('.whole_check2').next().removeClass('mark');//全选2 label
            //计算数量
            $('.piece_num').html(0);
            //计算价格
            $('.total_text').html(0.00);
        }
        light_jiesuan();
    });

    //点击全选2
    $('.car_have').on('click',".whole_check2", function() {
        if($(this).is(':checked')) {
            //全选 attr()只能帮到普通属性  id class title ;prop()添加有行为的属性：一般用在单选和复选框
            $(this).prop('checked', 'checked');//全选2
            $(this).next('label').addClass('mark');//全选2 label
            $(this).parent().parent().parent().prev('.cartBox').find('.son_check').prop('checked', 'checked');//遍历 商品input
            $(this).parent().parent().parent().prev('.cartBox').find('label').addClass('mark');//遍历 商品input
            // console.log($(this).parent().parent().parent().prev('.cartBox').find('.mark').size());
            $('.whole_check').prop('checked', 'checked');//全选1
            $('.whole_check').next().addClass('mark');//全选1 label
            //计算数量
            var sum_idqty = $(this).parent().parent().parent().prev('.cartBox').find('.sum');
            var sum_qty =0;
            for ( var i = 0; i <sum_idqty.length; i++){
                sum_qty += Number(sum_idqty[i].value);
            }
            $('.piece_num').html(sum_qty);
            //计算价格
            var sum_idprice = $(this).parent().parent().parent().prev('.cartBox').find('.sum_idprice');
            var sum_price =0;
            for ( var i = 0; i <sum_idprice.length; i++){
                sum_price += Number(sum_idprice[i].innerHTML);
            }
            $('.total_text').html(sum_price.toFixed(2));
        } else {
            //不选
            $(this).removeAttr('checked');//全选2 input
            $(this).next('label').removeClass('mark');//全选2 label
            $(this).parent().parent().parent().prev('.cartBox').find('.son_check').removeAttr('checked');//遍历 商品input
            $(this).parent().parent().parent().prev('.cartBox').find('label').removeClass('mark');//遍历 商品label
            $('.whole_check').removeAttr('checked');//全选1
            $('.whole_check').next().removeClass('mark');//全选1 label
            //计算数量
            $('.piece_num').html(0);
            //计算价格
            $('.total_text').html(0.00);
        }
        light_jiesuan();
    });
    
    //点击每个商品的input
    $('.cartBox').on('click',"input", function() {
        //获取全选栏初始数量
        var sum_qty= $('.piece_num').html()*1;
        //获取全选栏初始价格
        var sum_price= $('.total_text').html()*1;
        //产品行数量
        var sum_idqty = $(this).parent().parent().find('.sum').val()*1;
        //产品行小计
        var sum_idprice = $(this).parent().parent().find('.sum_idprice').html()*1;
        
        if($(this).is(':checked')) {
            $(this).prop('checked', 'checked');
            $(this).next('label').addClass('mark');
            var marks = $(this).parent().parent().parent().find('.mark');//已点击选中的产品数量
            var label = $(this).parent().parent().parent().find('label');//全部商品数量
            // 总数量追加
            $('.piece_num').html(sum_qty+sum_idqty);
            // 总价格追加
            $('.total_text').html((sum_price+sum_idprice).toFixed(2));
            if(marks.length==label.length){//控制是否全选勾上
                //证明全被勾选
                $('.whole_check').prop('checked', 'checked');//全选1
                $('.whole_check').next().addClass('mark');//全选1 label 
                $('.whole_check2').prop('checked', 'checked');//全选2
                $('.whole_check2').next().addClass('mark');//全选2 label
            }else{
                $('.whole_check').removeAttr('checked');//全选1
                $('.whole_check').next().removeClass('mark');//全选1 label
                $('.whole_check2').removeAttr('checked');//全选2
                $('.whole_check2').next().removeClass('mark');//全选2 label
            }
        }else{
            $(this).removeAttr('checked');
            $(this).next('label').removeClass('mark')
            $('.whole_check').removeAttr('checked');//全选1
            $('.whole_check').next().removeClass('mark');//全选1 label
            $('.whole_check2').removeAttr('checked');//全选2
            $('.whole_check2').next().removeClass('mark');//全选2 label

            // 总数量追减
            $('.piece_num').html(sum_qty-sum_idqty);
            // 总价格追减
            $('.total_text').html((sum_price-sum_idprice).toFixed(2));
        }
        light_jiesuan();
    });


    //加数量:事件委托方式
    $('.cartBox').on('click', '.plus', function() {
        if($(this).parent().parent().parent().find('.son_check').is(':checked')){
        //点击前 加入合计的产品行数量
        //点击前 加入合计的产品小计
            var sum_oldidqty = 0;
            var sum_oldidprice = 0;
        }else{
            var sum_oldidqty = $(this).prev().val()*1;
            var sum_oldidprice = $(this).parent().parent().parent().find('.sum_idprice').html()*1;
        }
        //点击获取对应行的数量，加1再赋值
        var val = $(this).prev().val();
        val++;
        if(val >= 100) { //库存量
            val = 100;
        }
        $(this).prev().val(val);
        $(this).parent().parent().parent().find('.son_check').prop('checked', 'checked');//遍历 商品input
        $(this).parent().parent().parent().find('label').addClass('mark');;//遍历 商品input
        
        //刷新小计
        var sum_idqty = $(this).prev().val()*1;//产品行数量
        var idprice = $(this).parent().parent().parent().find('.price span').html()*1//单价
        var sum_idprice = sum_idqty*idprice; //产品行小计
        $(this).parent().parent().parent().find('.sum_idprice').html(sum_idprice.toFixed(2));

        //获取全选栏初始数量
        var sum_qty= $('.piece_num').html()*1;
        //获取全选栏初始价格
        var sum_price= $('.total_text').html()*1;
        
        // 总数量追加
        $('.piece_num').html(sum_qty+sum_oldidqty+1);
        // 总价格追加
        $('.total_text').html((sum_price+sum_oldidprice+idprice).toFixed(2));

        //判断全选按钮是够勾选上
        var marks = $(this).parent().parent().parent().parent().find('.mark');//已点击选中的产品数量
        var label = $(this).parent().parent().parent().parent().find('label');//全部商品数量
        if(marks.length==label.length){//控制是否全选勾上
            //证明全被勾选
            $('.whole_check').prop('checked', 'checked');//全选1
            $('.whole_check').next().addClass('mark');//全选1 label 
            $('.whole_check2').prop('checked', 'checked');//全选2
            $('.whole_check2').next().addClass('mark');//全选2 label
        }else{
            $('.whole_check').removeAttr('checked');//全选1
            $('.whole_check').next().removeClass('mark');//全选1 label
            $('.whole_check2').removeAttr('checked');//全选2
            $('.whole_check2').next().removeClass('mark');//全选2 label
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
            data: `admin=${admin}&goodsid=${goodsid}&addqty=${addqty}`,
            success: function(msg){
                console.log('数据库 增加 修改成功');
            }
        });
    });


    //减去数量
    $('.cartBox').on('click', '.reduce', function() {
        
        //获取全选栏 初始数量
        var sum_qty= $('.piece_num').html()*1;
        //获取全选栏 初始价格
        var sum_price= $('.total_text').html()*1;
        //单价
        var idprice = $(this).parent().parent().parent().find('.price span').html()*1;
        //点击前是否已选中过
        var ok =$(this).parent().parent().parent().find('.son_check').is(':checked');
        
        //未勾选 且最终数量为1时
        jianno_sum_qty=sum_qty+1;
        jianno_sum_price=sum_price+idprice;

        //点击前获取对应行的数量，减1再赋值
        var val = $(this).next().val()*1;//2
        var valKeepqty = val;//2 桥梁 存储点击获取对应行的数量
        val--;
        if(val <= 1) { //库存量
            val = 1;
        }
        $(this).next().val(val);


        var sum_idqty = $(this).next().val()*1;//产品行数量
        var sum_idprice = sum_idqty*idprice;//产品行小计
        $(this).parent().parent().parent().find('.sum_idprice').html(sum_idprice.toFixed(2));

        if(ok){//点击前已勾选
            if(val >1){
                // 总数量追减
                $('.piece_num').html(sum_qty-1);
                // 总价格追减
                $('.total_text').html((sum_price-idprice).toFixed(2));
            }else if(valKeepqty ==2){
                // 总数量追减
                $('.piece_num').html(sum_qty-1);
                // 总价格追减
                $('.total_text').html((sum_price-idprice).toFixed(2));
            }else{
                jian_sum_qty = sum_qty -1;
                
                // 总数量追减
                $('.piece_num').html(sum_qty);
                // 总价格追减
                $('.total_text').html((sum_price).toFixed(2));
            }
        }else{
            if(val>1){//点击前未勾选
                // 总数量追减
                $('.piece_num').html(sum_qty+sum_idqty);
                // 总价格追减
                $('.total_text').html((sum_price+sum_idprice).toFixed(2));
            }else{
                // 总数量追减
                $('.piece_num').html(jianno_sum_qty);
                // 总价格追减
                $('.total_text').html((jianno_sum_price).toFixed(2));
            }
        }




        
        //点击时添加样式
        $(this).parent().parent().parent().find('.son_check').prop('checked', 'checked');//遍历 商品input
        // console.log($(this).parent().parent().parent().find('.son_check'));
        $(this).parent().parent().parent().find('label').addClass('mark');//遍历 商品input

        //判断全选按钮是够勾选上
        var marks = $(this).parent().parent().parent().parent().find('.mark');//已点击选中的产品数量
        var label = $(this).parent().parent().parent().parent().find('label');//全部商品数量
        if(marks.length==label.length){//控制是否全选勾上
            //证明全被勾选
            $('.whole_check').prop('checked', 'checked');//全选1
            $('.whole_check').next().addClass('mark');//全选1 label 
            $('.whole_check2').prop('checked', 'checked');//全选2
            $('.whole_check2').next().addClass('mark');//全选2 label
        }else{
            $('.whole_check').removeAttr('checked');//全选1
            $('.whole_check').next().removeClass('mark');//全选1 label
            $('.whole_check2').removeAttr('checked');//全选2
            $('.whole_check2').next().removeClass('mark');//全选2 label
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
            data: `admin=${admin}&goodsid=${goodsid}&addqty=${addqty}&valKeepqty=${valKeepqty}`,
            success: function(msg){
                console.log('数据库减 数量 修改成功');
            }
        });
    });

    //===================================移除商品========================================
    var $order_lists_input = false;//桥梁 删除的input是否有勾选
    var $order_lists = null;//桥梁 把要删除的商品装进这
    var $order_lists_idqty = null;//桥梁 把要删除的商品数量装进这
    var $order_lists_idsum = null;//桥梁 把要删除的商品小计装进这
    var $order_lists_id = null;//桥梁 把要删除的商品id装进这
    var $uls =null;
    $('.order_content').on("click",".delBtn",function(){
        $order_lists = $(this).parent().parent().parent();//每一个商品
        $uls= $(this).parent().parent().parent().parent().find('ul').size();
        $order_lists_id = $(this).parent().parent().parent().data("id");

        console.log($order_lists_id);
        if($(this).parent().parent().parent().find('.son_check').is(':checked')){
            $order_lists_input = true;
            $order_lists_idqty =$(this).parent().parent().parent().find('.amount_box').find('input').val()*1;
            $order_lists_idsum =$(this).parent().parent().parent().find('.sum_idprice').html()*1;
        }
        $('.model_bg').fadeIn(300);//遮罩层出现
        $('.my_model').fadeIn(300);//遮罩层出现
    });

    //关闭模态框 
    $('.closeModel').click(function() {//点击X
        closeM();
    });
    $('.dialog-close').click(function() {//点击关闭
        closeM();
    });
    //确定按钮，移除商品
    $('.dialog-sure').click(function() {
        $order_lists.remove();

         //获取全选栏初始数量
        var sum_qty= $('.piece_num').html()*1;
        //获取全选栏初始价格
        var sum_price= $('.total_text').html()*1;
        if($order_lists_input){
        // 总数量追减
        $('.piece_num').html(sum_qty-$order_lists_idqty);
                // 总价格追减
        $('.total_text').html((sum_price-$order_lists_idsum).toFixed(2));
        }
        //判断是否删除完
        if($uls==1){
            $('.car_have').css('display','none');
            $('.car_none').css('display','block');
        }
        closeM();

        var admin = Cookie.get('uname');
        var goodsid = $order_lists_id;
        var deleteall = 0;
        //2请求查询  
        $.ajax({
            type: "POST",
            url: "../api/car_delete.php",
            data: `admin=${admin}&goodsid=${goodsid}&deleteall=${deleteall}`,
            success: function(msg){
                console.log(msg);
            }
        });
        
    });
    function closeM() {
        $('.model_bg').fadeOut(300);//遮罩层隐藏
        $('.my_model').fadeOut(300);//提示框隐藏
    }


});