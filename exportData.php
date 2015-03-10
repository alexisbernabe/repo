<?php
include_once('class/class.main.php');
include_once('class/PHPExcel.php');
$objPHPExcel = new PHPExcel();
$user_tz = '';
if(isset($_REQUEST['groupID'])){
	$connect = new db();
	$connect->db_connect();
	$groupID = $_REQUEST['groupID'];
	$sql = "SELECT timezone FROM businessUserGroup WHERE gID =  '$groupID'";
	$result = mysql_query($sql);
	if(mysql_num_rows($result)){
		$row = mysql_fetch_object($result);
		$user_tz = $row->timezone;	
	}
}

$controller = new fucn();
//$date1 = '2013-06-05';
//$date2 = '2013-06-27';
$date1 = $_REQUEST['date1'];
$date2 = $_REQUEST['date2'];
$placeId = $_REQUEST['placeId'];

if(isset($_REQUEST['placeId'])){
	$addnewfield = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'feedsource'") or die(mysql_error());
	if(mysql_num_rows($addnewfield) < 1)
		mysql_query("ALTER TABLE `businessplace_$placeId` ADD `feedsource` VARCHAR(2) NOT NULL AFTER `source`");
	$questionDefault = array('How would you rate our staff based on how welcoming and friendly they were towards you?_Service Friendliness','Do you feel that you were provided service in a timely manner?_Service Timeliness','How would you rate the attentiveness of our service?_Service Attentiveness','How would you rate our overall service?_Overall Service','Was this experience worth the amount you paid?_Value for Money','Please rate our location._Location','Please rate our facilities._Facilities','How comfortable was your stay?_Comfort','How would you rate our property in terms of cleanliness?_Cleanliness','How would you rate the overall quality of your meal?_Quality of Meal','How would you rate the overall taste of your meal?_Taste of Meal','Do you feel that there were enough options for you to choose?_Variety','How likely are you to recommend us to your friends and loved ones?_Likelihood to Recommend','How likely are you to visit us again?_Likelihood to Visit Again');
	$custom = $controller->select('businessCustom', '*', "customPlaceId = $placeId");
	$row = mysql_fetch_object($custom);
	$ratingTextTemp = array();$arrayItem2Rate = array();
	$arrayItem2Rate= json_decode($row->item2Rate);
	$arraySelectedItem = json_decode($row->selectedItems);
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
	$totalRate = count($ratingTextTemp); 
	if($totalRate == 1)
		$fields = "rated1, aveRate, comment, userName , source, feedsource, date";
	else if($totalRate == 2)
		$fields = "rated1, rated2, aveRate, comment, userName , source, feedsource, date";
	else if($totalRate == 3)
		$fields = "rated1, rated2, rated3, aveRate, comment, userName , source, feedsource, date";
	else if($totalRate == 4)
		$fields = "rated1, rated2, rated3, rated4, aveRate, comment, userName , source, feedsource, date";
	else if($totalRate == 5)
		$fields = "rated1, rated2, rated3, rated4, rated5, aveRate, comment, userName , source, feedsource, date";
	else if($totalRate == 6)
		$fields = "rated1, rated2, rated3, rated4, rated5, rated6, aveRate, comment, userName , source, feedsource, date";
	else if($totalRate == 7)
		$fields = "rated1, rated2, rated3, rated4, rated5, rated6, rated7, aveRate, comment, userName , source, feedsource, date";
		
	$result = $controller->exportCSV($date1,$date2,$placeId,$fields);
	$fieldData = array();
	
	$ratingTextTemp = array_merge($ratingTextTemp, array('Average Rating', 'Comment', 'Name', 'Shared', 'Source', 'Date', 'Time'));

	$array_col = array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");	
	$r=0;$c=1;
	foreach( $ratingTextTemp as $val )  
		$objPHPExcel->setActiveSheetIndex(0)->setCellValue($array_col[$r++] . $c, encodequote($val));
	
    $c=3;
	while($row = mysql_fetch_object($result)){
	    $r=0;
		$fbsource = ($row->source == 'fb' ? 'Yes' : 'No');
		
		if($user_tz=='' || $user_tz=='none'){
			$newdate = explode(' ',$row->date);
		} else {
			$datetoconvert = $row->date;
			$schedule_date = new DateTime($datetoconvert, new DateTimeZone('UTC') );
			$schedule_date->setTimeZone(new DateTimeZone($user_tz));
			$datetoconvert =  $schedule_date->format('Y-m-d H:i:s');
			$newdate = explode(' ',$datetoconvert);
		}
		$feedsource = '';
		if((int)$row->feedsource == 0)	
			$feedsource = 'QR code (without selfie)';
		if((int)$row->feedsource == 1)	
			$feedsource = 'QR code (with selfie)';
		if((int)$row->feedsource == 2)	
			$feedsource = 'Photo Booth';	
		if((int)$row->feedsource == 3)	
			$feedsource = 'Checkout Counters/Anywhere';
		if((int)$row->feedsource == 4)	
			$feedsource = 'Your Selfie Here!';
		if((int)$row->feedsource == 5 || trim($row->feedsource) == '')	
			$feedsource = 'Survey';
		if((string)$row->feedsource == 'e')
			$feedsource = 'Email invitations';		
		if($totalRate == 1)
			$colrow = array($row->rated1,$row->aveRate,$row->comment,$row->userName,$fbsource,$feedsource,$newdate[0],$newdate[1].' '.$newdate[2]);
		else if($totalRate == 2)
			$colrow = array($row->rated1,$row->rated2,$row->aveRate,$row->comment,$row->userName,$fbsource,$feedsource,$newdate[0],$newdate[1].' '.$newdate[2]);
		else if($totalRate == 3)
			$colrow = array($row->rated1,$row->rated2,$row->rated3,$row->aveRate,$row->comment,$row->userName,$fbsource,$feedsource,$newdate[0],$newdate[1].' '.$newdate[2]);
		else if($totalRate == 4)
			$colrow = array($row->rated1,$row->rated2,$row->rated3,$row->rated4,$row->aveRate,$row->comment,$row->userName,$fbsource,$feedsource,$newdate[0],$newdate[1].' '.$newdate[2]);
		else if($totalRate == 5)
			$colrow = array($row->rated1,$row->rated2,$row->rated3,$row->rated4,$row->rated5,$row->aveRate,$row->comment,$row->userName,$fbsource,$feedsource,$newdate[0],$newdate[1].' '.$newdate[2]);
		else if($totalRate == 6)
			$colrow = array($row->rated1,$row->rated2,$row->rated3,$row->rated4,$row->rated5,$row->rated6,$row->aveRate,$row->comment,$row->userName,$fbsource,$feedsource,$newdate[0],$newdate[1].' '.$newdate[2]);
		else if($totalRate == 7)
			$colrow = array($row->rated1,$row->rated2,$row->rated3,$row->rated4,$row->rated5,$row->rated6,$row->rated7,$row->aveRate,$row->comment,$row->userName,$fbsource,$feedsource,$newdate[0],$newdate[1].' '.$newdate[2]);		
		//fputcsv($outstream, $colrow, ',', '"');  	
	
		foreach( $colrow as $val ){
			$objPHPExcel->setActiveSheetIndex(0)->setCellValue($array_col[$r++] . $c, $val);
		}	
		$c++;
	}
		$filename = $date1.'-TO-'.$date2.'.xlsx';
		$objPHPExcel->getActiveSheet()->setTitle('data');
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		header('Content-type: application/vnd.ms-excel');
		header('Content-Disposition: attachment; filename="'.$filename.'"');
		$objWriter->save('php://output');	
}
function encodequote($str){
	$str = str_replace('<double>','"',str_replace("<quote>","'",$str));
	$str = str_replace("<comma>",',',$str);
	return $str;
}
?>