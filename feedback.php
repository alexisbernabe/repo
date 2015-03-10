<!DOCTYPE html>
<html>
<head>
	<title>Collect Feedback / Reviews Panel</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
	
		<div id="feedback" data-role="page">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconfeed" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Collect Feedback / Reviews</div>			
							<ul class="feedback-left-menu" data-role="listview">
								<li ><a href="#">Tablet "On the Spot" Feedback<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#" class="qrcode">QR Code &amp; Mini Web Link Labels<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Send Email Invitations<span class="listview-arrow-default"></span></a></li>
								
								<li ><a href="#">Photo Booth (Tablet or Notebook)<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header">Collect Feedback / Reviews</div>
							<section class="tellafriend hide">
								<!--<iframe src="http://www.tabluu.com/tellafriend/index.php" width="600" height="600" scrolling="auto" frameborder="0" style="border:0px #FFFFFF" name="frame share contacts" id="tellFrame" marginheight="0"></iframe>-->
								<p class="font-16">Note: Send out feedback / review invitations by copying &amp; pasting the below subject / message to your email.</p>
								<div class="clear" style="padding-top:1em"></div>
								<p class="font-17 fl">Subject:</p>
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" data-clear-btn="false" name="invitxtsubject" id="invitxtsubject" value="You're invited to give Tokyo Cafe a review!" placeholder="Subject...">
								<div class="clear" style="padding-top:1em"></div>
								<p class="font-17 fl">Message:</p>
								<div class="clear" style="padding-top:0.5em"></div>
								<div>
									<textarea name="bbcode_field" id="textarea-invite" style="height:400px;width:100%;max-height: 900px;"></textarea>
								</div>
							</section>	
							<section class="feedback-weblink hide">									
								<ul class="feedback-right-weblink" data-role="listview">
									<li><a href="weblink.html">Ask for a Selfie / Photo<span class="listview-arrow-default"></span></a></li>
									<li><a href="weblink.html">Don't ask for a Selfie / Photo<span class="listview-arrow-default"></span></a></li>
								</ul>											
							</section>
							<section class="feedback-photo hide">	
								<p>Link:</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								<input type="text" name="photolink" id="photolink" value="" >
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="phopen">Open</button>
								</div>
							</section>
							<section class="survey hide">
								<ul class="feedback-right-weblink" data-role="listview">
									<li><a href="onspot.html">Survey<span class="listview-arrow-default"></span></a></li>
									<li><a href="onspot.html">Check Out Counters / Anywhere<span class="listview-arrow-default"></span></a></li>
								</ul>	
							</section>	
						</div>
					</div>	
						
				</div><!-- /content -->
				<?php require_once('footer.html'); ?>
			</div>
		</div><!-- /page -->
		
</body>
</html>