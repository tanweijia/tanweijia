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