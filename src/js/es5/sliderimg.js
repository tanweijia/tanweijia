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