<?php 
	const BASE_URL = "http://localhost:8080/tienda_virtual";
	//const BASE_URL = "https://avilupe.com/tiendavirtual";

	//Zona horaria
	date_default_timezone_set('America/Guayaquil');

	//Datos de conexión a Base de Datos
	const DB_HOST = "localhost";
	const DB_NAME = "db_tiendavirtual";
	const DB_USER = "root";
	const DB_PASSWORD = "";
	const DB_CHARSET = "utf8";

	//Para envío de correo
	const ENVIRONMENT = 1; // Local: 0, Produccón: 1;

	//Deliminadores decimal y millar Ej. 24,1989.00
	const SPD = ".";
	const SPM = ",";

	//Simbolo de moneda
	const SMONEY = "$";
	const CURRENCY = "USD";

	//Api PayPal
	//SANDBOX PAYPAL
	const URLPAYPAL = "https://api-m.sandbox.paypal.com";
	const IDCLIENTE = "";
	const SECRET = "";
	//LIVE PAYPAL
	//const URLPAYPAL = "https://api-m.paypal.com";
	//const IDCLIENTE = "";
	//const SECRET = "";

	//Datos envio de correo
	const NOMBRE_REMITENTE = "Tienda Virtual Avicola";
	const EMAIL_REMITENTE = "no-marcillokenny@gmail.com";
	const NOMBRE_EMPESA = "Tienda Virtual Avilupe";
	const WEB_EMPRESA = "www.uagraria.edu.ec";

	const DESCRIPCION = "La mejor tienda en línea con productos avicolas.";
	const SHAREDHASH = "TiendaVirtual";

	//Datos Empresa
	const DIRECCION = "Av. 25 de Julio, Guayaquil 090104";
	const TELEMPRESA = "+(593)59254811";
	const WHATSAPP = "+59359254811";
	const EMAIL_EMPRESA = "marcillokenny@gmail.com.com";
	const EMAIL_PEDIDOS = "marcillokenny@gmail.com"; 
	const EMAIL_SUSCRIPCION = "marcillokenny@gmail.com";
	const EMAIL_CONTACTO = "marcillokenny@gmail.com";

	const CAT_SLIDER = "1,2,3";
	const CAT_BANNER = "4,5,6";
	const CAT_FOOTER = "1,2,3,4,5";

	//Datos para Encriptar / Desencriptar
	const KEY = 'abelosh';
	const METHODENCRIPT = "AES-128-ECB";

	//Envío
	const COSTOENVIO = 5;

	//Módulos
	const MDASHBOARD = 1;
	const MUSUARIOS = 2;
	const MCLIENTES = 3;
	const MPRODUCTOS = 4;
	const MPEDIDOS = 5;
	const MCATEGORIAS = 6;
	const MSUSCRIPTORES = 7;
	const MDCONTACTOS = 8;
	const MDPAGINAS = 9;
	const MDDISTRIBUCION = 10;
	const MSECTORES = 11;

	//Páginas
	const PINICIO = 1;
	const PTIENDA = 2;
	const PCARRITO = 3;
	const PNOSOTROS = 4;
	const PCONTACTO = 5;
	const PPREGUNTAS = 6;
	const PTERMINOS = 7;
	const PSUCURSALES = 8;
	const PERROR = 9;

	//Roles
	const RADMINISTRADOR = 1;
	const RSUPERVISOR = 2;
	const RCLIENTES = 3;
	const RVENDEDOR = 4;
	const RREPARTIDOR = 5;
	

	const STATUS = array('Completo','Aprobado','Cancelado','Reembolsado','Pendiente','Entregado');

	//Productos por página
	const CANTPORDHOME = 8;
	const PROPORPAGINA = 4;
	const PROCATEGORIA = 4;
	const PROBUSCAR = 4;

	//REDES SOCIALES
	const FACEBOOK = "https://www.facebook.com/profile.php?id=100086236604401";
	const INSTAGRAM = "https://www.instagram.com/vegetapriincipessj/";
	

 ?>