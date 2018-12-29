<?php

    include 'connect.php';//相当于复制connect.php的文件内容过这里
    //接收前端传过来的参数，返回相关信息给前端
    //接收数据
    $admin=isset($_POST['admin']) ? $_POST['admin'] : '13112341234';
    $goodsid=isset($_POST['goodsid']) ? $_POST['goodsid'] : '1';
    $deleteall = isset($_POST['deleteall']) ? $_POST['deleteall'] : '0';
    if($admin&&$goodsid){
        $sql1="DELETE FROM car where admin=$admin and goodsid=$goodsid";
        if($conn->query($sql1)){
            echo '删除单产品成功';
        }else{
            echo '没有删除';
        }
    }else if($admin&&$deleteall){
        $sql2="DELETE FROM car where admin=$admin";
        if($conn->query($sql2)){
            echo '删除全部成功';
        }else{
            echo '没有删除';
        }
    }else{
        echo '没有执行任何sql命令';
    }
    
?>