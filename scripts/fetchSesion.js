const api_sesion = 'https://localhost:7024/api/Sesion/pelicula/';

//Volver a la página anterior
const goBack = document.getElementById('go-back');
const volverAtras = () => {
    window.history.back();
};

//Obtenemos el id de la película desde la URL
const getMovieIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
};

//Formateamos las fechas para mostrar solo el día y el mes
const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}`;
};

//Formatear el horario para mostrar solo la hora y minutos
const formatHorario = (dateString) => {
    const [hour, min, sec] = dateString.split(':');
    return `${hour}:${min}`;
};

//Agrupamos las sesiones por día
function agruparSesionesPorDia(sesiones) {
    const resultado = {};

    sesiones.forEach(sesion => {
        const dia = formatDate(sesion.dia);
        const hora = {
            hora: sesion.hora,
            sesionId: sesion.id
        };

        if (!resultado[dia]) {
            resultado[dia] = [];
        }
        resultado[dia].push(hora);
    });

    return resultado;
}

//Pintamos los datos agrupados por día
const printSesiones = (sesiones) => {
    const listaDias = document.querySelector('.sesiones__dia-list');

    const sesionesPorDia = agruparSesionesPorDia(sesiones);

    for (let dia in sesionesPorDia) {
        const itemDia = document.createElement('div');
        itemDia.classList.add('sesiones__dia-item');

        // Título del día
        const diaText = document.createElement('p');
        diaText.classList.add('sesiones__dia-text');
        diaText.textContent = dia;
        itemDia.appendChild(diaText);

        // Botones de horarios
        const listaHorariosPorDia = sesionesPorDia[dia].map(hora => {
            const itemHora = document.createElement('button');
            itemHora.classList.add('sesiones__horario-item');
            itemHora.textContent = formatHorario(hora.hora);
            itemHora.onclick = () => HorarioClick(hora.sesionId); //click en sesion da asientos 
            return itemHora;
        });

        const ulHorarios = document.createElement('ul');
        ulHorarios.classList.add('sesiones__horarios-dia');
        ulHorarios.append(...listaHorariosPorDia);

        itemDia.appendChild(ulHorarios);
        listaDias.appendChild(itemDia);
    }
};

// Pintar los asientos 
const printAsientos = (asientos) => {
    const contenedorBoton = document.querySelector('.sesiones__boton')
    const contenedorAsientos = document.querySelector('.sesiones__asientos');
    contenedorAsientos.innerHTML = '';

    asientos.forEach(asiento => {
        const asientoDiv = document.createElement('div');
        asientoDiv.classList.add('asiento');

        if (asiento.ocupado) {
            asientoDiv.classList.add('asiento-ocupado');
        } else {
            asientoDiv.classList.add('asiento-libre');
            asientoDiv.onclick = () => seleccionarAsiento(asientoDiv, asiento);
        }

        contenedorAsientos.appendChild(asientoDiv);
    });

    const btnSiguiente = document.createElement('button')
    btnSiguiente.classList.add('sesiones__boton-siguiente')
    btnSiguiente.classList.add('button')
    btnSiguiente.textContent='Siguiente'
    btnSiguiente.addEventListener('click', () => {
        window.location.href = 'ticket.html';
    });
    contenedorBoton.appendChild(btnSiguiente)
};

// Seleccionar un asiento (cambiar a gris temporalmente)
const seleccionarAsiento = (asientoDiv, asiento) => {
    if (asientoDiv.classList.contains('asiento-seleccionado')) {
        asientoDiv.classList.remove('asiento-seleccionado'); // Desmarcar asiento
    } else {
        asientoDiv.classList.add('asiento-seleccionado'); // Marcar asiento
    }
};


// Reservar un asiento (cambiar a rojo)
const reservarAsiento = async (asiento) => {
    const confirmacion = confirm(`¿Deseas reservar el asiento ${asiento.fila}${asiento.columna}?`);
    if (!confirmacion) return;

    try {
        const response = await fetch(`https://localhost:7024/api/Asiento/sesion/${asiento.sesionId}/${asiento.fila}/${asiento.columna}/reservar`, {
            method: 'PUT'
        });

        if (response.ok) {
            alert('¡Asiento reservado con éxito!');
            asiento.ocupado = true;

            // Cambiar el asiento seleccionado a ocupado (rojo)
            const asientoDiv = document.querySelector(`.asiento-seleccionado`);
            if (asientoDiv) {
                asientoDiv.classList.remove('asiento-seleccionado');
                asientoDiv.classList.add('asiento-ocupado');
            }

            printAsientos([asiento]);
        } else {
            const error = await response.text();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error("Error al reservar el asiento:", error);
        alert("No se pudo reservar el asiento.");
    }
};

// Al pulsar click en una hora te de los asientos de esa sesion
const HorarioClick = async (sesionId) => {
    try {
        const response = await fetch(`https://localhost:7024/api/Asiento/sesion/${sesionId}`);
        const asientos = await response.json();
        printAsientos(asientos);
    } catch (error) {
        console.error("Error al cargar los asientos:", error);
    }
};

// Fetch de las sesiones asociadas a una película
const fetchSesionByMovie = async (movieId) => {
    try {
        const response = await fetch(`${api_sesion}${movieId}`);
        const sesiones = await response.json();
        console.log(sesiones);
        printSesiones(sesiones);
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
};

// Obtenemos el id y llamamos al fetch
const movieId = getMovieIdFromUrl();
if (movieId) {
    fetchSesionByMovie(movieId);
} else {
    console.log("No se encontró el ID de la película en la URL.");
}
