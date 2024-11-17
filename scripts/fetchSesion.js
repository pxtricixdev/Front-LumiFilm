const api_sesion = 'https://localhost:7024/api/Sesion/pelicula/';

//Obtenemos el id de la película desde la url
const getMovieIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
};

//Fetch de las sesiones asociadas a una película
const fetchSesionByMovie = async (movieId) => {
    try {
        const response = await fetch(`${api_sesion}${movieId}`);
        const sesiones = await response.json();
        console.log(sesiones);
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
};

//Obtenemos el id y llamamos al fetch
const movieId = getMovieIdFromUrl();
if (movieId) {
    fetchSesionByMovie(movieId);
} else {
    console.log("No se encontró el ID de la película en la URL.");
}
