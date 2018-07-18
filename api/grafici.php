<?php	
		header('Content-Type: application/json');//prendere il json 
		include('config.php');//si collega al file di configurazione
	 
		
			$tabella=$_GET['tab'];
			$anno=$_GET['anno'];
			if(($tabella=='agricoltura' || $tabella=='industria' || $tabella=='servizi' ) && ($anno=='1995' ||$anno=='2000' ||$anno=='2005' ||$anno=='2010' ||$anno=='2015' )){
				$risultati=select($db,"SELECT DISTINCT perc AS 'PR', $tabella.country AS 'naz', gii * 100 AS 'gii' FROM $tabella JOIN indicedisug ON indicedisug.country = $tabella.country WHERE $tabella.anno = $anno AND perc > 0 AND gii > 0 AND indicedisug.anno = $anno ORDER BY gii ASC"); 
			}
			else if (($tabella=='numseggi') && ($anno=='1995' ||$anno=='2000' ||$anno=='2005' ||$anno=='2010' ||$anno=='2015' )){
				$risultati=select($db,"SELECT DISTINCT perc AS 'PR', numseggi.country AS 'naz', gii * 100 AS 'gii' FROM numseggi JOIN indicedisug ON indicedisug.country = numseggi.country WHERE numseggi.anno = $anno AND perc > 30 AND gii > 0 AND indicedisug.anno = $anno ORDER BY gii ASC"); 
			}

			echo json_encode($risultati);
	
?>