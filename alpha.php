<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
$fname='';$lname='';$email='';$lastid='';
if(isset($_REQUEST['cust_id'])){
	include_once('class/class.main.php');
}
$_SESSION['typeofaccnt']='a';
?>
<!DOCTYPE html>
<html> 
<head>
	<title>alpha pre-launch sign up</title>
    <meta name="robots" content="noindex, nofollow"/>
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
	<link type="text/css" rel="stylesheet" href="js/source/jquery.fancybox.css?v=2.1.5" media="screen" />
	<link type="text/css" rel="stylesheet" href="css/dialog.css" type="text/css">
	<link type="text/css" rel="stylesheet" href="css/style.css" />
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.mobile-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/source/jquery.fancybox.pack.js?v=2.1.5"></script>
	<script type="text/javascript" src="js/jquery.form.min.js"></script>
	<script type="text/javascript" src="js/alpha.js"></script>
</head>
<body>
<div style="padding:30px 20px 0 20px;border:1px solid #00aeed;width:auto;max-width:420px;" id="alphapermission">
	<div style="height:auto;min-height:335px;">
	<div class="alpha_p1">
		<!--<p class="title-2">YES! I want this pre-launch deal!</p> -->
		<h3 class="subtitle-2">What I will get…</h3>
		<div style="margin-top:5x;">
		<ul class="bullet">
			<li>No credit card is required in this application!</li>
			<li>I will get 12 months subscription of Tabluu’s Enterprise plan (worth $718.80) absolutely FREE!</li>
			<li>There is no obligation for me to continue my subscription after the expiry date and I
may cancel my account anytime before the subscription period is over.</li>
			<li>I own a business that will benefit from using Tabluu.</li>
		</ul>
		</div>
		<p class="title-2">YES! I want this pre-launch deal!</p>
	</div>
	<div class="hide alpha_p2">
		<h3 class="subtitle-2">What I will give in return…</h3>
		<ul class="bullet">
			<li>I will use Tabluu in my business premises immediately!</li>
			<li>I will be VERY CREATIVE when using Tabluu! <img src="emoticons/smile.png" width="20" height="20" /></li>
			<li>I will join Tabluu’s blog discussions & share my experiences!.</li>
			<li>I will help improve Tabluu by reporting bugs and suggesting improvements.</li>
			<li>I will provide Tabluu with a shared review 30 days after using it.</li>
		</ul>
	</div>
	<div class="hide alpha_p3">
		<h3 class="subtitle-2">I also agree with the following…</h3>
		<ul class="bullet">
			<li>I will not sell or transfer my Tabluu Enterprise plan.</li>
			<li>I will not apply for more than one Tabluu Enterprise plan.</li>
			<li>In the event that I do not collect from at least 20 <u>unique reviewers</u> per month,
Tabluu will automatically suspend my account without notice.</li>
		</ul>
	</div>
	</div>
	<div class="clear"></div>
	<div class="btnalphaAgree">
		<div class="btn-submit">
			<button class="ui-btn" id="iAgree">I Agree</button>
		</div>
	</div>
	<div class="clear" style="padding:10px;"></div>
</div>

</body>
</html>