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

/**
 * Actualiza los datos en la Base de Datos
 * @param datos los datos a actualizar
 * @param id el id del artículo
 */
export const actualizarArticulos = (datos, id) => { // Función flecha = function actualizarArticulos(datos, id) {}
    fetch(`${url}&accion=actualizar&id=${id}`, {
        method: 'POST',
        body: datos
    })
    .then(res=>res.json())
    .then(data=> {
        console.log(data);
        return data;
    });
}

/**
 * Elimina los datos de la Base de Datos
 * @param id el id del articulo a eliminar
 */
export const eliminarArticulos = (id) => {
    fetch(`${url}&accion=eliminar&id=${id}`,{})
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        })
}