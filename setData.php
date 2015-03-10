<?php
session_start();
  //check if this is an ajax request OR user session is not setting up
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || !isset($_SESSION['session'])){
	echo 'access is forbidden';
	die();
}
include_once('class/class.textToImage.php');
include_once("class/class.resizephoto.php");
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$remove =  new fucn();
$opt = $_REQUEST['opt'];
$data = array();
switch($opt){
	case 'setLoc':
		$userId = $_REQUEST['key'];
		$name = mysql_real_escape_string($_REQUEST['name']);
		$gId = $_REQUEST['groudId'];
		$subs = $_REQUEST['subscribe'];
		$query = mysql_query("INSERT INTO businessList SET userGroupId = $gId, businessName = '$name', subscribe=$subs");
		if(mysql_affected_rows()){
			 $lastId = mysql_insert_id();
			 mysql_query("INSERT INTO businessProfile SET profilePlaceId = $lastId, businessName = '$name', showmap=1");
			 //$defaultLogo = '{"dLogo":"images/desktop_default.png","pLogo":"images/iphone_default.png","logo7":"images/7Ins_default.png","mLogo":"images/mobile_default.png","bLogo":"http://www.tabluu.com/images/desktop_default.png"}';	
			 $defaultLogo ='';
			 mysql_query("INSERT INTO businessCustom SET customPlaceId = $lastId, logo = '$defaultLogo',backgroundcolor = '#DBEBF1',backgroundFont = '#3b3a26'");
			// mysql_query("INSERT INTO businessImages SET placeId = $lastId,name`fbImg` =  'images/desktop_default.png',`webImg` =  'images/desktop_default.png',`webImg2` =  'images/desktop_default.png'");
			 mysql_query("INSERT INTO businessImages (placeId,path,title,description,name) VALUES($lastId,'','','','fbImg'),($lastId,'images/default-image.png','','','webImg'),($lastId,'images/default-image.png','','','webImg2'),($lastId,'images/default-image.png','','','webImg3'),($lastId,'images/default-image.png','','','webImg4'),($lastId,'images/default-image.png','','','webImg5'),($lastId,'','','','webImg6'),($lastId,'','','','webImg7'),($lastId,'','','','webImg8')");
			 mysql_query("INSERT INTO businessOpeningHours SET openingPlaceId = $lastId");
			 mysql_query("INSERT INTO businessDescription SET descPlaceId = $lastId");
		     echo $lastId;
		}else
			echo 0;
	break;
	case 'delLoc':
		$placeId = $_REQUEST['key'];
		$sql = "DELETE l,p,d,h,pho,c,img FROM businessList AS l LEFT JOIN businessProfile as p ON p.profilePlaceId=l.id LEFT JOIN businessDescription as d ON d.descPlaceId = l.id LEFT JOIN businessOpeningHours as h ON h.openingPlaceId=l.id LEFT JOIN businessPhotos as pho ON pho.photoPlaceId=l.id LEFT JOIN businessCustom as c ON c.customPlaceId = l.id LEFT JOIN businessImages as img ON img.placeId = $placeId WHERE l.id = $placeId ";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();
			$src = 'images/shared/'.$placeId;
			$remove->delete_dir($src);
			$src = 'images/profile/'.$placeId;
			$remove->delete_dir($src);			
		}else
			echo 0;
	break;
	case 'setFeature':
		$placeId = $_REQUEST['placeId'];$id = $_REQUEST['id'];$check = $_REQUEST['check'];
		$result = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'feature'") or die(mysql_error());
		if(mysql_num_rows($result)){
			mysql_query("UPDATE `businessplace_$placeId` SET feature=$check WHERE id = $id");
		}else{
			$result = mysql_query("ALTER TABLE `businessplace_$placeId` ADD `feature` TINYINT NOT NULL") or die(mysql_error());
			if(mysql_affected_rows())
				mysql_query("UPDATE `businessplace_$placeId` SET feature=$check WHERE id = $id");
		}
	break;
	case 'setHideSelfie':
		$placeId = $_REQUEST['placeId'];$id = $_REQUEST['id'];$check = $_REQUEST['check'];
		$result = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'hideimg'") or die(mysql_error());
		if(mysql_num_rows($result)){
			mysql_query("UPDATE `businessplace_$placeId` SET hideimg=$check WHERE id = $id");
		}else{
			$result = mysql_query("ALTER TABLE `businessplace_$placeId` ADD `hideimg` TINYINT NOT NULL") or die(mysql_error());
			if(mysql_affected_rows())
				mysql_query("UPDATE `businessplace_$placeId` SET hideimg=$check WHERE id = $id");
		}
	break;	
	case 'profile':
		$placeId = $_REQUEST['placeId'];
		$category = mysql_real_escape_string($_REQUEST['select-category']);$txtname = mysql_real_escape_string($_REQUEST['txtname']);$txtadd = mysql_real_escape_string($_REQUEST['txtadd']);$txtcity = mysql_real_escape_string($_REQUEST['txtcity']);$txtcountry = mysql_real_escape_string($_REQUEST['txtcountry']);$txtzip = mysql_real_escape_string($_REQUEST['txtzip']);$txtpho = mysql_real_escape_string($_REQUEST['txtpho']);$txtfb = mysql_real_escape_string($_REQUEST['txtfb']);$txtweb = mysql_real_escape_string($_REQUEST['txtweb']);$txtemail = mysql_real_escape_string($_REQUEST['txtproemail']);$txtbooknow = mysql_real_escape_string($_REQUEST['txtbooknow']);$lng = $_REQUEST['lng'];$lat = $_REQUEST['lat'];
		mysql_query("UPDATE businessList SET businessName='$txtname' WHERE id = $placeId");
		$sql = "UPDATE businessProfile SET businessName='$txtname', category='$category', address='$txtadd', city='$txtcity', country='$txtcountry', zip='$txtzip', contactNo='$txtpho', facebookURL='$txtfb', websiteURL='$txtweb', booknow='$txtbooknow', email='$txtemail', latitude=$lat, longitude=$lng WHERE profilePlaceId = $placeId";
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}
		$gid = $_REQUEST['groupId'];
		$timezone = $_REQUEST['timezone'];
		mysql_query("UPDATE businessUserGroup SET timezone='$timezone'  WHERE gId = '$gid'");
	break;	
	case 'updatemap':
		$placeId = $_REQUEST['placeId'];$lat = $_REQUEST['lat'];$lng = $_REQUEST['lng'];
		$sql = "UPDATE businessProfile SET longitude=$lng,latitude=$lat WHERE profilePlaceId = $placeId";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();			
		}else
			echo 0;
	break;
	case 'handheld':
		$placeId = $_REQUEST['placeId'];$val = $_REQUEST['val'];	
		$sql = "UPDATE businessCustom SET handheld=$val WHERE customPlaceId = $placeId";	
		mysql_query($sql) or die(mysql_error());;
	break;
	case 'eAlert': // update send feedback email alert
		$placeId = $_REQUEST['placeId'];
		$emails = json_encode(array('emails'=>explode(',',$_REQUEST['multi-email']),'is_alert'=>$_REQUEST['radioalert'],'indiRate'=>$_REQUEST['indiRate'],'alertType'=>$_REQUEST['aleftfor'],'average'=>$_REQUEST['average']));
		$sql = "UPDATE businessCustom SET email_alert='".$emails."' WHERE customPlaceId = $placeId";	
		mysql_query($sql) or die(mysql_error());
	break;
	case 'fblink': // update format facebook post link
		$link = $_REQUEST['link'];$placeId = $_REQUEST['placeId'];
		$sql = "UPDATE businessCustom SET fbpost='".mysql_real_escape_string($link)."' WHERE customPlaceId = $placeId";	
		mysql_query($sql) or die(mysql_error());
	break;
	case 'savePhotobooth': // update format facebook post link
		$placeId = $_REQUEST['placeId'];
		$UploadDirectory    = 'images/shared/upload/';
		$input = file_get_contents('php://input');
		echo $file = $UploadDirectory .  rand()  . '.jpg';
       $result = file_put_contents($file, $input);
		//echo $success ? 1 : 0;
		//$sql = "UPDATE businessCustom SET fbpost='".mysql_real_escape_string($link)."' WHERE customPlaceId = $placeId";	
		//mysql_query($sql) or die(mysql_error());
	break;
	case 'print': // update format facebook post link
		$placeId = $_REQUEST['placeId'];
		$selfie = array2json(array('firstline1'=>mysql_real_escape_string(encodequote($_REQUEST['selfie-1'])),'firstline2'=>mysql_real_escape_string(encodequote($_REQUEST['outselfie-1']))));
		$sql = "UPDATE businessCustom SET printvalue='".$selfie."' WHERE customPlaceId = $placeId";	
		mysql_query($sql) or die(mysql_error());

	break;	
	//txtname=&txtphone=&txtemail=&txtaddition=
	case 'poorRating': // poor rating message in feedback
	   //ALTER TABLE  `businessplace_1000` ADD  `poorrate` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL AFTER  `photo_url` ;
	    $questionDefault = array('How would you rate our staff based on how welcoming and friendly they were towards you?_Service Friendliness','Do you feel that you were provided service in a timely manner?_Service Timeliness','How would you rate the attentiveness of our service?_Service Attentiveness','How would you rate our overall service?_Overall Service','Was this experience worth the amount you paid?_Value for Money','Please rate our location._Location','Please rate our facilities._Facilities','How comfortable was your stay?_Comfort','How would you rate our property in terms of cleanliness?_Cleanliness','How would you rate the overall quality of your meal?_Quality of Meal','How would you rate the overall taste of your meal?_Taste of Meal','Do you feel that there were enough options for you to choose?_Variety','How likely are you to recommend us to your friends and loved ones?_Likelihood to Recommend','How likely are you to visit us again?_Likelihood to Visit Again');
	    $placeId = $_REQUEST['placeId'];$lastId = $_REQUEST['lastId'];
		$poor = array2json(array('email'=>$_REQUEST['txtemail'],'name'=>$_REQUEST['txtname'],'contact'=>$_REQUEST['txtphone'],'additional'=>$_REQUEST['txtaddition']));
		$result = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'poorrate'") or die(mysql_error());
		if(mysql_num_rows($result)){
			$sql = "UPDATE businessplace_$placeId SET poorrate='".mysql_real_escape_string($poor)."' WHERE id = $lastId";
		}else{
			mysql_query("ALTER TABLE `businessplace_$placeId` ADD `poorrate` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL") or die(mysql_error());
			if(mysql_affected_rows())
				$sql = "UPDATE businessplace_$placeId SET poorrate='".mysql_real_escape_string($poor)."' WHERE id = $lastId";
		}			
		mysql_query($sql) or die(mysql_error());
		$custom = mysql_query("SELECT item2Rate,selectedItems FROM businessCustom WHERE customPlaceId = $placeId");
		$row = mysql_fetch_object($custom);
		$arrayItem2Rate = array();
		if($row->item2Rate != '')
			$arrayItem2Rate = json_decode($row->item2Rate);
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
		$totalRate = count($ratingTextTemp); 
		if($totalRate == 1){
			$fields = "rated1, aveRate, comment";
		}else if($totalRate == 2){
			$fields = "rated1, rated2, aveRate, comment";
		}else if($totalRate == 3){
			$fields = "rated1, rated2, rated3, aveRate, comment";
		}else if($totalRate == 4){
			$fields = "rated1, rated2, rated3, rated4, aveRate, comment";
		}else if($totalRate == 5){
			$fields = "rated1, rated2, rated3, rated4, rated5, aveRate, comment";
		}else if($totalRate == 6){
			$fields = "rated1, rated2, rated3, rated4, rated5, rated6, aveRate, comment";
		}else if($totalRate == 7){
			$fields = "rated1, rated2, rated3, rated4, rated5, rated6, rated7, aveRate, comment";
		}	
	
		$rateresult = mysql_query("SELECT $fields FROM businessplace_$placeId WHERE id = $lastId");
		$rate = mysql_fetch_array($rateresult);
		$j = 0;$comm= '';
		$body = "<p>Date: ". date('d-M-Y') . '<p>';
		$rating = "Ratings:<br/>";
		foreach($ratingTextTemp as $val)
			$rating = $rating. $val.': '.$rate[$j++] .'/5<br/>';
			$rating = $rating.'Average: '.$rate['aveRate'];
		
		if($rate['comment'] != '')
			$comm = '<p>Comment:<br/>'.$rate['comment'].'</p>';
		
		$info = '<p>Customer info:<br/>Name: '.$_REQUEST['txtname'].'<br/>Phone Number: '.$_REQUEST['txtphone'].'<br/>'.($_REQUEST['txtemail'] !='' ? 'Email: '.$_REQUEST['txtemail'] : '').'</p>'.($_REQUEST['txtaddition'] != '' ? '<p>Additional Info:<br/>'.$_REQUEST['txtaddition'] : '').'</p>';
		$body = $body.$rating.$comm.$info;
		$sql = "SELECT c.email_alert FROM businessCustom AS c
		WHERE c.customPlaceId =  $placeId
		LIMIT 1";
		$result = mysql_query($sql);
		$row = mysql_fetch_object($result);
		$email = json_decode($row->email_alert);
		require_once 'class/class.phpmailer2.php';
		$mail = new PHPMailer;
		$mail->IsAmazonSES();
		$mail->AddAmazonSESKey('AKIAITTJTNGQSODBXOJQ', 'o48bdVxr2u1gBvag6SyqH3acR27wpgxTEnrPWTJb');                            // Enable SMTP authentication
		$mail->CharSet	  =	"UTF-8";                      // SMTP secret 
		$mail->From = 'support@tabluu.com';
		$mail->FromName = 'Tabluu Support';
		$mail->Subject = "Tabluu – Poor Rating Alert!";
		$mail->AltBody = $body;
		$mail->Body = $body;
		$mail->addBCC("support@tabluu.com"); 
		foreach($email->emails as $val)
			$mail->AddAddress(trim($val)); 
		//$mail->Send();
	break;	
	case 'onLoc':
		$placeId = $_REQUEST['key'];
		$sql = "UPDATE businessList SET subscribe=1 WHERE id = $placeId";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();
		}else
			echo 0;
	break;
	case 'adduser':
		$groupID = $_REQUEST['groupID'];
		$fname = mysql_real_escape_string($_REQUEST['fname']);
		$lname = mysql_real_escape_string($_REQUEST['lname']);
		$email = $_REQUEST['email'];
		$id = $_REQUEST['id'];
		$permission = $_REQUEST['permission'];
		$pwd =  rand_string(6);
		//echo "INSERT INTO businessUsers SET userGroupId =$groupID,fname='$fname',lname='$lname',pwd='".md5($pwd)."',email='$email',permission=$permission,created='".date('Y-m-d h:i:s')."'";
		mysql_query("INSERT INTO businessUsers SET userGroupId =$groupID,fname='$fname',lname='$lname',pwd='".md5($pwd)."',email='$email',permission=$permission,created='".date('Y-m-d h:i:s')."'") or die(mysql_error());
		$result = mysql_query("SELECT fname,lname FROM businessUsers WHERE id=$id LIMIT 1");
		$row = mysql_fetch_object($result);	
		$subject = 'Tabluu.com - user invitation link';
		$body = 'Hi '.$fname .',
				<p>You have been invited by '.$row->fname.' '.$row->lname.' to join Tabluu.com as a user/administrator.</p>
				<p>Please go to: <a href="http://www.tabluu.com">www.tabluu.com</a><br/>
				Login using the following details:</p>
				<p>Username: '. $email .'<br/>Password: ' .$pwd. '</p>
				<p>You may change the password provided by updating the User Admin section.</p>
				<p>Thank you!<br/>
				Tabluu Support</p>
				';	
		/*
		require_once 'class/class.phpmailer.php';
		$mail = new PHPMailer;

		$mail->IsSMTP();                                      // Set mailer to use SMTP
		$mail->Host = 'in.mailjet.com';  // Specify main and backup server
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = 'a870a465ad5cc9380df110e322eeb656';                            // SMTP username
		$mail->Password = '187abdc8be867cea3ddf106100d6fa25';                           // SMTP secret 
		$mail->SMTPSecure = 'ssl';                            // Enable encryption, 'ssl' also accepted
		$mail->From = 'support@tabluu.com';
		$mail->FromName = 'Tabluu Support';
		$mail->AddAddress($email);
		$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
		$mail->IsHTML(true);                                  // Set email format to HTML
		$mail->Subject = $subject;
		$mail->Body    = $body;
		$mail->AltBody = $body;
		if(!$mail->Send()) {
		   echo 0;
		   exit;
		}*/
		require_once 'class/class.phpmailer2.php';
		$mail = new PHPMailer;
		$mail->IsAmazonSES();
		$mail->AddAmazonSESKey('AKIAITTJTNGQSODBXOJQ', 'o48bdVxr2u1gBvag6SyqH3acR27wpgxTEnrPWTJb');                            // Enable SMTP authentication
		$mail->CharSet	  =	"UTF-8";                      // SMTP secret 
		$mail->From = 'support@tabluu.com';
		$mail->FromName = 'Tabluu Support';
		$mail->Subject = $subject;
		$mail->AltBody = $body;
		$mail->Body = $body;
		$mail->AddAddress($email); 
		$mail->Send();
	break;	
	case 'offLoc':
		$placeId = $_REQUEST['key'];
		$sql = "UPDATE businessList SET subscribe=0 WHERE id = $placeId";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}else
			echo 0;
	break;
	case 'updatepwd':
		$fname = mysql_real_escape_string($_REQUEST['fname']);
		$lname = mysql_real_escape_string($_REQUEST['lname']);
		$email = mysql_real_escape_string($_REQUEST['email']);
		$pwd = mysql_real_escape_string($_REQUEST['pwd']);
		$id = $_REQUEST['id'];
		$sql = "UPDATE businessUsers SET fname='$fname',lname='$lname',pwd='".$pwd."',email='$email' WHERE id = $id";	
		mysql_query($sql);
		echo (mysql_affected_rows() ? 1 : 0);
	break;
	case 'signup':
		include_once('class/class.cookie.php');
		include_once 'class/class.phpmailer2.php';
		$fname = mysql_real_escape_string($_REQUEST['fname']);
		$lname = mysql_real_escape_string($_REQUEST['lname']);
		$email = mysql_real_escape_string($_REQUEST['email']);
		$pwd = mysql_real_escape_string($_REQUEST['pwd']);
		$groupId = trim($_REQUEST['groupId']);
		if($groupId){
			$sql = "INSERT INTO businessUsers SET userGroupId=$groupId,fname='$fname',lname='$lname',pwd='".$pwd."',email='$email'";	
			mysql_query($sql) or die(mysql_error());
			$lastId = mysql_insert_id();
			$cookie = new cookie();
			$cookie->setCookie( $lastId );
		}else{
				$date = date('Y-m-d H:i:s');
				if(isset($_SESSION['typeofaccnt']) && $_SESSION['typeofaccnt'] == 'a'){ //alpha pre launch
					$_SESSION['typeofaccnt'] = '';
					$next_due_date = strtotime(date('Y-m-d H:i:s').' + 12 Months');
					$due_date = date('Y-m-d H:i:s a', $next_due_date);
					$result = mysql_query("INSERT INTO businessUserGroup SET productId=". $connect->enterprise12 .", email='$email',state='active',addLoc=0,created='$date',type=1,expiration='$due_date'") or die(mysql_error());
					$tail = '<p>He/She signed up alpha pre launch</p>';
					$groupId = mysql_insert_id();
					echo json_encode(array('type'=>1));
					$result = mysql_query("SELECT * FROM `businessClockcounter` WHERE 1 ") or die(mysql_error());
					$row = mysql_fetch_object($result);
					$account =($row->accounts > 0 ? $row->accounts - 1 : 0);
					mysql_query("UPDATE businessClockcounter SET `accounts`=$account WHERE id = $row->id") or die(mysql_error());
				}else if(isset($_SESSION['typeofaccnt']) && $_SESSION['typeofaccnt'] == 'b'){ //beta pre launch
					$_SESSION['typeofaccnt'] = '';
					$next_due_date = strtotime(date('Y-m-d H:i:s').' + 12 Months');
					$due_date = date('Y-m-d H:i:s a', $next_due_date);
					$result = mysql_query("INSERT INTO businessUserGroup SET productId=". $connect->enterprise12 .", email='$email',state='active',addLoc=0,created='$date',type=2,expiration='$due_date'") or die(mysql_error());
					$tail = '<p>He/She signed up beta pre launch</p>';
					$groupId = mysql_insert_id();
					echo json_encode(array('type'=>2,'groupId'=>$groupId));
					$result = mysql_query("SELECT * FROM `businessClockcounter` WHERE 1 ") or die(mysql_error());
					$row = mysql_fetch_object($result);
					$account =($row->accounts > 0 ? $row->accounts - 1 : 0);
					mysql_query("UPDATE businessClockcounter SET `accounts`=$account WHERE id = $row->id") or die(mysql_error());
				}else{
					$result = mysql_query("INSERT INTO businessUserGroup SET productId=". $connect->freever .", email='$email',state='active',addLoc=0,created='$date',type=0") or die(mysql_error());
					$tail = '<p>He/She signed up for free plan</p>';
					echo json_encode(array('type'=>0));
					$groupId = mysql_insert_id();
			    }
				
				$sql = "INSERT INTO businessUsers SET userGroupId=$groupId,fname='$fname',lname='$lname',pwd='".$pwd."',email='$email'";
				mysql_query($sql) or die(mysql_error());
				$lastId = mysql_insert_id();
				$cookie = new cookie();
				$cookie->setCookie( $lastId );
				$subject = 'Tabluu - New Sign up user'; 
				$body = '<p>Customer name: '. $fname . ' ' . $lname . '</p>'.$tail; 
				$mail = new PHPMailer;
				$mail->IsAmazonSES();
				$mail->AddAmazonSESKey($connect->aws_access_key_id, $connect->aws_secret_key);                            // Enable SMTP authentication
				$mail->CharSet	  =	"UTF-8";                      // SMTP secret 
				$mail->From = 'support@tabluu.com';
				$mail->FromName = 'Tabluu Support';
				$mail->Subject = $subject;
				$mail->AltBody = $body;
				$mail->Body = $body; 
				$mail->AddAddress("support@tabluu.com");
				//$mail->addBCC('robert.garlope@gmail.com');	
				$mail->Send();
				
				/*insert the new user to email list sendy*/
				$time = time();
				$name =$fname.' '.$lname; //optional
				mysql_query('INSERT INTO subscribers (userID, email, name, custom_fields, list, timestamp) VALUES (1, "'.$email.'", "'.$name.'", "", 2, '.$time.')');	
		}
	break;
	case 'wizardsetupdone':
		$placeid = $_REQUEST['placeId'];
		$sql = "UPDATE  `businessList` SET  `setup` =  1 WHERE  `id` = $placeid";
		mysql_query($sql) or die(mysql_error());
	break;
	case 'texthour':
		$placeId = $_REQUEST['placeId'];
		$val = $_REQUEST['val'];
		$result = mysql_query("SELECT id FROM businessOpeningHours WHERE openingPlaceId = $placeId");
		if(mysql_num_rows($result))
			$sql = "UPDATE businessOpeningHours SET opening='".mysql_real_escape_string($val)."' WHERE openingPlaceId =". $placeId;	
		else
			$sql = "INSERT INTO businessOpeningHours SET openingPlaceId = $placeId, opening='".mysql_real_escape_string($val)."'";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}
	break;
	case 'textdesc':
		$placeId = $_REQUEST['placeId'];
		$val = $_REQUEST['val'];
		$result = mysql_query("SELECT id FROM businessDescription WHERE descPlaceId = $placeId");
		if(mysql_num_rows($result))	
			$sql = "UPDATE businessDescription SET description='".mysql_real_escape_string($val)."' WHERE descPlaceId =".$placeId;
        else
			$sql = "INSERT INTO businessDescription SET descPlaceId = $placeId,  description='".mysql_real_escape_string($val)."'";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}
	break;	
	case 'flip':
		$placeId = $_REQUEST['placeId'];
		$val = $_REQUEST['val'];
		$sql = "UPDATE businessProfile SET showmap=$val WHERE profilePlaceId = $placeId";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}
	break;
	case 'nicename':
		$placeId = $_REQUEST['placeId'];
		$val = $_REQUEST['nicename'];
		$sql = "UPDATE businessProfile SET nicename='$val' WHERE profilePlaceId = $placeId";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}
	break;
	case 'setcredit':
		$gid = $_REQUEST['gid'];
		$credit = $_REQUEST['credit'];
		echo $val = json_encode(array('date'=>date('Y-m-d'),'credits'=>$credit));
		$sql = "UPDATE businessUserGroup SET credits='$val' WHERE gId = $gid";	
		mysql_query($sql);

	break;
	case 'sendEmail2Client':
		$placeId = $_REQUEST['placeId'];$cases = $_REQUEST['cases'];
		require_once 'class/class.phpmailer2.php';
		$mail = new PHPMailer;
		$sql = "SELECT p.email,p.businessName,p.nicename,g.email as gmail FROM businessList AS l
		LEFT JOIN businessProfile AS p ON p.profilePlaceId = l.id
		LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId
		LEFT JOIN businessCustom AS c ON c.customPlaceId = l.id
		WHERE l.id =  $placeId
		LIMIT 1";
		$result = mysql_query($sql);
		if(mysql_num_rows($result)){
			$rows = mysql_fetch_object($result);
			$email = $rows->email;
			if(trim($rows->email))
				$email = $rows->gmail;
			if($cases < 1){
				$name = trim($_REQUEST['name']); 
				//$subject = 'A Tabluu user,'.($name != '' ? ' '.$name.' ' : ' ').'posted a feedback / review of '.$rows->businessName.'!';
				$subject = 'You\'ve got feedback for '.$rows->businessName.'!';
				$body = '<p>Login to your Tabluu account and manage your feedback / reviews now!<br/><a href="http://www.tabluu.com">http://www.tabluu.com</a></p><p>Or check your Tabluu page for the latest updates:<br/><a href="http://www.tabluu.com/'.$rows->nicename.'.html">http://www.tabluu.com/'.$rows->nicename.'.html</a></p>'; 
			}else{
				$subject = 'You have a new follower for '.$rows->businessName.'!';
				$body = '<p>See what\'s changed at your Customer Advocacy (Tabluu) page:<br/><a href="http://www.tabluu.com/'.$rows->nicename.'.html">http://www.tabluu.com/'.$rows->nicename.'.html</a></p>
				<p>Or login to Tabluu.com to manage your reviews.</p>
				<p>Happy Tabluu-ing!</p>
				<p>Cheers,<br/>
				Tabluu Support</p>';
			}
			$mail->IsAmazonSES();
			$mail->AddAmazonSESKey('AKIAITTJTNGQSODBXOJQ', 'o48bdVxr2u1gBvag6SyqH3acR27wpgxTEnrPWTJb');                            // Enable SMTP authentication
			$mail->CharSet	  =	"UTF-8";                      // SMTP secret 
			$mail->From = 'support@tabluu.com';
			$mail->FromName = 'Tabluu Support';
			$mail->Subject = $subject;
			$mail->AltBody = $body;
			$mail->Body = $body; 
			$mail->AddAddress($email);
			//$mail->addBCC("support@tabluu.com");
			//$mail->addBCC("robert.garlope@gmail.com");
			$mail->Send();
		}
	break;
	case 'ratesave':
	    switch($_REQUEST['case']){
			case 1:
				$rated1 = $_REQUEST['rated1'];$rated2 = $_REQUEST['rated2'];$rated3 = $_REQUEST['rated3'];$rated4 = $_REQUEST['rated4'];$rated5 = $_REQUEST['rated5'];$rated6 = $_REQUEST['rated6'];$rated7 = $_REQUEST['rated7'];$aveRated = $_REQUEST['aveRate'];$comment = $_REQUEST['comment'];$source = $_REQUEST['source'];$param = $_REQUEST['param'];
				$id = $_REQUEST['placeId'];$date = date('Y-m-d H:i:s');
				$addnewfield = mysql_query("SHOW COLUMNS FROM `businessplace_$id` LIKE 'feedsource'") or die(mysql_error());
				if(mysql_num_rows($addnewfield) < 1)
					mysql_query("ALTER TABLE `businessplace_$id` ADD `feedsource` VARCHAR(2) NOT NULL AFTER `source`");
					
				$query = mysql_query('INSERT INTO businessplace_'.$id.' SET rated1='.$rated1.',rated2='.$rated2.',rated3='.$rated3.',rated4='.$rated4.',rated5='.$rated5.',rated6='.$rated6.',rated7='.$rated7.',aveRate='.$aveRated.',comment = "'.mysql_real_escape_string($comment).'",date="'.$date.'",feedsource="'.$param.'"') or die(mysql_error());
				echo $lastId = mysql_insert_id();
			break;
			case 2:
				if($_REQUEST['photo_url'] != '')
					$connect->rotateImages($_REQUEST['photo_url']);
				$rated1 = $_REQUEST['rated1'];$rated2 = $_REQUEST['rated2'];$rated3 = $_REQUEST['rated3'];$rated4 = $_REQUEST['rated4'];$rated5 = $_REQUEST['rated5'];$rated6 = $_REQUEST['rated6'];$rated7 = $_REQUEST['rated7'];$aveRated = $_REQUEST['aveRate'];$comment = $_REQUEST['comment']; $userName = $_REQUEST['userName'];$userId = $_REQUEST['userId'];$photo_url = (trim($_REQUEST['photo_url']) != '' ? $_REQUEST['photo_url'] : 'http://www.tabluu.com/app/images/desktop_default.png');$id = $_REQUEST['placeId'];$date = date('Y-m-d H:i:s');$email = $_REQUEST['email'];$source = $_REQUEST['source'];$param = $_REQUEST['param'];
				$data = $_REQUEST['data'];$totalFriends = $_REQUEST['totalFriends'];
				$addnewfield = mysql_query("SHOW COLUMNS FROM `businessplace_$id` LIKE 'feedsource'") or die(mysql_error());
				$textimg_height = 80;$tranparent = 85;
				if(mysql_num_rows($addnewfield) < 1)
					mysql_query("ALTER TABLE `businessplace_$id` ADD `feedsource` VARCHAR(2) NOT NULL AFTER `source`");
				if($_REQUEST['socialopt']){ //options to post social customer photo selected
					if(strstr($photo_url,'shared')){
						$bresult = mysql_query("SELECT `businessName` FROM `businessList` WHERE `id` = $id");
						$row = mysql_fetch_object($bresult);
						$UploadDirectory    = 'images/shared/'.$id.'/';
						$image = new Photos();
						$namejpg = rand(); 
						$tempf1 = $UploadDirectory.$namejpg.'.jpg';
						copy($photo_url,$tempf1);
						$image->load($tempf1);
						if($image->getWidth() >= 1000)
						  $image->scale(40);
						if($image->getWidth() > 500 && $image->getWidth() < 1000)
						  $image->scale(80); 
						$image->save($tempf1,$image->image_type);  
						$_im = new TextToImage();
						$_im->makeImage($image->getWidth(),$textimg_height);
						$_im->createText('See my "selfie review"',dirname(__FILE__)."/myriad.ttf");
						$_im->createText("\n@ ".$row->businessName,dirname(__FILE__)."/myriad.ttf");
						$namejpg = rand();
						$_im->saveAsJpg("jpg".$namejpg,$UploadDirectory);
						$p1 = $tempf1;
						$p2 = $UploadDirectory."jpg".$namejpg.'.jpg'; //caption for photo
						if( $image->image_type == 2 ) { // jpg
						 $dest = imagecreatefromjpeg($tempf1);
						} elseif( $image->image_type == 1 ) { //gif
						 $dest = imagecreatefromgif($tempf1);
						} elseif( $image->image_type == 3 ) { //png
						 $dest = imagecreatefrompng($tempf1);
						}
						$caption = imagecreatefromjpeg($p2);
						$namejpg = rand();
						echo $sharepic = $UploadDirectory.$namejpg.'.jpg';
						imagecopymerge($dest, $caption, 0, $image->getHeight()-$textimg_height, 0, 0, $image->getWidth(), $textimg_height, $tranparent);
						imagejpeg($dest,$sharepic);
						greyscale($sharepic);
						imagedestroy($dest);imagedestroy($caption);
						unlink($tempf1);unlink($p2);
						$query = mysql_query('INSERT INTO businessplace_'.$id.' SET rated1='.$rated1.',rated2='.$rated2.',rated3='.$rated3.',rated4='.$rated4.',rated5='.$rated5.',rated6='.$rated6.',rated7='.$rated7.',aveRate='.$aveRated.',userName="'.$userName.'",userId="'.$userId.'",photo_url="'.$photo_url.'",source="'.$source .'",comment = "'.mysql_real_escape_string($comment).'",date="'.$date.'",feedsource="'.$param.'"') or die(mysql_error());
						$last_Id = mysql_insert_id();
						$query = mysql_query('INSERT INTO businessCustomer_'.$id.' SET source=1,userId="'.$userId.'",name="'.$userName.'",totalFriends='.$totalFriends.',email="'.$email.'",placeId='.$id.',data=""') or die(mysql_error());
						$lastId = mysql_insert_id();
						//echo $last_Id.'_'.$lastId; 
						//echo $photo_url;
					}else{	
						$namejpg = rand();
						$UploadDirectory    = 'images/shared/'.$id.'/';
						if (!file_exists('images/shared/'.$id))
							mkdir('images/shared/'.$id);
						$profileimage = $UploadDirectory.$namejpg.'.jpg';
						copy("https://graph.facebook.com/$userId/picture?width=400&height=400", $profileimage);
						$bresult = mysql_query("SELECT `businessName` FROM `businessList` WHERE `id` = $id");
						$row = mysql_fetch_object($bresult);
						$image = new Photos();
						$image->load($profileimage);
						if($image->getWidth() > 1000)
						  $image->scale(40);
						if($image->getWidth() > 500 && $image->getWidth() < 1000)
						  $image->scale(80); 
						$image->save($profileimage,$image->image_type);  
						$_im = new TextToImage();
						$_im->makeImage($image->getWidth(),$textimg_height);
						$_im->createText('See my "selfie review"',dirname(__FILE__)."/myriad.ttf");
						$_im->createText("\n@ ".$row->businessName,dirname(__FILE__)."/myriad.ttf");
						$namejpg = rand();
						$_im->saveAsJpg("jpg".$namejpg,$UploadDirectory);
						$p1 = $profileimage;
						$p2 = $UploadDirectory."jpg".$namejpg.'.jpg';
						if( $image->image_type == 2 ) { // jpg
						 $dest = imagecreatefromjpeg($profileimage);
						} elseif( $image->image_type == 1 ) { //gif
						 $dest = imagecreatefromgif($profileimage);
						} elseif( $image->image_type == 3 ) { //png
						 $dest = imagecreatefrompng($profileimage);
						}
						$src = imagecreatefromjpeg($p2);
						$namejpg = rand();
						echo $sharepic = $UploadDirectory.$namejpg.'.jpg';
						imagecopymerge($dest, $src, 0, $image->getHeight()-$textimg_height, 0, 0, $image->getWidth(), $textimg_height, $tranparent);
						imagejpeg($dest,$sharepic);
						greyscale($sharepic);
						imagedestroy($dest);imagedestroy($src);
						unlink($p2);unlink($profileimage);
						$photo_url='';
						$query = mysql_query('INSERT INTO businessplace_'.$id.' SET rated1='.$rated1.',rated2='.$rated2.',rated3='.$rated3.',rated4='.$rated4.',rated5='.$rated5.',rated6='.$rated6.',rated7='.$rated7.',aveRate='.$aveRated.',userName="'.$userName.'",userId="'.$userId.'",photo_url="'.$photo_url.'",source="'.$source .'",comment = "'.mysql_real_escape_string($comment).'",date="'.$date.'",feedsource="'.$param.'"') or die(mysql_error());
						$last_Id = mysql_insert_id();
						$query = mysql_query('INSERT INTO businessCustomer_'.$id.' SET source=1,userId="'.$userId.'",name="'.$userName.'",totalFriends='.$totalFriends.',email="'.$email.'",placeId='.$id.',data=""') or die(mysql_error());
						$lastId = mysql_insert_id();
						//echo $last_Id.'_'.$lastId;
						//echo $photo_url;
					} 
				}else{
					if(strstr($photo_url,'shared')){
						$bresult = mysql_query("SELECT `businessName` FROM `businessList` WHERE `id` = $id");
						$row = mysql_fetch_object($bresult);
						$UploadDirectory    = 'images/shared/'.$id.'/';
						$image = new Photos();
						$namejpg = rand(); 
						$tempf1 = $UploadDirectory.$namejpg.'.jpg';
						copy($photo_url,$tempf1);
						$image->load($tempf1);
						if($image->getWidth() >= 1000)
						  $image->scale(40);
						if($image->getWidth() > 500 && $image->getWidth() < 1000)
						  $image->scale(80); 
						$image->save($tempf1,$image->image_type);  
						$_im = new TextToImage();
						$_im->makeImage($image->getWidth(),$textimg_height);
						$_im->createText('See my "selfie review"',dirname(__FILE__)."/myriad.ttf");
						$_im->createText("\n@ ".$row->businessName,dirname(__FILE__)."/myriad.ttf");
						$namejpg = rand();
						$_im->saveAsJpg("jpg".$namejpg,$UploadDirectory);
						$p1 = $tempf1;
						$p2 = $UploadDirectory."jpg".$namejpg.'.jpg'; //caption for photo
						if( $image->image_type == 2 ) { // jpg
						 $dest = imagecreatefromjpeg($tempf1);
						} elseif( $image->image_type == 1 ) { //gif
						 $dest = imagecreatefromgif($tempf1);
						} elseif( $image->image_type == 3 ) { //png
						 $dest = imagecreatefrompng($tempf1);
						}
						$caption = imagecreatefromjpeg($p2);
						$namejpg = rand();
						echo $sharepic = $UploadDirectory.$namejpg.'.jpg';
						imagecopymerge($dest, $caption, 0, $image->getHeight()-$textimg_height, 0, 0, $image->getWidth(), $textimg_height, $tranparent);
						imagejpeg($dest,$sharepic);
						greyscale($sharepic);
						imagedestroy($dest);imagedestroy($caption);
						unlink($tempf1);unlink($p2);
						$query = mysql_query('INSERT INTO businessplace_'.$id.' SET rated1='.$rated1.',rated2='.$rated2.',rated3='.$rated3.',rated4='.$rated4.',rated5='.$rated5.',rated6='.$rated6.',rated7='.$rated7.',aveRate='.$aveRated.',userName="'.$userName.'",userId="'.$userId.'",photo_url="'.$photo_url.'",source="'.$source .'",comment = "'.mysql_real_escape_string($comment).'",date="'.$date.'",feedsource="'.$param.'"') or die(mysql_error());
						$last_Id = mysql_insert_id();
						$query = mysql_query('INSERT INTO businessCustomer_'.$id.' SET source=1,userId="'.$userId.'",name="'.$userName.'",totalFriends='.$totalFriends.',email="'.$email.'",placeId='.$id.',data=""') or die(mysql_error());
						$lastId = mysql_insert_id();
						//echo $last_Id.'_'.$lastId; 
						//echo $photo_url;
					}else{
						$query = mysql_query('INSERT INTO businessplace_'.$id.' SET rated1='.$rated1.',rated2='.$rated2.',rated3='.$rated3.',rated4='.$rated4.',rated5='.$rated5.',rated6='.$rated6.',rated7='.$rated7.',aveRate='.$aveRated.',userName="'.$userName.'",userId="'.$userId.'",photo_url="'.$photo_url.'",source="'.$source .'",comment = "'.mysql_real_escape_string($comment).'",date="'.$date.'",feedsource="'.$param.'"') or die(mysql_error());
						$last_Id = mysql_insert_id();
						$query = mysql_query('INSERT INTO businessCustomer_'.$id.' SET source=1,userId="'.$userId.'",name="'.$userName.'",totalFriends='.$totalFriends.',email="'.$email.'",placeId='.$id.',data=""') or die(mysql_error());
						$lastId = mysql_insert_id();
						//echo $last_Id.'_'.$lastId;
						echo $photo_url;
					} 
				}
			break;
		}
		
	break;
	case 'photoshare':
		$rated1 = $_REQUEST['rated1'];$rated2 = $_REQUEST['rated2'];$rated3 = $_REQUEST['rated3'];$rated4 = $_REQUEST['rated4'];$rated5 = $_REQUEST['rated5'];$rated6 = $_REQUEST['rated6'];$rated7 = $_REQUEST['rated7'];$aveRated = $_REQUEST['aveRate'];$comment = $_REQUEST['comment']; $userName = $_REQUEST['userName'];$userId = $_REQUEST['userId'];$photo_url = $_REQUEST['photo_url'];$id = $_REQUEST['placeId'];$date = date('Y-m-d h:i:s');$email = $_REQUEST['email'];
		$data = $_REQUEST['data'];$source = $_REQUEST['source'];
		$query = mysql_query('INSERT INTO photoshare SET placeId = '.$id.',rated1='.$rated1.',rated2='.$rated2.',rated3='.$rated3.',rated4='.$rated4.',rated5='.$rated5.',rated6='.$rated6.',rated7='.$rated7.',aveRate='.$aveRated.',userName="'.$userName.'",userId="'.$userId.'",photo_url="'.$photo_url.'",comment = "'.mysql_real_escape_string($comment).'",source="'.$source.'",date="'.$date.'"') or die(mysql_error());
	break;	
	case 'follow':
		$id = $_REQUEST['placeId'];
	    switch($_REQUEST['case']){
			case 1:
				$email = mysql_real_escape_string($_REQUEST['email']);
				$query = mysql_query('INSERT INTO businessCustomer_'.$id.' SET follow=1,email="'.$email.'",placeId='.$id) or die(mysql_error());
			break;
			case 2:
				$lastId = $_REQUEST['lastId'];
				mysql_query("UPDATE businessCustomer_$id SET follow=1 WHERE id = $lastId") or die(mysql_error());
			break;
		}
		
	break;	
	case 'sendEmail':
		$objId = array2json(explode(',',$_REQUEST['objId']));
		$subject = $_REQUEST['subject'];
		$body = $_REQUEST['body'];
		$gId = $_REQUEST['gid'];
		$query = mysql_query('INSERT INTO businessMail SET body = "'.mysql_real_escape_string($body).'", subject = "'.$subject.'", groupId='.$gId) or die(mysql_error());
		if(mysql_affected_rows()){
			$lastId = mysql_insert_id();
			$query = mysql_query('INSERT INTO email2process SET emailID = '.$lastId.', placesId = "'.$objId.'"') or die(mysql_error());
		}
		
	break;
	case 'userparam':
		$objId = array2json(explode(',',$_REQUEST['objId']));
		$userId = $_REQUEST['userId'];
		mysql_query("UPDATE businessUsers SET params='".$objId."' WHERE id = $userId");
		$groupID = $_REQUEST['groupID'];$list=array();$i=0;
		$sql = "SELECT u.id, u.userGroupId, u.fname, u.lname, u.permission, u.params, u.email FROM businessUsers AS u
		WHERE u.userGroupId =  $groupID ORDER BY permission ASC";
		$result = mysql_query($sql);
		while($row = mysql_fetch_object($result)){
			$list[$i]['fname'] = $row->fname;
			$list[$i]['id'] = $row->id;
			$list[$i]['lname'] = $row->lname;
			$list[$i]['permission'] = $row->permission;
			$list[$i]['param'] = $row->params;
			$list[$i++]['email'] = $row->email;
			
		}
		echo json_encode($list);		
	break;
	case 'optsocialpost':
		$placeId = $_REQUEST['placeId'];$val = ($_REQUEST['val'] > 0 ? 1 : 0);
		mysql_query("UPDATE businessCustom SET optsocialpost= $val WHERE customPlaceId = $placeId") or die(mysql_error());		
	break;		
	case 'setcustom':
		$placeId = $_REQUEST['placeId'];$case = $_REQUEST['case'];$sql='';
		if($case ==1)
			$sql = "UPDATE businessCustom SET logo= '' WHERE customPlaceId = $placeId";
		else if($case ==2)
			$sql = "UPDATE businessCustom SET backgroundImg= '' WHERE customPlaceId = $placeId";
		else if($case ==3){
		   $color = $_REQUEST['color'];
			$sql = "UPDATE businessCustom SET backgroundcolor= '#$color' WHERE customPlaceId = $placeId";
		}else if($case ==4){
		   $color = $_REQUEST['color'];
			$sql = "UPDATE businessCustom SET backgroundFont= '#$color' WHERE customPlaceId = $placeId";
		}else if($case ==5){
		   $txtvpoor = encodequote($_REQUEST['txtvpoor']);$txtpoor = encodequote($_REQUEST['txtpoor']);$txtfair = encodequote($_REQUEST['txtfair']);$txtgood = encodequote($_REQUEST['txtgood']);$txtexc = encodequote($_REQUEST['txtexc']);
		   $obj = array('vpoor' => $txtvpoor, 'poor' => $txtpoor, 'fair' => $txtfair, 'good' => $txtgood, 'excellent' => $txtexc);
			//echo json_encode($obj);
			echo $json = array2json($obj);
			$sql = "UPDATE businessCustom SET ratingText= '".$json."' WHERE customPlaceId = $placeId";
		}else if($case ==6){
		   $obj =  array('btntake' => array(encodequote($_REQUEST['btnTakeSelfie']),encodequote($_REQUEST['btnTakeSelfie2'])),'btnfeedback' => array(encodequote($_REQUEST['btnfeedbackSelfie']),encodequote($_REQUEST['btnfeedbackSelfie2'])),'share' => array(encodequote($_REQUEST['txtshare1']),encodequote($_REQUEST['txtshare2'])), 'comment' => array(encodequote($_REQUEST['txtrecommend1']),encodequote($_REQUEST['txtrecommend2'])),'badEmail' => array(encodequote($_REQUEST['txtleave1']),encodequote($_REQUEST['txtleave2'])),'allow' => array(encodequote($_REQUEST['txtallow1']),encodequote($_REQUEST['txtallow2'])),'logout' => array(encodequote($_REQUEST['txt-logout'])),'follow' => array(encodequote($_REQUEST['follow-no']),encodequote($_REQUEST['follow-yes'])), 'nxt' => array(encodequote($_REQUEST['txtnxt'])), 'photo' => array(encodequote($_REQUEST['txtphoto1']),encodequote($_REQUEST['txtphoto2'])), 'option' => array(encodequote($_REQUEST['txtoption1']),encodequote($_REQUEST['txtoption2']),encodequote($_REQUEST['txtoption3'])), 'pass' => array(encodequote($_REQUEST['txtpass1']),encodequote($_REQUEST['txtpass2'])));
			echo $json = array2json($obj);
			$sql = "UPDATE businessCustom SET button= '".$json."' WHERE customPlaceId = $placeId";
		}else if($case ==7){
		   $obj = array('comment' => encodequote($_REQUEST['txtbox1']),'logoutT' => encodequote($_REQUEST['txtbox9']),'logoutB' => encodequote($_REQUEST['txtbox10']), 'average' => encodequote($_REQUEST['txtbox2']),'followT' => encodequote($_REQUEST['txtbox11']),'followB' => encodequote($_REQUEST['txtbox12']),'badEmailT' => encodequote($_REQUEST['txtbox13']),'badEmailB' => encodequote($_REQUEST['txtbox14']),'detailsEmailT' => encodequote($_REQUEST['txtbox15']),'detailsEmailB' => encodequote($_REQUEST['txtbox16']),'allow' => encodequote($_REQUEST['txtbox17']), 'share' => encodequote($_REQUEST['txtbox3']), 'thank' => encodequote($_REQUEST['txtbox4']), 'nxt' => encodequote($_REQUEST['txtbox5']), 'option' => encodequote($_REQUEST['txtbox6']), 'pass' => encodequote($_REQUEST['txtbox7']), 'takePhoto' => encodequote($_REQUEST['txtbox8']), 'takeselfieB' => encodequote($_REQUEST['txtbox18']), 'takeselfieT' => encodequote($_REQUEST['txtbox19']), 'surveyselfieT' => encodequote($_REQUEST['txtbox20']), 'surveyselfieB' => encodequote($_REQUEST['txtbox21']));
			$json = array2json($obj);
			$sql = "UPDATE businessCustom SET messageBox= '".$json."' WHERE customPlaceId = $placeId";
		}else if($case ==8){
			$obj='';
			if($_REQUEST['check'] != ''){
				$obj = explode(',',$_REQUEST['check']);
				echo $json = array2json($obj);
			}
			$sql = "UPDATE businessCustom SET selectedItems= '".$json."' WHERE customPlaceId = $placeId";
		}else if($case ==9){
			$obj='';$json='';
			if($_REQUEST['check']){
				$obj = explode(',',$_REQUEST['check']);
				echo $json = array2json($obj);
			}
			$sql = "UPDATE businessCustom SET item2Rate= '".$json."' WHERE customPlaceId = $placeId";
		}else if($case ==10){
			$obj = array('posted'=>$_REQUEST['posted'],'percent'=>$_REQUEST['percent']);
			echo $json = array2json($obj);
			$sql = "UPDATE businessCustom SET reviewPost= '".$json."' WHERE customPlaceId = $placeId";
		}	
		mysql_query($sql) or die(mysql_error());	
		if(mysql_affected_rows()){
			//echo mysql_affected_rows();		
		}//else
			//echo 0;			
	break;
	
	case 'delImg':
		$placeId = $_REQUEST['placeId'];$id = $_REQUEST['id'];$sql='';
		$sql = "UPDATE businessImages SET path= '',title='',description='' WHERE placeId = $placeId AND id = $id";
		/*
		if($case == 1)
			$sql = "UPDATE businessPhotos SET fbImg= '' WHERE photoPlaceId = $placeId";
		else if($case == 2)
			$sql = "UPDATE businessPhotos SET webImg= '' WHERE photoPlaceId = $placeId";
		else if($case == 3)
			$sql = "UPDATE businessPhotos SET webImg2= '' WHERE photoPlaceId = $placeId";
		else if($case == 4)
			$sql = "UPDATE businessPhotos SET webImg3= '' WHERE photoPlaceId = $placeId";
		else if($case == 5)
			$sql = "UPDATE businessPhotos SET webImg4= '' WHERE photoPlaceId = $placeId";
		else if($case == 6)
			$sql = "UPDATE businessPhotos SET webImg5= '' WHERE photoPlaceId = $placeId";
		else if($case == 7)
			$sql = "UPDATE businessPhotos SET webImg6= '' WHERE photoPlaceId = $placeId";
		else if($case == 8)
			$sql = "UPDATE businessPhotos SET webImg7= '' WHERE photoPlaceId = $placeId";	
		else if($case == 9)
			$sql = "UPDATE businessPhotos SET webImg8= '' WHERE photoPlaceId = $placeId";		*/	
		mysql_query($sql) or die(mysql_error());
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}else
			echo 0;
	break;	
	case 'createTable':
		$id = $_REQUEST['placeId'];$case = $_REQUEST['case'];
		if($case > 0){
			$sql = "CREATE TABLE IF NOT EXISTS `businessplace_$id` (
			  `id` int(10) NOT NULL AUTO_INCREMENT,
			  `rated1` tinyint(1) NOT NULL,
			  `rated2` tinyint(1) NOT NULL,
			  `rated3` tinyint(1) NOT NULL,
			  `rated4` tinyint(1) NOT NULL,
			  `rated5` tinyint(1) NOT NULL,
			  `rated6` tinyint(1) NOT NULL,
			  `rated7` tinyint(1) NOT NULL,
			  `aveRate` float NOT NULL,
			  `comment` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
			  `userName` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
			  `userId` varchar(50) NOT NULL,
			  `source` varchar(5) NOT NULL,
			  `photo_url` varchar(200) NOT NULL,
			  `poorrate` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
			  `date` datetime NOT NULL,
			  PRIMARY KEY (`id`)
			) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;";
			
			$sql2 = "CREATE TABLE IF NOT EXISTS `businessCustomer_$id` (
			  `id` int(11) NOT NULL AUTO_INCREMENT,
			  `placeId` int(11) NOT NULL,
			  `userId` varchar(100) NOT NULL,
			  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
			  `email` varchar(70) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
			  `totalFriends` int(11) NOT NULL,
			  `source` tinyint(4) NOT NULL,
			  `follow` tinyint(4) NOT NULL,
			  `data` longtext NOT NULL,
			  PRIMARY KEY (`id`),
			  KEY `follow` (`follow`)
			) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";	
			mysql_query($sql);
			mysql_query($sql2);
			mysql_query("UPDATE businessCustom SET settingsItem= 1 WHERE customPlaceId = $id");
		}else{
			mysql_query("DROP TABLE IF EXISTS businessplace_$id");
			mysql_query("UPDATE businessCustom SET settingsItem= 0 WHERE customPlaceId = $id");
		}	
	break;
	case 'updatetimezone':   //Joan Villamor Timezone
		$id = $_REQUEST['groupId'];
		$timezone = $_REQUEST['timezone'];
		mysql_query("UPDATE businessUserGroup SET timezone='$timezone'  WHERE gId = '$id'");
	break;	
}
$connect->db_disconnect();
function rand_string( $length ) {
	$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";	
	$str = '';
	$size = strlen( $chars );
	for( $i = 0; $i < $length; $i++ ) {
		$str .= $chars[ rand( 0, $size - 1 ) ];
	}
	return $str;
}	

function encodequote($str){
	$str = str_replace('"','<double>',str_replace("'",'<quote>',$str));
	$str = str_replace(",",'<comma>',$str);
	return $str;
}
function htmldecode($str){
	$str = str_replace("|one","&amp;",$str);
	$str = str_replace("|two","&lt;",$str);
	$str = str_replace("|three","&gt;",$str);
	$str = str_replace("|four","&quot;",$str);
	return str_replace("|five","#",$str);
}
function greyscale($file){
	//$file = 'profile.jpg';   
	// This sets it to a .jpg, but you can change this to png or gif if that is what you are working with 
	//header('Content-type: image/jpeg');   
	// Get the dimensions 
	list($width, $height) = getimagesize($file);   
	// Define our source image 
	 $source = imagecreatefromjpeg($file);   
	 // Creating the Canvas  
	 $bwimage= imagecreate($width, $height);   
	 //Creates the 256 color palette 
	 for ($c=0;$c<256;$c++)  { $palette[$c] = imagecolorallocate($bwimage,$c,$c,$c); }  
	 //Creates yiq function 
	 function yiq($r,$g,$b)  { return (($r*0.299)+($g*0.587)+($b*0.114)); }
	//Reads the origonal colors pixel by pixel  
	for ($y=0;$y<$height;$y++)  { for ($x=0;$x<$width;$x++)  { $rgb = imagecolorat($source,$x,$y); $r = ($rgb >> 16) & 0xFF; $g = ($rgb >> 8) & 0xFF; $b = $rgb & 0xFF;  
	//This is where we actually use yiq to modify our rbg values, and then convert them to our grayscale palette 
	$gs = yiq($r,$g,$b); imagesetpixel($bwimage,$x,$y,$palette[$gs]); } }   
	// Outputs a jpg image, but you can change this to png or gif if that is what you are working with 
	//imagejpeg($bwimage); 
	imagejpeg($bwimage, $file);
	imagedestroy($source);
	return;
}
function array2json($arr) { 
   // if(function_exists('json_encode')) return json_encode($arr); //Lastest versions of PHP already has this functionality.
    $parts = array(); 
    $is_list = false; 

    //Find out if the given array is a numerical array 
    $keys = array_keys($arr); 
    $max_length = count($arr)-1; 
    if(($keys[0] == 0) and ($keys[$max_length] == $max_length)) {//See if the first key is 0 and last key is length - 1
        $is_list = true; 
        for($i=0; $i<count($keys); $i++) { //See if each key correspondes to its position 
            if($i != $keys[$i]) { //A key fails at position check. 
                $is_list = false; //It is an associative array. 
                break; 
            } 
        } 
    } 

    foreach($arr as $key=>$value) { 
        if(is_array($value)) { //Custom handling for arrays 
            if($is_list) $parts[] = array2json($value); /* :RECURSION: */ 
            else $parts[] = '"' . $key . '":' . array2json($value); /* :RECURSION: */ 
        } else { 
            $str = ''; 
            if(!$is_list) $str = '"' . $key . '":'; 

            //Custom handling for multiple data types 
            if(is_numeric($value)) $str .= $value; //Numbers 
            elseif($value === false) $str .= 'false'; //The booleans 
            elseif($value === true) $str .= 'true'; 
            else $str .= '"' . addslashes($value) . '"'; //All other things 
            // :TODO: Is there any more datatype we should be in the lookout for? (Object?) 

            $parts[] = $str; 
        } 
    } 
    $json = implode(',',$parts); 
     
    if($is_list) return '[' . $json . ']';//Return numerical JSON 
    return '{' . $json . '}';//Return associative JSON 
} 

?>
