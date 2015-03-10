var locArray={},curClick=0;

$(document).ready(function(){
 // getData();
 // $( ".right-header" ).html( locArray.businessName );	
});  
$(document).on('pageshow','#admin', function () {
	//$( ".right-header" ).html( locArray.businessName );	
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
	//$(".admin-left-menu").listview();
	showHideMenuSetup(curClick);
	//defaultMenuSetup();
	if($( window ).width() <= 600){
		$( '.main-wrap .left-content' ).show();
		$( '.main-wrap .right-content' ).hide();
		$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			$('.admin-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});		
	}	
	$('.admin-left-menu').on('click', ' > li', function () {
	   curClick = $(this).index();		
		showHideMenuSetup(curClick);
		defaultMenuSetup();	
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
	$('.right-menu').on('click', ' > li', function () {
	   curClick = $(this).index();
	});			
	$("img.logo").click(function (){  //logo click
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
			$('.admin-left-menu li a').each(function (index) {
				if(index == curClick){
					$(this).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				}
			});	
		}else{
			$('.admin-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});				
		}	
	}
	function showHideMenuSetup(row){
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
		defaultMenuSetup();
	});
});

$(document).on('pageshow','#manage', function () { // Profile script start here
	//$( ".right-header" ).html( locArray.businessName );	
	defaultMenuProfile();
	showHideMenuProfile(curClick)
	$('.manage-left-menu').on('click', ' > li', function () {
	    curClick = $(this).index();
		showHideMenuProfile(curClick);
		defaultMenuProfile();	   
	});	
	$("img.logo").click(function (){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			curClick=1;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "admin.html",{ transition: "flip" });
		}
	});	
	$('.right-menu').on('click', ' > li', function () {
	   curClick = $(this).index();
	});		
	/* end script for dashboard */
	function defaultMenuProfile(){
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content' ).css( {"min-height":height.toFixed() + 'em'} );
		if($( window ).width() > 600){
			$('.manage-left-menu li a').each(function (index) {
				if(index == curClick){
					$(this).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				}	
			}); 			
		}else{
			$('.manage-left-menu li a').each(function (index) {
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
		defaultMenuProfile();
	});
});

function getData(){
 $.ajax({url:"getLocData.php",data:'id=1000',success:function(result){
	locArray =  $.parseJSON(result)
  }});
}