<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
?>
<!DOCTYPE html>
<html> 
<head>
	<title>Recommend &amp; share</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='rateone.html?p=<?php echo $_REQUEST['p'] ?>'</script>

</head>
<body>
<div id="sharephoto" data-dom-cache="false" data-role="page">
	<div class="content-wrap">
		<div role="main" class="ui-content">
			<div class="takewrap">
				<div class="clear taketop"></div>
				<p class="txt-25 titleheader">Recommend &amp; share?</p>
				<div class="clear take-cam-wrap">
					<img src="images/template/fbPhoto.png" class="cam-img" alt="" />
				</div>
				<div class="wrap-logo">
					<div class="clear" style="padding:2px" ></div>
					<img src="images/template/7Ins_default.png" class="take-logo" />
				</div>
				<div style="width:100%;max-width:200px;margin:0 auto;"><p class="share_privacy"></p></div>
				<div class="takebutton">
					<a href="#" data-rel="back" class="take-no">no</a>
					<a href="#" data-rel="back" class="take-yes">yes</a>
				</div>
			</div>
		</div><!-- /content -->
		<input type="hidden" id="placeId" name="placeId" value="<?php echo $_REQUEST['p']?>" />
	</div>
</div>	
</body>
</html>