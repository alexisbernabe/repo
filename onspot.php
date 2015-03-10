<!DOCTYPE html>
<html>
<head>
	<title>Tablet "On the Spot" Feedback</title>
	<meta content="width=device-width, minimum-scale=1, maximum-scale=1" name="viewport">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>

</head>
<body>
	
		<div id="onspot" data-role="page">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr icononspot" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Tablet "On the Spot" Feedback</div>			
							<ul class="onspot-left-menu" data-role="listview">
								<li><a href="onspot.html">Survey<span class="listview-arrow-default"></span></a></li>
								<li><a href="onspot.html">Check Out Counters / Anywhere<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">	
							<div class="right-header"></div>
							<section class="onspot-section-survey hide">
								<p>Link:</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								<input type="text" name="surveyopenlink" id="surveyopenlink" value="" >
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="surveyopen">Open</button>
								</div>
							</section>
							<section class="onspot-section-anywhere hide">
								<p>Link:</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								<input type="text" name="anyopenlink" id="anyopenlink" value="" >
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="anyopen">Open</button>
								</div>
							</section>							
						</div>
					</div>			
				</div><!-- /content -->
				<?php require_once('footer.html'); ?>
			</div>
		</div><!-- /page -->
</body>
</html>