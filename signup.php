<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
$fname='';$lname='';$email='';$lastid='';
	
if(isset($_REQUEST['cust_id'])){
	include_once('class/class.main.php');
	$connector = new fucn();
	$connect = new db();
	$connect->db_connect();
    /* $username = 'bd16cl1ppL4dlfLGEyUH';
    $password = 'x';
	$cust_id = $_REQUEST['cust_id'];
	$url_details = 'https://'.$username.':'.$password.'@tabluu.chargify.com/customers/'.$cust_id.'/subscriptions.xml';
	$result = file_get_contents($url_details);
	$objxml = simplexml_load_string($result);
	$state = $objxml->subscription->state;
	$expiry = $objxml->subscription->current_period_ends_at;
	$subs_id = $objxml->subscription->id;
	$fname =  $objxml->subscription->customer->first_name;
	$lname = $objxml->subscription->customer->last_name;
	$email = $objxml->subscription->customer->email;
	$productId = $objxml->subscription->product->id;
	$cust_id = $_REQUEST['cust_id'];
	$date = date('Y-m-d h:i:s'); */
	$cust_id = $_REQUEST['cust_id'];
	$url = '/customers/'.$cust_id.'/subscriptions.xml';
	$result = $connector->sendRequest($url, $format = 'xml', $method = 'GET', $data='');
	if($result->code == 200){
		$objxml = simplexml_load_string($result->response);
		$date = date('Y-m-d H:i:s');
		$state = (string)$objxml->subscription->state;
		$expiry = (string)$objxml->subscription->current_period_ends_at;
		$subs_id = (string)$_REQUEST['subs_id'];
		$fname =  (string)$objxml->subscription->customer->first_name;
		$lname = (string)$objxml->subscription->customer->last_name;
		$email = (string)$objxml->subscription->customer->email;
		$productId = (string)$objxml->subscription->product->id;
		mysql_query("INSERT INTO businessUserGroup SET chargify_cust_id =$cust_id, subscription_id =$subs_id , email='$email',state='$state',addLoc=0,productId=$productId,expiration='$expiry',created='$date'") or die(mysql_error());
		$lastid = mysql_insert_id(); 
	}
	$connect->db_disconnect();
}	
?>
<!DOCTYPE html>
<html> 
<head>
	<title>Sign up</title>
    <meta name="robots" content="noindex, nofollow"/>
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
	<link type="text/css" rel="stylesheet" href="css/dialog.css" type="text/css">
	<link href="js/source/jquery.fancybox.css?v=2.1.5" media="screen" rel="stylesheet" type="text/css" />
	<link type="text/css" rel="stylesheet" href="css/style.css" />
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.mobile-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/jquery.form.min.js"></script>
	<script type="text/javascript" src="js/source/jquery.fancybox.pack.js?v=2.1.5"></script>
	<script type="text/javascript" src="js/jquery.md5.js"></script>
	<script type="text/javascript" src="js/dialog.js"></script>	
	<script type="text/javascript" src="js/signup.js"></script>

</head>
<body>
<div id="sign" data-role="page" data-prefetch="true">
	<div class="content-wrap">
		<div role="main" class="ui-content">
			<div class="main-wrap">
				<div class="contentwrap">
					<div class="logo-sign"></div>
					<div class="clear" style="padding-top:2.6em"></div>
					<div style="padding:0 5px;">
					    <input type="text" data-clear-btn="false" name="fname" id="fname" value="<?php echo $fname ?>" placeholder="first name">
						<div class="clear" style="padding-top:0.5em"></div>
						<input type="text" data-clear-btn="false" name="lname" id="lname" value="<?php echo $lname ?>" placeholder="last name">
						<div class="clear" style="padding-top:0.5em"></div>
						<input type="text" data-clear-btn="false" name="email" id="email" value="<?php echo $email ?>" placeholder="email">
						<div class="clear" style="padding-top:0.5em"></div>
						<input type="password" data-clear-btn="false" name="newpwd" id="newpwd" value="" placeholder="enter a password">
						<div class="clear" style="padding-top:0.5em"></div>
						<input type="password" data-clear-btn="false" name="newpwdConfirm" id="newpwdConfirm" value="" placeholder="confirm password">
						<input type="hidden" name="groupId" id="groupId" value="<?php echo $lastid ?>" >
						<div class="clear" style="padding-top:1em"></div>
						<a href="https://www.tabluu.com/subscription_agreement.html" class="fancybox fancybox.iframe" style="font-weight:normal;color: #00AEEF;">I accept the terms &amp; conditions</a>
						<div class="clear" style="padding-top:0.5em"></div>
						<div class="btn-submit">
							<button class="ui-btn" id="submit-signing">Submit</button>
						</div>
					</div>
					<div class="clear" style="padding-top:1em"></div>
					<div class="page-login">Already have an account? Login here</div>
					<div class="clear" style="padding-top:1.5em"></div>
				</div>
				</div>	
		</div><!-- /content -->
		<div data-role="footer"></div><!-- /footer -->
	</div>
					
</body>
</html>