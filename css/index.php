<?php
session_start();
if($_SESSION['UserID'] != "")
{
	header("Location: ../../index.php");  
}
else
{
	session_destroy(); 
	header("Location: ../../NoAccess.php"); 
	exit; 
}
?>