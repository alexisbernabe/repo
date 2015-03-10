<?php
	
include_once 'class/class.phpmailer2.php';
include_once('class/class.main.php');
 $connector = new fucn();
$connect = new db();
$connect->db_connect();
//if(isset($_REQUEST['Guid'])){
	$request = json_encode($_REQUEST);
	$request = json_decode($request);
	//$sql = "INSERT INTO `webhooks` (`details`) VALUES ('". json_encode($_REQUEST) ."')";
	//$result = mysql_query($sql);
     
	if($_REQUEST['event'] == 'renewal_failure'){
		$subscription_id = (int)$request->payload->subscription->id;
		$sql = "SELECT g.productId,g.gId FROM businessUserGroup AS g WHERE g.subscription_id = $subscription_id LIMIT 1";
		$row = mysql_fetch_object(mysql_query($sql));
		$groupID = $row->gId;
		$comp_id_prev = $connector->getCurrentComponentId((int)$row->productId);
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
					$res = mysql_query("SELECT id FROM `businessList` WHERE `userGroupId` = $groupID AND `subscribe` = 1 ORDER BY id DESC");
						$arrayPlace =array();
						if(mysql_num_rows($res)){
							while($rows = mysql_fetch_object($res)){$arrayPlace[] = $rows->id;} 
							$total_loc_subs = count($arrayPlace) - 1;
							$idtoremove = array();
							for($i=0;$i<$total_loc_subs;$i++){
								$idtoremove[] = $arrayPlace[$i];
							}
							$ids = implode(',',$idtoremove);
							if($total_loc_subs > 0)
								mysql_query("UPDATE businessList SET subscribe=0 WHERE id IN($ids)");
						}
					mysql_query("UPDATE businessUserGroup SET addLoc=0,productId=".$connect->freever." WHERE subscription_id = $subscription_id") or die(mysql_error());
				}
			}else
				mysql_query("UPDATE businessUserGroup SET addLoc=0,productId=".$connect->freever." WHERE subscription_id = $subscription_id") or die(mysql_error());
		}
	}
	if($_REQUEST['event'] == 'subscription_state_change'){
		$subscription_id = (int)$request->payload->subscription->id;
		$state = (string)$request->payload->subscription->state;
		$sql = "SELECT g.productId,g.gId FROM businessUserGroup AS g WHERE g.subscription_id = $subscription_id LIMIT 1";
		$row = mysql_fetch_object(mysql_query($sql));
		$comp_id_prev = $connector->getCurrentComponentId((int)$row->productId);
		$groupID = $row->gId;
		mysql_query("UPDATE businessUserGroup SET state='$state' WHERE subscription_id = $subscription_id") or die(mysql_error());
		if(in_array($state, array('unpaid','canceled'))){
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
						$res = mysql_query("SELECT id FROM `businessList` WHERE `userGroupId` = $groupID AND `subscribe` = 1 ORDER BY id DESC");
						$arrayPlace =array();
						if(mysql_num_rows($res)){
							while($rows = mysql_fetch_object($res)){$arrayPlace[] = $rows->id;} 
							$total_loc_subs = count($arrayPlace) - 1;
							$idtoremove = array();
							for($i=0;$i<$total_loc_subs;$i++){
								$idtoremove[] = $arrayPlace[$i];
							}
							$ids = implode(',',$idtoremove);
							if($total_loc_subs > 0)
								mysql_query("UPDATE businessList SET subscribe=0 WHERE id IN($ids)");
						}
						mysql_query("UPDATE businessUserGroup SET addLoc=0 WHERE subscription_id = $subscription_id") or die(mysql_error());
					}
				}else
					mysql_query("UPDATE businessUserGroup SET addLoc=0 WHERE subscription_id = $subscription_id") or die(mysql_error());
			} 
		}
	}
	if($_REQUEST['event'] == 'renewal_success'){
		$subscription_id = (int)$request->payload->subscription->id;
		$sql = "SELECT g.productId,g.removeloc,g.gId FROM businessUserGroup AS g WHERE g.subscription_id = $subscription_id LIMIT 1";
		$row = mysql_fetch_object(mysql_query($sql));
		$groupID = $row->gId;
		if($row->removeloc > 0){
			$comp_id_prev = $connector->getCurrentComponentId((int)$row->productId);
			$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id_prev .'.xml';
			$result = $connector->sendRequest($url, $format = 'xml', $method = 'GET', $data='');
			if($result->code == 200){
			$objxml = simplexml_load_string($result->response);
			$allocate = (int)$objxml->allocated_quantity;
			if($allocate > 0){
				$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id_prev .'/allocations.xml';
				$allocate = $allocate - $row->removeloc;
				$data = '<?xml version="1.0" encoding="UTF-8"?>
				  <allocation>
					  <quantity>'. $allocate .'</quantity>
					  <proration_downgrade_scheme>"no-prorate"</proration_downgrade_scheme>
					   <proration_upgrade_scheme>"no-prorate"</proration_upgrade_scheme>
				  </allocation>';
				$result = $connector->sendRequest($url, $format = 'xml', $method = 'POST', $data);
				if($result->code == 201){
					$res = mysql_query("SELECT id FROM `businessList` WHERE `userGroupId` = $groupID AND `subscribe` = 1 ORDER BY id DESC");
					$arrayPlace =array();
					if(mysql_num_rows($res)){
						while($rows = mysql_fetch_object($res)){$arrayPlace[] = $rows->id;}
						$idtoremove = array();
						for($i=0;$i<$allocate;$i++){
							$idtoremove[] = $arrayPlace[$i];
						}
						$ids = implode(',',$idtoremove);
						if($total_loc_subs > 0)
							mysql_query("UPDATE businessList SET subscribe=0 WHERE id IN($ids)");
					}	
					mysql_query("UPDATE businessUserGroup SET addLoc=$allocate,removeloc=0 WHERE subscription_id = $subscription_id") or die(mysql_error());
				}
			}else
				mysql_query("UPDATE businessUserGroup SET removeloc=0 WHERE subscription_id = $subscription_id") or die(mysql_error());
			}
		}
	}
	if($_REQUEST['event'] == 'subscription_product_change'){
		$subscription_id = (int)$request->payload->subscription->id;$comp_id_cur= $connector->getCurrentComponentId((int)$request->payload->subscription->product->id);$comp_id_prev = $connector->getCurrentComponentId((int)$request->payload->previous_product->id);
		$url = '/subscriptions/'. $subscription_id .'/components/'. $comp_id_prev .'.xml';
		$result = $connector->sendRequest($url, $format = 'xml', $method = 'GET', $data='');
		$sql = "INSERT INTO `webhooks` (`details`) VALUES ('". json_encode($result) ."')";
	    mysql_query($sql);
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
					if($result->code == 201){
						$sql = "UPDATE businessUserGroup SET productId=". (int)$request->payload->subscription->product->id ." WHERE subscription_id=".$subscription_id;
						$result = mysql_query($sql);
					}	
				}
			}else{
				$sql = "UPDATE businessUserGroup SET productId=". (int)$request->payload->subscription->product->id ." WHERE subscription_id=".$subscription_id;
				$result = mysql_query($sql);
			}
		}	
	}
	
	if($_REQUEST['event'] == 'billing_date_change'){
		$subscription_id = (int)$request->payload->subscription->id;
		$sql = "UPDATE businessUserGroup SET expiration='". (string)$request->payload->subscription->current_period_ends_at ."' WHERE subscription_id=".$subscription_id;
		$result = mysql_query($sql);
	}
	if($_REQUEST['event'] == 'signup_success'){
        $subject = 'Tabluu Chargify - New Sign up user'; 
		$body = '<p>Customer ID: '.  $request->payload->subscription->customer->id .' - '.$request->payload->subscription->customer->first_name . ' ' . $request->payload->subscription->customer->last_name . '</p>
		<p>He/She signed up for '.$request->payload->subscription->product->product_family->name.' '. $request->payload->subscription->product->name . '</p>'; 
		//echo $subject = 'Tabluu - New Sign up user'; 
		//$body = 'new signup';
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
		//$mail->AddAddress($email);
		//if($rows->permission > 0)
			//$mail->addBCC($rows->usermail);
		//$mail->AddAddress('robert.garlope@gmail.com');	
		$mail->Send();
     }	
 
		//$sql = "INSERT INTO `webhooks` (`userId`,`details`) VALUES (".$request->payload->subscription->customer->id.",'". json_encode($_REQUEST) ."')";
	//$result = mysql_query($sql);  
//}
$connect->db_disconnect();

?>