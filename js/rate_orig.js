var placeId = '',blankstar = 'images/template/blankstar.png',colorstar = 'images/template/colorstar.png';
var customArray = [],item2Rate=[],ratedObj= [],nicename;
var count=0,sharedphoto,isphototakedone,urlphotoshared,businessname='';
var defaultPostReview = {posted:1,percent:3.0},ratecomment='';
var defaultrating = {vpoor:'Very Poor',poor:'Poor',fair:'Fair',good:'Good',excellent:'Excellent'};
var defaultButtonText = {comment:['skip','submit'],share:['no','yes'],nxt:['okay'],photo:['no','yes'],option:['cancel','login','reset'],pass:['cancel','submit']};
var defaultTextMessage = {takePhoto:'Take a new photo?',average:'Your average rating:',thank:'Thank you!',nxt:'Next reviewer, please.',option:'choose an option…',pass:'Enter the password…',comment:'Please share your experience...',share:'Recommend & share?'};
var counter1 = 0,counter2 = 0,counter3 = 0,counter4 = 0,counter5 = 0,counter6 = 0,counter7 = 0,countertake=0,countershare=0;
function alertBox(title,message){
	$.box_Dialog(message, {
		'type':     'question',
		'title':    '<span class="color-white">'+title+'<span>',
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: 'okay'}]
	});	
}
function alertErrorPage(title,message){
	$.box_Dialog(message, {
		'type':     'question',
		'title':    '<span class="color-white">'+title+'<span>',
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: 'okay',callback:function (){
			window.location = 'error.html';
		}}]
	});	
}
function alertNextUser(title,message,button){
	setTimeout(function() {	
		$.box_Dialog(message, {
			'type':     'question',
			'title':    '<span class="color-white">'+title+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: button}]
		});	
	}, 300);
}


function followplace(){
	$.box_Dialog('enter a valid email address...<br/><input type="text" name="email" id="email" placeholder="email" style="width:100%;height:30px;margin-top:5px;" placeholder="password" />', {
		'type':     'question',
		'title':    '<span class="color-white">please enter your email address<span>',
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: 'submit',callback:function(){
			var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			var email=$('#email').val();
			if(!regex.test(email))
				setTimeout(function() {	
					$.box_Dialog('Please enter a valid email address', {'type':'question','title':'<span class="color-white">invalid email address<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,
						'buttons':  [{caption: 'okay',callback:function(){
							setTimeout(function() {followplace();}, 300);
						}}]
					});	
				}, 300);
			else{	
				setTimeout(function() {
					setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ data: 'p='+nicename });}, 100);
					alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
				}, 500);
				saverate();
				$.ajax({url:"setData.php",cache: false,data:'opt=follow&email='+email+'&placeId='+placeId+'&case=1',success:function(lastId){
					setdefault();
				}});
			}
		}},{caption: 'cancel',callback:function(){setTimeout(function() {
			saverate();
			setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ data: 'p='+nicename });}, 500);
			alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
		}, 500);}}]
	});
   //clearconsole();	
}
function ratevalue(rate,page){
    ratedObj.push(rate);
	if(item2Rate.length > 1 && page == 2){
		showLoader();
		setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratetwo.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 500);
	}else if(item2Rate.length > 2 && page == 3){
		showLoader();
		setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratethree.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 500);
	}else if(item2Rate.length > 3 && page == 4){
		showLoader();
		setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratefour.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 500);
	}else if(item2Rate.length > 4 && page == 5){
		showLoader();
		setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratefive.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 500);
	}else if(item2Rate.length > 5 && page == 6){
		showLoader();
		setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratesix.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 500);
	}else if(item2Rate.length > 6 && page == 7){
		setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateseven.html",{ transition: "flip",data: 'p='+nicename });}, 500);
	}else{
		var val = new Array();
		val['1']='1.0';val['1.25']='1.25';val['1.5']='1.5';val['1.75']='1.75';val['2']='2.0';val['2.25']='2.25';val['2.5']='2.5';val['2.75']='2.75';val['3']='3.0';val['3.25']='3.25';val['3.5']='3.5';val['3.75']='3.75';val['4']='4.0';val['4.25']='4.25';val['4.5']='4.5';val['4.75']='4.75';
		var val2 = ['1.0','1.25','1.5','1.75','2.0','2.25','2.5','2.75','3.0','3.25','3.5','3.75','4.0','4.25','4.5','4.75'];
		var percent = val[defaultPostReview.percent];
		if(typeof(val[defaultPostReview.percent]) == 'undefined')
			percent = val2[defaultPostReview.percent];
		var rate_1 =ratedObj[0];
		var rate_2 =(typeof(ratedObj[1]) != 'undefined' ? ratedObj[1] : 0);
		var rate_3 =(typeof(ratedObj[2]) != 'undefined' ? ratedObj[2] : 0);
		var rate_4 =(typeof(ratedObj[3]) != 'undefined' ? ratedObj[3] : 0);
		var rate_5 =(typeof(ratedObj[4]) != 'undefined' ? ratedObj[4] : 0);
		var rate_6 =(typeof(ratedObj[5]) != 'undefined' ? ratedObj[5] : 0);
		var rate_7 =(typeof(ratedObj[6]) != 'undefined' ? ratedObj[6] : 0);
		var totalRated = rate_1 + rate_2 + rate_3 + rate_4 + rate_5 + rate_6 + rate_7;
		var aveRated = totalRated / item2Rate.length ;
		$.commentbox('<p style="padding:5px 0px;text-align:left;font-size:12px;">'+defaultTextMessage.average+' '+ aveRated.toFixed(1) + '/5 </p>'+'<textarea class="comment-txt" style="width:100% !important;height:7em !important;margin:0 auto !important;font-size:0.8em;resize: none;"></textarea>', {
			'type':     'question',
			'title':    '<span class="color-white">'+defaultTextMessage.comment+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: defaultButtonText.comment[1],callback:function(){
				ratecomment = $('.comment-txt').val();
				if(defaultPostReview.posted > 0 && aveRated >= percent){
					setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "share.html",{ transition: "flip",data: 'p='+nicename });}, 500);
				}else{
					setTimeout(function() {
						$.box_Dialog('This allows '+businessname+' to send you updates & promotions. You may unfollow any time.', {
							'type':     'question',
							'title':    '<span class="color-white">follow '+businessname+'?<span>',
							'center_buttons': true,
							'show_close_button':false,
							'overlay_close':false,
							'buttons':  [{caption: 'yes',callback:function (){
								setTimeout(function() {
									followplace();
								}, 300);
						}},{caption:'no',callback:function(){setTimeout(function() {
							saverate();
							$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ data: 'p='+nicename });
							alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
						}, 500);}}]
					  });
				  }, 300);
				}
			}},{caption: defaultButtonText.comment[0],callback:function(){
				ratecomment = '';
				if(defaultPostReview.posted > 0 && aveRated >= percent){
					setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "share.html",{ transition: "flip",data: 'p='+nicename });}, 500);
				}else{
					setTimeout(function() {
						$.box_Dialog('This allows '+businessname+' to send you updates & promotions. You may unfollow any time.', {
							'type':     'question',
							'title':    '<span class="color-white">follow '+businessname+'?<span>',
							'center_buttons': true,
							'show_close_button':false,
							'overlay_close':false,
							'buttons':  [{caption: 'yes',callback:function (){
								setTimeout(function() {
									followplace();
								}, 300);
						}},{caption:'no',callback:function(){setTimeout(function() {
								saverate();
								$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename });
								 alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
							}, 500);}}]
					  });
				  }, 300);
				}
			}}]
		});		
	}	
}
function setdefault(){
	ratedObj = [],ratecomment='';urlphotoshared='';
	sharedphoto='';isphototakedone='';
	//$( ".imgrate1" ).attr('src', blankstar);$( ".imgrate2" ).attr('src', blankstar);$( ".imgrate3" ).attr('src', blankstar);$( ".imgrate4" ).attr('src', blankstar);$( ".imgrate5" ).attr('src', blankstar);
	//rate(2);
}
function saverate(){
    var rate_1 =ratedObj[0];
    var rate_2 =(typeof(ratedObj[1]) != 'undefined' ? ratedObj[1] : 0);
    var rate_3 =(typeof(ratedObj[2]) != 'undefined' ? ratedObj[2] : 0);
    var rate_4 =(typeof(ratedObj[3]) != 'undefined' ? ratedObj[3] : 0);
    var rate_5 =(typeof(ratedObj[4]) != 'undefined' ? ratedObj[4] : 0);
    var rate_6 =(typeof(ratedObj[5]) !== 'undefined' ? ratedObj[5] : 0);
    var rate_7 =(typeof(ratedObj[6]) !== 'undefined' ? ratedObj[6] : 0);
    var totalRated = rate_1 + rate_2 + rate_3 + rate_4 + rate_5 + rate_6 + rate_7;
    var aveRated = totalRated / item2Rate.length ;
    var p = 'placeId='+placeId+'&rated1='+rate_1+'&rated2='+rate_2+'&rated3='+rate_3+'&rated4='+rate_4+'&rated5='+rate_5+'&rated6='+rate_6+'&rated7='+rate_7+'&aveRate='+aveRated.toFixed(1)+'&comment='+ratecomment+'&case=1';
    $.ajax({url:"setData.php",cache: false,data:'opt=ratesave&'+p,success:function(lastId){
		setdefault();
	}});
	//clearconsole();
}
function photoshare(isfb){
  //clearconsole();
}

$(document).on('pageinit','#sharephoto', function() {
	$('#sharephoto .take-no').html(defaultButtonText.share[0]);
	$('#sharephoto .take-yes').html(defaultButtonText.share[1]);
	if(countershare < 1){
		sharephoto();
		$( window ).resize(function() { // when window resize
			sharephoto();
		});
		$('#sharephoto .take-no').click(function(e){
			//saverate();
			//setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ data: 'p='+placeId });}, 500);
			$.box_Dialog('This allows '+businessname+' to send you updates & promotions. You may unfollow any time.', {
				'type':     'question',
				'title':    '<span class="color-white">follow '+businessname+'?<span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons':  [{caption: 'yes',callback:function (){
					setTimeout(function() {
						followplace();
					}, 300);
			}},{caption:'no',callback:function(){setTimeout(function() {
					saverate();
					$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename });
					 alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
				}, 500);}}]
		  });
			e.preventDefault();
		});
		$('#sharephoto .take-yes').click(function(e){ 
			loginFb();
			e.preventDefault();
		});
		alertBox('auto logout',"You'll be logged out of Facebook after sharing.");	
		countershare = 1;	
	}
		function sharephoto(){
			if(window.innerWidth <= 600){
				$('#sharephoto .cam-img').css({'padding-top':'1em'});
				$("#sharephoto .cam-img").attr('width', '170').attr('height', '173');
				$("#sharephoto .take-logo").attr('width', '80').attr('height', '30');
				$('#sharephoto .taketop').css({'padding-top':'1em'});
				$('#sharephoto .take-powered').css({'padding':'0.5em 0 0.2em 0'});
				$('#sharephoto .take-logo').css({'padding-top':'0.5em'});
				$('#sharephoto .takewrap').css({'margin':'0 auto'});
				$('#sharephoto  p.titleheader').css({'font-size':'1em'});
				$('#sharephoto .take-powered p').css({'font-size':'0.7em'});
				$('#sharephoto .takebutton').css({'margin-top':'10px','padding':'5px 40px 5px 0'});
			}else if(window.innerWidth > 600 && window.innerWidth <= 1024){ //7 inches
				$('#sharephoto .cam-img').css({'padding-top':'1.5em'});
				$("#sharephoto .cam-img").attr('width', '190').attr('height', '193');
				$("#sharephoto .take-logo").attr('width', '100').attr('height', '37');
				$('#sharephoto .taketop').css({'padding-top':'2em'});
				$('#sharephoto .take-powered').css({'padding':'1em 0 0.2em 0'});
				$('#sharephoto .take-logo').css({'padding-top':'0.5em'});
				$('#sharephoto .takewrap').css({'margin':'0 auto'});
				$('#sharephoto  p.titleheader').css({'font-size':'1.2em'});
				$('#sharephoto .take-powered p').css({'font-size':'0.8em'});
				$('#sharephoto .takebutton').css({'margin-top':'10px','padding':'5px 40px 5px 0'});
			}else if(window.innerWidth > 1024){
				$('#sharephoto .cam-img').css({'padding-top':'1.5em'});
				$("#sharephoto .cam-img").attr('width', '200').attr('height', '203');
				$("#sharephoto .take-logo").attr('width', '131').attr('height', '49');
				$('#sharephoto .taketop').css({'padding-top':'4em'});
				$('#sharephoto .take-powered').css({'padding-top':'1em'});
				$('#sharephoto .take-logo').css({'padding-top':'0.5em'});
				$('#sharephoto .takewrap').css({'margin':'0 auto'});
				$('#sharephoto  p.titleheader').css({'font-size':'1.5625em'});
				$('#sharephoto .take-powered p').css({'font-size':'1em'});
				$('#sharephoto .takebutton').css({'margin-top':'10px','padding':'5px 40px 5px 0'});
			}
		}	
});

$(document).on('pageinit','#takephoto', function() {
	$('#takephoto .take-no').html(defaultButtonText.photo[0]);
	$('#takephoto .take-yes').html(defaultButtonText.photo[1]);
	if(countertake < 1){
		pagephoto();	
		$( window ).resize(function() { // when window resize
			pagephoto();
		});
		$('#takephoto .take-no').click(function(e){ 
			setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename });}, 500);
			return false;
			e.preventDefault();
		});
		$('#upload').click(function(e){}); // when upload button change fb	photo
		$('#takephoto .take-yes').click(function(e){ 
			$('#filephoto').click();
			e.preventDefault();
		});
		$('#frmtakephoto').on('change',function(e){ // save fb photo
			showLoader();
			$('#frmtakephoto').ajaxSubmit({beforeSubmit:  beforeSubmit,success: showResponse,resetForm: true });
			e.preventDefault();
		});	
		function showResponse(responseText, statusText, xhr, $form)  { 
			isphototakedone = 1;
			urlphotoshared=responseText;
		}
		function beforeSubmit(){
				//check whether client browser fully supports all File API // if (window.File && window.FileReader && window.FileList && window.Blob)
				if (window.File){
					   var fsize = $('#filephoto')[0].files[0].size; //get file size
					   var ftype = $('#filephoto')[0].files[0].type; // get file type
						switch(ftype){
							case 'image/png':
							case 'image/gif':
							case 'image/jpeg':
							case 'image/jpg':
							case 'image/bmp':
							case 'image/pjpeg':
								sharedphoto=1;
								hideLoader();
								setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename });}, 100);
							break;
							default: alertBox('unsupported file type','Please upload only gif, png, bmp, jpg, jpeg file types');
							hideLoader();						
							return false;
						}
				}else{
				   alertBox('unsupported browser','Please upgrade your browser, because your current browser lacks some new features we need!');	
				   return false;
				}
			}
		countertake = 1;	
	}
		function pagephoto(){
			if(window.innerWidth <= 600){
				$('#takephoto .cam-img').css({'padding-top':'1em'});
				$("#takephoto .cam-img").attr('width', '170').attr('height', '173');
				$("#takephoto .take-logo").attr('width', '80').attr('height', '30');
				$('#takephoto .taketop').css({'padding-top':'1em'});
				$('#takephoto .take-powered').css({'padding':'0.5em 0 0.2em 0'});
				$('#takephoto .take-logo').css({'padding-top':'0.5em'});
				$('#takephoto .takewrap').css({'margin':'0 auto'});
				$('#takephoto  p.titleheader').css({'font-size':'1em'});
				$('#takephoto .take-powered p').css({'font-size':'0.7em'});
				$('#takephoto .takebutton').css({'margin-top':'10px','padding':'5px 40px 5px 0'});
			}else if(window.innerWidth > 600 && window.innerWidth <= 1024){ //7 inches
				$('#takephoto .cam-img').css({'padding-top':'1.5em'});
				$("#takephoto .cam-img").attr('width', '190').attr('height', '193');
				$("#takephoto .take-logo").attr('width', '100').attr('height', '37');
				$('#takephoto .taketop').css({'padding-top':'2em'});
				$('#takephoto .take-powered').css({'padding':'1em 0 0.2em 0'});
				$('#takephoto .take-logo').css({'padding-top':'0.5em'});
				$('#takephoto .takewrap').css({'margin':'0 auto'});
				$('#takephoto  p.titleheader').css({'font-size':'1.2em'});
				$('#takephoto .take-powered p').css({'font-size':'0.8em'});
				$('#takephoto .takebutton').css({'margin-top':'10px','padding':'5px 40px 5px 0'});
			}else if(window.innerWidth > 1024){
				$('#takephoto .cam-img').css({'padding-top':'1.5em'});
				$("#takephoto .cam-img").attr('width', '200').attr('height', '203');
				$("#takephoto .take-logo").attr('width', '131').attr('height', '49');
				$('#takephoto .taketop').css({'padding-top':'4em'});
				//$('#takephoto .take-cam-wrap').css({'padding-top':'2em'});
				$('#takephoto .take-powered').css({'padding-top':'1em'});
				$('#takephoto .take-logo').css({'padding-top':'0.5em'});
				$('#takephoto .takewrap').css({'margin':'0 auto'});
				$('#takephoto  p.titleheader').css({'font-size':'1.5625em'});
				$('#takephoto .take-powered p').css({'font-size':'1em'});
				$('#takephoto .takebutton').css({'margin-top':'10px','padding':'5px 40px 5px 0'});
			}
		}
});

function loginFb(){

 FB.login(function(response) {
   if (response.authResponse) {
    FB.api('/me', function(response) {
        FB.api('/me/friends',  function(friendlist) {
			var rate_1 =ratedObj[0];
			var rate_2 =(typeof(ratedObj[1]) != 'undefined' ? ratedObj[1] : 0);
			var rate_3 =(typeof(ratedObj[2]) != 'undefined' ? ratedObj[2] : 0);
			var rate_4 =(typeof(ratedObj[3]) != 'undefined' ? ratedObj[3] : 0);
			var rate_5 =(typeof(ratedObj[4]) != 'undefined' ? ratedObj[4] : 0);
			var rate_6 =(typeof(ratedObj[5]) !== 'undefined' ? ratedObj[5] : 0);
			var rate_7 =(typeof(ratedObj[6]) !== 'undefined' ? ratedObj[6] : 0);
			var totalRated = rate_1 + rate_2 + rate_3 + rate_4 + rate_5 + rate_6 + rate_7;
			var aveRated = totalRated / item2Rate.length ;
			if(sharephoto > 0 && isphototakedone == ''){ // take the camera? && check if the photo temporary done uploaded
				setTimeout(function() {
					var p = 'placeId='+placeId+'&rated1='+rate_1+'&rated2='+rate_2+'&rated3='+rate_3+'&rated4='+rate_4+'&rated5='+rate_5+'&rated6='+rate_6+'&rated7='+rate_7+'&aveRate='+aveRated.toFixed(1)+'&comment='+ratecomment+'&userName='+response.name+'&userId='+response.id+'&email='+response.email+'&totalFriends='+friendlist.data.length+'&photo_url='+urlphotoshared+'&case=2&data='; 
					$.ajax({url:"setData.php",dataType: 'json',cache: false,data:'opt=ratesave&'+p,success:function(lastId){
						var fb='';
						if(sharedphoto > 0)
							fb = 'fb';
					    p = p +'&source='+fb;
						$.ajax({url:"setData.php",cache: false,data:'opt=photoshare&'+p,success:function(lastId){
							setdefault();
						}});
						var address = customArray.businessName +', '+ customArray.address +', '+ customArray.city +', '+customArray.country;
						var nicename = customArray.nicename;
						FB.api('/me/photos', 'post', {url: 'http://www.tabluu.com/app/'+urlphotoshared,name:  'I rate '+customArray.businessName+' '+aveRated.toFixed(1)+' out of 5. '+	  ratecomment+' Go to: http://www.tabluu.com/'+nicename+'.html - Addr: '+ address +'. Tel: '+customArray.contactNo+'.'}, function(response) {  
							FB.logout(function(response) {
							});
						})
						setTimeout(function() {
							$.box_Dialog('This allows '+businessname+' to send you updates & promotions. You may unfollow any time.', {
								'type':     'question',
								'title':    '<span class="color-white">follow '+businessname+'?<span>',
								'center_buttons': true,
								'show_close_button':false,
								'overlay_close':false,
								'buttons':  [{caption: 'yes',callback:function (){
									setTimeout(function() {
										$.ajax({url:"setData.php",cache: false,data:'opt=follow&placeId='+placeId+'&case=2&lastId='+lastId,success:function(lastId){
											setdefault();
										}});
										$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename });
									 alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
									}, 300);
									
							}},{caption:'no',callback:function(){setTimeout(function() {
									setdefault();
									$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename });
									 alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
								}, 500);}}]
						  });
					  }, 300);
					}});
					; 					
				}, 500);
			}else{ 
			  //JSON.stringify(response)
			   if(typeof(urlphotoshared) == 'undefined' || urlphotoshared == ''){
				  urlphotoshared=customArray.fbImg;
				}  
				var p = 'placeId='+placeId+'&rated1='+rate_1+'&rated2='+rate_2+'&rated3='+rate_3+'&rated4='+rate_4+'&rated5='+rate_5+'&rated6='+rate_6+'&rated7='+rate_7+'&aveRate='+aveRated.toFixed(1)+'&comment='+ratecomment+'&userName='+response.name+'&userId='+response.id+'&email='+response.email+'&totalFriends='+friendlist.data.length+'&photo_url='+urlphotoshared+'&case=2&data='; 
				$.ajax({url:"setData.php",dataType: 'json',cache: false,data:'opt=ratesave&'+p,success:function(lastId){
					var fb='';
					if(sharedphoto > 0)
						fb = 'fb';
					p = p +'&source='+fb;
					$.ajax({url:"setData.php",cache: false,data:'opt=photoshare&'+p,success:function(lastId){
						setdefault();
					}});
					var address = customArray.businessName +', '+ customArray.address +', '+ customArray.city +', '+customArray.country;
					var nicename = customArray.nicename;
					FB.api('/me/photos', 'post', {url: 'http://www.tabluu.com/app/'+urlphotoshared,name:  'I rate '+customArray.businessName+' '+aveRated.toFixed(1)+' out of 5. '+	  ratecomment+' Go to: http://www.tabluu.com/'+nicename+'.html - Addr: '+ address +'. Tel: '+customArray.contactNo+'.'}, function(response) {  
						FB.logout(function(response) {
						});
					});	
					setTimeout(function() {
						$.box_Dialog('This allows '+businessname+' to send you updates & promotions. You may unfollow any time.', {
							'type':     'question',
							'title':    '<span class="color-white">follow '+businessname+'?<span>',
							'center_buttons': true,
							'show_close_button':false,
							'overlay_close':false,
							'buttons':  [{caption: 'yes',callback:function (){
								setTimeout(function() {
									$.ajax({url:"setData.php",cache: false,data:'opt=follow&placeId='+placeId+'&case=2&lastId='+lastId,success:function(lastId){
										setdefault();
									}});
									$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename });
								 alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
								}, 300);
								
						}},{caption:'no',callback:function(){setTimeout(function() {
								//saverate();
								setdefault();
								$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename });
								 alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
							}, 500);}}]
					  });
				  }, 300);
				}});
				 
           }				
        });
     });
   }else {
		$.box_Dialog('This allows '+businessname+' to send you updates & promotions. You may unfollow any time.', {
			'type':     'question',
			'title':    '<span class="color-white">follow '+businessname+'?<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: 'yes',callback:function (){
				setTimeout(function() {
					followplace();
				}, 300);
		}},{caption:'no',callback:function(){setTimeout(function() {
				saverate();
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename });
				 alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
			}, 300);}}]
		});		
   }
 },{scope: 'email,read_friendlists,publish_actions,publish_stream,user_photos'});   
 
}

var logger = function()
{
    var oldConsoleLog = null;
    var pub = {};

    pub.enableLogger =  function enableLogger() 
	{
		if(oldConsoleLog == null)
			return;

		window['console']['log'] = oldConsoleLog;
	};

    pub.disableLogger = function disableLogger()
	{
		oldConsoleLog = console.log;
		window['console']['log'] = function() {};
	};

    return pub;
}();

$(document).ready(function(){
  
  // channelUrl : 'https://tabluu.applicationcraft.com/service/Resources/b6dbe9c0-1d85-4a4c-85da-4ac9e755bf2d.html', // Channel file for x-domain comms
	window.fbAsyncInit = function() {
    // init the FB JS SDK
	   FB.init({
		  appId      : 682746285089153,                        // App ID from the app dashboard
		  status     : true,                                 // Check Facebook Login status
		  xfbml      : true                                  // Look for social plugins on the page
		});
		// Additional initialization code such as adding Event Listeners goes here
  };
  // Load the SDK asynchronously
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk')); 
 
});
$(document).on('pagehide','#sharephoto', function() {$(this).remove();});
$(document).on('pagehide','#takephoto', function() {$(this).remove();});
$(document).on('pagehide','#rateone', function() {$(this).remove();});
$(document).on('pagehide','#ratetwo', function() {$(this).remove();});
$(document).on('pagehide','#ratethree', function() {$(this).remove();});
$(document).on('pagehide','#ratefour', function() {$(this).remove();});
$(document).on('pagehide','#ratefive', function() {$(this).remove();});
$(document).on('pagehide','#ratesix', function() {$(this).remove();});
$(document).on('pagehide','#rateseven', function() {$(this).remove();});
$(document).on( "pagebeforechange", function( e, data ) {
	//alert(data.options.dataUrl)
});
function showLoader(){loader = jQuery('<div id="overlay"> </div>');loader.appendTo(document.body);}
function hideLoader(){$( "#overlay" ).remove();}
function login(){
	$.box_Dialog('Login OR select "reset" to take a new photo', {
		'type':     'question',
		'title':    '<span class="color-white">'+defaultTextMessage.option+'<span>',
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: defaultButtonText.option[2],callback:function(){
			setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "takephoto.html",{ data: 'p='+nicename });return false;}, 500);
		}},{caption:  defaultButtonText.option[1],callback:function(){
			setTimeout(function() {
				$.box_Dialog('<input type="password" name="confirmpwd" id="confirmpwd" style="width:100%;height:30px;box-shadow:none" placeholder="password" />', {
					'type':     'question',
					'title':    '<span class="color-white">'+defaultTextMessage.pass+'<span>',
					'center_buttons': true,
					'show_close_button':false,
					'overlay_close':false,
					'buttons':  [{caption: defaultButtonText.pass[1],callback:function(){
						$.ajax({url:"getData.php",cache: false,data:'opt=login&pwd='+$.md5($('#confirmpwd').val())+'&email='+customArray.email,success:function(status){
							if(status > 0)
								window.location= "index.html";	
							else
								setTimeout(function() {alertBox('Please try again','Invalid email or password');}, 300);
						}});
					}},{caption:  defaultButtonText.pass[0]}]
				});	
			}, 300);
		}},{caption: defaultButtonText.option[0]}]
	});	
	//clearconsole();
}
function clearconsole() { 
  console.log(window.console);
  if(window.console || window.console.firebug) {
   console.clear();
  }
}
//$('#rateone').on('pagecreate',function(event){
     //alert('This page was just enhanced by jQuery Mobile!');
//});
		 
$(document).on('pageinit','#rateone', function() {
		
	if(counter1 < 1){
		//alert(sharedphoto);
		var ispageok = false;nicename = $('#nicename').val();
		showLoader();
		$.ajax({url:"getData.php",cache: false,data:'nice='+nicename+'&opt=getrate',success:function(result){
			customArray =  $.parseJSON(result);
			hideLoader();
			//urlphotoshared=customArray.fbImg;
			 var toberate = $.parseJSON(customArray.item2Rate);
			 var selectedItems = $.parseJSON(customArray.selectedItems);
			  item2Rate=[];
			if(typeof(toberate.rows) != 'undefined'){
				if(typeof(selectedItems.rows) != 'undefined'){
					for(var i in selectedItems.rows){
						for(var j in toberate.rows){
							var name = toberate.rows[j].data.split('_');
							if(name[1] == selectedItems.rows[i].data)
								item2Rate.push(toberate.rows[j].data);
						}	
					}
				}else{
					for(var i in selectedItems){
						for(var j in toberate.rows){
							var name = toberate.rows[j].data.split('_');
							if(name[1] == selectedItems[i])
								item2Rate.push(toberate.rows[j].data);
						}	
					}
				}	
			}else{
				for(var i in selectedItems){
					for(var j in toberate){
						var name = toberate[j].split('_');
						if(name[1] == selectedItems[i])
							item2Rate.push(toberate[j]);
					}	
				}
			}
			if(customArray.reviewPost != '')
				defaultPostReview = $.parseJSON(customArray.reviewPost);
			if(customArray.button != '')
				defaultButtonText = $.parseJSON(customArray.button);
			if(customArray.messageBox != '')	
				defaultTextMessage = $.parseJSON(customArray.messageBox);
			
			var j=0;
			if(customArray.webImg != '')
				j++;
			if(customArray.webImg2 != '')
				j++;
			if(customArray.webImg3 != '')
				j++;
			if(customArray.webImg4 != '')
				j++;
			if(customArray.webImg5 != '')
				j++;
			if(customArray.webImg6 != '')
				j++;
			if(customArray.webImg7 != '')
				j++;
			if(customArray.webImg8 != '')
				j++;

			if(customArray.fbImg == '')
				alertErrorPage('setup incomplete','Go to Setup > Business Web Page > Photos ');	
			else if(customArray.nicename == "")
				alertErrorPage('setup incomplete','Go to Setup > Business Web Page > Create Your Tabluu Page');
			else if(customArray.city == '')	
				alertErrorPage('setup incomplete','Go to Setup > Business Web Page > Profile ');
			else if(j < 2)
				alertErrorPage('setup incomplete','Go to Setup > Business Web Page > Photos ');
			else if(customArray.subscribe < 1)
				alertErrorPage('this location is offline','Please change the status to online');
			else if(customArray.settingsItem < 1)
				alertErrorPage('settings not locked','To lock, flick the switch "on". Setup > What Questions to Ask');
			else{
				if(customArray.state == 'active' || customArray.state == 'trialing'){
					var ratetxt = item2Rate[0].split('_');
					$('.ratetxt').html(ratetxt[0]);
					placeId = customArray.placeId;
					rate_initialize();
				}else
					alertErrorPage('Unauthorized',"Please contact Tabluu support");
			}	
			$(".loc-login").on( 'click', function () {login()});
			//clearconsole();
			/*$( ":mobile-pagecontainer" ).pagecontainer( "load", 'ratetwo.html', { showLoadMsg: false } );
			$( ":mobile-pagecontainer" ).pagecontainer( "load", 'ratethree.html', { showLoadMsg: false } );
			$( ":mobile-pagecontainer" ).pagecontainer( "load", 'ratefour.html', { showLoadMsg: false } );
			$( ":mobile-pagecontainer" ).pagecontainer( "load", 'ratefive.html', { showLoadMsg: false } );
			$( ":mobile-pagecontainer" ).pagecontainer( "load", 'ratesix.html', { showLoadMsg: false } );
			$( ":mobile-pagecontainer" ).pagecontainer( "load", 'rateseven.html', { showLoadMsg: false } );*/
		}});
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
		rate(2);
	counter1 = 1;
	}
});

$(document).on('pageinit','#ratetwo', function() {

	if(counter2 < 1){
		$(".loc-login").on( 'click', function () {login()});
		var ratetxt = item2Rate[1].split('_');
		$('.ratetxt').html(ratetxt[0]);
		rate_initialize();
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
	   rate(3);
		counter2 = 1;
   }
});
$(document).on('pageinit','#ratethree', function() {
	if(counter3 < 1){
		$(".loc-login").on( 'click', function () {login()});
		var ratetxt = item2Rate[2].split('_');
		$('.ratetxt').html(ratetxt[0]);
		rate_initialize();
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
	   rate(4);
	   counter3=1
   }
});
$(document).on('pageinit','#ratefour', function() {
	if(counter4 < 1){
		$(".loc-login").on( 'click', function () {login()});
		var ratetxt = item2Rate[3].split('_');
		$('.ratetxt').html(ratetxt[0]);
		rate_initialize();
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
	   rate(5);
	   counter4 = 1;
   }
});
$(document).on('pageinit','#ratefive', function() {
	if(counter5 < 1){
		$(".loc-login").on( 'click', function () {login()});
		var ratetxt = item2Rate[4].split('_');
		$('.ratetxt').html(ratetxt[0]);
		rate_initialize();
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
	   rate(6);
		counter5=1;
   }
});
$(document).on('pageinit','#ratesix', function() {
	if(counter6 < 1){
		$(".loc-login").on( 'click', function () {login()});
		var ratetxt = item2Rate[5].split('_');
		$('.ratetxt').html(ratetxt[0]);
		rate_initialize();
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
	   rate(7);
	   counter6=1;
   }
});
$(document).on('pageinit','#rateseven', function() {
	if(counter7 < 1){
		$(".loc-login").on( 'click', function () {login()});
		var ratetxt = item2Rate[6].split('_');
		$('.ratetxt').html(ratetxt[0]);
		rate_initialize();
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
	   rate(8);
		counter7=1;
   }
});

function rate(page){
	var isStarClick = 0;
	$( '.starRate1' ).mouseenter( function(){
		if(isStarClick < 1)
			$( ".imgrate1" ).attr('src', colorstar);
	}).mouseleave( function(){
		if(isStarClick < 1)
			$( ".imgrate1" ).attr('src', blankstar);
	}).click(function(){
		isStarClick=1;
		ratevalue(1,page);
	});
	$( '.starRate2' ).mouseenter( function(){
		if(isStarClick < 1){
			$( ".imgrate1" ).attr('src', colorstar);
			$( ".imgrate2" ).attr('src', colorstar);
		}
	}).mouseleave( function(){
		if(isStarClick < 1){
			$( ".imgrate1" ).attr('src', blankstar);
			$( ".imgrate2" ).attr('src', blankstar);
		}
	}).click(function(){
		isStarClick =1;
		ratevalue(2,page);
	});
	$( '.starRate3' ).mouseenter( function(){
		if(isStarClick < 1){
			$( ".imgrate1" ).attr('src', colorstar);
			$( ".imgrate2" ).attr('src', colorstar);
			$( ".imgrate3" ).attr('src', colorstar);
		}
	}).mouseleave( function(){
		if(isStarClick < 1){
			$( ".imgrate1" ).attr('src', blankstar);
			$( ".imgrate2" ).attr('src', blankstar);
			$( ".imgrate3" ).attr('src', blankstar);
		}
	}).click(function(){
		isStarClick = 1;
		ratevalue(3,page);
	});
	$( '.starRate4' ).mouseenter( function(){
		if(isStarClick < 1){
			$( ".imgrate1" ).attr('src', colorstar);
			$( ".imgrate2" ).attr('src', colorstar);
			$( ".imgrate3" ).attr('src', colorstar);
			$( ".imgrate4" ).attr('src', colorstar);
		}
	}).mouseleave( function(){	
		if(isStarClick < 1){
			$( ".imgrate1" ).attr('src', blankstar);
			$( ".imgrate2" ).attr('src', blankstar);
			$( ".imgrate3" ).attr('src', blankstar);
			$( ".imgrate4" ).attr('src', blankstar);
		}
	}).click(function(){
		isStarClick = 1;
		ratevalue(4,page);
	});
	$( '.starRate5' ).mouseenter( function(){
		if(isStarClick < 1){
			$( ".imgrate1" ).attr('src', colorstar);
			$( ".imgrate2" ).attr('src', colorstar);
			$( ".imgrate3" ).attr('src', colorstar);
			$( ".imgrate4" ).attr('src', colorstar);
			$( ".imgrate5" ).attr('src', colorstar);
		}
	}).mouseleave( function(){
		if(isStarClick < 1){
			$( ".imgrate1" ).attr('src', blankstar);
			$( ".imgrate2" ).attr('src', blankstar);
			$( ".imgrate3" ).attr('src', blankstar);
			$( ".imgrate4" ).attr('src', blankstar);
			$( ".imgrate5" ).attr('src', blankstar);
		}
	}).click(function(){
		isStarClick = 1;
		$( ".imgrate1" ).attr('src', colorstar);
		$( ".imgrate2" ).attr('src', colorstar);
		$( ".imgrate3" ).attr('src', colorstar);
		$( ".imgrate4" ).attr('src', colorstar);
		$( ".imgrate5" ).attr('src', colorstar);
		ratevalue(5,page);
	});
}

function rate_initialize(){
    var img = new Image(), logoUrl ='',logo='',bgback='';

	if(customArray.logo != '')
		logo = $.parseJSON(customArray.logo);	
	if(customArray.backgroundImg)
		bgback = $.parseJSON(customArray.backgroundImg);
	businessname = customArray.businessName;
    if(businessname.length > 25)
        businessname = businessname.substr(0,25) + '...';
    if(customArray.ratingText != '')
		defaultrating = $.parseJSON(customArray.ratingText);

	$('.vpoor').html(defaultrating.vpoor);
	$('.poor').html(defaultrating.poor);
	$('.fair').html(defaultrating.fair);
	$('.good').html(defaultrating.good);
	$('.exc').html(defaultrating.excellent);
    var address = customArray.businessName +', '+ customArray.address +', '+ customArray.city +', '+customArray.country;
	$('.addressname').html(address);
	$( '.rate' ).css({'background':(bgback.bckimage != '' ? 'url('+bgback.bckimage+') 0 0 no-repeat' : ''),'color':(customArray.backgroundFont != '' ? customArray.backgroundFont : '#3b3a26')});
	$( '.rate' ).css({});
	if(bgback.bckimage == '')
		$( '.rate' ).css({'background-color':(customArray.backgroundcolor != '' ? 'url('+bgback.bckimage+') 0 0 no-repeat' : '#DBEBF1')});
		
    if( window.innerWidth <=375){ //iphone
        logoUrl  = logo.pLogo;
		img.src = logoUrl;
        $(img).load(function(){
            var width = img.width;
            var height = img.height;
			$( ".loc-logo" ).attr('width', width);
			$( ".loc-logo" ).attr('height', height);
        }); 
		$( ".rate-logo" ).css({'padding-top':'20px'});
		$( ".imgrate1, .imgrate2, .imgrate3, .imgrate4, .imgrate5" ).attr('width', '48').attr('height', '46');
		$( ".rate-star").css({'width':'48px','font-size':'8px'}); //font below star like poor,very poor
		$( ".rate-question" ).css({'padding':'10px 0px','font-size':'18px'});
		$( ".rate-wrapstar").css({'width':'265px'});
		$( ".loc-address").css({'font-size':'7px','padding':'10px 0'});
		$( ".ratelogo").attr('width', '70px');
		$( ".ratelogo").attr('height', '20px');
		 if(typeof(logo.dLogo) == 'undefined' || logo.dLogo == ''){
			$( ".rate-logo" ).css({'padding-top':'10px'});
			$( ".rate-question" ).css({'height':'40px','padding-top':'50px','font-size':'18px'});
            $( ".loc-logo" ).hide();
        }else
		  $( ".loc-logo" ).attr('src', logoUrl);  
    }else if((window.innerWidth > 375 && window.innerWidth < 600)){ // htc
        logoUrl  = logo.mLogo;    
        img.src = logoUrl;
        $(img).load(function(){
            var width = img.width;
            var height = img.height;
			$( ".loc-logo" ).attr('width', width);
			$( ".loc-logo" ).attr('height', height);
        });
		$( ".rate-logo" ).css({'padding-top':'20px'});
		$( ".imgrate1, .imgrate2, .imgrate3, .imgrate4, .imgrate5" ).attr('width', '60').attr('height', '58');
		$( ".rate-star").css({'width':'60px','font-size':'10px'});  //font below star like poor,very poor
		$( ".rate-question" ).css({'padding':'10px 0','font-size':'20px'});
		$( ".rate-wrapstar").css({'width':'325px'}); //width wrap on star image
		$( ".loc-address").css({'font-size':'8px','padding':'10px 0'}); //font address
		$( ".ratelogo").attr('width', '70px');
		$( ".ratelogo").attr('height', '20px');
		 if(typeof(logo.dLogo) == 'undefined' || logo.dLogo == ''){
			$( ".rate-question" ).css({'height':'50px','padding-top':'70px','font-size':'20px'});
			$( ".rate-logo" ).css({'padding-top':'10px'});
            $( ".loc-logo" ).hide();
        }else
		  $( ".loc-logo" ).attr('src', logoUrl);  
    }else if((window.innerWidth >= 600 && window.innerWidth <= 1024)){ //7 inches
        logoUrl  = logo.logo7;
       img.src = logoUrl;
       $(img).load(function(){
            var width = img.width;
            var height = img.height;
			$( ".loc-logo" ).attr('width', width);
			$( ".loc-logo" ).attr('height', height);
        }); 
	    $( ".rate-logo" ).css({'padding-top':'30px'});
        $( ".imgrate1, .imgrate2, .imgrate3, .imgrate4, .imgrate5" ).attr('width', '100').attr('height', '97');
		$( ".rate-star").css({'width':'100px','font-size':'11px'});  //font below star like poor,very poor
		$( ".rate-question" ).css({'padding':'20px','font-size':'35px'});
		$( ".rate-wrapstar").css({'width':'530px'});
		$( ".loc-address").css({'font-size':'10px','padding':'15px 0 10px 0'});
		$( ".ratelogo").attr('width', '103px');
		$( ".ratelogo").attr('height', '30px');
		 if(typeof(logo.dLogo) == 'undefined' || logo.dLogo == ''){
			$( ".rate-question" ).css({'height':'90px','padding-top':'120px','font-size':'35px'});
			$( ".rate-logo" ).css({'padding-top':'15px'});
            $( ".loc-logo" ).hide();
        }else
		  $( ".loc-logo" ).attr('src', logoUrl);
    }else if((window.innerWidth > 1024)){ //desktop
		logoUrl  = logo.dLogo;
        img.src = logoUrl;
        $(img).load(function(){
            var width = img.width;
            var height = img.height;
			$( ".loc-logo" ).attr('width', width);
			$( ".loc-logo" ).attr('height', height);
        }); 
		$( ".rate-logo" ).css({'padding-top':'40px'});
		$( ".imgrate1, .imgrate2, .imgrate3, .imgrate4, .imgrate5" ).attr('width', '132').attr('height', '127');
		$( ".rate-star").css({'width':'132px','font-size':'13px'});  //font below star like poor,very poor
		$( ".rate-wrapstar").css({'width':'704px'});
		$( ".loc-address").css({'font-size':'11px','padding':'20px'});
		$( ".rate-question" ).css({'padding':'30px 0px','font-size':'44px','margin':'0px'});
		$( ".ratelogo").attr('width', '103px');
		$( ".ratelogo").attr('height', '30px');
        if(typeof(logo.dLogo) == 'undefined' || logo.dLogo == ''){ // if logo is empty
			$( ".rate-question" ).css({'height':'100px','padding-top':'150px','font-size':'44px'});
			$( ".rate-logo" ).css({'padding-top':'15px'});
            $( ".loc-logo" ).hide();
        }else
          $( ".loc-logo" ).attr('src', logoUrl);
    }
}