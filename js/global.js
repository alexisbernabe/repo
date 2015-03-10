var curClick=0,locId=0;
$(document).ready(function () {
	/* script for dashboard */
	defaultMenu();
	$(".desktop-dash-ul li a").click(function () { /* desktop left menu when click*/ 
	    locId=0;
		var row = $( "a" ).index(this);
		curClick = row;
		var str  = $( this ).text();
		var clas = $(this).attr('class');
		var id = clas.split(' ');
		locId = id[0];
		locId = 'locId='+locId +'&'+'name='+str;	
		//showHideMenu(row);
		defaultMenu();

	});	
	$(".mobile-left-menu ul li").click(function () { /* mobile left menu when click*/ 
	    locId=0;
		var str  = $( this ).text();
		var clas = $("a").attr('class');
		alert(ckass)
		var id = clas.split(' ');
		locId = id[0];		
		locId = 'locId='+locId +'&'+'name='+str;	
		$( ".right-header" ).html( str );
		var row = $(this).index();
		curClick = row;
		showHideMenu(row);
		$('.mobile-left-menu').hide();
		$('.mobile-right-menu').show();
	});	
	/*desktop add new location*/
	$(".desktop-addnew-loc li a").click(function () { 
		$('.desktop-addnew-loc').hide();
		$('.desktop-text-loc').show();
		$('#desktop-text-6').focus();
	});	
	$( ".desktop-text-loc .ui-input-text input" ).blur(function() { // desktop input text when it blur
		if($('#desktop-text-6').val() == ''){
			$('.desktop-addnew-loc').show();
			$('.desktop-text-loc').hide();
		}
	});
	$( "#desktop-text-6" ).keypress(function(e) {
		if(e.which == 13){
			alert($("#desktop-text-6").val())
		}
	});	
	/* end of desktop add new location*/
	
	/* mobile add new location*/
	$(".mobile-addnew-loc li a").click(function () { 
		$('.mobile-addnew-loc').hide();
		$('.mobile-text-loc').show();
		$('#mobile-text-6').focus();
	});	
	$( ".mobile-text-loc .ui-input-text input" ).blur(function() { // mobile input text when it blur
		if($('#mobile-text-6').val() == ''){
			$('.mobile-addnew-loc').show();
			$('.mobile-text-loc').hide();
		}
	});
	$( "#mobile-text-6" ).keypress(function(e) {
		if(e.which == 13){
			alert($("#mobile-text-6").val())
		}
	});	
	/* end of mobile add new location*/	
	
	$("img.logo").click(function (){  //logo click
		if($("#cur-page").val())
		if($( window ).width() <= 600){
			if($("#cur-page").val() == 'dash'){
				$('.mobile-left-menu').show();
				$('.mobile-right-menu').hide();			
			}
		}
	});
	$( window ).resize(function() { // when window resize
		defaultMenu();
	});
	/* end script for dashboard */
});
function defaultMenu(){
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.mobile-left-menu,.mobile-right-menu' ).css( {"min-height":height.toFixed() + 'em'} );
	if($( window ).width() > 600){
		$('.desktop-dash-ul li a').each(function (index) {
			if(index == curClick){
				var str  = $( this ).text();
				$( ".right-header" ).html( str );
				showHideMenu(curClick);
				$(this).addClass('ui-btn-active'); 
				$(this).find( "span" ).addClass("listview-arrow-active");
				$(this).find( "img" ).attr('src', 'images/template/activeOnline.png');			
			}else{
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
				$(this).find( "img" ).attr('src', 'images/template/active.png'); 				
			}
			
		}); 			
	}
}
function showHideMenu(row){
	curClick = row;
    $('.left-menu-help').hide();$('.left-menu-admin').hide();$('.left-menu-send').hide();$('.left-menu-plan').hide();$('.left-menu-loc').hide();$('.star').hide();
	if(row == 0){
		$('.left-menu').html('<ul class="left-menu" data-role="listview"><li><a href="http://www.tabluu.com/blog/getting-started-with-tabluu" data-prefetch="true" target="_blank">Getting Started<span class="listview-arrow-default"></span></a></li><li ><a href="http://www.tabluu.com/blog/how-do-i-setup-tabluu-2" data-prefetch="true" target="_blank">Setup<span class="listview-arrow-default"></span></a></li><li ><a href="http://www.tabluu.com/blog/some-examples-to-get-you-started" data-prefetch="true" target="_blank">Examples<span class="listview-arrow-default"></span></a></li></ul>');
	}else if(row == 1){
		$('.left-menu').html('<ul class="left-menu" data-role="listview"><li ><a href="#" data-prefetch="true">Add New User<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Manage Users<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Profile & Password<span class="listview-arrow-default"></span></a></li></ul>');
	}else if(row == 2){
		$('.left-menu').html('<ul class="left-menu" data-role="listview"><li ><a href="#" data-prefetch="true">Send Emails<span class="listview-arrow-default"></span></a></li></ul>');
	}else if(row == 3){
		$('.left-menu').html('<ul class="left-menu" data-role="listview"><li ><a href="#" data-prefetch="true">Plan<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Online Location<span class="listview-arrow-default"></span></a></li></ul>');
	}else if(row > 3){
		$('.star').show();
		alert(locId)
		$('.left-menu').html('<ul class="left-menu" data-role="listview"><li ><a href="#" data-prefetch="true">Start Getting Reviews<span class="listview-arrow-default"></span></a></li><li ><a href="setup.html?'+locId+'">Setup<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Statistics<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Change Status<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Delete<span class="listview-arrow-default"></span></a></li>');	
	}
	$(".left-menu").listview();
}