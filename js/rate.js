var placeId = '',blankstar = 'images/template/blankstar.png',colorstar = 'images/template/colorstar.png';
var customArray = [],item2Rate=[],ratedObj= [],nicename,isTakeSelfie='',alertaverate=0,last_Id='',lastidbusiness='';
var count=0,sharedphoto=0,isphototakedone=0,takeaphoto=0,urlphotoshared,businessname='',txtname='',txtphone='',txtemail='';
var defaultPostReview = {posted:1,percent:3.0},ratecomment='',timeInverval='',closeselfie=0,username='';
var defaultrating = {vpoor:'Very poor',poor:'Poor',fair:'Average',good:'Good',excellent:'Excellent'};
var defaultButtonText2 = {logout:['okay'],follow:['no','yes'],badEmail:['no','yes'],allow:['cancel','submit'],btntake:['no','yes'],btnfeedback:['no','yes']};
var defaultButtonText = {logout:['okay'],follow:['no','yes'],comment:['skip','submit'],share:['no','yes'],nxt:['okay'],photo:['no','yes'],option:['cancel','login','reset'],pass:['cancel','submit'],badEmail:['no','yes'],allow:['cancel','submit']};
var defaultTextMessage2 = {logoutT:'Auto logout',logoutB:"You'll be logged out of Facebook after sharing.",followT:'Follow <brand>?',followB:'Press the <double>yes<double> button to agree with Tabluu\'s <privacy_policy_link> & allow <brand> to send you promotions & updates.',badEmailT:'We\'re sorry for your poor experience!',badEmailB:'Do you wish to leave your contact details so that we may get in touch with you?',detailsEmailT:'Please enter your contact details...',detailsEmailB:'addtional info such as room/table number or location of bad experience.',allow:'Press "submit" to agree with Tabluu\'s <privacy_policy_link> & allow <brand> to contact you.',takeselfieB:'Don\'t be shy! And say &quot;yeah!&quot; for the camera.',takeselfieT:'Take a selfie (self photo)!',surveyselfieT:'Take a photo?',surveyselfieB:'Ask your customers to say "yeahhh!" for the camera!'};
var defaultTextMessage = {logoutT:'Auto logout',logoutB:"You'll be logged out of Facebook after sharing.",followT:'Follow <brand>?',followB:'Press the <double>yes<double> button to agree with Tabluu\'s <privacy_policy_link> & allow <brand> to send you promotions & updates.',takePhoto:'Take a new photo?',average:'Your average rating:',thank:'Thank you!',nxt:'Next reviewer, please.',option:'Choose an option…',pass:'Enter the password…',comment:'Please share your experience...',share:'Recommend &amp; share?',badEmailT:'We\'re sorry for your poor experience!',badEmailB:'Do you wish to leave your contact details so that we may get in touch with you?',detailsEmailT:'Please enter your contact details...',detailsEmailB:'addtional info such as room/table number or location of bad experience.',allow:'Press "submit" to agree with Tabluu\'s <privacy_policy_link> & allow <brand> to contact you.',takeselfieB:'Don\'t be shy! And say &quot;yeah!&quot; for the camera.',takeselfieT:'Take a selfie (self photo)!',surveyselfieT:'Take a photo?',surveyselfieB:'Ask your customers to say "yeahhh!" for the camera!'},resizeTimeout;
var counter1 = 0,counter2 = 0,counter3 = 0,counter4 = 0,counter5 = 0,counter6 = 0,counter7 = 0,countertake=0,countershare=0;
var questionDefault = ['How would you rate our staff based on how welcoming and friendly they were towards you?_Service Friendliness','Do you feel that you were provided service in a timely manner?_Service Timeliness','How would you rate the attentiveness of our service?_Service Attentiveness','How would you rate our overall service?_Overall Service','Was this experience worth the amount you paid?_Value for Money','Please rate our location._Location','Please rate our facilities._Facilities','How comfortable was your stay?_Comfort','How would you rate our property in terms of cleanliness?_Cleanliness','How would you rate the overall quality of your meal?_Quality of Meal','How would you rate the overall taste of your meal?_Taste of Meal','Do you feel that there were enough options for you to choose?_Variety','How likely are you to recommend us to your friends and loved ones?_Likelihood to Recommend','How likely are you to visit us again?_Likelihood to Visit Again'];
//live mode chargify ids
var everFree = 3356308,basicID=3356305,proID=3356306,enterprise=3356316,basic12 = 3405343,basic24 = 3405344,pro12 = 3405345,pro24 = 3405346,enterprise12 =3410620,enterprise24 =3410619;
var istest = false,domainpath='',fbPhotoPathShare='',state_Array = ['unpaid','canceled'];

function alertBox(title,message){
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function(){ 
	$.box_Dialog(decodequote(message), {
		'type':     'question',
		'title':    '<span class="color-white">'+decodequote(title)+'<span>',
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: 'okay'}]
	});	
	}, 500);//to prevent the events fire twice
}
function alertErrorPage(title,message){
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function(){ 
	$.box_Dialog(decodequote(message), {
		'type':     'question',
		'title':    '<span class="color-white">'+title+'<span>',
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: 'okay',callback:function (){
			window.location = 'error.php';
		}}]
	});	
	}, 500);//to prevent the events fire twice
}
function alertBox2(title,message){
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function(){ 
	$.box_Dialog(decodequote(message), {
		'type':     'question',
		'title':    '<span class="color-white">'+decodequote(title)+'<span>',
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: 'okay',callback:function(){setTimeout(function(){alertform();},300);}}]
	});
	}, 500);//to prevent the events fire twice
}
function sendEmail2Client(cases){
	showLoader();
	$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+placeId+'&opt=sendEmail2Client&cases='+cases+'&name='+username,success:function(lastId){
		setTimeout(function() {
			hideLoader();
				window.location = domainpath+nicename+'.html';
		}, 300);	
	}}); 
}
function sendEmail2Client2(cases){
	showLoader();
	$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+placeId+'&opt=sendEmail2Client&cases='+cases,success:function(lastId){
		setTimeout(function() {
			hideLoader();	
			sendEmail2Client(0);
		}, 300);
	}});
}

function alertNextUser2(title,message,button){
	sendEmail2Client(0);
	/*if(isTakeSelfie == 2 || isTakeSelfie == ''){
		setTimeout(function() {
		$.box_Dialog(decodequote(message), {
			'type':     'question',
			'title':    '<span class="color-white">'+decodequote(title)+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: button,callback:function(){$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });}}]
		});
		}, 300);	
	}else{
	
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
	}*/
}
function alertform(){
	$.box_Dialog(
		'<form id="frmalert" action="#" method="post" enctype="multipart/form-data" ><div class="alertbox"><input type="text" name="txtname" id="txtname" value="'+txtname+'" placeholder="name"/><br/><input type="text" name="txtphone" value="'+txtphone+'" id="txtphone" placeholder="phone number"/><br/><input type="text" value="'+txtemail+'" name="txtemail" id="txtemail" placeholder="email (Optional)"/><br/><p style="text-align:left;font-size:1em">'+(typeof(defaultTextMessage.detailsEmailB) != 'undefined' ? decodequote(defaultTextMessage.detailsEmailB) : decodequote(defaultTextMessage2.detailsEmailB))+'</p> <textarea cols="20" rows="3" style="resize:none" placeholder="additional info such as room/table number or location." name="txtaddition" id="txtaddition"></textarea><p style="text-align:left;font-size:1em">'+(typeof(defaultTextMessage.allow) != 'undefined' ? decodequote(defaultTextMessage.allow) : decodequote(defaultTextMessage2.allow))+'</p></div></form>', {
		'type':     'question',
		'title':    '<span class="color-white">'+(typeof(defaultTextMessage.detailsEmailT) != 'undefined' ? decodequote(defaultTextMessage.detailsEmailT) : decodequote(defaultTextMessage2.detailsEmailT))+'<span>',
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: (typeof(defaultButtonText.allow) != 'undefined' ? decodequote(defaultButtonText.allow[1]) : decodequote(defaultButtonText2.allow[1])),callback:function(){
			
			txtname=$('#txtname').val(),txtphone=$('#txtphone').val(),txtemail=$('#txtemail').val();
			var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if($('#txtname').val() == ''){
				setTimeout(function() {alertBox2('incomplete information','Please input your name');},300);
			}else if($('#txtphone').val() == ''){
				setTimeout(function() {alertBox2('incomplete information','Please input your phone number');},300);
			}else if($('#txtemail').val() != ''){
				if(!regex.test($('#txtemail').val()))
					setTimeout(function() {alertBox2('invalid email address','Please enter a valid email address');},300);
				else{
					showLoader();
					$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+placeId+'&lastId='+last_Id+'&opt=poorRating&'+$('#frmalert').serialize(),success:function(lastId){
					$("#overlay").remove();
					txtname='',txtphone='',txtemail='';
					}});
					if(isTakeSelfie == '' || isTakeSelfie == 2)
						$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });
				}	
			}else{	
				showLoader();
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+placeId+'&lastId='+last_Id+'&opt=poorRating&'+$('#frmalert').serialize(),success:function(lastId){
					$("#overlay").remove();
					txtname='',txtphone='',txtemail='';
					}});	
				if(isTakeSelfie == '' || isTakeSelfie == 2)
					$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });	
			}	
		}},{caption: (typeof(defaultButtonText.allow) != 'undefined' ? decodequote(defaultButtonText.allow[0]) : decodequote(defaultButtonText2.allow[0])),callback:function(){
			if(isTakeSelfie == '' || isTakeSelfie == 2)
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });
		}}]
	});
}

function alertEmail(){
	$.box_Dialog((typeof(defaultTextMessage.badEmailB) != 'undefined' ? decodequote(defaultTextMessage.badEmailB) : decodequote(defaultTextMessage2.badEmailB)), {
		'type':     'question',
		'title':    '<span class="color-white">'+(typeof(defaultTextMessage.badEmailT) != 'undefined' ? decodequote(defaultTextMessage.badEmailT) : decodequote(defaultTextMessage2.badEmailT)),
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: (typeof(defaultButtonText.badEmail) != 'undefined' ? decodequote(defaultButtonText.badEmail[1]) : decodequote(defaultButtonText2.badEmail[1])),callback:function(){setTimeout(function() {
			saverate();
			alertform();
		}, 300);}},{caption: (typeof(defaultButtonText.badEmail) != 'undefined' ? decodequote(defaultButtonText.badEmail[0]) : decodequote(defaultButtonText2.badEmail[0])),callback:
		function(){
			showLoader();
			saverate();
			if(isTakeSelfie == '' || isTakeSelfie == 2)
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });
		}}]
	});
}
function alertNextUser(title,message,button){

	if((isTakeSelfie == 1 || isTakeSelfie == 0) && isTakeSelfie != '' ){
		window.location = domainpath+nicename+'.html';
	}else{
	    if(customArray.email_alert != ''){
			var alerts = $.parseJSON(customArray.email_alert);
			if(alerts.is_alert > 0){ // when send alerts is active
					var rate_1 =ratedObj[0];
					var rate_2 =(typeof(ratedObj[1]) != 'undefined' ? ratedObj[1] : 0);
					var rate_3 =(typeof(ratedObj[2]) != 'undefined' ? ratedObj[2] : 0);
					var rate_4 =(typeof(ratedObj[3]) != 'undefined' ? ratedObj[3] : 0);
					var rate_5 =(typeof(ratedObj[4]) != 'undefined' ? ratedObj[4] : 0);
					var rate_6 =(typeof(ratedObj[5]) !== 'undefined' ? ratedObj[5] : 0);
					var rate_7 =(typeof(ratedObj[6]) !== 'undefined' ? ratedObj[6] : 0);
				if(alerts.alertType > 0){ //when individual rating was selected
					
					if(alerts.indiRate > 0){ //2 and below
						if((rate_1 <= 2 && rate_1 > 0)  || (rate_2 <= 2 && rate_2 > 0) || (rate_3 <= 2 && rate_3 > 0) || (rate_4 <= 2 && rate_4 > 0) || (rate_5 <= 2 && rate_5 > 0) || (rate_6 <= 2 && rate_6 > 0) || (rate_7 <= 2 && rate_7 > 0)){
							alertEmail();
						}else
							alertNextUser2(title,message,button);
					}else{
						if((rate_1 == 1 && rate_1 > 0)  || (rate_2 == 1 && rate_2 > 0) || (rate_3 == 1 && rate_3 > 0) || (rate_4 == 1 && rate_4 > 0) || (rate_5 == 1 && rate_5 > 0) || (rate_6 == 1 && rate_6 > 0) || (rate_7 == 1 && rate_7 > 0)){
							alertEmail();
						}else
							alertNextUser2(title,message,button);
					}
				}else{ //when average was selected
					if(alertaverate <= alerts.average){ // 5 < 1
						alertEmail();
					}else
						alertNextUser2(title,message,button);
				}
				//var p = 'placeId='+placeId+'&rated1='+rate_1+'&rated2='+rate_2+'&rated3='+rate_3+'&rated4='+rate_4+'&rated5='+rate_5+'&rated6='+rate_6+'&rated7='+rate_7+'&aveRate='+aveRated.toFixed(1)+'&comment='+ratecomment+'&case=1&source=';
			}else
				alertNextUser2(title,message,button);
		}else
			alertNextUser2(title,message,button);
	}
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
				//setTimeout(function() {
					//alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
				//}, 300);
				saverate();
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=follow&email='+email+'&placeId='+placeId+'&case=1',success:function(lastId){
					setdefault();
					sendEmail2Client2(1);
				}});
			}
		}},{caption: 'cancel',callback:function(){setTimeout(function() {
			saverate();
			alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
		}, 500);}}]
	});
   //clearconsole();	
}
//items: {src: 'http://www.tabluu.com/app/privacy_policy.php?name='+customArray.businessName},
function showpolicy(){
	$.magnificPopup.open({
		disableOn: 0,
		items: {src: 'privacy_policy.php?name='+customArray.businessName},
		type: 'iframe',
		preloader: true
	}); 
}
function decodequote(str){
	return String(str).replace(/<double>/g,'"').replace('<privacy_policy_link>','<a href="privacy_policy.php?name='+customArray.businessName+'" class="fancybox fancybox.iframe">Privacy Policy</a>').replace(/<brand>/,businessname).replace(/<comma>/g,',').replace(/{_}/g,"'").replace(/<quote>/g,"'").replace(/{}/g,'"');
}

function hadpoorexp(){
	setTimeout(function() {
		$.box_Dialog((typeof(defaultTextMessage.followB) != 'undefined' ? decodequote(defaultTextMessage.followB) : String(decodequote(defaultTextMessage2.followB))), {
			'type':     'question',
			'title':    '<span class="color-white">'+(typeof(defaultTextMessage.followT) != 'undefined' ? String(decodequote(defaultTextMessage.followT)) : String(decodequote(defaultTextMessage2.followT)))+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: (typeof(defaultButtonText.follow) != 'undefined' ? defaultButtonText.follow[1] : defaultButtonText2.follow[1] ),callback:function (){
				setTimeout(function() {
					followplace();
				}, 300);
		}},{caption: (typeof(defaultButtonText.follow) != 'undefined' ? defaultButtonText.follow[0] : defaultButtonText2.follow[0] ),callback:function(){setTimeout(function() {
			saverate();
			alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
		}, 500);}}]
	  });
   }, 300);
}

function pressyes(){
	if(customArray.email_alert != ''){
		var alerts = $.parseJSON(customArray.email_alert);
		if(alerts.is_alert > 0){ // when send alerts is active
				var rate_1 =ratedObj[0];
				var rate_2 =(typeof(ratedObj[1]) != 'undefined' ? ratedObj[1] : 0);
				var rate_3 =(typeof(ratedObj[2]) != 'undefined' ? ratedObj[2] : 0);
				var rate_4 =(typeof(ratedObj[3]) != 'undefined' ? ratedObj[3] : 0);
				var rate_5 =(typeof(ratedObj[4]) != 'undefined' ? ratedObj[4] : 0);
				var rate_6 =(typeof(ratedObj[5]) !== 'undefined' ? ratedObj[5] : 0);
				var rate_7 =(typeof(ratedObj[6]) !== 'undefined' ? ratedObj[6] : 0);
			if(alerts.alertType > 0){ //when individual rating was selected
				
				if(alerts.indiRate > 0){ //2 and below
					if((rate_1 <= 2 && rate_1 > 0)  || (rate_2 <= 2 && rate_2 > 0) || (rate_3 <= 2 && rate_3 > 0) || (rate_4 <= 2 && rate_4 > 0) || (rate_5 <= 2 && rate_5 > 0) || (rate_6 <= 2 && rate_6 > 0) || (rate_7 <= 2 && rate_7 > 0)){
						setTimeout(function() {alertEmail()}, 300);
					}else
						hadpoorexp();
				}else{
					if((rate_1 == 1 && rate_1 > 0)  || (rate_2 == 1 && rate_2 > 0) || (rate_3 == 1 && rate_3 > 0) || (rate_4 == 1 && rate_4 > 0) || (rate_5 == 1 && rate_5 > 0) || (rate_6 == 1 && rate_6 > 0) || (rate_7 == 1 && rate_7 > 0)){
						setTimeout(function() {alertEmail()}, 300);
					}else
						hadpoorexp();
				}
			}else{ //when average was selected
				if(alertaverate <= alerts.average){ // 5 < 1
					setTimeout(function() {alertEmail()}, 300);
				}else
					hadpoorexp();
			}
			//var p = 'placeId='+placeId+'&rated1='+rate_1+'&rated2='+rate_2+'&rated3='+rate_3+'&rated4='+rate_4+'&rated5='+rate_5+'&rated6='+rate_6+'&rated7='+rate_7+'&aveRate='+aveRated.toFixed(1)+'&comment='+ratecomment+'&case=1&source=';
		}else
			hadpoorexp();
	}else
		hadpoorexp();
}

function ratevalue(rate,page){
    ratedObj.push(rate);
	if(item2Rate.length > 1 && page == 2){
		showLoader();
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratetwo.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });
		//setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratetwo.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 100);
	}else if(item2Rate.length > 2 && page == 3){
	   showLoader();
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratethree.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });
		//showLoader();
		//setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratethree.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 100);
	}else if(item2Rate.length > 3 && page == 4){
		showLoader();
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratefour.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });
		//setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratefour.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 100);
	}else if(item2Rate.length > 4 && page == 5){
		showLoader();
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratefive.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });
		//setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratefive.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 100);
	}else if(item2Rate.length > 5 && page == 6){
		showLoader();
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratesix.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });
		//setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratesix.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 100);
	}else if(item2Rate.length > 6 && page == 7){
		showLoader();
		setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateseven.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });}, 100);
	}else{
		if(getUrlVar('s') != '' && getUrlVar('s') == 2){
			clearInterval(timeInverval);
			refresh_handler();
		}
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
		alertaverate = aveRated;
		$.box_Dialog('<p style="padding:5px 0px;text-align:left;font-size:14px;">'+defaultTextMessage.average+' '+ aveRated.toFixed(1) + '/5 </p>'+'<textarea class="comment-txt" style="width:100% !important;height:7em !important;margin:0 auto !important;font-size:0.8em;resize: none;"></textarea>', {
			'type':     'question',
			'title':    '<span class="color-white">'+defaultTextMessage.comment+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: defaultButtonText.comment[1],callback:function(){
				ratecomment = $('.comment-txt').val();
				if(defaultPostReview.posted > 0 && aveRated >= percent){
					setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "share.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });}, 500);
				}else{
					//alert(String(defaultTextMessage.followT))
					pressyes();
				}
			}},{caption: defaultButtonText.comment[0],callback:function(){
				ratecomment = '';
				if(defaultPostReview.posted > 0 && aveRated >= percent){
					setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "share.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });}, 500);
				}else{
					pressyes();
				}
			}}]
		});		
	}	
}
function setdefault(){
	ratedObj = [],ratecomment='';urlphotoshared='';
	sharedphoto=0;isphototakedone=0;takeaphoto=0;
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
    var p = 'placeId='+placeId+'&rated1='+rate_1+'&rated2='+rate_2+'&rated3='+rate_3+'&rated4='+rate_4+'&rated5='+rate_5+'&rated6='+rate_6+'&rated7='+rate_7+'&aveRate='+aveRated.toFixed(1)+'&comment='+ratecomment+'&case=1&param='+isTakeSelfie+'&source=';
    $.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=ratesave&'+p,success:function(lastId){
		last_Id = lastId;
		setdefault();
	}});
	//clearconsole();
}
function photoshare(isfb){
  //clearconsole();
}

$(document).bind('mobileinit', function(){
     $.mobile.metaViewportContent = 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no';
});
$(document).on('pageshow','#sharephoto', function() {
	window.history.forward(1);
})
$(document).on('pageinit','#sharephoto', function() {
	if(getUrlVar('s') != '' && getUrlVar('s') == 2){
		clearInterval(timeInverval);
		refresh_handler();
	}
	$('#sharephoto .take-no').html(defaultButtonText.share[0]);
	$('#sharephoto .take-yes').html(defaultButtonText.share[1]);
	$('#sharephoto .titleheader').html(decodequote(defaultTextMessage.share));
	//if(countershare < 1){
		sharephoto();
		$( window ).resize(function() { // when window resize
			sharephoto();
		});
		$('#sharephoto .take-no').click(function(e){
		  // showLoader();
		   pressyes();
		   e.preventDefault();
		});
		$('#sharephoto .take-yes').click(function(e){ 
			showLoader();
			loginFb();
			e.preventDefault();
		});
		$('.share_privacy').html(decodequote('Press the "yes" button to agree with Tabluu\'s <privacy_policy_link>.'));
		$.box_Dialog((typeof(defaultTextMessage.logoutB) != 'undefined' ? decodequote(defaultTextMessage.logoutB) : decodequote(defaultTextMessage2.logoutB)), {
			'type':     'question',
			'title':    '<span class="color-white">'+(typeof(defaultTextMessage.logoutT) != 'undefined' ? decodequote(defaultTextMessage.logoutT) : decodequote(defaultTextMessage2.logoutT))+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: (typeof(defaultButtonText.logout) != 'undefined' ? decodequote(defaultButtonText.logout[0]) : decodequote(defaultButtonText2.logout[0]))}]
		});		
		countershare = 1;	
	//}
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
	if(getUrlVar('s') != '' && getUrlVar('s') == 2){
		clearInterval(timeInverval);
		refresh_handler();
	}
	setdefault();
	$('#takephoto .take-no').html(defaultButtonText.photo[0]);
	$('#takephoto .take-yes').html(defaultButtonText.photo[1]);
	$('#takephoto .titleheader').html(decodequote(defaultTextMessage.takePhoto));
	$('#photoId').val(customArray.placeId);
	//if(countertake < 1){
		pagephoto();	
		$( window ).resize(function() { // when window resize
			pagephoto();
		});
		$('#takephoto .take-no').click(function(e){ 
			showLoader();
			setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });}, 100);
			return false;
			e.preventDefault();
		});
		$('#upload').click(function(e){}); // when upload button change fb	photo
		$('#takephoto .take-yes').click(function(e){ 
			$('#filephoto').click();
			e.preventDefault();
		});
		$('#frmtakephoto').on('change',function(e){ // save fb photo
			takeaphoto = 1;
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
								showLoader();
								$.box_Dialog('If the option to share on Facebook is chosen later, this photo will be used.', {
									'type':     'question',
									'title':    '<span class="color-white">photo captured<span>',
									'center_buttons': true,
									'show_close_button':false,
									'overlay_close':false,
									'buttons':  [{caption: 'okay',callback:function(){
										setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });}, 100);
									}}]
								});	
								
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
	//}
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
function alertEmail2(){
	$.box_Dialog((typeof(defaultTextMessage.badEmailB) != 'undefined' ? decodequote(defaultTextMessage.badEmailB) : decodequote(defaultTextMessage2.badEmailB)), {
		'type':     'question',
		'title':    '<span class="color-white">'+(typeof(defaultTextMessage.badEmailT) != 'undefined' ? decodequote(defaultTextMessage.badEmailT) : decodequote(defaultTextMessage2.badEmailT)),
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: (typeof(defaultButtonText.badEmail) != 'undefined' ? decodequote(defaultButtonText.badEmail[1]) : decodequote(defaultButtonText2.badEmail[1])),callback:function(){setTimeout(function() {
			alertform();
		}, 300);}},{caption: (typeof(defaultButtonText.badEmail) != 'undefined' ? decodequote(defaultButtonText.badEmail[0]) : decodequote(defaultButtonText2.badEmail[0])),callback:
		function(){
			showLoader();
			if(isTakeSelfie == '' || isTakeSelfie == 2)
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });
		}}]
	});
}
function fbisfollow(){
		setTimeout(function() {
			$.box_Dialog((typeof(defaultTextMessage.followB) != 'undefined' ? String(decodequote(defaultTextMessage.followB)) : String(decodequote(defaultTextMessage2.followB))), {
				'type':     'question',
				'title':    '<span class="color-white">'+(typeof(defaultTextMessage.followT) != 'undefined' ? String(decodequote(defaultTextMessage.followT)) : String(decodequote(defaultTextMessage2.followT)))+'<span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons':  [{caption: (typeof(defaultButtonText.follow) != 'undefined' ? defaultButtonText.follow[1] : defaultButtonText2.follow[1] ),callback:function (){
					setTimeout(function() {
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=follow&placeId='+placeId+'&case=2&lastId='+lastidbusiness,success:function(lastId){
							setdefault();
							sendEmail2Client2(1);
						}});
					 //alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
					}, 300);
					
			}},{caption: (typeof(defaultButtonText.follow) != 'undefined' ? defaultButtonText.follow[0] : defaultButtonText2.follow[0] ),callback:function(){setTimeout(function() {
					//saverate();
					setdefault();
					 alertNextUser(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
				}, 500);}}]
		  });
	  }, 300);
}
function pressyes2(){
	if(customArray.email_alert != ''){
		var alerts = $.parseJSON(customArray.email_alert);
		if(alerts.is_alert > 0){ // when send alerts is active
				var rate_1 =ratedObj[0];
				var rate_2 =(typeof(ratedObj[1]) != 'undefined' ? ratedObj[1] : 0);
				var rate_3 =(typeof(ratedObj[2]) != 'undefined' ? ratedObj[2] : 0);
				var rate_4 =(typeof(ratedObj[3]) != 'undefined' ? ratedObj[3] : 0);
				var rate_5 =(typeof(ratedObj[4]) != 'undefined' ? ratedObj[4] : 0);
				var rate_6 =(typeof(ratedObj[5]) !== 'undefined' ? ratedObj[5] : 0);
				var rate_7 =(typeof(ratedObj[6]) !== 'undefined' ? ratedObj[6] : 0);
			if(alerts.alertType > 0){ //when individual rating was selected
				
				if(alerts.indiRate > 0){ //2 and below
					if((rate_1 <= 2 && rate_1 > 0)  || (rate_2 <= 2 && rate_2 > 0) || (rate_3 <= 2 && rate_3 > 0) || (rate_4 <= 2 && rate_4 > 0) || (rate_5 <= 2 && rate_5 > 0) || (rate_6 <= 2 && rate_6 > 0) || (rate_7 <= 2 && rate_7 > 0)){
						setTimeout(function() {alertEmail2()}, 300);
					}else
						fbisfollow();
				}else{
					if((rate_1 == 1 && rate_1 > 0)  || (rate_2 == 1 && rate_2 > 0) || (rate_3 == 1 && rate_3 > 0) || (rate_4 == 1 && rate_4 > 0) || (rate_5 == 1 && rate_5 > 0) || (rate_6 == 1 && rate_6 > 0) || (rate_7 == 1 && rate_7 > 0)){
						setTimeout(function() {alertEmail2()}, 300);
					}else
						fbisfollow();
				}
			}else{ //when average was selected
				if(alertaverate <= alerts.average){ // 5 < 1
					setTimeout(function() {alertEmail2()}, 300);
				}else
					fbisfollow();
			}
			//var p = 'placeId='+placeId+'&rated1='+rate_1+'&rated2='+rate_2+'&rated3='+rate_3+'&rated4='+rate_4+'&rated5='+rate_5+'&rated6='+rate_6+'&rated7='+rate_7+'&aveRate='+aveRated.toFixed(1)+'&comment='+ratecomment+'&case=1&source=';
		}else
			fbisfollow();
	}else
		fbisfollow();
}

function loginFb(){
	if(getUrlVar('s') != '' && getUrlVar('s') == 2){
		clearInterval(timeInverval);
		refresh_handler();
	}
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
				var address = customArray.address +', '+ customArray.city +', '+customArray.country;
				var nicename = customArray.nicename;
				var preview = '';
				if(customArray.fbpost != ""){
					preview = String(customArray.fbpost).replace(/<brand>/g,customArray.businessName).replace(/<rating>/,aveRated.toFixed(1)).replace(/<max_rating>/,'5').replace(/<tabluu_url>/,'https://www.tabluu.com/'+customArray.nicename+'.html').replace(/<address>/,address).replace(/<tel>/,customArray.contactNo).replace(/<comment>/,ratecomment);
				}else{
					var defaultstr = '<comment>. <brand> gets a <rating> out of <max_rating> rating from me. <tabluu_url> <address>, <tel>.';
					preview = String(defaultstr).replace(/<brand>/g,customArray.businessName).replace(/<rating>/,aveRated.toFixed(1)).replace(/<max_rating>/,'5').replace(/<tabluu_url>/,'https://www.tabluu.com/'+customArray.nicename+'.html').replace(/<address>/,address).replace(/<tel>/,customArray.contactNo).replace(/<comment>/,ratecomment);
					//preview = 'I rate '+customArray.businessName+' '+aveRated.toFixed(1)+' out of 5. '+	  ratecomment+' Go to: http://www.tabluu.com/'+nicename+'.html - Addr: '+ address +'. Tel: '+customArray.contactNo+'.';
				}
				var location = fbPhotoPathShare;
				if(isphototakedone < 0 && takeaphoto > 0){ // take the camera? && check if the photo temporary done uploaded
					setTimeout(function() {
						username = response.name;
						var p = 'placeId='+placeId+'&rated1='+rate_1+'&rated2='+rate_2+'&rated3='+rate_3+'&rated4='+rate_4+'&rated5='+rate_5+'&rated6='+rate_6+'&rated7='+rate_7+'&aveRate='+aveRated.toFixed(1)+'&comment='+ratecomment+'&userName='+response.name+'&userId='+response.id+'&email='+response.email+'&totalFriends='+friendlist.data.length+'&photo_url='+urlphotoshared+'&case=2&param='+isTakeSelfie+'&socialopt='+customArray.optsocialpost+'&source=fb&data='; 
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=ratesave&'+p,success:function(share_photo){
							var fb='';
							//var ids = lastId.split('_');
							//lastidbusiness = ids[1];
							//last_Id = ids[0];
							if(sharedphoto > 0)
								fb = 'fb';
							p = p +'&source='+fb;
							$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=photoshare&'+p,success:function(lastId){
								setdefault();
							}});
							FB.api('/me/photos', 'post', {url: location+share_photo,name: preview}, function(response) {  
								FB.logout(function(response) {
								});
							});
							pressyes2();
						}});
						; 					
					}, 500);
				}else{ 
				  //JSON.stringify(response)
				   if(typeof(urlphotoshared) == 'undefined' || urlphotoshared == ''){
					  urlphotoshared=customArray.fbImg;
					}  
					username = response.name;
					var p = 'placeId='+placeId+'&rated1='+rate_1+'&rated2='+rate_2+'&rated3='+rate_3+'&rated4='+rate_4+'&rated5='+rate_5+'&rated6='+rate_6+'&rated7='+rate_7+'&aveRate='+aveRated.toFixed(1)+'&comment='+ratecomment+'&userName='+response.name+'&userId='+response.id+'&email='+response.email+'&totalFriends='+friendlist.data.length+'&photo_url='+urlphotoshared+'&case=2&param='+isTakeSelfie+'&socialopt='+customArray.optsocialpost+'&source=fb&data='; 
					$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=ratesave&'+p,success:function(share_photo){
						//var ids = lastId.split('_');
						//lastidbusiness = ids[1];
						//last_Id = ids[0];
						var fb='';
						if(sharedphoto > 0)
							fb = 'fb';
						p = p +'&source='+fb;
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=photoshare&'+p,success:function(lastId){
							setdefault();
						}});
						//var address = customArray.businessName +', '+ customArray.address +', '+ customArray.city +', '+customArray.country;
						//var nicename = customArray.nicename;
						FB.api('/me/photos', 'post', {url: location+share_photo,name: preview}, function(response) {  
							FB.logout(function(response) {
							});
						});	
						pressyes2();
					}});
					 
			   }				
			});
		 });
	   }else {
			$.box_Dialog((typeof(defaultTextMessage.followB) != 'undefined' ? String(decodequote(defaultTextMessage.followB)) : String(decodequote(defaultTextMessage2.followB))), {
				'type':     'question',
				'title':    '<span class="color-white">'+(typeof(defaultTextMessage.followT) != 'undefined' ? String(decodequote(defaultTextMessage.followT)) : String(decodequote(defaultTextMessage2.followT)))+'<span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons':  [{caption: (typeof(defaultButtonText.follow) != 'undefined' ? defaultButtonText.follow[1] : defaultButtonText2.follow[1] ),callback:function (){
					setTimeout(function() {
						followplace();
					}, 300);
			}},{caption:(typeof(defaultButtonText.follow) != 'undefined' ? defaultButtonText.follow[0] : defaultButtonText2.follow[0] ),callback:function(){setTimeout(function() {
					saverate();
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
   nicename = getUrlVar('p');
   isTakeSelfie = getUrlVar('s');	
   $('.fancybox').fancybox();
   
   if(istest == true){
		domainpath = '';
		everFree = 3602345,basicID=3361656,basic12 = 3602785,basic24 = 3602788,proID=3361672,pro12 = 3602786,pro24 = 3602789,enterprise=3602346,enterprise12 =3602787,enterprise24 = 3602790; fbPhotoPathShare= 'https://www.tabluu.com/staging/';
	}else{
		domainpath = 'https://www.tabluu.com/';
		fbPhotoPathShare= 'https://www.tabluu.com/app/';
	}
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
			setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "takephoto.html",{ data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });return false;}, 500);
		}},{caption:  defaultButtonText.option[1],callback:function(){
			window.open('login.html','_blank');
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

function getSelfie(){
		$('#selfieId').val(customArray.placeId);
		$('#fileselfie').click();
		$('#frmtakeselfie').on('change',function(e){ // save fb photo
			takeaphoto = 1;
			$('#frmtakeselfie').ajaxSubmit({beforeSubmit:  beforeSubmit2,success: showResponse2,resetForm: true });
			e.preventDefault();
		});	
		function showResponse2(responseText, statusText, xhr, $form)  { 
			isphototakedone = 1;
			urlphotoshared=responseText;
		}
		function beforeSubmit2(){
			if (window.File){
			   var fsize = $('#fileselfie')[0].files[0].size; //get file size
			   var ftype = $('#fileselfie')[0].files[0].type; // get file type
				switch(ftype){
					case 'image/png':
					case 'image/gif':
					case 'image/jpeg':
					case 'image/jpg':
					case 'image/bmp':
					case 'image/pjpeg':
						sharedphoto=1;
						$.box_Dialog('If the option to share on Facebook is chosen later, this photo will be used.', {
							'type':     'question',
							'title':    '<span class="color-white">photo captured<span>',
							'center_buttons': true,
							'show_close_button':false,
							'overlay_close':false,
							'buttons':  [{caption: 'okay',callback:function(){
								setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });}, 100);
							}}]
						});	
						
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
}
function getPhoto(){
		$('#selfieId').val(customArray.placeId);
		$('#fileselfie').click();
		$('#frmtakeselfie').on('change',function(e){ // save fb photo
			takeaphoto = 1;
			$('#frmtakeselfie').ajaxSubmit({beforeSubmit:  beforeSubmit_2,success: showResponse_2,resetForm: true });
			e.preventDefault();
		});	
		function showResponse_2(responseText, statusText, xhr, $form)  { 
			isphototakedone = 1;
			urlphotoshared=responseText;
		}
		function beforeSubmit_2(){
			if (window.File){
			   var fsize = $('#fileselfie')[0].files[0].size; //get file size
			   var ftype = $('#fileselfie')[0].files[0].type; // get file type
				switch(ftype){
					case 'image/png':
					case 'image/gif':
					case 'image/jpeg':
					case 'image/jpg':
					case 'image/bmp':
					case 'image/pjpeg':
						sharedphoto=1;
						$.box_Dialog('If the option to share on Facebook is chosen later, this photo will be used.', {
							'type':     'question',
							'title':    '<span class="color-white">photo captured<span>',
							'center_buttons': true,
							'show_close_button':false,
							'overlay_close':false,
							'buttons':  [{caption: 'okay',callback:function(){
								setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '') });}, 100);
							}}]
						});	
						
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
}

function showCamera(IDparam){
/*
	$.magnificPopup.open({
		items: {src: IDparam},
		type: 'inline',
		preloader: false,
		focus: '#username',
		modal: true
	}); */


	var screen =  $('#screen');
    $('.usesnap').show(); // button fo
    $('.usesnap').hide(); // button fo
	webcam.set_swf_url('js/webcam.swf');
	webcam.set_api_url('savecam.php');	// The upload script
	webcam.set_quality(90);				// JPEG Photo Quality
	webcam.set_shutter_sound(true, 'shutter.mp3');
	var curHeight = window.innerWidth,width=0,height=0,ratio;
	ratio = 0.68;
	width =  curHeight * ratio;
	height = window.innerHeight * 0.68;
	$('.cam-frame').css({width:width});
	screen.html(webcam.get_html($('.cam-frame').width(), height));
	var shootEnabled = false;
	$.fancybox({'scrolling':'no','closeEffect':'fade','closeClick':false,'closeBtn':false,'overlayColor': '#000','href' :'#data','overlayOpacity': 0.5}); 
	$('.snapshot .takesnap').click(function(){
		if(!shootEnabled) return false;
		$('.snapshot').hide(); // button for snapshot
		$('.usesnap').show(); // button for use		
		webcam.freeze();
		return false;
	});
	$('.usesnap .cancelsnap').click(function(e){
		e.preventDefault();
		$('.snapshot').show(); // button for snapshot
		$('.usesnap').hide(); // button for use
		webcam.reset();
		return false;
	});
	$('.snapshot .cancelsnap').click(function(e){
		e.preventDefault();
		//$.magnificPopup.close();
		$.fancybox.close();
		closeselfie=1;clearInterval(timeInverval);refresh_handler();
	});
	$('.usesnap .use').click(function(){
		$('.usesnap').hide();
		webcam.upload2(placeId);
		return false;
	});
	webcam.set_hook('onLoad',function(){$('.snapshot').show();shootEnabled = true;});
	
	webcam.set_hook('onComplete', function(src){
		//msg = $.parseJSON(msg);
		urlphotoshared=src;
		//$.magnificPopup.close();
		$.fancybox.close();
		closeselfie=1;clearInterval(timeInverval);refresh_handler();
		//hideLoader();
		$.box_Dialog('If the option to share on Facebook is chosen later, this photo will be used.', {
			'type':     'question',
			'title':    '<span class="color-white">photo captured<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: 'okay'}]
		});	
	});
	webcam.set_hook('onError',function(e){screen.html(e);}); 
    
}
function getUrlVar(key){
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
	return result && unescape(result[1]) || ""; 
}

function refresh() {
	if(closeselfie == 1){
		window.location = location.href;
	}
}

function refresh_handler() {
    timeInverval = setInterval(refresh, 10*60*1000); //every 10 minutes
}
function invalidUsedBackbtn(){
	//alert('u used back browser');
}
$(document).on('pageinit','#rateone', function() {
	hideLoader();	
	//if(counter1 < 1){
		if(typeof(ratedObj[0]) != 'undefined')
			invalidUsedBackbtn();

		var ispageok = false;nicename = $('#nicename').val();
		showLoader();
		$.ajax({type: "POST",url:"getData.php",cache: false,data:'nice='+nicename+'&opt=getrate',success:function(result){
			if(typeof(result) == 'false')
				alertErrorPage('error',"Rating page not found");
			else{
			customArray =  $.parseJSON(result);
			hideLoader();
			//urlphotoshared=customArray.fbImg;
			 var toberate=[],selectedItems=[];
			 if(customArray.item2Rate != '')
				toberate = $.parseJSON(customArray.item2Rate);
			 selectedItems = $.parseJSON(customArray.selectedItems);
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
							item2Rate.push(decodequote(toberate[j])); 
					}	
				}
			}
			for(var i in selectedItems){
					for(var j in questionDefault){
						name = questionDefault[j].split('_');
						if(name[1] == selectedItems[i])
							item2Rate.push(questionDefault[j]);
					}	
				}
			if(customArray.reviewPost != '')
				defaultPostReview = $.parseJSON(customArray.reviewPost);
			if(customArray.button != '')
				defaultButtonText = $.parseJSON(customArray.button);
			if(customArray.messageBox != '')	
				defaultTextMessage = $.parseJSON(customArray.messageBox);

			if(customArray.nicename == "")
				alertErrorPage('setup incomplete','Go to Setup > Your Tabluu (Business) Page');
			else if(customArray.city == '')	
				alertErrorPage('setup incomplete','Go to Setup > Your Tabluu (Business) Page ');
			else if($.trim(customArray.fbImg) == '' && customArray.optsocialpost < 1)
				alertErrorPage('setup incomplete','Go to Setup > Customers\' Social Media Posts > What to Post to Social Media? ');
			else if(customArray.subscribe < 1)
				alertErrorPage('this location is offline','Please change the status to online');
			else if(customArray.settingsItem < 1)
				alertErrorPage('settings not locked','To lock, flick the switch "on". Setup > What Questions to Ask');
			else{
				if($.inArray(customArray.state,state_Array) == -1){
					var ratetxt = item2Rate[0].split('_');
					$('.ratetxt').html(ratetxt[0]);
					placeId = customArray.placeId;
					rate_initialize();
					if($.inArray(getUrlVar('s'),['0','1','2','3','4','5','e',''] ) == -1){
						alertErrorPage('Unauthorized',"Please contact Tabluu support");
					}else{	
						if(getUrlVar('s') != '' && (getUrlVar('s') == 1 || getUrlVar('s') == 'e')){
							$.box_Dialog((typeof(defaultTextMessage.takeselfieB) != 'undefined' ? decodequote(defaultTextMessage.takeselfieB) : decodequote(defaultTextMessage2.takeselfieB)), {
								'type':     'question',
								'title':    '<span class="color-white">'+(typeof(defaultTextMessage.takeselfieT) != 'undefined' ? decodequote(defaultTextMessage.takeselfieT) : decodequote(defaultTextMessage2.takeselfieT))+' <img src="emoticons/smile.png" width="20" height="20" /><span>',
								'center_buttons': true,
								'show_close_button':false,
								'overlay_close':false,
								'buttons':  [{caption: (typeof(defaultButtonText.btntake) != 'undefined' ? decodequote(defaultButtonText.btntake[1]) : decodequote(defaultButtonText2.btntake[1])),callback:function(){
										if(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))
											setTimeout(function(){getSelfie();},200);
										else
											showCamera('#camera-modal');
									}},{caption: (typeof(defaultButtonText.btntake) != 'undefined' ? decodequote(defaultButtonText.btntake[0]) : decodequote(defaultButtonText2.btntake[0]))}]
							});
						}
						if(getUrlVar('s') != '' && (getUrlVar('s') == 2)){	
							if(customArray.productId != proID && customArray.productId != pro12 && customArray.productId != pro24 && customArray.productId != enterprise12 && customArray.productId != enterprise24 && customArray.productId != enterprise)
								alertErrorPage('no access','Please upgrade to pro plan & above to access this feature');
							else{
								$.box_Dialog((typeof(defaultTextMessage.takeselfieB) != 'undefined' ? decodequote(defaultTextMessage.takeselfieB) : decodequote(defaultTextMessage2.takeselfieB)), {
									'type':     'question',
									'title':    '<span class="color-white">'+(typeof(defaultTextMessage.takeselfieT) != 'undefined' ? decodequote(defaultTextMessage.takeselfieT) : decodequote(defaultTextMessage2.takeselfieT))+' <img src="emoticons/smile.png" width="20" height="20" /><span>',
									'center_buttons': true,
									'show_close_button':false,
									'overlay_close':false,
									'buttons':  [{caption: (typeof(defaultButtonText.btntake) != 'undefined' ? decodequote(defaultButtonText.btntake[1]) : decodequote(defaultButtonText2.btntake[1])),callback:function(){
											if(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))
												setTimeout(function(){getPhoto();},200);
											else
												showCamera('#camera-modal');
										}},{caption: (typeof(defaultButtonText.btntake) != 'undefined' ? decodequote(defaultButtonText.btntake[0]) : decodequote(defaultButtonText2.btntake[0])),callback:function(){closeselfie=1;clearInterval(timeInverval);refresh_handler();}}]
								});
							}
						}
						if(getUrlVar('s') != '' && getUrlVar('s') == 5){
								$.box_Dialog((typeof(defaultTextMessage.surveyselfieB) != 'undefined' ? decodequote(defaultTextMessage.surveyselfieB) : decodequote(defaultTextMessage2.surveyselfieB)), {
									'type':     'question',
									'title':    '<span class="color-white">'+(typeof(defaultTextMessage.surveyselfieT) != 'undefined' ? decodequote(defaultTextMessage.surveyselfieT) : decodequote(defaultTextMessage2.surveyselfieT))+' <img src="emoticons/smile.png" width="20" height="20" /><span>',
									'center_buttons': true,
									'show_close_button':false,
									'overlay_close':false,
									'buttons':  [{caption: (typeof(defaultButtonText.btnfeedback) != 'undefined' ? decodequote(defaultButtonText.btnfeedback[1]) : decodequote(defaultButtonText2.btnfeedback[1])),callback:function(){
											if(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))
												setTimeout(function(){closeselfie=1;clearInterval(timeInverval);refresh_handler();getPhoto();},200);
											else
												showCamera('#camera-modal');
										}},{caption: (typeof(defaultButtonText.btnfeedback) != 'undefined' ? decodequote(defaultButtonText.btnfeedback[0]) : decodequote(defaultButtonText2.btnfeedback[0])),callback:function(){closeselfie=1;clearInterval(timeInverval);refresh_handler();}}]
								});
							//}
						}
					}
					/*
					$.magnificPopup.open({
						items: {
							  src: $('<div id="privacy">'
							+'<h2>Privacy Policy</h2>'
							+'<ul>'
								+'<li>You allow Tabluu.com to collect your personal information.</li>'
								+'<li>You give your consent to <brand> to contact you via Tabluu.com .</li>'
								+'<li>You may "unfollow" or "unsubscribe" to opt out from <brand>\'s email list when you receive emails from <brand>.</li>'
								+'<li>Tabluu.com will protect your personal information by reasonable security safeguards.</li>'
								+'<li>Your personal information may be stored at a destination outside of the country you reside in.</li>'
								+'<li>Tabluu.com will use a reputable third party email server to send emails to you.</li>'
								+'<li>This Privacy Policy is governed by and interpreted in accordance with the laws of Singapore and will be subjected to the exclusive jurisdiction of the courts of Singapore.</li>'
							+'</ul>'							  
							  +'</div>')
							},
							type: 'inline'
					}); */
				}else
					alertErrorPage('unauthorized',"Please subscribe.");
			}	
			$(".loc-login").on( 'click', function () {login()});
			//clearconsole();
			}
		}});
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
		rate(2);
	counter1 = 1;
	//}
});

$(document).on('pageinit','#ratetwo', function() {
    hideLoader();
	if(getUrlVar('s') != '' && getUrlVar('s') == 2){
		clearInterval(timeInverval);
		refresh_handler();
	}
	if(typeof(ratedObj[1]) != 'undefined')
		invalidUsedBackbtn();
	//if(counter2 < 1){
		$(".loc-login").on( 'click', function () {login()});
		var ratetxt = item2Rate[1].split('_');
		$('.ratetxt').html(ratetxt[0]);
		rate_initialize();
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
	   rate(3);
		counter2 = 1;
  // }
});

$(document).on('pageinit','#ratethree', function() {
	hideLoader();
	if(getUrlVar('s') != '' && getUrlVar('s') == 2){
		clearInterval(timeInverval);
		refresh_handler();
	}
	if(typeof(ratedObj[2]) != 'undefined')
		invalidUsedBackbtn();	
	//if(counter3 < 1){
		$(".loc-login").on( 'click', function () {login()});
		var ratetxt = item2Rate[2].split('_');
		$('.ratetxt').html(ratetxt[0]);
		rate_initialize();
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
	   rate(4);
	   counter3=1
   //}
});

$(document).on('pageinit','#ratefour', function() {
	if(getUrlVar('s') != '' && getUrlVar('s') == 2){
		clearInterval(timeInverval);
		refresh_handler();
	}
	if(typeof(ratedObj[3]) != 'undefined')
		invalidUsedBackbtn();
	hideLoader();
	//if(counter4 < 1){
		$(".loc-login").on( 'click', function () {login()});
		var ratetxt = item2Rate[3].split('_');
		$('.ratetxt').html(ratetxt[0]);
		rate_initialize();
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
	   rate(5);
	   counter4 = 1;
   //}
});

$(document).on('pageinit','#ratefive', function() {
	if(getUrlVar('s') != '' && getUrlVar('s') == 2){
		clearInterval(timeInverval);
		refresh_handler();
	}
	if(typeof(ratedObj[4]) != 'undefined')
		invalidUsedBackbtn();
	hideLoader();
	//if(counter5 < 1){
		$(".loc-login").on( 'click', function () {login()});
		var ratetxt = item2Rate[4].split('_');
		$('.ratetxt').html(ratetxt[0]);
		rate_initialize();
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
	   rate(6);
		counter5=1;
   //}
});
$(document).on('pageinit','#ratesix', function() {
	if(getUrlVar('s') != '' && getUrlVar('s') == 2){
		clearInterval(timeInverval);
		refresh_handler();
	}
	if(typeof(ratedObj[5]) != 'undefined')
		invalidUsedBackbtn();
	hideLoader();
	//if(counter6 < 1){
		$(".loc-login").on( 'click', function () {login()});
		var ratetxt = item2Rate[5].split('_');
		$('.ratetxt').html(ratetxt[0]);
		rate_initialize();
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
	   rate(7);
	   counter6=1;
   //}
});
$(document).on('pageinit','#rateseven', function() {
	if(getUrlVar('s') != '' && getUrlVar('s') == 2){
		clearInterval(timeInverval);
		refresh_handler();
	}
	if(typeof(ratedObj[6]) != 'undefined')
		invalidUsedBackbtn();	
	hideLoader();
	//if(counter7 < 1){
		$(".loc-login").on( 'click', function () {login()});
		var ratetxt = item2Rate[6].split('_');
		$('.ratetxt').html(ratetxt[0]);
		rate_initialize();
		$( window ).resize(function() { // when window resize
			rate_initialize();
		});
	   rate(8);
		counter7=1;
   //}
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
	else
		logo = $.parseJSON('{"dLogo":"images/desktop_default.png","pLogo":"images/iphone_default.png","logo7":"images/7Ins_default.png","mLogo":"images/mobile_default.png","bLogo":"https://www.tabluu.com/images/desktop_default.png"}');
	if(customArray.backgroundImg)
		bgback = $.parseJSON(customArray.backgroundImg);
	businessname = decodequote(customArray.businessName);
    if(businessname.length > 25)
        businessname = businessname.substr(0,25) + '...';
    if(customArray.ratingText != '')
		defaultrating = $.parseJSON(customArray.ratingText);

	$('.vpoor').html(decodequote(defaultrating.vpoor));
	$('.poor').html(decodequote(defaultrating.poor));
	$('.fair').html(decodequote(defaultrating.fair));
	$('.good').html(decodequote(defaultrating.good));
	$('.exc').html(decodequote(defaultrating.excellent));
    var address = decodequote(customArray.businessName) +', '+ decodequote(customArray.address) +', '+ decodequote(customArray.city) +', '+decodequote(customArray.country);
	$('.addressname').html(address);
	if(bgback.bckimage != '' || typeof(bgback.bckimage) != 'undefined')
		$( '.rate' ).css({'background':(bgback.bckimage != '' ? 'url('+bgback.bckimage+') 0 0 no-repeat' : '')});
	$( '.rate' ).css({'color':(customArray.backgroundFont != '' ? customArray.backgroundFont : '#3b3a26')});
	//alert(bgback.bckimage)
	if(bgback.bckimage == '' || typeof(bgback.bckimage) == 'undefined')
		$( '.rate' ).css({'background-color':(customArray.backgroundcolor != '' ? customArray.backgroundcolor : '#DBEBF1')});
		
    if( window.innerWidth <=325){ //iphone
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
		$( ".loc-address").css({'font-size':'7px','padding':'15px 0'});
		$( ".ratelogo").attr('width', '70px');
		$( ".ratelogo").attr('height', '20px');
		 if(typeof(logo.dLogo) == 'undefined' || logo.dLogo == ''){
			$( ".rate-logo" ).css({'padding-top':'10px'});
			$( ".rate-question" ).css({'height':'40px','padding-top':'50px','font-size':'18px'});
            $( ".loc-logo" ).hide();
        }else
		  $( ".loc-logo" ).attr('src', logoUrl);  
    }else if((window.innerWidth > 325 && window.innerWidth < 600)){ // htc
        logoUrl  = logo.mLogo;    
        img.src = logoUrl;
        $(img).load(function(){
            var width = img.width;
            var height = img.height;
			$( ".loc-logo" ).attr('width', width);
			$( ".loc-logo" ).attr('height', height);
        });
		$( ".rate-logo" ).css({'padding-top':'25px'});
		$( ".imgrate1, .imgrate2, .imgrate3, .imgrate4, .imgrate5" ).attr('width', '60').attr('height', '58');
		$( ".rate-star").css({'width':'60px','font-size':'10px'});  //font below star like poor,very poor
		$( ".rate-question" ).css({'padding':'15px 0','font-size':'20px'});
		$( ".rate-wrapstar").css({'width':'325px'}); //width wrap on star image
		$( ".loc-address").css({'font-size':'8px','padding':'15px 0'}); //font address
		$( ".ratelogo").attr('width', '70px');
		$( ".ratelogo").attr('height', '20px');
		 if(typeof(logo.dLogo) == 'undefined' || logo.dLogo == ''){
			$( ".rate-question" ).css({'height':'50px','padding-top':'70px','font-size':'20px'});
			$( ".rate-logo" ).css({'padding-top':'20px'});
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
	    $( ".rate-logo" ).css({'padding-top':'50px'});
        $( ".imgrate1, .imgrate2, .imgrate3, .imgrate4, .imgrate5" ).attr('width', '100').attr('height', '97');
		$( ".rate-star").css({'width':'100px','font-size':'11px'});  //font below star like poor,very poor
		$( ".rate-question" ).css({'padding':'20px 0px 30px 0px','font-size':'35px'});
		$( ".rate-wrapstar").css({'width':'530px'});
		$( ".loc-address").css({'font-size':'10px','padding':'25px 0 10px 0'});
		$( ".ratelogo").attr('width', '103px');
		$( ".ratelogo").attr('height', '30px');
		 if(typeof(logo.dLogo) == 'undefined' || logo.dLogo == ''){
			$( ".rate-question" ).css({'height':'90px','padding-top':'120px','font-size':'35px'});
			$( ".rate-logo" ).css({'padding-top':'20px'});
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
		$( ".rate-logo" ).css({'padding-top':'50px'});
		$( ".imgrate1, .imgrate2, .imgrate3, .imgrate4, .imgrate5" ).attr('width', '132').attr('height', '127');
		$( ".rate-star").css({'width':'132px','font-size':'13px'});  //font below star like poor,very poor
		$( ".rate-wrapstar").css({'width':'704px'});
		$( ".loc-address").css({'font-size':'11px','padding':'20px'});
		$( ".rate-question" ).css({'padding':'30px 0px','font-size':'44px','margin':'0px'});
		$( ".ratelogo").attr('width', '103px');
		$( ".ratelogo").attr('height', '30px');
        if(typeof(logo.dLogo) == 'undefined' || logo.dLogo == ''){ // if logo is empty
			$( ".rate-question" ).css({'height':'100px','padding-top':'150px','font-size':'44px'});
			$( ".rate-logo" ).css({'padding-top':'20px'});
            $( ".loc-logo" ).hide();
        }else
          $( ".loc-logo" ).attr('src', logoUrl);
    }
}