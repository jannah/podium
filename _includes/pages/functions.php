require_once('_includes/classes/class.database.php');

function add($action) { 
	echo $action.' add function is working'; //Just to test 
}; 

if(isset($_GET['action'])){
	$action = $_GET['action'];

	add($action);
}