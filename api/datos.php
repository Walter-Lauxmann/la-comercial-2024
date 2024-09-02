<?php
// Requerimos el archivo de la clase Modelo
require_once('modelos.php');

$mensaje = '';

if(isset($_GET['tabla'])) {
    $tabla = new ModeloABM($_GET['tabla']);

    if(isset($_GET['id'])) {
        $tabla->set_criterio("id=".$_GET['id']);
    }

    if(isset($_GET['accion'])) {
        if($_GET['accion'] == 'insertar' || $_GET['accion'] == 'actualizar') {
            $valores = $_POST;
        }
        
        // ----- SUBIDA DE IMÁGENES --------
        if(
            isset($_FILES) && // Si está seteado el array $_FILES y
            isset($_FILES['imagen']) && // está seteado el parámetro $_FILES['imagen'] y
            !empty($_FILES['imagen']['name']) && // NO está vacío $_FILES['imagen']['name'] y
            !empty($_FILES['imagen']['tmp_name']) // NO está vacío $_FILES['imagen']['tmp_name]
        ) {
            if(is_uploaded_file($_FILES['imagen']['tmp_name'])) { // si está subido el archivo temporal
                $tmp_nombre = $_FILES['imagen']['tmp_name'];
                $nombre = $_FILES['imagen']['name'];
                $destino = '../imagenes/productos/'.$nombre;
                if(move_uploaded_file($tmp_nombre, $destino)) { // si se puede mover el archivo temporal a destino
                    $mensaje = 'Archivo subido correctamente a '.$destino;
                    $valores['imagen'] = $nombre; // Agregamos al array $valores el nombre de la imagen
                } else {
                    $mensaje = 'No se ha podido subir el archivo';
                    unlink(ini_get('upload_tmp_dir').$tmp_nombre); // Eliminamos el archivo temporal
                }
            } else {
                $mensaje = 'Error: El archivo no fue procesado correctamente';
            }
        }

        switch($_GET['accion']) {
            case 'seleccionar':
                $datos = $tabla->seleccionar();
                print_r($datos) ;
                break;
                
            case 'insertar':
                $tabla->insertar($valores);
                $mensaje = 'Datos Guardados';
                echo json_encode($mensaje);
                break;

            case 'actualizar':
                $tabla->actualizar($valores);
                $mensaje = 'Datos actualizados';
                echo json_encode($mensaje);
                break;

            case 'eliminar':
                $tabla->eliminar();
                $mensaje = 'Datos eliminados';
                echo json_encode($mensaje);
                break;
        }
    }

    
}



?>