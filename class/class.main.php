<?php
require_once('db_config.php');
class db{
    
    private $db_host =  HOST;
	private $db_user =  DB_USER;
	private $db_pass =  DB_PASS;
	private $db_name =	DB_NAME;
	public $xmluser = 'bd16cl1ppL4dlfLGEyUH'; //username xml access user subscriptions to chargify.com
    public $xmlpwd = 'x'; //pwd xml access user subscriptions to chargify.com
	public $aws_access_key_id ="AKIAITTJTNGQSODBXOJQ";
	public $aws_secret_key = "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";
    public $freever = 3356308;//3602345;
	public $enterprise12 = 3410620; //3602787; 
	public $basicID=3356305; public $proID=3356306; public $proplusID =3356316;
    public $chargifydomain = 'tabluu';
	public $dbcon = false;
	public $path = '';//'../staging/';
	public function db_connect(){ 	
		if(!$this->dbcon){  
			$mydbconn = @mysql_connect($this->db_host,$this->db_user,$this->db_pass);  
			mysql_query("SET character_set_results=utf8", $mydbconn);
			if($mydbconn)
			{
				mb_language('uni');
				mb_internal_encoding('UTF-8');
				$select_db_name = @mysql_select_db($this->db_name,$mydbconn);  
				mysql_query("set names 'utf8'",$mydbconn);
				
				if($select_db_name)  
				{  
					$this->dbcon = true;  
					return true;  
				} else  
					die("Unable to connect to database name"); 
				 
			} else  
				die("Unable to connect mysql");
			  
		} 
								
		//mysql_select_db(DATABASE, $dbLink);
		//mysql_query("set names 'utf8'",$dbLink);
	//return $mydbconn;
	}  
    		
        public function db_disconnect(){
			if($this->dbcon)  
			{  
				if(mysql_close())  
				{  
					$this->dbcon = false;  
					return true;  
				}  
				else  
					die("cannot disconnect db");  
				
			}  
		}
		public function tableIsExist($table){
			return mysql_num_rows(mysql_query("SHOW TABLES LIKE '$table'"));
		} 
		
		public function rotateImages($filename){
			$image_info = getimagesize($filename);
			  $image_type = $image_info[2];
			  if( $image_type == 2 ) { // jpg
				 $image = imagecreatefromjpeg($filename);
			  } elseif( $image_type == 1 ) { //gif
				 $image = imagecreatefromgif($filename);
			  } elseif( $image_type == 3 ) { //png
				 $image = imagecreatefrompng($filename);
			  }
			if( $image_type == 2 ) { //jpg
				$exif = exif_read_data($filename);
				$ort=1;
				if(isset($exif['Orientation']))
					$ort = $exif['Orientation'];
				if($ort == 3)
					$image = imagerotate($image, 180, -1);
				else if($ort == 5 || $ort == 6 || $ort == 7)
					$image = imagerotate($image, -90, -1);
				else if($ort == 8)
					$image = imagerotate($image, 90, -1);	  
				imagejpeg($image,$filename);
				//imagejpeg($image,$filename,$compression);
			  } elseif( $image_type == 1 ) { //gif
				 imagegif($image,$filename);
			  } elseif( $image_type == 3 ) { //png
				 imagepng($image,$filename);
			  }	  
			  return;
		}
}
class fucn extends db{
	public function exportCSV($date1,$date2,$placeId,$fields){
		$this->db_connect();
		//SELECT `rated1`, `rated2`, `aveRate`, `comment`, `userName` , `source`, `date` FROM businessplace_1285 WHERE `date` BETWEEN '2014-06-29 00:00:00' AND '2014-06-29 12:00:00' 
		$sql = "SELECT $fields FROM businessplace_$placeId WHERE `date` BETWEEN '$date1 00:00:00' AND '$date2 23:59:59' ORDER BY id DESC";
		$result = mysql_query($sql);
		$this->db_disconnect();
		return $result;
	}
	
	public function sendRequest($url, $format = 'xml', $method = 'GET', $data = '') {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); 
		curl_setopt($ch, CURLOPT_URL,"https://" . $this->chargifydomain . ".chargify.com" . $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_TIMEOUT, 4);
		$format = strtolower($format);
		if($format == 'json')
			$headertype = array('Content-Type: text/json','Accept: text/json');
		else if($format == 'xml')
			$headertype = array('Content-Type: text/xml','Accept: text/xml');	
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headertype);
		curl_setopt($ch, CURLOPT_USERPWD, $this->xmluser . ':' . $this->xmlpwd);
		$method = strtoupper($method);
		if($method == 'POST'){
			curl_setopt($ch, CURLOPT_POST, true);	
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data); 
		}else if ($method == 'PUT'){
	        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
	        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        }else if($method != 'GET'){
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
		}
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		$result = new StdClass();
		$result->response = curl_exec($ch);
		$result->code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		//$result->meta = curl_getinfo($ch);
		curl_close($ch);	
		return ($result);
	}
	
	public function select($table,$field,$query){
		$this->db_connect();
		
		$sql = "SELECT $field FROM $table WHERE $query";
		$result = mysql_query($sql);
		$this->db_disconnect();
		return $result;
	}
	public function delete_dir($src) { 
		if (file_exists($src)){
			$dir = opendir($src);
			while(false !== ( $file = readdir($dir)) ) { 
				if (( $file != '.' ) && ( $file != '..' )) { 
					if ( is_dir($src . '/' . $file) ) { 
						delete_dir($src . '/' . $file); 
					} 
					else { 
						unlink($src . '/' . $file); 
					} 
				} 
			} 
			rmdir($src);
			closedir($dir); 
		}
	} 
   public function rand_string( $length ) {
	$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";	
	$str = '';
	$size = strlen( $chars );
	for( $i = 0; $i < $length; $i++ ) {
		$str .= $chars[ rand( 0, $size - 1 ) ];
	}

	return $str;
   }
	public function getCurrentComponentId($product){
	/*
	//live mode chargify ids
	$everFree = 3356308;$basicID=3356305;$basic12 = 3405343;$basic24 = 3405344;$proID=3356306;$pro12 = 3405345;$pro24 = 3405346;$enterprise=3356316;$enterprise12 =3410620;$enterprise24 = 3410619; 
	//live component chargify ids
	$com_basicID=26331;$com_basic12 = 39047;$com_basic24 = 39048;$com_proID=26332;$com_pro12 = 39050;$com_pro24 = 39051;$com_enterprise=26333;$com_enterprise12 =39053;$com_enterprise24 =39054; */

	//test mode chargify ids
	$everFree = 3602345;$basicID=3361656;$basic12 = 3602785;$basic24 = 3602788;$proID=3361672;$pro12 = 3602786;$pro24 = 3602789;$enterprise=3602346;$enterprise12 =3602787;$enterprise24 = 3602790; 
	//test component chargify ids
	$com_basicID=27367;$com_basic12 = 69598;$com_basic24 = 69599;$com_proID=27368;$com_pro12 = 69600;$com_pro24 = 69601;$com_enterprise=69597;$com_enterprise12 =69602;$com_enterprise24 =69603; 
		$id=0;
		if($product == $basicID){
			$id = $com_basicID;
		}else if($product == $proID){
			$id = $com_proID;
		}else if($product == $enterprise){
			$$id = $com_enterprise;
		}else if($product == $basic12){
			$id = $com_basic12;
		}else if($product == $basic24){
			$id = $com_basic24;
		}else if($product == $pro12){
			$id = $com_pro12;
		}else if($product == $pro24){
			$id = $com_pro24;
		}else if($product == $enterprise12){
			$id = $com_enterprise12;
		}else if($product == $enterprise24){
			$id = $com_enterprise24;
		} 
		return $id;
	}   
}

?>