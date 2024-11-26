const api_sesion = 'https://localhost:7024/api/Sesion/pelicula/';
var notyf = new Notyf();

//Volver a la página anterior
const goBack = document.getElementById('go-back');
const volverAtras = () => {
    sessionStorage.removeItem('asientosSeleccionados');
    sessionStorage.removeItem('sesionSeleccionada')
    sessionStorage.removeItem('salaSeleccionada')
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

        const diaText = document.createElement('p');
        diaText.classList.add('sesiones__dia-text');
        diaText.textContent = dia;
        itemDia.appendChild(diaText);

        const listaHorariosPorDia = sesionesPorDia[dia].map(hora => {
            const itemHora = document.createElement('button');
            itemHora.classList.add('sesiones__horario-item');
            itemHora.textContent = formatHorario(hora.hora);
            itemHora.onclick = () => horarioClick(hora.sesionId); 
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

    const btnSiguiente = document.getElementById('btn-next');
    btnSiguiente.addEventListener('click', () => {
        const selectedSession = sessionStorage.getItem('sesionSeleccionada');
        const selectedSeats = sessionStorage.getItem('asientosSeleccionados');

        if (!selectedSession || !selectedSeats || JSON.parse(selectedSeats).length === 0) {
            notyf.error('Debes seleccionar una sesión y al menos un asiento.');
            return;
        }

    window.location.href = 'ticket.html';
    });
};

// Seleccionar un asiento (cambiar a gris temporalmente)
const seleccionarAsiento = (asientoDiv, asiento) => {
    let seleccionAsientos = JSON.parse(sessionStorage.getItem('asientosSeleccionados')) || [];

    if (asientoDiv.classList.contains('asiento-seleccionado')) {
        asientoDiv.classList.remove('asiento-seleccionado');
        seleccionAsientos = seleccionAsientos.filter(a => a.id !== asiento.id);
    } else {
        asientoDiv.classList.add('asiento-seleccionado');
        seleccionAsientos.push(asiento);
    }
    sessionStorage.setItem('asientosSeleccionados', JSON.stringify(seleccionAsientos));
};


//Fetch de asientos por sesion
const horarioClick = async (sesionId) => {
    sessionStorage.removeItem('asientosSeleccionados');

    try {
        const response = await fetch(`https://localhost:7024/api/Asiento/sesion/${sesionId}`);
        const sesion = await response.json();

        sessionStorage.setItem('sesionSeleccionada', sesionId);

        printAsientos(sesion);
    } catch (error) {
        console.error("Error al cargar los asientos:", error);
    }
};


//Fetch de sesiones por pelicula
const fetchSesionByMovie = async (movieId) => {
    try {
        const response = await fetch(`${api_sesion}${movieId}`);
        const sesiones = await response.json();
        console.log(sesiones);
        printSesiones(sesiones);
        sesiones.forEach(sesion => {
            console.log("Sala asociada a la sesión:", sesion.sala);
            sessionStorage.setItem('salaSeleccionada', JSON.stringify(sesion.sala));
        });

    } catch (error) {
        console.log("Error fetching data: ", error);
    }
};

const movieId = getMovieIdFromUrl();
if (movieId) {
    fetchSesionByMovie(movieId);
} else {
    console.log("No se encontró el ID de la película en la URL.");
}
