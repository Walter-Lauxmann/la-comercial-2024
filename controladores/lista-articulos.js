import { seleccionarArticulos } from "../modelos/articulos.js";

const listado = document.querySelector("#listado");

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
