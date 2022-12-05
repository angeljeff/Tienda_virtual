<?php 
    headerAdmin($data); 
    getModal('modalDistribucion',$data);
?>
    <div id="divModal"></div>
    <main class="app-content">
      <div class="app-title">
        <div>
            <h1><i class="fas fa-truck"></i> <?= $data['page_title'] ?></h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="<?= base_url(); ?>/distribucion"><?= $data['page_title'] ?></a></li>
        </ul>
      </div>
      <button class="loca">click location</button>
      <div class="cmn">
      <div id = 'map'></div>
      <div class="nada">
        <div class="texto_aviso">
          <h4 class="aviso">No tienes ningún pedido aún</h4>
          <button class="botonaviso">ok</button>

        </div>
        
      </div>
      </div>


    </main>
<?php footerAdmin($data); ?>
    