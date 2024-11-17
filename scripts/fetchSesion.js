const api_sesion = 'https://localhost:7024/api/Sesion/pelicula/';

//Volver a la página anterior
const goBack = document.getElementById('go-back')
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
    const [hour, min, sec ] = dateString.split(':');
    return `${hour}:${min}`;
}

//Agrupamos las sesiones por día
function agruparSesionesPorDia(sesiones) {
    const resultado = {};

    sesiones.forEach(sesion => {
        const dia = formatDate(sesion.dia); 
        const hora = formatHorario(sesion.hora);

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

    for(let dia in sesionesPorDia) {
        //Div para cada día
        const itemDia = document.createElement('div');
        itemDia.classList.add('sesiones__dia-item');

        const diaText = document.createElement('p');
        diaText.classList.add('sesiones__dia-text');
        diaText.textContent = dia;

        itemDia.appendChild(diaText);

        //Para cada día añadimos botones con cada hora
        const listaHorariosPorDia = sesionesPorDia[dia].map(hora => {
            const itemHora = document.createElement('button'); 
            itemHora.classList.add('sesiones__horario-item');
            itemHora.textContent = formatHorario(hora); 
            return itemHora; 
        })

        const ulHorarios = document.createElement('ul');
        ulHorarios.classList.add('sesiones__horarios-dia');
        ulHorarios.append(...listaHorariosPorDia);

        itemDia.appendChild(ulHorarios);
        listaDias.appendChild(itemDia);

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
