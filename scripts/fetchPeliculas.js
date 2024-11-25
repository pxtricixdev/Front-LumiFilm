const api_pelis = 'http://34.202.78.59:8080/api/Pelicula/';

const fetchPeliculas = async () => {
    try {
        const response = await fetch(api_pelis);
        const movies = await response.json();
        console.log(movies);
        printMovies(movies);
    } catch (error) {
        console.log("Error fetching data ", error);
    }
};

fetchPeliculas()
