<?php
$arrayProfile = array('Profile','Description','Opening Hours','Photos','Map Display');
$profileHref = array('#','#','#','#','#');
$arrayUIC = array('Business Logo','Background Image','Background Color','Font Color','Text Below Stars','Text in Buttons','Text in Message Box');
$UIChref = array('#','#','#','#','#','#','#');
?>
<!DOCTYPE html>
<html>
<head>
	<title>Dashboard Setup</title>

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
	<link rel="stylesheet" href="css/style.css" />
	<script src="js/jquery-1.11.0.min.js"></script>
	<script src="js/jquery.mobile-1.4.2.min.js"></script>
	<script src="js/setup.js"></script>
</head>
<body>
	
		<div data-role="page">
			<div class="content-wrap">
				<?php require_once('header.html'); ?>
				<div role="main" class="ui-content">
					<div class="desktop-wrap">
						<div class="left-content fl">
							<div class="left-header">Setup</div>			
							<ul class="desktop-dash-ul" data-role="listview">
								<li><a href="#">Business Web Page<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">User Interface for Customer<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">What Question to Ask?<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Post Reviews to Facebook & Tabluu<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content fr">
							<div class="de-right-header"></div>
							<ul class="left-menu" data-role="listview">
								<li ><a href="#" data-prefetch="true"><span class="listview-arrow-default"></span></a></li>								
							</ul>		
							<div class="left-menu-question hide">
								Ask
							</div>	
							<div class="left-menu-post hide">
								Post				
							</div>								
						</div>
					</div>
					<div class="mobile-wrap">
                        <div class="mobile-left-menu">	
							<div class="de-left-header">Setup</div>	
							
                        </div>
						 <div class="mobile-right-menu hide">
							<div class="right-header"></div>
							
                        </div> 						
					</div>					
				</div><!-- /content -->
				<?php require_once('footer.html'); ?>
				<input type="hidden" value="" name="prev-page" id="prev-page" />
				<input type="hidden" value="dash" name="cur-page" id="cur-page" />
			</div>
		</div><!-- /page -->
</body>
</html>