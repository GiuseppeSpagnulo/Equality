<?php	
		header('Content-Type: application/json');//prendere il json 
		include('config.php');//si collega al file di configurazione
	 
		
			$tabella=$_GET['tab'];


if ($tabella=='indicedisug'){
				$risultati=select($db, "SELECT perc as 'PR', numseggi.anno AS 'periodo', gii * 100 AS 'gii' FROM indicedisug JOIN numseggi ON indicedisug.country = numseggi.country WHERE numseggi.country= 'Rwanda' AND numseggi.anno = indicedisug.anno");
			}

            echo json_encode($risultati);
	
?>