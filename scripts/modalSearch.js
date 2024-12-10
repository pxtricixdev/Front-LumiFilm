const modal = document.querySelector('.modal__search')
const btnSearch = document.getElementById('navbar-search')
const openSearchLink = document.getElementById('search-link')
const btnClose = document.getElementById('modal-close')

// Variable para evitar múltiples llamadas a la API
let movies = [];
let isDataFetched = false;

//Petición get de todas las películas y las guarda en la variable movies
const api_peliculas = 'https://localhost:7024/api/Pelicula/';
const fetchPeliculasForModal = async () => {
    try {
        const response = await fetch(api_peliculas);
        movies = await response.json();
        isDataFetched = true;
    } catch (error) {
        console.log("Error fetching data ", error);
    }
};

// Abrir y cerrar el modal con el botón del navbar de móvil
btnSearch.addEventListener('click', () => {
    modal.style.display = 'block';
    if (!isDataFetched) {
        fetchPeliculasForModal();
    }
});

btnClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Abrir el modal con el link de buscar del header
openSearchLink.addEventListener('click', () => {
    modal.style.display = 'block';
    if (!isDataFetched) {
        fetchPeliculasForModal();
    }
});

//Muestra las películas para las cuales se ha encontrado coincidencias
const searchInput = document.getElementById('search-movie');
const results = document.getElementById('results')
const renderMovies = (filteredMovies) => {
    results.innerHTML = '';

    if (filteredMovies.length === 0) {
        results.innerHTML = '<p>No se encontraron películas</p>';
        return;
    }

    filteredMovies.forEach(movie => {
        const movieElement = document.createElement('a');
        movieElement.className = 'movie__results-title';
        movieElement.textContent = movie.titulo;
        movieElement.href = `pelicula.html?id=${movie.id}`;
        results.appendChild(movieElement);
    });
};

//Busca las películas que incluye la búsqueda del input
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