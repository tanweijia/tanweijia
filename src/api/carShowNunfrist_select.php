<?php

    include 'connect.php';//相当于复制connect.php的文件内容过这里
    //接收前端传过来的参数，返回相关信息给前端
    //接收数据
    $admin=isset($_POST['admin']) ? $_POST['admin'] : '';
   
    
    
//================================================================    
   if($admin){
        //写查询语句:（获取该用户的全部购物信息）
        $sql6="SELECT * FROM car WHERE admin=$admin";
        //执行语句
        $res6=$conn->query($sql6);
        $adminlist=$res6->fetch_all(MYSQLI_ASSOC);//获取查询的所有内容
        $res6->close();//关掉结果集
   }else{
        $adminlist="";
   }
    
    //把你要给前端数据，做成关联数组，再统一转成字符串
    // INSERT INTO car (admin,goodsid,name,cutprice,qty,imgurl1) VALUES("1311231234",6,"哈密瓜",5.5,1,"../images/1.jpg");
    
    $gooddata=array(
        'adminlist'=>$adminlist//用户全部car的数据
    );
    
    echo json_encode($gooddata,JSON_UNESCAPED_UNICODE);
    
    $conn->close();//断开连接
//  var_dump($res);
//  
//  var_dump($res2);
//  
//  echo $row;
//  
//  var_dump($data);
    
?>