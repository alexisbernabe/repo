<?php
if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler"); else ob_start();//page compressed
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$path = $connect->path;
$placeId = $_REQUEST['id'];
$sql = "SELECT p.profilePlaceId, p.businessName, p.category, p.longitude, p.latitude, p.address, p.city, p.country, p.zip, p.contactNo, p.facebookURL, p.websiteURL, p.showmap FROM businessProfile AS p WHERE p.profilePlaceId =  $placeId
LIMIT 1";
$result = mysql_query($sql);
$row = mysql_fetch_object($result);

?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
<?php 
if($row->showmap){	
	if($row->longitude != 0 && $row->latitude != 0){
		echo '<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>';
		echo '<script type="text/javascript" src="js/map.js"></script>';
	}
}
?>
</head>

<body>
<?php
if($row->showmap){	
	if($row->longitude != 0 && $row->latitude != 0)
		echo '<div id="map-canvas" style="width:500px;height:400px;margin:0 auto;" class="clear map-container"></div>';
}?>
<input type="hidden" value="<?php echo $row->businessName?>" name="bname" id="bname" />
<input type="hidden" value="<?php echo $row->longitude?>" name="blng" id="blng" />
<input type="hidden" value="<?php echo $row->latitude?>" name="blat" id="blat" />
<input type="hidden" value="<?php echo $placeId?>" name="placeid" id="placeid" />
<input type="hidden" value="<?php echo $row->address.' '.$row->city.', '.$row->zip.' '.$row->country?>" name="baddress" id="baddress" />
</body>
</html>
