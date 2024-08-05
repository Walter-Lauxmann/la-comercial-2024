const url = './api/datos.php?tabla=productos';

/**
 * Función asíncrona para seleccionar artículos
 */
export async function seleccionarArticulos() {
    let res = await fetch(url);
    let datos = await res.json();
    if(res.status !== 200 ) {
        throw Error('Los datos no se encontraron');
    }
    console.log(datos);
    return datos;
}