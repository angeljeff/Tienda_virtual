$(document).ready(function(){


  // declaracion de variables 
  var arreglo_pedidos= new Array(); //  arreglo pedidos extraido de la base de datos 
  marcadores =new Array(); //arreglo que guarda los marcadores para el clickeo
  vueltas=0; // la cantidad de vueltas dependiendo la longitud de os pedidos extraidos de la base de datos
  ubicaciones=[[-2.250408, -79.881556]]    // se guardaran las ubicaciones de los pedidos
  camino=[0]                          //todos los pedidos 
  arreglo_final_mostrar=[]
  
  latitudes=[-2.2522428,-2.2422428,-2.2513239,-2.2601974,-2.2755276,-2.2755276,-2.2755276,-2.2755276,-2.2755276,-2.2755276];
  longitudes=[79.8766129,-79.8166129,-79.8763493,-79.8931353,-79.9112241,-79.8931353,-79.8931353,-79.8931353,-79.8931353];
  
  let mostrarmensaje=document.querySelector('.nada')
  
  // posición centro del mapa 
  var map = L.map('map').setView([-2.250408, -79.881556],16);
  
  
  // DIBUJO EL MAPA
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'hola mundo &copy; <a href="http://facebook.com">kenny_xd</a> barcelona, <a href="http://google.com">AA-CC</a>, Imagery © <a href="http://cloudmade.com">AGUA</a>',
  minZoom: 4,
  maxZoom: 18
  }).addTo(map);
  
  // CREACION ICONO DE AVILUPE 
  var iconoBase = L.Icon.extend({options: {iconSize:[60, 60], iconAnchor:[10, 24]}});
  avicola = new iconoBase({iconUrl: 'Assets/tienda/images/logo.png'});      
  L.marker([-2.250408, -79.881556], {icon: avicola}).addTo(map);
  
  
    // var marcadoresx = L.Icon.extend({
    //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    //   iconSize: [10, 20],
    //   iconAnchor: [7, 5]
    //  });
  
    // var iconoverde = new  marcadoresx({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'});
    // var iconoazul = new marcadoresx({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'});
    // var iconorojo = new marcadoresx({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'});
    
  
  
  
  
    function modifyText(e){
      arreglo_pedidos[this.options.indice];
      consultarproductos(arreglo_pedidos[this.options.indice])
      // e.target.setIcon(iconoverde);
      
    }
  
  //   var marker= L.marker([-2.25262, -79.8766111], {icon: iconoazul});
  //   marker.bindTooltip("10" , {
  //     permanent: true,
  //     direction: 'top',
  //     className: "my-labels"
  //  });
  // marker.addTo(map);
  
  
  // seleccionar todos los pedidos
  
  function obtenerpedidos(){
    $.ajax({
      // la URL para la petición
      url : " "+base_url+"/Distribucion/getPedidos",
      type : 'POST',
      data :{hola:"pedidos"},
      success : function(res) {
        if(res.trim().length==2){
          mostrarmensaje.classList.add('mostrar_m');
        }else{
          var pedidos = JSON.parse(res);
          arreglo_pedidos= pedidos;
          for(i=0; i<pedidos.length; i++){
            pedidos[i].latitud=latitudes[i];
            pedidos[i].longitud=longitudes[i];
          
          }
          for(q=0; q<pedidos.length; q++){
            camino.push(q+1);
            ubicaciones.push([pedidos[0].latitud,pedidos[0].longitud])
          }
          let longitud_pedidos= pedidos.length
          if(longitud_pedidos<=2){
            arreglo_final_mostrar=pedidos
          }
          else if(longitud_pedidos>2 && longitud_pedidos<=6){
            vueltas=10;
          }
          else if(longitud_pedidos>6 && longitud_pedidos<=10){
            vueltas=50;
          }
          else{
            vueltas=100;
          }
  
          
          // for(i=0; i<pedidos.length; i++){
          //   console.log(pedidos[i])
          
          // }
          ordenar()
          // for(i=0; i<pedidos.length; i++){
          //   let mar=L.marker([parseFloat(pedidos[i].latitud), parseFloat(pedidos[i].longitud)],{indice:i})
            
          //   mar.bindTooltip(`${i}` , {
          //   permanent: true,
          //   direction: 'top',
          //   className: "my-labels"
          //   });
          //   mar.addTo(map);
          //   marcadores.push(mar);
          //   marcadores[i].on('click', modifyText);
            
          
          // }
          
        }
  
      },    
      // código a ejecutar si la petición falla;
      // son pasados como argumentos a la función
      // el objeto de la petición en crudo y código de estatus de la petición
      error : function(xhr, status) {
          alert('Disculpe, existió un problema');
      },
  
      // código a ejecutar sin importar si la petición falló o no
      complete : function(xhr, status) {
      }
                  
  
  
  });
  
  
  
  
  
  
  
  }
  function consultarproductos(pedido){
    console.log("es el pedido que me llega"+pedido.idpedido)
    $.ajax({
      // la URL para la petición
      url : " "+base_url+"/Distribucion/getproductos",
      type : 'POST',
      data :{id:pedido.idpedido},
      success : function(respuesta) {
        console.log(respuesta)
        var products = JSON.parse(respuesta);
        var x="";
        var subtotal=0;
        for(i=0; i<products.length; i++){
          x+=`<tr>
              <td>${products[i].nombre}</td>
              <td>${products[i].cantidad}</td>
              <td>${products[i].precio}</td>
              </tr>`
          subtotal+=(products[i].cantidad*products[i].precio)
          
   
        }
        abrirModal(pedido,x,subtotal)
  
  
  
      },    
      // código a ejecutar si la petición falla;
      // son pasados como argumentos a la función
      // el objeto de la petición en crudo y código de estatus de la petición
      error : function(xhr, status) {
          alert('Disculpe, existió un problema');
      },
  
      // código a ejecutar sin importar si la petición falló o no
      complete : function(xhr, status) {
      }
                  
  
  
  });
    
  }
  
  
  // cierra mensaje de no hay productos
  $('.botonaviso').click(function(){mostrarmensaje.classList.remove('mostrar_m')});
  
  
  obtenerpedidos();
  
  
  
  
  
  
  // arreglo con distancias
  
  
  
  getKilometros = function(lat1,lon1,lat2,lon2)
  {
  console.log("es lo q me llega"+ lat1,lon1,lat2,lon2)
  rad = function(x) {return x*Math.PI/180;}
  var R = 6378.137; //Radio de la tierra en km
  var dLat = rad( lat2 - lat1 );
  var dLong = rad( lon2 - lon1 );
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return (d.toFixed(3))*1000; //Retorna tres decimales
  }
  // console.log("distancia en km "+getKilometros(-2.250408,-79.881556,-2.2513239,-79.8763493))
  
  
  
  
  camino=[0,1,2,3,4]
  
  
  ubicaciones=[[-2.250408, -79.881556],[-2.2522428,-79.8166129],[-2.2422428,79.8766129],[-2.2513239,-79.8763493],[-2.2601974,-79.8931353]]
  distancias=[]
  console.log(ubicaciones[0][1])
  
  for (var i=0; i<ubicaciones.length; i++){
    let ditan=[]
    for(j=0;j<ubicaciones.length;j++){
      
      if(ubicaciones[i]==ubicaciones[j]){
        ditan[j]=0;
  
      }
      else{
        ditan[j]= getKilometros(ubicaciones[i][0],ubicaciones[i][1],ubicaciones[j][0],ubicaciones[j][1])
      }
    }
    distancias.push(ditan)
    console.log(distancias)
  
  }
  
  console.log(distancias,"distancias" )
  arrayubicacionesaleatorias=[]
  for(h=0;h<10;h++){
    arraytemporal=[]
   while(arraytemporal.length<camino.length){
    let number =Math.round(Math.random() * (camino.length - 1));
    if(number==0){
      number+=1
    }
    if(!arraytemporal.includes(number)){
      arraytemporal.push(number)
    }
    if(arraytemporal.length ==camino.length-1){
      arraytemporal.unshift(0)
      arraytemporal.push(0)
      arrayubicacionesaleatorias.push(arraytemporal)
    }
  }
  
  
  }
  console.log(arrayubicacionesaleatorias, "son la ubi aleatorias")
  
  sumatorias=[]
  for(m=0;m<10;m++){
    suma=0
    for(u=1;u<arrayubicacionesaleatorias[m].length ;u++){
      if(u==1){
        suma+= distancias[0][arrayubicacionesaleatorias[m][u]]
      }else{
        suma+= distancias[arrayubicacionesaleatorias[m][u-1]][arrayubicacionesaleatorias[m][u]]
      }
    }
    sumatorias.push(parseInt(suma) )
  }
  
  console.log(sumatorias+"sumatorias")
  
  minimo= Math.min(...sumatorias)
  busqueda= sumatorias.indexOf(minimo);
  console.log("es el minimo"+minimo)
  console.log("es la busqueda"+busqueda)
  arrayimprimir=arrayubicacionesaleatorias[busqueda]
  console.log("es el array a mostrar "+arrayubicacionesaleatorias[busqueda])
  
  
  
  
  ordenar = ()=>{
    
    arrayimprimir.forEach(element => {
    if(element!=0){
      console.log("es el elemento"+element)
      arreglo_final_mostrar.push(arreglo_pedidos[element-1])
    }
  
    
  });
  
  console.log(arreglo_pedidos,"arreglo sin ordenar")
  console.log(arreglo_final_mostrar,"arreglo ordenado")
  
  
  for(i=0; i<arreglo_final_mostrar.length; i++){
    let mar=L.marker([parseFloat(arreglo_final_mostrar[i].latitud), parseFloat(arreglo_final_mostrar[i].longitud)],{indice:i})
    
    mar.bindTooltip(`${i}` , {
    permanent: true,
    direction: 'top',
    className: "my-labels"
    });
    mar.addTo(map);
    marcadores.push(mar);
    marcadores[i].on('click', modifyText);
    
  
  }
  
    
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  $(".loca").click(function () { //user clicks button
    if (navigator.geolocation){ //check geolocation available 
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function(position){ 
          console.log(position.coords.latitude)
          console.log(position.coords.longitude);
          L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
  
            });
    }else{
        console.log("No se ha permitido el acceso a la ubicación!");
    }
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  function abrirModal(pedido,x,subtotal)
  {
  
      document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
  
      document.querySelector('#titleModal').innerHTML = "Detalles Pedido";
      document.querySelector('.cliente').innerText= pedido.nombres+" "+pedido.apellidos;
      document.querySelector('.fecha').innerText= pedido.fecha;
      document.querySelector('.direccion').innerText= pedido.direccion_envio;
      document.querySelector('.celular').innerText= pedido.telefono;
      document.querySelector('.estado').innerText= pedido.status;
      document.querySelector('.total').innerText= "$"+pedido.monto;
      document.querySelector('.subtotal').innerText= "$"+subtotal;
      document.getElementById('productos').innerHTML=""
      document.getElementById('productos').innerHTML=x
      if(pedido.status=="Pendiente"){
        document.querySelector('.estado').style.color= '#F04F49';
      }else{
        document.querySelector('.estado').style.color= '#008882';
  
      }
  
  
      $('#modalDDistribucion').modal('show');
  
  }
  
  
  
  });