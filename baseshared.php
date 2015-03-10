<!DOCTYPE html>
<html> 
<head>
	<title>Shared Reviews</title>
    <meta name="robots" content="noindex, nofollow"/>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<style>
	#shared{ font-family: "Helvetica Neue","Helvetica","ヒラギノ角ゴ Pro W3","Hiragino Kaku Gothic Pro","メイリオ","Meiryo","ＭＳ Ｐゴシック",arial,sans-serif;font-size:15px;padding:0 10px 10px 10px;}
	#shared p{padding:0}
	
</style>
</head>
<body>

<?php

include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$placeId = $_REQUEST['id'];
$result = mysql_query("SELECT count(id) as shared FROM businessplace_$placeId WHERE source = 'fb'");
if(mysql_num_rows($result)){
	$row = mysql_fetch_object($result);
	$shared = $row->shared;
}
$result = mysql_query("SELECT count(id) as notshared FROM businessplace_$placeId WHERE source = ''");
if(mysql_num_rows($result)){
	$row = mysql_fetch_object($result);
	$notshared = $row->notshared;
}
$result = mysql_query("SELECT count(id) as totalshared FROM businessplace_$placeId WHERE 1");
if(mysql_num_rows($result)){
	$row = mysql_fetch_object($result);
	$totalshared = $row->totalshared;
}
$connect->db_disconnect();
?>
<div id="shared">
<p>Tabluu’s “selfie reviews” are collected via the merchant’s website, invitation emails or via “on location” feedback channels such as QR codes/web link labels, survey and photo booth.</p>
<p>Only reviews that are shared on Facebook are displayed on Tabluu pages.
Typically, a merchant will only allow a reviewer to share their review on Facebook if they have provided an average rating score of 3 and above.</p>
<p>Hence, reviews shown on Tabluu may also be considered “testimonials”.</p>
<p>You may use the below statistics as additional indicators of the merchant’s popularity with their customers.</p>
Shared on Facebook = <?=$shared ?><br/>
Not shared on Facebook = <?=$notshared ?><br/>
Total reviews collected =<?=$totalshared ?><br/>
<p>Percentage of reviews that are shared on Facebook = <?php echo round(($shared/$totalshared) * 100,1)  ?>%</p>
<!--<p>Note: A high percentage of above 50% may indicate that the merchant is highly popular with their customers.
Conversely, a low percentage of below 10% may indicate that this merchant is in fact unpopular with most of their customers although some good reviews are collected along the way.</p>-->
<div>
</body>
</html>