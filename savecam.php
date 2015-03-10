<?php
session_start();
  //check if this is an ajax request OR user session is not setting up
if (!isset($_SESSION['session'])){
	echo 'access is forbidden';
	die();
}

$filename = '/'. rand() .'.jpg';
$UploadDirectory    = 'images/shared/'.$_REQUEST['placeId'];
if (!file_exists($UploadDirectory))
		mkdir($UploadDirectory); 
echo $original = $UploadDirectory.$filename;
$input = file_get_contents('php://input');
$result = file_put_contents($original, $input);

?>
