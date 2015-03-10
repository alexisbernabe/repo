<div style="margin: 0 auto;padding-top:200px;text-align:center;"><img src="images/ajax-loader.gif" /></div>
<?php
session_start();
include_once('class/class.main.php');
$db = new db();
$connector = new fucn ();
/*
if(isset($_REQUEST['cust_id']) && !empty($_COOKIE[phpaffiliateid])){
    $db->db_connect();
    $affid = $_COOKIE[phpaffiliateid];
	$customerId = $_REQUEST['cust_id'];
	$url_details = 'https://'. $db->xmluser .':'. $db->xmlpwd .'@tabluu.chargify.com/customers/'.$customerId.'/subscriptions.xml';
	//$url_details = 'https://'. $db->xmluser .':'. $db->xmlpwd .'@tripbull.chargify.com/customers/'.$customerId.'/subscriptions.xml';	
	$result = file_get_contents($url_details);
	$objxml = simplexml_load_string($result);	
	$prodId = $objxml->subscription->product->id;
	if($db->freever == $prodId){
		$sql = "INSERT INTO affplan SET affId = $affid,chargify_cust_id = '$customerId'" ; $query = mysql_query($sql);
		//header("Location: http://tabluu.applicationcraft.com/app#/app?cust_id=$cust_id&subs_id=$subs_id");
		header("Location: app/signup.html?cust_id=$cust_id&subs_id=$subs_id");
	}else{
		$sql = "INSERT INTO affplan SET affId = $affid,paid=1,chargify_cust_id = '$customerId'" ; $query = mysql_query($sql);
		$sqlsale = "SELECT sales,commission,unpaid,paid FROM affsale WHERE affId = ".$affid;
		$resultsale = mysql_query($sqlsale);
		if(mysql_num_rows($resultsale)){
			$row2 = mysql_fetch_object($resultsale);
			$sales =  $row2->sales + 1;
			$commision =  $row2->commission + 20;
			$unpaid =  $row2->unpaid + 20;
			$sql = "UPDATE affsale SET sales=". $sales .",commission=". $commision .",unpaid=". $unpaid ." WHERE affId = ".$affid;
			mysql_query($sql);
		}else{
			$sales =  1;$commision = 20;$unpaid =  20;
			$sql = "INSERT INTO affsale SET sales=". $sales .",commission=". $commision .",unpaid=". $unpaid .", affId = ".$affid;
			mysql_query($sql);
		}
		header("Location: app/signup.html?cust_id=$cust_id&subs_id=$subs_id");
		//header("Location: http://tabluu.applicationcraft.com/app#/app?cust_id=$cust_id&subs_id=$subs_id");
	}
	$db->db_disconnect();
}else{ */
if(isset($_REQUEST['cust_id']) && isset($_REQUEST['subs_id']) && isset($_REQUEST['ref'])){
	$db->db_connect();
	$cust_id = $_REQUEST['cust_id'];
	$url = '/customers/'.$cust_id.'/subscriptions.xml';
	$result = $connector->sendRequest($url, $format = 'xml', $method = 'GET', $data='');
	if($result->code == 200){
		$objxml = simplexml_load_string($result->response);
		$state = $objxml->subscription->state;
		$expiry = $objxml->subscription->current_period_ends_at;
		$subs_id = $_REQUEST['subs_id'];
		$fname =  $objxml->subscription->customer->first_name;
		$lname = $objxml->subscription->customer->last_name;
		$email = $objxml->subscription->customer->email;
		$productId = $objxml->subscription->product->id;
		$cust_id = $_REQUEST['cust_id'];
		$date = date('Y-m-d h:i:s');
		$gId = $_REQUEST['ref'];
		$_SESSION['newcreated']= time();
		$result = mysql_query("UPDATE businessUserGroup SET chargify_cust_id =$cust_id, subscription_id =$subs_id , email='$email',state='$state',addLoc=0,productId=$productId,expiration='$expiry' WHERE gId=$gId") or die(mysql_error());
		$db->db_disconnect();
		header("Location: index.html"); 

	}else{
		die('internal server error'); 
	}
}
//}
?>
