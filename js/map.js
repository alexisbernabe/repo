var map,marker2,infowindow;
$(document).ready(function(){
	var point = new google.maps.LatLng($("#blat").val(), $("#blng").val());
	  var mapOptions = {
		zoom: 14,
		scaleControl: true,
		center: point
	  };
	  map = new google.maps.Map(document.getElementById('map-canvas'),
		  mapOptions);
		marker2 = create_marker(point,'star');
		create_infobox(marker2);
	//google.maps.event.addDomListener(window, 'load', initialize);
  google.maps.event.addDomListener(window, 'resize', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
	//alert(map.getCenter())
	if(window.innerWidth < 400){
		infowindow.maxWidth = 100;	
	}else{
		//$( "#divider" ).removeClass("clear");	
	}
		infowindow.maxWidth = 200;
	infowindow.open(map,marker2);
    window.setTimeout(function() {
      map.panTo(marker2.getPosition());
    }, 3500);
  });	
});



function create_marker(point,cat){
	var image = new google.maps.MarkerImage('images/marker/'+cat+'/image.png',
	new google.maps.Size(32,37),
	new google.maps.Point(0,0),
	new google.maps.Point(16,37));
	var marker = new google.maps.Marker({
		position: point,
		draggable: false,
		icon: image,
		map: map,
		zIndex: 90,
		optimized: true
	});
  return marker;	
}
function create_infobox(marker){
	var bname = $("#bname").val();
	var address = $("#baddress").val();
		var boxText = document.createElement("div");
		boxText.setAttribute('id', 'boxinfo');
		boxText.style.cssText = "margin-top: -2px; background: white; padding: 5px;";
		boxText.innerHTML = '<strong>'+bname+'</strong><br/>'+address;
		var myOptions = {
			 content: boxText
			,disableAutoPan: false
			,maxWidth: 0
			,pixelOffset: new google.maps.Size(-110, -100)
			,zIndex: 300000
			,boxStyle: {width: "220px"}
			,closeBoxMargin: "0px 2px 2px 2px"
			,closeBoxURL: "images/close.gif"
			,infoBoxClearance: new google.maps.Size(1, 1)
			,isHidden: false
			,pane: "floatPane"
			,enableEventPropagation: false
		}; 
		var contentString = '<div id="boxinfo">'+
      '<p>'+bname+'<br/>'+address+'</p>'+
      '</div>';
		 infowindow = new google.maps.InfoWindow({
			  content: boxText,
			  maxWidth:200
		  });      

		infowindow.open(map,marker);
		 google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		 });
}