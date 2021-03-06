<?php

/****************************** * Open a Connection to MySQL * ******************************/
function openDB($database="530145", $password=NULL, $username="root", $servername="localhost"){
// Create connection
$conn = mysqli_connect($servername, $username, $password, $database); 
if (!$conn) die("Connection failed: ".mysqli_connect_error());
   return $conn;
}

/****************************** * Lettura dei records * ******************************/
function select($conn,$sql){
// Esecuzione query
$resultSet = mysqli_query($conn, $sql);
if(!$resultSet) print("Errore esecuzione $sql:" . mysqli_error());
// Copio i records in un array associativo
while($rec=mysqli_fetch_assoc($resultSet)) $records[]=$rec;
// Liberazione della memoria impegnata dal result set mysqli_free_result($resultSet);
   return $records;
}

/******************************
 * Close the Connection to MySQL *
 ******************************/
 function closeDB ($conn){
   mysqli_close($conn);
}

?>