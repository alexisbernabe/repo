<?php
session_start();
include_once('class/class.cookie.php');
$cookie = new cookie();
if(!$cookie->validateAuthCookie()){
	header("Location: login.html");
	die;
}else{
    $ur_session = rand(0, 15);
	if(!isset($_SESSION['session']))
		$_SESSION['session']=$ur_session;
}
?>
<!DOCTYPE html>
<html> 
<head>
	<title>Dashboard Panel</title>
    <meta name="robots" content="index, follow"/>
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
	<link type="text/css" rel="stylesheet" href="css/dialog.css" type="text/css">
	<style>
	 #profile #map-page, #map-canvas { width: 500px; height: 400px; padding: 0; border:1px solid red;}
	</style>
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.mobile-1.4.2.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
	<script>

	$(document).on('pageinit','#map-page', function () {
	
var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation 
alert(defaultLatLng)
		drawMap(defaultLatLng);
		function drawMap(latlng) {
			var myOptions = {
				zoom: 10,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
			// Add an overlay to the map of current lat/lng
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				title: "Greetings!"
			});
		}
	})	
	</script>
</head>
<body>
<div data-role="page" id="map-page" data-url="map-page">
    <div data-role="header" data-theme="a">
    <h1>Maps</h1>
    </div>
    <div role="main" class="ui-content" id="map-canvas">
        <!-- map loads here... -->
    </div>
</div>		
</body>
</html>