<!DOCTYPE html>
<html>
<head>
	<title>Review Widgets</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
		<div id="widget" data-role="page">
			<div class="content-wrap" style="background-color:#cbe7f2;">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconwidget" />
					</div>
				</div><!-- /header -->
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Review Widget</div>			
							<ul class="widget-left-menu" data-role="listview">
								<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Review Widget<span class="listview-arrow-default listview-arrow-active"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header">Review Widget</div>
							<section class="thirdwidget">
								<p>Copy the below codes and paste it within the "&lt;head&gt;&lt;/head&gt;" tags of your web page.</p>
								<div class="clear" style="padding:3px;"></div>
								<div class="script-tag" ></div>
								<div class="clear" style="padding:5px;"></div>
								<p style="padding-bottom:5px">Copy the below codes and paste it where you want Tabluu reviews to appear on your web page.</p>
								<div style="line-height:1.2em;padding:10px;border:1px solid #ccc">&lt;div class="widget-tabluu">&lt;/div&gt;</div>
								<div class="clear" style="padding:5px;"></div>
								<p style="padding-bottom:5px">Note: Tabluu review widget has a max width of 350px and will automatically resize itself to a smaller container on the web page.</p>
								<div class="clear" style="padding:5px;"></div>
								<p>Preview:<p>
								<div class="wrap-widget">
								      
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