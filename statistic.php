<!DOCTYPE html>
<html>
<head>
	<title>Statistic Panel</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
<?php

?>
</head>
<body>
	
		<div id="statistic" data-role="page" data-ajax="false">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconstat" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Reports</div>			
							<ul class="stat-left-menu" data-role="listview">
								<li>
									<a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active" data-prefetch="true">Today<span class="listview-arrow-default listview-arrow-active"></span></a>
								</li>
								<li >
									<a href="#" data-prefetch="true">Yesterday<span class="listview-arrow-default"></span></a></li>
								<li >
									<a href="#" data-prefetch="true">Last 7 days<span class="listview-arrow-default"></span></a>
								</li>
								<li >
									<a href="#" data-prefetch="true">Last 14 days<span class="listview-arrow-default"></span></a>
								</li>
								<li >
									<a href="#" data-prefetch="true">Last 21 days<span class="listview-arrow-default"></span></a>
								</li>
								<li >
									<a href="#" data-prefetch="true">Last 30 days<span class="listview-arrow-default"></span></a>
								</li>
								<li >
									<a href="#" data-prefetch="true">Export Data to Excel<span class="listview-arrow-default"></span></a>
								</li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header"></div>
							<section class="panel-today">	
								<p class="font-17 fl" id="statstitle">Average Review Scores for the last 15 days</p>
								<div class="clear" style="padding-top:1em"></div>
								<div id="table-percent">
									<table data-role="table" id="table-reflow1" data-mode="reflow" class="ui-responsive">
									  <thead>
										<tr>
										</tr>
									  </thead>
									  <tbody>
										<tr>
										  <td>Total:<div style="width:250px;"></div></td>
										  <td class="tshared">0</td>
										</tr>
										<tr>
										  <td>Not shared:</td>
										  <td class="notshared">(0%)</td>
										</tr>
										<tr>
										  <td>Shared:</td>
										  <td class="shared">(0%)</td>
										</tr>
										<tr>
									  </tbody>
									</table>	
								</div>	
								<div class="clear" style="padding-top:1em"></div>
								<div class="bg-blue">Not shared on Facebook</div>
								<div class="panel-overall">
									<table data-role="table" id="table-notshare" data-mode="reflow" class="ui-responsive">
										<thead>
											<tr>
											</tr>
										  </thead>
										  <tbody>
											<tr>
											  <td>name<div style="width:250px;"></div></td>
											  <td>0%</td>
											</tr>
										</tbody>
									</table>
									<hr/>
									<table data-role="table" id="overallnoshare" data-mode="reflow" class="ui-responsive">
										<thead>
											<tr>
											</tr>
										  </thead>
										  <tbody>
											<tr>
											  <td>Overall<div style="width:250px;"></div></td>
											  <td>0</td>
											</tr>
										</tbody>
									</table>									
								<div>
								<div class="clear" style="padding-top:1em"></div>
								<div class="bg-blue">Shared on Facebook</div>
								<div class="panel-overall">
									<table data-role="table" id="table-share" data-mode="reflow" class="ui-responsive">
										<thead>
											<tr>
											</tr>
										  </thead>
										  <tbody>
											<tr>
											  <td>name<div style="width:250px;"></div></td>
											  <td>0%</td>
											</tr>
										</tbody>
									</table>
									<hr/>
									<table data-role="table" id="overallshare" data-mode="reflow" class="ui-responsive">
										<thead>
											<tr>
											</tr>
										  </thead>
										  <tbody>
											<tr>
											  <td>Overall<div style="width:250px;"></div></td>
											  <td>0</td>
											</tr>
										</tbody>
									</table>									
								<div>
							</section>
							<section class="panel-export hide">
								<p id="title-export">Note: First review on</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								<p>Start date:</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								<input type="text" class="date-input" id="start-date" data-inline="false" data-role="date">
								<div class="clear" style="padding-top:0.5em"></div>	
								<p>End date:</p>
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" class="date-input" id="end-date" data-inline="false" data-role="date">
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-export">Export</button>
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