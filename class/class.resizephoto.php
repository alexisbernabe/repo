<?php
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
      $height = $this->getheight() * $ratio;
      $this->resize($width,$height);
   }
 
   function scale($scale) {
      $width = $this->getWidth() * $scale/100;
      $height = $this->getheight() * $scale/100;
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
?>
