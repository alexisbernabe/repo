<?php
session_start();
include_once('class/class.cookie.php');
include_once('class/class.main.php');
$cookie = new cookie();
if(!$cookie->validateAuthCookie())
	die('access is forbidden');
if(!isset($_REQUEST['s']) || !isset($_REQUEST['id']))
	die('error the url parameters is not correct');

$connect = new db();
$connect->db_connect();
$placeId = $_REQUEST['id'];
$sql = "SELECT c.printvalue,p.nicename FROM businessCustom as c LEFT JOIN businessProfile AS p ON p.profilePlaceId = c.customPlaceId
		WHERE c.customPlaceId = $placeId";
$result = mysql_query($sql) or die(mysql_error());
$row = mysql_fetch_object($result );
$textline = json_decode($row->printvalue);
$connect->db_disconnect();
$size = 120;
if($_REQUEST['s'] > 0){
	$firstline1 = (!empty($textline) ? $textline->firstline1 : 'We Value Your Feedback');
	$link = 'http://www.tabluu.com/'.$row->nicename.'=1';
	$shortlink = 'tabluu.com/'.$row->nicename.'=1';
}else{
	$firstline1 = (!empty($textline) ? $textline->firstline2 : 'We Value Your Feedback');
	$link = 'http://www.tabluu.com/'.$row->nicename.'=0';
	$shortlink = 'tabluu.com/'.$row->nicename.'=0';
}	
?>
<!doctype html>
<html>
<head>
<title>QR Code Generated &amp; Print</title>
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.qrcode-0.7.0.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			var options = {
				// render method: `'canvas'`, `'image'` or `'div'`
				render: 'image',
				fill: '#000',
				size: <?php echo $size ?>,
				text: '<?php echo $link ?>',
			};
			$(".QRimage").qrcode(options);
		})
		function printpage(){
			var printButton = document.getElementById("btnprint");
			printButton.style.visibility = 'hidden';
			window.print();
			printButton.style.visibility = 'visible';
		}
	</script>
<style style="text/css">
/* reset css */
html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,address,cite,code,del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,figcaption,figure,footer,header,hgroup,menu,nav,section,summary,time,mark,audio,video {margin: 0;padding: 0;border: 0;outline: 0;font-size: 100%;vertical-align: baseline;background: transparent;}
body {line-height: 1;}
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {display: block;}
nav ul {list-style: none;}
blockquote,q {quotes: none;}
blockquote:before,blockquote:after,q:before,q:after {content: '';content: none;}
a {margin: 0;padding: 0;font-size: 100%;vertical-align: baseline;background: transparent;}
*:focus {outline: 0;}
/* end of reset*/
@font-face {
  font-family: 'myriad_prolight';
  src: url('fonts/myriadpro-light-webfont.eot');
  src: url('fonts/myriadpro-light-webfont.eot?#iefix') format('embedded-opentype'), url('fonts/myriadpro-light-webfont.woff') format('woff'), url('fonts/myriadpro-light-webfont.ttf') format('truetype'), url('fonts/myriadpro-light-webfont.svg#myriad_prolight') format('svg');
  font-weight: normal;
  font-style: normal;
}
#wrap {width:100%;max-width:630px; height:auto; margin-left:auto; margin-right:auto;padding:10px;}
.QRFrame {font-family:"myriad_prolight";width: 200px;height: 100%;border: 2px solid #000000;text-align: center;position:relative;float:left;margin-right:5px;margin-bottom:5px;overflow:hidden;padding-bottom:0.5em;padding-top: 0.5em;}
.QRimage {margin-left:auto;margin-right:auto;}
.qrframelogo {width:80px;height:30px;background-image:url(images/qrlogo9.png);background-position:center;background-repeat:no-repeat;margin-left:auto;margin-right:auto;}
p.title{width: 80%;margin: 0 auto;padding: 0px 5px 13px 5px;font-size:1.5em;line-height: 1em;font-weight:bold;} 
p.shortlink {margin:0;padding:0.5em 0;font-size:14px;font-weight:bold;}
.clear{clear:both;}
#btnprint {border: medium none;font-weight: bold;height: 30px;margin-top: 20px;width: 70px;}
</style>
</head>

<body>
<div id="wrap">
  <!--
	<div class="QRFrame">
		  <p class="title"><?php //echo $firstline1 ?></p>
		  <div class="QRimage"></div>
		  <p class="shortlink"><?php //echo $shortlink ?></p>
		  <div class="qrframelogo"></div>  
		</div>	-->
	<?php
	for($i=0; $i < 9; $i++){
	?>
		<div class="QRFrame">
		  <p class="title"><?php echo $firstline1 ?></p>
		  <div class="QRimage"></div>
		  <p class="shortlink"><?php echo $shortlink ?></p>
		  <img src="images/qrlogo9.png" width="80" height="30" style="margin-left:auto;margin-right:auto;" >
		</div>
	<?php
	}
	?>
	<div class="clear"></div>
	<input type="button" onclick="javascript:printpage();" name="btnprint" id="btnprint" value="Print">
</div>
</body>
</html>
