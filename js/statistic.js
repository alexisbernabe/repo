var locArray={},curClick=0;

$(document).ready(function(){
 // getData();
 // $( ".right-header" ).html( locArray.businessName );	
});  
$(document).on('pageshow','#statistic', function () {
	//$( ".right-header" ).html( locArray.businessName );	
	showHideMenuStat(curClick);
	defaultMenuStat();	
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
			window.location = 'index.html';
		}
	});	
	/* end script for dashboard */
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


function getData(){
 $.ajax({url:"getLocData.php",data:'id=1000',success:function(result){
	locArray =  $.parseJSON(result)
  }});
}