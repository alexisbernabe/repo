<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
?>
<!DOCTYPE html>
<html> 
<head>
	<title>Login</title>
    <meta name="robots" content="index, follow"/>
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
	<link type="text/css" rel="stylesheet" href="css/dialog.css" type="text/css">
	<link type="text/css" rel="stylesheet" href="css/style.css" />
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.mobile-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/jquery.form.min.js"></script>
	<script type="text/javascript" src="js/jquery.md5.js"></script>
	<script type="text/javascript" src="js/dialog.js"></script>	
	<script type="text/javascript" src="js/login.js"></script>
	<script type="text/javascript">
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-46314042-2', 'tabluu.com');
	  ga('send', 'pageview');
	</script>
</head>
<body>
		<div id="login" data-role="page" data-prefetch="false">

			<div class="content-wrap">
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="contentwrap">
							<div class="logo-login"></div>
							<div class="clear" style="padding-top:2.6em"></div>
							<div style="padding:0 5px;">
								<input type="text" data-clear-btn="false" name="signInEmail" id="signInEmail" value="" placeholder="email">
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="password" data-clear-btn="false" name="signInPwd" id="signInPwd" value="" placeholder="password">
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-signing">Sign In</button>
								</div>
							</div>
							<div class="clear" style="padding-top:1em"></div>
							<div class="prob-login">Problems signing in?</div>
							<div class="clear" style="padding-top:1.5em"></div>
							<div data-role="popup" id="popup-prob-login">
							  <div data-role="main" class="ui-content">
									<a href="#" class="ui-corner-all ui-shadow ui-btn-inline ui-btn-b ui-icon-back ui-btn-icon-left" data-rel="back"></a>
								<div style="padding:20px 10px;">	
									<p>Verify your Email. This protects your account from unauthorized access.</p>
									<div class="wrap">
										<input type="text" data-clear-btn="false" name="codemail" id="codemail" value="" placeholder="email">
										<div class="clear" style="padding-top:0.5em"></div>
										
										<table data-role="table" id="table-share" data-mode="reflow" class="ui-responsive">
										<thead>
											<tr>
											</tr>
										  </thead>
										  <tbody>
											<tr>
											  <td><input type="text" data-clear-btn="false" name="txtcode" id="txtcode" disabled="" value=""></div></td>
											  <td id="codereload" style="font-size:10px;cursor:pointer;"><div style="height:16px;"><img src="images/template/reload.gif" style="margin-top:13px;padding-right:5px;" width="16" height="16"/>Try a new code</div></td>
											</tr>
										</tbody>
									</table>
										<div class="clear" style="padding-top:0.5em"></div>
										<input type="text" data-clear-btn="false" name="confirmcode" id="confirmcode" value="" placeholder="type the code shown above">
										<p id="invalidcode" style="font-size:10px;color:red;height:8px;margin-top:8px;"></p>
										<div class="btn-submit">
											<button class="ui-btn" id="submit-setpwd">Submit</button>
										</div>
									</div>
								</div>
							  </div>

							</div>
			
						</div>
					</div>			
				</div><!-- /content -->
				<div data-role="footer"><div class="create-accnt">Create a Tabluu account</div></div><!-- /footer -->
			</div>
			
  </div>
		</div><!-- /page -->		
</body>
</html>