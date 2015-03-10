var curClick=0;
$(document).ready(function () {
	/* script for dashboard */
	defaultMenu();
	$(".left-menu li a").click(function () { /* left menu when click*/ 
		var row = $( "a" ).index(this);
		var clas = $(this).attr('class');
		alert(clas)
		curClick = row;
		showHideMenu(row);
		defaultMenu();
		var href = $(this).attr('href');
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
			alert($("#text-6").val())
		}
	});		
	$( window ).resize(function() { // when window resize
		if($( window ).width() > 600){
			$( '.main-wrap .left-content' ).css( {"display":'inline'} );
			$( '.main-wrap .right-content' ).css( {"display":'inline'} );		
			$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
			$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
		}else{
			$( '.main-wrap .left-content' ).css( {"display":'inline'} );
			$( '.main-wrap .right-content' ).css( {"display":'none'} );
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}	
		defaultMenu();
	});
	$("img.logo").click(function (){  //logo click
		if($("#cur-page").val())
		if($( window ).width() <= 600){
			$( '.main-wrap .left-content' ).css( {"display":'inline'} );
			$( '.main-wrap .right-content' ).css( {"display":'none'} );
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}
	});	
	/* end script for dashboard */
});
function defaultMenu(){
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content' ).css( {"min-height":height.toFixed() + 'em'} );
	if($( window ).width() > 600){
		$('.left-menu li a').each(function (index) {
			if(index == curClick){
				var str  = $( this ).text();
				$( ".right-header" ).html( str );
				$(this).addClass('ui-btn-active'); 
				$(this).find( "span" ).addClass("listview-arrow-active");
				$(this).find( "img" ).attr('src', 'images/template/activeOnline.png');					
			}else{
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
				$(this).find( "img" ).attr('src', 'images/template/active.png'); 			
			}	
		}); 			
	}else{
		$('.left-menu li a').each(function (index) {
			$(this).removeClass("ui-btn-active");
			$(this).find( "span" ).removeClass("listview-arrow-active");
			$(this).find( "img" ).attr('src', 'images/template/active.png'); 
        });				
	}
}
function showHideMenu(row){
	curClick = row;
	if($( window ).width() <= 600){
		$( '.main-wrap .left-content' ).css( {"display":'none'} );
		$( '.main-wrap .right-content' ).css( {"display":'inline'} );
		$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
	}
	$('.right-menu-help').hide();$('.right-menu-admin').hide();$('.right-menu-send').hide();$('.right-menu-plan').hide();$('.right-menu-loc').hide();$('.star').hide();
	if(row == 0){
		$('.right-menu').html('<ul class="right-menu" data-role="listview"><li><a href="http://www.tabluu.com/blog/getting-started-with-tabluu" data-prefetch="true" target="_blank">Getting Started<span class="listview-arrow-default"></span></a></li><li ><a href="http://www.tabluu.com/blog/how-do-i-setup-tabluu-2" data-prefetch="true" target="_blank">Setup<span class="listview-arrow-default"></span></a></li><li ><a href="http://www.tabluu.com/blog/some-examples-to-get-you-started" data-prefetch="true" target="_blank">Examples<span class="listview-arrow-default"></span></a></li></ul>');
	}else if(row == 1){
		$('.right-menu').html('<ul class="right-menu" data-role="listview"><li ><a href="#" data-prefetch="true">Add New User<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Manage Users<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Profile & Password<span class="listview-arrow-default"></span></a></li></ul>');
	}else if(row == 2){
		$('.right-menu').html('<ul class="right-menu" data-role="listview"><li ><a href="#" data-prefetch="true">Send Emails<span class="listview-arrow-default"></span></a></li></ul>');
	}else if(row == 3){
		$('.right-menu').html('<ul class="right-menu" data-role="listview"><li ><a href="#" data-prefetch="true">Plan<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Online Location<span class="listview-arrow-default"></span></a></li></ul>');
	}else if(row > 3){
		$('.star').show();
		$('.right-menu').html('<ul class="right-menu" data-role="listview"><li ><a href="#" data-prefetch="true">Start Getting Reviews<span class="listview-arrow-default"></span></a></li><li ><a href="setup.html" data-prefetch="true">Setup<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Statistics<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Change Status<span class="listview-arrow-default"></span></a></li><li ><a href="#" data-prefetch="true">Delete<span class="listview-arrow-default"></span></a></li>');	
	}
	$(".right-menu").listview();
	
}