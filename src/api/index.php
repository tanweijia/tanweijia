<?php
	include 'connect.php';
	$page=isset($_GET['page']) ? $_GET['page'] : '0';
    $qty=isset($_GET['qty']) ? $_GET['qty'] : '8';
	
	//查询需要的数据
	$sql="SELECT * FROM goodsdata LIMIT $page,$qty";
	//执行语句：得到结果集
	$res=$conn->query($sql);
	$data=$res->fetch_all(MYSQLI_ASSOC);//获取查询的所有内容
	$row=$res->num_rows;//获取结果集里面的num_rows属性，记录的条数
	//===============================================
	$goodlist=array(
		'total'=>$row,//总条数
		'datalist'=>$data//查询到的数据
	);
	echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);
	$res->close();
	$conn->close();
//	var_dump($goodlist);
	
	
?>