<?php
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$path = $connect->path;
$placeId = $_REQUEST['placeId'];
$result = mysql_query("SELECT id,placeId,path,title,description,name FROM businessImages AS ps WHERE placeId =$placeId AND name <> 'fbImg' ORDER BY id ASC LIMIT 10") or die(mysql_error());
$imagesArray = array();
if(mysql_num_rows($result) < 1){
	$result = mysql_query("SELECT ps.fbImg, ps.webImg, ps.webImg2, ps.webImg3, ps.webImg4, ps.webImg5, ps.webImg6, ps.webImg7, ps.webImg8 FROM businessPhotos AS ps WHERE ps.photoPlaceId = $placeId") or die(mysql_error());
	$row2 = mysql_fetch_object($result);
	mysql_query("INSERT INTO businessImages (placeId,path,name) VALUES($placeId,'".$row2->fbImg."','fbImg'),($placeId,'".$row2->webImg."','webImg'),($placeId,'".$row2->webImg2."','webImg2'),($placeId,'".$row2->webImg3."','webImg3'),($placeId,'".$row2->webImg4."','webImg4'),($placeId,'".$row2->webImg5."','webImg5'),($placeId,'".$row2->webImg6."','webImg6'),($placeId,'".$row2->webImg7."','webImg7'),($placeId,'".$row2->webImg8."','webImg8')") or die(mysql_error());
	$result = mysql_query("SELECT id,placeId,path,title,description,name FROM businessImages AS ps WHERE placeId =$placeId AND name <> 'fbImg' ORDER BY id ASC LIMIT 10") or die(mysql_error());
}	
$k=0;
while($row3 = mysql_fetch_object($result)){
	$imagesArray[$k]['id'] = $row3->id;
	$imagesArray[$k]['path'] = $row3->path;
	$imagesArray[$k]['title'] = $row3->title;
	$imagesArray[$k]['desc'] = $row3->description;
	$imagesArray[$k++]['name'] = $row3->name;
}

for($j=0; $j< count($imagesArray); $j++){
	$src = (file_exists($imagesArray[$j]['path']) ? $path.$imagesArray[$j]['path'] : $path.$imagesArray[$j]['path']);
	if($imagesArray[$j]['name'] != 'fbImg' && !empty($imagesArray[$j]['path'])){ 
	?>
	<div class="sysPinItemContainer pin showImages" >
	<div class="Pinner">
		<p class="PinnerName" style="font-weight:bold;"><?php echo $imagesArray[$j]['title'] ?></p>
	</div>

	<div class="PinImg">
		<img class="pinImage" src="<?php echo $src; ?>" alt="<?php echo $imagesArray[$j]['title'] ?>" />
	</div>
	<p class="RateCount" style="padding-top:5px;"><?php echo $imagesArray[$j]['desc']; ?></p>
	</div>
	<div class="cl"></div>
	<?php
	}	
}
?>
	
