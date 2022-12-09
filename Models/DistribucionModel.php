
<?php 

class DistribucionModel extends Mysql
{
	public function __construct()
	{
		parent::__construct();
	}

	public function seleccionPedidos(){
		$fecha= date('Y-m-d');
		$fechastring=strval($fecha);
		$sql = "SELECT p.idpedido,
				p.personaid,
				p.direccion_envio,
				DATE_FORMAT(p.fecha, '%d/%m/%Y') as fecha,
				p.monto,
				p.status,
				p.personaid,
				p.latitud,
				p.longitud,
				per.nombres,
				per.apellidos,
				per.telefono
		FROM pedido p 
		INNER JOIN persona per
		ON p.personaid = per.idpersona 
		where
		`fecha` like '$fechastring%' ";
		$request = $this->select_all($sql);
		return $request;


	}

	public function obtenerproductos($idpedido){
		$sql = "SELECT dp.*,
				pro.nombre

		FROM detalle_pedido dp 
		INNER JOIN producto pro
		ON dp.productoid = pro.idproducto
		where dp.pedidoid=$idpedido  ";
		$request = $this->select_all($sql);
		return $request;

	}





}


?>