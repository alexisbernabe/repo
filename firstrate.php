<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
?>
<!DOCTYPE html>
<html> 
<head>
	<title>Sign Up Now</title>
    <meta name="robots" content="noindex, nofollow"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
	<link type="text/css" rel="stylesheet" href="css/dialog.css" type="text/css">
	<link type="text/css" rel="stylesheet" href="css/style.css" />
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.mobile-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/jquery.form.min.js"></script>
	<script type="text/javascript" src="js/jquery.md5.js"></script>
	<script type="text/javascript" src="js/dialog.js"></script>	
	<script type="text/javascript" src="js/rate.js"></script>

</head>
<body>
<div id="rateone" data-role="page" data-prefetch="true">
	<div class="content-wrap">
		<div role="main" class="ui-content">
			<div class="main-wrap">
				<div class="contentwrap">
					<div class="clear" style="padding-top:2.6em"></div>
				</div>
			</div>	
		</div><!-- /content -->
	</div>
					
</body>
</html>