<?php
?>
<!DOCTYPE html>
<html>
<head>
	<title>Manage Users Panel</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
		<div id="manage" data-role="page" data-ajax="false">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconmanage" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">User Admin</div>			
							<ul class="manage-left-menu" data-role="listview">
								
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header">Manage Users</div>
							<section class="panel-user">
								<div class="btn-submit">
									<button class="ui-btn" id="btn-remove-user">Delete this user?</button>
								</div>	
								<div class="clear" style="padding-top:0.8em"></div>
								<p class="font-17 fl" >Locations this user can access...</p>
								<div class="clear" style="padding-top:0.8em"></div>
								<fieldset id="check-manage-loc" data-role="controlgroup" data-iconpos="left" data-corners="false">
								</fieldset>	
								<div class="clear" style="padding-top:0.8em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="btn-manage-user">Update</button>
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