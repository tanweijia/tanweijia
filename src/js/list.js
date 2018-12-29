$(function(){
    //打开列表页后 购物车信息自动跟新请求查询
    var url_carShowNunfrist="../";
    autoCar(url_carShowNunfrist);

    //点击.nav_y导航条跳转至列表页
    $('.nav_y').on("click",function(){
        location.href='list.html';
    })

    //点击h1标签跳转到首页
    $('h1').on("click",function(){
        location.href='../index.html';
    })
    //列表页渲染页面
    // creatList();
    // function creatList(){
        /*
            * ajax连接接口，获取数据库的数据，进行渲染
            * 根据数据的长度计算，创建翻页节点
            * 点击翻页可以跳转到对应数据
            * 增加上一页下一页
        */
        var list_ku=document.querySelector('.list_ku');
        var page=document.querySelector('#page');
        var prev=document.querySelector('#prev');
        var next=document.querySelector('#next');
        
        var rows=0;
        //初始化数据
        
        var sortURL='way=asc&key=goodsid';
//      console.log(sortURL);


        function creat(arr){//数据渲染函数封装
            list_ku.innerHTML="";
            var res=arr.datalist.map(function(item){
                return `<li data-id="${item.goodsid}">
                            <div class="box">
                                <p class="jump pic"><img src="${item.imgurl1}"/></p>
                                <p class="jump name">
                                    <a href="javascript:;">${item.name}</a>
                                    <span>${item.title}</span>
                                </p>
                                <p class="price">￥${item.cutprice}<span>￥${item.oldprice}</span></p>
                                <p class="qty">
                                    <a href="javascript:;" class="jian"></a>
                                    <input type="text" value="1" class="addCarNum"/>
                                    <a href="javascript:;"javascript:; class="jia"></a>
                                </p>
                                <p class="btn"><img src="../images/listAddCar.gif"/></p>
                            </div>
                        </li>`;
            }).join('');
            
            list_ku.innerHTML=res;
        }
        
        //1.创建对象
        var xhr=new XMLHttpRequest();
        var url=`../api/list_select.php?page=1&qty=16&time=new Date()`;
        xhr.open('GET',url,true);
        
        //2.发送请求
        xhr.send();
        
        //3.后台接口制作
        
        //4.接收数据做渲染
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 && xhr.status==200){
                var str=xhr.responseText;
                var arr=JSON.parse(str);
//              console.log(arr);
                
                //数据渲染：数据
                creat(arr);
                
                //根据数据总长度，创建页码
                var num=Math.ceil(arr.total/arr.qty);
                rows=num;//总页数
                
                for(var i=0;i<num;i++){
                    page.innerHTML+=`<span>${i+1}</span>`;
                }
                
                page.children[0].className='active';
                
                //判断是否需要显示上一页，下一页
                if(num>=2){
                    prev.style.display='block';
                    next.style.display='block';
                }
            }
        }
        
        
        //5.利用事件委托绑定事件
        var now=1;
        var timer;

        //点击页码换页
        prev.style.opacity='0.5';
        page.onclick=function(ev){
	        	
//      	console.log(ev.target.innerText);
            var ev = ev || window.event;
            //点哪个是哪个
            if(ev.target.tagName.toLowerCase() == 'span'){
                //ev.target  等同  this
                now=ev.target.innerText;//获取页码
                if(now<=1){
	                prev.style.opacity='0.5';
	            }else{
	            	prev.style.opacity='1';
	            }
	        	if(now>=rows){
	                now=rows;//最大就是最后一页
	                next.style.opacity='0.5';
	           }else{
	            	next.style.opacity='1';
	            }
//              console.log(ev.target.tagName.toLowerCase());
                //设置参数
                
                // url=`../api/list_select.php?page=${now}&qty=16&way=asc&key=goodsid&time=new Date()`;
                url=`../api/list_select.php?page=${now}&qty=16&time=new Date()&${sortURL}`;
                xhr.open('GET',url,true);
                xhr.send();
                xhr.onreadystatechange=function(){
                    if(xhr.readyState==4 && xhr.status==200){
                        var str=xhr.responseText;
                        var arr=JSON.parse(str);
                        creat(arr);//渲染数据
                        
                        //清空
                        for(var i=0;i<page.children.length;i++){
                            page.children[i].className='';
                        }
                        page.children[now-1].className='active';

                        clearTimeout(timer);
                        timer=setTimeout(function(){//回到顶部
                            window.scrollTo(0,0);
                        },100);
                    }
                }
            }
        }
        
        
        //6.至少有两页，才出现，如果已经是第一页：prev隐藏；如果是最后一页了，next隐藏
        //点击上一页商品
//      prev.style.opacity='0.5';
        prev.onclick=function(ev){
        	var ev = ev || window.event;
        	var y=window.scrollY;
            now--;
            if(now<=1){
                now=1;//最小第一页
                prev.style.opacity='0.5';
            }
            if(now>1){
            	prev.style.opacity='1';
            }
            next.style.opacity='1';
//          console.log(now);
            var url=`../api/list_select.php?page=${now}&qty=16&time=new Date()&${sortURL}`;
            xhr.open('GET',url,true);
            xhr.send();
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4 && xhr.status==200){
                    var str=xhr.responseText;
                    var arr=JSON.parse(str);
                    creat(arr);//渲染数据
                    //清空
                    for(var i=0;i<page.children.length;i++){
                        page.children[i].className='';
                    }
                    page.children[now-1].className='active';

                    clearTimeout(timer);
                    timer=setTimeout(function(){//回到顶部
                    	window.scrollTo(0,0);
                        
                    },100);
                }
            }
        }
        //点击下一页商品
        next.onclick=function(){
            now++;
            if(now>=rows){
                now=rows;//最大就是最后一页
                next.style.opacity='0.5';
            }else{
            	next.style.opacity='1';
            }
            prev.style.opacity='1';
            var url=`../api/list_select.php?page=${now}&qty=16&time=new Date()&${sortURL}`;
            xhr.open('GET',url,true);
            xhr.send();
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4 && xhr.status==200){
                    var str=xhr.responseText;
                    var arr=JSON.parse(str);
                    creat(arr);//渲染数据
                    
                    //清空
                    for(var i=0;i<page.children.length;i++){
                        page.children[i].className='';
                    }
                    page.children[now-1].className='active';

                    clearTimeout(timer);
                    timer=setTimeout(function(){//回到顶部
                        window.scrollTo(0,0);
                    },100);
                }
            }
        }


    
        //
        //way-'asc'/'desc'
        //key-'排序字段名'
        function sortcreat(way,key){
            $.ajax({
               type: "GET",
               url: `../api/list_select.php?page=1&qty=16&way=${way}&key=${key}&time=new Date()`,
               success: function(msg){
                var arr=JSON.parse(msg);
//              console.log(arr);
                 
                creat(arr);//数据渲染：数据

               }
            });
        }

        
        //所有开关true默认asc的排序 
        var timerok=true;//时间
        var qtyok=true;//销量
        var priceok = true;//价格
        var commentok = true;//评论
        var timeway = 'desc';
        $('.list_sort').on("click","li",function(){//排序
            //每次点击前清除之前添加的类名；
            $('.list_sort li a').removeClass("on");
            $('.list_sort li span').removeClass("up");
            $('.list_sort li span').removeClass("down");
            var way;
            var key;
            if($(this).is('.default')){
                //默认
                // console.log('default');
                way = "asc";
                key = "goodsid";

            }else if($(this).is('.times')){
                //时间
                // console.log('times');
                $('.times a').addClass("on");
                key = "timer";
                if(timerok){
                    $('.times span').addClass("up");
                    way = "asc";

                }else{
                    $('.times span').addClass("down");
                    way = "desc";
                }
                timerok=!timerok;//开关用过就置反
            }else if($(this).is('.sellqty')){
                //销量
                // console.log('sellqty');
                $('.sellqty a').addClass("on");
                key = "sellqty";
                if(qtyok){
                    $('.sellqty span').addClass("up");
                    way = "asc";
                }else{
                    $('.sellqty span').addClass("down");
                    way = "desc";
                }
                qtyok=!qtyok;//开关用过就置反
            }else if($(this).is('.price')){
                //价格
                // console.log('price');
                $('.price a').addClass("on");
                key = "cutprice";
                if(priceok){
                    $('.price span').addClass("up");
                    way = "asc";
                }else{
                    $('.price span').addClass("down");
                    way = "desc";
                }
                priceok=!priceok;//开关用过就置反
            }else if($(this).is('.comment')){
                //评论
                // console.log('comment');
                $('.comment a').addClass("on");
                key = "sellqty";
                if(commentok){
                    $('.comment span').addClass("up");
                    way = "asc";
                }else{
                    $('.comment span').addClass("down");
                    way = "desc";
                }
                commentok=!commentok;//开关用过就置反
            }
            sortcreat(way,key);
            sortURL=`way=${way}&key=${key}`;
        })

        
        

        //减数量
        $('.list_ku').on('click', '.jian', function() {
            //点击获取对应行的数量，加1在赋值
            var val = $(this).next().val();
            val--;
            if(val <= 1) { //库存量
                val = 1;
            }
            $(this).next().val(val);
        });

        //加数量
        $('.list_ku').on('click', '.jia', function() {
            //点击获取对应行的数量，加1在赋值
            var val = $(this).prev().val();
            val++;
            if(val >= 100) { //库存量
                val = 100;
            }
            $(this).prev().val(val);
        });
        

        


        //点击加入购物车（请求渲染）-我的购物车+浮动窗口购物车
        $('.list_ku').on("click",'.btn',function(){
//          console.log('btn');
            //1
                //获取用户名 var admin = $('.loginUname').text();
                //点击获取对应商品id, var goodsid = $(this).parent().parent().data("id");
                //获取数量$(this).parent().find('.addCarNum');
            //获取Cookie
            var admin = Cookie.get('uname');
            //如果没有找到Cookie
            if(!admin){
            	confirm('登录后才能继续操作！');
            	return;
            }
            var goodsid = $(this).parent().parent().data("id");
            var addqty = $(this).parent().find('.addCarNum').val();
            //console.log(qty);
			
            //2请求查询  
            $.ajax({
                type: "POST",
                url: "../api/car.php",
                data: `admin=${admin}&goodsid=${goodsid}&addqty=${addqty}`,
                success: function(msg){
                    var arr=JSON.parse(msg);
                    console.log(msg);
                    console.log(arr);
                    console.log(arr.adminlist);
                    console.log(Array.isArray(arr.adminlist));
                    //用户历史加入购物车的数量
                    var totalqty=0;
                    if(arr.adminlist){
                        arr.adminlist.map(function(item){
                            totalqty += Number(item.qty);
                        })
                    }else{
                        totalqty = 0;
                    }
                    creatAddMycar(arr,'../');//我的购物车（common.js）
                    creatAddCarSide(arr,addqty,totalqty);//侧边栏购物车（common.js）
                }
            });
            
        })


        //点击商品img跳转至详情页
        $('.list_ku ').on("click", '.pic',function(){
            var goodsid = $(this).parent().parent().data("id");
            location.href=`detail.html?goodsid=${goodsid}`;
        })
        //点解商品name调至详情页
        $('.list_ku ').on("click", '.name',function(){
            var goodsid = $(this).parent().parent().data("id");
            location.href=`detail.html?goodsid=${goodsid}`;
        })
       
    // }
})