<?php	
		header('Content-Type: application/json');//prendere il json 
		include('config.php');//si collega al file di configurazione
	 
			$indice=$_GET['status'];
		    if ($indice=='ffl') {
			$risultati=select($db,"SELECT iso2, val AS 'valore' FROM disuglav JOIN nazioni ON code = iso3 WHERE indice = '$indice'"); 
			} else if ($indice=='gii') {
			$risultati=select($db,"SELECT iso2, val * 100 AS 'valore' FROM disuglav JOIN nazioni ON code = iso3 WHERE indice = '$indice' AND val > 0"); 
			}
		
			echo json_encode($risultati);
	
?>