<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
?>
<!DOCTYPE html>
<html> 
<head>
	<title>Take a new photo</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='rateone.html?p=<?php echo $_REQUEST['p'] ?>'</script>

</head>
<body>
<div id="takephoto" data-role="page">
	<div class="content-wrap">
		<div role="main" class="ui-content">
			<div class="takewrap">
				<div class="clear taketop"></div>
				<p class="txt-25 titleheader">Take a new photo?</p>
				<div class="clear take-cam-wrap">
					<img src="images/template/cameraIcon.png" class="cam-img" alt="" width="220" height="223" />
				</div>	
				<div class="takebutton">
					<a href="#" data-rel="back" class="take-no">no</a>
					<a href="#" data-rel="back" class="take-yes">yes</a>
				</div>
				<form id="frmtakephoto" style="visibility:hidden;height:0px" action="setPhoto.php" method="post" enctype="multipart/form-data" >
					<input type="file" name="filephoto" style="visibility:hidden;height:0px" id="filephoto" accept="image/*;capture=camera" />
					<input type="hidden" value="" name="photoId" id="photoId" />
				</form>
				<div class="clear take-powered">
					<p class="txt-16"> powered by:</p>
				</div>
				<div class="clear">
					<img src="images/template/logo_orig.png" class="take-logo" alt="" width="131" height="49" />
				</div>
			</div>
		</div><!-- /content -->
		<input type="hidden" id="placeId" name="placeId" value="<?php echo $_REQUEST['p']?>" />
	</div>
</div>	
</body>
</html>