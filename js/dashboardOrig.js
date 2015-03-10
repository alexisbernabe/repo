var curClick=0,locId=0,frmpagemanage=0,setupclickmenu=0,defaultSetup=0;
var locArray=[],userArray=[],customArray=[],viewOnce=0;
var locDefault = '',placeId=0,placename='',keyId=0,loader='',activeLocLength=1;
var online ='images/template/active.png',onlineBg='images/template/activeOnline.png',offline ='images/template/inactive.png',offlineBg='images/template/activeOffline.png';
var trialID = 3356303,trialID30 = 3356318,basicID=3356305,proID=3356306,proplus=3356316,everFree = 3356308,liteBuddy = 3356309,liteBuzz = 3356310,liteStudio = 3356312,liteMetro = 3356313,t=0; //life mode
var creditsFree=0,creditsBasic = 1500, creditsPro = 5000, creditsProplus = 50000;

$(document).ready(function(){
	showLoader();
    keyId = $('#key').val();
	viewOnce=1;
	getData('getUser');
	$("#change-icon").click(function () {  // delete place
		var icon = locId.split('|');
		if(userArray.permission < 2 ){
			if(icon[1] > 0){
				defaulAlertBox('confirm','please confirm','Make this location offline?',3);	
			}else{
				var subs=0,curActive = parseInt(userArray.addLoc) + 1;
				if( parseInt(curActive) >= parseInt(activeLocLength) ){
					defaulAlertBox('confirm','please confirm','Make this location online?',2);
				}else
					defaulAlertBox('confirm','insufficent location subscriptions','Please subscribe to more locations...',4);
			}
		}else
			defaulAlertBox('alert','invalid request','Please contact your administrator(s) for this request.',1);
	});	

	$("#setup-custom").click(function () {  // going to setup page
		var status = locId.split('|');
		if(status[1] > 0)
			getData('getCustom');
		else
			defaulAlertBox('alert','this location is offline','Please change the status to online',1);
	});

	$("#page-stat").click(function () {  // going to statistic page
		var status = locId.split('|');
		if(status[1] > 0)
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "plan.html",{ transition: "flip" });
		else
			defaulAlertBox('alert','this location is offline','Please change the status to online',1);
	});	
	
	$("#del-place").click(function () {  // delete place
		if(userArray.permission < 2 )
			defaulAlertBox('confirm','please confirm','Delete this location?',1);
		else
			defaulAlertBox('alert','invalid request','Please contact your administrator(s) for this request.',1);
	});	
	
	$(".addnew-loc li a").click(function () {  // listview when tried to add new location
		$('.addnew-loc').hide();
		$('.text-loc').show();
		$('#text-6').focus();
	});	
	
	$( ".text-loc .ui-input-text input" ).blur(function() { // input text when it blur
		if($('#text-6').val() == ''){
			$('.addnew-loc').show();
			$('.text-loc').hide();
		}
	});
	
	$( "#text-6" ).keypress(function(e) {
		if(e.which == 13){
            var user = userArray;
			var name = $("#text-6").val();
            if(user.permission < 2){
                var rows = locArray.length; //get total length of location
                if(user.productId == everFree){
                    if(rows == 1){
                        defaulAlertBox('alert','no access',"Please upgrade to basic plan & above to add more locations.");
                    }else{
                        _setBusinessName(name);
                    }
                }else if(user.productId == basicID){
                    if(rows == 3){
                        defaulAlertBox('alert','no access',"Please upgrade to pro plan & above to add more locations.");
                    }else{
                        _setBusinessName(name);
                    }
                }else if(user.productId == proID){
                    if(rows == 7){
                        defaulAlertBox('alert','no access',"Please upgrade to proplus plan & above to add more locations.");
                    }else{
                        _setBusinessName(name);
                    }
                }else if(user.productId == proplus){
                    if(rows == 10){
                        defaulAlertBox('alert','no access',"Please upgrade plan to add more locations.");
                    }else{
                        _setBusinessName(name);
                    } 
               }
		  }else
			defaulAlertBox('alert','invalid request',"Please contact your administrator(s) for this request");
		}
	});
	
	function _setBusinessName(name){
		var isfound = true;
		$('.left-menu li a').each(function (index) {
			var locname  = $( this ).text();
			if(locname == name)
				isfound = false;
		});
		if(!isfound)	
			defaulAlertBox('alert','invalid','Location '+name +' existed')
		else{
			var subs=0,curActive = parseInt(userArray.addLoc) + 1;
			if( parseInt(curActive) >= parseInt(activeLocLength) )
				subs = 1;
			setData({opt:'setLoc',userId:userArray.id,name:name,subs:subs});
		}	
	}
	
	function hadError(lastId){
		if(lastId > 0)
			getData('getLoc');				
		else
			defaulAlertBox('alert','error detected','Please refresh the page');
	}	
		
	function setData(s){
	 switch(s.opt){
		case 'setLoc':
			showLoader();
			$('#text-6').val('');
			$.ajax({url:"setData.php",cache: false,data:'key='+s.userId+'&opt='+s.opt+'&groudId='+userArray.userGroupId+'&subscribe='+s.subs+'&name='+s.name,success:function(lastId){
				hadError(lastId);
			}});
		break;
		case 'delLoc':
			showLoader();
			$.ajax({url:"setData.php",cache: false,data:'key='+s.placeId+'&opt='+s.opt,success:function(lastId){
				hadError(lastId);
			}});	
		break;
		case 'onLoc':
			showLoader();
			$.ajax({url:"setData.php",cache: false,data:'key='+s.placeId+'&opt='+s.opt,success:function(lastId){
				hadError(lastId);
			}});	
		break;
		case 'offLoc':
			//alert('offLoc');
			showLoader();
			$.ajax({url:"setData.php",cache: false,data:'key='+s.placeId+'&opt='+s.opt,success:function(lastId){
				//alert(lastId);
				hadError(lastId);
			}});	
		break;	
	  }
	}

	function getData(opt){
	 switch(opt){
		case 'getUser':
		  $.ajax({url:"getData.php",cache: false,data:'key='+keyId+'&opt='+opt,success:function(result){
			userArray =  $.parseJSON(result);
			getData('getLoc');
		  }});
		break;
		case 'getCustom': 
		  showLoader();	
		  placeId = locId.split('|');
		  $.ajax({url:"getData.php",cache: false,data:'key='+placeId[0]+'&opt='+opt,success:function(result){
			customArray =  $.parseJSON(result);
			hideLoader();
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "setup.html",{ transition: "flip" });
		  }});
		break;	
		case 'getLoc': 
		  locArray=[];
		  $.ajax({url:"getData.php",cache: false,data:'key='+keyId+'&opt='+opt+'&permission='+userArray.permission,success:function(result){
			locArray =  $.parseJSON(result);
			curClick=0;
			DashMenu();
		  }});
		break;	
	  }
	}	

	function showLoader(){loader = jQuery('<div id="overlay"> </div>');loader.appendTo(document.body);}

	function hideLoader(){$( "#overlay" ).remove();}
	
	function DashMenu(){
		locDefault = '<li ><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Help<span class="listview-arrow-default listview-arrow-active"></span></a></li><li ><a href="#">User Admin<span class="listview-arrow-default"></span></a></li><li ><a href="#">Send Emails<span class="listview-arrow-default"></span></a></li><li ><a href="#">Subscription Plan<span class="listview-arrow-default"></span></a></li>';
		if(locArray.length){ // had location already
			activeLocLength=1;
			for(var i in locArray){
				var icon = online;
				if(locArray[i].subscribe < 1)
					icon = offline;
				else
					activeLocLength++;
				locDefault = locDefault + '<li><a href="#" class="'+locArray[i].id+'|'+locArray[i].subscribe+'"><img src="'+icon+'" alt="" class="ui-li-icon ui-corner-none">'+locArray[i].name+'<span class="listview-arrow-default"></span></a></li>';
			}	
			$('.left-menu').html('<ul class="left-menu" data-role="listview">'+locDefault+'</ul>');
			$(".left-menu").on ('click', ' > li', function (event){
				var row = $(this).index();
				var clas = $(this).find( "a" ).attr("class");
				placename  = $( this ).text();
				var id = clas.split(' ');
				locId = id[0];
				$( ".right-header" ).html( placename );		
				curClick = row;
				showHideMenu(row);
				defaultMenu();
				if($( window ).width() <= 600){
					$( '.main-wrap .left-content' ).hide();
					$( '.main-wrap .right-content' ).show();
					$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
				}
				setupclickmenu = row;
			});
			$(".left-menu").listview();
		}else{
			$('.left-menu').html('<ul class="left-menu" data-role="listview">'+locDefault+'</ul>');
			$(".left-menu").listview();		
		}
		hideLoader();
		showHideMenu(curClick);
		defaultMenu();
	}
	
	function showHideMenu(row){
		curClick = row;
		if($( window ).width() <= 600){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}
		$('.right-menu-help').hide();$('.right-menu-admin').hide();$('.right-menu-send').hide();$('.right-menu-plan').hide();$('.right-menu-loc').hide();$('.star').hide();
		if(row == 0){
			$('.right-menu-help').show();
		}else if(row == 1){
			$('.right-menu-admin').show();
		}else if(row == 2){
			$('.right-menu-send').show();
		}else if(row == 3){
			$('.right-menu-plan').show();
		}else if(row > 3){
			$('.star').show();
			placeId= locId;
			$('.right-menu-loc').show();
		}
	}

	function defaultMenu(){
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content' ).css( {"min-height":height.toFixed() + 'em'} );

		if($( window ).width() > 600){
			$('.left-menu li a').each(function (index) {
				if(typeof($(this).find( "img" ).attr('src')) != 'undefined'){
					var src = $(this).find( "img" ).attr('src');			
					src = src.split('/');				
				}		
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );				
					$(this).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
					if(typeof($(this).find( "img" ).attr('src')) != 'undefined'){	
						if(src[2] == 'active.png')
							$(this).find( "img" ).attr('src', onlineBg);
						else if(src[2] == 'inactive.png')	
							$(this).find( "img" ).attr('src', offlineBg);
					}
				}else{
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
					if(typeof($(this).find( "img" ).attr('src')) != 'undefined'){
						if(src[2] == 'activeOnline.png')
							$(this).find( "img" ).attr('src', online);	
						else if(src[2] == 'activeOffline.png')
							$(this).find( "img" ).attr('src', offline);	
							
					}	
				}	
			}); 			
		}else{
			$('.left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
				if(typeof($(this).find( "img" ).attr('src')) != 'undefined'){
					var src = $(this).find( "img" ).attr('src');
					src = src.split('/');
					if(src[2] == 'active.png' || src[2] == 'activeOnline.png')
						$(this).find( "img" ).attr('src', online);	
					else if(src[2] == 'inactive.png' || src[2] == 'activeOffline.png')
						$(this).find( "img" ).attr('src', offline);						
				}	
			});				
		}
	}

	function defaulAlertBox(opt,title,message,optConfirm){

		switch(opt){
			case 'alert':
				$.box_Dialog(message, {
					'type':     'question',
					'title':    '<span class="color-gold">'+title+'<span>',
					'center_buttons': true,
					'show_close_button':false,
					'overlay_close':false,
					'buttons':  [{caption: 'okay'}]
				});		
			break;
			case 'confirm':
				$.box_Dialog(message, {
					'type':     'question',
					'title':    '<span class="color-gold">'+title+'<span>',
					'center_buttons': true,
					'show_close_button':false,
					'overlay_close':false,
					'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
						var id = locId.split('|');
						switch(optConfirm){
							case 1: //delete place
								setData({opt:'delLoc',placeId:id[0]});
							break;
							case 2: //set to online the location*/
								setData({opt:'onLoc',placeId:id[0]});
							break;
							case 3: //set to offline the location
								//alert(id[0])
								setData({opt:'offLoc',placeId:id[0]});
							break;
							case 4: //request to add more subscription
								curClick=0;
								$( ":mobile-pagecontainer" ).pagecontainer( "change", "plan.html",{ transition: "flip" });
							break;							
						}
					}}]
				});
			break;		
			case 'login':
				$.box_Dialog('<input type="password" name="pwd" id="pwd" value="" placeholder="password" />', {
					'type':     'question',
					'title':    '<span class="color-gold">please confirm<span>',
					'center_buttons': false,
					'show_close_button':false,
					'overlay_close':false,
					'buttons':  [
									{caption: 'yes', callback: function() { alert($("#pwd").val())}},
									{caption: 'no', callback: function() { alert('"No" was clicked')}},
									{caption: 'pro plus', callback: function() { alert('"No" was clicked')}}
								]
				});
			break;
		}
	}	
	
});


	$(document).on('pageshow','#dashboard', function() {
	   if(viewOnce > 0)
			DashMenu();
		showHideMenu2(curClick);
		defaultMenu2();
		//var height = ($( window ).height() / 16) - 5;
		//$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );	
		$('.right-menu').on('click', ' > li', function () {
		   curClick = $(this).index();
		});

		$( window ).resize(function() { // when window resize
			if($( window ).width() > 600){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).show();
				$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
				$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
			}else{
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}
		defaultMenu2();
		});
		
		$("#dashboard img.logo").click(function (){  //logo click
			if($( window ).width() <= 600){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}
		});	
		
		function showHideMenu2(row){
			curClick = row;
			if($( window ).width() <= 600){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}
			$('.right-menu-help').hide();$('.right-menu-admin').hide();$('.right-menu-send').hide();$('.right-menu-plan').hide();$('.right-menu-loc').hide();$('.star').hide();
			if(row == 0){
				$('.right-menu-help').show();
			}else if(row == 1){
				$('.right-menu-admin').show();
			}else if(row == 2){
				$('.right-menu-send').show();
			}else if(row == 3){
				$('.right-menu-plan').show();
			}else if(row > 3){
				$('.star').show();
				placeId= locId;
				$('.right-menu-loc').show();
			}
		}
	
		function defaultMenu2(){
			var height = ($( window ).height() / 16) - 5;
			$( '.ui-content,.left-content' ).css( {"min-height":height.toFixed() + 'em'} );

			if($( window ).width() > 600){
				$('.left-menu li a').each(function (index) {
					if(typeof($(this).find( "img" ).attr('src')) != 'undefined'){
						var src = $(this).find( "img" ).attr('src');
						src = src.split('/');					
					}		
					if(index == curClick){
						var str  = $( this ).text();
						$( ".right-header" ).html( str );				
						$(this).addClass('ui-btn-active'); 
						$(this).find( "span" ).addClass("listview-arrow-active");
						if(typeof($(this).find( "img" ).attr('src')) != 'undefined'){		
							if(src[2] == 'active.png')
								$(this).find( "img" ).attr('src', onlineBg);
							else if(src[2] == 'inactive.png')	
								$(this).find( "img" ).attr('src', offlineBg);
						}
					}else{
						$(this).removeClass("ui-btn-active");
						$(this).find( "span" ).removeClass("listview-arrow-active");
						if(typeof($(this).find( "img" ).attr('src')) != 'undefined'){
							if(src[2] == 'activeOnline.png')
								$(this).find( "img" ).attr('src', online);	
							else if(src[2] == 'activeOffline.png')
								$(this).find( "img" ).attr('src', offline);	
								
						}	
					}	
				}); 			
			}else{
				$('.left-menu li a').each(function (index) {
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
					if(typeof($(this).find( "img" ).attr('src')) != 'undefined'){
						var src = $(this).find( "img" ).attr('src');
						src = src.split('/');
						if(src[2] == 'active.png' || src[2] == 'activeOnline.png')
							$(this).find( "img" ).attr('src', online);	
						else if(src[2] == 'inactive.png' || src[2] == 'activeOffline.png')
							$(this).find( "img" ).attr('src', offline);						
					}	
				});				
			}
		}		

		
		
	});

	$(document).on('pageshow','#setup', function () {

		$("#setup-logo").click(function (){  //logo click
			if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
				curClick = setupclickmenu;defaultSetup=0;
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ transition: "flip",reloadPage:false });	
			}
		});		
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
		curClick = defaultSetup;
		showHideMenuSetup(curClick);
		defaultMenuSetup();	
		$( ".right-header" ).html( placename );	
		if($( window ).width() <= 600){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
				$('.setup-left-menu li a').each(function (index) {
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				});		
		}	
		
		$('.setup-left-menu').on('click', ' > li', function () {
			   curClick = $(this).index();
					   
				showHideMenuSetup(curClick);		
				defaultMenuSetup();	
				if($( window ).width() > 600){
					$(this).find( "a" ).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$('.setup-left-menu li a').each(function (index) {
						$(this).removeClass("ui-btn-active");
						$(this).find( "span" ).removeClass("listview-arrow-active");
					});
					$( '.main-wrap .right-content' ).show();
					$( '.main-wrap .left-content' ).hide();
					$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
				}	
			});	
			$('.right-menu').on('click', ' > li', function () {
			   curClick = $(this).index();
			   
		});

		function defaultMenuSetup(){
			if($( window ).width() > 600){
				$('#setup .setup-left-menu li').each(function (index) {
					if(index == curClick){
						$(this).find( "a" ).addClass('ui-btn-active'); 
						$(this).find( "span" ).addClass("listview-arrow-active");
					}else{
						$(this).find( "a" ).removeClass('ui-btn-active'); 
						$(this).find( "span" ).removeClass("listview-arrow-active");				
					}
				});	
			}else{
				$('#setup .setup-left-menu li a').each(function (index) {
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				});				
			}	
		}
	
		function showHideMenuSetup(row){
			curClick = row;
			$('.panel-question').hide();$('.panel-post').hide();$('.panel-profile').hide();$('.panel-UIC').hide();
			$( '#setup .right-content' ).removeClass("right-bgblue bgwhite");
			if(row < 2)
				 $( '#setup .right-content' ).addClass("right-bgblue");
			else
				$( '#setup .right-content' ).addClass("bgwhite");
			if(row == 0){
				$('.panel-profile').show();
			}else if(row == 1){
				$('.panel-UIC').show();
			}else if(row == 2){
				$('.panel-question').show();
			}else if(row == 3){
				$('.panel-post').show();
			}
			
		}
		
		$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
			if($( window ).width() > 600){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).show();		
				$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
				$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
			}else{
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}	
			defaultMenuSetup();
		});
	
	});

	$(document).on('pagecreate','#profile', function () {
		$('#frmfb').find('div').removeClass('ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset');
		$('#frmfb').find('div').css({height:'1px'});
		$('#frmweb').find('div').removeClass('ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset');
		$('#frmweb').find('div').css({height:'1px'});	
		var places = locId.split('|');
		$('#placeidweb').val(places[0]);
		$('#placeidfb').val(places[0]);
		if(customArray.fbImg != ''){
			$('#fbthumb').attr('src', customArray.fbImg);
			$('#frmfb').css({display:'none'});	
		}if(customArray.webImg != ''){
			$('#webthumb1').attr('src', customArray.webImg);
		}if(customArray.webImg2 != ''){
			$('#webthumb2').attr('src', customArray.webImg2);
		}if(customArray.webImg3 != ''){
			$('#webthumb3').attr('src', customArray.webImg3);
		}if(customArray.webImg4 != ''){
			$('#webthumb4').attr('src', customArray.webImg4);
		}if(customArray.webImg5 != ''){
			$('#webthumb5').attr('src', customArray.webImg5);
		}if(customArray.webImg6 != ''){
			$('#webthumb6').attr('src', customArray.webImg6);
		}if(customArray.webImg7 != ''){
			$('#webthumb7').attr('src', customArray.webImg7);
		}if(customArray.webImg8 != ''){
			$('#webthumb8').attr('src', customArray.webImg8);
		}
		if(customArray.webImg8 != '' && customArray.webImg7 != '' && customArray.webImg6 != '' && customArray.webImg5 != '' && customArray.webImg4 != '' && customArray.webImg3 != '' && customArray.webImg2 != '' && customArray.webImg != '')
			$('#frmweb').css({display:'none'});		
	})	
	
	$(document).on('pageshow','#profile', function () { // Profile script start here
		var noPhoto = 'images/template/no-photo.gif';
		$('#select-profile-button').removeClass('ui-corner-all ui-shadow');
		$( ".right-header" ).html( placename );	
		var places = locId.split('|');
		defaultMenuProfile();
		showHideMenuProfile(curClick);
		$('.jqte-test').jqte({remove: false,source: false}); //create textarea
		
		$("#fbthumb").click(function (){  
			$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
					$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=1',success:function(lastId){
						if(lastId > 0){
							customArray.fbImg = '';$('#frmfb').css({display:'inline'});	
							$('#fbthumb').attr('src', noPhoto);
						}else
							alertBoxProfile('error detected','Please try again');
					}});
				}}]
			});				
		});	
		$("#webthumb1").click(function (){
			$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
					$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=2',success:function(lastId){
						if(lastId > 0){
							customArray.fbImg = '';customArray.fbImg = '';$('#frmweb').css({display:'inline'});
							$('#webthumb1').attr('src', noPhoto);
						}else
							alertBoxProfile('error detected','Please try again');
					}});
				}}]
			});
		});	
		$("#webthumb2").click(function (){
			$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
					$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=3',success:function(lastId){
						if(lastId > 0){
							customArray.fbImg = '';$('#frmweb').css({display:'inline'});
							$('#webthumb2').attr('src', noPhoto);
						}else
							alertBoxProfile('error detected','Please try again');
					}});
				}}]
			});		
		});	
		$("#webthumb3").click(function (){
			$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
					$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=4',success:function(lastId){
						if(lastId > 0){
							customArray.fbImg = '';$('#frmweb').css({display:'inline'});
							$('#webthumb3').attr('src', noPhoto);
						}else
							alertBoxProfile('error detected','Please try again');
					}});
				}}]
			});;			
		});	
		$("#webthumb4").click(function (){ 
			$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
					$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=5',success:function(lastId){
						if(lastId > 0){
							customArray.fbImg = '';$('#frmweb').css({display:'inline'});
							$('#webthumb4').attr('src', noPhoto);
						}else
							alertBoxProfile('error detected','Please try again');
					}});
				}}]
			});			
		});	
		$("#webthumb5").click(function (){  
			$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
					$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=6',success:function(lastId){
						if(lastId > 0){
							customArray.fbImg = '';$('#frmweb').css({display:'inline'});
							$('#webthumb5').attr('src', noPhoto);
						}else
							alertBoxProfile('error detected','Please try again');
					}});
				}}]
			});	
		});	
		$("#webthumb6").click(function (){
			$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
					$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=7',success:function(lastId){
						if(lastId > 0){
							customArray.fbImg = '';$('#frmweb').css({display:'inline'});
							$('#webthumb6').attr('src', noPhoto);
						}else
							alertBoxProfile('error detected','Please try again');
					}});
				}}]
			});			
		});	
		$("#webthumb7").click(function (){ 
			$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
					$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=8',success:function(lastId){
						if(lastId > 0){
							customArray.fbImg = '';$('#frmweb').css({display:'inline'});
							$('#webthumb7').attr('src', noPhoto);
						}else
							alertBoxProfile('error detected','Please try again');
					}});
				}}]
			});		
		});
		$("#webthumb8").click(function (){ 
			$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
					$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=9',success:function(lastId){
						if(lastId > 0){
							customArray.fbImg = '';$('#frmweb').css({display:'inline'});
							$('#webthumb8').attr('src', noPhoto);
						}else
							alertBoxProfile('error detected','Please try again');
					}});
				}}]
			});		
		});			
		$('.profile-left-menu').on('click', ' > li', function () {
			curClick = $(this).index();
			showHideMenuProfile(curClick);
			defaultMenuProfile();	   
		});	
		
		$("#profile img.logo").click(function (){  //logo click
			if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
				curClick=0;defaultSetup=0;
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "setup.html",{ transition: "flip" });
			}
		});	
		
		function defaultMenuProfile(){
			var height = ($( window ).height() / 16) - 5;
			$( '.ui-content,.left-content,.right-content' ).css( {"min-height":height.toFixed() + 'em'} );
			if($( window ).width() > 600){
				$('.profile-left-menu li a').each(function (index) {
					if(index == curClick){
						$(this).addClass('ui-btn-active'); 
						$(this).find( "span" ).addClass("listview-arrow-active");
					}else{
						$(this).removeClass("ui-btn-active");
						$(this).find( "span" ).removeClass("listview-arrow-active");
					}	
				}); 			
			}else{
				$('.profile-left-menu li a').each(function (index) {
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				});				
			}
		}
		
		function showHideMenuProfile(row){
			curClick = row;
			if($( window ).width() <= 600){
				$( '.main-wrap .left-content' ).hide();
				$( '.main-wrap .right-content' ).show();
				$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
			}
			$('.pro-section').hide();$('.desc-section').hide();$('.open-section').hide();$('.photo-section').hide();$('.map-section').hide();
			if(row == 0){
				
				$('.pro-section').show();
			}else if(row == 1){
				$('.desc-section').show();
			}else if(row == 2){
				$('.open-section').show();
			}else if(row == 3){
				$('.photo-section').show();
			}else if(row == 4){
				$('.map-section').show();
			}
			
		}
		$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
			if($( window ).width() > 600){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).show();		
				$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
				$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
			}else{
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}	
			defaultMenuProfile();
		});

		function alertBoxProfile(title,message){
			
			$.box_Dialog(message, {
				'type':     'question',
				'title':    '<span class="color-gold">'+title+'<span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons':  [{caption: 'okay'}]
			});
		}	
		$('#upload').click(function(e){e.preventDefault();$('#filefb').click();});	
		$('#uploadweb').click(function(e){e.preventDefault();$('#fileweb').click();});
		
		$('#filefb').on('change',function(){
			$('<div id="overlay"> </div>').appendTo(document.body);
			$('#frmfb').ajaxSubmit({beforeSubmit:  beforeSubmitfb,success: showResponse,resetForm: true });
		});	
		$('#fileweb').on('change',function(){
			$('<div id="overlay"> </div>').appendTo(document.body);
			$('#frmweb').ajaxSubmit({beforeSubmit:  beforeSubmitweb,success: showResponse2,resetForm: true });
		});	
		
		function showResponse(responseText, statusText, xhr, $form)  { 
			$('#overlay').remove();
			$('#fbthumb').attr('src', responseText);
		}
		function showResponse2(responseText, statusText, xhr, $form)  { 
			if(customArray.webImg == ''){
				$('#webthumb1').attr('src', responseText);
				customArray.webImg = responseText;
			}else if(customArray.webImg2 == ''){
				$('#webthumb2').attr('src', responseText);
				customArray.webImg2 = responseText;
			}else if(customArray.webImg3 == ''){
				$('#webthumb3').attr('src', responseText);
				customArray.webImg3 = responseText;
			}else if(customArray.webImg4 == ''){
				$('#webthumb4').attr('src', responseText);
				customArray.webImg4 = responseText;
			}else if(customArray.webImg5 == ''){
				$('#webthumb5').attr('src', responseText);
				customArray.webImg5 = responseText;
			}else if(customArray.webImg6 == ''){
				$('#webthumb6').attr('src', responseText);
				customArray.webImg6 = responseText;
			}else if(customArray.webImg7 == ''){
				$('#webthumb7').attr('src', responseText);
				customArray.webImg7 = responseText;
			}else if(customArray.webImg8 == ''){
				$('#webthumb8').attr('src', responseText);
				customArray.webImg8 = responseText;
			}
			$('#overlay').remove();
		}		
		function bytesToSize(bytes) {
		   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		   if (bytes == 0) return '0 Bytes';
		   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
		}		
		function beforeSubmitweb(){
			//check whether client browser fully supports all File API // if (window.File && window.FileReader && window.FileList && window.Blob)
			if (window.File){
				   var fsize = $('#fileweb')[0].files[0].size; //get file size
				   var ftype = $('#fileweb')[0].files[0].type; // get file type
						   //Allowed file size is less than 5 MB (1000000 = 1 mb)
				   if(fsize>1000000){
						alertBoxProfile(bytesToSize(fsize)+' too big file!','ensure image file size is less than 1mb');
				   }else{
						switch(ftype){
							case 'image/png':
							case 'image/gif':
							case 'image/jpeg':
							case 'image/jpg':
							case 'image/bmp':
							case 'image/pjpeg':
							break;
							default: alertBoxProfile('unsupported file type','Please upload only gif, png, bmp, jpg, jpeg file types');	
							return false;
						}
				  }
			}else
			   alert("Please upgrade your browser, because your current browser lacks some new features we need!");	
		}		
		function beforeSubmitfb(){
			//check whether client browser fully supports all File API // if (window.File && window.FileReader && window.FileList && window.Blob)
			if (window.File){
				   var fsize = $('#filefb')[0].files[0].size; //get file size
				   var ftype = $('#filefb')[0].files[0].type; // get file type
						   //Allowed file size is less than 5 MB (1000000 = 1 mb)
				   if(fsize>1000000){
						alertBoxProfile(bytesToSize(fsize)+' too big file!','ensure image file size is less than 1mb');
				   }else{
						switch(ftype){
							case 'image/png':
							case 'image/gif':
							case 'image/jpeg':
							case 'image/jpg':
							case 'image/bmp':
							case 'image/pjpeg':
							break;
							default: alertBoxProfile('unsupported file type','Please upload only gif, png, bmp, jpg, jpeg file types');	
							return false;
						}
				  }
			}else
			   alert("Please upgrade your browser, because your current browser lacks some new features we need!");	
		}
		
	});

$(document).on('pageshow','#uic', function () { // UIC script start here
	$( ".right-header" ).html( placename );	
	defaultMenuUIC();
	 showHideMenuUIC(curClick)
	$('.uic-left-menu').on('click', ' > li', function () {
	    curClick = $(this).index();
		showHideMenuUIC(curClick);
		defaultMenuUIC();	
		if($( window ).width() > 600){
			$(this).find( "a" ).addClass('ui-btn-active'); 
			$(this).find( "span" ).addClass("listview-arrow-active");
		}else{
			$('.setup-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
		}		
	});	
	$("#uic img.logo").click(function (){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			curClick=1;defaultSetup=1;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "setup.html",{ transition: "flip" });
		}
	});	

	function defaultMenuUIC(){
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content' ).css( {"min-height":height.toFixed() + 'em'} );
		if($( window ).width() > 600){
			$('.uic-left-menu li a').each(function (index) {
				if(index == curClick){
					$(this).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				}	
			}); 			
		}else{
			$('.uic-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});				
		}
	}
	function showHideMenuUIC(row){
		curClick = row;
		if($( window ).width() <= 600){
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}
		$('.uic-section-logo').hide();$('.uic-section-img').hide();$('.uic-section-bg').hide();$('.uic-section-fc').hide();$('.uic-section-tbs').hide();$('.uic-section-tb').hide();$('.uic-section-box').hide();
		if(row == 0){
			$('.uic-section-logo').show();
		}else if(row == 1){
			$('.uic-section-img').show();
		}else if(row == 2){
			$('.uic-section-bg').show();
		}else if(row == 3){
			$('.uic-section-fc').show();
		}else if(row == 4){
			$('.uic-section-tbs').show();
		}else if(row == 5){
			$('.uic-section-tb').show();
		}else if(row == 6){
			$('.uic-section-box').show();
		}
	}
   	$( window ).resize(function() { // when window resize
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
		if($( window ).width() > 600){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).show();		
			$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
			$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
		}else{
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}	
		defaultMenuUIC();
	});
});

$(document).on('pageshow','#send-email', function () { // UIC script start here	
	leftMenu();
	rightMenu(curClick)
	$('.send-left-menu').on('click', ' > li', function () {
	    curClick = $(this).index();
		rightMenu(curClick);
		leftMenu();	
		if($( window ).width() > 600){
			$(this).find( "a" ).addClass('ui-btn-active'); 
			$(this).find( "span" ).addClass("listview-arrow-active");
		}else{
			$('.send-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
		}		
	});	
	$("img.logo").click(function (){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			curClick=2;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ transition: "flip" });
		}
	});	

	
	function leftMenu(){
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content' ).css( {"min-height":height.toFixed() + 'em'} );
		if($( window ).width() > 600){
			$('.send-left-menu li a').each(function (index) {
				if(index == curClick){
					$(this).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				}	
			}); 			
		}else{
			$('.send-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});				
		}
	}

	function rightMenu(row){
		curClick = row;
		if($( window ).width() <= 600){
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}
	}

	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
		if($( window ).width() > 600){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).show();		
			$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
			$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
		}else{
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}	
		leftMenu();
	});
});
$(document).on('pageshow','#statistic', function () {
	$( ".right-header" ).html( placename );		
	curClick = 0;
	showHideMenuStat(curClick);
	//defaultMenuStat();	
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );	
	if($( window ).width() <= 600){
		$( '.main-wrap .left-content' ).show();
		$( '.main-wrap .right-content' ).hide();
		$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			$('.stat-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});		
	}	
	$('.stat-left-menu').on('click', ' > li', function () {
	   curClick = $(this).index();		
		showHideMenuStat(curClick);		
		defaultMenuStat();	
		if($( window ).width() > 600){
			$(this).find( "a" ).addClass('ui-btn-active'); 
			$(this).find( "span" ).addClass("listview-arrow-active");
		}else{
			$('.stat-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
		}	
	});	
	$('.right-menu').on('click', ' > li', function () {
	   curClick = $(this).index();
	});

	$("#statistic img.logo").click(function (){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			curClick = setupclickmenu;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ transition: "flip" });	
		}
	});	

function defaultMenuStat(){
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
	if($( window ).width() > 600){
		$('#statistic .stat-left-menu li').each(function (index) {
			if(index == curClick){
				$(this).find( "a" ).addClass('ui-btn-active'); 
				$(this).find( "span" ).addClass("listview-arrow-active");
			}else{
				$(this).find( "a" ).removeClass('ui-btn-active'); 
				$(this).find( "span" ).removeClass("listview-arrow-active");				
			}
		});	
	}else{
		$('#statistic .stat-left-menu li a').each(function (index) {
			$(this).removeClass("ui-btn-active");
			$(this).find( "span" ).removeClass("listview-arrow-active");
        });				
	}	
}
function showHideMenuStat(row){
	curClick = row;
	$('.panel-today').hide();$('.panel-yesterday').hide();$('.panel-last7').hide();$('.panel-last14').hide();
	$('.panel-last21').hide();$('.panel-last30').hide();$('.panel-export').hide();
	if(row == 0){
		$('.panel-today').show();
	}else if(row == 1){
		$('.panel-yesterday').show();
	}else if(row == 2){
		$('.panel-last7').show();
	}else if(row == 3){
		$('.panel-last14').show();
	}else if(row == 4){
		$('.panel-last21').show();
	}else if(row == 5){
		$('.panel-last30').show();
	}else if(row == 6){
		$('.panel-export').show();
	}	
}
	
   	$( window ).resize(function() { // when window resize
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
		if($( window ).width() > 600){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).show();		
			$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
			$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
		}else{
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}	
		defaultMenuStat();
	});
});

$(document).on('pageshow','#plan', function () {
	
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
	showHideMenuPlan(curClick);
	defaultMenuPlan();
	$('.plan-left-menu').on('click', ' > li', function () {
	   curClick = $(this).index();		
		showHideMenuPlan(curClick);
		defaultMenuPlan();				
		if($( window ).width() > 600){
			$(this).find( "a" ).addClass('ui-btn-active'); 
			$(this).find( "span" ).addClass("listview-arrow-active");				
		}else{
			$('.plan-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
		}	
	});	
	$('.plan-right-menu').on('click', ' > li', function () {
	   curClick = $(this).index();
	});			
	$("#plan img.logo").click(function (){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			//window.location = 'index.html';
			curClick = 3;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ transition: "flip" });				
		}
	});	

	function defaultMenuPlan(){
		if($( window ).width() > 600){
			$('.plan-left-menu li a').each(function (index) {
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );				
					$(this).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				}
			});	
		}else{
			$('.plan-left-menu li a').each(function (index) {
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );	
				}			
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});				
		}	
	}
	function showHideMenuPlan(row){
		curClick = row;
		if($( window ).width() <= 600){
		    if(frmpagemanage > 0){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
				frmpagemanage=0;
			}else{
				$( '.main-wrap .left-content' ).hide();
				$( '.main-wrap .right-content' ).show();
				$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );				
			}
			$('.plan-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});				
		}
		$('.panel-sub-plan').hide();$('.panel-sub-location').hide();
		if(row == 0){
			$('.panel-sub-plan').show();
		}else if(row == 1){
			$('.panel-sub-location').show();		
		}
		
	}
	
   	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
		if($( window ).width() > 600){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).show();		
			$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
			$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
		}else{
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}	
		defaultMenuPlan();
	});
});
$(document).on('pageshow','#admin', function () {

	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		

	showHideMenuAdmin(curClick);
	defaultMenuAdmin();
	
	$('.admin-left-menu').on('click', ' > li', function () {
	   curClick = $(this).index();		
		showHideMenuAdmin(curClick);
		defaultMenuAdmin();				
		if($( window ).width() > 600){
			$(this).find( "a" ).addClass('ui-btn-active'); 
			$(this).find( "span" ).addClass("listview-arrow-active");				
		}else{
			$('.admin-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
		}	
	});	
	
	$('.admin-right-menu').on('click', ' > li', function () {
	   curClick = $(this).index();
	});		
	
	$("#admin img.logo").click(function (){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			//window.location = 'index.html';
			curClick=1;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ transition: "flip" });			
		}
	});	

	
	function defaultMenuAdmin(){
		if($( window ).width() > 600){
			$('.admin-left-menu li a').each(function (index) {
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );				
					$(this).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				}
			});	
		}else{
			$('.admin-left-menu li a').each(function (index) {
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );	
				}			
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});				
		}	
	}
	
	function showHideMenuAdmin(row){
		curClick = row;
		if($( window ).width() <= 600){
		    if(frmpagemanage > 0){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
				frmpagemanage=0;
			}else{
				$( '.main-wrap .left-content' ).hide();
				$( '.main-wrap .right-content' ).show();
				$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );				
			}
			$('.admin-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});				
		}
		$('.panel-new').hide();$('.panel-users').hide();$('.panel-pwd').hide();		
		if(row == 0){
			$( '#admin .right-content' ).addClass("bgwhite");
			$('.panel-new').show();
		}else if(row == 1){
			$( '#admin .right-content' ).addClass("right-bgblue");
			$('.panel-users').show();			
		}else if(row == 2){
			$( '#admin .right-content' ).addClass("bgwhite");
			$('.panel-pwd').show();
		}
		
	}
	
   	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
		if($( window ).width() > 600){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).show();		
			$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
			$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
		}else{
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}	
		defaultMenuAdmin();
	});
});

$(document).on('pageshow','#manage', function () { // Profile script start here
	//$( ".right-header" ).html( locArray.businessName );	
	defaultMenuManage();
	showHideMenuManage(curClick);
	$('.manage-left-menu').on('click', ' > li', function () {
	    curClick = $(this).index();
		showHideMenuManage(curClick);
		defaultMenuManage();	   
	});	
	
	$("#manage img.logo").click(function (){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			defaultMenuManage();
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			curClick=1;frmpagemanage=1;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "admin.html",{ transition: "flip" });
		}
	});	

	function defaultMenuManage(){
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content' ).css( {"min-height":height.toFixed() + 'em'} );
		if($( window ).width() > 600){
			$('.manage-left-menu li a').each(function (index) {
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );				
					$(this).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
					var alt = $(this).find( "img" ).attr('alt');
					if(alt == "iconOwner")
						$(this).find( "img" ).attr('src', 'images/template/iconOwnerActive.png');
					else if(alt == "iconAdmin")
						$(this).find( "img" ).attr('src', 'images/template/iconAdminActive.png');
					else if(alt == "iconUser")
						$(this).find( "img" ).attr('src', 'images/template/iconUserActive.png');					
				}else{
					var alt = $(this).find( "img" ).attr('alt');
					if(alt == "iconOwner")
						$(this).find( "img" ).attr('src', 'images/template/iconOwner.png');
					else if(alt == "iconAdmin")
						$(this).find( "img" ).attr('src', 'images/template/iconAdmin.png');
					else if(alt == "iconUser")
						$(this).find( "img" ).attr('src', 'images/template/iconUser.png');				
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				}	
			}); 			
		}else{	
			$('.manage-left-menu li a').each(function (index) {
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );	
				}	
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");			
				var alt = $(this).find( "img" ).attr('alt');
				if(alt == "iconOwner")
					$(this).find( "img" ).attr('src', 'images/template/iconOwner.png');
				else if(alt == "iconAdmin")
					$(this).find( "img" ).attr('src', 'images/template/iconAdmin.png');
				else if(alt == "iconUser")
					$(this).find( "img" ).attr('src', 'images/template/iconUser.png');				
			});				
		}
	}
	function showHideMenuManage(row){
		curClick = row;
		if($( window ).width() <= 600){
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}
		$('.panel-new').hide();$('.panel-users').hide();$('.panel-pwd').hide();
		if(row == 0){
			$('.panel-new').show();
		}else if(row == 1){
			$('.panel-users').show();				
		}else if(row == 2){
			$('.panel-pwd').show();
		}
		
	}
   	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
		if($( window ).width() > 600){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).show();		
			$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
			$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
		}else{
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}	
		defaultMenuManage();
	});
});	