const modal = document.querySelector('.modal__search')
const btnSearch = document.getElementById('navbar-search')
const openSearchLink = document.getElementById('search-link')
const btnClose = document.getElementById('modal-close')

//Abrir y cerrar el modal
btnSearch.addEventListener('click', () => {
    modal.style.display = 'flex';
})

btnClose.addEventListener('click', () => {
    modal.style.display = 'none'
})

//Traemos todas las películas de la api
const api_pelis = 'https://localhost:7024/api/Pelicula/';
let movies = [];

const fetchPeliculas = async () => {
    try {
        const response = await fetch(api_pelis);
        movies = await response.json();
    } catch (error) {
        console.log("Error fetching data ", error);
    }
};

fetchPeliculas()

//Búsqueda de la película
const searchInput = document.getElementById('search-movie');
const results = document.getElementById('results')

const renderMovies = (filteredMovies) => {
    results.innerHTML = '';

    if (filteredMovies.length === 0) {
        results.innerHTML = '<p>No se encontraron películas</p>';
        return;
    }

    filteredMovies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-item';
        movieElement.textContent = movie.titulo;
        results.appendChild(movieElement);
    });
};

searchInput.addEventListener('input', (event) => {
    const letter = event.target.value.toLowerCase();
    if (!letter.trim()) {
        results.innerHTML = ''; 
        return;
    }

    const filteredMovies = movies.filter(movie =>
        movie.titulo.toLowerCase().includes(letter)
    );
    renderMovies(filteredMovies);
});