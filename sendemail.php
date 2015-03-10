<?php
?>
<!DOCTYPE html>
<html>
<head>
	<title>Send Emails Panel</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
	
		<div id="send-email" data-role="page" data-ajax="false">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconsend" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Send Emails</div>			
							<ul class="send-left-menu" data-role="listview">
								<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Send Emails<span class="listview-arrow-default listview-arrow-active"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header">Send Emails</div>
							<section class="panel-send">
								<p class="font-17 fl" id="total-followers">Total number of followers:</p>
								<div class="clear"></div>
								<p class="font-17 fl" id="available">Email credits available:</p>
								<div class="clear" style="padding-top:1.2em"></div>
								<input type="text" data-clear-btn="true" name="txtSubject" id="txtSubject" value="" placeholder="Subject...">
								<div class="clear" style="padding-top:1.4em"></div>
								<div>
									<textarea name="bbcode_field" id="textarea-send" style="height:400px;width:100%;max-height: 900px;"></textarea>
								</div>
								
								<div class="clear" style="padding-top:0.8em"></div>
								<p class="font-17 fl">Send emails to followers of these businesses / locations...</p>
								<div class="clear" style="padding-top:0.8em"></div>
								<fieldset id="box-send-name" data-role="controlgroup" data-iconpos="left" data-corners="false">
								</fieldset>	
								<div class="clear" style="padding-top:0.8em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-sendemail">Send</button>
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