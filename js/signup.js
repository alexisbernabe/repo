
$(document).bind('mobileinit', function(){
	 $('input[type="text"]').textinput({ preventFocusZoom: true });
});
$(document).ready(function(){
	var istest = true,chargifydomain='',enterprise12='';
    if(istest == true){
		chargifydomain = 'https://tripbull.chargify.com';
		enterprise12=3602787;
	}else{
		chargifydomain = 'https://tabluu.chargify.com';
		enterprise12=3410620;
	}	
	var height = ($( window ).height() / 16) - 5;
	$( '.contentwrap').css( {"min-height":height.toFixed() + 'em'} );	
    $('.fancybox').fancybox({});
    $(".page-login").click(function () {  // show login page
		window.location= "login.html";	
	});	

	$("#newpwdConfirm").keypress(function(e) {
		if(e.which == 13){
			signup();		
		}
	})		
	
	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.contentwrap').css( {"min-height":height.toFixed() + 'em'} );
	});

		
	function signup(){
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var demail=$('#email').val();
		if($('#lname').val() == '' || $('#fname').val() == '')
			alertBox('incomplete information','Please complete all the required field(s)');
		else if(!regex.test(demail))
		  alertBox('invalid email address','Please enter a valid email address');
		else if($('#newpwd').val() != $('#newpwdConfirm').val() || $('#newpwd').val() == '' || $('#newpwdConfirm').val() == '')
			alertBox('incorrect password','Please try again');
		else{
			$('<div id="overlay"></div>').appendTo(document.body);
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getEmail&email='+$('#email').val(),success:function(is_exist){	
				if(is_exist > 0){
					$('#overlay').remove();
					alertBox('email existed','Please use another email address');
				}else{
					$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=signup&fname='+$('#fname').val()+'&lname='+$('#lname').val()+'&email='+$('#email').val()+'&pwd='+$.md5($('#newpwd').val())+'&groupId='+$('#groupId').val(),success:function(result){
						$('#overlay').remove();
						var data =  $.parseJSON(result);
						if(data.type > 1){
							window.location = chargifydomain+'/h/'+enterprise12+'/subscriptions/new?first_name='+$('#fname').val()+'&last_name='+$('#lname').val()+'&reference='+data.groupId; // redirect
						}else{
							alertBox('success','Successfully signed up!');
							window.location= "index.html";
						}
					}});
				}	
			}});
		}	
	}
	$( "#submit-signing" ).click(function() { // signing in
		signup();
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

