<!-- Modal -->
<div class="modal fade" id="modalDDistribucion" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-md" >
    <div class="modal-content">
      <div class="modal-header headerRegister">
        <h5 class="modal-title" id="titleModal">Detalles</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form id="formProductos" name="formProductos" class="form-horizontal">

              <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-4 col-xs-4 col-md-3 col-sm-4 ">
                            <h4 class="letras_tama"><b>Cliente: </b></h4>
                        </div>
                        <div class="col-8 col-xs-8 col-md-9 col-sm-8 " >
                            <h4 class="letras_tama cliente" > </h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 col-xs-4 col-sm-4 col-md-3  ">
                            <h4 class="letras_tama"><b>Fecha: </b></h4>
                        </div>
                        <div class="col-8 col-xs-8 col-sm-4 col-md-9  ">
                            <h4 class="letras_tama fecha"> </h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 col-xs-4 col-sm-4 col-md-3  "> 
                            <h4 class="letras_tama"><b>Estado: </b></h4>
                        </div>
                        <div class="col-8 col-xs-8 col-sm-4 col-md-9  ">
                            <h4 class="letras_tama estado"></h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 col-xs-4 col-sm-4 col-md-3  ">
                            <h4 class="letras_tama"><b>Dirección: </b></h4>
                        </div>
                        <div class="col-8 col-xs-8 col-sm-4 col-md-9  ">
                            <h4 class="letras_tama direccion"></h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 col-xs-4 col-sm-4 col-md-3  ">
                            <h4 class="letras_tama"><b>Celular: </b></h4>
                        </div>
                        <div class="col-8 col-xs-8 col-sm-4 col-md-9  ">
                            <h4 class="letras_tama celular">  </h4>
                        </div>
                    </div>
                </div>
              </div>
                <br>
              <div class="row">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered" id="tabledetalle_pedido">
                        <thead>
                                    <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Total</th>
                                    </tr>
                        </thead>
                        <tbody id="productos">
                        </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-8 col-xs-7 col-sm-8 col-md-8 text-right">
                            <h5 class="letras_tama " ><b >Subtotal: </b></h5>

                        </div>
                        <div class="col-4 col-xs-5 col-sm-4 col-md-4 text-right">
                            <h5 class="letras_tama subtotal">xxxx.xx </h5>
                        </div>
                        <div class="col-8 col-xs-7 col-sm-8 col-md-8 text-right">
                            <h5 class="letras_tama"><b>Envio: </b></h5>

                        </div>
                        <div class="col-4 col-xs-5 col-sm-4 col-md-4 text-right">
                            <h5 class="letras_tama"> $5.00 </h5>
                        </div>
                        <div class="col-8 col-xs-7 col-sm-8 col-md-8 text-right">
                            <h5 class="letras_tama"><b>Total: </b></h5>

                        </div>
                        <div class="col-4 col-xs-5 col-sm-4 col-md-4 text-right">
                            <h5 class="letras_tama total"> </h5>
                        </div>
                    </div>
                </div>
              </div>
            </form>
      </div>
    </div>
  </div>
</div>



