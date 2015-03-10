<?php
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$imgrotate = new fucn();
$placeId = $_REQUEST['placeId'];
$sql = "SELECT c.item2Rate,c.selectedItems,c.reviewPost,c.logo FROM businessCustom AS c WHERE c.customPlaceId = $placeId LIMIT 1";
$result1 = mysql_query($sql) or die(mysql_error());
$row = mysql_fetch_object($result1);
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
$offset = $_REQUEST['offset'];
$limit = $_REQUEST['limit'];
$hadTable = $connect->tableIsExist('businessplace_'.$placeId);
if($hadTable){
	$timezone = mysql_fetch_object(mysql_query("SELECT u.timezone FROM businessList as l LEFT JOIN businessUserGroup AS u ON u.gId = l.userGroupId WHERE l.id = $placeId LIMIT 1"));
	$timezone = $timezone->timezone;
	$resultFeature =  mysql_query("SELECT * FROM businessplace_$placeId WHERE feature = 1 AND source = 'fb' ORDER BY date DESC LIMIT $offset,$limit") or die(mysql_error());
	if( mysql_num_rows($resultFeature)){
		while($rowrate = mysql_fetch_object($resultFeature)){
			include('reviewshtml.php');
		}
	}//else
	//echo 0;
}	
?>
