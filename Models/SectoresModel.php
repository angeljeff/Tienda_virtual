<?php 

	class SectoresModel extends Mysql
	{
		public $intIdsector;
		public $strSector;
		public $strDescripcion;
		public $precio;
		public $estado;

		public function __construct()
		{
			parent::__construct();
		}

		public function inserSector(string $nombre, string $descripcion, float $precio){

			$return = 0;
			$this->strSector = $nombre;
			$this->strDescripcion = $descripcion;
			$this->precio = $precio;
			$this->estado = 1;

			$sql = "SELECT * FROM sectores WHERE sector = '{$this->strSector}' ";
			$request = $this->select_all($sql);

			if(empty($request))
			{
				$query_insert  = "INSERT INTO sectores(sector,descripcion_s, precio_sector, estado) VALUES(?,?,?,?)";
	        	$arrData = array($this->strSector, 
								 $this->strDescripcion, 
								 $this->precio,
								 $this->estado);
	        	$request_insert = $this->insert($query_insert,$arrData);
	        	$return = $request_insert;
			}else{
				$return = "exist";
			}
			return $return;
		}

		public function selectSectores()
		{
			$sql = "SELECT * FROM sectores 
					WHERE estado != 0 ";
			$request = $this->select_all($sql);
			return $request;
		}



		public function selectSector(int $idsector){
			$this->intIdsector = $idsector;
			$sql = "SELECT * FROM sectores
					WHERE idsectores = $this->intIdsector";
			$request = $this->select($sql);
			return $request;
		}

		public function updateSector(int $idsector, string $nombre, string $descripcion,  float $precio){
			$this->intIdsector = $idsector;
			$this->strSector = $nombre;
			$this->strDescripcion = $descripcion;
			$this->precio = $precio;

			$sql = "SELECT * FROM sectores WHERE sector = '{$this->strSector}' AND idsectores != $this->intIdsector";
			$request = $this->select_all($sql);

			if(empty($request))
			{
				$sql = "UPDATE sectores SET sector = ?, descripcion_s = ?,  precio_sector = ? WHERE idsectores = $this->intIdsector ";
				$arrData = array($this->strSector, 
								 $this->strDescripcion,  
								 $this->precio);
				$request = $this->update($sql,$arrData);
			}else{
				$request = "exist";
			}
		    return $request;			
		}

		public function deleteSector(int $idsector)
		{
			$this->intIdsector = $idsector;
			$this->estado = 0;
			// $sql = "SELECT * FROM producto WHERE categoriaid = $this->intIdcategoria";
			// $request = $this->select_all($sql);
			// if(empty($request))
			// {
				$sql = "UPDATE sectores SET estado = ? WHERE idsectores = $this->intIdsector ";
				$arrData = array(0);
				$request = $this->update($sql,$arrData);
				if($request)
				{
					$request = 'ok';	
				}else{
					$request = 'error';
				}
			// }else{
			// 	$request = 'exist';
			// }
			return $request;
		}	

		public function getCategoriasFooter(){
			$sql = "SELECT idcategoria, nombre, descripcion, portada, ruta
					FROM categoria WHERE  status = 1 AND idcategoria IN (".CAT_FOOTER.")";
			$request = $this->select_all($sql);
			if(count($request) > 0){
				for ($c=0; $c < count($request) ; $c++) { 
					$request[$c]['portada'] = BASE_URL.'/Assets/images/uploads/'.$request[$c]['portada'];		
				}
			}
			return $request;
		}


	}
 ?>