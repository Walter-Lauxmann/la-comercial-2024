import { seleccionarArticulos, insertarArticulos } from "../modelos/articulos.js";
/* Objetos del DOM */

// Listado de articulos
const listado = document.querySelector("#listado");

// Alerta
const alerta = document.querySelector('#alerta');

// Formulario
const formulario = document.querySelector('#formulario');
const formularioModal = new bootstrap.Modal(document.querySelector('#formularioModal'));
const btnNuevo = document.querySelector('#btnNuevo');

// Inputs
const inputCodigo = document.querySelector('#codigo');
const inputNombre = document.querySelector('#nombre');
const inputDescripcion = document.querySelector('#descripcion');
const inputPrecio = document.querySelector('#precio');

// Imagen del formulario
const frmImagen = document.querySelector('#frmImagen');

// Variables
let opcion = '';
let id;
let mensajeAlerta;


/**
 * Esta función se ejecuta cuando
 * todo el contenido está cargado
 */

document.addEventListener('DOMContentLoaded', () => {
    mostrarArticulos();
})


/**
 * Obtiene los artículos y los muestra
 *
 */
async function mostrarArticulos() {
  const articulos = await seleccionarArticulos();

  articulos.map(articulo =>
      (listado.innerHTML += `
                <div class="col">
                    <div class="card" style="width: 18rem;">
                        <img src="./imagenes/productos/${articulo.imagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">
                                <span name="spancodigo">${articulo.codigo}</span> - <span name="spannombre">${articulo.nombre}</span>
                            </h5>
                            <p class="card-text">
                                <img src="./imagenes/memory.svg">
                                <img src="./imagenes/storage.svg">
                                <img src="./imagenes/photo_camera.svg">
                                <img src="./imagenes/aod.svg"><br>
                                ${articulo.descripcion}
                            </p>
                            <h5>$ <span name="spanprecio">${articulo.precio}.-</span></h5>
                            <input class="form-control" type="number" value="0" min="0" max="11" name="inputcantidad" onchange="calcularPedido()">
                        </div>
                    </div>
                </div>   
    
    `)
  );
}

/**
 * Ejecuta el evento clic del botón Nuevo
 */
btnNuevo.addEventListener('click', ()=> {
    // Limpiamos los inputs
    inputCodigo.value = null;
    inputNombre.value = null;
    inputDescripcion.value = null;
    inputPrecio.value = null;
    frmImagen.src = './imagenes/productos/nodisponible.png';

    // Mostrar el formulario modal
    formularioModal.show();

    opcion = 'insertar';
})

/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenimos la acción por defecto

    const datos = new FormData(formulario); // Guardamos los datos del formulario

    switch(opcion) {
        case 'insertar':
            mensajeAlerta = 'Datos guardados';
            insertarArticulos(datos);
            break;
    }
    insertarAlerta(mensajeAlerta, 'success');
    mostrarArticulos();
})

/**
 * Define los mensajes de alerta
 * @param mensaje el mensaje a mostrar
 * @param tipo el tipo de alerta
 */
const insertarAlerta = (mensaje, tipo) => {
    const envoltorio = document.createElement('div');
    envoltorio.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible" role="alert">
            <div>${mensaje}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
    `;
    alerta.append(envoltorio);
}
