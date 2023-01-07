<?php
	class Sectores extends Controllers{
		public function __construct()
		{
			parent::__construct();
			session_start();
			//session_regenerate_id(true);
			if(empty($_SESSION['login']))
			{
				header('Location: '.base_url().'/login');
				die();
			}
			getPermisos(MSECTORES);
		}

		public function Sectores()
		{
			if(empty($_SESSION['permisosMod']['r'])){
				header("Location:".base_url().'/dashboard');
			}
			$data['page_tag'] = "Sectores";
			$data['page_title'] = "SECTORES <small>Tienda Virtual</small>";
			$data['page_name'] = "sectores";
			$data['page_functions_js'] = "functions_sectores.js";
			$this->views->getView($this,"sectores",$data);
		}

		public function setSectores(){
			if($_POST){
				if(empty($_POST['txtNombre']) || empty($_POST['txtDescripcion']) || empty($_POST['txtPrecio']) )
				{
					$arrResponse = array("status" => false, "msg" => 'Datos incorrectos.');
				}else{
					
					$intIdsector = intval($_POST['idSector']);
					$strSector =  strClean($_POST['txtNombre']);
					$strDescipcion = strClean($_POST['txtDescripcion']);
					$precio = $_POST['txtPrecio'];

					$ruta = strtolower(clear_cadena($strSector));
					$ruta = str_replace(" ","-",$ruta);
					$request_cateria = "";
					if($intIdsector == 0)
					{
						//Crear
						if($_SESSION['permisosMod']['w']){
							$request_cateria = $this->model->inserSector($strSector, $strDescipcion,$precio);
							$option = 1;
						}
					}else{
						//Actualizar
						if($_SESSION['permisosMod']['u']){

							$request_cateria = $this->model->updateSector($intIdsector,$strSector, $strDescipcion, $precio);
							$option = 2;
						}
					}
					if($request_cateria > 0 )
					{
						if($option == 1)
						{
							$arrResponse = array('status' => true, 'msg' => 'Datos guardados correctamente.');
							
						}else{
							$arrResponse = array('status' => true, 'msg' => 'Datos Actualizados correctamente.');
						}
					}else if($request_cateria == 'exist'){
						$arrResponse = array('status' => false, 'msg' => '¡Atención! El sector ya existe.');
					}else{
						$arrResponse = array("status" => false, "msg" => 'No es posible almacenar los datos.');
					}
				}
				echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
			}
			die();
		}

		public function getSectores()
		{
			if($_SESSION['permisosMod']['r']){
				$arrData = $this->model->selectSectores();
				for ($i=0; $i < count($arrData); $i++) {
					$btnView = '';
					$btnEdit = '';
					$btnDelete = '';

					if($arrData[$i]['estado'] == 1)
					{
						$arrData[$i]['estado'] = '<span class="badge badge-success">Activo</span>';
					}else{
						$arrData[$i]['estado'] = '<span class="badge badge-danger">Inactivo</span>';
					}

					if($_SESSION['permisosMod']['r']){
						$btnView = '<button class="btn btn-info btn-sm" onClick="fntViewInfo('.$arrData[$i]['idsectores'].')" title="Ver sector"><i class="far fa-eye"></i></button>';
					}
					if($_SESSION['permisosMod']['u']){
						$btnEdit = '<button class="btn btn-primary  btn-sm" onClick="fntEditInfo(this,'.$arrData[$i]['idsectores'].')" title="Editar Sector"><i class="fas fa-pencil-alt"></i></button>';
					}
					// if($_SESSION['permisosMod']['d']){	
					// 	$btnDelete = '<button class="btn btn-danger btn-sm" onClick="fntDelInfo('.$arrData[$i]['idsectores'].')" title="Eliminar sector"><i class="far fa-trash-alt"></i></button>';
					// }
					$arrData[$i]['options'] = '<div class="text-center">'.$btnView.' '.$btnEdit.'</div>';
				}
				echo json_encode($arrData,JSON_UNESCAPED_UNICODE);
			}
			die();
		}


		
		public function obtenerSectores()
		{
			if($_SESSION['permisosMod']['r']){
				$arrData = $this->model->selectSectores();
				echo json_encode($arrData,JSON_UNESCAPED_UNICODE);
			}
			die();
		}

		public function getSector($idsector)
		{
			if($_SESSION['permisosMod']['r']){
				$intIdsector = intval($idsector);
				if($intIdsector > 0)
				{
					$arrData = $this->model->selectSector($intIdsector);
					if(empty($arrData))
					{
						$arrResponse = array('status' => false, 'msg' => 'Datos no encontrados.');
					}else{
						$arrResponse = array('status' => true, 'data' => $arrData);
					}
					echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
				}
			}
			die();
		}

		public function delSector()
		{
			if($_POST){
				if($_SESSION['permisosMod']['d']){
					$intIdsector = intval($_POST['idsectores']);
					$requestDelete = $this->model->deleteSector($intIdsector);
					if($requestDelete == 'ok')
					{
						$arrResponse = array('status' => true, 'msg' => 'Se ha eliminado el sector');
					}else if($requestDelete == 'exist'){
						$arrResponse = array('status' => false, 'msg' => 'No es posible eliminar este sector.');
					}else{
						$arrResponse = array('status' => false, 'msg' => 'Error al eliminar el sector.');
					}
					echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
				}
			}
			die();
		}

		public function getSelectSectores(){
			$htmlOptions = "";
			$arrData = $this->model->selectSectores();
			if(count($arrData) > 0 ){
				for ($i=0; $i < count($arrData); $i++) { 
					if($arrData[$i]['estado'] == 1 ){
					$htmlOptions .= '<option value="'.$arrData[$i]['idsectores'].'">'.$arrData[$i]['sector'].'</option>';
					}
				}
			}
			echo $htmlOptions;
			die();	
		}

	}


 ?>