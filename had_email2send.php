<?php
	include_once 'class/class.phpmailer2.php';
	include_once('class/class.main.php');
	$connect = new db();
	$connect->db_connect();
		$limit=50;
		// query check the table if someone sending an email
	//	echo "SELECT id,offset,placesId,emailID FROM email2process WHERE processDone = 0 ORDER by id ASC LIMIT 1";
		$result = mysql_query("SELECT id,offsets,placesId,emailID FROM email2process WHERE processDone = 0 ORDER by id ASC LIMIT 1"); 
		if(mysql_num_rows($result)){
			$row = mysql_fetch_object($result);
			$arrayID = json_decode($row->placesId);
			$placeId = $arrayID[0];
			$emailId = $row->emailID;$offsets = $row->offsets;
			// query email body and subject and credits limit
			$resultemail = mysql_query(" SELECT m.subject,m.body,m.groupId,u.credits
			FROM businessMail as m LEFT JOIN businessUserGroup AS u ON u.gId = m.groupId WHERE m.id = $emailId"); 
			$rowmail = mysql_fetch_object($resultemail);
			$credits = json_decode($rowmail->credits);$subject = $rowmail->subject;
			$body = $rowmail->body;// htmldecode($rowmail->body);
			$credit = $credits->{'credits'};
			$date = $credits->{'date'};
			
			// query emails followers
			$resultfollow = mysql_query("SELECT id,email FROM businessCustomer_$placeId WHERE follow = 1 LIMIT $offsets,$limit");
			if(mysql_num_rows($resultfollow)){
				// query location profile
				$proResult = mysql_query("SELECT DISTINCT businessName,f.address,f.city,f.country,f.zip,f.contactNo FROM businessProfile as f WHERE f.profilePlaceId = $placeId");	
				$frow = mysql_fetch_object($proResult);
				$group = $rowmail->groupId;
				$mail = new PHPMailer;
				$mail->IsAmazonSES();
				$mail->AddAmazonSESKey($connect->aws_access_key_id, $connect->aws_secret_key); 
				$mail->From = 'noreply@tabluu.com';
				$mail->FromName = 'Tabluu';					
				while($row2 =  mysql_fetch_object($resultfollow)){
					$footer="";
					//echo $row2->email.'<br/>';
					if($credit > 0){
						$credit--;
						$id = $placeId .'|'. $row2->id;
						$id = base64_encode( $id );
						$footer = '<p><strong>Powered by Tabluu & sent by:</strong><br/>'. $frow->businessName .'<br/>'.$frow->address .' ' . $frow->city .' '. $frow->country .'<br/>'. $frow->contactNo .'</p>'. '<p>To unfollow or unsubscribe, please click below link:<br/>http://www.tabluu.com/unsubscribe.php?id='. $id .'<a/></p>';					
						$mail->AddAddress($row2->email);
						//$mail->addBCC('robert.garlope@gmail.com');
						$mail->Subject = $subject;
						$mail->Body    = nl2br($body . $footer);
						$mail->AltBody = $body . $footer;
						$mail->CharSet = "UTF-8";
						$mail->Send();
						//echo nl2br($body . $footer) . 'email send <br/>';
						
						//if(!$mail->Send()) {
						   //echo $row2->email .' '. $row2->id .' ' . $placeId . ' <br/>'; 
						  // echo 'error email sending please check your code';
						 //  exit;
						//}
                       //$mail->clearAddresses();	
						$mail->ClearAllRecipients();					   
					}else{
						$id = $row->id;
						$value = '{"date":"'.$date.'","credits":'.$credit.'}';
						mysql_query(" UPDATE businessUserGroup SET credits='$value' WHERE gId=$group");
						mysql_query("DELETE FROM email2process WHERE id = $id");
						mysql_query("DELETE FROM businessMail WHERE id = $emailId");
						exit();
					}	
				}
				$offsets2 = ($offsets + $limit);
				mysql_query("UPDATE email2process SET offsets = $offsets2 WHERE id = $row->id");
				$value = '{"date":"'.$date.'","credits":'.$credit.'}';
				mysql_query(" UPDATE businessUserGroup SET credits='$value' WHERE gId=$group");
			}else{
				$id = $row->id;
				if(count($arrayID) > 1){
					$placeId = $arrayID[1];
					array_shift($arrayID);
					$placesId = json_encode($arrayID);
					mysql_query("UPDATE email2process SET offsets = 0, placesId='$placesId' WHERE id = $id");	
				}else{
					mysql_query("DELETE FROM email2process WHERE id = $id");
					mysql_query("DELETE FROM businessMail WHERE id = $emailId");
				}
			}		
		}
			
		//$row = mysql_fetch_object($locResult);
	$connect->db_disconnect();
//}
function htmldecode($str){
	$str = str_replace("|one","&amp;",$str);
	$str = str_replace("|two","&lt;",$str);
	$str = str_replace("|three","&gt;",$str);
	$str = str_replace("|four","&quot;",$str);
	return str_replace("|five","#",$str);
}
?>