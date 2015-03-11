<?php
if (strstr($_SERVER['REQUEST_URI'], 'app'))
	$folde = '/app/';
else
	$folde = '/staging/';
	
$cookiedomain = ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false; 
          
define( 'COOKIE_DOMAIN', $cookiedomain ); 
define( 'COOKIE_PATH', $folde ); 
define( 'COOKIE_AUTH', 'auth' ); 
define( 'SECRET_KEY', 'dk;l(-@894!851é|#' ); 

class cookie { 
     
    public function setCookie( $id ) { 
        $expiration = time() + 60*60*24*30; // 30 days to expired
        $cookie = $this->generateCookie( $id, $expiration ); 

        if ( !setcookie( COOKIE_AUTH, $cookie, $expiration, COOKIE_PATH, COOKIE_DOMAIN, true, true ) ) { 
         
            throw new AuthException( "Could not set cookie." ); 
         
        } 

    } 
     
    private function generateCookie( $id, $expiration ) { 

        $key = hash_hmac( 'md5', $id . $expiration, SECRET_KEY ); 
        $hash = hash_hmac( 'md5', $id . $expiration, $key ); 

        $cookie = $id . '|' . $expiration . '|' . $hash; 

        return $cookie; 

    } 

    public function logOut( ) { 

        setcookie( COOKIE_AUTH, "", time() - 1209600, COOKIE_PATH, COOKIE_DOMAIN, false, true ); 

    } 

    public function validateAuthCookie() { 

        if ( empty($_COOKIE[COOKIE_AUTH]) ) 
            return false; 

        list( $id, $expiration, $hmac ) = explode( '|', $_COOKIE[COOKIE_AUTH] ); 

        if ( $expiration < time() ) 
            return false; 

        $key = hash_hmac( 'md5', $id . $expiration, SECRET_KEY ); 
        $hash = hash_hmac( 'md5', $id . $expiration, $key ); 

        if ( $hmac != $hash ) 
           return false; 

        return true; 

    } 

    public function getUserId() { 

        list( $id, $expiration, $hmac ) = explode( '|', $_COOKIE[COOKIE_AUTH] ); 

        return $id; 

    } 

} 
?>