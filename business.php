<?php
if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler"); else ob_start();//page compressed
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$nice = $_REQUEST['nicename'];
$sql = "SELECT p.profilePlaceId, p.businessName, p.category, p.longitude, p.latitude, p.address, p.city, p.country, p.zip, p.contactNo, p.facebookURL, p.websiteURL, p.showmap, l.subscribe, u.productId,u.state, d.description, o.opening, ps.webImg, ps.webImg2, ps.webImg3, ps.webImg4, ps.webImg5, ps.webImg6, ps.webImg7, ps.webImg8,c.item2Rate,c.selectedItems,c.reviewPost FROM businessProfile AS p
LEFT JOIN businessList AS l ON l.id = p.profilePlaceId
LEFT JOIN businessDescription AS d ON d.descPlaceId = l.id
LEFT JOIN businessOpeningHours AS o ON o.openingPlaceId = p.profilePlaceId
LEFT JOIN businessPhotos AS ps ON ps.photoPlaceId = p.profilePlaceId
LEFT JOIN businessUserGroup AS u ON u.gId = l.userGroupId
LEFT JOIN businessCustom AS c ON c.customPlaceId = ps.photoPlaceId
WHERE p.nicename =  '$nice'
LIMIT 1";
$result = mysql_query($sql);
$row = mysql_fetch_object($result);

$photoDomain = '';//'http://www.tabluu.com/';

if(!$row->state){
	//header("HTTP/1.0 404 Not Found");
	header('Location: http://www.tabluu.com');
	exit;
}
$topostFB = json_decode($row->reviewPost);

$arrayItem2Rate= json_decode($row->item2Rate);
$arraySelectedItem = json_decode($row->selectedItems);
$ratingTextTemp = array();
if($arrayItem2Rate){
	if(count($arrayItem2Rate->rows)){
		for($i=0;$i<count($arrayItem2Rate->rows);$i++){
			for($j=0;$j<count($arraySelectedItem->rows);$j++){		
				$name = explode('_',$arrayItem2Rate->rows[$i]->data);
				if($arraySelectedItem->rows[$j]->data == $name[1]){
				   $ratingTextTemp[] = $name[1];
				}
			}
		}
	}else{
		for($i=0;$i<count($arrayItem2Rate);$i++){
			for($j=0;$j<count($arraySelectedItem);$j++){		
				$name = explode('_',$arrayItem2Rate[$i]);
				if($arraySelectedItem[$j] == $name[1]){
				   $ratingTextTemp[] = $name[1];
				}
			}
		}	
	}
}
$offset = (isset($_REQUEST['offset']) ? $_REQUEST['offset'] : 0);
$limit = 5;
$totalRate = count($ratingTextTemp); 
if($totalRate == 1)
	$fields = "rated1, aveRate, comment, userName , source,userId,photo_url";
else if($totalRate == 2)
	$fields = "rated1, rated2, aveRate, comment, userName , source, userId ,photo_url";
else if($totalRate == 3)
	$fields = "rated1, rated2, rated3, aveRate, comment, userName , source, userId ,photo_url";
else if($totalRate == 4)
	$fields = "rated1, rated2, rated3, rated4, aveRate, comment, userName , source, userId ,photo_url";
else if($totalRate == 5)
	$fields = "rated1, rated2, rated3, rated4, rated5, aveRate, comment, userName , source, userId ,photo_url";
else if($totalRate == 6)
	$fields = "rated1, rated2, rated3, rated4, rated5, rated6, aveRate, comment, userName , source, userId ,photo_url";
else if($totalRate == 7)
	$fields = "rated1, rated2, rated3, rated4, rated5, rated6, rated7, aveRate, comment, userName , source, userId ,photo_url";
$placeId = $row->profilePlaceId;
$hadTable = mysql_num_rows(mysql_query("SHOW TABLES LIKE 'businessplace_$placeId'"));
//$rateLimit[$topostFB->percent] >= $rowrate->aveRate;
$rateLimit = array(1.0,1.25,1.5,1.75,2.0,2.25,2.5,2.75,3.0,3.25,3.5,3.75,4.0,4.25,4.5,4.75);
$avgLimit = 3;
if($topostFB)
	$avgLimit = $rateLimit[$topostFB->percent];
if($hadTable){
	$ratesql = "SELECT SQL_CALC_FOUND_ROWS $fields FROM businessplace_$placeId WHERE aveRate >= $avgLimit ORDER BY id DESC LIMIT $offset,$limit";
	$rateResult =  mysql_query($ratesql);
	$total_records = mysql_result(mysql_query("SELECT FOUND_ROWS()"),0,0);
}
function htmldecode($str){
	$str = str_replace("|one","&amp;",$str);
	$str = str_replace("|two","&lt;",$str);
	$str = str_replace("|three","&gt;",$str);
	$str = str_replace("|four","&quot;",$str);
	return str_replace("|five","#",$str);
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<?php
	if($row->state == 'active' && $row->subscribe > 0)
		echo '<meta name="robots" content="index, follow" />';
	else 
		echo '<meta name="robots" content="noindex, nofollow" />';
echo '<title>'. $row->businessName .', '.$row->address.' '.$row->city.', '.$row->zip.' '.$row->country. ' @ Tabluu</title>';		
?>

<link rel="stylesheet" type="text/css" href="css/BusinessWebpage.css">
<link rel="stylesheet" type="text/css" href="css/elastislide.css" />
<link rel="stylesheet" type="text/css" href="css/style_elastis.css" />
<link rel="stylesheet" type="text/css" href="css/magnific-popup.css"/>
<noscript>
	<style>
		.es-carousel ul{
			display:block
		};
	</style>
</noscript>
<script id="img-wrapper-tmpl" type="text/x-jquery-tmpl">	
	<div class="rg-image-wrapper">
		{{if itemsCount > 1}}
			<div class="rg-image-nav">
				<a href="#" class="rg-image-nav-prev">Previous Image</a>
				<a href="#" class="rg-image-nav-next">Next Image</a>
			</div>
		{{/if}}
		<div class="rg-image"></div>
		<div class="rg-loading"></div>
	</div>
</script>
<script type="text/javascript">var switchTo5x=true;</script>
<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
<script type="text/javascript" src="http://s.sharethis.com/loader.js"></script>
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script type="text/javascript" src="js/photogallery/jquery.tmpl.min.js"></script>
<script type="text/javascript" src="js/photogallery/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/photogallery/jquery.elastislide.js"></script>
<script type="text/javascript" src="js/photogallery/gallery.js"></script>
<script type="text/javascript" src="js/jquery.magnific-popup.js"></script>
<?php 
if($row->showmap){	
	if($row->longitude != 0 && $row->latitude != 0){
		echo '<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>';
		echo '<script type="text/javascript" src="js/map.js"></script>';
	}
}
?>
<script type="text/javascript" src="js/default.js"></script>
</head>

<body>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=682746285089153";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<div class="wrapper">
<header>

<a href="/"><img src="include/images/logo.png" alt="Tabluu" class="logo"/></a>
<div id="divmenu" style="<?php 
	if(!trim($row->websiteURL) && !trim($row->facebookURL)){ 
		echo 'width:95px;';
	}else{ 
		if(!trim($row->facebookURL) && trim($row->websiteURL)) 
			echo 'width:95px;';
	}?>">
	<div id="submenu">
		<ul>
		  <?php
			if($row->facebookURL)
				echo '<li><a href="'. (strstr($row->facebookURL,'http') ? $row->facebookURL : 'http://'.$row->facebookURL) .'"  target="_blank">Facebook Page</a></li>';
			if($row->websiteURL)
				echo '<li><a href="'.(strstr($row->websiteURL,'http') ? $row->websiteURL : 'http://'.$row->websiteURL) .'"  target="_blank">Web Site</a></li>';
			echo '<li><a href="/">Tabluu.com</a></li>';
			?>
		</ul>
	</div>
	<span class="menu"></span>
</div>

</header>
<div class="main-container-outer">
<div class="main-container">
<div class="banner-container-outer">
<h1><?php echo $row->businessName?></h1>
<h2><?php echo $row->address.' '.$row->city.', '.$row->zip.' '.$row->country?></h2>

<div class="fblike">
<span><?php echo $row->contactNo ?></span>
<!--<span>
<iframe src="http://www.facebook.com/plugins/like.php?app_id=682746285089153&amp;href=http://www.tabluu.com/<?php //echo $nice ?>.html&amp;send=false&amp;layout=button_count&amp;width=80&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:21px; position:relative; left:6px; top:4px;" ></iframe>
</span>-->
</div>
<div style="clear:both;"></div>
	<div id="rg-gallery" class="rg-gallery">
			<div class="rg-thumbs">
				<!-- Elastislide Carousel Thumbnail Viewer -->
				<div class="es-carousel-wrapper">
					<div class="es-nav">
						<span class="es-nav-prev">Previous</span>
						<span class="es-nav-next">Next</span>
					</div>
					<div class="es-carousel">
						<ul>
							<?php if($row->webImg != ''){ 
								if(file_exists($row->webImg))
									$webimg = $row->webImg;
								else
									$webimg = 'app/'.$row->webImg;
							?>
							<li><a href="#"><img src="<?php echo $webimg?>" data-large="<?php echo $webimg?>" alt="<?php echo $webimg?>" data-description="" /></a></li>
							<?php } ?>
							<?php if($row->webImg2 != ''){ 
								if(file_exists($row->webImg2))
									$webimg2 = $row->webImg2;
								else
									$webimg2 = 'app/'.$row->webImg2;
							?>
							<li><a href="#"><img src="<?php echo $webimg2?>" data-large="<?php echo $webimg2?>" alt="<?php echo $webimg2?>" data-description="" /></a></li>
							<?php } ?>
							<?php if($row->webImg3 != ''){ 
								if(file_exists($row->webImg3))
									$webimg3 = $row->webImg3;
								else
									$webimg3 = 'app/'.$row->webImg3;
							
							?>
							<li><a href="#"><img src="<?php echo $webimg3?>" data-large="<?php echo $webimg3?>" alt="<?php echo $webimg3?>" data-description="" /></a></li>
							<?php } ?>		
							<?php if($row->webImg4 != ''){ 
								if(file_exists($row->webImg4))
									$webimg4 = $row->webImg4;
								else
									$webimg4 = 'app/'.$row->webImg4;
							?>
							
							<li><a href="#"><img src="<?php echo $webimg4?>" data-large="<?php echo $webimg4?>" alt="<?php echo $webimg4?>" data-description="" /></a></li>
							<?php } ?>	
							<?php if($row->webImg5 != ''){ 
								if(file_exists($row->webImg5))
									$webimg5 = $row->webImg5;
								else
									$webimg5 = 'app/'.$row->webImg5;
							?>
							<li><a href="#"><img src="<?php echo $webimg5?>" data-large="<?php echo $webimg5?>" alt="<?php echo $webimg5?>" data-description="" /></a></li>
							<?php } ?>		
							<?php if($row->webImg6 != ''){ 
								if(file_exists($row->webImg6))
									$webimg6 = $row->webImg6;
								else
									$webimg6 = 'app/'.$row->webImg6;
							?>
							<li><a href="#"><img src="<?php echo $webimg6?>" data-large="<?php echo $webimg6?>" alt="<?php echo $webimg6?>" data-description="" /></a></li>
							<?php } ?>
							<?php if($row->webImg7 != ''){ 
								if(file_exists($row->webImg7))
									$webimg7 = $row->webImg7;
								else
									$webimg7 = 'app/'.$row->webImg7;
							?>
							<li><a href="#"><img src="<?php echo $webimg7?>" data-large="<?php echo $webimg7?>" alt="<?php echo $webimg7?>" data-description="" /></a></li>
							<?php } ?>
							<?php if($row->webImg8 != ''){ 
								if(file_exists($row->webImg8))
									$webimg8 = $row->webImg8;
								else
									$webimg8 = 'app/'.$row->webImg8;
							?>
							<li><a href="#"><img src="<?php echo $webimg8?>" data-large="<?php echo $webimg8?>" alt="<?php echo $webimg8?>" data-description="" /></a></li>
							<?php } ?>							
						</ul>
					</div>
				</div>
				<!-- End Elastislide Carousel Thumbnail Viewer -->
			</div><!-- rg-thumbs -->
		</div><!-- rg-gallery -->	
</div>
<?php
if(trim($row->description) != '')
	echo '<div class="timing-container"><p> '. nl2br(htmldecode($row->description)) . '</p></div>';
if(trim($row->opening) != '')
	echo '<div class="timing-container"><p>'. nl2br(htmldecode($row->opening)) .'</p></div>';
?>
<?php
if($hadTable && $total_records){
?>
<div class="comment-container">
<ul>
	<?php 
	while($rowrate = mysql_fetch_object($rateResult)){
	//if($rateLimit[$topostFB->percent] >= $rowrate->aveRate){
	?>
		<li>
			<div class="comment-left">
			<div class="comment-avatar">
				<?php
				//$rowrate->userName
					if($rowrate->userId){
						echo "<img src=\"https://graph.facebook.com/$rowrate->userId/picture?type=large\" class=\"iconpro\" alt=\"avatar\" />";
					}else
						echo "<img src=\"include/images/comment-avatar.jpg\" alt=\"avatar\" />";
				?>
			</div>
			<?php
				if($rowrate->userId){
					if(strlen($rowrate->userName) > 15 )
						$str = mb_convert_case(substr($rowrate->userName,0,15).'...', MB_CASE_TITLE, "UTF-8");
					else
						$str = mb_convert_case($rowrate->userName,MB_CASE_TITLE, "UTF-8");
		
				echo '<div class="name"><p><a href="https://www.facebook.com/'.$rowrate->userId.'" target="_blank" style="text-decoration:underline">'. $str .'</a></p></div>';
				}
			?>
			</div>
			<div class="comment-right">
			<div class="wrap-rate">
				<?php
				$ave = explode(".",$rowrate->aveRate);
				$style='';
				if($rowrate->aveRate >= 1 && $rowrate->aveRate < 2){
					if(count($ave) > 1){
						$dec = "0.".$ave[1];					
						$width = 30 + ($dec * 30); 
						$style = 'width:'.$width.'px;';	
					}else
						$style = "width:30px;";	
				}
				if($rowrate->aveRate >= 2 && $rowrate->aveRate < 3){
					if(count($ave) > 1){
						$dec = "0.".$ave[1];					
						$width = 60 + ($dec * 30); 
						$style = 'width:'.$width.'px;';	
					}else
						$style = "width:60px;";	
				}
				if($rowrate->aveRate >= 3 && $rowrate->aveRate < 4){
					if(count($ave) > 1){
						$dec = "0.".$ave[1];					
						$width = 90 + ($dec * 30); 
						$style = 'width:'.$width.'px;';	
					}else
						$style = "width:90px;";	
				}
				if($rowrate->aveRate >= 4 && $rowrate->aveRate < 5){
					if(count($ave) > 1){
						$dec = "0.".$ave[1];					
						$width = 120 + ($dec * 30); 
						$style = 'width:'.$width.'px;';	
					}else
						$style = "width:120px;";	
				}				
					echo "<span class=\"stargrey\"><span class=\"staryellow\" style=\"$style\"></span></span>";
				if($rowrate->photo_url != '' && strpos($rowrate->photo_url, 'shared')){	
					if(file_exists($rowrate->photo_url))
						$sharedphoto = $rowrate->photo_url;
					else if(file_exists('app/'.$rowrate->photo_url))
						$sharedphoto = 'app/'.$rowrate->photo_url;
					else
						$sharedphoto = $rowrate->photo_url;
				?>
				<a class="popup-link" href="<?php echo $sharedphoto ?>"><img src="images/viewIcon.png" alt="view image" class="previewIcon" /></a>
				<?php }?>
			</div> 
			<div class="ratings">
			<?php
				if(count($ratingTextTemp) == 1){
					$rating1 = $rowrate->rated1;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b></span>";			
				}else if(count($ratingTextTemp) == 2){
					$rating1 = $rowrate->rated1;
					$rating2 = $rowrate->rated2;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b>,</span>";
					echo "<span>$ratingTextTemp[1]: <b>$rating2/5</b></span>";				
				}else if(count($ratingTextTemp) == 3){
					$rating1 = $rowrate->rated1;
					$rating2 = $rowrate->rated2;
					$rating3 = $rowrate->rated3;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b>,</span>";
					echo "<span>$ratingTextTemp[1]: <b>$rating2/5</b>,</span>";
					echo "<span>$ratingTextTemp[2]: <b>$rating3/5</b></span>";		
				}else if(count($ratingTextTemp) == 4){
					$rating1 = $rowrate->rated1;
					$rating2 = $rowrate->rated2;
					$rating3 = $rowrate->rated3;
					$rating4 = $rowrate->rated4;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b>,</span>";
					echo "<span>$ratingTextTemp[1]: <b>$rating2/5</b>,</span>";
					echo "<span>$ratingTextTemp[2]: <b>$rating3/5</b>,</span>";
					echo "<span>$ratingTextTemp[3]: <b>$rating4/5</b></span>";						
				}else if(count($ratingTextTemp) == 5){
					$rating1 = $rowrate->rated1;
					$rating2 = $rowrate->rated2;
					$rating3 = $rowrate->rated3;
					$rating4 = $rowrate->rated4;
					$rating5 = $rowrate->rated5;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b>,</span>";
					echo "<span>$ratingTextTemp[1]: <b>$rating2/5</b>,</span>";
					echo "<span>$ratingTextTemp[2]: <b>$rating3/5</b>,</span>";
					echo "<span>$ratingTextTemp[3]: <b>$rating4/5</b>,</span>";	
					echo "<span>$ratingTextTemp[4]: <b>$rating5/5</b></span>";					
				}else if(count($ratingTextTemp) == 6){
					$rating1 = $rowrate->rated1;
					$rating2 = $rowrate->rated2;
					$rating3 = $rowrate->rated3;
					$rating4 = $rowrate->rated4;
					$rating5 = $rowrate->rated5;
					$rating6 = $rowrate->rated6;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b>,</span>";
					echo "<span>$ratingTextTemp[1]: <b>$rating2/5</b>,</span>";
					echo "<span>$ratingTextTemp[2]: <b>$rating3/5</b>,</span>";
					echo "<span>$ratingTextTemp[3]: <b>$rating4/5</b>,</span>";	
					echo "<span>$ratingTextTemp[4]: <b>$rating5/5</b>,</span>";
					echo "<span>$ratingTextTemp[5]: <b>$rating6/5</b></span>";		
				}else if(count($ratingTextTemp) == 7){
					$rating1 = $rowrate->rated1;
					$rating2 = $rowrate->rated2;
					$rating3 = $rowrate->rated3;
					$rating4 = $rowrate->rated4;
					$rating5 = $rowrate->rated5;
					$rating6 = $rowrate->rated6;
					$rating7 = $rowrate->rated7;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b>,</span>";
					echo "<span>$ratingTextTemp[1]: <b>$rating2/5</b>,</span>";
					echo "<span>$ratingTextTemp[2]: <b>$rating3/5</b>,</span>";
					echo "<span>$ratingTextTemp[3]: <b>$rating4/5</b>,</span>";	
					echo "<span>$ratingTextTemp[4]: <b>$rating5/5</b>,</span>";
					echo "<span>$ratingTextTemp[5]: <b>$rating6/5</b>,</span>";	
					echo "<span>$ratingTextTemp[6]: <b>$rating7/5</b></span>";
				}
			?>
			</div>
			<?php 
				if(trim($rowrate->comment) != '')
					echo "<div class=\"comment\"><p>$rowrate->comment</p></div>";
			?>
			</div>
		</li>
	<?php 
	}
	//}
	$connect->db_disconnect();
	?>
</ul>
</div>
<div class="control-but-container">
	<form id="form1" method="post" action="<?php echo $nice.'.html' ?>">
	<?php
$page = (int) (!isset($_REQUEST["page"]) ? 1 : $_REQUEST["page"]);	
	//if($page == 1){
		echo "<span id=\"firtsubmit\" class=\"full next-submit\">Next Reviews >></span>";
		echo "<span id=\"lastsubmit\" class=\"full prv-submit none\"><< Previous Reviews</span>";
	//}else{
		echo "<span id=\"prv-submit\" class=\"half prv-submit none\"><< Previous Reviews</span>";
		echo "<span id=\"next-submit\" class=\"half next-submit none\">Next Reviews >></span>";	
	//}
	?>
	<div style="clear:both;"></div>
	<input type="hidden" value="<?php echo ceil($total_records/5) ?>" id="total-page" name="total-page" />
	<input type="hidden" value="<?php echo $offset ?>" id="offset" name="offset" />
	<input type="hidden" value="<?php echo $page ?>" id="page" name="page" />
	</form>
</div>
<?php
}else
	echo '<div style="clear:both;padding:7px 0;"></div>';
if($row->showmap){	
	if($row->longitude != 0 && $row->latitude != 0)
		echo '<div id="map-canvas" class="clear map-container"></div>';
}
?>
<div class="control-but-container">
<?php
if($row->websiteURL != ''){
	if(strstr($row->websiteURL,"http"))
		echo '<a href="'.$row->websiteURL.'" target="_blank" class="full">Web Site</a>';
	else
		echo '<a href="http://'.$row->websiteURL.'" target="_blank" class="full">Web Site</a>';
}if($row->facebookURL != ''){
	if(strstr($row->facebookURL,"http"))
		echo '<a href="'.$row->facebookURL.'" target="_blank" class="full">Facebook Page</a>';
	else
		echo '<a href="http://'.$row->facebookURL.'" target="_blank" class="full">Facebook Page</a>';	
}	
?>
</div>

</div>

</div>
<footer>
	<a href="privacy.html">Privacy Policy</a>
	<a href="terms.html">Terms of Use</a>
	<a href="contact.html">Support</a>
	<a href="contact.html">Contact</a>
</footer>
</div>
<input type="hidden" value="<?php echo $row->businessName?>" name="bname" id="bname" />
<input type="hidden" value="<?php echo $row->longitude?>" name="blng" id="blng" />
<input type="hidden" value="<?php echo $row->latitude?>" name="blat" id="blat" />
<input type="hidden" value="<?php echo $placeId?>" name="placeid" id="placeid" />
<input type="hidden" value="<?php echo $row->address.' '.$row->city.', '.$row->zip.' '.$row->country?>" name="baddress" id="baddress" />

<script type="text/javascript">stLight.options({publisher: "0b14a769-3571-434a-809a-f521be3f41b6", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>
<script>
var options={ "publisher": "0b14a769-3571-434a-809a-f521be3f41b6", "position": "left", "ad": { "visible": false, "openDelay": 5, "closeDelay": 0}, "chicklets": { "items": ["facebook", "linkedin", "twitter", "googleplus", "pinterest"]}};
var st_hover_widget = new sharethis.widgets.hoverbuttons(options);
</script>
</body>
</html>
