<?php
//if($rowrate->photo_url != '' || $rowrate->userId != ''){
	$fbname = '';
	if($rowrate->photo_url != '' && strstr($rowrate->photo_url,"shared")){
		$fbsrc =  $src = (file_exists($rowrate->photo_url) ? $path.$rowrate->photo_url : $path.$rowrate->photo_url);
		if($rowrate->userId){
			if(strlen($rowrate->userName) > 15 )
				$fbname = mb_convert_case(substr($rowrate->userName,0,15).'...', MB_CASE_TITLE, "UTF-8");
			else
				$fbname = mb_convert_case($rowrate->userName,MB_CASE_TITLE, "UTF-8");
		}	
	}else if($rowrate->userId){
		$fbsrc =  "https://graph.facebook.com/$rowrate->userId/picture?type=large";
		if(strlen($rowrate->userName) > 15 )
			$fbname = mb_convert_case(substr($rowrate->userName,0,15).'...', MB_CASE_TITLE, "UTF-8");
		else
			$fbname = mb_convert_case($rowrate->userName,MB_CASE_TITLE, "UTF-8");
	}else
		$fbsrc =  $path."images/profileDefault.png";
	if(file_exists($fbsrc))
		$imgrotate->rotateImages($fbsrc);
	if($rowrate->hideimg > 0 && $rowrate->hideimg != null)
		$fbsrc =  $path."images/profileDefault.png";
?>
<div class="sysPinItemContainer pin">
		<!--<div class="sysPinActionButtonsContainer actions hidden">
			<a href="login.html" class="Button Button11 WhiteButton repin_link"><strong>Rate</strong><span></span></a>
			<a href="login.html" class="Button Button11 WhiteButton likebutton"><strong>Like</strong><span></span></a>
			<a href="login.html" class="Button Button11 WhiteButton comment"><strong>Comment</strong><span></span></a>
		</div>-->
		<p class="description sysPinDescr fblink"><a href="https://www.facebook.com/<?php echo $rowrate->userId ?>" target="_blank"><?php echo $fbname; ?></a></p>
		<img class="pinImage" src="<?php echo $fbsrc; ?>" alt="Selfie"/>
		<?php
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
			?>	
		<div class="stats colorless" style="height:20px;padding-top:5px;">
			<div class="RateCount" style="width:100px;float:left;margin-top:4px;">My rating: <?php echo $rowrate->aveRate; ?>/5</div><div style="width:auto;"><?php echo "<span class=\"stargrey FRight\"><span class=\"staryellow\" style=\"$style\"></span></span>"; ?></div>
		</div>
		
		<center class="rating" style="">
			<p class=""></p>
			
			<p class="RateCount">
			<?php 
			$datetoconvert = $rowrate->date;
			$user_tz = (($timezone == 'none' || $timezone == '') ? 'Asia/Singapore' : $timezone);//'America/Chicago';
			$server_tz = 'UTC';
			$date = new DateTime($datetoconvert, new DateTimeZone($server_tz) );
			$date->setTimeZone(new DateTimeZone($user_tz));						
			echo $date->format('d M Y H:i') ?> hrs.
			<?php
				if(count($ratingTextTemp) == 1){
					$rating1 = $rowrate->rated1;				
					echo "<span>$ratingTextTemp[0]: $rating1/5.</span>";			
				}else if(count($ratingTextTemp) == 2){
					$rating1 = $rowrate->rated1;
					$rating2 = $rowrate->rated2;				
					echo "<span>$ratingTextTemp[0]: $rating1/5, </span>";
					echo "<span>$ratingTextTemp[1]: $rating2/5.</span>";				
				}else if(count($ratingTextTemp) == 3){
					$rating1 = $rowrate->rated1;
					$rating2 = $rowrate->rated2;
					$rating3 = $rowrate->rated3;				
					echo "<span>$ratingTextTemp[0]: $rating1/5, </span>";
					echo "<span>$ratingTextTemp[1]: $rating2/5, </span>";
					echo "<span>$ratingTextTemp[2]: $rating3/5.</span>";		
				}else if(count($ratingTextTemp) == 4){
					$rating1 = $rowrate->rated1;
					$rating2 = $rowrate->rated2;
					$rating3 = $rowrate->rated3;
					$rating4 = $rowrate->rated4;				
					echo "<span>$ratingTextTemp[0]: $rating1/5, </span>";
					echo "<span>$ratingTextTemp[1]: $rating2/5, </span>";
					echo "<span>$ratingTextTemp[2]: $rating3/5, </span>";
					echo "<span>$ratingTextTemp[3]: $rating4/5.</span>";						
				}else if(count($ratingTextTemp) == 5){
					$rating1 = $rowrate->rated1;
					$rating2 = $rowrate->rated2;
					$rating3 = $rowrate->rated3;
					$rating4 = $rowrate->rated4;
					$rating5 = $rowrate->rated5;				
					echo "<span>$ratingTextTemp[0]: $rating1/5, </span>";
					echo "<span>$ratingTextTemp[1]: $rating2/5, </span>";
					echo "<span>$ratingTextTemp[2]: $rating3/5, </span>";
					echo "<span>$ratingTextTemp[3]: $rating4/5, </span>";	
					echo "<span>$ratingTextTemp[4]: $rating5/5.</span>";					
				}else if(count($ratingTextTemp) == 6){
					$rating1 = $rowrate->rated1;
					$rating2 = $rowrate->rated2;
					$rating3 = $rowrate->rated3;
					$rating4 = $rowrate->rated4;
					$rating5 = $rowrate->rated5;
					$rating6 = $rowrate->rated6;				
					echo "<span>$ratingTextTemp[0]: $rating1/5, </span>";
					echo "<span>$ratingTextTemp[1]: $rating2/5, </span>";
					echo "<span>$ratingTextTemp[2]: $rating3/5, </span>";
					echo "<span>$ratingTextTemp[3]: $rating4/5, </span>";	
					echo "<span>$ratingTextTemp[4]: $rating5/5, </span>";
					echo "<span>$ratingTextTemp[5]: $rating6/5.</span>";		
				}else if(count($ratingTextTemp) == 7){
					$rating1 = $rowrate->rated1;
					$rating2 = $rowrate->rated2;
					$rating3 = $rowrate->rated3;
					$rating4 = $rowrate->rated4;
					$rating5 = $rowrate->rated5;
					$rating6 = $rowrate->rated6;
					$rating7 = $rowrate->rated7;				
					echo "<span>$ratingTextTemp[0]: $rating1/5, </span>";
					echo "<span>$ratingTextTemp[1]: $rating2/5, </span>";
					echo "<span>$ratingTextTemp[2]: $rating3/5, </span>";
					echo "<span>$ratingTextTemp[3]: $rating4/5, </span>";	
					echo "<span>$ratingTextTemp[4]: $rating5/5, </span>";
					echo "<span>$ratingTextTemp[5]: $rating6/5, </span>";	
					echo "<span>$ratingTextTemp[6]: $rating7/5.</span>";
				}
				
			?>
			</p> 
			<p style="color:#777;font-weight: bold;text-align:left;"><?php echo $rowrate->comment; ?></p>
		</center>
	</div>
<?php
//}
?>	