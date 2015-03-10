<html>
  <head>
    <title>Products</title>
  </head>
  <body>
  <pre>

<?php
include_once('class/class.main.php');
$connector = new fucn();
$connect = new db();
$connect->db_connect();
	$subscription_id = 7083257;
	$sql = "SELECT g.productId,g.removeloc FROM businessUserGroup AS g WHERE g.subscription_id = $subscription_id LIMIT 1";
	$row = mysql_fetch_object(mysql_query($sql));
	if($row->removeloc > 0){
		$comp_id_prev = getCurrentComponentId((int)$row->productId);
		$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id_prev .'.xml';
		$result = $connector->sendRequest($url, $format = 'xml', $method = 'GET', $data='');
		if($result->code == 200){
		$objxml = simplexml_load_string($result->response);
		$allocate = (int)$objxml->allocated_quantity;
		if($allocate > 0){
			$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id_prev .'/allocations.xml';
			echo $allocate = $allocate - $row->removeloc;
			echo $data = '<?xml version="1.0" encoding="UTF-8"?>
			  <allocation>
				  <quantity>'. $allocate .'</quantity>
				  <proration_downgrade_scheme>"no-prorate"</proration_downgrade_scheme>
				   <proration_upgrade_scheme>"no-prorate"</proration_upgrade_scheme>
			  </allocation>';
			$result = $connector->sendRequest($url, $format = 'xml', $method = 'POST', $data);
			if($result->code == 201)
				mysql_query("UPDATE businessUserGroup SET addLoc=$allocate,removeloc=0 WHERE subscription_id = $subscription_id") or die(mysql_error());
			
		}else
			mysql_query("UPDATE businessUserGroup SET removeloc=0 WHERE subscription_id = $subscription_id") or die(mysql_error());
		}
	}
$connect->db_disconnect();
function getCurrentComponentId($product){
/*
//live mode chargify ids
$everFree = 3356308;$basicID=3356305;$basic12 = 3405343;$basic24 = 3405344;$proID=3356306;$pro12 = 3405345;$pro24 = 3405346;$enterprise=3356316;$enterprise12 =3410620;$enterprise24 = 3410619; 
//live component chargify ids
$com_basicID=26331;$com_basic12 = 39047;$com_basic24 = 39048;$com_proID=26332;$com_pro12 = 39050;$com_pro24 = 39051;$com_enterprise=26333;$com_enterprise12 =39053;$com_enterprise24 =39054; */

//test mode chargify ids
$everFree = 3602345;$basicID=3361656;$basic12 = 3602785;$basic24 = 3602788;$proID=3361672;$pro12 = 3602786;$pro24 = 3602789;$enterprise=3602346;$enterprise12 =3602787;$enterprise24 = 3602790; 
//test component chargify ids
$com_basicID=27367;$com_basic12 = 69598;$com_basic24 = 69599;$com_proID=27368;$com_pro12 = 69600;$com_pro24 = 69601;$com_enterprise=69597;$com_enterprise12 =69602;$com_enterprise24 =69603; 
	$id=0;
	if($product == $basicID){
		$id = $com_basicID;
	}else if($product == $proID){
		$id = $com_proID;
	}else if($product == $enterprise){
		$$id = $com_enterprise;
	}else if($product == $basic12){
		$id = $com_basic12;
	}else if($product == $basic24){
		$id = $com_basic24;
	}else if($product == $pro12){
		$id = $com_pro12;
	}else if($product == $pro24){
		$id = $com_pro24;
	}else if($product == $enterprise12){
		$id = $com_enterprise12;
	}else if($product == $enterprise24){
		$id = $com_enterprise24;
	} 
	return $id;
}
?>
  </body>
</html>