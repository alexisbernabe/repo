<?php
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$imgrotate = new fucn();
$placeId = $_REQUEST['placeId'];
switch($_REQUEST['opt']){

	case 'review':

		$sql = "SELECT c.item2Rate,c.selectedItems,c.reviewPost,c.logo FROM businessCustom AS c WHERE c.customPlaceId = $placeId LIMIT 1";
		$result1 = mysql_query($sql) or die(mysql_error());
		$row = mysql_fetch_object($result1);

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
		$path = $connect->path;
		$topostFB = json_decode($row->reviewPost);
		$questionDefault = array('How would you rate our staff based on how welcoming and friendly they were towards you?_Service Friendliness','Do you feel that you were provided service in a timely manner?_Service Timeliness','How would you rate the attentiveness of our service?_Service Attentiveness','How would you rate our overall service?_Overall Service','Was this experience worth the amount you paid?_Value for Money','Please rate our location._Location','Please rate our facilities._Facilities','How comfortable was your stay?_Comfort','How would you rate our property in terms of cleanliness?_Cleanliness','How would you rate the overall quality of your meal?_Quality of Meal','How would you rate the overall taste of your meal?_Taste of Meal','Do you feel that there were enough options for you to choose?_Variety','How likely are you to recommend us to your friends and loved ones?_Likelihood to Recommend','How likely are you to visit us again?_Likelihood to Visit Again');
		$arrayItem2Rate= json_decode($row->item2Rate);
		$arraySelectedItem = json_decode($row->selectedItems);
		$ratingTextTemp = array();
			if($arrayItem2Rate){
				if(is_object($arrayItem2Rate)){
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
					for($i=0;$i<count($questionDefault);$i++){
						for($j=0;$j<count($arraySelectedItem);$j++){		
							$name = explode('_',$questionDefault[$i]);
							if($arraySelectedItem[$j] == $name[1]){
								array_push($ratingTextTemp,$name[1]);
							}
						}
					}
				}
			}else{
				for($i=0;$i<count($questionDefault);$i++){
					for($j=0;$j<count($arraySelectedItem);$j++){		
						$name = explode('_',$questionDefault[$i]);
						if($arraySelectedItem[$j] == $name[1]){
							array_push($ratingTextTemp,$name[1]);
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

		$hadTable = $connect->tableIsExist('businessplace_'.$placeId);
		//$rateLimit[$topostFB->percent] >= $rowrate->aveRate;
		$rateLimit = array(1.0,1.25,1.5,1.75,2.0,2.25,2.5,2.75,3.0,3.25,3.5,3.75,4.0,4.25,4.5,4.75);
		$avgLimit = 3;
			$b=1;$j=0;
			for($j=0; $j< count($imagesArray); $j++){
				$src = (file_exists($imagesArray[$j]['path']) ? $path.$imagesArray[$j]['path'] : $path.$imagesArray[$j]['path']);
				if($imagesArray[$j]['name'] != 'fbImg' && !empty($imagesArray[$j]['path'])){
					include('producImagesHtml.php');
					if($b%4 == 0)
						break;
					$b++;
				}
			}
			$timezone =='';
			if($hadTable){
				$timezone = mysql_fetch_object(mysql_query("SELECT u.timezone FROM businessList as l LEFT JOIN businessUserGroup AS u ON u.gId = l.userGroupId WHERE l.id = $placeId LIMIT 1"));
				$timezone = $timezone->timezone;
				$addhidefield = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'hideimg'") or die(mysql_error());
				if(mysql_num_rows($addhidefield) < 1)
					mysql_query("ALTER TABLE `businessplace_$placeId` ADD `hideimg` TINYINT NOT NULL") or die(mysql_error());
				$addfeafield = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'feature'") or die(mysql_error());
				if(mysql_num_rows($addfeafield) < 1) 
					mysql_query("ALTER TABLE `businessplace_$placeId` ADD `feature` TINYINT NOT NULL") or die(mysql_error());
				$resultFeature =  mysql_query("SELECT * FROM businessplace_$placeId WHERE feature = 1 AND source = 'fb' ORDER BY date DESC LIMIT 4") or die(mysql_error());
				if(mysql_num_rows($resultFeature))
					$result = $resultFeature;
				else{
					$rateResult =  mysql_query("SELECT * FROM businessplace_$placeId WHERE feature = 0 AND source = 'fb' ORDER BY date DESC LIMIT 4");
					//$rateResult = mysql_query("SELECT * FROM (SELECT * FROM  `businessplace_1353` WHERE  `source` =  'fb' ORDER BY id DESC) AS output_name GROUP BY  `userId` ORDER BY DATE DESC");
					$result = $rateResult;
				}
				while($rowrate = mysql_fetch_object($result)){
				   include('reviewshtml.php');
			   }
			}
			if(count($imagesArray) > 4 ){
				for($j=4; $j< count($imagesArray); $j++){
					$src = (file_exists($imagesArray[$j]['path']) ? $path.$imagesArray[$j]['path'] : $path.$imagesArray[$j]['path']);
					if($imagesArray[$j]['name'] != 'fbImg' && !empty($imagesArray[$j]['path'])){
						include('producImagesHtml.php');
					}
				}	
			}
	break;
	case 'contactus':
		$sql = "SELECT p.email as pemail, u.email  FROM businessProfile AS p
		LEFT JOIN businessList AS l ON l.id = p.profilePlaceId
		LEFT JOIN businessUserGroup AS u ON u.gId = l.userGroupId
		WHERE p.profilePlaceId =  $placeId
		LIMIT 1";
		$result1 = mysql_query($sql) or die(mysql_error());
		$row = mysql_fetch_object($result1);
		echo ($row->pemail ? $row->pemail : $row->email);
	break;
}
	?>
