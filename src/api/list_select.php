<?php

    include 'connect.php';//相当于复制connect.php的文件内容过这里
    //接收前端传过来的page qty，返回相关信息给前端
    
    $page=isset($_GET['page']) ? $_GET['page'] : '1';
    $qty=isset($_GET['qty']) ? $_GET['qty'] : '10';
    $way = isset($_GET['way']) ? $_GET['way'] : 'asc';
    $key = isset($_GET['key']) ? $_GET['key'] : 'goodsid';
    $goodsid = isset($_GET['goodsid']) ? $_GET['goodsid'] : '10';
    
    
    $index=($page-1)*$qty;//计算下标的公式
//================================================================    
    //写查询语句 1(数量控制，分页效果)：
    $sql="SELECT * FROM goodsdata ORDER BY $key $way LIMIT $index,$qty";
    
    //执行语句：得到结果集
    $res=$conn->query($sql);
    
    //获取内容部分
    $data=$res->fetch_all(MYSQLI_ASSOC);//获取查询的所有内容
// ===============================================================
    
    //写查询语句2:（获取全部数量）
    $sql2='select * from goodsdata';
    
    //执行语句
    $res2=$conn->query($sql2);
    
    $row=$res2->num_rows;//获取结果集里面的num_rows属性，记录的条数
// ==================================================================
    
    //写查询语句3:（获取对应商品id信息）
    $sql3="SELECT * FROM goodsdata WHERE goodsid=$goodsid";
    
    //执行语句
    $res3=$conn->query($sql3);
    
    //获取内容部分
    $data3=$res3->fetch_all(MYSQLI_ASSOC);//获取查询的所有内容
// ==================================================================

    //把你要给前端数据，做成关联数组，再统一转成字符串
    
    $goodlist=array(
        'total'=>$row,//总条数
        'datalist'=>$data,//查询到的数据
        'page'=>$page,//第几页
        'qty'=>$qty,//每页显示多少条
        'goodsid'=>$data3//获取商品id
    );
    
    echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);
    
    $res->close();//关掉结果集
    $res2->close();//关掉结果集
    $res3->close();//关掉结果集
    $conn->close();//断开连接
//  var_dump($res);
//  
//  var_dump($res2);
//  
//  echo $row;
//  
//  var_dump($data);
    
?>