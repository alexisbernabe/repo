<?php
session_start();
include_once('class/class.cookie.php');
include_once('class/class.main.php');
$db = new db();
$cookie = new cookie();
$issignup = 0;

if(!$cookie->validateAuthCookie()){
	header("Location: login.html");
	die;
}else{
    $ur_session = rand(0, 15);
	if(!isset($_SESSION['session']))
		$_SESSION['session']=$ur_session;
	if (isset($_SESSION['newcreated'])) {
		if (time() - $_SESSION['newcreated'] > 0.6) {
			$issignup = 0;
		}else
			$issignup = 1;
	}	
}
/*
$datetoconvert = '2014-12-18 14:52:21';
$user_tz = 'Asia/Singapore';//'America/Chicago';
$server_tz = 'UTC';

$schedule_date = new DateTime($datetoconvert, new DateTimeZone($server_tz) );
$schedule_date->setTimeZone(new DateTimeZone($user_tz));
$datetoconvert =  $schedule_date->format('Y-m-d g:i:s a');
$newdate = explode(' ',$datetoconvert); 
print_r($newdate); 

$date = new DateTime("2014-12-18 01:34:27", new DateTimeZone($server_tz));

date_default_timezone_set($user_tz);

echo date("Y-m-d h:iA", $date->format('U')); 
echo date_default_timezone_get();*/

?>
<!DOCTYPE html>
<html> 
<head>
	<title>Dashboard Panel</title>
    <meta name="robots" content="index, follow"/>
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
	<link type="text/css" rel="stylesheet" href="js/source/jquery.fancybox.css?v=2.1.5" media="screen" />
	<link type="text/css" rel="stylesheet" href="css/dialog.css" type="text/css">
	<link type="text/css" rel="stylesheet" href="css/style.css" />
	<link rel="stylesheet" href="./minified/themes/square.min.css" type="text/css" media="all" />
	<link type="text/css" rel="stylesheet" href="css/colorpicker.css" />
	<link rel="stylesheet" href="css/jquery.mobile.datepicker.css" />
	<link type="text/css" rel="stylesheet" href="css/magnific-orig.css"/>
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>
	<script type="text/javascript" src="js/jquery.masonry.min.js"></script>
	<script type="text/javascript" src="js/jquery.mobile-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/jquery.md5.js"></script>
	<script type="text/javascript" src="js/jquery.ui.datepicker.js"></script>
	<script type="text/javascript" src="js/jquery.ae.image.resize.min.js"></script>
	<script type="text/javascript" src="js/jquery.mobile.datepicker.js"></script>
	<script type="text/javascript" src="js/jquery.form.min.js"></script>
	<script type="text/javascript" src="js/json3.min.js"></script>
	<script type="text/javascript" src="minified/jquery.sceditor.xhtml.min.js"></script>	
	<script type="text/javascript" src="js/jquery.qrcode-0.7.0.min.js"></script>
	<script type="text/javascript" src="js/colorpicker.js"></script>
	<script type="text/javascript" src="js/jquery.magnific-popup.js"></script>
	<script type="text/javascript" src="js/dialog.js"></script>
	<script type="text/javascript" src="js/dashboard.js"></script>
	<script type="text/javascript" src="js/source/jquery.fancybox.pack.js?v=2.1.5"></script>
</head>
<body>
		<div id="dashboard" data-role="page" data-dom-cache="false" data-prefetch="false">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo_home.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconlogout" />
					</div>
				</div><!-- /header -->
				<div role="main" class="ui-content right-bgblue">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Dashboard</div>			
							<ul class="left-menu" data-defaults="true" data-role="listview">
								<li ><a href="#" >Help<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#">User Admin<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#">Global Settings<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#">Send Emails<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#">Subscription<span class="listview-arrow-default"></span></a></li>
							</ul>	
							<ul class="addnew-loc" data-role="listview">
							    <li><a href="#"><img src="images/template/plus.png" alt="" class="ui-li-icon ui-corner-none">Add a new location / business &amp; press enter...</a></li>
							</ul>
                            <span class="text-loc hide"><input type="text" name="text-6" id="text-6" value="" placeholder="Add a new location / business &amp; press enter..."></span>			
						</div>
						<div class="right-content right-bgblue fr">
							<div class="right-header"></div>
							<section class="right-menu-help hide">
								<ul class="right-menu" data-role="listview">
									<!--<li><a href="http://www.tabluu.com/blog/getting-started-with-tabluu" target="_blank">Remove getting started<span class="listview-arrow-default"></span></a></li>-->
									<li ><a href="http://www.tabluu.com/blog/how-do-i-setup-tabluu-2"  target="_blank">Setting Up Tabluu<span class="listview-arrow-default"></span></a></li><li ><a href="http://www.tabluu.com/blog/some-examples-to-get-you-started" target="_blank">Examples<span class="listview-arrow-default"></span></a></li>					
								</ul>
							</section>
							<section class="right-menu-admin hide">
								<ul class="right-menu" data-role="listview"><li ><a href="admin.html" data-prefetch="true">Add New User<span class="listview-arrow-default"></span></a></li><li ><a href="admin.html" data-prefetch="true">Manage Users<span class="listview-arrow-default"></span></a></li><li ><a href="admin.html" data-prefetch="true">Profile & Password<span class="listview-arrow-default"></span></a></li></ul>
							</section>
							<section class="right-menu-settings hide">
								<ul class="right-menu" data-role="listview"><li><a href="settings.html" data-prefetch="true">Time Zone<span class="listview-arrow-default"></span></a></li></ul>
							</section>
							<section class="right-menu-send hide">
								<ul class="right-menu" data-role="listview"><li ><a href="sendemail.html" data-prefetch="true">Send Emails<span class="listview-arrow-default"></span></a></li></ul>
							</section>	
							<section class="right-menu-plan hide">
								<ul class="plan-page" data-role="listview"><li ><a href="#" data-prefetch="true">Plan &amp; Locations<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Transactions<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Activity<span class="listview-arrow-default"></span></a></li></ul>
							</section>	
							<section class="right-menu-loc hide">
								<ul class="right-menu-loc" data-role="listview"><li ><a href="#" id="collectFeedback" data-prefetch="false">Collect Feedback / Reviews<span class="listview-arrow-default"></span></a></li><li><a href="#" id="manageFeedback" data-prefetch="true">Manage Feedback / Reviews<span class="listview-arrow-default"></span></a></li><li><a href="#" id="review-widget" data-prefetch="true">Review Widget<span class="listview-arrow-default"></span></a></li><li ><a href="#" id="setup-custom" data-prefetch="false">Setup<span class="listview-arrow-default"></span></a></li><li id="visit-tabluu-page"><a href="#" target="_blank" data-prefetch="false">Visit Your Tabluu Page<span class="listview-arrow-default"></span></a></li><li ><a href="#" id="page-stat" data-prefetch="false">Statistics<span class="listview-arrow-default"></span></a></li><li ><a href="#" id="change-icon" data-prefetch="false">Change Status<span class="listview-arrow-default"></span></a></li><li ><a href="#" id="del-place" data-prefetch="false">Delete<span class="listview-arrow-default"></span></a></li></ul>
							</section>								
						</div>
					</div>					
				</div><!-- /content -->
				<input type="hidden" value="<?php echo $cookie->getUserId(); ?>" name="key" id="key" />
				<input type="hidden" value="<?php echo $issignup ?>" name="issignup" id="issignup" />
				<?php require_once('footer.html'); ?>
			</div>
		</div><!-- /page -->		
</body>
</html>