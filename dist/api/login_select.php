<?php
    
    //接收前端传过来的用户名，验证数据库是否存在该用户名，返回相关信息给前端
    
    //连接数据库
    
    include 'connect.php';
    
    //接收参数
    $name=isset($_POST['name']) ? $_POST['name'] : 'hahaha';
    $psw=isset($_POST['psw']) ? $_POST['psw'] : 'a123456';
    
//  echo $name;//一定要做检测才往下面做

    //写查询语句
    $sql="select * from user_inf where name='$name'";
    
    //执行语句
    $res=$conn->query($sql);//结果集
    
    $arr = $res->fetch_all(MYSQLI_ASSOC);

    //获取数据库中的名字和密码
    // var_dump($arr);
    // var_dump(is_array( $arr ));
    if( empty( $arr ) ){
        $nameSql =  '未注册用户名';
        $pswSql = '未注册用户名的密码';
    }else{
        $nameSql =$arr[0]['name'];
        $pswSql = $arr[0]['password'];
    }
 // var_dump($nameSql);

    
        //与数据库匹配成功，可以登录,返回yes
        //未注册用户名，返回new；
        //错误，返回no;
        //in_array($name,$arr[0]['name']) && in_array($psw,$arr[0]['password'])
    if($name==$nameSql && $psw==$pswSql){
        echo 'yes';
    }else if($name != $nameSql){
        echo 'new';
    }else{
        echo 'no';
    }
    
    //关闭结果集和数据库
    
    $res->close();
    $conn->close();
    
?>