<?php
// Requerimos el archivo de la clase Modelo
require_once('modelos.php');

if(isset($_GET['tabla'])) {
    $tabla = new ModeloABM($_GET['tabla']);

    $datos = $tabla->seleccionar();
    print_r($datos) ;
}



?>