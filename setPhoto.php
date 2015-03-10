<?php
session_start();
  //check if this is an ajax request OR user session was setting up
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || !isset($_SESSION['session'])){
	echo 'access is forbidden';
	die();
}
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
if(strstr($_SERVER['PHP_SELF'],'staging'))
	$domain = 'http://www.tabluu.com/app/staging/';
else 
	$domain = 'http://www.tabluu.com/app/';
if(isset($_FILES["filefb"]))
{
	$placeId = $_REQUEST['placeidfb'];
	$id = $_REQUEST['idfb'];
    $UploadDirectory    = 'images/profile/'.$placeId;
	
	if (!file_exists($UploadDirectory))
		mkdir($UploadDirectory);   

    $File_Name          = strtolower($_FILES['filefb']['name']);
    $File_Ext           = substr($File_Name, strrpos($File_Name, '.')); //get file extention
    $Random_Number      = rand(); //Random number to be added to name.
    $NewFileName        = $Random_Number.$File_Ext; //new file name
    
    if(move_uploaded_file($_FILES['filefb']['tmp_name'], $UploadDirectory.'/'.$NewFileName )){
        $image = new Photos();
		$source = $UploadDirectory.'/'.$NewFileName;
		//copy($domain.$source,$source);
		//$image->load($source);
		//$image->save($source,$image->image_type);
		echo $path = $UploadDirectory.'/'.$NewFileName;
		//$sql = "UPDATE businessPhotos SET fbImg= '$img' WHERE photoPlaceId = $placeId";
		mysql_query("UPDATE businessImages SET path= '$path',title='',description='' WHERE id = $id") or die(mysql_error());		
		//mysql_query($sql);
    }else{
        die('error uploading File!');
    }
    
}
if(isset($_FILES["filephoto"]))
{

	$placeId = $_REQUEST['photoId'];
    $UploadDirectory    = 'images/shared/'.$placeId;
	if (!file_exists($UploadDirectory))
		mkdir($UploadDirectory);   

    $File_Name          = strtolower($_FILES['filephoto']['name']);
    $File_Ext           = substr($File_Name, strrpos($File_Name, '.')); //get file extention
    $Random_Number      = rand(); //Random number to be added to name.
    $NewFileName        = $Random_Number.$File_Ext; //new file name
    
    if(move_uploaded_file($_FILES['filephoto']['tmp_name'], $UploadDirectory.'/'.$NewFileName )){
		//$image = new Photos();
		echo $source = $UploadDirectory.'/'.$NewFileName;
		$connect->rotateImages($source);
		//$htp = $UploadDirectory.'/test.jpg';
		//copy('http://tabluu.com/tempfile/'.$NewFileName,$htp);
		//$image->load($htp);
		//$image->save($htp,$image->image_type); 
		//echo 'http://tabluu.com/tempfile/'.$NewFileName;
		//echo $img = $UploadDirectory.'/'.$NewFileName;
		//unlink('images/tempPhoto/'.$NewFileName);
    }
 
}
if(isset($_FILES["fileselfie"]))
{

	$placeId = $_REQUEST['selfieId'];
    $UploadDirectory    = 'images/shared/'.$placeId;
	if (!file_exists($UploadDirectory))
		mkdir($UploadDirectory);   

    $File_Name          = strtolower($_FILES['fileselfie']['name']);
    $File_Ext           = substr($File_Name, strrpos($File_Name, '.')); //get file extention
    $Random_Number      = rand(); //Random number to be added to name.
    $NewFileName        = $Random_Number.$File_Ext; //new file name
    
    if(move_uploaded_file($_FILES['fileselfie']['tmp_name'], $UploadDirectory.'/'.$NewFileName )){
		$image = new Photos();
		$source = $UploadDirectory.'/'.$NewFileName;
		//copy($domain.$source,$source);
		$image->load($source);
		$image->save($source,$image->image_type);
        echo $img = $UploadDirectory.'/'.$NewFileName;
    }
 
}
if(isset($_FILES["filebackground"]))
{

	$placeId = $_REQUEST['placeIdbackground'];
    $UploadDirectory    = 'images/profile/'.$placeId;
	if (!file_exists($UploadDirectory))
		mkdir($UploadDirectory);   

    $File_Name          = strtolower($_FILES['filebackground']['name']);
    $File_Ext           = substr($File_Name, strrpos($File_Name, '.')); //get file extention
    $Random_Number      = rand(); //Random number to be added to name.
    $NewFileName        = $Random_Number.$File_Ext; //new file name
    
    if(move_uploaded_file($_FILES['filebackground']['tmp_name'], $UploadDirectory.'/'.$NewFileName )){
        $img = $UploadDirectory.'/'.$NewFileName;
		$obj = (object) array('bckimage' => $img);
		echo json_encode($obj);
		mysql_query('UPDATE businessCustom SET backgroundImg = '."'". json_encode($obj) ."'" .' WHERE customPlaceId = '. $placeId);
    }else{
        die('error uploading File!');
    }
    
}

if(isset($_FILES["filelogo"]))
{

	$placeId = $_REQUEST['placeIdLogo'];
    $UploadDirectory    = 'images/profile/'.$placeId;
	if (!file_exists($UploadDirectory))
		mkdir($UploadDirectory);   

    $File_Name          = strtolower($_FILES['filelogo']['name']);
    $File_Ext           = substr($File_Name, strrpos($File_Name, '.')); //get file extention
    $Random_Number      = rand(); //Random number to be added to name.
    $NewFileName        = $Random_Number.$File_Ext; //new file name
    
    if(move_uploaded_file($_FILES['filelogo']['tmp_name'], $UploadDirectory.'/'.$NewFileName )){
        $img = $UploadDirectory.'/'.$NewFileName;
		$image = new Photos();
		$image->load($img);
		if($image->getWidth() > 600 || $image->getHeight() > 600){
			echo 'greater';
			unlink($img);
			die();
		}
		if($image->image_type == 1)
			$extn = '.gif';
		else if($image->image_type == 2)
			$extn = '.jpg';
		else if($image->image_type == 3)
			$extn = '.png';
		$source = $UploadDirectory.'/desktop_'.$NewFileName;	
		$sourceIp = $UploadDirectory.'/iphone_'.$NewFileName;
		$source7 = $UploadDirectory.'/7Ins_'.$NewFileName;
		$sourceM = $UploadDirectory.'/mobile_'.$NewFileName;

		copy($img,$source);
		copy($img,$sourceIp);
		copy($img,$source7);
		copy($img,$sourceM);	

	  
		// desktop or tablet
		$image->load($source);
		//  7 inches
		$image->load($source7);
		$image->scale(76);
		$image->save($source7,$image->image_type);
		// s4
		$image->load($sourceM);
		$image->scale(44);
		$image->save($sourceM,$image->image_type);
		//mobile
		$image->load($sourceIp);
		$image->scale(35);
		$image->save($sourceIp,$image->image_type);

		$obj = (object) array('dLogo' => $source, 'pLogo' => $sourceIp, 'logo7' => $source7, 'mLogo' => $sourceM);
		echo json_encode($obj);
		mysql_query('UPDATE businessCustom SET logo = '."'". json_encode($obj) ."'" .' WHERE customPlaceId = '. $placeId);
    }else{
        die('error uploading File!');
    }
    
}
if(isset($_FILES["fileweb"]))
{
    $placeId = $_REQUEST['placeidweb'];
	$name = $_REQUEST['typeweb'];
	$imgdesc = $_REQUEST['imgdesc'];
	$imgtitle = $_REQUEST['imgtitle'];
    $UploadDirectory    = 'images/profile/'.$placeId;
	if (!file_exists($UploadDirectory))
		mkdir($UploadDirectory);
    

    $File_Name          = strtolower($_FILES['fileweb']['name']);
    $File_Ext           = substr($File_Name, strrpos($File_Name, '.')); //get file extention
    $Random_Number      = rand(); //Random number to be added to name.
    $NewFileName        = $Random_Number.$File_Ext; //new file name
     $path = $UploadDirectory.'/'.$NewFileName;
		
		if(move_uploaded_file($_FILES['fileweb']['tmp_name'], $UploadDirectory.'/'.$NewFileName )){
			echo $img = $UploadDirectory.'/'.$NewFileName;
			$result = mysql_query("SELECT id,name FROM businessImages WHERE placeId = $placeId AND name = '$name' LIMIT 1") or die(mysql_error());
			if(mysql_num_rows($result)){
				$row = mysql_fetch_object($result);
				mysql_query("UPDATE businessImages SET path= '$path',title='$imgtitle',description='$imgdesc' WHERE id = $row->id") or die(mysql_error());
			}else{
				mysql_query("INSERT INTO businessImages (placeId,path,title,description,name) VALUES($placeId,'$path','$imgtitle','$imgdesc','$name')") or die(mysql_error());
			}
/*			if($row->webImg == '')
				$sql = "UPDATE businessPhotos SET webImg= '$img' WHERE photoPlaceId = $placeId";
			else if($row->webImg2 == '')
				$sql = "UPDATE businessPhotos SET webImg2= '$img' WHERE photoPlaceId = $placeId";
			else if($row->webImg3 == '')
				$sql = "UPDATE businessPhotos SET webImg3= '$img' WHERE photoPlaceId = $placeId";
			else if($row->webImg4 == '')
				$sql = "UPDATE businessPhotos SET webImg4= '$img' WHERE photoPlaceId = $placeId";
			else if($row->webImg5 == '')
				$sql = "UPDATE businessPhotos SET webImg5= '$img' WHERE photoPlaceId = $placeId";
			else if($row->webImg6 == '')
				$sql = "UPDATE businessPhotos SET webImg6= '$img' WHERE photoPlaceId = $placeId";
			else if($row->webImg7 == '')
				$sql = "UPDATE businessPhotos SET webImg7= '$img' WHERE photoPlaceId = $placeId";
			else if($row->webImg8 == '')
				$sql = "UPDATE businessPhotos SET webImg8= '$img' WHERE photoPlaceId = $placeId";				
			mysql_query($sql); */
		}else{
			die('error uploading File!');
		}
    
}
 class Photos{
 
   var $image;
   var $image_type;
 
   function load($filename) {
 
      $image_info = getimagesize($filename);
      $this->image_type = $image_info[2];
      if( $this->image_type == 2 ) { // jpg
         $this->image = imagecreatefromjpeg($filename);
      } elseif( $this->image_type == 1 ) { //gif
         $this->image = imagecreatefromgif($filename);
      } elseif( $this->image_type == 3 ) { //png
         $this->image = imagecreatefrompng($filename);
      }

   }
   function save($filename, $image_type=2, $compression=80, $permissions=null) {
 
      if( $image_type == 2 ) { //jpg
		$exif = exif_read_data($filename);
		$ort=1;
		if(isset($exif['Orientation']))
			$ort = $exif['Orientation'];
		if($ort == 3)
			$this->image = imagerotate($this->image, 180, -1);
		else if($ort == 5 || $ort == 6 || $ort == 7)
			$this->image = imagerotate($this->image, -90, -1);
		else if($ort == 8)
			$this->image = imagerotate($this->image, 90, -1);	  
        imagejpeg($this->image,$filename);
		//imagejpeg($this->image,$filename,$compression);
      } elseif( $image_type == 1 ) { //gif
         imagegif($this->image,$filename);
      } elseif( $image_type == 3 ) { //png
         imagepng($this->image,$filename);
      }
      if( $permissions != null) {
         chmod($filename,$permissions);
      }
   }
   function output($image_type=2) {
 
      if( $image_type == 2 ) {
         imagejpeg($this->image);
      } elseif( $image_type == 1 ) {
         imagegif($this->image);
      } elseif( $image_type == 3 ) {
         imagepng($this->image);
      }
   }
   function getWidth() {
      return imagesx($this->image);
   }
   function getHeight() {
      return imagesy($this->image);
   }
   function resizeToHeight($height) {
      $ratio = $height / $this->getHeight();
      $width = $this->getWidth() * $ratio;
      $this->resize($width,$height);
   }
 
   function resizeToWidth($width) {
      $ratio = $width / $this->getWidth();
      $height = $this->getHeight() * $ratio;
      $this->resize($width,$height);
   }
 
   function scale($scale) {
      $width = $this->getWidth() * $scale/100;
      $height = $this->getHeight() * $scale/100;
      $this->resize($width,$height);
   }
 
   function resize($width,$height) {
		if($this->image_type == 1){	//gif
			$new_image = imagecreatetruecolor($width, $height);	  
			imagecolortransparent($new_image, imagecolorallocate($new_image, 0, 0, 0));	
			imagecopyresampled($new_image, $this->image, 0, 0, 0, 0, $width, $height, $this->getWidth(), $this->getHeight());
			$this->image = $new_image; 
        }else{		
			$newImg = imagecreatetruecolor($width, $height);	
			imagealphablending($newImg, false);
			imagesavealpha($newImg,true);
			$transparent = imagecolorallocatealpha($newImg, 255, 255, 255, 127);
			imagefilledrectangle($newImg, 0, 0, $width, $height, $transparent);
			imagecopyresampled($newImg, $this->image, 0, 0, 0, 0, $width, $height, $this->getWidth(), $this->getHeight());	
			$this->image = $newImg;
        } 		
   }
} 
$connect->db_disconnect();
?>
