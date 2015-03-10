<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
$address = $_SESSION['address'];
?>
<!DOCTYPE html>
<html> 
<head>
	<title>Please rate <?php echo $address ?></title>
	<meta name="robots" content="index, follow"/>
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='rateone.html?p=<?php echo $_REQUEST['p'] . (isset($_REQUEST['s']) ? '&s='.$_REQUEST['s'] : '' ) ?>'</script>

</head>
<body>
<div class="rate" id="ratefive" data-role="page">
	<div class="content-wrap">
		<div role="main" class="ui-content">
			<div class="ratewrap">
				<div class="rate-logo">
					<img src="images/" alt="" class="loc-logo" />
				</div>
				<div class="rate-question">
					<p class="ratetxt">Please rate us...</p>
				</div>
				<div class="wrap-star">
					<div class="rate-wrapstar">
						<div class="rate-star starRate1">
							<img src="images/template/blankstar.png" width="" class="imgrate1" alt="" />
							<span class="vpoor">Very Poor</span>
						</div>
						<div class="rate-star starRate2">
							<img src="images/template/blankstar.png" alt="" class="imgrate2" />
							<span class="poor">Poor</span>
						</div>
						<div class="rate-star starRate3">
							<img src="images/template/blankstar.png" alt="" class="imgrate3" />
							<span class="fair">Fair</span>
						</div>
						<div class="rate-star starRate4">
							<img src="images/template/blankstar.png" alt="" class="imgrate4" />
							<span class="good">Good</span>
						</div>
						<div class="rate-star starRate5">
							<img src="images/template/blankstar.png" alt="" class="imgrate5" />
							<span class="exc">Excellent</span>
						</div>
					</div>
				</div>
				<div class="loc-address"><p class="addressname">Tabluu, 51 West 52nd Street, New York, USA</p></div>
				<div class="loc-login"><img src="images/template/logoBelowUI.png" class="ratelogo" alt="" width="103" height="30" /></div>
			</div>	
			<input type="hidden" id="placeId" name="placeId" value="<?php echo $_REQUEST['p']?>" />
		</div><!-- /content -->
	</div>
</div>	
</body>
</html>