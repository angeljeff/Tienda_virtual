$(document).ready(function(){

  // declaracion de variables 
  var arreglo_pedidos= new Array(); //  arreglo pedidos extraido de la base de datos 
  marcadores =new Array(); //arreglo que guarda los marcadores para el clickeo
  vueltas=0; // la cantidad de vueltas dependiendo la longitud de os pedidos extraidos de la base de datos
  ubicaciones=[[-2.250408, -79.881556]]    // se guardaran las ubicaciones de los pedidos
  camino=[0]                          //todos los pedidos 
  distancias=[]                       // distancias desde los puntos
  arrayubicacionesaleatorias=[]       // almaceno las ubicaciones aleatorias
  sumatorias=[]                       //utilizada para sumar las distancias de las ubicaiones creadas aleatoriamente
  arreglo_final_mostrar=[]
  arraygeneral=new Array
  etiquetascss=['my-labels','my-labels1','my-labels2','my-labels3','my-labels4','my-labels5','my-labels6','my-labels7','my-labels8','my-labels9']
  arrayentregados=[]  
  todospedidos=[]
  marcadoresentregados=[]

  let mostrarmensaje=document.querySelector('.nada')
  
  // posición centro del mapa 
  var map = L.map('map').setView([-2.250408, -79.881556],13);
  
  
  // DIBUJO EL MAPA
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'hola mundo &copy; <a href="http://facebook.com">kenny_xd</a> barcelona, <a href="http://google.com">AA-CC</a>, Imagery © <a href="http://cloudmade.com">AGUA</a>',
  minZoom: 8,
  maxZoom: 18
  }).addTo(map);
  
  // CREACION ICONO DE AVILUPE 
  var iconoBase = L.Icon.extend({options: {iconSize:[60, 60], iconAnchor:[10, 24]}});
  avicola = new iconoBase({iconUrl: 'Assets/tienda/images/logo.png'});      
  L.marker([-2.250408, -79.881556], {icon: avicola}).addTo(map);
  

  
  
  
    function modifyText(e){
      todospedidos[this.options.indice];
      consultarproductos(todospedidos[this.options.indice])
      
    }

      
    function modifyTextEntregados(e){
      arrayentregados[this.options.indic];
      consultarproductos(arrayentregados[this.options.indic])
      
    }
  
  

function organizar_arreglo(){
          
          // agrego a las ubicaciones 
          for(q=0; q<arraygeneral.length; q++){
            arreglo_final_mostrar=[]
            camino=[0]
            ubicaciones=[[-2.250408, -79.881556]]
            for(let nm=0; nm<arraygeneral[q].length; nm++){
              camino.push(nm+1);
              ubicaciones.push([arraygeneral[q][nm].latitud,arraygeneral[q][nm].longitud])
            }
            let longitud_pedidos= arraygeneral[q].length
            if(longitud_pedidos<=2){
              arreglo_final_mostrar=arraygeneral[q]
              imprimirnuevamenteubicaciones();
            }
            else if(longitud_pedidos>2 && longitud_pedidos<=6){
              vueltas=30;
              obtenerdistancias(q)
  
            }
            else if(longitud_pedidos>6 && longitud_pedidos<=10){
              vueltas=110;
              obtenerdistancias()
            }
            else{
              vueltas=160;
              obtenerdistancias()
            }

          }

          if(arrayentregados.length>0){
            imprimirentregados()
          }


}
 
    



  // seleccionar todos los pedidos

  function obtenerpedidos(){
    $.ajax({
      url : " "+base_url+"/Distribucion/getPedidos",
      type : 'POST',
      data :{hola:"pedidos"},
      success : function(res) {
        if(res.trim().length==2){
          mostrarmensaje.classList.add('mostrar_m');
        }else{
          var pedidos = JSON.parse(res);
          arreglo_pedidos= pedidos;
          let id_repartidor=""
          let arraytemporal=[]
          let arrayidpedidos=[]
          for(let h=0; h<pedidos.length; h++){
            id_repartidor=pedidos[h].idrepartidor
            arraytemporal=[]
            console.log(pedidos[h].status)
            if(pedidos[h].status=="Entregado"){
              arrayentregados.push(pedidos[h])
            }else{             
              for(let b=0; b<pedidos.length; b++){
                if(pedidos[b].status!="Entregado"){          
                  if(id_repartidor==pedidos[b].idrepartidor){
                    let si= arrayidpedidos.indexOf(pedidos[b].idpedido);
                    if(si==-1){
                      arrayidpedidos.push(pedidos[b].idpedido)
                      arraytemporal.push(pedidos[b])
                    }
                  }
                }
                if(arraytemporal.length>0){
                  let no= arraygeneral.indexOf(arraytemporal);
                  if(no==-1){
                    arraygeneral.push(arraytemporal)
                  }

                }

                }

            }
      
          }
          organizar_arreglo()
          
        }
  
      },    

      error : function(xhr, status) {
          alert('Disculpe, existió un problema');
      },
  
      // código a ejecutar sin importar si la petición falló o no
      complete : function(xhr, status) {
      }
                  
  
  
  });
  
  
  


  
  
  }
  function consultarproductos(pedido){
    $.ajax({
      // la URL para la petición
      url : " "+base_url+"/Distribucion/getproductos",
      type : 'POST',
      data :{id:pedido.idpedido},
      success : function(respuesta) {
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
        repartidor= document.querySelector('.repartidor')
        repartidor.innerText="";

        $.ajax({
          // la URL para la petición
          url : " "+base_url+"/Usuarios/getRepartidorpedido",
          type : 'POST',
          data :{idrepartidor:pedido.idrepartidor},
          success : function(res) {
            if(res.trim().length==2){
              repartidor.innerText="No se ha asignado repartidor"
            }else{
              var reparte = JSON.parse(res);
              repartidor.innerText= reparte.nombres+" "+reparte.apellidos;

            }
          abrirModal(pedido,x,subtotal)

          }

 
      });

  
      },    
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
  
  
  
  // creo el arreglo con distancias
  
  getKilometros = function(lat1,lon1,lat2,lon2)
  {
  rad = function(x) {return x*Math.PI/180;}
  var R = 6378.137; //Radio de la tierra en km
  var dLat = rad( lat2 - lat1 );
  var dLong = rad( lon2 - lon1 );
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return (d.toFixed(3))*1000; //Retorna tres decimales
  }

  
  

  function obtenerdistancias(q){
    distancias=[]
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
    
    }

    crearposicionesaleatorias(q);

  }

  
  

function crearposicionesaleatorias(q){
  arrayubicacionesaleatorias=[]
  for(h=0;h<vueltas;h++){
   let arraytemporal=[]
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
  realizarsumatorias(q);
}


  

  function realizarsumatorias(q){
    sumatorias=[]
    arrayimprimir=undefined
    for(m=0;m<vueltas;m++){
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
      
    
    minimo= Math.min(...sumatorias)
    busqueda= sumatorias.indexOf(minimo);
    arrayimprimir=arrayubicacionesaleatorias[busqueda]
    ordenar(q);

  }


  
  
  ordenar = (q)=>{

    if(arrayimprimir!= undefined){
      console.log(arrayimprimir)
      arrayimprimir.forEach(element => {
      
          if(element!=0){
            // if(pedpendientes){
            //   arreglo_final_mostrar.push(arreglopedidospendientes[element-1])
            //   console.log(arreglopedidospendientes[element-1])
      
            // }else{
              arreglo_final_mostrar.push(arraygeneral[q][element-1])
              console.log(arraygeneral[q][element-1])
            // }
      
      
          }
        });

    }

  // if(arreglopedidosaprobados.length>0){
  //   arreglopedidosaprobados.forEach(elemento => {
  //     arreglo_final_mostrar.push(elemento)
  //   });
  //   imprimir()
    
    
  // }else{
  //   imprimirnuevamenteubicaciones()
  // }
  imprimirnuevamenteubicaciones()


  
}
  

  
  // function imprimir(){
  //   for(i=0; i<arreglo_final_mostrar.length; i++){
  //     let mar=L.marker([parseFloat(arreglo_final_mostrar[i].latitud), parseFloat(arreglo_final_mostrar[i].longitud)],{indice:i})
      
  //     mar.bindTooltip(`${i+1}` , {
  //     permanent: true,
  //     direction: 'top',
  //     className: "my-labels"
  //     });
  //     mar.addTo(map);
  //     marcadores.push(mar);
  //     marcadores[i].on('click', modifyText);
      
    
  //   }
    
  // }

contador=0
ind=0

  function imprimirnuevamenteubicaciones(){
    contador++
    numeroi=0
    for(i=0; i<arreglo_final_mostrar.length; i++){
      todospedidos.push(arreglo_final_mostrar[i])
      let mar=L.marker([parseFloat(arreglo_final_mostrar[i].latitud), parseFloat(arreglo_final_mostrar[i].longitud)],{indice:ind})
        mar.bindTooltip(`${numeroi+1}` , {
          permanent: true,
          direction: 'top',
          className: etiquetascss[contador]
          });

      mar.addTo(map);
      marcadores.push(mar);
      marcadores[ind].on('click', modifyText);
      ind++
      numeroi++  
    }


    
    
    
    
  }

  function imprimirentregados(){
    for(l=0; l<arrayentregados.length; l++){
      let mar=L.marker([parseFloat(arrayentregados[l].latitud), parseFloat(arrayentregados[l].longitud)],{indic:l})
      mar.bindTooltip(`` , {
        permanent: true,
        direction: 'top',
        className: "my-labels"
        });
      mar.addTo(map);
      marcadoresentregados.push(mar);
      marcadoresentregados[l].on('click', modifyTextEntregados);
      
    
    }


  }
  
  
  // function recorridopedidospendientes(){
  //   pedpendientes=true;
  //   for(cv=0; cv<marcadores.length; cv++){
  //     map.removeLayer(marcadores[cv]);
  //   }
  //   arreglo_final_mostrar=[]
  //   ubicaciones=[[-2.250408, -79.881556]]   
  //   camino=[0]                          
  //   distancias=[]                      
  //   arrayubicacionesaleatorias=[]      
  //   sumatorias=[]
  //   arreglopedidosaprobados=[]
  //   marcadores=[]
  //   arreglopedidospendientes=[]

  //   for(q=0; q<arreglo_pedidos.length; q++){
  //     if(arreglo_pedidos[q].status=="Entregado"){
  //       arreglopedidosaprobados.push(arreglo_pedidos[q])
  //     }else{
  //       camino.push(q+1);
  //       ubicaciones.push([arreglo_pedidos[q].latitud,arreglo_pedidos[q].longitud])
  //       arreglopedidospendientes.push(arreglo_pedidos[q])

  //     }

  //   }
  //   obtenerdistancias()
    

  // }
  
  
  
  // $(".loca").click(function () { //user clicks button
  //   recorridopedidospendientes()


  // });
  
  
  
  
  function abrirModal(pedido,x,subtotal)
  {
      document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
      document.querySelector('#titleModal').innerHTML = "Detalles Pedido";
      document.querySelector('.cliente').innerText= pedido.nombres+" "+pedido.apellidos;
      document.querySelector('.fecha').innerText= pedido.fecha;
      document.querySelector('.direccion').innerText= pedido.direccion_envio;
      document.querySelector('.celular').innerText= pedido.telefono;
      document.querySelector('.estado').innerText= pedido.status;
      document.querySelector('.total').innerText= `$${pedido.monto}`;
      document.querySelector('.subtotal').innerText= `$${subtotal}`;
      document.querySelector('.va_envio').innerText=""
      document.querySelector('.va_envio').innerText= `$${pedido.costo_envio}`;
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