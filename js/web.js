$(document).ready(function() {
	var isResult = 0,m_isResult=0,j=0,featureOffset=4,notfeatureOffset=0,reviewOffset=0,limit=10,m_featureOffset=1,m_notfeatureOffset=1,m_reviewOffset=2,m_limit=5,triggerload = false,path=$( "#path" ).val();
	$( ".resizeme" ).aeImageResize({ height: 176, width: 176 });
	//App.tabledList.init("#sysPinsList");
	$( window ).resize(function() { // when window resize
		
	});
	$('.fancybox').fancybox({});
	
	$("#ScrollToTop").click(function()
	{
		$(window).scrollTop(0);

		return false;
	});
	function hideloader(){setTimeout(function(){$( "#overlay" ).hide();},1000);}
	function scrollToTopCheck() {
		if ($(window).scrollTop() > 500) $("#ScrollToTop").show();
		else $("#ScrollToTop").hide();
		if($(window).scrollTop() >= $(document).height() - $(window).height()) {
			if(window.innerWidth > 600){
				if(isResult < 1){
					$( "#overlay" ).show();
					$.ajax({type: "POST",url:path+"secondloadhtml.php",cache: false,data:'placeId='+$('#placeid').val()+'&offset='+featureOffset+'&limit='+limit,success:function(data){
						if(data == 0 && isResult < 1){
							$.ajax({type: "POST",url:path+"thirdloadhtml.php",cache: false,data:'placeId='+$('#placeid').val()+'&offset='+notfeatureOffset+'&limit='+limit,success:function(data){
								
								if(data == 0)
									isResult = 1;
								else{	
									notfeatureOffset = limit + notfeatureOffset;
									$('.firstload').append(data);
									App.tabledList.init("#sysPinsList");
								}
								hideloader();
							}});
						}else{
							featureOffset = limit + featureOffset;
							$('.firstload').append(data);
							App.tabledList.init("#sysPinsList");
							hideloader();
						}
					}});
				}
			}else{
				m_showreviews();
			}
		}
	}
	$(window).scroll(scrollToTopCheck);
	// Fancy Form
	$(".FancyForm input[type=text], .FancyForm input[type=password], .FancyForm textarea").each(function() {
		if ($(this).val()) $(this).addClass("NotEmpty");
	}).change(function() {
		if ($(this).val()) $(this).addClass("NotEmpty");
		else  $(this).removeClass("NotEmpty");
	});
	if(window.innerWidth > 600){
		$( "#overlay" ).show();
		$.ajax({type: "POST",url:path+"firstloadhtml.php",cache: false,data:'placeId='+$('#placeid').val()+'&opt=review',success:function(result){
			$( "#overlay" ).hide();
			$('.firstload').append(result);
			App.tabledList.init("#sysPinsList");
		}});
	}
	$.ajax({type: "POST",url:path+"firstloadhtml.php",cache: false,data:'placeId='+$('#placeid').val()+'&opt=contactus',success:function(result){
		$('.mailto').attr('href','mailto:'+result)
	}});
	$.ajax({type: "POST",url:path+"m_reviews.php",cache: false,data:'placeId='+$('#placeid').val()+'&offset=0&limit=1&case=1',success:function(result){
		if(result == 0){
			$.ajax({type: "POST",url:path+"m_reviews.php",cache: false,data:'placeId='+$('#placeid').val()+'&offset=0&limit=1&case=2',success:function(result){
				if(result != 0)
					$('#m_reviews').append(result);
			}})
		}else
			$('#m_reviews').append(result);
	}});
	$('#top-reviews').click(function(e){
		e.preventDefault();
		$('#m_productImages').html('');
		$('#m_reviews').show();
		$('#topmenu ul li#showcase').removeClass('activeMenu');
		$('#topmenu ul li#top-reviews').addClass('activeMenu');
		//m_showreviews();
	})
	$('#showcase').click(function(e){
		e.preventDefault();
		$('#m_reviews').hide();
		$('#topmenu ul li#top-reviews').removeClass('activeMenu');
		$('#topmenu ul li#showcase').addClass('activeMenu');
		$( "#overlay" ).show();
		$.ajax({type: "POST",url:path+"m_producImagesHtml.php",cache: false,data:'placeId='+$('#placeid').val(),success:function(result){
			$('#m_productImages').append(result);
			hideloader();
		}});
	});
	/*
	$('#socialmenu ul').on('click', ' > li', function () {
	    var curClick = $(this).index();
		$('#socialmenu ul li a').each(function (index) {
			if(curClick == index)
				$(this).addClass('menuiconactive');
			else
				$(this).removeClass('menuiconactive');
		});	
	});	
	$('.topleftmenu').click(function(){
		$('#socialmenu ul li a').each(function (index) {
			$(this).removeClass('menuiconactive');
		});	
	});*/
	function m_showreviews(){
		if(m_isResult < 1){
			$( "#overlay" ).show();
			$.ajax({type: "POST",url:path+"m_reviews.php",cache: false,data:'placeId='+$('#placeid').val()+'&offset='+m_featureOffset+'&limit='+m_limit+'&case=1',success:function(result){
				if(result == 0 && m_isResult < 1){ 
					$.ajax({type: "POST",url:path+"m_reviews.php",cache: false,data:'placeId='+$('#placeid').val()+'&offset='+m_notfeatureOffset+'&limit='+m_limit+'&case=2',success:function(data){
						if(data == 0)
							m_isResult = 1;
						else{	
							m_notfeatureOffset = m_limit + m_notfeatureOffset;
							$('#m_reviews').append(data);
						}
						hideloader();
					}});
				}else{
					m_featureOffset = m_limit + m_featureOffset;
					$('#m_reviews').append(result);
					hideloader();
				}
			}});
		}
	}
});