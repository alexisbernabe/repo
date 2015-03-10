<?php
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$id = $_REQUEST['id'];
	$sql = "SELECT p.profilePlaceId, p.businessName, p.category, p.longitude, p.latitude, p.address, p.city, p.country, p.zip, p.contactNo, p.facebookURL, p.websiteURL, p.showmap, l.subscribe, u.productId,u.state, d.description, o.opening, ps.webImg, ps.webImg2, ps.webImg3, ps.webImg4, ps.webImg5, ps.webImg6, ps.webImg7, ps.webImg8,c.item2Rate,c.selectedItems,c.reviewPost FROM businessProfile AS p
LEFT JOIN businessList AS l ON l.id = p.profilePlaceId
LEFT JOIN businessDescription AS d ON d.descPlaceId = l.id
LEFT JOIN businessOpeningHours AS o ON o.openingPlaceId = p.profilePlaceId
LEFT JOIN businessPhotos AS ps ON ps.photoPlaceId = p.profilePlaceId
LEFT JOIN businessUserGroup AS u ON u.gId = l.userGroupId
LEFT JOIN businessCustom AS c ON c.customPlaceId = ps.photoPlaceId
WHERE p.profilePlaceId =  $id
LIMIT 1";
$result = mysql_query($sql);
//print_r(mysql_fetch_array($result));
echo json_encode(mysql_fetch_array($result));
$connect->db_disconnect();

?>
