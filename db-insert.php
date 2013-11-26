<?php
echo("starting insert\n");
$q = $_GET['q'];
echo($q);
$con = mysqli_connect("localhost","jannah","podiumapp","jannah");
/*
 if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }
*/
echo ("\r\nconnection open\r\n'");
//echo ($con);

try{
    mysqli_select_db($con,"jannah");
    mysqli_query($con,$q);
    mysqli_close($con);
echo ("Inserted\r\n");
}catch(Exception $e)
{
    echo("Error\r\n");
    echo ($e);
}
echo ("\r\ndone");
 
function debug_to_console($data) {
    if(is_array($data) || is_object($data))
	{
		echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
	} else {
		echo("<script>console.log('PHP: ".$data."');</script>");
	}
}
?>