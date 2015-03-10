<?php

?>
<!DOCTYPE html>
<html>
<head>
	<title>Setup Panel</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
	
		<div id="setup" data-role="page"  data-dom-cache="false" data-prefetch="false" data-ajax="false">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" id="setup-logo" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconsetup" />
					</div>
				</div><!-- /header -->			
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Setup</div>			
							<ul class="setup-left-menu" data-role="listview">
								<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Your Tabluu (Business) Page<span class="listview-arrow-default listview-arrow-active"></span></a></li>
								<li><a href="#">Customize Feedback / Review Page<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">What Question(s) to Ask?<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Customers’ Facebook Posts<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Poor Feedback Alerts<span class="listview-arrow-default"></span></a></li>
								<!--<li><a href="#">Post to Social Networks<span class="listview-arrow-default"></span></a></li>-->
							</ul>							
						</div>
						<div class="right-content fr">
							<div class="right-header"></div>
							<section class="panel-profile hide">									
								<ul class="profile-left-menu1" data-role="listview"><li ><a href="profile.html" data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-prefetch="true">Description<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-prefetch="true">Opening Hours<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-prefetch="true">Photos<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html"  data-prefetch="true">Map Display<span class="listview-arrow-default"></span></a></li></ul>										
							</section>
							<section class="panel-UIC hide">
								<ul class="right-menu" data-role="listview"><li ><a href="uic.html" data-prefetch="true">Logo<span class="listview-arrow-default"></span></a></li><li ><a href="uic.html" data-prefetch="true">Background Image<span class="listview-arrow-default"></span></a></li><li ><a href="uic.html" data-prefetch="true">Background Color<span class="listview-arrow-default"></span></a></li><li ><a href="uic.html" data-prefetch="true">Font Color<span class="listview-arrow-default"></span></a></li><li ><a href="uic.html" data-prefetch="true">Text Below Stars<span class="listview-arrow-default"></span></a></li><li ><a href="uic.html" data-prefetch="true">Text in Buttons<span class="listview-arrow-default"></span></a></li><li ><a href="uic.html" data-prefetch="true">Text in Messages<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true" id="seefeedback">See the Feedback / Review Page<span class="listview-arrow-default"></span></a></li></ul>
							</section>
							<section class="panel-postFB hide">
								<ul class="right-menu" data-role="listview">
								<li><a href="fbpost.html" data-prefetch="true">What to post to social media?<span class="listview-arrow-default"></span></a></li>
								<li ><a href="fbpost.html" data-prefetch="true">Post Reviews to Facebook &amp; Tabluu?<span class="listview-arrow-default"></span></a></li>
								<li ><a href="fbpost.html" data-prefetch="true">Customize Message<span class="listview-arrow-default"></span></a></li>
								</ul>
							</section>
							<section class="panel-socialmedia hide">
								<ul class="right-menu" data-role="listview">
								<li><a href="socialmedia.html" data-prefetch="true">Add Social Media Networks<span class="listview-arrow-default"></span></a></li>
								<li ><a href="socialmedia.html" data-prefetch="true">Select Social Media Networks for Auto Posting<span class="listview-arrow-default"></span></a></li>
								<li ><a href="socialmedia.html" data-prefetch="true">Manual Posting to Social Media Networks<span class="listview-arrow-default"></span></a></li>
								</ul>
							</section>
							<section class="panel-question hide">
								<div class="btn-submit">
									<button class="ui-btn" id="seefeedback3">See the Feedback / Review Page</button>
								</div>
								<div class="clear" style="padding-top:0.5em"></div>
								<p>Flick the switch "On" to start getting feedback / reviews</p>
								<div class="clear" style="padding-top:0.5em"></div>
							<select name="flipsetting" id="flipsetting" data-role="flipswitch" data-corners="false">
								<option value="1">Off</option>
								<option value="0">On</option>
							</select>	
							<div class="clear" style="padding-top:0.5em"></div>							
							<ul class="addnew-rate" data-role="listview">
							    <li><a href="#"><img src="images/template/plus.png" alt="" class="ui-li-icon ui-corner-none">Add a new question &amp; press enter...</a></li>
							</ul>
                            <span class="text-rate hide"><input type="text" name="txtrate" id="txtrate" value="" placeholder="Add a new question &amp; press enter..."></span>
							<div class="clear" style="padding-top:0.5em"></div>	
								<fieldset id="ratetext" data-role="controlgroup" data-iconpos="left" data-corners="false">
								</fieldset>	
								<div class="clear" style="padding-top:0.5em"></div>									
							</section>	
							
							<section class="setup-email-alert hide">	
								<form id="frmAlert" action="#" method="post" onsubmit="return false;" enctype="multipart/form-data" >
								<p>Send alerts to...</p>
								<div class="clear" style="padding-top:1em"></div>	
								<input type="text" name="multi-email" id="multi-email" value="" placeholder="email address">
								<div class="clear" style="padding-top:0.5em"></div>	
								 <span class="color-grey font-12 fl">(Please use commas to separate multiple email addresses)</span>
								<div class="clear" style="padding-top:1em"></div>	
								<p>Send email alerts?</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								<fieldset data-role="controlgroup" data-corners="false" id="alertsend">
									<input type="radio" name="radioalert" id="radioalert1" value="0">
									<label for="radioalert1">no</label>
									<input type="radio" name="radioalert" id="radioalert2" value="1">
									<label for="radioalert2">yes</label>
								</fieldset>
								<div class="clear" style="padding-top:0.5em"></div>	
								<p>Alert for?</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								<fieldset data-role="controlgroup" data-corners="false" id="alertsend2">
									<input type="radio" name="aleftfor" id="aleftfor-a" value="0">
									<label for="aleftfor-a">average rating</label>
									<input type="radio" name="aleftfor" id="aleftfor-b" value="1">
									<label for="aleftfor-b">individual rating</label>
								</fieldset>	
								<div class="clear" style="padding-top:0.5em"></div>	
								<div class="hide individual">
									<p>When Individual rating is...</p>
									<div class="clear" style="padding-top:0.5em"></div>	
									<fieldset data-role="controlgroup" data-corners="false" id="alertsend3">
										<input type="radio" name="indiRate" id="indiRate-a" value="0">
										<label for="indiRate-a">1</label>
										<input type="radio" name="indiRate" id="indiRate-b" value="1">
										<label for="indiRate-b">2 & below</label>
									</fieldset>	
								</div>
								<div class="average">
									<p>When Average rating is below...</p>
									<div class="clear" style="padding-top:0.5em"></div>	
									<fieldset data-role="controlgroup" data-corners="false" id="aveAlert">
									<input type="radio" name="average" id="ave-a" value="1.0">
									<label for="ave-a">1.0</label>
									<input type="radio" name="average" id="ave-b" value="1.25">
									<label for="ave-b">1.25</label>
									<input type="radio" name="average" id="ave-c" value="1.5">
									<label for="ave-c">1.5</label>
									<input type="radio" name="average" id="ave-d" value="1.75">
									<label for="ave-d">1.75</label>
									<input type="radio" name="average" id="ave-e" value="2.0" >
									<label for="ave-e">2.0</label>
									<input type="radio" name="average" id="ave-f" value="2.25">
									<label for="ave-f">2.25</label>
									<input type="radio" name="average" id="ave-g" value="2.5">
									<label for="ave-g">2.5</label>
									<input type="radio" name="average" id="ave-h" value="2.75">
									<label for="ave-h">2.75</label>
									<input type="radio" name="average" id="ave-i" value="3.0">
									<label for="ave-i">3.0</label>
									<input type="radio" name="average" id="ave-j" value="3.25">
									<label for="ave-j">3.25</label>
									<input type="radio" name="average" id="ave-k" value="3.5">
									<label for="ave-k">3.5</label>
									<input type="radio" name="average" id="ave-l" value="3.75">
									<label for="ave-l">3.75</label>
									<input type="radio" name="average" id="ave-o" value="4.0" >
									<label for="ave-o">4.0</label>
									<input type="radio" name="average" id="ave-p" value="4.25">
									<label for="ave-p">4.25</label>
									<input type="radio" name="average" id="ave-q" value="4.5">
									<label for="ave-q">4.5</label>
									<input type="radio" name="average" id="ave-r" value="4.75">
									<label for="ave-r">4.75</label>
								</fieldset>		
								</div>
								<div class="clear" style="padding-top:0.5em"></div>	
								<div class="btn-submit">
									<button class="ui-btn" id="submit-average">Update</button>
								</div>
								</form>
							</section>
						</div>
					</div>			
				</div><!-- /content -->
				<?php require_once('footer.html'); ?>
			</div>
		</div><!-- /page -->
</body>
</html>