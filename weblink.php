<?php

?>
<!DOCTYPE html>
<html>
<head>
	<title>QR Code and Mini Web Link Panel</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
	
		<div id="weblink" data-role="page" data-ajax="false">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" id="weblink-logo" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconsetup" />
					</div>
				</div><!-- /header -->			
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">QR Code and Mini Web Link Labels</div>			
							<ul class="weblink-left-menu" data-role="listview">
								<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Ask for a Selfie / Photo<span class="listview-arrow-default listview-arrow-active"></span></a></li>
								<li><a href="#">Don't ask for a Selfie / Photo<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header"></div>
							<section class="panel-selfie hide"> 
								<p>Label Title…</p>
								<form id="frmprintselfie" action="#" method="post" enctype="multipart/form-data" >
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" name="selfie-1" id="selfie-1" value="We Value Your Feedback" placeholder="We Value Your Feedback"" >
								<div class="clear" style="padding-top:0.5em"></div>	
								</form>
								<p>Preview:</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								<div class="QRFrame">
								  <p class="title title-1">We Value Your Feedback</p>
								  <div class="QRimage"></div>
								  <p class="shortlink">tabluu.com/hop8e5t=1</p>
								  <div class="qrframelogo"></div>  
								</div>
								<div class="clear" style="padding-top:0.5em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-print4">Print 4 Labels</button>
								</div>	
								<div class="btn-submit">
									<button class="ui-btn" id="submit-print9">Print 9 Labels</button>
								</div>
								<div class="clear" style="padding-top:0.5em"></div>
								<p>Please choose a QR Code size...</p>
								<div class="clear" style="padding-top:0.5em"></div>
								<fieldset data-role="controlgroup" data-corners="false" id="qr-size">
									<input type="radio" name="post" id="weba" value="1" >
									<label for="weba">100 x 100</label>
									<input type="radio" name="post" id="webb"  value="2">
									<label for="webb">200 x 200</label>
									<input type="radio" name="post" id="webc" value="3">
									<label for="webc">300 x 300</label>
									<input type="radio" name="post" id="webd" value="4">
									<label for="webd">400 x 400</label>
									<input type="radio" name="post" id="webe" value="5" >
									<label for="webe">500 x 500</label>
								</fieldset>	
								<div class="clear" style="padding-top:0.5em"></div>	
								<div class="btn-submit">
									<button class="ui-btn" id="qr-generate">Generate QR Code</button>
								</div>		
								<div class="clear" style="padding-top:1em"></div>
								<p>Short Web Link:</p>
								<div class="clear" style="padding-top:1em"></div>	
								<input type="text" name="shortlink" id="shortlink" value="" >
								<div class="clear" style="padding-top:1em"></div>	
								<div class="btn-submit">
									<button class="ui-btn" id="submit-shortlink">Mini Web Link</button>
								</div>	
							</section>
							<section class="panel-outselfie hide">
								<p>Label Title…</p>
								<form id="frmprintoutselfie" action="#" method="post" enctype="multipart/form-data" >
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" name="outselfie-1" id="outselfie-1" value="We Value Your Feedback" placeholder="We Value Your Feedback" >
								<div class="clear" style="padding-top:0.5em"></div>	
								</form>
								<p>Preview:</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								<div class="QRFrame">
								  <p class="title title-2" style="color:#000">We Value Your Feedback</p>
								  <div class="QRimage2"></div>
								  <p class="shortlink">tabluu.com/hop8e5t=0</p>
								  <div class="qrframelogo"></div>  
								</div>
								<div class="clear" style="padding-top:0.5em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-print4">Print 4 Labels</button>
								</div>	
								<div class="btn-submit">
									<button class="ui-btn" id="submit-print9">Print 9 Labels</button>
								</div>
								<div class="clear" style="padding-top:0.5em"></div>
								<p>Please choose a QR Code size...</p>
								<div class="clear" style="padding-top:0.5em"></div>
								<fieldset data-role="controlgroup" data-corners="false" id="qr-size2">
									<input type="radio" name="post2" id="weba2" value="1" >
									<label for="weba2">100 x 100</label>
									<input type="radio" name="post2" id="webb2" checked="checked" value="2">
									<label for="webb2">200 x 200</label>
									<input type="radio" name="post2" id="webc2" value="3">
									<label for="webc2">300 x 300</label>
									<input type="radio" name="post2" id="webd2" value="4">
									<label for="webd2">400 x 400</label>
									<input type="radio" name="post2" id="webe2" value="5" >
									<label for="webe2">500 x 500</label>
								</fieldset>	
								<div class="clear" style="padding-top:0.5em"></div>	
								<div class="btn-submit">
									<button class="ui-btn" id="qr-generate2">Generate QR Code</button>
								</div>		
								<div class="clear" style="padding-top:1em"></div>
								<p>Short Web Link:</p>
								<div class="clear" style="padding-top:1em"></div>	
								<input type="text" name="shortlink2" id="shortlink2" value="" >
								<div class="clear" style="padding-top:1em"></div>	
								<div class="btn-submit">
									<button class="ui-btn" id="submit-shortlink2">Mini Web Link</button>
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