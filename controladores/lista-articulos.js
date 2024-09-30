import { seleccionarArticulos, insertarArticulos, actualizarArticulos, eliminarArticulos } from "../modelos/articulos.js";
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
let buscar = '';
let opcion = '';
let id;
let mensajeAlerta;

let articulos = [];
let articulosFiltrados = [];
let articulo = {};

// Control de usuario
let usuario = '';
let logueado = false;


/**
 * Esta función se ejecuta cuando
 * todo el contenido está cargado
 */

document.addEventListener('DOMContentLoaded', async () => {
    controlUsuario();
    articulos = await obtenerArticulos();
    articulosFiltrados = filtrarPorNombre('');
    mostrarArticulos();
});

/**
 * Controla si el usuario está logueado
 */
const controlUsuario = () => {
    if(sessionStorage.getItem('usuario')) {
        usuario = sessionStorage.getItem('usuario');
        logueado = true;
    } else {
        logueado = false;
    }
    if(logueado) {
        btnNuevo.style.display = 'inline';
    } else {
        btnNuevo.style.display = 'none';
    }
};

/**
 * Obtiene los artículos
 */
async function obtenerArticulos() {
    articulos = await seleccionarArticulos();
    return articulos;
}

/**
 * Filtra los artículos por nombre
 * @param n el nombre del artículo
 * @return articulos filtrados
 */
function filtrarPorNombre(n) {
    articulosFiltrados = articulos.filter(items => items.nombre.includes(n));
    return articulosFiltrados;
}

/**
 * Muestra los artículos  *
 */
function mostrarArticulos() { 
  listado.innerHTML = '';
    articulosFiltrados.map(articulo =>
      (listado.innerHTML += `
                <div class="col">
                    <div class="card" style="width: 18rem;">
                        <img src="./imagenes/productos/${articulo.imagen??'nodisponible.png'}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">
                                <span name="spancodigo">${articulo.codigo}</span> - <span name="spannombre">${articulo.nombre}</span>
                            </h5>
                            <p class="card-text">
                                <img src="./imagenes/memory.svg">
                                <img src="./imagenes/storage.svg">
                                <img src="./imagenes/photo_camera.svg">
                                <img src="./imagenes/aod.svg"><br>                                
                            </p>
                            <div class="div-descripcion">
                                ${articulo.descripcion}
                            </div>
                            <h5>$ <span name="spanprecio">${articulo.precio}.-</span></h5>
                            <input class="form-control" type="number" value="0" min="0" max="11" name="inputcantidad" onchange="calcularPedido()">
                        </div>
                        <div class="card-footer ${logueado?'d-flex':'d-none'}">
                            <a class="btn-editar btn btn-primary">Editar</a>
                            <a class="btn-borrar btn btn-danger">Borrar</a> 
                            <input type="hidden" class="id-articulo" value="${articulo.id}">
                            <input type="hidden" class="imagen-articulo" value="${articulo.imagen??'nodisponible.png'}">
                        </div>
                    </div>
                </div>   
    `)
  );
}

/**
 * Filtro de los artículos
 */
const botonesFiltros = document.querySelectorAll('#filtros button');
botonesFiltros.forEach(boton => {
    boton.addEventListener('click', e => {
        boton.classList.add('active');
        boton.setAttribute('aria-current', 'page');

        botonesFiltros.forEach(otroBoton => {
            if(otroBoton !== boton) {
                otroBoton.classList.remove('active');
                otroBoton.removeAttribute('aria-current');
            }
        });

        buscar = boton.innerHTML;
        if(buscar == 'Todos') {
            buscar = '';
        }
        filtrarPorNombre(buscar);
        mostrarArticulos();
    })
})

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
        case 'actualizar':
            mensajeAlerta = 'Datos acualizados';
            actualizarArticulos(datos, id);
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

/**
 * Determina en qué elemento se realiza un evento
 * @param elemento el elemento al que se le realiza el evento
 * @param evento el evento realizado
 * @param selector el selector seleccionado
 * @param manejador el método que maneja el evento
 */
const on = (elemento, evento, selector, manejador) => {
    elemento.addEventListener(evento, e => { // Agregamos el método para escuchar el evento
        if(e.target.closest(selector)) { // Si el objetivo del manejador es el selector
            manejador(e); // Ejecutamos el método del manejador
        }
    })
}

/**
 * Función para el botón Editar
 */
on(document, 'click', '.btn-editar', e => {
    const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón

    // Guardar los valores del card del artículo
    id = cardFooter.querySelector('.id-articulo').value;
    articulo = articulos.find(item => item.id == id);
    console.log(articulo);

    /*
    const codigo = cardFooter.parentNode.querySelector('span[name=spancodigo]').innerHTML;
    const nombre = cardFooter.parentNode.querySelector('span[name=spannombre]').innerHTML;
    const descripcion = cardFooter.parentNode.querySelector('.div-descripcion').innerHTML;
    const precio = cardFooter.parentNode.querySelector('span[name=spanprecio]').innerHTML;
    const imagen = cardFooter.querySelector('.imagen-articulo').value;
    */

    // Asignamos los valores a los input del formulario
    inputCodigo.value = articulo.codigo;
    inputNombre.value = articulo.nombre;
    inputDescripcion.value = articulo.descripcion;
    inputPrecio.value = articulo.precio;
    frmImagen.src = `./imagenes/productos/${articulo.imagen}`;

    // Mostramos el formulario
    formularioModal.show();

    opcion = 'actualizar';
})

/**
 * Función para el botón borrar
 */
on(document, 'click', '.btn-borrar', e => {
    const cardFooter = e.target.parentNode;
    id = cardFooter.querySelector('.id-articulo').value;
    articulo = articulos.find(item => item.id == id);

    /*
    const nombre = cardFooter.parentNode.querySelector('span[name=spannombre]').innerHTML;
    */

    let aceptar = confirm(`¿Relamente desea eliminar a ${articulo.nombre}?`);
    if(aceptar) {
        eliminarArticulos(id);
        insertarAlerta(`${articulo.nombre} borrado`, 'danger');
        mostrarArticulos();
    }
})

