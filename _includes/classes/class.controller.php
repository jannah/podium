<?php
	define( 'ROOT_DIR', dirname(__FILE__) );

	//import classes
	require(ROOT_DIR.'/class.database.php');
	
	class Controller
	{	
		function __construct()
		{	
			$this->sessionDefaults();
		}
		
		public function sessionDefaults()
		{
			if(!isset($_SESSION['user']))
				$_SESSION['user'] = null;
		}
		
		public function setLoggedIn($bool, $user)
		{
			$_SESSION['loggedin'] = $bool;
			
			if($bool)
			{
				$_SESSION['uid'] = $user->get("uid");
				$_SESSION['user'] = $user;
			}
			else
			{
				$_SESSION['uid'] = 0;
				$_SESSION['user'] = null;
			}
		}
		
		public function getUserID()
		{
			return $_SESSION['uid'];
		}
		
		public function get($field)
		{
			switch($field)
			{
				default:
					return $this->$field;
				break;
			}
		}
		
		public function set($field, $value)
		{
			switch($field)
			{
				default:    
					$this->$field = $value;
				break;
			}
		}
	}
?>