<!DOCTYPE html>
<html>
<head>
	<title>Subscriptions Plan Panel</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
	
		<div id="plan" data-role="page" data-ajax="false">
			<div class="content-wrap">
				<?php require_once('header.html'); ?>			
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">User Admin</div>			
							<ul class="plan-left-menu" data-role="listview">
								<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Plan<span class="listview-arrow-default listview-arrow-active"></span></a></li>
								<li><a href="#">Online Location<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content fr">
							<div class="right-header"></div>
							<section class="panel-sub-plan hide">									
								Plan content								
							</section>
							<section class="panel-sub-location hide">
								Online Location content
							</section>					
						</div>
					</div>			
				</div><!-- /content -->
				<?php require_once('footer.html'); ?>
			</div>
		</div><!-- /page -->
</body>
</html>