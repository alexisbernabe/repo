var curClick=0,locId=0,frmpagemanage=0,setupclickmenu=0,defaultSetup=0,noPhoto = 'images/template/no-photo.gif';
var locArray=[],userArray=[],customArray=[],viewOnce=0,geocoder,lat=0,lng=0;
var locDefault = '',placeId=0,placename='',keyId=0,loader='',activeLocLength=1;
var online ='images/template/active.png',onlineBg='images/template/activeOnline.png',offline ='images/template/inactive.png',offlineBg='images/template/activeOffline.png';
var trialID = 3356303,trialID30 = 3356318,basicID=3356305,proID=3356306,proplus=3356316,everFree = 3356308,liteBuddy = 3356309,liteBuzz = 3356310,liteStudio = 3356312,liteMetro = 3356313,t=0; //life mode
var creditsFree=0,creditsBasic = 1500, creditsPro = 5000, creditsProplus = 50000;

$(document).ready(function(){
	// geocoder = new google.maps.Geocoder();
	showLoader();
	showHideMenu(curClick);
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
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "statistic.html",{ transition: "flip" });
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
				customArray=[];
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
		}
	}	
});

function logout(){
	$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'cancel'},{caption: 'logout', callback: function() {
		$.ajax({url:"getData.php",cache: false,data:'opt=logout',success:function(result){
			window.location = 'index.php'
		}});		
	}}]
	});
}

	$(document).on('pageshow','#dashboard', function() {
		$('.iconlogout').click(function(){
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'cancel'},{caption: 'logout', callback: function() {
				$.ajax({url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					window.location = 'index.php'
				}});		
			}}]
			});
		});
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
	function rand_nicename(limit)
	{
		var text = "";
		var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < limit; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
	
	$(document).on('pagecreate','#setup', function () {
		$('.panel-question').find('div').removeClass('ui-shadow-inset');
		//checkboxQuestion();
	});
	
	var rateName=[],tagName=[],noAswer=0;
   function checkboxQuestion(){
		
		var checkbox='',allcheckbox='';
		rateName=[],tagName=[];
		if(customArray.item2Rate != ''){
			var item2rate = $.parseJSON(customArray.item2Rate);
			if(typeof(item2rate.rows) != 'undefined'){
				for(var i in item2rate.rows){
					rateName.push(item2rate.rows[i].data);
				}
			}else
				rateName =item2rate;
		}
		if(customArray.selectedItems != ''){
			var selectedItems = $.parseJSON(customArray.selectedItems);	
			if(typeof(selectedItems.rows) != 'undefined'){
				for(var i in selectedItems.rows){
					tagName.push(selectedItems.rows[i].data);
				}
			}else
				tagName = selectedItems;	
		}			
		var off = $("select#flipsetting"); //set selected flipswitch
		off[0].selectedIndex = customArray.settingsItem;
		off.flipswitch("refresh");		
		 for(var i in rateName){
			var name = rateName[i].split('_');
			checkbox ='<div class="ui-checkbox">'
				+'<label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off ui-first-child ui-last-child" for="checkbox-'+i+'">'+name[0]+' ('+name[1]+')<span class="delRate ui-li-count"><img src="images/template/areasIconDel2.png"  alt="'+name[1]+'"></span></label>'
				+'<input id="checkbox-'+i+'" '+(customArray.settingsItem > 0 ? 'disabled=""' : '')+' type="checkbox" value="'+name[1]+'" name="checkbox-'+i+'">'
				+'</div>';
		   allcheckbox = allcheckbox + checkbox;		   
		}
		allcheckbox = '<div class="ui-controlgroup-controls">'+allcheckbox + '</div>'; 
		$('#ratetext').html(allcheckbox);		
		//$("[type=checkbox]").attr("checked",true).checkboxradio();
		for(var j in tagName){
			var seclted = tagName[j];
			for(var i in rateName){
				name = rateName[i].split('_');
				if(name[1] == seclted){
					$("input[id=checkbox-"+i+"]").attr("checked",true).checkboxradio();
				}
			}
		} 	
		$(".delRate").click(function () {  // create new rating 
			var alt = $(this).find( "img" ).attr('alt');
			checkboxQuestion();
			removeName(alt);
		});	
	
		$("input[type='checkbox']").on('click',function(index){
			//alert($(this).attr("value") +' '+$(this).is(':checked'))
			var newText=[];
			 $("input[type='checkbox']").each(function(index){
				if($(this).is(':checked')){
					newText.push($(this).val());
				}	
			 });
			// if(newText.length > 0){
				$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=8&check='+newText,success:function(lastId){
					customArray.selectedItems = lastId;
					checkboxQuestion();
				}});
			//}			
		 })	 
		$("input[type=checkbox]").checkboxradio();
		$("[data-role=controlgroup]").controlgroup("refresh");
		
   }
   
  	function removeName(alt){
		$.box_Dialog('Delete this entry?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
			var newText=[];
			for(var i in rateName){
				var name = rateName[i].split('_');
					if(name[1] != alt)
						newText.push(rateName[i]);
					
			}
			if(rateName.length < 1){
				tagName=[];
				$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=8&check='+tagName,success:function(lastId){
					customArray.selectedItems = lastId;
					checkboxQuestion();
				}});				
			}	
				$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=9&check='+newText,success:function(lastId){
					customArray.item2Rate = lastId;
					checkboxQuestion();
				}});
			}}]
		});	
	} 	
	function alertBox(title,message){
		$.box_Dialog(message, {
			'type':     'question',
			'title':    '<span class="color-gold">'+title+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: 'okay'}]
		});	
    }
	
	$(document).on('pageshow','#setup', function () {
		$('.iconsetup').click(function(){
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'cancel'},{caption: 'logout', callback: function() {
				$.ajax({url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					window.location = 'index.php'
				}});		
			}}]
			});		
		});
       checkboxQuestion();
		places = locId.split('|');
		$('.star').show();
		if(customArray.reviewPost != ''){
			var reviewPost = $.parseJSON(customArray.reviewPost);
			$('#sharefb input[value="'+reviewPost.posted+'"]').attr('checked',true).checkboxradio('refresh');	
			$('#sharelimit input[value="'+reviewPost.percent+'"]').attr('checked',true).checkboxradio('refresh');
		}else{
			$('#sharefb input[value="1"]').attr('checked',true).checkboxradio('refresh');	
			$('#sharelimit input[value="3.0"]').attr('checked',true).checkboxradio('refresh');			
		}
        $('#submit-postfb').click(function () {
			$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=10&posted='+$("#sharefb :radio:checked").val()+'&percent='+$("#sharelimit :radio:checked").val(),success:function(lastId){
				customArray.reviewPost = lastId;
				alertBox('update','successfully updated');
			}});
		});
		
		$('#flipsetting').on('change',function(){ // save whin flipswitch
			var user = userArray;
		    if(noAswer > 0)
				noAswer=0;
			else if(rateName.length < 1){
				noAswer = 1;
				var off = $("select#flipsetting");off[0].selectedIndex = 0;off.flipswitch("refresh");
				alertBox('question(s) setup incomplete','Please complete Setup > What Questions to Ask');
				
			}else if(tagName.length < 1){
				noAswer = 1;
				var off = $("select#flipsetting");off[0].selectedIndex = 0;off.flipswitch("refresh");			
				alertBox('please select questions','You may check up to a maximum of seven questions');
			}else if($('#flipsetting').val() > 0){
					$.box_Dialog('All data rating for this location will be deleted.', {'type':'confirm','title': '<span class="color-gold">warning!<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [
					{caption: 'no',callback:function(){ 
					    noAswer = 1;
						var off = $("select#flipsetting");off[0].selectedIndex = 1;off.flipswitch("refresh");
					}},
					{caption: 'yes', callback: function() {
							customArray.settingsItem = 0;
							 checkboxQuestion();
							$('<div id="overlay"> </div>').appendTo(document.body);
							$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=createTable&case=0&set=0',success:function(lastId){
								$("#overlay").remove();
							}});
						}}]
					});
			}else if($('#flipsetting').val() < 1){
				customArray.settingsItem = 1;
				checkboxQuestion();
				$('<div id="overlay"> </div>').appendTo(document.body);
				$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=createTable&case=1&set=1',success:function(lastId){
					$("#overlay").remove();
				}});
			}
		});		   
	   
		$(".addnew-rate li a").click(function () {  // create new rating 
			if(customArray.settingsItem > 0)
				alertBox('settings locked','Please switch off the settings');
			else{
				$('.addnew-rate').hide();
				$('.text-rate').show();
				$('#txtrate').focus();
			}
		});	

		
		$( ".text-rate .ui-input-text input" ).blur(function() { // input new rate blur
			if($('#txtrate').val() == ''){
				$('.addnew-rate').show();
				$('.text-rate').hide();
			}
		});	
		function showtag(){
				$('#tagname').focus();
				
				$.box_Dialog('<input type="text" name="tagname" id="tagname" value="" placeholder="your tag..." /><p>For example, if your question is about service, please use “Service” as your tag.</p>', {'type':'confirm','title': '<span class="color-gold">Add a tag for your question…<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'submit', callback: function() {	
						if($("#tagname").val() == ''){
						setTimeout(function() {
								$.box_Dialog('Please enter your Tag', {
									'type':     'question',
									'title':    '<span class="color-gold">tag name empty<span>',
									'center_buttons': true,
									'show_close_button':false,
									'overlay_close':false,
									'buttons':  [{caption: 'okay',callback:function(){setTimeout(function() {showtag();},400);}}]
								});
						}, 300);
						}else{
							var name = $("#txtrate").val() +'_'+$("#tagname").val();
							rateName.push(name);
							$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=9&check='+rateName,success:function(lastId){
								customArray.item2Rate = lastId;
								$("#txtrate").val('');
								checkboxQuestion();
							}});							
						}
					}}]
				});			
		}
		$( "#txtrate" ).keypress(function(e) { // get the new rate text
			if(e.which == 13){
				if($("#txtrate").val() != ''){
					$( "#tagname" ).keypress(function(e) {
						alert('sdf');
					})
					showtag();
				}									
			}	
		});
				
		function createPage1(){
			places = locId.split('|');
			var nicename = rand_nicename(7);
			$('<div id="overlay"> </div>').appendTo(document.body);
			$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=nicename&nicename='+nicename,success:function(lastId){
				$("#overlay").remove();
				customArray.nicename=nicename;
				//window.open('http://www.tabluu.com/'+nicename+'.html');
				createProfileMenu1();
			}});		
		}

	function createProfileMenu1(){
		var j=0;
		if(customArray.city != ''){
			$('#txtcity').val(customArray.city);
		}		
		if(customArray.fbImg != '')
			j++;	
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
		if(customArray.city != '' && j > 2){
			var addli='';
			if(customArray.nicename == "")
				addli = '<li ><a href="#" id="create-page" data-transition="flip" data-prefetch="true">Create Business Web Page<span class="listview-arrow-default"></span></a></li>';
			else
				addli = '<li ><a href="http://www.tabluu.com/'+customArray.nicename+'.html" target="_blank" data-transition="flip" data-prefetch="true">Visit Your Tabluu Page<span class="listview-arrow-default"></span></a></li>';
				var newli = '<ul class="profile-left-menu1" id="setup-profile-menu" data-role="listview"><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Description<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Opening Hours<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Photos<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Map Display<span class="listview-arrow-default"></span></a></li>'+addli+'</ul>';			
		}else{
				var newli = '<ul class="profile-left-menu1" id="setup-profile-menu" data-role="listview"><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Description<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Opening Hours<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Photos<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Map Display<span class="listview-arrow-default"></span></a></li></ul>';			
		}
			$('.profile-left-menu1').html(newli);
			$('.profile-left-menu1').on('click', ' > li', function () {
				curClick = $(this).index();
			});
			$(".profile-left-menu1").listview();
	}	
		$('.right-menu').on('click', ' > li', function () {
			curClick = $(this).index();
		});
		$("#setup-logo").click(function (){  //logo click
			if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
				curClick = setupclickmenu;defaultSetup=0;
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ transition: "flip" });	
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

		$("#create-page").click(function () {  // listview when tried to add new location
			createPage1();
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
				createProfileMenu1();
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
		$('.star').show();
		$('#frmfb').find('div').removeClass('ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset');
		$('#frmfb').find('div').css({height:'1px'});
		$('#frmweb').find('div').removeClass('ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset');
		$('.map-section ').find('div').removeClass('ui-shadow-inset');		
		$('#frmweb').find('div').css({height:'1px'});
	})	
	
	$(document).on('pageshow','#profile', function () { // Profile script start here
		$('.iconpro').click(function(){
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'cancel'},{caption: 'logout', callback: function() {
				$.ajax({url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					window.location = 'index.php'
				}});		
			}}]
			});		
		});
		var places = locId.split('|'),n=0;
		$('#select-category').removeClass('ui-corner-all ui-shadow');
		$( ".right-header" ).html( placename );	
		createProfileMenu2();
		$('#placeidweb').val(places[0]);
		$('#placeidfb').val(places[0]);
		// setting up values
		$('#fbthumb').attr('src', noPhoto);$('#webthumb1').attr('src', noPhoto);$('#webthumb2').attr('src', noPhoto);$('#webthumb3').attr('src', noPhoto);$('#webthumb4').attr('src', noPhoto);$('#webthumb5').attr('src', noPhoto);$('#webthumb6').attr('src', noPhoto);$('#webthumb7').attr('src', noPhoto);$('#webthumb8').attr('src', noPhoto);$('#txtname').val('');$('#txtadd').val('');$('#txtcity').val('');$('#txtcountry').val('');$('#txtzip').val('');$('#txtpho').val('');$('#txtfb').val('');$('#txtweb').val('');
		if(customArray.category === 'Accomodation') n=1;
		else if(customArray.category == 'Arts & Entertainment') n=2;
		else if(customArray.category == 'Auto Sales, Rental & Repair') n=3;
		else if(customArray.category == 'Beauty') n=4;
		else if(customArray.category === 'Child Care') n=5;
		else if(customArray.category === 'Health & Fitness') n=6;
		else if(customArray.category === 'Home Services') n=7;
		else if(customArray.category === 'Massage') n=8;
		else if(customArray.category === 'Personal Training') n=9;
		else if(customArray.category === 'Photography') n=10;
		else if(customArray.category === 'Real Estate') n=11;
		else if(customArray.category === 'Restaurant, Cafe & Food and Beverage') n=12;
		else if(customArray.category === 'Travel') n=13;
		else if(customArray.category === 'Wedding Planning') n=14;    
		else if(customArray.category === 'Others') n=15;
		var cat = $("#select-category"); //set selected
		cat[0].selectedIndex = n;
		cat.selectmenu("refresh");	
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
		if(customArray.businessName != ''){
			$('#txtname').val(customArray.businessName);	
		}if(customArray.address != ''){
			$('#txtadd').val(customArray.address);
		}if(customArray.city != ''){
			$('#txtcity').val(customArray.city);
		}if(customArray.country != ''){
			$('#txtcountry').val(customArray.country);
		}if(customArray.zip != ''){
			$('#txtzip').val(customArray.zip);
		}if(customArray.contactNo != ''){
			$('#txtpho').val(customArray.contactNo);
		}if(customArray.facebookURL != ''){
			$('#txtfb').val(customArray.facebookURL);
		}if(customArray.websiteURL != ''){
			$('#txtweb').val(customArray.websiteURL);
		}		
		if(customArray.webImg8 != '' && customArray.webImg7 != '' && customArray.webImg6 != '' && customArray.webImg5 != '' && customArray.webImg4 != '' && customArray.webImg3 != '' && customArray.webImg2 != '' && customArray.webImg != '')
			$('#frmweb').css({display:'none'});		
		var mapoff = $("select#flipmap"); //set selected flipswitch
		mapoff[0].selectedIndex = customArray.showmap;
		mapoff.flipswitch("refresh");	
		// end of setting up value	
	function createPage2(){
		places = locId.split('|');
		var nicename = rand_nicename(7);
		$('<div id="overlay"> </div>').appendTo(document.body);
		
		$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=nicename&nicename='+nicename,success:function(lastId){
			$("#overlay").remove();
			customArray.nicename=nicename;
			//window.open('http://www.tabluu.com/'+nicename+'.html');
			createProfileMenu2();
		}});		
	}

	function createProfileMenu2(){
		var j=0;
		if(customArray.city != ''){
			$('#txtcity').val(customArray.city);
		}		
		if(customArray.fbImg != '')
			j++;	
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
		if(customArray.city != '' && j > 2){
			var addli='';
			if(customArray.nicename == "")
				addli = '<li ><a href="#" id="create-page2" data-transition="flip" data-prefetch="true">Create Business Web Page<span class="listview-arrow-default"></span></a></li>';
			else
				addli = '<li ><a href="http://www.tabluu.com/'+customArray.nicename+'.html" target="_blank" data-transition="flip" data-prefetch="true">Visit Your Tabluu Page<span class="listview-arrow-default"></span></a></li>';
				var newli = '<ul class="profile-left-menu2" id="setup-profile-menu" data-role="listview"><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Description<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Opening Hours<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Photos<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Map Display<span class="listview-arrow-default"></span></a></li>'+addli+'</ul>';			
		}else{
				var newli = '<ul class="profile-left-menu2" id="setup-profile-menu" data-role="listview"><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Description<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Opening Hours<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Photos<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-transition="flip" data-prefetch="true">Map Display<span class="listview-arrow-default"></span></a></li></ul>';			
		}
			$('.profile-left-menu2').html(newli);
			$('.profile-left-menu2').on('click', ' > li', function () {
				if($(this).index() < 5){
					curClick = $(this).index();
					showHideMenuProfile(curClick);
					defaultMenuProfile();
				}
			});			
			$(".profile-left-menu2").listview();
		defaultMenuProfile();
		showHideMenuProfile(curClick);			
	}			
		$("#create-page2").click(function () {  // listview when tried to add new location
			createPage2();
		});	
		$("#fbthumb").click(function (){
			if(customArray.fbImg != ''){
				$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no',callback:function(){showHideMenuProfile(curClick);}},{caption: 'yes', callback: function() {
						$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=1',success:function(lastId){
							if(lastId > 0){
								customArray.fbImg = '';$('#frmfb').css({display:'inline'});	
								$('#fbthumb').attr('src', noPhoto);
							}else
								alertBoxProfile('error detected','Please try again');
						}});
					}}]
				});	
			}	
		});	
		$("#webthumb1").click(function (){
			if(customArray.webImg != ''){
				$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
						$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=2',success:function(lastId){
							if(lastId > 0){
								customArray.webImg = '';$('#frmweb').css({display:'inline'});
								$('#webthumb1').attr('src', noPhoto);
							}else
								alertBoxProfile('error detected','Please try again');
						}});
					}}]
				});
			}	
		});	
		$("#webthumb2").click(function (){
			if(customArray.webImg2 != ''){
				$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
						$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=3',success:function(lastId){
							if(lastId > 0){
								customArray.webImg2 = '';$('#frmweb').css({display:'inline'});
								$('#webthumb2').attr('src', noPhoto);
							}else
								alertBoxProfile('error detected','Please try again');
						}});
					}}]
				});	
			}
		});	
		$("#webthumb3").click(function (){
			if(customArray.webImg3 != ''){
				$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
						$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=4',success:function(lastId){
							if(lastId > 0){
								customArray.webImg3 = '';$('#frmweb').css({display:'inline'});
								$('#webthumb3').attr('src', noPhoto);
							}else
								alertBoxProfile('error detected','Please try again');
						}});
					}}]
				});
			}
		});	
		$("#webthumb4").click(function (){
			if(customArray.webImg4 != ''){
				$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
						$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=5',success:function(lastId){
							if(lastId > 0){
								customArray.webImg4 = '';$('#frmweb').css({display:'inline'});
								$('#webthumb4').attr('src', noPhoto);
							}else
								alertBoxProfile('error detected','Please try again');
						}});
					}}]
				});
			}		
		});	
		$("#webthumb5").click(function (){  
			if(customArray.webImg5 != ''){
				$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
						$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=6',success:function(lastId){
							if(lastId > 0){
								customArray.webImg5 = '';$('#frmweb').css({display:'inline'});
								$('#webthumb5').attr('src', noPhoto);
							}else
								alertBoxProfile('error detected','Please try again');
						}});
					}}]
				});	
			}	
		});	
		$("#webthumb6").click(function (){
			if(customArray.webImg7 != ''){
				$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
						$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=7',success:function(lastId){
							if(lastId > 0){
								customArray.webImg6 = '';$('#frmweb').css({display:'inline'});
								$('#webthumb6').attr('src', noPhoto);
							}else
								alertBoxProfile('error detected','Please try again');
						}});
					}}]
				});	
			}	
		});	
		$("#webthumb7").click(function (){ 
			if(customArray.webImg7 != ''){
				$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
						$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=8',success:function(lastId){
							if(lastId > 0){
								customArray.webImg7 = '';$('#frmweb').css({display:'inline'});
								$('#webthumb7').attr('src', noPhoto);
							}else
								alertBoxProfile('error detected','Please try again');
						}});
					}}]
				});
			}		
		});
		$("#webthumb8").click(function (){ 
			if(customArray.webImg8 != ''){
				$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
						$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&case=9',success:function(lastId){
							if(lastId > 0){
								customArray.webImg8 = '';$('#frmweb').css({display:'inline'});
								$('#webthumb8').attr('src', noPhoto);
							}else
								alertBoxProfile('error detected','Please try again');
						}});
					}}]
				});	
			}			
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
				$('.profile-left-menu2 li a').each(function (index) {
					if(index == curClick){
						$(this).addClass('ui-btn-active'); 
						$(this).find( "span" ).addClass("listview-arrow-active");
					}else{
						$(this).removeClass("ui-btn-active");
						$(this).find( "span" ).removeClass("listview-arrow-active");
					}	
				}); 			
			}else{
				$('.profile-left-menu2 li a').each(function (index) {
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
				$(function() {
					$("#textarea-desc").sceditor({
						plugins: "xhtml",
						style: "minified/jquery.sceditor.default.min.css",
						toolbar: "bold,italic,underline,link,unlink,email,strike,subscript,superscript,left,center,right,justify,size,color,bulletlist,orderedlist,table,horizontalrule,date,time,ltr,rtl",
						resizeEnabled:false
					});
				});
				if(customArray.description != '')	
					$('#textarea-desc').sceditor('instance').val(strdecode(customArray.description));				
				
			}else if(row == 2){
				$('.open-section').show();
				$(function() {
					$("#textarea-hour").sceditor({
						plugins: "xhtml",
						style: "minified/jquery.sceditor.default.min.css",
						toolbar: "bold,italic,underline,link,unlink,email,strike,subscript,superscript,left,center,right,justify,size,color,bulletlist,orderedlist,table,horizontalrule,date,time,ltr,rtl",
						resizeEnabled:false
					});
				});
				if(customArray.opening != '')
					$('#textarea-hour').sceditor('instance').val(strdecode(customArray.opening));
				
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

        
		function checkProfileBox(){
			var r=true,txtCategory = $('#select-category').val(),txtName = $('#txtname').val(),txtAdd = $('#txtadd').val(), txtCity = $('#txtcity').val(),txtContact = $('#txtpho').val(),txtCountry=$('#txtcountry').val(),txtZip=$('#txtzip').val();;
			if(txtCategory == ''){
				alertBoxProfile('incomplete information','Please select category');
				r=false;
			}else if(txtName == ''){
				alertBoxProfile('incomplete information','Please input business name');
				r=false;        
			}else if(txtAdd == ''){
				alertBoxProfile('incomplete information','Please input address');
				r=false;        
			}else if(txtCity == ''){
				alertBoxProfile('incomplete information','Please input city');
				r=false;        
			}else if(txtCountry == ''){
				alertBoxProfile('incomplete information','Please input country');
				r=false;        
			}else if(txtZip == ''){
				alertBoxProfile('incomplete information','Please input ZIP / Postal code');
				r=false;        
			}else if(txtContact == ''){
				alertBoxProfile('incomplete information','Please input telephone');
				r=false;        
			}    
			return r;
		}	
       
        function saveProfile(){
			$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&lat='+lat+'&lng='+lng+'&opt=profile&'+$('#frmpro').serialize(),success:function(lastId){
				$('#overlay').remove();
				alertBoxProfile('update successful','Opening hour section has been updated');
			}});	
		}		
		$('#submit-pro').click(function(e){ // save profile location
			e.preventDefault();
			if(checkProfileBox()){
				//$('<div id="overlay"> </div>').appendTo(document.body);
				  var address = $('#txtname').val() +' '+ $('#txtadd').val() +', '+ $('#txtcity').val() +', '+$('#txtcountry').val();
				  geocoder.geocode( { 'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						lat = results[0].geometry.location.lat();
						lng = results[0].geometry.location.lng();
					} else 
						alertBoxProfile('notice','Your locaton address had no geocode'); 
					 saveProfile();
				  });				

			}			
		});		
		$('#upload').click(function(e){e.preventDefault();$('#filefb').click();}); // when upload button change fb	photo
		$('#uploadweb').click(function(e){e.preventDefault();$('#fileweb').click();}); // when upload button change web photos
        
		$('#submit-hour').click(function(e){ // save opening hour
			$('<div id="overlay"> </div>').appendTo(document.body);
			var str = strencode($('#textarea-hour').sceditor('instance').val());
			$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=texthour&val='+str,success:function(lastId){
				$('#overlay').remove();
				customArray.opening = str;
				alertBoxProfile('update successful','Opening hour section has been updated');
			}});			
		});
		$('#submit-desc').click(function(e){ //save description
			$('<div id="overlay"> </div>').appendTo(document.body);
			var str = strencode($('#textarea-desc').sceditor('instance').val());
			$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=textdesc&val='+str,success:function(lastId){
				$('#overlay').remove();
				customArray.description = str;
				alertBoxProfile('update successful','Opening hour section has been updated');
			}});			
		});		
		$('#flipmap').on('change',function(){ // save whin flipswitch
			$('<div id="overlay"> </div>').appendTo(document.body);
			$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=flip&val='+$('#flipmap').val(),success:function(lastId){
				$('#overlay').remove();
				alertBoxProfile('update successful','Map to be displayed updated');
			}});
		});	
        		
		$('#filefb').on('change',function(){ // save fb photo
			$('<div id="overlay"> </div>').appendTo(document.body);
			$('#frmfb').ajaxSubmit({beforeSubmit:  beforeSubmitfb,success: showResponse,resetForm: true });
		});	
		$('#fileweb').on('change',function(){ // save web photos
			$('<div id="overlay"> </div>').appendTo(document.body);
			$('#frmweb').ajaxSubmit({beforeSubmit:  beforeSubmitweb,success: showResponse2,resetForm: true });
		});	
		
		function showResponse(responseText, statusText, xhr, $form)  { 
			$('#overlay').remove();$('#frmfb').css({display:'none'});	
			$('#fbthumb').attr('src', responseText);
			customArray.fbImg = responseText;
			createProfileMenu2();
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
			if(customArray.webImg8 != '' && customArray.webImg7 != '' && customArray.webImg6 != '' && customArray.webImg5 != '' && customArray.webImg4 != '' && customArray.webImg3 != '' && customArray.webImg2 != '' && customArray.webImg != '')
				$('#frmweb').css({display:'none'});	
			createProfileMenu2();
		}		
		
		function beforeSubmitweb(){
			//check whether client browser fully supports all File API // if (window.File && window.FileReader && window.FileList && window.Blob)
			if (window.File){
				   var fsize = $('#fileweb')[0].files[0].size; //get file size
				   var ftype = $('#fileweb')[0].files[0].type; // get file type
						   //Allowed file size is less than 5 MB (1000000 = 1 mb)
				   if(fsize>1000000){
						alertBoxProfile(bytesToSize(fsize)+' too big file!','ensure image file size is less than 1mb');
						$('#overlay').remove();
						return false;
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
							$('#overlay').remove();
							return false;
						}
				  }
			}else{
			   alertBoxProfile('unsupported browser','Please upgrade your browser, because your current browser lacks some new features we need!');	
			   $('#overlay').remove();
			   return false;
			}
		}		
		function beforeSubmitfb(){
			//check whether client browser fully supports all File API // if (window.File && window.FileReader && window.FileList && window.Blob)
			if (window.File){
				   var fsize = $('#filefb')[0].files[0].size; //get file size
				   var ftype = $('#filefb')[0].files[0].type; // get file type
						   //Allowed file size is less than 5 MB (1000000 = 1 mb)
				   if(fsize>1000000){
						alertBoxProfile(bytesToSize(fsize)+' too big file!','ensure image file size is less than 1mb');
						$('#overlay').remove();
						return false;
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
							$('#overlay').remove();							
							return false;
						}
				  }
			}else{
			   alertBoxProfile('unsupported browser','Please upgrade your browser, because your current browser lacks some new features we need!');	
			   $('#overlay').remove();
			   return false;
			}
		}
		
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
	function bytesToSize(bytes) {
	   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	   if (bytes == 0) return '0 Bytes';
	   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	}
	
	$(document).on('pagecreate','#uic', function () {
		$('#frmlogo').find('div').removeClass('ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset');
		$('#frmlogo').find('div').css({height:'1px'});
		$('#frmbackground').find('div').removeClass('ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset');		
		$('#frmbackground').find('div').css({height:'1px'});
	
	})	
	$(document).on('pageshow','#uic', function () { // UIC script start here
		$('.star').show();
		places = locId.split('|');
		$('#placeIdLogo').val(places[0]);
		$('#placeIdbackground').val(places[0]);
		$( ".right-header" ).html( placename );	
		defaultMenuUIC();
		showHideMenuUIC(curClick);
		$('.iconuic').click(function(){
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'cancel'},{caption: 'logout', callback: function() {
				$.ajax({url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					window.location = 'index.php'
				}});		
			}}]
			});				
		});

		//set default value	
		if(customArray.messageBox != ''){
			var messArray = $.parseJSON(customArray.messageBox);
			$('#txtbox1').val(messArray.comment);
			$('#txtbox2').val(messArray.average);
			$('#txtbox3').val(messArray.share);
			$('#txtbox4').val(messArray.thank);
			$('#txtbox5').val(messArray.nxt);
			$('#txtbox6').val(messArray.option);
			$('#txtbox7').val(messArray.pass);
			$('#txtbox8').val(messArray.takePhoto);
		}
		if(customArray.ratingText != ''){
			var rateArray = $.parseJSON(customArray.ratingText);
			$('#txtvpoor').val((rateArray.vpoor != '' ? rateArray.vpoor : 'Very Poor'));
			$('#txtpoor').val((rateArray.poor != '' ? rateArray.poor : 'Poor'));
			$('#txtfair').val((rateArray.fair != '' ? rateArray.fair : 'Fair'));
			$('#txtgood').val((rateArray.good != '' ? rateArray.good : 'Good'));
			$('#txtexc').val((rateArray.excellent != '' ? rateArray.excellent : 'Good'));
		}		
		if(customArray.button != ''){
			var boxArray = $.parseJSON(customArray.button);
			$('#txtshare1').val((boxArray.share[0] != '' ? boxArray.share[0] : 'skip'));
			$('#txtshare2').val((boxArray.share[1] != '' ? boxArray.share[1] : 'submit'));
			$('#txtrecommend1').val((boxArray.comment[0] != '' ? boxArray.comment[0] : 'no'));
			$('#txtrecommend2').val((boxArray.comment[1] != '' ? boxArray.comment[1] : 'yes'));
			$('#txtnxt').val((boxArray.nxt[0] != '' ? boxArray.nxt[0] : 'okay'));
			$('#txtphoto1').val((boxArray.photo[0] != '' ? boxArray.photo[0] : 'no'));
			$('#txtphoto2').val((boxArray.photo[1] != '' ? boxArray.photo[1] : 'yes'));	
			$('#txtoption1').val((boxArray.option[0] != '' ? boxArray.option[0] : 'cancel'));
			$('#txtoption2').val((boxArray.option[1] != '' ? boxArray.option[1] : 'login'));
			$('#txtoption3').val((boxArray.option[2] != '' ? boxArray.option[2] : 'reset'));	
			$('#txtpass1').val((boxArray.pass[0] != '' ? boxArray.pass[0] : 'cancel'));
			$('#txtpass2').val((boxArray.pass[1] != '' ? boxArray.pass[1] : 'submit'));	
		}	
		if(customArray.logo != ''){ 
			var logoArray = $.parseJSON(customArray.logo);
			$('#frmlogo').css({display:'none'});	
			$('#logothumb').attr('src', logoArray.dLogo);
		}
		if(customArray.backgroundImg != ''){ 
			var logoArray = $.parseJSON(customArray.backgroundImg);
			$('#frmbackground').css({display:'none'});	
			$('#backgroundthumb').attr('src', logoArray.bckimage);
		}		
		$('#uploadlogo').click(function(e){e.preventDefault();$('#filelogo').click();});
		$('#uploadbackground').click(function(e){e.preventDefault();$('#filebackground').click();});
		$('#filebackground').on('change',function(){ // save fb photo
			$('<div id="overlay"> </div>').appendTo(document.body);
			$('#frmbackground').ajaxSubmit({beforeSubmit:  beforeSubmitImage2,success: showResponsebck,resetForm: true });
		});			
		$('#filelogo').on('change',function(){ // save fb photo
			$('<div id="overlay"> </div>').appendTo(document.body);
			$('#frmlogo').ajaxSubmit({beforeSubmit:  beforeSubmitImage,success: showResponse,resetForm: true });
		});	
		$('#pickerbackground').colpick({
			flat:true,
			layout:'hex',
			submit:1,
			submitText:'update',
			color:customArray.backgroundcolor,
			onSubmit:function(hsb,hex,rgb,el) {
				$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&color='+hex+'&case=3',success:function(lastId){
					alertBoxProfile('update successful','Background color has been updated');
				}});				
			}
		});
		$('#pickerfont').colpick({
			flat:true,
			layout:'hex',
			submit:1,
			submitText:'update',
			color:customArray.backgroundFont,
			onSubmit:function(hsb,hex,rgb,el) {
				$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&color='+hex+'&case=4',success:function(lastId){
					alertBoxProfile('update successful','Font color has been updated');		
				}});
			}
		});			

		$('#submit-tbs').click(function(e){
			e.preventDefault();
			$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=5&'+$('#frmUIC1').serialize(),success:function(lastId){
				customArray.ratingText = lastId;
				alertBoxProfile('successful','has been updated');
			}});	
		});	
		$('#submit-box').click(function(e){
			e.preventDefault();
			$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=7&'+$('#frmUIC3').serialize(),success:function(lastId){
				customArray.messageBox = lastId;
				alertBoxProfile('successful','has been updated');
			}});	
		});		
		$('#submit-tb').click(function(e){
			e.preventDefault();
			$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=6&'+$('#frmUIC2').serialize(),success:function(lastId){
				customArray.button = lastId;
				alertBoxProfile('successful','has been updated');
			}});	
		});			
		function showResponsebck(responseText, statusText, xhr, $form)  { 
			$('#overlay').remove();
			$('#frmbackground').css({display:'none'});
			var logoArray = $.parseJSON(responseText);			
			$('#backgroundthumb').attr('src', logoArray.bckimage);
			customArray.logo = responseText;

		}			
		function showResponse(responseText, statusText, xhr, $form)  { 
			$('#overlay').remove();
			if(responseText == 'greater'){
				alertBoxProfile('incorrect logo size','Please upload a logo image with max width 600px & max height 600px');
			}else{
				$('#frmlogo').css({display:'none'});
				var logoArray = $.parseJSON(responseText);			
				$('#logothumb').attr('src', logoArray.dLogo);
				customArray.logo = responseText;
			}
		}	
		$("#backgroundthumb").click(function (){ 
			if(customArray.backgroundImg != ''){
				$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
						$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=2',success:function(lastId){
								customArray.backgroundImg = '';$('#frmbackground').css({display:'inline'});
								$('#backgroundthumb').attr('src', noPhoto);	
						}});
					}}]
				});	
			}			
		});			
		$("#logothumb").click(function (){ 
			if(customArray.logo != ''){
				$.box_Dialog('Delete this photo?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
						$.ajax({url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=1',success:function(lastId){
								customArray.logo = '';$('#frmlogo').css({display:'inline'});
								$('#logothumb').attr('src', noPhoto);
						}});
					}}]
				});	
			}			
		});	
		function beforeSubmitImage2(){
			//check whether client browser fully supports all File API // if (window.File && window.FileReader && window.FileList && window.Blob)
			if (window.File){
				   var fsize = $('#filebackground')[0].files[0].size; //get file size
				   var ftype = $('#filebackground')[0].files[0].type; // get file type
						   //Allowed file size is less than 5 MB (1000000 = 1 mb)
				   if(fsize>10000000){
						alertBoxProfile(bytesToSize(fsize)+' too big file!','ensure image file size is less than 1mb');
						$('#overlay').remove();
						return false;			
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
							$('#overlay').remove();
							return false;					
						}
				  }
			}else{
			   alertBoxProfile('unsupported browser','Please upgrade your browser, because your current browser lacks some new features we need!');	
			   $('#overlay').remove();
			   return false;
			}
		}		
		function beforeSubmitImage(){
			//check whether client browser fully supports all File API // if (window.File && window.FileReader && window.FileList && window.Blob)
			if (window.File){
				   var fsize = $('#filelogo')[0].files[0].size; //get file size
				   var ftype = $('#filelogo')[0].files[0].type; // get file type
						   //Allowed file size is less than 5 MB (1000000 = 1 mb)
				   if(fsize>1000000){
						alertBoxProfile(bytesToSize(fsize)+' too big file!','ensure image file size is less than 1mb');
						$('#overlay').remove();
						return false;			
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
							$('#overlay').remove();
							return false;					
						}
				  }
			}else{
			   alertBoxProfile('unsupported browser','Please upgrade your browser, because your current browser lacks some new features we need!');	
			   $('#overlay').remove();
			   return false;
			}
		}		
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
				if(userArray.productId == everFree)
					 alertBoxProfile('no access','Please upgrade to basic plan & above to access this feature');
				else			
				$('.uic-section-logo').show();
			}else if(row == 1){
				if(userArray.productId == basicID || userArray.productId == everFree){
					alertBoxProfile('no access','Please upgrade to pro plan & above to access this feature');
				}else		
					$('.uic-section-img').show();
			}else if(row == 2){
				if(userArray.productId == everFree)
					 alertBoxProfile('no access','Please upgrade to basic plan & above to access this feature');
				else
					$('.uic-section-bg').show();
			}else if(row == 3){
				if(userArray.productId == everFree)
					 alertBoxProfile('no access','Please upgrade to basic plan & above to access this feature');
				else			
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
	
function strencode(str){
	return String(str).replace(/&amp;/,"|one").replace(/&lt;/,"|two").replace(/&gt;/,"|three").replace(/&quot;/,"|four").replace(/#/,"|five");
}
function strdecode(str){
	return String(str).replace(/\|one/,"&amp;").replace(/\|two/,"&lt;").replace(/\|three/,"&gt;").replace(/\|four/,"&quot;").replace(/\|five/,"#");
}

$(document).on('pageshow','#send-email', function () { // UIC script start here	
	
	var hadFollow = 0;
	$(function() {
		$("#textarea-send").sceditor({
			plugins: "xhtml",
			style: "minified/jquery.sceditor.default.min.css",
			toolbar: "bold,italic,underline,link,unlink,email,strike,subscript,superscript,left,center,right,justify,size,color,bulletlist,orderedlist,table,horizontalrule,date,time,ltr,rtl",
			resizeEnabled:false
		});
	});	
	$('.iconsend').click(function(){
		$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'cancel'},{caption: 'logout', callback: function() {
			$.ajax({url:"getData.php",cache: false,data:'opt=logout',success:function(result){
				window.location = 'index.php'
			}});		
		}}]
		});			
	});
	$('#submit-sendemail').click(function(){
		var objId = [];
		if(userArray.productId == basicID || userArray.productId == proID || userArray.productId == proplus){    
			if(hadFollow > 0){
				 $("input[type='checkbox']").each(function(index){
					if($(this).is(':checked')){
						objId.push($(this).val());
					}	
				 });      
				if(objId.length > 0){
					var creditdate =  $.parseJSON(userArray.credits);
					if(creditdate.credits > 0){
						if($('#txtSubject').val() != '' && $('#txtSubject').val().length > 4){
							if($('#textarea-send').sceditor('instance').val() != '<br _moz_editor_bogus_node="TRUE" />' && $('#textarea-send').sceditor('instance').val().length > 1){
								var desc = $('#textarea-send').sceditor('instance').val();
								var countChars = desc.length;
								if(countChars > 14){
									var body = strencode($('#textarea-send').sceditor('instance').val());
									var subject = strencode($('#txtSubject').val());
									$.box_Dialog('Proceed with sending emails?', {'type':'confirm','title': '<span class="color-gold">send emails?<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
											$.ajax({url:"setData.php",cache: false,data:'gid='+userArray.userGroupId+'&opt=sendEmail&subject='+subject+'&body='+body,success:function(lastId){
												alertBox('processing email sending...','It may take up to 1 hour for all emails to be processed.');
											}});
										}}]
									});
								}else
									 alertBox('message too short ','Your message must have at least 15 words.');
							}else
								alertBox('message too short','Your message must have at least 15 words.'); 
						}else
							alertBox('Invalid subject','Please enter subject at least 5 chars');    
					}else
						alertBox('Invalid','Credits email for this month is 0');
				}else
					 alertBox('Invalid','Please check one or more Locations');
			}else
				alertBox('Invalid','No followers');
		}else 
			alertBox('no access','Please upgrade to basic plan and above to access this feature.');
			
	});
	
	function setCredits(){
		var credit='',totalLoc = parseInt(userArray.addLoc) + 1;
		if(userArray.productId == everFree || userArray.productId == trialID){
			credit = parseInt(creditsFree) * parseInt(totalLoc);
		}else if(userArray.productId == basicID){
			credit = parseInt(creditsBasic) * parseInt(totalLoc);
		}else if(userArray.productId == proID){
			credit = parseInt(creditsPro) * parseInt(totalLoc);
		}else if(userArray.productId == proplus){
			credit = parseInt(creditsProplus) * parseInt(totalLoc);
		}   
		$('#available').html('Email credits available: '+credit);
		$('<div id="overlay"> </div>').appendTo(document.body);
		$.ajax({url:"setData.php",cache: false,data:'gid='+userArray.userGroupId+'&opt=setcredit&credit='+credit,success:function(data){
			$('#overlay').remove();
			userArray.credits = data;
		}});			
	}
	getCredits();
	function getCredits(){
		if(userArray.credits == ''){
			setCredits();
		}else{
			var creditdate =  $.parseJSON(userArray.credits);
			var prevDate = creditdate.date;
			prevDate = prevDate.split('-');
			var t=new Date();
			var day=new Array();day[1]="01";day[2]="02";day[3]="03";day[4]="04";day[5]="05";day[6]="06";day[7]="07";day[8]="08";day[9]="09";
			var currentday = (typeof(day[t.getDate()]) == 'undefined' ? t.getDate() : day[t.getDate()]);
			var year = t.getFullYear();
			if(prevDate[0] != year || prevDate[1] != currentday)
				setCredits();
			else
				$('#available').html('Email credits available: '+credit.credits);     
		}
	}	
	
	$('<div id="overlay"> </div>').appendTo(document.body);
	$.ajax({url:"getData.php",cache: false,data:'id='+userArray.userGroupId+'&opt=getFollower',success:function(data){
		$('#overlay').remove();
		var folower = $.parseJSON(data);
		var allcheckbox = '';hadFollow = folower.totalnum;
		$('#total-followers').html('Total number of followers: '+folower.totalnum);
		 for(var i in locArray){
				var name = locArray[i].name;
				var n = (typeof(folower[locArray[i].id]) != 'undefined' ? ' ('+folower[locArray[i].id]+' '+(folower[locArray[i].id] > 1 ? 'followers' : 'follower')+')' : '');
				var checkbox ='<div class="ui-checkbox">'
					+'<label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off ui-first-child ui-last-child" for="checkbox-'+i+'">'+name+n+'</label>'
					+'<input id="checkbox-'+i+'" type="checkbox" '+(typeof(folower[locArray[i].id]) != 'undefined' ? 'checked="checked"' : '')+' value="'+locArray[i].id+'" name="checkbox-'+i+'">'
					+'</div>';
			   allcheckbox = allcheckbox + checkbox;		   
			}
			allcheckbox = '<div class="ui-controlgroup-controls">'+allcheckbox + '</div>'; 
			$('#box-send-name').html(allcheckbox);		
			$("input[type=checkbox]").checkboxradio();
			$("[data-role=controlgroup]").controlgroup("refresh");
		leftMenu();
		rightMenu(curClick);
	}});
	
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
		$( '.panel-send' ).show();
		if($( window ).width() <= 600){
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}
		if(userArray.permission > 1 ){
			$( '.panel-send' ).hide();
			alertBox('request not granted',"Unauthorized or invalid request");
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
	$('.iconstat').click(function(){
		$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'cancel'},{caption: 'logout', callback: function() {
			$.ajax({url:"getData.php",cache: false,data:'opt=logout',success:function(result){
				window.location = 'index.php'
			}});		
		}}]
		});			
	});
	var firstdates;
	$( ".right-header" ).html( placename );		
	curClick = 0;
	$('.star').show();
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
function getStatPerday(day,interval){
	places = locId.split('|');
	$('<div id="overlay"> </div>').appendTo(document.body);
		$.ajax({url:"getData.php",cache: false,data:'placeId='+places[0]+'&opt=statistic&interval='+interval+'&day='+day,success:function(data){
			$('#overlay').remove();
			var review = $.parseJSON(data);
			var tags = review.selected;
			firstdates = review.dates;
			var array_share = [review.srate1,review.srate2,review.srate3,review.srate4,review.srate5,review.srate6,review.srate7];
            var array_notshare = [review.nrate1,review.nrate2,review.nrate3,review.nrate4,review.nrate5,review.nrate6,review.nrate7];
			$('.tshared').html(review.totalReview + ' (100%)');
			var noShare = review.totalNoShare +' ('+review.noPercent+'%)';
			$('.notshared').html(noShare);
			var Share = review.totalShare +' ('+ review.percent +'%)';
			$('.shared').html(Share);
			//share table
			var table = '<table data-role="table" id="table-share" data-mode="reflow" class="ui-responsive"><thead><tr></tr></thead><tbody>';
			for(var i in tags)
				table = table + '<tr><td>'+tags[i]+'<div style="width:250px;"></div></td><td>'+array_share[i]+'</td></tr>';
			table = table + '</tbody></table>'
			$('#table-share').html(table);
			$( 'table#table-share' ).table( "refresh" );
			//overall
			var table1 = '<table data-role="table" id="overallshare" data-mode="reflow" class="ui-responsive"><thead><tr></tr></thead><tbody>';
			table1 = table1 + '<tr><td>Overall<div style="width:250px;"></div></td><td>'+review.totalShare+'</td></tr>';
			table1 = table1 + '</tbody></table>'
			$('#overallshare').html(table1);
			$( 'table#overallshare' ).table( "refresh" );
			//share not table
			var table2 = '<table data-role="table" id="table-notshare" data-mode="reflow" class="ui-responsive"><thead><tr></tr></thead><tbody>';
			for(var i in tags)
				table2 = table2 + '<tr><td>'+tags[i]+'<div style="width:250px;"></div></td><td>'+array_notshare[i]+'</td></tr>';
			table2 = table2 + '</tbody></table>'
			$('#table-notshare').html(table2);
			$( 'table#table-notshare' ).table( "refresh" );
			//overall
			var table3 = '<table data-role="table" id="overallnoshare" data-mode="reflow" class="ui-responsive"><thead><tr></tr></thead><tbody>';
			table3 = table3 + '<tr><td>Overall<div style="width:250px;"></div></td><td>'+review.totalNoShare+'</td></tr>';
			table3 = table3 + '</tbody></table>'
			$('#overallnoshare').html(table3);
			$( 'table#overallnoshare' ).table( "refresh" );
		}});   
}
$('#submit-export').click(function(){
	if($('#end-date').val() == '' || $('#start-date').val() == '')
        alertBox('input required',"Please enter both start and end dates");
    else{
        places = locId.split('|');        
        var date1 = $('#start-date').val()
        var date2 = $('#end-date').val();
        if(date1 == date2){
            alertBox('invalid date(s)','Start date and End date should not be the same');
        }else if(date1 > date2)
            alertBox('invalid date(s)',"End date should not be earlier than start date");
        else
            window.open(domainFile+'exportData.php?date1='+date1+'&date2='+date2+'&placeId='+places[0]);
    } 
})

function showHideMenuStat(row){
	curClick = row;
	$('.panel-today').show();$('.panel-export').hide();
	if(row == 0){
		$('#statstitle').html('Average Review Scores for Today');
		getStatPerday(0,1);
	}else if(row == 1){
		$('#statstitle').html('Average Review Scores for Yesterday'); 
		getStatPerday(1,1);
	}else if(row == 2){
		$('#statstitle').html('Average Review Scores for the last 7 days');
		getStatPerday(1,7);
	}else if(row == 3){
		$('#statstitle').html('Average Review Scores for the last 14 days'); 
		getStatPerday(1,14);
	}else if(row == 4){
		$('#statstitle').html('Average Review Scores for the last 21 days');
		getStatPerday(1,21);
	}else if(row == 5){
		$('#statstitle').html('Average Review Scores for the last 30 days');
		getStatPerday(1,30);
	}else if(row == 6){
		var d=new Date();
		var month=new Array();month[0]="Jan";month[1]="Feb";month[2]="Mar";month[3]="Apr";month[4]="May";month[5]="Jun";month[6]="Jul";month[7]="Aug";month[8]="Sep";month[9]="Oct";month[10]="Nov";month[11]="Dec";
		var m = month[d.getMonth()];	
		firstdates = firstdates.split(' ');
		firstdates = firstdates[0].split('-');
		$('#title-export').html('Note: First review on '+firstdates[0]+' '+m+' '+firstdates[2]);
		$('.panel-today').hide();
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
	$('.iconplan').click(function(){
		$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'cancel'},{caption: 'logout', callback: function() {
			$.ajax({url:"getData.php",cache: false,data:'opt=logout',success:function(result){
				window.location = 'index.php'
			}});		
		}}]
		});			
	});
	var currPlaceAvail=0;
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
	initiazePlan();	
   function initiazePlan(){
		var plan='';
		if(userArray.productId == basicID){
			plan = 'Basic';
			txtPlan = 'Basic';
		}else if(userArray.productId == proID){
			plan = 'Pro';
			txtPlan = 'Pro';
		}else if(userArray.productId == everFree){
			plan = 'Free Forever';
			txtPlan = 'Free Forever';
		}else if(userArray.productId == proplus){
			plan = 'Pro Plus';
			txtPlan = 'Pro Plus';
		}

		var state = userArray.state;
		state= state.substr(0, 1).toUpperCase() + state.substr(1);
		$('#lblStatus').html('Status: '+state);
		$('#lblPlan').html('Current plan: '+txtPlan);
		var tdate = userArray.expiration;
		tdate = tdate.split(' ');
		$('#lblExpired').html(plan +' expiration date: '+tdate[0]);
		currPlaceAvail = parseInt(userArray.addLoc) + 1;
		$('#lblTotalSubs').html('Total # of online locations: '+ currPlaceAvail);
		$('#label7').html('Free: 1');
		$('#label8').html('Subscribed: '+ userArray.addLoc);  
   }	
	showHideMenuPlan(curClick);
	defaultMenuPlan();
	function changePlan(plan){
		$.ajax({url:"getData.php",cache: false,data:'groupID='+userArray.userGroupId+'&opt=planManage&setting=change&plan='+plan,success:function(lastId){
			alertBox('processing email sending...','It may take up to 1 hour for all emails to be processed.');
		}}); 
	}
	$('#submit-planchange').click(function(){ // request change plan
		if(userArray.permission < 2){
			var btnName1='Basic',btnName2='no change',btnName3='no change',title='change plan?',message='Which plan do you wish to change to?';
			if(userArray.productId == everFree){
				btnName1='Pro',btnName2='Basic',btnName3='no change',title='change plan?',message='Which plan do you wish to change to?';        
			}else if(userArray.productId == basicID){
				btnName1='Pro',btnName2='Free',btnName3='no change',title='change plan?',message='Which plan do you wish to change to?';      
			}else if(userArray.productId == proID){
				btnName1='Basic',btnName2='Free',btnName3='no change',title='change plan?',message='Which plan do you wish to change to?';        
			}
			$.box_Dialog(message, {'type':'confirm','title': '<span class="color-gold">'+title+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: btnName1, callback: function() {changePlan(btnName1);}},{caption: btnName2, callback: function() {changePlan(btnName2);}},{caption: btnName3}]
			});	
		}else
			alertBox('request not granted',"Unauthorized or invalid request");
	});
	$('#submit-plancancel').click(function(){ // request change plan
		if(userArray.permission < 1){
			$.box_Dialog('Proceed to cancel your subscription?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
				$.ajax({url:"getData.php",cache: false,data:'groupID='+userArray.userGroupId+'&opt=planManage&setting=cancel',success:function(lastId){
					setTimeout(function() {alertBox('processing email sending...','It may take up to 1 hour for all emails to be processed.');},200);
				}}); 
			}}]
			});	 
		}else
			alertBox('request not granted',"Unauthorized or invalid request");
	});
	$('#submit-planadd').click(function(){ // request change plan
		if(userArray.permission < 2){
			$.box_Dialog('Please key in the number of locations you want to add.<br/><input type="number" id="txtadd" size="1" style="margin-top:2px;" placeholder="here..." />', {'type':'confirm','title': '<span class="color-gold">Add locations<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'cancel'},{caption: 'submit', callback: function() {
				if($('#txtadd').val() != '') {
					$.ajax({url:"getData.php",cache: false,data:'groupID='+userArray.userGroupId+'&opt=planManage&setting=add&ttalAddRem='+$('#txtadd').val(),success:function(lastId){
						setTimeout(function() {alertBox('processing email sending...','It may take up to 1 hour for all emails to be processed.');},200);
					}});
				}else
					setTimeout(function() {alertBox('invalid',"Don't leave empty");},300);
			}}]
			});	
		}else
			alertBox('request not granted',"Unauthorized or invalid request");
	});
	function removePlan(){
		$.box_Dialog('Please key in the number of locations you want to remove.<br/><input type="number" id="txtremove" size="1" style="margin-top:2px;" placeholder="here..." />', {'type':'confirm','title': '<span class="color-gold">Remove locations<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'cancel'},{caption: 'submit', callback: function() {
			if($('#txtremove').val() != '') {
				$.ajax({url:"getData.php",cache: false,data:'groupID='+userArray.userGroupId+'&opt=planManage&setting=remove&ttalAddRem='+$('#txtremove').val(),success:function(lastId){
					setTimeout(function() {alertBox('processing email sending...','It may take up to 1 hour for all emails to be processed.');},200);
				}});
			}else
				setTimeout(function() {alertBox('invalid',"Don't leave empty");},300);
		}}]
		});	
	}
	$('#submit-planremove').click(function(){ // request change plan
		if(userArray.permission < 2){
			$.box_Dialog('You may delete up to '+currPlaceAvail+' locations', {'type':'question','title':    '<span class="color-gold">notice<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'okay',callback:function(){
					setTimeout(function() {removePlan();},300);
			}}]
			});		
		}else
			alertBox('request not granted',"Unauthorized or invalid request");
	});
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
	$('.iconadmin').click(function(){
		$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'cancel'},{caption: 'logout', callback: function() {
			$.ajax({url:"getData.php",cache: false,data:'opt=logout',success:function(result){
				window.location = 'index.php'
			}});		
		}}]
		});			
	});
    var listuser= [],locDefault=''; 
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
	$('<div id="overlay"></div>').appendTo(document.body);
	$.ajax({url:"getData.php",cache: false,data:'groupID='+userArray.userGroupId+'&opt=listuser',success:function(data){
		$('#overlay').remove();
		 listuser = $.parseJSON(data);
		if(listuser.length){ // had location already
			for(var i in listuser){
				var icon = '';  	
				if(listuser[i].permission == 0)
					 icon = 'images/template/iconOwner.png';
				else if(listuser[i].permission == 1)
					 icon = 'images/template/iconAdmin.png';
				else if(listuser[i].permission == 2)
					 icon = 'images/template/iconUser.png';	
				locDefault = locDefault + '<li><a href="manageuser.html" data-transition="flip" data-prefetch="true"><img src="'+icon+'" alt="" class="ui-li-icon ui-corner-none">'+listuser[i].fname+' '+listuser[i].lname+'<span class="listview-arrow-default"></span></a></li>';
			}	
			$('.admin-right-menu').html('<ul class="admin-right-menu" data-role="listview">'+locDefault+'</ul>');
			$('.admin-right-menu').on('click', ' > li', function () {
				$(this).removeClass('ui-btn-active');
			   curClick = $(this).index();
			});	
			$(".admin-right-menu").listview();
		}
		showHideMenuAdmin(curClick);
		defaultMenuAdmin();
	}});
    $('#submit-updatepwd').click(function(){ //update pwd
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var demail=$('#txtaddress').val();
		if($('#txtfname1').val() == '' || $('#txtlname1').val() == '')
			alertBox('incomplete information','Please complete all the required field(s)');
		else if(!regex.test(demail))
		  alertBox('invalid email address','Please enter a valid email address');
		else if($('#newpwd').val() != $('#newpwdConfirm').val() || $('#newpwd').val() == '' || $('#newpwdConfirm').val() == '')
			alertBox('incorrect password','Please try again');
		else{
			$('<div id="overlay"></div>').appendTo(document.body);
			$.ajax({url:"setData.php",cache: false,data:'id='+userArray.id+'&opt=updatepwd&fname='+$('#txtfname1').val()+'&lname='+$('#txtlname1').val()+'&email='+$('#txtaddress').val()+'&pwd='+$.md5($('#newpwd').val()),success:function(lastId){
				$('#overlay').remove();
				alertBox('updated','Password updated');
			}});
			
		}
	});
	
	$('#submit-invite').click(function(){ // add users
		var totalUsers = listuser;
		var numUsers=0;   
		if(userArray.state == 'active' || userArray.state == 'trialing'){
			if(userArray.productId == everFree) //free 30 days  
				numUsers = (parseInt(userArray.addLoc) + 1) * 1;
			else if(userArray.productId == basicID) //basic
				numUsers = (parseInt(userArray.addLoc) + 1) * 3;
			else if(userArray.productId == proID) //plan
				numUsers = (parseInt(userArray.addLoc) + 1) * 7;
			else if(userArray.productId == proplus) //plan
				numUsers = (userArray.addLoc + 1) * 10;
			if(totalUsers.length < numUsers){  
				var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				var demail=$('#txtemail').val();
				if($('#txtfname').val() == '' || $('#txtlname').val() == '')
					alertBox('incomplete information','Please complete all the required field(s)');
				else if(!regex.test(demail))
				  alertBox('invalid email address','Please enter a valid email address');
				else{
					$('<div id="overlay"></div>').appendTo(document.body);
					$.ajax({url:"getData.php",cache: false,data:'opt=getEmail&email='+$('#txtemail').val(),success:function(is_exist){	
						if(is_exist > 0){
							$('#overlay').remove();
							alertBox('email existed','Please use another email address');
						}else{
							$.ajax({url:"setData.php",cache: false,data:'groupID='+userArray.userGroupId+'&id='+userArray.id+'&opt=adduser&fname='+$('#txtfname').val()+'&lname='+$('#txtlname').val()+'&email='+$('#txtemail').val()+'&permission='+$("#permission :radio:checked").val() ,success:function(lastId){
								$('#overlay').remove();
								alertBox('invitation sent','An invitation email has been sent.');
							}});
						}	
					}});
					}	
			}else
				alertBox('maximum # of users reached',"Unable to add new user(s). Your current plan allow users # up to: "+numUsers);
		}else
			alertBox('trial ended','Please subscribe to a plan');
	})
	
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
		    if(userArray.permission > 1 )
				alertBox('request not granted',"Unauthorized or invalid request");
			else{	
				$( '#admin .right-content' ).removeClass("right-bgblue");
				$( '#admin .right-content' ).addClass("bgwhite");
				$('.panel-new').show();
			}
		}else if(row == 1){
			if(userArray.permission > 1 )
				alertBox('request not granted',"Unauthorized or invalid request");
			else{	
				$( '#admin .right-content' ).removeClass("bgwhite");
				$( '#admin .right-content' ).addClass("right-bgblue");
				$('.panel-users').show();
			}	
		}else if(row == 2){
			$( '#admin .right-content' ).removeClass("right-bgblue");
			$( '#admin .right-content' ).addClass("bgwhite");
			$('#txtfname1').val(userArray.fname);
			$('#txtlname1').val(userArray.lname);
			$('#txtaddress').val(userArray.email);
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
	$('.iconmanage').click(function(){
		$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'cancel'},{caption: 'logout', callback: function() {
			$.ajax({url:"getData.php",cache: false,data:'opt=logout',success:function(result){
				window.location = 'index.php'
			}});		
		}}]
		});			
	});
	var listuser=[],paramId=0,permit=0;
	$('<div id="overlay"></div>').appendTo(document.body);
	$.ajax({url:"getData.php",cache: false,data:'groupID='+userArray.userGroupId+'&opt=listuser',success:function(data){
		$('#overlay').remove();
		 listuser = $.parseJSON(data);
		 initializeManage();
	}});
	
	function initializeManage(){
		locDefault='';
		if(listuser.length){ // had location already
			for(var i in listuser){
				var icon = '';  	
				if(listuser[i].permission == 0)
					 icon = 'images/template/iconOwner.png';
				else if(listuser[i].permission == 1)
					 icon = 'images/template/iconAdmin.png';
				else if(listuser[i].permission == 2)
					 icon = 'images/template/iconUser.png';	
				var alt = listuser[i].permission +'|'+listuser[i].id
				locDefault = locDefault + '<li><a href="manageuser.html" data-transition="flip" data-prefetch="true"><img src="'+icon+'" alt="'+alt+'" class="ui-li-icon ui-corner-none">'+listuser[i].fname+' '+listuser[i].lname+'<span class="listview-arrow-default"></span></a></li>';
			}	
			$('.manage-left-menu').html('<ul class="manage-left-menu" data-role="listview">'+locDefault+'</ul>');
			$('.manage-left-menu').on('click', ' > li', function () {
				curClick = $(this).index();
				var altval = $(this).find( "img" ).attr('alt');
				altval = altval.split('|');
				params(altval[0],altval[1]);
				showHideMenuManage(curClick);
				defaultMenuManage();	   
			});	
			$(".manage-left-menu").listview();
			defaultMenuManage();
			showHideMenuManage(curClick);
		}
   }
	function params(permission,id){
	var allcheckbox = '';
	 for(var i in locArray){
			var name = locArray[i].name;
			var checkbox ='<div class="ui-checkbox">'
				+'<label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off ui-first-child ui-last-child" for="checkbox-'+i+'">'+name+'</label>'
				+'<input id="checkbox-'+i+'" '+(permission < 2 ? 'disabled="" checked="checked"'  : '')+' type="checkbox" value="'+locArray[i].id+'" name="checkbox-'+i+'">'
				+'</div>';
		   allcheckbox = allcheckbox + checkbox;		   
		}
		allcheckbox = '<div class="ui-controlgroup-controls">'+allcheckbox + '</div>'; 
		$('#check-manage-loc').html(allcheckbox);		

			for(var i in listuser){
				if(listuser[i].param != '' && listuser[i].permission > 1){
					var param = $.parseJSON(listuser[i].param);
					if(id == listuser[i].id){
						for(var k in param){
							for(var j in locArray){
								if(locArray[j].id == param[k]){
									$("input[id=checkbox-"+j+"]").attr("checked",true).checkboxradio();
								}
							}	
						}
					}
				}
			} 	
		$("input[type=checkbox]").checkboxradio();
		$("[data-role=controlgroup]").controlgroup("refresh");
    }
	
	$('#btn-remove-user').click(function(){
		if(userArray.permission < permit){
			$.box_Dialog('Delete this user?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'no'},{caption: 'yes', callback: function() {
					$('<div id="overlay"></div>').appendTo(document.body);
					$.ajax({url:"getData.php",cache: false,data:'userId='+paramId+'&opt=removeuser&groupID='+userArray.userGroupId,success:function(data){
						$('#overlay').remove();
						 curClick = 0;
						 listuser = $.parseJSON(data);
						 $.box_Dialog('This user no longer have access to your account', {'type':     'question','title':    '<span class="color-gold">user removed<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'okay',callback: function(){
						    initializeManage();
						 }}]
						});
					}});
				}}]
			});
		}else{
			showHideMenuManage(curClick);
			defaultMenuManage();
			alertBox('unauthorized request',"You don't have rights to delete this user");
		}	
	})
	
	$('#btn-manage-user').click(function(){
		var objId=[];
		if(permit > 1){
			 $("input[type='checkbox']").each(function(index){
				if($(this).is(':checked')){
					objId.push($(this).val());
				}	
			 });
			 if(objId.length > 0){
				$('<div id="overlay"></div>').appendTo(document.body);
				$.ajax({url:"setData.php",cache: false,data:'userId='+paramId+'&opt=userparam&objId='+objId+'&groupID='+userArray.userGroupId,success:function(data){
					$('#overlay').remove();
					listuser = $.parseJSON(data);
					 initializeManage();
					 alertBox('location access updated','The new location access for this user is updated');
				}});
			}else
				alertBox('invalid',"Please check one or more Locations");
		}	
	})
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
				var altval = $(this).find( "img" ).attr('alt');
				altval = altval.split('|');
				var alt = altval[0];
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );				
					$(this).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
					if(alt == 0)
						$(this).find( "img" ).attr('src', 'images/template/iconOwnerActive.png');
					else if(alt == 1)
						$(this).find( "img" ).attr('src', 'images/template/iconAdminActive.png');
					else if(alt == 2)
						$(this).find( "img" ).attr('src', 'images/template/iconUserActive.png');
					paramId = altval[1];permit=altval[0];
					params(altval[0],altval[1]);
				}else{
					if(alt == 0)
						$(this).find( "img" ).attr('src', 'images/template/iconOwner.png');
					else if(alt == 1)
						$(this).find( "img" ).attr('src', 'images/template/iconAdmin.png');
					else if(alt == 2)
						$(this).find( "img" ).attr('src', 'images/template/iconUser.png');				
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				}	
			}); 			
		}else{	
			$('.manage-left-menu li a').each(function (index) {
				var altval = $(this).find( "img" ).attr('alt');
				altval = altval.split('|');
				var alt = altval[0];
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );
					paramId = altval[1];permit=altval[0];
					params(altval[0],altval[1]);
				}	
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");			
				if(alt == 0)
					$(this).find( "img" ).attr('src', 'images/template/iconOwner.png');
				else if(alt == 1)
					$(this).find( "img" ).attr('src', 'images/template/iconAdmin.png');
				else if(alt == 2)
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