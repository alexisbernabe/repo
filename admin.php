<?php

?>
<!DOCTYPE html>
<html>
<head>
	<title>User Admin Panel</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
	
		<div id="admin" data-role="page" data-ajax="false">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconadmin" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">User Admin</div>			
							<ul class="admin-left-menu" data-role="listview">
								<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Add New User<span class="listview-arrow-default listview-arrow-active"></span></a></li>
								<li><a href="#">Manage Users<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Profile &amp; Password<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content fr">
							<div class="right-header"></div>
							<section class="panel-new hide">									
								<p class="font-17 fl">Is this new user an administrator?</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								<fieldset data-role="controlgroup" data-corners="false" id="permission">
									<input type="radio" name="radio-a" id="radio-a" value="2" >
									<label for="radio-a">no</label>
									<input type="radio" name="radio-a" id="radio-b" value="1">
									<label for="radio-b">yes</label>
								</fieldset>
								<input type="text" data-clear-btn="true" name="txtfname" id="txtfname" value="" placeholder="first name">
								<input type="text" data-clear-btn="true" name="txtlname" id="txtlname" value="" placeholder="last name">
								<input type="text" data-clear-btn="true" name="txtemail" id="txtemail" value="" placeholder="email address">
								<div class="clear" style="padding-top:0.5em"></div>	
								<div class="btn-submit">
									<button class="ui-btn" id="submit-invite">Invite</button>
								</div>								
							</section>
							<section class="panel-users hide">
								<ul class="admin-right-menu" data-role="listview"><li ><a href="manageuser.html" data-prefetch="true"><img src="images/template/iconOwner.png" alt="" class="ui-li-icon ui-corner-none">Test user<span class="listview-arrow-default"></span></a></li><li ><a href="manageuser.html" data-prefetch="true"><img src="images/template/iconAdmin.png" alt="" class="ui-li-icon ui-corner-none">Test user2<span class="listview-arrow-default"></span></a></li></ul>
							</section>
							<section class="panel-pwd hide">
								<input type="text" data-clear-btn="true" name="txtfname1" id="txtfname1" value="" placeholder="first name">
								<input type="text" data-clear-btn="true" name="txtlname1" id="txtlname1" value="" placeholder="last name">
								<input type="text" data-clear-btn="true" name="txtaddress" id="txtaddress" value="" placeholder="email address">
								<input type="password" data-clear-btn="true" name="newpwd" id="newpwd" value="" placeholder="new password">
								<input type="password" data-clear-btn="true" name="newpwdConfirm" id="newpwdConfirm" value="" placeholder="confirm password">
								<div class="clear" style="padding-top:0.5em"></div>	
								<div class="btn-submit">
									<button class="ui-btn" id="submit-updatepwd">Update</button>
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