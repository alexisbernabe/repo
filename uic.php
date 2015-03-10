<?php
$noPhoto = 'images/template/no-photo.gif';
?>
<!DOCTYPE html>
<html>
<head>
	<title>User Interface for Customer Panel</title>
	<meta content="width=device-width, minimum-scale=1, maximum-scale=1" name="viewport">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>

</head>
<body>
	
		<div id="uic" data-role="page">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconuic" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Customize Feedback / Review Page</div>			
							<ul class="uic-left-menu" data-role="listview">
								<li ><a href="#">Logo<span class="listview-arrow-default"></span></a></li><li ><a href="#" >Background Image<span class="listview-arrow-default"></span></a></li><li ><a href="#">Background Color<span class="listview-arrow-default"></span></a></li><li ><a href="#" >Font Color<span class="listview-arrow-default"></span></a></li><li ><a href="#">Text Below Stars<span class="listview-arrow-default"></span></a></li><li ><a href="#">Text in Buttons<span class="listview-arrow-default"></span></a></li><li ><a href="#">Text in Message<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#" data-prefetch="true" id="seefeedback2">See the Feedback / Review Page<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header"></div>
							<section class="uic-section-logo hide">
								<div class="clear"></div>
								<form id="frmlogo" action="setPhoto.php" method="post" enctype="multipart/form-data" >
									<button class="ui-btn" id="uploadlogo">Upload an Image</button>
									<input type="file" name="filelogo" style="visibility:hidden;height:0px" id="filelogo" value="">
									<input type="hidden" value="" name="placeIdLogo" id="placeIdLogo" />
								 </form>
								 <div class="thumb">
									<img src="<?php echo $noPhoto ?>" id="logothumb" height="190" style="width:100%" />
								 </div>
								 <div class="clear" style="padding-top:0.5em"></div>
								<span class="color-grey font-12 fl">
									<p>Max width 600px; Max height 600px</p>
									<p>Recommended logo sizes: Horizontal logo: 500px by 200px Vertical logo: 300px by 450px</p>
									<p>Tip 1: Uploaded logo image will be used for laptop resolution: 1366 x 768. Logo's size will be automatically reduced to fit multiple device resolution.</p>
									<p>Tip 2: Lock device's screen orientation to landscape for horizontal logo. Lock device's screen orientation to portrait for vertical logo</p>
								</span>	
							</section>
							<section class="uic-section-img hide">
								<div class="clear"></div>
								<form id="frmbackground" action="setPhoto.php" method="post" enctype="multipart/form-data" >
									<button class="ui-btn" id="uploadbackground">Upload an Image</button>
									<input type="file" name="filebackground" style="visibility:hidden;height:0px" id="filebackground" value="">
									<input type="hidden" value="" name="placeIdbackground" id="placeIdbackground" />
								 </form>
								 <div class="thumb">
									<img src="<?php echo $noPhoto ?>" id="backgroundthumb" height="190" style="width:100%" />
								 </div>
								 <div class="clear" style="padding-top:0.5em"></div>
								<span class="color-grey font-12 fl">
									<p>For best results, upload an image based on your device's…</p>
									<p>1. Display resolution</p>
									<p>2. Screen orientation.</p>
									<p>For example, if you are using Ipad mini locked on landscape orientation, you should upload an image 1024px by 768px.</p>
								</span>	
							</section>	
							<section class="uic-section-bg hide">
								<p class="font-17 fl">Set a background color...</p>
								<div class="clear" style="padding-top:1em"></div>
								<div id="pickerbackground"></div>
							</section>
							<section class="uic-section-fc hide">
								<p class="font-17 fl">Set a font color...</p>
								<div class="clear" style="padding-top:1em"></div>
								<div id="pickerfont"></div>								
							</section>	
							<section class="uic-section-tbs hide">
								<form id="frmUIC1" action="#" method="post" enctype="multipart/form-data" >
									<input type="text" data-clear-btn="true" name="txtvpoor" id="txtvpoor" value="Very poor" placeholder="Very poor">
									<input type="text" data-clear-btn="true" name="txtpoor" id="txtpoor" value="Poor" placeholder="Poor">
									<input type="text" data-clear-btn="true" name="txtfair" id="txtfair" value="Average" placeholder="Average">
									<input type="text" data-clear-btn="true" name="txtgood" id="txtgood" value="Good" placeholder="Good">
									<input type="text" data-clear-btn="true" name="txtexc" id="txtexc" value="Excellent" placeholder="Excellent">
									<div class="clear" style="padding-top:0.5em"></div>
									<div class="btn-submit">
										<button class="ui-btn" id="submit-tbs">Submit</button>
									</div>
								</form>
							</section>
							<section class="uic-section-tb hide">
								<form id="frmUIC2" action="#" method="post" enctype="multipart/form-data" >
									<p class="btnTakeSelfie">Take a selfie (self photo)!</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="btnTakeSelfie" id="btnTakeSelfie" value="no" placeholder="no">
										</div>
										<div class="fr w60">
											<input type="text" name="btnTakeSelfie2" id="btnTakeSelfie2" value="yes" placeholder="yes">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="btnfeedbackSelfie">Take a photo?</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="btnfeedbackSelfie" id="btnfeedbackSelfie" value="no" placeholder="no">
										</div>
										<div class="fr w60">
											<input type="text" name="btnfeedbackSelfie2" id="btnfeedbackSelfie2" value="yes" placeholder="yes">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="share">Please share your experience...</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="txtshare1" id="txtshare1" value="no" placeholder="no">
										</div>
										<div class="fr w60">
											<input type="text" name="txtshare2" id="txtshare2" value="yes" placeholder="yes">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="log-out">You'll be logged out of Facebook after sharing.</p>
									<div class="clear" style="padding-top:1em;width:8.1em;">
										<div class="fl w60">
											<input type="text" name="txt-logout" id="txt-logout" value="okay" placeholder="okay">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="leave">Do you wish to leave your contact details so that we may get in touch with you?</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="txtleave1" id="txtleave1" value="no" placeholder="no">
										</div>
										<div class="fr w60">
											<input type="text" name="txtleave2" id="txtleave2" value="yes" placeholder="yes">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="allow">Press &quot;submit&quot; to agree with Tabluu's <privacy_policy_link> & allow <brand> to contact you.</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="txtallow1" id="txtallow1" value="no" placeholder="cancel">
										</div>
										<div class="fr w60">
											<input type="text" name="txtallow2" id="txtallow2" value="yes" placeholder="submit">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="recommend">Recommend &amp; share?</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="txtrecommend1" id="txtrecommend1" value="skip" placeholder="skip">
										</div>
										<div class="fr w60">
											<input type="text" name="txtrecommend2" id="txtrecommend2" value="submit" placeholder="submit">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="follow-loc">Follow <brand>?</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="follow-no" id="follow-no" value="no" placeholder="no">
										</div>
										<div class="fr w60">
											<input type="text" name="follow-yes" id="follow-yes" value="yes" placeholder="yes">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="next">Next reviewer, please.</p>
									<div class="clear" style="padding-top:1em;width:8.1em;">
										<div class="fl w60">
											<input type="text" name="txtnxt" id="txtnxt" value="okay" placeholder="okay">
										</div>
									</div>		
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="take">Take a new photo?</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="txtphoto1" id="txtphoto1" value="no" placeholder="no">
										</div>
										<div class="fr w60">
											<input type="text" name="txtphoto2" id="txtphoto2" value="yes" placeholder="yes">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="option">Choose an option…</p>
									<div class="clear" style="padding-top:1em;width:23em;">
										<div class="fl w60">
											<input type="text" name="txtoption1" id="txtoption1" value="cancel" placeholder="cancel">
										</div>
										<div style="padding-left:1em" class="fl w60">
											<input type="text" name="txtoption2" id="txtoption2" value="login" placeholder="login">
										</div>
										<div class="fr w60">
											<input type="text" name="txtoption3" id="txtoption3" value="reset" placeholder="reset">
										</div>
									</div>	
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="pass">Enter the password…</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="txtpass1" id="txtpass1" value="cancel" placeholder="cancel">
										</div>
										<div class="fr w60">
											<input type="text" name="txtpass2" id="txtpass2" value="submit" placeholder="submit">
										</div>
									</div>								
									<div class="clear" style="padding-top:0.5em"></div>
									<div class="btn-submit">
										<button class="ui-btn" id="submit-tb">Submit</button>
									</div>
								</form>
							</section>	
							<section class="uic-section-box hide">
								<form id="frmUIC3" action="#" method="post" enctype="multipart/form-data" >
									<input type="text" data-clear-btn="true" name="txtbox19" id="txtbox19" value="Take a selfie (self photo)!" placeholder="Take a selfie (self photo)!">
									<input type="text" data-clear-btn="true" name="txtbox18" id="txtbox18" value="Don't be shy! And say &quot;yeah!&quot; for the camera." placeholder="Don't be shy! And say &quot;yeah!&quot; for the camera.">
									<input type="text" data-clear-btn="true" name="txtbox20" id="txtbox20" value="Take a photo?" placeholder="Take a photo?">
									<input type="text" data-clear-btn="true" name="txtbox21" id="txtbox21" value="Ask your customers to say &quot;yeahhh!&quot; for the camera!" placeholder="Ask your customers to say &quot;yeahhh!&quot; for the camera!">
									<input type="text" data-clear-btn="true" name="txtbox1" id="txtbox1" value="Please share your experience..." placeholder="Please share your experience...">
									<input type="text" data-clear-btn="true" name="txtbox2" id="txtbox2" value="Your average rating:" placeholder="Your average rating:">
									<input type="text" data-clear-btn="true" name="txtbox9" id="txtbox9" value="Auto logout" placeholder="Auto logout">
									<input type="text" data-clear-btn="true" name="txtbox10" id="txtbox10" value="You'll be logged out of Facebook after sharing." placeholder="You'll be logged out of Facebook after sharing.">
									<input type="text" data-clear-btn="true" name="txtbox3" id="txtbox3" value="Recommend &amp; share?" placeholder="Recommend &amp; share?">
									<input type="text" data-clear-btn="true" name="txtbox11" id="txtbox11" value="Follow <brand>?" placeholder="Follow <brand>?">
									<input type="text" data-clear-btn="true" name="txtbox12" id="txtbox12" value="Press the &quot;yes&quot; button to agree with Tabluu's <privacy_policy_link> & allow <brand> to send you promotions & updates." placeholder="Press the &quot;yes&quot; button to agree with Tabluu's <privacy_policy_link> & allow <brand> to send you promotions & updates">
									<input type="text" data-clear-btn="true" name="txtbox13" id="txtbox13" value="We're sorry for your poor experience!" placeholder="We're sorry for your poor experience!">
									<input type="text" data-clear-btn="true" name="txtbox14" id="txtbox14" value="Do you wish to leave your contact details so that we may get in touch with you?" placeholder="Do you wish to leave your contact details so that we may get in touch with you?">
									<input type="text" data-clear-btn="true" name="txtbox15" id="txtbox15" value="Please enter your contact details..." placeholder="Please enter your contact details...">
									<input type="text" data-clear-btn="true" name="txtbox16" id="txtbox16" value="addtional info such as room/table number or location of bad experience." placeholder="addtional info such as room/table number or location of bad experience.">
									<input type="text" data-clear-btn="true" name="txtbox17" id="txtbox17" value="Press &quot;submit&quot; to agree with Tabluu's <privacy_policy_link> & allow <brand> to contact you." placeholder="Press &quot;submit&quot; to agree with Tabluu's <privacy_policy_link> & allow <brand> to contact you.">
									<input type="text" data-clear-btn="true" name="txtbox4" id="txtbox4" value="Thank you!" placeholder="Thank you!">
									<input type="text" data-clear-btn="true" name="txtbox5" id="txtbox5" value="Next reviewer, please." placeholder="Next reviewer, please.">
									<input type="text" data-clear-btn="true" name="txtbox6" id="txtbox6" value="Choose an option…" placeholder="Choose an option…">
									<input type="text" data-clear-btn="true" name="txtbox7" id="txtbox7" value="Enter the password…" placeholder="Enter the password…">
									<input type="text" data-clear-btn="true" name="txtbox8" id="txtbox8" value="Take a new photo?" placeholder="Take a new photo?">
									<div class="clear" style="padding-top:0.5em"></div>
									<div class="btn-submit">
										<button class="ui-btn" id="submit-box">Submit</button>
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