var locArray={},curClick=0;
$(document).on('pagecreate','#setup', function () { // Profile script start here
/*	$('.setup-left-menu').html('<ul class="setup-left-menu" data-role="listview"><li><a href="#">Business Web Page<span class="listview-arrow-default"></span></a></li><li><a href="#">User Interface for Customer<span class="listview-arrow-default"></span></a></li><li><a href="#">What Question to Ask?<span class="listview-arrow-default"></span></a></li><li><a href="#">Post Reviews to Facebook & Tabluu<span class="listview-arrow-default"></span></a></li></ul>');
	$(".setup-left-menu").listview();*/
})
$(document).ready(function(){
 // getData();
 // $( ".right-header" ).html( locArray.businessName );	
});  
$(document).on('pageshow','#setup', function () {
	//$( ".right-header" ).html( locArray.businessName );	
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
	//$(".setup-left-menu").listview();
	showHideMenuSetup(curClick);
	//defaultMenuSetup();	
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

	$("#setup img.logo").click(function (){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			window.location = 'index.html';
		}
	});	
	/* end script for dashboard */
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
	$( '.right-content' ).removeClass("right-bgblue bgwhite");
	if(row < 2)
		 $( '.right-content' ).addClass("right-bgblue");
	else
		$( '.right-content' ).addClass("bgwhite");
	if(row == 0){
		$('.panel-profile').show();
		//$('.right-menu').html('<ul class="right-menu" data-role="listview"><li><a href="profile.html" data-prefetch="true" >Profile<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-prefetch="true">Description<span class="listview-arrow-default"></span></a></li><li class="pmenu"><a href="profile.html" data-prefetch="true">Opening Hours<span class="listview-arrow-default"></span></a></li><li class="pmenu"><a href="profile.html" data-prefetch="true">Photos<span class="listview-arrow-default"></span></a></li><li class="pmenu"><a href="profile.html" data-prefetch="true">Map Display<span class="listview-arrow-default"></span></a></li></ul>');
	}else if(row == 1){
		$('.panel-UIC').show();
		//$('.right-menu').html('<ul class="right-menu" data-role="listview"><li ><a href="#" data-prefetch="true">Business Logo<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Background Image<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Background Color<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Font Color<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Text Below Stars<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Text in Buttons<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Text in Message Box<span class="listview-arrow-default"></span></a></li></ul>');
	}else if(row == 2){
		$('.panel-question').show();
	}else if(row == 3){
		$('.panel-post').show();
	}
	//$(".right-menu").listview();
	
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

$(document).on('pagecreate','#profile', function () { // Profile script start here
	//$("#logo").removeClass("ui-link ui-btn-left ui-btn ui-shadow ui-corner-all");
})
$(document).on('pageshow','#profile', function () { // Profile script start here
	//$( ".right-header" ).html( locArray.businessName );	
	defaultMenuProfile();
	 showHideMenuProfile(curClick)
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
			curClick=0;
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
});
$(document).on('pageshow','#uic', function () { // UIC script start here
	//$( ".right-header" ).html( locArray.businessName );	
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
			curClick=0;
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
function getData(){
 $.ajax({url:"getLocData.php",data:'id=1000',success:function(result){
	locArray =  $.parseJSON(result)
  }});
}