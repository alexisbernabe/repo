<?php
$noPhoto = 'images/template/no-photo.gif';
$time_zones = timezone_identifiers_list();
$tz = '<option value="none" selected="selected">Select Time Zone</option>';
foreach($time_zones as $zones){
	if($zones <> 'UTC')		
		$tz.= "<option value=".$zones.">".$zones."</option>";	
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Profile Panel</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
	
</head>
<body>
	
		<div id="profile" data-role="page">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconpro" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Business Web Page</div>			
							<ul class="profile-left-menu2" data-role="listview">
								<li ><a href="#">Profile<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header"></div>
							<section class="pro-section hide">
								<form id="frmpro" action="#" method="post" enctype="multipart/form-data" >
									<select name="select-category" id="select-category">
											<option value="" selected="selected">Select a Category</option>
											<option value="Accomodation">Accomodation</option>
											<option value="Arts & Entertainment">Arts & Entertainment</option>
											<option value="Auto Sales, Rental & Repair">Auto Sales, Rental & Repair</option>
											<option value="Beauty">Beauty</option>
											<option value="Child Care">Child Care</option>
											<option value="Health & Fitness">Health & Fitness</option>
											<option value="Home Services">Home Services</option>
											<option value="Massage">Massage</option>
											<option value="Personal Training">Personal Training</option>
											<option value="Photography">Photography</option>
											<option value="Real Estate">Real Estate</option>
											<option value="Restaurant, Cafe & Food and Beverage">Restaurant, Cafe & Food and Beverage</option>
											<option value="Travel">Travel</option>
											<option value="Wedding Planning">Wedding Planning</option>
											<option value="Online">Online / Ecommerce</option>
											<option value="Others">Others</option>
									</select>
								<input type="text" data-clear-btn="true" name="txtname" id="txtname" value="" placeholder="business name">
								<label for="number-1"></label>
								<input type="text" data-clear-btn="true" name="txtadd" id="txtadd" value="" placeholder="address">
								<label for="number-1"></label>
								<input type="text" data-clear-btn="true" name="txtcity" id="txtcity" value="" placeholder="city">
								<label for="number-1"></label>
								<input type="text" data-clear-btn="true" name="txtcountry" id="txtcountry" value="" placeholder="country">
								<label for="number-1"></label>
								<input type="text" data-clear-btn="true" name="txtzip" id="txtzip" value="" placeholder="ZIP / Postal code">
								<label for="number-1"></label>
								<input type="text" data-clear-btn="true" name="txtproemail" id="txtproemail" value="" placeholder="email address">
								<label for="number-1"></label>
								<select name="profile-timezone" id="profile-timezone">
                                	<?=$tz?>
                                </select>
								<label for="number-1"></label>
								<input type="text" data-clear-btn="true" name="txtpho" id="txtpho" value="" placeholder="telephone (optional)">
                                <label for="number-1"></label>
								<input type="text" data-clear-btn="true" name="txtfb" id="txtfb" value="" placeholder="facebook page url (optional)">
								<label for="number-1"></label>
								<input type="text" data-clear-btn="true" name="txtweb" id="txtweb" value="" placeholder="website url (optional)">
								<label for="number-1"></label>
								<input type="text" data-clear-btn="true" name="txtbooknow" id="txtbooknow" value="" placeholder="book now url (optional)">
								<div class="btn-submit">
									<button class="ui-btn" id="submit-pro">Submit</button>
								</div>
								</form>
							</section>
							
							<section class="desc-section hide">
							   <div class="clear"></div>
							    <div class="clear" style="padding-top:0.2em"></div>
								<p class="font-17 fl">Description of your product or service (up to 300 words)</p>
								 <div class="clear" style="padding-top:1.4em"></div>
								<div>
									<textarea name="bbcode_field" id="textarea-desc" style="height:400px;width:100%;max-height: 900px;"></textarea>
								</div>
								<div class="clear" style="padding-top:0.8em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-desc">Submit</button>
								</div>								
							</section>	
							<section class="open-section hide">
								<div class="clear" style="padding-top:0.2em"></div>
								<p class="font-17 fl">Description of your opening hours (up to 150 words)</p>
								<div class="clear" style="padding-top:1.4em"></div>
								<div>
									<textarea name="bbcode_field" id="textarea-hour" style="height:400px;width:100%;max-height: 900px;"></textarea>
								</div>
								<div class="clear" style="padding-top:0.8em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-hour">Submit</button>
								</div>
							</section>
							<section class="photo-section hide">
								 
								<span class="font-17 fl">Upload images for your Tabluu page...</span>
								<div class="clear"></div>
								<form id="frmweb" action="setPhoto.php" method="post" enctype="multipart/form-data" >
									<button class="ui-btn" id="uploadweb">Upload Images</button>
									<div style="visibility:hidden;height:0px">
									<input type="file" name="fileweb" style="visibility:hidden;height:0px" id="fileweb" value="">
									</div>
									<input type="hidden" value="" name="placeidweb" id="placeidweb" />
									<input type="hidden" value="" name="typeweb" id="typeweb" />
									<input type="hidden" value="" name="imgtitle" id="imgtitle" />
									<input type="hidden" value="" name="imgdesc" id="imgdesc" />
								 </form>	
								 <div class="clear" style="padding-top:0.5em"></div>
								 <div id="container">
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb1" width="200" height="200" />
											</div>
											<div class="titledesc ishide1">
												<p>T: <span class="title1"></span></p><p>D: <span class="desc1"></span></p>
											</div>
										</div>
									</div>
										 
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb2" width="200" height="200" />
											</div>
											<div class="titledesc ishide2">
												<p>T: <span class="title2"></span></p><p>D: <span class="desc2"></span></p>
											</div>
										</div>
									</div>
										 
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb3" width="200" height="200" />
											</div>
											<div class="titledesc ishide3">
												<p>T: <span class="title3"></span></p><p>D: <span class="desc3"></span></p>
											</div>
										</div>
									</div>
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb4" width="200" height="200" />
											</div>
											<div class="titledesc ishide4">
												<p>T: <span class="title4"></span></p><p>D: <span class="desc4"></span></p>
											</div>
										</div>
									</div>
								<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb5" width="200" height="200" />
											</div>
											<div class="titledesc ishide5">
												<p>T: <span class="title5"></span></p><p>D: <span class="desc5"></span></p>
											</div>
										</div>
									</div>
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb6" width="200" height="200" />
											</div>
											<div class="titledesc ishide6">
												<p>T: <span class="title6"></span></p><p>D: <span class="desc6"></span></p>
											</div>
										</div>
									</div>
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb7" width="200" height="200" />
											</div>
											<div class="titledesc ishide7">
												<p>T: <span class="title7"></span></p><p>D: <span class="desc7"></span></p>
											</div>
										</div>
									</div>
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb8" width="200" height="200" />
											</div>
											<div class="titledesc ishide8">
												<p>T: <span class="title8"></span></p><p>D: <span class="desc8"></span></p>
											</div>
										</div>
									</div>
								</div>
								 <div class="clear" style="padding-top:1em"></div>
								 <span class="color-grey font-12 fl">Note: Max image size is 1000kb</span>		
								  <div class="clear" style="padding-top:1em"></div>
							</section>	
							<section class="map-section hide">	
								<div class="clear" style="padding-top:0.2em"></div>
								<span class="font-17 fl">Flick the switch “Off” to remove the map on your Tabluu page</span>
								<div class="clear"></div>
								<select name="flipmap" id="flipmap" data-role="flipswitch" data-corners="false">
									<option value="0">Off</option>
									<option value="1">On</option>
								</select>
								<div class="clear" style="padding-top:0.5em"></div>
								<span class="font-17 fl">Move the marker to your desired location on the map</span>
								<div class="clear" style="padding-top:1em"></div>
								<div id="map-canvas"></div>	
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-map">Update Marker's New Position</button>
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