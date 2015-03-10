<?php
	$time_zones = timezone_identifiers_list();
	$tz = '<option value="none" selected="selected">Select Time Zone</option>';
	foreach($time_zones as $zones){
		if($zones <> 'UTC')		
			$tz.= "<option value=".$zones.">".$zones."</option>";	
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Global Settings</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
	har
		<div id="settings" data-role="page" data-ajax="false">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconsettings" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Time Zone</div>			
							<ul class="settings-left-menu" data-role="listview">
								<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Time Zone<span class="listview-arrow-default listview-arrow-active"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header">Time Zone</div>
							<section class="panel-timezone">
								<div class="clear"></div>
                                <select id="select-timezone" name="select-timezone">
                                	<?=$tz?>
                                </select>
							</section>								
						</div>
					</div>			
				</div><!-- /content -->
				<?php require_once('footer.html'); ?>
			</div>
		</div><!-- /page -->
</body>
</html>