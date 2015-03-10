<?php
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$sql = "CREATE TABLE IF NOT EXISTS `businessSocialMedia` (
  `id` int(11) NOT NULL,
  `placeId` int(11) NOT NULL,
  `fbId` int(11) NOT NULL,
  `isshared` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
mysql_query($sql);
$connect->db_disconnect();
?>
<!DOCTYPE html>
<html>
<head>
	<title>Post to Social Networks</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
		<div id="social" data-role="page">
			<div class="content-wrap" style="background-color:#cbe7f2;">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconfbpost" />
					</div>
				</div><!-- /header -->
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Customers’ Facebook Posts</div>			
							<ul class="social-left-menu" data-role="listview">
								<li><a href="#">Add Social Media Networks<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Select Social Media Networks for Auto Posting<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Manual Posting to Social Media Networks<span class="listview-arrow-default"></span></a></li>
							</ul>	
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header">Customers Facebook Posts</div>
							<section class="panel-social-add hide">	
								<ul class="social-left-menu" data-role="listview">
								<li><a href="#">Add Facebook Page<span class="listview-arrow-default"></span></a></li>
							</ul>	
							</section>
							
							<section class="panel-social-select hide">
								<p>Choose the social network(s) for shared reviews to be automatically posted.</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								 <fieldset data-role="controlgroup" id="sharedsocial">
									<input type="checkbox" value="fb" name="checkbox-fbselect" id="checkbox-fbselect">
									<label for="checkbox-fbselect">Facebook</label>
								</fieldset>
							</section>
							<section class="panel-social-manual hide">
									<div class="btn-submit">
									<button class="ui-btn" id="post-manual">Start Posting Manually</button>
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