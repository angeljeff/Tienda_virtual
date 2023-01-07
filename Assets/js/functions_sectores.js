let tableCategorias;
let rowTable = "";
let divLoading = document.querySelector("#divLoading");
document.addEventListener('DOMContentLoaded', function(){

    tableCategorias = $('#tableSectores').dataTable( {
        "aProcessing":true,
        "aServerSide":true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": " "+base_url+"/Sectores/getSectores",
            "dataSrc":""
        },
        "columns":[
            {"data":"idsectores"},
            {"data":"sector"},
            {"data":"descripcion_s"},
            {"data":"precio_sector"},
            {"data":"estado"},
            {"data":"options"}
        ],
        'dom': 'lBfrtip',
        'buttons': [
            {
                "extend": "copyHtml5",
                "text": "<i class='far fa-copy'></i> Copiar",
                "titleAttr":"Copiar",
                "className": "btn btn-secondary"
            },{
                "extend": "excelHtml5",
                "text": "<i class='fas fa-file-excel'></i> Excel",
                "titleAttr":"Esportar a Excel",
                "className": "btn btn-success"
            },{
                "extend": "pdfHtml5",
                "text": "<i class='fas fa-file-pdf'></i> PDF",
                "titleAttr":"Esportar a PDF",
                "className": "btn btn-danger"
            },{
                "extend": "csvHtml5",
                "text": "<i class='fas fa-file-csv'></i> CSV",
                "titleAttr":"Esportar a CSV",
                "className": "btn btn-info"
            }
        ],
        "resonsieve":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order":[[0,"desc"]]  
    });


	// if(document.querySelector("#foto")){
	//     let foto = document.querySelector("#foto");
	//     foto.onchange = function(e) {
	//         let uploadFoto = document.querySelector("#foto").value;
	//         let fileimg = document.querySelector("#foto").files;
	//         let nav = window.URL || window.webkitURL;
	//         let contactAlert = document.querySelector('#form_alert');
	//         if(uploadFoto !=''){
	//             let type = fileimg[0].type;
	//             let name = fileimg[0].name;
	//             if(type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png'){
	//                 contactAlert.innerHTML = '<p class="errorArchivo">El archivo no es válido.</p>';
	//                 if(document.querySelector('#img')){
	//                     document.querySelector('#img').remove();
	//                 }
	//                 document.querySelector('.delPhoto').classList.add("notBlock");
	//                 foto.value="";
	//                 return false;
	//             }else{  
	//                     contactAlert.innerHTML='';
	//                     if(document.querySelector('#img')){
	//                         document.querySelector('#img').remove();
	//                     }
	//                     document.querySelector('.delPhoto').classList.remove("notBlock");
	//                     let objeto_url = nav.createObjectURL(this.files[0]);
	//                     document.querySelector('.prevPhoto div').innerHTML = "<img id='img' src="+objeto_url+">";
	//                 }
	//         }else{
	//             alert("No selecciono foto");
	//             if(document.querySelector('#img')){
	//                 document.querySelector('#img').remove();
	//             }
	//         }
	//     }
	// }

	// if(document.querySelector(".delPhoto")){
	//     let delPhoto = document.querySelector(".delPhoto");
	//     delPhoto.onclick = function(e) {
    //         document.querySelector("#foto_remove").value= 1;
	//         removePhoto();
	//     }
	// }

	//NUEVA CATEGORIA
    let formSector = document.querySelector("#formSector");
    formSector.onsubmit = function(e) {
        e.preventDefault();
        let strNombre = document.querySelector('#txtNombre').value;
        let strDescripcion = document.querySelector('#txtDescripcion').value;
        let precio = document.querySelector('#txtPrecio').value;        
        if(strNombre == '' || strDescripcion == '' || precio == '')
        {
            swal("Atención", "Todos los campos son obligatorios." , "error");
            return false;
        }
        divLoading.style.display = "flex";
        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = base_url+'/Sectores/setSectores'; 
        let formData = new FormData(formSector);
        request.open("POST",ajaxUrl,true);
        request.send(formData);
        request.onreadystatechange = function(){
           if(request.readyState == 4 && request.status == 200){
                
                let objData = JSON.parse(request.responseText);
                if(objData.status)
                {
                    if(rowTable == ""){
                        tableCategorias.api().ajax.reload();
                    }else{
                        rowTable.cells[1].textContent = strNombre;
                        rowTable.cells[2].textContent = strDescripcion;
                        rowTable.cells[3].textContent = "$"+" "+precio;
                        rowTable = "";
                    }

                    $('#modalFormSectores').modal("hide");
                    formSector.reset();
                    swal("Sector", objData.msg ,"success");
                    
                }else{
                    swal("Error", objData.msg , "error");
                }              
            } 
            divLoading.style.display = "none";
            return false;
        }
    }

}, false);

function fntViewInfo(idsectores){
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = base_url+'/Sectores/getSector/'+idsectores;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            let objData = JSON.parse(request.responseText);
            if(objData.status)
            {
                let estado = objData.data.status == 1 ? 
                '<span class="badge badge-success">Activo</span>' : 
                '<span class="badge badge-danger">Inactivo</span>';
                document.querySelector("#celId").innerHTML = objData.data.idsectores;
                document.querySelector("#celNombre").innerHTML = objData.data.sector;
                document.querySelector("#celDescripcion").innerHTML = objData.data.descripcion_s;
                document.querySelector("#celPrecio").innerHTML = "$"+" "+objData.data.precio_sector;
                
                $('#modalViewSector').modal('show');
            }else{
                swal("Error", objData.msg , "error");
            }
        }
    }
}

function fntEditInfo(element,idsectores){
    rowTable = element.parentNode.parentNode.parentNode;
    document.querySelector('#titleModal').innerHTML ="Actualizar Sector";
    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML ="Actualizar";
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = base_url+'/Sectores/getSector/'+idsectores;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            let objData = JSON.parse(request.responseText);
            if(objData.status)
            {
                document.querySelector("#idSector").value = objData.data.idsectores;
                document.querySelector("#txtNombre").value = objData.data.sector;
                document.querySelector("#txtDescripcion").value = objData.data.descripcion_s;
                document.querySelector("#txtPrecio").value = objData.data.precio_sector;

                $('#modalFormSectores').modal('show');

            }else{
                swal("Error", objData.msg , "error");
            }
        }
    }
}

// function fntDelInfo(idcategoria){
//     swal({
//         title: "Eliminar Categoría",
//         text: "¿Realmente quiere eliminar al categoría?",
//         type: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Si, eliminar!",
//         cancelButtonText: "No, cancelar!",
//         closeOnConfirm: false,
//         closeOnCancel: true
//     }, function(isConfirm) {
        
//         if (isConfirm) 
//         {
//             let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
//             let ajaxUrl = base_url+'/Categorias/delCategoria';
//             let strData = "idCategoria="+idcategoria;
//             request.open("POST",ajaxUrl,true);
//             request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//             request.send(strData);
//             request.onreadystatechange = function(){
//                 if(request.readyState == 4 && request.status == 200){
//                     let objData = JSON.parse(request.responseText);
//                     if(objData.status)
//                     {
//                         swal("Eliminar!", objData.msg , "success");
//                         tableCategorias.api().ajax.reload();
//                     }else{
//                         swal("Atención!", objData.msg , "error");
//                     }
//                 }
//             }
//         }

//     });

// }


function openModal()
{
    rowTable = "";
    document.querySelector('#idSector').value ="";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML ="Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Sector";
    document.querySelector("#formSector").reset();
    $('#modalFormSectores').modal('show');
    
}