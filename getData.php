<?php
session_start();
  //check if this is an ajax request OR user session was setting up
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || !isset($_SESSION['session'])){
	echo 'access is forbidden';
	die();
}
include_once('class/class.main.php');
$connect = new db();
$connector = new fucn();
$connect->db_connect();
$opt = $_REQUEST['opt'];
$data = array();
switch($opt){
	case 'getTransaction':
		$subscription_id = $_REQUEST['subsId'];
		$url = '/subscriptions/'. $subscription_id .'/transactions.xml?per_page=30';
		$result = $connector->sendRequest($url, $format = 'json', $method = 'GET', $data='');
		$array = array();
		if($result->code == 200){
			$objxml = simplexml_load_string($result->response);
			for($i=0;$i<count($objxml->transaction);$i++){
				$array[$i]['id'] = (int)$objxml->transaction[$i]->id;
				$date = new DateTime((string)$objxml->transaction[$i]->created_at);
				$array[$i]['created'] = $date->format('m/d/Y h:i:s A');
				$array[$i]['type'] = (string)$objxml->transaction[$i]->type;
				$array[$i]['memo'] = (string)$objxml->transaction[$i]->memo;
				$array[$i]['amount'] = (int)$objxml->transaction[$i]->amount_in_cents/100;
				$array[$i]['balance'] = (int)$objxml->transaction[$i]->ending_balance_in_cents/100;
			}
			$array = array_merge(array('response'=>$array,'code'=>$result->code));
		}else{
			$array = array('response'=>$result->response,'code'=>$result->code); 
		}
		echo json_encode($array);
	break;
	case 'getActivity':
		$subscription_id = $_REQUEST['subsId'];
		$url = '/subscriptions/'. $subscription_id .'/events.xml?per_page=30';
		$result = $connector->sendRequest($url, $format = 'json', $method = 'GET', $data='');
		$array = array();
		if($result->code == 200){
			$objxml = simplexml_load_string($result->response);
			for($i=0;$i<count($objxml);$i++){
				$array[$i]['message'] = (string)$objxml->event[$i]->message;
			}
			$array = array_merge(array('response'=>$array,'code'=>$result->code));
		}else{
			$array = array('response'=>$result->response,'code'=>$result->code); 
		}
		echo json_encode($array);
	break;
	case 'getProductPlan':
		$url = '/products.xml';
		$result = $connector->sendRequest($url, $format = 'xml', $method = 'GET', $data='');
		$array = array();
		if($result->code == 200){
			$objxml = simplexml_load_string($result->response);
			for($i=0;$i<count($objxml->product);$i++){
				setlocale(LC_MONETARY,"en_US");
				$price = money_format('%i',(int)$objxml->product[$i]->price_in_cents/100);
				$array[$i]['productId'] = (int)$objxml->product[$i]->id;
				$array[$i]['name'] = (String)$objxml->product[$i]->name;
				$array[$i]['price'] = $price;
			}
			$array = array_merge(array('response'=>$array,'code'=>$result->code));
		}else{
			$array = array('response'=>$result->response,'code'=>$result->code); 
		}
		echo json_encode($array);
	break;
	case 'donwgradeToFreeplan':
		$subscription_id = $_REQUEST['subsId'];$comp_id_prev = $_REQUEST['comp_id_prev'];$groupID = $_REQUEST['groupID'];$userId= $_REQUEST['userId'];
		$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id_prev .'.xml';
		$result = $connector->sendRequest($url, $format = 'xml', $method = 'GET', $data='');
		if($result->code == 200){
			$objxml = simplexml_load_string($result->response);
			$allocate = (int)$objxml->allocated_quantity;
			if($allocate > 0){
				$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id_prev .'/allocations.xml';
				$data = '<?xml version="1.0" encoding="UTF-8"?>
				  <allocation>
					  <quantity>0</quantity>
					  <proration_downgrade_scheme>"no-prorate"</proration_downgrade_scheme>
					   <proration_upgrade_scheme>"no-prorate"</proration_upgrade_scheme>
				  </allocation>';
				$result = $connector->sendRequest($url, $format = 'xml', $method = 'POST', $data);
				if($result->code == 201){
					mysql_query("UPDATE businessUserGroup SET addLoc=0 WHERE gId = $groupID") or die(mysql_error());
					$sql = "SELECT u.id, u.userGroupId, u.fname, u.lname, u.permission,u.email, g.credits,g.chargify_cust_id,g.expiration, g.subscription_id, g.state, g.addLoc, g.productId, g.created,g.setup,g.timezone FROM businessUsers AS u
					LEFT JOIN businessUserGroup AS g ON g.gId = u.userGroupId
					WHERE u.id =  $userId
					LIMIT 1";
					$res = mysql_query($sql);
					$rows = mysql_fetch_array($res);
					$array = array_merge(array('response'=>$rows,'code'=>$result->code));	
				}else
					$array = array('response'=>$result->response,'code'=>$result->code);
				echo json_encode($array);
			}else{
				mysql_query("UPDATE businessUserGroup SET addLoc=0 WHERE gId = $groupID") or die(mysql_error());
				$sql = "SELECT u.id, u.userGroupId, u.fname, u.lname, u.permission,u.email, g.credits,g.chargify_cust_id,g.expiration, g.subscription_id, g.state, g.addLoc, g.productId, g.created,g.setup,g.timezone FROM businessUsers AS u
				LEFT JOIN businessUserGroup AS g ON g.gId = u.userGroupId
				WHERE u.id =  $userId
				LIMIT 1";
				$res = mysql_query($sql);
				$rows = mysql_fetch_array($res);	
				$array = array_merge(array('response'=>$rows,'code'=>201));
				echo json_encode($array);
			}			
		}else{
			$array = array('response'=>$result->response,'code'=>$result->code);
			echo json_encode($array);
		}
	break;
	case 'componentUpgrade':
		$subscription_id = $_REQUEST['subsId'];$comp_id_cur= $_REQUEST['comp_id_cur'];$comp_id_prev = $_REQUEST['comp_id_prev'];
		$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id_prev .'.xml';
		$result = $connector->sendRequest($url, $format = 'xml', $method = 'GET', $data='');
		if($result->code == 200){
			$objxml = simplexml_load_string($result->response);
			$allocate = (int)$objxml->allocated_quantity;
			if($allocate > 0){
				$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id_cur .'/allocations.xml';
				$data = '<?xml version="1.0" encoding="UTF-8"?>
				  <allocation>
					  <quantity>'. $allocate .'</quantity>
					  <proration_downgrade_scheme>"no-prorate"</proration_downgrade_scheme>
					   <proration_upgrade_scheme>"no-prorate"</proration_upgrade_scheme>
				  </allocation>';
				$result = $connector->sendRequest($url, $format = 'xml', $method = 'POST', $data);
				$array = array();
				if($result->code == 201){
					$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id_prev .'/allocations.xml';
					$data = '<?xml version="1.0" encoding="UTF-8"?>
					  <allocation>
						  <quantity>0</quantity>
						  <proration_downgrade_scheme>"no-prorate"</proration_downgrade_scheme>
						   <proration_upgrade_scheme>"no-prorate"</proration_upgrade_scheme>
					  </allocation>';
					$result = $connector->sendRequest($url, $format = 'xml', $method = 'POST', $data);
					if($result->code == 201)
						$array = array('response'=>'','code'=>$result->code);	
					else
						$array = array('response'=>$result->response,'code'=>$result->code);
					echo json_encode($array); 	
				}else{
					$array = array('response'=>$result->response,'code'=>$result->code);
					echo json_encode($array);
				}		
			}else{
				$array = array('response'=>'','code'=>201);
				echo json_encode($array);
			}
		}else{
			$array = array('response'=>$result->response,'code'=>$result->code); 
			echo json_encode($array);
		}	
	break;
	case 'offlineLocation':
		$groupID = $_REQUEST['groupID'];$remove = $_REQUEST['remove'];$allocate = $_REQUEST['allocate'];$arrayPlace = array();$userId= $_REQUEST['userId'];$permission = $_REQUEST['permission'];
		$result = mysql_query("SELECT id FROM `businessList` WHERE `userGroupId` = $groupID AND `subscribe` = 1 ORDER BY id DESC");
		while($row = mysql_fetch_object($result)){$arrayPlace[] = $row->id;} 
			$total_loc_subs = count($arrayPlace) - 1;
			if($allocate < $total_loc_subs){
				$idtoremove = array();
				for($i=0;$i<($total_loc_subs > $remove ? $remove : $total_loc_subs);$i++){
					$idtoremove[] = $arrayPlace[$i];
				}
				$ids = implode(',',$idtoremove);
				mysql_query("UPDATE businessList SET subscribe=0 WHERE id IN($ids)") or die(mysql_error());
				echo getLocations($userId,$permission);
			}
	break;
	case 'removeloc':
		$subscription_id = $_REQUEST['subsId'];$remove = $_REQUEST['remove'];$groupID = $_REQUEST['groupID'];$userId= $_REQUEST['userId'];$comp_id = $_REQUEST['comp_id'];
		$addfeafield = mysql_query("SHOW COLUMNS FROM `businessUserGroup` LIKE 'removeloc'") or die(mysql_error());
		if(mysql_num_rows($addfeafield) < 1)
			mysql_query("ALTER TABLE `businessUserGroup` ADD `removeloc` TINYINT NOT NULL") or die(mysql_error());
		mysql_query("UPDATE businessUserGroup SET removeloc=".(int)$remove ." WHERE gId = $groupID") or die(mysql_error());
		$sql = "SELECT g.expiration FROM businessUsers AS u
		LEFT JOIN businessUserGroup AS g ON g.gId = u.userGroupId
		WHERE u.id =  $userId
		LIMIT 1";
		$res = mysql_query($sql);
		$rows = mysql_fetch_object($res);
		$date = new DateTime((string)$rows->expiration);
		echo json_encode(array('expiration'=>$date->format('F d, Y'),'curr'=>$remove));	

		/*
		$subscription_id = $_REQUEST['subsId'];$remove = $_REQUEST['remove'];$groupID = $_REQUEST['groupID'];$userId= $_REQUEST['userId'];$comp_id = $_REQUEST['comp_id'];
		$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id .'.xml';
		$result = $connector->sendRequest($url, $format = 'xml', $method = 'GET', $data='');
		if($result->code == 200){
			$objxml = simplexml_load_string($result->response);
			$allocate = (int)$objxml->allocated_quantity;
			$remove = $allocate - (int)$remove;
			$removeloc = ($allocate > 0 ? $remove : 0);
			$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id .'/allocations.xml';
			$data = '<?xml version="1.0" encoding="UTF-8"?>
			  <allocation>
				  <quantity>'. $removeloc .'</quantity>
				  <proration_downgrade_scheme>"no-prorate"</proration_downgrade_scheme>
				   <proration_upgrade_scheme>"no-prorate"</proration_upgrade_scheme>
			  </allocation>';
			$result = $connector->sendRequest($url, $format = 'xml', $method = 'POST', $data);
			$array = array();
			if($result->code == 201){
				$objxml = simplexml_load_string($result->response);
				mysql_query("UPDATE businessUserGroup SET addLoc=".(int)$removeloc ." WHERE gId = $groupID") or die(mysql_error());
				$sql = "SELECT u.id, u.userGroupId, u.fname, u.lname, u.permission,u.email, g.credits,g.chargify_cust_id,g.expiration, g.subscription_id, g.state, g.addLoc, g.productId, g.created,g.setup,g.timezone FROM businessUsers AS u
				LEFT JOIN businessUserGroup AS g ON g.gId = u.userGroupId
				WHERE u.id =  $userId
				LIMIT 1";
				$res = mysql_query($sql);
				$rows = mysql_fetch_array($res);	
				$array = array_merge(array('response'=>$rows,'code'=>$result->code));
				$subject = 'add new location(s) request'; 
				$body = '<p>Hi '.$rows['fname'] . ',</p>
						<p>As requested, we have to remove '. (int)$removeloc .' location(s) from your current plan.</p>
						<p>Happy-Tabluu-ing!</p>
						<p>Cheers,<br/>Tabluu Support</p>';
				sendEmail($rows['email'],$subject,$body);		
			}else
				$array = array('response'=>$result->response,'code'=>$result->code);
			echo json_encode($array); 
		}else{
			$array = array('response'=>$result->response,'code'=>$result->code); 
			echo json_encode($array);
		}	*/
	break;
	case 'addplanlocation':
		$subscription_id = $_REQUEST['subsId'];$addloc = $_REQUEST['addloc'];$groupID = $_REQUEST['groupID'];$userId= $_REQUEST['userId'];$comp_id = $_REQUEST['comp_id'];
		$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id .'.xml';
		$result = $connector->sendRequest($url, $format = 'xml', $method = 'GET', $data='');
		if($result->code == 200){
			$objxml = simplexml_load_string($result->response);
			$addloc = (int)$objxml->allocated_quantity + (int)$addloc;
			$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id .'/allocations.xml';
			$data = '<?xml version="1.0" encoding="UTF-8"?>
			  <allocation>
				  <quantity>'. $addloc .'</quantity>
				  <proration_downgrade_scheme>"no-prorate"</proration_downgrade_scheme>
				   <proration_upgrade_scheme>"no-prorate"</proration_upgrade_scheme>
			  </allocation>';
			$result = $connector->sendRequest($url, $format = 'xml', $method = 'POST', $data);
			$array = array();
			if($result->code == 201){
				$objxml = simplexml_load_string($result->response);
				mysql_query("UPDATE businessUserGroup SET addLoc=".(int)$addloc ." WHERE gId = $groupID") or die(mysql_error());
				$sql = "SELECT u.id, u.userGroupId, u.fname, u.lname, u.permission,u.email, g.credits,g.chargify_cust_id,DATE_FORMAT(g.expiration,'%M %d, %Y') as expiration, g.subscription_id, g.state, g.addLoc, g.productId, g.created,g.setup,g.timezone FROM businessUsers AS u
				LEFT JOIN businessUserGroup AS g ON g.gId = u.userGroupId
				WHERE u.id =  $userId
				LIMIT 1";
				$res = mysql_query($sql);
				$rows = mysql_fetch_array($res);
				//$date = new DateTime($rows['expiration']);
				//$rows['expiration'] = $date->format('F d, Y');				
				$array = array_merge(array('response'=>$rows,'code'=>$result->code));
				$subject = 'add new location(s) request'; 
				$body = '<p>Hi '.$rows['fname'] . ',</p>
						<p>As requested, we have to add '. (int)$addloc .' location(s) from your current plan.</p>
						<p>Happy-Tabluu-ing!</p>
						<p>Cheers,<br/>Tabluu Support</p>';
				sendEmail($rows['email'],$subject,$body);		
			}else
				$array = array('response'=>$result->response,'code'=>$result->code); 
			echo json_encode($array); 
		}else{
			$array = array('response'=>(string)$result->response,'code'=>$result->code); 
			echo json_encode($array);
		}	
	break;
	case 'cancelplan':
		$subscription_id = $_REQUEST['subsId'];
		$data = '<?xml version="1.0" encoding="UTF-8"?>
		  <subscription>
			<cancel_at_end_of_period>1</cancel_at_end_of_period>
			<cancellation_message>
				Canceling the subscription at the end of the period
			</cancellation_message>
		  </subscription>';
		 $url = '/subscriptions/'. $subscription_id .'.xml'; // downgrade/downgrade delay 
		$result = $connector->sendRequest($url, $format = 'xml', $method = 'PUT', $data);
		if($result->code == 200){
			$objxml = simplexml_load_string($result->response);
			
			$date = new DateTime((string)$objxml->current_period_ends_at);
			$array = array_merge(array('response'=>$date->format('F d, Y'),'code'=>$result->code));
	   }else
			$array = array('response'=>(string)$result->response,'code'=>$result->code); 
		echo json_encode($array);
	break;
	case 'planreactivate':
		$subscription_id = $_REQUEST['subsId'];
		 $url = '/subscriptions/'. $subscription_id .'/reactivate.xml'; // downgrade/downgrade delay 
		$result = $connector->sendRequest($url, $format = 'xml', $method = 'PUT', '');
		if($result->code == 200){
			$objxml = simplexml_load_string($result->response);
			$state = (string)$objxml->state;
			mysql_query("UPDATE businessUserGroup SET state='$state',expiration='".(string)$objxml->current_period_ends_at."' WHERE subscription_id = $subscription_id") or die(mysql_error());
			$array = array('response'=>$result->response,'code'=>$result->code);
	   }else
			$array = array('response'=>(string)$result->response,'code'=>$result->code); 
		echo json_encode($array);
	break;
	case 'changeplandelay':
		$subscription_id = $_REQUEST['subsId'];$productIdToChange = $_REQUEST['productIdTochange'];
		$url = '/products/'. $productIdToChange .'.xml';
		$result = $connector->sendRequest($url, $format = 'xml', $method = 'GET', $data);
		$array = array();
		if($result->code == 200){
			$objxml = simplexml_load_string($result->response);
			$handle = $objxml->handle;
			$data = '<?xml version="1.0" encoding="UTF-8"?>
			  <subscription>
				<product_handle>'.$handle.'</product_handle>
				<product_change_delayed>true</product_change_delayed>
			  </subscription>';
			 $url = '/subscriptions/'. $subscription_id .'.xml'; // downgrade/downgrade delay 
			$result = $connector->sendRequest($url, $format = 'xml', $method = 'PUT', $data);
			$objxml = simplexml_load_string($result->response);
			$date = new DateTime((string)$objxml->current_period_ends_at);
			$array = array_merge(array('response'=>$date->format('F d, Y'),'code'=>$result->code));
		}else
			$array = array('response'=>$result->response,'code'=>$result->code); 
		echo json_encode($array);
	break;
	case 'changeplan':
		$subscription_id = $_REQUEST['subsId'];$productIdToChange = $_REQUEST['productIdTochange'];$groupID = $_REQUEST['groupID'];$userId= $_REQUEST['userId'];$currentPlan = $_REQUEST['currentPlan'];$newplan = $_REQUEST['newplan'];$comp_id = $_REQUEST['comp_id'];
		$url = '/subscriptions/'. $subscription_id .'/migrations.xml';
		//$url = '/subscriptions/7083257/migrations.xml';
		$data = '<?xml version="1.0" encoding="UTF-8"?><migration><product_id>'. $productIdToChange .'</product_id></migration>'; 
		$result = $connector->sendRequest($url, $format = 'xml', $method = 'POST', $data);
		$array = array();
		if($result->code == 200){
			$objxml = simplexml_load_string($result->response);
			mysql_query("UPDATE businessUserGroup SET productId=".(int)$objxml->product->id.",expiration='".(string)$objxml->current_period_ends_at."' WHERE gId = $groupID") or die(mysql_error());
			$sql = "SELECT u.id, u.userGroupId, u.fname, u.lname, u.permission,u.email, g.credits,g.chargify_cust_id,g.expiration, g.subscription_id, g.state, g.addLoc, g.productId, g.created,g.setup,g.timezone FROM businessUsers AS u
			LEFT JOIN businessUserGroup AS g ON g.gId = u.userGroupId
			WHERE u.id =  $userId
			LIMIT 1";
			$res = mysql_query($sql);
			$rows = mysql_fetch_array($res);
			$date = new DateTime($rows['expiration']);
			$rows['expiration'] = $date->format('F d, Y');
			$array = array('response'=>$rows,'code'=>200);
			echo json_encode($array);
			$subject = 'Your Tabluu plan is changed from '.$currentPlan.' to '.$newplan; 
			$body = '<p>Hi '.$rows['fname'] . ',</p>
					<p>As requested, we have changed your Tabluu plan from '.$currentPlan.' to '.$newplan.'. This change is effective immediately.</p>
					<p>Happy-Tabluu-ing!</p>
					<p>Cheers,<br/>Tabluu Support</p>';
			sendEmail($rows['email'],$subject,$body);	
		}else{
			$array = array('response'=>$result->response,'code'=>$result->code); 
			echo json_encode($array);
		}
	break;
	case 'getImages':
		$placeId = $_REQUEST['placeId'];
		$result = mysql_query("SELECT id,placeId,path,title,description,name FROM businessImages AS ps WHERE placeId = $placeId LIMIT 10") or die(mysql_error());
		if(mysql_num_rows($result)){
			$imagesArray = array();
			while($row = mysql_fetch_object($result)){
				$imagesArray[$row->name]['id'] = $row->id;
				$imagesArray[$row->name]['path'] = $row->path;
				$imagesArray[$row->name]['title'] = $row->title;
				$imagesArray[$row->name]['desc'] = $row->description;
			}
			echo json_encode($imagesArray);
		}else
			echo 0;
	break;
	case 'getCustom': 
		$placeId = $_REQUEST['key'];
		$result = mysql_query("SELECT id,placeId,path,title,description,name FROM businessImages AS ps WHERE placeId = $placeId LIMIT 10") or die(mysql_error());
		$imagesArray = array('fbImg'=>'','webImg'=>'','webImg2'=>'','webImg3'=>'','webImg4'=>'','webImg5'=>'','webImg6'=>'','webImg7'=>'','webImg8'=>'');
		if(mysql_num_rows($result)){
			while($row = mysql_fetch_object($result)){
				$imagesArray[$row->name] = $row->path;
			}
		}else{
			$result = mysql_query("SELECT ps.fbImg, ps.webImg, ps.webImg2, ps.webImg3, ps.webImg4, ps.webImg5, ps.webImg6, ps.webImg7, ps.webImg8 FROM businessPhotos AS ps WHERE ps.photoPlaceId = $placeId") or die(mysql_error());
			$row = mysql_fetch_object($result);
			mysql_query("INSERT INTO businessImages (placeId,path,name) VALUES($placeId,'".$row->fbImg."','fbImg'),($placeId,'".$row->webImg."','webImg'),($placeId,'".$row->webImg2."','webImg2'),($placeId,'".$row->webImg3."','webImg3'),($placeId,'".$row->webImg4."','webImg4'),($placeId,'".$row->webImg5."','webImg5'),($placeId,'".$row->webImg6."','webImg6'),($placeId,'".$row->webImg7."','webImg7'),($placeId,'".$row->webImg8."','webImg8')") or die(mysql_error());
			$imagesArray['fbImg'] = $row->fbImg;$imagesArray['webImg'] = $row->webImg;$imagesArray['webImg2'] = $row->webImg2;$imagesArray['webImg3'] = $row->webImg3;$imagesArray['webImg4'] = $row->webImg4;$imagesArray['webImg5'] = $row->webImg5;$imagesArray['webImg6'] = $row->webImg6;$imagesArray['webImg7'] = $row->webImg7;$imagesArray['webImg8'] = $row->webImg8; 
		}
		
		$sql = "SELECT p.profilePlaceId, p.businessName, p.nicename, p.category, p.address, p.longitude,p.latitude, p.city, p.country, p.zip, p.contactNo, p.facebookURL, p.websiteURL, p.showmap, p.email, p.booknow, l.subscribe, g.email as gmail, d.description, o.opening, c.messageBox,c.item2Rate,c.settingsItem,c.selectedItems,c.button,c.backgroundImg,c.reviewPost,c.logo,c.backgroundcolor,c.backgroundFont,c.ratingText,c.fbpost,c.email_alert,c.printvalue,c.optsocialpost FROM businessList AS l
		LEFT JOIN businessProfile AS p ON p.profilePlaceId = l.id
		LEFT JOIN businessDescription AS d ON d.descPlaceId = l.id
		LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId
		LEFT JOIN businessOpeningHours AS o ON o.openingPlaceId = l.id
		LEFT JOIN businessCustom AS c ON c.customPlaceId = l.id
		WHERE l.id =  $placeId
		LIMIT 1";
		$result = mysql_query($sql) or die(mysql_error());
		
		echo json_encode(array_merge(mysql_fetch_array($result),$imagesArray)); 
	break;
	case 'getReviewProduct': 
		$placeId = $_REQUEST['placeId'];
		$sql = "SELECT p.nicename,g.productId FROM businessList AS l
		LEFT JOIN businessProfile AS p ON p.profilePlaceId = l.id
		LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId
		WHERE l.id =  $placeId
		LIMIT 1";
		$result = mysql_query($sql) or die(mysql_error());
		echo json_encode(mysql_fetch_array($result)); 
	break;
	case 'widgetReview':
		$placeId = $_REQUEST['placeId'];
		$hadTable = $connect->tableIsExist('businessplace_'.$placeId);
		if($hadTable){
		$sql = "SELECT c.item2Rate,c.selectedItems,c.reviewPost,c.logo FROM businessCustom AS c WHERE c.customPlaceId = $placeId LIMIT 1";
		$result1 = mysql_query($sql) or die(mysql_error());
		$row = mysql_fetch_object($result1);
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
			$offset = $_REQUEST['offset'];$limit = $_REQUEST['limit'];
			$array_Average = array();$array_featured = array();$array_notfeatured = array();$i=0;	
			
			$resultAve = mysql_query("SELECT count(id) as totalAvg ,AVG(aveRate) as totalReviews FROM businessplace_$placeId WHERE source = 'fb' ORDER BY id DESC LIMIT 1");
			$rowrate = mysql_fetch_object($resultAve);
			$array_Average = array('totalavg'=>round($rowrate->totalReviews,1),'totalrev'=>$rowrate->totalAvg);
			$resultFeature =  mysql_query("SELECT * FROM businessplace_$placeId WHERE feature = 1 AND source = 'fb' ORDER BY date DESC LIMIT $offset,$limit") or die(mysql_error());
			if( mysql_num_rows($resultFeature)){	
				$i=0;
				while($rowrate = mysql_fetch_object($resultFeature)){
					//if(file_exists($rowrate->photo_url))
						//$connect->rotateImages($rowrate->photo_url);
					$ave = explode(".",$rowrate->aveRate);
					$style='';
					if((int)$rowrate->aveRate == 0)
						$style='width:0px';
					if($rowrate->aveRate >= 1 && $rowrate->aveRate < 2){
						if(count($ave) > 1){
							$dec = "0.".$ave[1];					
							$width = 20 + ($dec * 20); 
							$style = 'width:'.$width.'px;';	
						}else
							$style = "width:20px;";	
					}
					if($rowrate->aveRate >= 2 && $rowrate->aveRate < 3){
						if(count($ave) > 1){
							$dec = "0.".$ave[1];					
							$width = 41 + ($dec * 20); 
							$style = 'width:'.$width.'px;';	
						}else
							$style = "width:40px;";	
					}
					if($rowrate->aveRate >= 3 && $rowrate->aveRate < 4){
						if(count($ave) > 1){
							$dec = "0.".$ave[1];					
							$width = 64 + ($dec * 20); 
							$style = 'width:'.$width.'px;';	
						}else
							$style = "width:65px;";	
					}
					if($rowrate->aveRate >= 4 && $rowrate->aveRate < 5){
						if(count($ave) > 1){
							$dec = "0.".$ave[1];					
							$width = 85 + ($dec * 20); 
							$style = 'width:'.$width.'px;';	
						}else
							$style = "width:86px;";	
					}
					$array_featured[$i]['rated1'] = $rowrate->rated1;
					$array_featured[$i]['rated2'] = $rowrate->rated2;
					$array_featured[$i]['rated3'] = $rowrate->rated3;
					$array_featured[$i]['rated4'] = $rowrate->rated4;
					$array_featured[$i]['rated5'] = $rowrate->rated5;
					$array_featured[$i]['rated6'] = $rowrate->rated6;
					$array_featured[$i]['rated7'] = $rowrate->rated7;
					$array_featured[$i]['aveRate'] = $rowrate->aveRate;
					$array_featured[$i]['comment'] = $rowrate->comment;
					$array_featured[$i]['name'] = $rowrate->userName;
					$array_featured[$i]['fbId'] = $rowrate->userId;
					$array_featured[$i]['url'] = $rowrate->photo_url;
					$array_featured[$i]['style'] = $style;
					$array_featured[$i]['feature'] = ($rowrate->feature != null ? $rowrate->feature : 0);
					$array_featured[$i]['hideimg'] = ($rowrate->hideimg != null ? $rowrate->hideimg : 0);
					$array_featured[$i++]['comment'] = $rowrate->comment;
				}
			}
			$resultFeature =  mysql_query("SELECT * FROM businessplace_$placeId WHERE feature = 0 AND source = 'fb' ORDER BY date DESC LIMIT $offset,$limit") or die(mysql_error());
			if( mysql_num_rows($resultFeature)){	
				$i=0;
				while($rowrate = mysql_fetch_object($resultFeature)){
					$ave = explode(".",$rowrate->aveRate);
					$style='';
					if((int)$rowrate->aveRate == 0)
						$style='width:0px';
					if($rowrate->aveRate >= 1 && $rowrate->aveRate < 2){
						if(count($ave) > 1){
							$dec = "0.".$ave[1];					
							$width = 21 + ($dec * 18); 
							$style = 'width:'.$width.'px;';	
						}else
							$style = "width:25px;";		
					}
					if($rowrate->aveRate >= 2 && $rowrate->aveRate < 3){
						if(count($ave) > 1){
							$dec = "0.".$ave[1];					
							$width = 42 + ($dec * 18); 
							$style = 'width:'.$width.'px;';	
						}else
							$style = "width:50px;";
					}
					if($rowrate->aveRate >= 3 && $rowrate->aveRate < 4){
						if(count($ave) > 1){
							$dec = "0.".$ave[1];					
							$width = 77 + ($dec * 25); 
							$style = 'width:'.$width.'px;';	
						}else
							$style = "width:75px;";	
					}
					if($rowrate->aveRate >= 4 && $rowrate->aveRate < 5){
						if(count($ave) > 1){
							$dec = "0.".$ave[1];					
							$width = 103 + ($dec * 25); 
							$style = 'width:'.$width.'px;';	
						}else
							$style = "width:100px;";
					}
					$array_notfeatured[$i]['rated1'] = $rowrate->rated1;
					$array_notfeatured[$i]['rated2'] = $rowrate->rated2;
					$array_notfeatured[$i]['rated3'] = $rowrate->rated3;
					$array_notfeatured[$i]['rated4'] = $rowrate->rated4;
					$array_notfeatured[$i]['rated5'] = $rowrate->rated5;
					$array_notfeatured[$i]['rated6'] = $rowrate->rated6;
					$array_notfeatured[$i]['rated7'] = $rowrate->rated7;
					$array_notfeatured[$i]['aveRate'] = $rowrate->aveRate;
					$array_notfeatured[$i]['comment'] = $rowrate->comment;
					$array_notfeatured[$i]['name'] = $rowrate->userName;
					$array_notfeatured[$i]['fbId'] = $rowrate->userId;
					$array_notfeatured[$i]['url'] = $rowrate->photo_url;
					$array_notfeatured[$i]['aveRate'] = $rowrate->aveRate;
					$array_notfeatured[$i]['style'] = $style;
					$array_notfeatured[$i]['feature'] = ($rowrate->feature != null ? $rowrate->feature : 0);
					$array_notfeatured[$i]['hideimg'] = ($rowrate->hideimg != null ? $rowrate->hideimg : 0);
					$array_notfeatured[$i++]['comment'] = $rowrate->comment;
				}
			}
			echo json_encode(array_merge(array('featured'=>$array_featured),array('notfeatured'=>$array_notfeatured),array('ratequestion'=>$ratingTextTemp),array('average'=>$array_Average)));
		}else
			echo 0;
	break;
	case 'getrate':
		$nice = $_REQUEST['nice'];
		$sql = "SELECT c.customPlaceId as placeId,p.profilePlaceId, p.businessName, p.nicename, p.category, p.address, p.city, p.country, p.zip, p.contactNo, p.showmap,c.messageBox,c.item2Rate,c.settingsItem,c.selectedItems,c.button,c.backgroundImg,c.reviewPost,c.logo,c.backgroundcolor,c.backgroundFont,c.ratingText,c.fbpost,c.email_alert,g.state,g.productId,l.subscribe,c.optsocialpost FROM businessProfile AS p
		LEFT JOIN businessCustom AS c ON c.customPlaceId = p.profilePlaceId
		LEFT JOIN businessList AS l ON l.id = p.profilePlaceId
		LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId
		WHERE p.nicename =  '$nice'
		LIMIT 1";
		$result1 = mysql_query($sql);
		$a1 = mysql_fetch_array($result1);
		$result = mysql_query("SELECT path FROM businessImages AS ps WHERE placeId = ".$a1['placeId']." AND name = 'fbImg' LIMIT 1") or die(mysql_error());
		$imagesArray = array();
		if(mysql_num_rows($result)){
			$row = mysql_fetch_object($result);
			$imagesArray['fbImg'] = $row->path;
		}else{
			$result = mysql_query("SELECT ps.fbImg, ps.webImg, ps.webImg2, ps.webImg3, ps.webImg4, ps.webImg5, ps.webImg6, ps.webImg7, ps.webImg8 FROM businessPhotos AS ps WHERE ps.photoPlaceId = $placeId") or die(mysql_error());
			$row = mysql_fetch_object($result);
			mysql_query("INSERT INTO businessImages (placeId,path,name) VALUES($placeId,'".$row->fbImg."','fbImg'),($placeId,'".$row->webImg."','webImg'),($placeId,'".$row->webImg2."','webImg2'),($placeId,'".$row->webImg3."','webImg3'),($placeId,'".$row->webImg4."','webImg4'),($placeId,'".$row->webImg5."','webImg5'),($placeId,'".$row->webImg6."','webImg6'),($placeId,'".$row->webImg7."','webImg7'),($placeId,'".$row->webImg8."','webImg8')") or die(mysql_error());
			$imagesArray['fbImg'] = $row->fbImg;
		}
		echo json_encode(array_merge($a1,$imagesArray));
		//print_r(mysql_fetch_object($result));
		//echo json_encode(mysql_fetch_ob($result));
	break;	
	case 'getFeedbackUser':
		$placeId = $_REQUEST['key'];
		$sql = "SELECT p.nicename,g.timezone,l.setup FROM businessList AS l
		LEFT JOIN businessUserGroup as g ON g.gId = l.userGroupId
		LEFT JOIN businessProfile AS p ON p.profilePlaceId = l.id
		WHERE l.id =  $placeId
		LIMIT 1";
		$result = mysql_query($sql);
		echo json_encode(mysql_fetch_array($result));		
	break;
	case 'getUser':
		$userId = $_REQUEST['key'];
		$sql = "SELECT u.id, u.userGroupId, u.fname, u.lname, u.permission,u.email, g.credits,g.chargify_cust_id,DATE_FORMAT(g.expiration,'%M %d, %Y') as expiration, g.subscription_id, g.state, g.addLoc, g.productId, g.created,g.setup,g.timezone FROM businessUsers AS u
		LEFT JOIN businessUserGroup AS g ON g.gId = u.userGroupId
		WHERE u.id =  $userId
		LIMIT 1";
		$result = mysql_query($sql) or die(mysql_error());
		$row = mysql_fetch_array($result);
		//$date = new DateTime($row['expiration']);
		//$row['expiration'] = $date->format('F d, Y');	
		echo json_encode($row);	
	break;
	case 'listuser':
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
	case 'getFeedback':
		$placeId = $_REQUEST['placeId'];$case = $_REQUEST['case'];$start = $_REQUEST['start'];$offset = $_REQUEST['offset'];
		$hadtable = mysql_num_rows(mysql_query("SHOW TABLES LIKE 'businessplace_$placeId'"));
		$feedarray = array();
		if($hadtable){
			if($case == 0){
				$sql = "SELECT * FROM businessplace_$placeId WHERE source = 'fb' ORDER BY date DESC LIMIT $start,$offset";
			}if($case == 1)
				$sql = "SELECT * FROM businessplace_$placeId WHERE source <> 'fb' ORDER BY date DESC LIMIT $start,$offset";
			if($case == 2){
				$addhidefield = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'hideimg'") or die(mysql_error());
				if(mysql_num_rows($addhidefield) < 1)
					mysql_query("ALTER TABLE `businessplace_$placeId` ADD `hideimg` TINYINT NOT NULL") or die(mysql_error());
				$addfeafield = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'feature'") or die(mysql_error());
				if(mysql_num_rows($addfeafield) < 1) 
					mysql_query("ALTER TABLE `businessplace_$placeId` ADD `feature` TINYINT NOT NULL") or die(mysql_error());
				$sql = "SELECT * FROM businessplace_$placeId WHERE feature = 1 ORDER BY date DESC LIMIT $start,$offset";
			}		
			$result =  mysql_query($sql);
			if(mysql_num_rows($result)){
				$i=0;
				while($row = mysql_fetch_object($result)){
				 	$feedarray[$i]['id'] = $row->id;
					$feedarray[$i]['rated1'] = $row->rated1;
					$feedarray[$i]['rated2'] = $row->rated2;
					$feedarray[$i]['rated3'] = $row->rated3;
					$feedarray[$i]['rated4'] = $row->rated4;
					$feedarray[$i]['rated5'] = $row->rated5;
					$feedarray[$i]['rated6'] = $row->rated6;
					$feedarray[$i]['rated7'] = $row->rated7;
					$feedarray[$i]['aveRate'] = $row->aveRate;
					$feedarray[$i]['comment'] = $row->comment;
					$feedarray[$i]['name'] = $row->userName;
					$feedarray[$i]['fbId'] = $row->userId;
					$feedarray[$i]['url'] = $row->photo_url;
					$feedarray[$i]['feature'] = ($row->feature != null ? $row->feature : 0);
					$feedarray[$i]['hideimg'] = ($row->hideimg != null ? $row->hideimg : 0);
					$feedarray[$i++]['created'] = $row->date;
					
				}
				echo json_encode($feedarray);
			}else
				echo 0;
		}else
			echo 0;
	break;
	case 'getReviewtAverage':
		$placeId = $_REQUEST['placeId'];
		$resultAve = mysql_query("SELECT count(id) as totalAvg ,AVG(aveRate) as totalReviews FROM businessplace_$placeId WHERE source = 'fb' ORDER BY id DESC LIMIT 1");
		$row = mysql_fetch_object($resultAve);
		$ave = explode(".",$row->totalReviews);
		$style='';
		//if($rowrate->aveRate < 1)
			//$style='width:0px';
		if($row->totalReviews >= 1 && $row->totalReviews < 2){
			if(count($ave) > 1){
				$dec = "0.".$ave[1];					
				$width = 20 + ($dec * 20); 
				$style = 'width:'.$width.'px;';	
			}else
				$style = "width:20px;";	
		}
		if($row->totalReviews >= 2 && $row->totalReviews < 3){
			if(count($ave) > 1){
				$dec = "0.".$ave[1];					
				$width = 41 + ($dec * 20); 
				$style = 'width:'.$width.'px;';	
			}else
				$style = "width:40px;";	
		}
		if($row->totalReviews >= 3 && $row->totalReviews < 4){
			if(count($ave) > 1){
				$dec = "0.".$ave[1];					
				$width = 64 + ($dec * 20); 
				$style = 'width:'.$width.'px;';	
			}else
				$style = "width:65px;";	
		}
		if($row->totalReviews >= 4 && $row->totalReviews < 5){
			if(count($ave) > 1){
				$dec = "0.".$ave[1];					
				$width = 85 + ($dec * 20); 
				$style = 'width:'.$width.'px;';	
			}else
				$style = "width:86px;";	
		}
		echo json_encode(array('totalavg'=>round($row->totalReviews,1),'totalrev'=>$row->totalAvg,'style'=>$style));
	break;
	case 'getWedgetFeedback':
		$placeId = $_REQUEST['placeId'];$start = $_REQUEST['start'];$offset = $_REQUEST['offset'];
		$hadtable = mysql_num_rows(mysql_query("SHOW TABLES LIKE 'businessplace_$placeId'"));
		$feedarray = array();
		if($hadtable){
			$addhidefield = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'hideimg'") or die(mysql_error());
			if(mysql_num_rows($addhidefield) < 1)
				mysql_query("ALTER TABLE `businessplace_$placeId` ADD `hideimg` TINYINT NOT NULL") or die(mysql_error());
			$addfeafield = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'feature'") or die(mysql_error());
			if(mysql_num_rows($addfeafield) < 1) 
				mysql_query("ALTER TABLE `businessplace_$placeId` ADD `feature` TINYINT NOT NULL") or die(mysql_error());
			$sql = "SELECT * FROM businessplace_$placeId WHERE source = 'fb' ORDER BY feature DESC,date DESC LIMIT $start,$offset";
			$result =  mysql_query($sql);
			if(mysql_num_rows($result)){
				$i=0;
				while($row = mysql_fetch_object($result)){
					$ave = explode(".",$row->aveRate);
					$style='';
					//if($rowrate->aveRate < 1)
						//$style='width:0px';
					if($row->aveRate >= 1 && $row->aveRate < 2){
						if(count($ave) > 1){
							$dec = "0.".$ave[1];					
							$width = 20 + ($dec * 20); 
							$style = 'width:'.$width.'px;';	
						}else
							$style = "width:20px;";	
					}
					if($row->aveRate >= 2 && $row->aveRate < 3){
						if(count($ave) > 1){
							$dec = "0.".$ave[1];					
							$width = 41 + ($dec * 20); 
							$style = 'width:'.$width.'px;';	
						}else
							$style = "width:40px;";	
					}
					if($row->aveRate >= 3 && $row->aveRate < 4){
						if(count($ave) > 1){
							$dec = "0.".$ave[1];					
							$width = 64 + ($dec * 20); 
							$style = 'width:'.$width.'px;';	
						}else
							$style = "width:65px;";	
					}
					if($row->aveRate >= 4 && $row->aveRate < 5){
						if(count($ave) > 1){
							$dec = "0.".$ave[1];					
							$width = 85 + ($dec * 20); 
							$style = 'width:'.$width.'px;';	
						}else
							$style = "width:86px;";	
					}
				 	$feedarray[$i]['id'] = $row->id;
					$feedarray[$i]['rated1'] = $row->rated1;
					$feedarray[$i]['rated2'] = $row->rated2;
					$feedarray[$i]['rated3'] = $row->rated3;
					$feedarray[$i]['rated4'] = $row->rated4;
					$feedarray[$i]['rated5'] = $row->rated5;
					$feedarray[$i]['rated6'] = $row->rated6;
					$feedarray[$i]['rated7'] = $row->rated7;
					$feedarray[$i]['aveRate'] = $row->aveRate;
					$feedarray[$i]['comment'] = $row->comment;
					$feedarray[$i]['name'] = $row->userName;
					$feedarray[$i]['fbId'] = $row->userId;
					$feedarray[$i]['style'] = $style;
					$feedarray[$i]['url'] = $row->photo_url;
					$feedarray[$i]['feature'] = ($row->feature != null ? $row->feature : 0);
					$feedarray[$i++]['hideimg'] = ($row->hideimg != null ? $row->hideimg : 0);
					
				}
				echo json_encode($feedarray);
			}else
				echo json_encode($feedarray);
		}else
			echo json_encode($feedarray);
	break;
	case 'getQuestion':
		$placeId = $_REQUEST['placeId'];
		$sql = "SELECT c.item2Rate,c.selectedItems FROM businessCustom AS c 
		WHERE c.customPlaceId = $placeId
		LIMIT 1";
		$result = mysql_query($sql) or die(mysql_error());
		$row = mysql_fetch_object($result);
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
		echo json_encode($ratingTextTemp);
	break;
	case 'removeuser':
		$userId = $_REQUEST['userId'];$groupID = $_REQUEST['groupID'];$list=array();$i=0;
		$sql = "DELETE FROM businessUsers WHERE id = $userId";
		$result = mysql_query($sql);
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
	case 'getEmail':
		$email = $_REQUEST['email'];
		$sql = "SELECT id FROM businessUsers
		WHERE email =  '$email'";
		$result = mysql_query($sql);
		if(mysql_num_rows($result))
			echo 1;
		else	
			echo 0;
	break;
	case 'login':
		//session_start();
		include_once('class/class.cookie.php');
		$email = $_REQUEST['email'];
		$pwd = $_REQUEST['pwd'];
		$sql = "SELECT u.id FROM businessUsers as u LEFT JOIN businessUserGroup as g ON g.gId = u.userGroupId
		WHERE u.email =  '$email' AND u.pwd = '$pwd' AND g.suspend = 0";
		$result = mysql_query($sql);
		if(mysql_num_rows($result)){
			$row = mysql_fetch_object($result);
			$cookie = new cookie();
			$cookie->setCookie( $row->id );
			echo 1;	
		}else	
			echo 0;
	break;
	case 'resetpwd':
		$email = $_REQUEST['email'];
		$randString = rand_string( 6 );
		$str = md5($randString);
		$sql = "UPDATE `businessUsers` SET pwd = '$str' WHERE email='$email'";
		mysql_query($sql);
		$sql2 = "SELECT fname FROM `businessUsers` WHERE email='$email'";
		$result = mysql_query($sql2);
		$row = mysql_fetch_object($result);		
		$subject = 'Tabluu.com - reset password';	
		$body="";
		$body = 'Hi '. $row->fname .',

			<p>Your temporary password: '.$randString.'</p>

			<p>You may change the password provided by updating the User Admin section.</p>

			<p>Thank you!<br/>
			Tabluu Support</p>';
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
		$mail->AddAddress("support@tabluu.com");
		$mail->AddAddress($email);
		$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
		$mail->IsHTML(true);                                  // Set email format to HTML
		$mail->Subject = $subject;
		$mail->Body    = $body;
		$mail->AltBody = $body;
		if(!$mail->Send()) {
		   echo 0;
		   exit;
		}		*/	
		require_once 'class/class.phpmailer2.php';
		$mail = new PHPMailer;
		$mail->IsAmazonSES();//$connect->aws_access_key_id;
		$mail->AddAmazonSESKey('AKIAITTJTNGQSODBXOJQ', 'o48bdVxr2u1gBvag6SyqH3acR27wpgxTEnrPWTJb');                            // Enable SMTP authentication
		$mail->CharSet	  =	"UTF-8";                      // SMTP secret 
		$mail->From = 'support@tabluu.com';
		$mail->FromName = 'Tabluu Support';
		$mail->Subject = $subject;
		$mail->AltBody = $body;
		$mail->Body = $body;
		$mail->AddAddress($email); 
		$mail->addBCC("support@tabluu.com"); 
		$mail->Send();
	break;
	case 'getLoc':
		$arrayPlace = array();$array=array();$i=0;
		$userId = $_REQUEST['key'];$permission = $_REQUEST['permission'];
		echo getLocations($userId,$permission);
	break;
	case 'getFollower':
		$groupId = $_REQUEST['id'];
		$locResult = mysql_query(" SELECT id,businessName
			FROM businessList WHERE userGroupId = $groupId
		");
		$arrayID = array();  
		while($row = mysql_fetch_object($locResult)){
		   $placeId = $row->id;
		   $hadTable = mysql_num_rows(mysql_query("SHOW TABLES LIKE 'businessCustomer_$placeId'"));
		   if($hadTable){
				$arrayID[] = $placeId;
		   }
		} 
		$sql='';
		$totalnum=0;
		$array_obj;
		for($i=0;$i<count($arrayID);$i++){
			$placeId2 = $arrayID[$i];
				$sql = "SELECT count(id) as total FROM businessCustomer_$placeId2 WHERE follow = 1";
				$row =  mysql_fetch_object(mysql_query($sql));
				$totalnum = $totalnum + $row->total;
				if($row->total)
					$array_obj[$placeId2][] = $row->total;
		}
		$array_obj['totalnum'][] = $totalnum;
		echo json_encode($array_obj);
	break;
	case 'statistic':
		$day = $_REQUEST['interval'];
		$placeId = $_REQUEST['placeId'];
		$hadTable = mysql_num_rows(mysql_query("SHOW TABLES LIKE 'businessplace_$placeId'"));
		if($hadTable){
			if($_REQUEST['day'] < 1){
				$sql ="SELECT COUNT( id ) AS totalReview 
				FROM businessplace_$placeId
				WHERE  `date` >= CURDATE()";
				$result = mysql_query($sql);
				if(mysql_num_rows($result)){
					$row = mysql_fetch_object($result);
					$data['totalReview']	= $row->totalReview;
				}
				$sql ="SELECT count(id) as totalShare, AVG(`rated1`) as rate1, AVG(`rated2`) as rate2, AVG(`rated3`) as rate3, AVG(`rated4`) as rate4, AVG(`rated5`) as rate5, AVG(`rated6`) as rate6, AVG(`rated7`) as rate7
					FROM businessplace_$placeId
				WHERE  `date` >= CURDATE() AND `source` =  'fb'";
				$result = mysql_query($sql);
				if(mysql_num_rows($result)){
					$row = mysql_fetch_object($result);
					$data['srate1']	= number_format(($row->rate1 == null ? 0 : $row->rate1),1);
					$data['srate2']	= number_format(($row->rate2 == null ? 0 : $row->rate2),1);
					$data['srate3']	= number_format(($row->rate3 == null ? 0 : $row->rate3),1);
					$data['srate4']	= number_format(($row->rate4 == null ? 0 : $row->rate4),1);
					$data['srate5']	= number_format(($row->rate5 == null ? 0 : $row->rate5),1);
					$data['srate6']	= number_format(($row->rate6 == null ? 0 : $row->rate6),1);
					$data['srate7']	= number_format(($row->rate7 == null ? 0 : $row->rate7),1);
					$data['totalShare']	= $row->totalShare;
					$Share=0;
					if($row->totalShare){
						$Share = ($row->totalShare/$data['totalReview'])*100;	
						if(strstr($Share, '.'))
							$Share = number_format($Share,1);
					}
					$data['percent'] = $Share;			
				}
				$sql ="SELECT count(id) as totalNoShare, AVG(`rated1`) as rate1, AVG(`rated2`) as rate2, AVG(`rated3`) as rate3, AVG(`rated4`) as rate4, AVG(`rated5`) as rate5, AVG(`rated6`) as rate6, AVG(`rated7`) as rate7
					FROM businessplace_$placeId
				WHERE  `date` >= CURDATE() AND `source` =  ''";
				$result = mysql_query($sql);
				if(mysql_num_rows($result)){
					$row = mysql_fetch_object($result);
					$data['nrate1']	= number_format(($row->rate1 == null ? 0 : $row->rate1),1);
					$data['nrate2']	= number_format(($row->rate2 == null ? 0 : $row->rate2),1);
					$data['nrate3']	= number_format(($row->rate3 == null ? 0 : $row->rate3),1);
					$data['nrate4']	= number_format(($row->rate4 == null ? 0 : $row->rate4),1);
					$data['nrate5']	= number_format(($row->rate5 == null ? 0 : $row->rate5),1);
					$data['nrate6']	= number_format(($row->rate6 == null ? 0 : $row->rate6),1);
					$data['nrate7']	= number_format(($row->rate7 == null ? 0 : $row->rate7),1);		
					$data['totalNoShare']	= $row->totalNoShare;
					$noShare=0;
					if($row->totalNoShare){	
						$noShare = ($row->totalNoShare/$data['totalReview'])*100;
						if(strstr($noShare, '.'))
							$noShare = number_format($noShare,1);
					}
					$data['noPercent'] = $noShare;		
				}		
				$sql = "SELECT selectedItems FROM businessCustom
						WHERE customPlaceId = $placeId
						LIMIT 1";
				$result = mysql_query($sql);
				$row = mysql_fetch_object($result);
				$ratingTextTemp=array();	
				$arraySelectedItem = json_decode($row->selectedItems);
				if(is_object($arraySelectedItem)){
					for($i=0;$i<count($arraySelectedItem->rows);$i++)
						$ratingTextTemp[] = $arraySelectedItem->rows[$i]->data;
				}else{
					for($i=0;$i<count($arraySelectedItem);$i++)
						$ratingTextTemp[] = $arraySelectedItem[$i];
				}		
				$sql = "SELECT date as dates FROM businessplace_$placeId ORDER BY id ASC LIMIT 1";
				$result2 = mysql_query($sql);
				$row = mysql_fetch_object($result2);
				echo json_encode(array_merge($data,array("selected"=>$ratingTextTemp),array('dates'=>(mysql_num_rows($result2) ? $row->dates : ''))));
			}else{
				$sql ="SELECT COUNT( id ) AS totalReview
					FROM businessplace_$placeId
					WHERE  `date` 
					BETWEEN DATE( DATE_SUB( CURDATE() , INTERVAL $day 
					DAY ) ) 
					AND DATE( CURDATE())";
				
				$result = mysql_query($sql);
				if(mysql_num_rows($result)){
					$row = mysql_fetch_object($result);
					$data['totalReview']	= $row->totalReview;
				}
				
				$sql ="SELECT count(id) as totalShare, AVG(`rated1`) as rate1, AVG(`rated2`) as rate2, AVG(`rated3`) as rate3, AVG(`rated4`) as rate4, AVG(`rated5`) as rate5, AVG(`rated6`) as rate6, AVG(`rated7`) as rate7
					FROM businessplace_$placeId
					WHERE  `date` 
					BETWEEN DATE( DATE_SUB( CURDATE() , INTERVAL $day 
					DAY ) ) 
					AND DATE( CURDATE()) AND `source` =  'fb'";
				$result = mysql_query($sql);
				if(mysql_num_rows($result)){
					$row = mysql_fetch_object($result);
					$data['srate1']	= number_format(($row->rate1 == null ? 0 : $row->rate1),1);
					$data['srate2']	= number_format(($row->rate2 == null ? 0 : $row->rate2),1);
					$data['srate3']	= number_format(($row->rate3 == null ? 0 : $row->rate3),1);
					$data['srate4']	= number_format(($row->rate4 == null ? 0 : $row->rate4),1);
					$data['srate5']	= number_format(($row->rate5 == null ? 0 : $row->rate5),1);
					$data['srate6']	= number_format(($row->rate6 == null ? 0 : $row->rate6),1);
					$data['srate7']	= number_format(($row->rate7 == null ? 0 : $row->rate7),1);		
					$data['totalShare']	= $row->totalShare;
					$Share=0;
					if($row->totalShare){
						$Share = ($row->totalShare/$data['totalReview'])*100;	
						if(strstr($Share, '.'))
							$Share = number_format($Share,1);
					}
					$data['percent'] = $Share;			
				}
				$sql ="SELECT count(id) as totalNoShare, AVG(`rated1`) as rate1, AVG(`rated2`) as rate2, AVG(`rated3`) as rate3, AVG(`rated4`) as rate4, AVG(`rated5`) as rate5, AVG(`rated6`) as rate6, AVG(`rated7`) as rate7
					FROM businessplace_$placeId
					WHERE  `date` 
					BETWEEN DATE( DATE_SUB( CURDATE() , INTERVAL $day 
					DAY ) ) 
					AND DATE( CURDATE()) AND `source` =  ''";
				$result = mysql_query($sql);
				if(mysql_num_rows($result)){
					$row = mysql_fetch_object($result);
					$data['nrate1']	= number_format(($row->rate1 == null ? 0 : $row->rate1),1);
					$data['nrate2']	= number_format(($row->rate2 == null ? 0 : $row->rate2),1);
					$data['nrate3']	= number_format(($row->rate3 == null ? 0 : $row->rate3),1);
					$data['nrate4']	= number_format(($row->rate4 == null ? 0 : $row->rate4),1);
					$data['nrate5']	= number_format(($row->rate5 == null ? 0 : $row->rate5),1);
					$data['nrate6']	= number_format(($row->rate6 == null ? 0 : $row->rate6),1);
					$data['nrate7']	= number_format(($row->rate7 == null ? 0 : $row->rate7),1);		
					$data['totalNoShare']	= $row->totalNoShare;
					$noShare=0;
					if($row->totalNoShare){	
						$noShare = ($row->totalNoShare/$data['totalReview'])*100;
						if(strstr($noShare, '.'))
							$noShare = number_format($noShare,1);
					}
					$data['noPercent'] = $noShare;		
					
				}	
				$sql = "SELECT selectedItems FROM businessCustom
						WHERE customPlaceId = $placeId
						LIMIT 1";
				$result = mysql_query($sql);
				$row = mysql_fetch_object($result);
				$ratingTextTemp=array();	
				$arraySelectedItem = json_decode($row->selectedItems);
				if(is_object($arraySelectedItem)){
					for($i=0;$i<count($arraySelectedItem->rows);$i++)
						$ratingTextTemp[] = $arraySelectedItem->rows[$i]->data;
				}else{
					for($i=0;$i<count($arraySelectedItem);$i++)
						$ratingTextTemp[] = $arraySelectedItem[$i];
				}		
				$sql = "SELECT date as dates FROM businessplace_$placeId ORDER BY id ASC LIMIT 1";
				$result2 = mysql_query($sql);
				$row = mysql_fetch_object($result2);
				echo json_encode(array_merge($data,array("selected"=>$ratingTextTemp),array('dates'=>(mysql_num_rows($result2) ? $row->dates : ''))));
			}	
		}else
			echo json_encode(array('dates'=>''));
	break;
	case 'planManage':
			$userId = $_REQUEST['groupID'];
			$sql = "SELECT g.chargify_cust_id,g.addLoc,g.email as groupmail,g.productId,u.fname,u.lname,u.permission,u.email as usermail
				FROM `businessUserGroup` AS g
				RIGHT JOIN businessUsers AS u ON g.gid = u.userGroupId
				WHERE u.userGroupId = $userId
				LIMIT 1";
			$result = mysql_query($sql);
			if(mysql_num_rows($result)){
				$rows = mysql_fetch_object($result);
			}	
			$trialID = 3356303;$trialID30 = 3356318;$basicID=3356305;$proID=3356306;$freever = 3356308;$enterprise=3356316;$basic12 = 3405343;$basic24 = 3405344;$pro12 = 3405345;$pro24 = 3405346;$basic3=3425673;$basic6=3425675;$pro6=3425678;$enterprise12 =3410620;$enterprise24 =3410619; //live mode
			//$trialID = 3361671;$basicID=3361672;$proID=3361673;$liteUp = 3361656;$liteBuddy = 3361664;$liteBuzz = 3361666;$liteStudio = 3361667;$liteMetro = 3361668; //test mode
			if($rows->productId == $trialID)
				$currentPlan = 'trial (15 days free)';
			else if($rows->productId == $trialID30)
				$currentPlan = 'trial (30 days free)';
			else if($rows->productId == $basicID)
				$currentPlan = 'Basic';
			else if($rows->productId == $proID)
				$currentPlan = 'Pro';
			else if($rows->productId == $freever)
				$currentPlan = 'Free Forever';
			else if($rows->productId == $enterprise)
				$currentPlan = 'Enterprise';
			else if($rows->productId == $basic3)
				$currentPlan = 'Basic 3 Months';
			else if($rows->productId == $basic6)
				$currentPlan = 'Basic 6 Months';	
			else if($rows->productId == $basic12)
				$currentPlan = 'Basic 12 Months';
			else if($rows->productId == $basic24)
				$currentPlan = 'Basic 24 Months';
			else if($rows->productId == $pro6)
				$currentPlan = 'Pro 6 Months';
			else if($rows->productId == $pro12)
				$currentPlan = 'Pro 12 Months';	
			else if($rows->productId == $pro24)
				$currentPlan = 'Pro 24 Months';
			else if($rows->productId == $enterprise12)
				$currentPlan = 'Enterprise 12 Months';
			else if($rows->productId == $enterprise24)
				$currentPlan = 'Enterprise 24 Months';		
		if($_REQUEST['setting'] == 'cancel'){
			$subject = 'Tabluu.com - cancel plan request';
			$body= '<p>Customer ID: '. $rows->chargify_cust_id .' - '.$rows->fname . ' ' . $rows->lname .' has requested to cancel the '. $currentPlan . ' plan</p>
					<p><strong>Note:</strong></p>
					<p>The request may take up to 24 hours to process</p>
					<p>Thank you.</p>
					<p>Tabluu Support</p>';
		}else if($_REQUEST['setting'] == 'change'){
			$plan = $_REQUEST['plan'];
			$subject = 'Tabluu.com - change plan request'; 
			$body = '<p>Customer ID: '. $rows->chargify_cust_id .' - '.$rows->fname . ' ' . $rows->lname .' has requested to change the plan from '.$currentPlan.' to '.$plan.'</p>
					<p><strong>Note:</strong></p>
					<p>The request may take up to 24 hours to process</p>
					<p>Thank you.</p>
					<p>Tabluu Support</p>';
		}else if($_REQUEST['setting'] == 'add'){
			$placeToadd = $_REQUEST['ttalAddRem'];
			$subject = 'Tabluu.com - add new location(s) request';
		$body ='<p>Customer ID: '. $rows->chargify_cust_id .' - '.$rows->fname . ' ' . $rows->lname .' has requested to add '.($placeToadd > 1 ? $placeToadd : $placeToadd).' location(s).</p>
					<p><strong>Note:</strong></p>
					<p>The request may take up to 24 hours to process</p>
					<p>Thank you.</p>
					<p>Tabluu Support</p>';
		}else if($_REQUEST['setting'] == 'remove'){
			$placeToadd = $_REQUEST['ttalAddRem'];
			$subject = 'Tabluu.com - Remove Place'; 
			$body = '<p>Customer ID: '. $rows->chargify_cust_id .' - '.$rows->fname . ' ' . $rows->lname .' has requested to remove '.($placeToadd > 1 ? $placeToadd : $placeToadd).' location(s)</p>
					<p><strong>Note:</strong></p>
					<p>The request may take up to 24 hours to process</p>
					<p>Thank you.</p>
					<p>Tabluu Support</p>';
		} 
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
		$mail->AddAddress("support@tabluu.com");
		$mail->AddAddress($rows->groupmail);
		if($rows->permission > 0)
			$mail->AddAddress($rows->usermail);
		$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
		$mail->IsHTML(true);                                  // Set email format to HTML
		$mail->Subject = $subject;
		$mail->Body    = $body;
		$mail->AltBody = $body;
		if(!$mail->Send()) {
		   echo 0;
		   exit;
		} */
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
		$mail->AddAddress("support@tabluu.com");
		$mail->AddAddress($rows->groupmail);
		//if($rows->permission > 0)
			//$mail->addBCC($rows->usermail);
		$mail->Send();
	break;
	case 'logout':
		include_once('class/class.cookie.php');
		$cookie = new cookie();
		$cookie->logOut();
	break;
	case 'customerTime':
		$groupID = $_REQUEST['groupID'];
		$sql = "SELECT timezone FROM businessUserGroup
		WHERE gID =  '$groupID'";
		$result = mysql_query($sql);
		if(mysql_num_rows($result)){
			$row = mysql_fetch_object($result);
			echo $row->timezone;	
		} else 
			echo 'none';
	break;	
}
$connect->db_disconnect();

function sendEmail($email,$subject,$body){
	require_once 'class/class.phpmailer2.php';
	include_once('class/class.main.php');
	$connect = new db();
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
	$mail->AddAddress($email);
	//if($rows->permission > 0)
		//$mail->addBCC($rows->usermail);
	//$mail->AddAddress('robert.garlope@gmail.com');	
	$mail->Send();
	return;
}
function getLocations($userId,$permission){
	include_once('class/class.main.php');
	$connect = new db();
	$sql = "SELECT l.id, l.businessName, l.subscribe, l.setup, p.nicename
			FROM businessUsers AS u
			LEFT JOIN businessList AS l ON l.userGroupId = u.userGroupId
			LEFT JOIN businessProfile AS p ON p.profilePlaceId = l.id
			WHERE u.id = $userId ORDER BY l.id ASC
			LIMIT 0 , 30";	
	$result = mysql_query($sql);$i=0;$arrayPlace=array();
	while($row = mysql_fetch_object($result)){
		if(!empty($row->id)){
			$arrayPlace[$i]['id'] = $row->id;
			$arrayPlace[$i]['name'] = $row->businessName;
			$arrayPlace[$i]['subscribe'] = $row->subscribe;
			$arrayPlace[$i]['setup'] = $row->setup;
			$arrayPlace[$i++]['nicename'] = $row->nicename;
		}
	}	
	$array = $arrayPlace;	
	if($permission > 1 && count($arrayPlace)){
		$array=array();
		$sql = "SELECT params as param
				FROM businessUsers
				WHERE id = $userId";
	   $result = mysql_query($sql);
	   $row = mysql_fetch_object($result);
	   if($row->param){
			$tempArray=array();$j=0;
			$param = json_decode($row->param);
			foreach($arrayPlace as $key=>$val){
				if(in_array($val['id'], $param)){
					$tempArray[$j]['id'] = $val['id'];
					$tempArray[$j]['name'] = $val['name'];
					$tempArray[$j]['subscribe'] = $val['subscribe'];
					$tempArray[$j]['setup'] = $val['setup'];
					$tempArray[$j++]['nicename'] = $val['nicename'];						
				}
			}	
			$array = $tempArray;			
	   }		   
	}
	$connect->db_disconnect();
	return json_encode($array);
}
function rand_string( $length ) {
	$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";	
	$str = '';
	$size = strlen( $chars );
	for( $i = 0; $i < $length; $i++ ) {
		$str .= $chars[ rand( 0, $size - 1 ) ];
	}

	return $str;
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
