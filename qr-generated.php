<?php
session_start();
include_once('class/class.cookie.php');
$cookie = new cookie();
if(!$cookie->validateAuthCookie())
	die('access is forbidden');
if(!isset($_REQUEST['s']) || !isset($_REQUEST['p']) || !isset($_REQUEST['size']))
	die('error the url parameters is not correct');

$size = 200;

if($_REQUEST['size'] == 1)
	$size = 100;
else if($_REQUEST['size'] == 2)
	$size = 200;
else if($_REQUEST['size'] == 3)
	$size = 300;
else if($_REQUEST['size'] == 4)
	$size = 400;
else if($_REQUEST['size'] == 5)
	$size = 500;

if($_REQUEST['s'] > 0)
	$link = 'http://www.tabluu.com/'.$_REQUEST['p'].'=1';
else	
	$link = 'http://www.tabluu.com/'.$_REQUEST['p'].'=0';
?>
<!DOCTYPE html>
<html> 
<head>
	<title>QR Code Generated</title>
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.qrcode-0.7.0.min.js"></script>
	<script type="text/javascript">
		var updateQrCode = function () {
			var options = {
				// render method: `'canvas'`, `'image'` or `'div'`
				render: 'image',
				fill: '#000',
				size: <?php echo $size ?>,
				text: '<?php echo $link ?>',
			};
			$("#qrcode").qrcode(options);
		}
		setTimeout(updateQrCode, 100);
	</script>
</head>
<body>
	<div id="qrcode"></div>
</body>
</html>