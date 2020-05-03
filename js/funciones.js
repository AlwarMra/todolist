

// 1. Pintar tareas en el HTML 


var seccionUrgente = document.getElementById('seccionUrgente');
var seccionSemanal = document.getElementById('seccionSemanal');
var seccionMensual = document.getElementById('seccionMensual');


function pintarTareas(pListaTareas) {

    seccionUrgente.innerHTML = "";
    seccionSemanal.innerHTML = "";
    seccionMensual.innerHTML = "";

    pListaTareas.forEach(tarea => {

        if (tarea.importancia == 'urgente') {

            seccionUrgente.innerHTML +=
                ` <article class="tarea" id="${tarea.idTarea}">
            <p>${tarea.titulo}</p>
            <div class="eliminar ${tarea.importancia}">
            <i class="fas fa-trash"></i>
            </div>
            </article>`;


        } 
        else if (tarea.importancia == 'semanal') {
            seccionSemanal.innerHTML +=
                ` <article class="tarea" id="${tarea.idTarea}">
            <p>${tarea.titulo}</p>
            <div class="eliminar ${tarea.importancia}">
            <i class="fas fa-trash"></i>
            </div>
            </article>`;
        } 
        else {
            seccionMensual.innerHTML +=
                ` <article class="tarea" id="${tarea.idTarea}">
            <p>${tarea.titulo}</p>
            <div class="eliminar ${tarea.importancia}">
            <i class="fas fa-trash"></i>
            </div>
            </article>`;

        }


    });

    // let colorEliminar = document.getElementsByClassName('eliminar');
    // let idTarea = document.getElementsByClassName('tarea');

    // for (let i = 0; i < pListaTareas.length; i++) {
    //     let importancia = pListaTareas[i]['importancia'];
    //     let id = pListaTareas[i]['idTarea'];

    //     colorEliminar[i].classList.add(importancia);
    //     idTarea[i].setAttribute('id', id);
    // }


    // Recogemos la clase de borrado cada vez que pintamos para que no queden tareas exluídas.
    var basuras = document.getElementsByClassName('fa-trash');

    for (basura of basuras) {
        basura.addEventListener('click', eliminarTarea);
    }
}
pintarTareas(listaTareas);


// 2. Eliminar tarea. Nótese que recolectamos los elementos a borrar cada vez que pintamos las tareas para que las nuevas no queden excluidas


function eliminarTarea(event) {
    // a) borramos del Array
    let idTarea = event.target.parentNode.parentNode.getAttribute('id');
    let tareaBorradaLista = listaTareas.findIndex(tarea => tarea.idTarea == idTarea);
    listaTareas.splice(tareaBorradaLista, 1);

    // b) borramos del HTML
    event.target.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
}


// 3. Añadir tarea



var btAnadir = document.getElementById('btAnadir');
btAnadir.addEventListener('click', anadirTarea);

function anadirTarea(event) {
    event.preventDefault();

    let importancia = document.getElementById('importancia').value;
    let nuevaTarea = document.getElementById('nuevaTarea').value;

    if (importancia != 'queimportancia' && nuevaTarea != "") {
        let tarea = {
            idTarea: listaTareas[listaTareas.length - 1]['idTarea'] + 1,
            titulo: nuevaTarea,
            importancia: importancia
        }
        listaTareas.push(tarea);
    }

    pintarTareas(listaTareas);

}





// 4. Filtrar tarea

var btFiltrar = document.getElementById('btFiltrar');
btFiltrar.addEventListener('click', filtrarImportancia);

function filtrarImportancia(event) {
    event.preventDefault();

    let tipoImportancia = document.getElementById('tipoImportancia').value;
    let listaFiltro = new Array();

    for (tarea of listaTareas) {
        if (tipoImportancia == tarea.importancia) {
            listaFiltro.push(tarea);
        }
    }
    pintarTareas(listaFiltro);
}




// 5. Buscar tarea

var btBuscar = document.getElementById('btBuscar');
btBuscar.addEventListener('click', buscarTarea);

function buscarTarea() {
    event.preventDefault();

    busqueda = document.getElementById('busqueda').value.toLowerCase();
    let busquedaPersonalizada = new Array();

    for (tarea of listaTareas) {
        if (tarea.titulo.toLowerCase().includes(busqueda)) {
            busquedaPersonalizada.push(tarea);
        }
    }
    pintarTareas(busquedaPersonalizada);

}






