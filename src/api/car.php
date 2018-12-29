<?php

    include 'connect.php';//相当于复制connect.php的文件内容过这里
    //接收前端传过来的参数，返回相关信息给前端
    //接收数据
    $admin=isset($_POST['admin']) ? $_POST['admin'] : '';
    $goodsid=isset($_POST['goodsid']) ? $_POST['goodsid'] : '';
    // $name=isset($_POST['name']) ? $_POST['name'] : '';
    // $cutprice=isset($_POST['cutprice']) ? $_POST['cutprice'] : '';
    $addqty = isset($_POST['addqty']) ? $_POST['addqty'] : '';
    $valKeepqty = isset($_POST['valKeepqty']) ? $_POST['valKeepqty'] : '';

    // $imgurl1 = isset($_POST['imgurl1']) ? $_POST['imgurl1'] : '';
    
    
//================================================================    
    //写查询语句 1(是否曾加入过购物车)：
    if($admin){
        $sql1="SELECT * FROM car where admin=$admin and goodsid=$goodsid";
        //执行语句
        $res1=$conn->query($sql1);
        //执行语句：得到结果集
        $row=$res1->num_rows;//获取结果集里面的num_rows属性，记录的条数
        $data1=$res1->fetch_all(MYSQLI_ASSOC);//获取查询的所有内容
        if($row>0){
            $oldqty=$data1[0]['qty'];
            //已存在 执行更新qty
            $qty = $oldqty + $addqty;
            if($valKeepqty != 1){
                $sql2="UPDATE car SET qty=$qty WHERE admin=$admin AND goodsid=$goodsid";
                //执行语句
                $res2=$conn->query($sql2);

            }
            $sql3="SELECT * FROM car WHERE admin=$admin and goodsid=$goodsid";
            //执行语句
            $res3=$conn->query($sql3);
            //获取内容部分
            $data3=$res3->fetch_all(MYSQLI_ASSOC);//获取查询的所有内容
            $goodsid = $data3[0]['goodsid'];//提取goodsid;
            $name= $data3[0]['name'];
            $cutprice=$data3[0]['cutprice'];
            $qty=$data3[0]['qty'];
            $imgurl1 = $data3[0]['imgurl1'];
            $res3->close();//关掉结果集

        }else{
            // if($addqty){
                $qty=$addqty;
                //不存在:（查询data表获取对应商品id信息）
                $sql4="SELECT * FROM goodsdata WHERE goodsid=$goodsid";
                
                //执行语句
                $res4=$conn->query($sql4);
                
                //获取内容部分
                $data4=$res4->fetch_all(MYSQLI_ASSOC);//获取查询的所有内容
                $goodsid = $data4[0]['goodsid'];//提取goodsid;
                $name= $data4[0]['name'];
                $cutprice=$data4[0]['cutprice'];
                $imgurl1 = $data4[0]['imgurl1'];

                $res4->close();//关掉结果集


                /*$sql5="INSERT INTO car (admin,goodsid,name,cutprice,qty,imgurl1) VALUES($admin,$goodsid,$name,$cutprice,$qty,$imgurl1)";*/
                
               /* $sql5 = "INSERT INTO car (admin, goodsid, name, cutprice, qty, imgurl1)
                        VALUES ('".$admin."', '".$goodsid."', '".$name."', '".$cutprice."', '".$qty."', '".$imgurl1."')";*/
                $sql5 = "INSERT INTO `car` (`admin`, `goodsid`,`name`, `cutprice`, `qty`, `imgurl1`) VALUES ('{$admin}', {$goodsid}, '{$name}', {$cutprice}, {$qty}, '{$imgurl1}')";
                //执行语句
                $conn->query($sql5);
                
            // }
        }
        //写查询语句6:（获取该用户的全部购物信息）
        $sql6="SELECT * FROM car WHERE admin=$admin";
        //执行语句
        $res6=$conn->query($sql6);
        $adminlist=$res6->fetch_all(MYSQLI_ASSOC);//获取查询的所有内容
        $res6->close();//关掉结果集
    }
    
    //把你要给前端数据，做成关联数组，再统一转成字符串
    // INSERT INTO car (admin,goodsid,name,cutprice,qty,imgurl1) VALUES("1311231234",6,"哈密瓜",5.5,1,"../images/1.jpg");
    
    if($addqty){
        $gooddata=array(
            'goodsid'=>$goodsid,//商品id
            'name'=>$name,//商品名字
            'cutprice'=>$cutprice,//商品价格
            'qty'=>$qty,//商品件数
            'imgurl1'=>$imgurl1,//商品图片
            'adminlist'=>$adminlist//用户全部car的数据
        );
    }else if($admin){
        $gooddata=array(
            'adminlist'=>$adminlist//用户全部car的数据
        );
    }else{
        $gooddata=array(
            'adminlist'=>''//用户全部car的数据
        );
    }
    
    echo json_encode($gooddata,JSON_UNESCAPED_UNICODE);
    
    $res1->close();//关掉结果集
    $conn->close();//断开连接
//  var_dump($res);
//  
//  var_dump($res2);
//  
//  echo $row;
//  
//  var_dump($data);
    
?>