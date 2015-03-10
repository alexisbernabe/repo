
$(document).ready(function(){
	var height = ($( window ).height() / 16) - 4,btnaggre=1;
	$( '.contentwrap').css( {"min-height":height.toFixed() + 'em'} );	
	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.contentwrap').css( {"min-height":height.toFixed() + 'em'} );
	});
	$.fancybox({'scrolling':'no','closeEffect':'fade','closeClick':false,'overlayColor': '#000','href' :'#betapermission','overlayOpacity': 0.5,'beforeClose':function(){window.location= "https://www.tabluu.com";}});
	$('#iAgree').click(function(){
		$('.alpha_p1').hide();$('.alpha_p2').hide();$('.alpha_p3').hide();
		btnaggre++;
		if(btnaggre == 2)
			$('.alpha_p2').show();
		else if(btnaggre == 3)
			$('.alpha_p3').show();
		else if(btnaggre == 4){
			$('.alpha_p3').show();
			window.location= "signup.html";
		}	
	});
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
});

