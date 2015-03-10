<!DOCTYPE html>
<html>
<head>
	<title>Reviews Management UI</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
		<div id="reviews" data-role="page">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconReview" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Reviews</div>			
							<ul class="reviews-left-menu" data-role="listview">
								<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Shared<span class="listview-arrow-default listview-arrow-active"></span></a></li>
								<li ><a href="#" class="qrcode">Not Shared<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#">Featured<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header">Reviews</div>	
							<section class="reviews-shared">
								<div id="shared"></div>
								<!--
								<div class="divwrap" style="padding-top:5px;">
									<div style="padding:10px 20px;">
										<div class="iconProfile">
											<div class="wrapImg"><img src="https://graph.facebook.com/100001247766045/picture?type=large" /></div>
											<div class="profilename">name asdffds asfdasfd asfd</div>
										</div>
										<div class="imgSelfie">
											<div class="wrapImg2"><img src="http://www.tabluu.com/app/images/shared/1008/913461164.jpg" /></div>
										</div>
									</div>
								</div>
								<div class="divwrap" style="margin-top:10px;">
									<table cellspacing="0">
											<tr>
												<th class="padLeft-5 c1">Areas</th>
												<th class="score c1">Score</th>
												<th class="date c1">Manage</th>
											</tr>
											<tr>
												<td class="padLeft-5">services</td>
												<td class="center">3.5</td>
												<td class="center" rowspan="7" style="vertical-align:middle;">
													<div style=""><p>13 June 2013</p>
														<fieldset id="ratetext" data-role="controlgroup" data-iconpos="left" data-corners="false">
														<input type="checkbox" name="feature" id="feature" />
														<label for="feature">Feature?</label>
														<input type="checkbox" name="hideImg" id="hideImg" />
														<label for="hideImg">Hide Image?</label>
														</fieldset>	
													</div>
												</td>
											</tr>
											<tr>
												<td class="padLeft-5">Services</td>
												<td class="center">3.5</td>
											</tr>
											<tr>
												<td class="padLeft-5">Food</td>
												<td class="center">3.5</td>
											</tr>
											<tr>
												<td class="padLeft-5">Staff</td>
												<td class="center">3.5</td>
											</tr>
											<tr>
												<td class="padLeft-5">Location</td>
												<td class="center">3.5</td>
											</tr>
											<tr>
												<td class="padLeft-5">Overall</td>
												<td class="center">3.5</td>
											</tr>
									</table>
								</div>
								<div class="divwrap" style="margin-top:10px;padding-bottom:10px;">
									<div class="c1 Bottomborder" style="padding:5px;">Comment</div>
									<p class="padLeft-5">asfdsfad asdfasfd asdf asfd asdf asfd asdfjasdf asdf asdf</p>
								</div>-->
							</section>
							<section class="reviews-notshared hide">
								<div id="notshared"></div>
								<!--<div class="divwrap" style="margin-top:10px;">
									<table cellspacing="0">
											<tr>
												<th class="padLeft-5 c1">Areas</th>
												<th class="score c1">Score</th>
												<th class="date c1">Manage</th>
											</tr>
											<tr>
												<td class="padLeft-5">services</td>
												<td class="center">3.5</td>
												<td class="center" rowspan="7">
													<div style=""><p>13 June 2013</p>
													</div>
												</td>
											</tr>
											<tr>
												<td class="padLeft-5">Services</td>
												<td class="center">3.5</td>
											</tr>
											<tr>
												<td class="padLeft-5">Food</td>
												<td class="center">3.5</td>
											</tr>
											<tr>
												<td class="padLeft-5">Staff</td>
												<td class="center">3.5</td>
											</tr>
											<tr>
												<td class="padLeft-5">Location</td>
												<td class="center">3.5</td>
											</tr>
											<tr>
												<td class="padLeft-5">Overall</td>
												<td class="center">3.5</td>
											</tr>
									</table>
								</div>
								<div class="divwrap" style="margin-top:10px;padding-bottom:10px;">
									<div class="c1 Bottomborder" style="padding:5px;">Comment</div>
									<p class="padLeft-5">asfdsfad asdfasfd asdf asfd asdf asfd asdfjasdf asdf asdf</p>
								</div>	-->									
							</section>
							<section class="reviews-featured hide">									
								<div id="feature"></div>										
							</section>
						</div>
					</div>	
						
				</div><!-- /content -->
				<?php require_once('footer.html'); ?>
			</div>
		</div><!-- /page -->
		
</body>
</html>