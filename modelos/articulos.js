const url = './api/datos.php?tabla=productos';

/**
 * Función asíncrona para seleccionar artículos
 */
export async function seleccionarArticulos() {
    let res = await fetch(url+'&accion=seleccionar');
    let datos = await res.json();
    if(res.status !== 200 ) {
        throw Error('Los datos no se encontraron');
    }
    console.log(datos);
    return datos;
}

/**
 * Inserta los datos en la Base de Datos
 * @param datos Los datos a insertar
 */
export function insertarArticulos(datos) {
    fetch(`${url}&accion=insertar`, {
        method: 'POST',
        body: datos
    })
    .then(res=>res.json())
    .then(data=> {
        console.log(data);
        return data;
    })
}