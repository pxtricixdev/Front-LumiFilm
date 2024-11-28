const modal = document.querySelector('.modal__search')
const btnSearch = document.getElementById('navbar-search')
const openSearchLink = document.getElementById('search-link')
const btnClose = document.getElementById('modal-close')

//Abrir y cerrar el modal con el navbar de movil
btnSearch.addEventListener('click', () => {
    modal.style.display = 'block';
})

btnClose.addEventListener('click', () => {
    modal.style.display = 'none'
})

//Abrir el modal con el link de buscar del header
openSearchLink.addEventListener('click', () => {
    modal.style.display = 'block';
})

//Traemos todas las películas de la api
const api_peliculas = 'https://localhost:7024/api/Pelicula/';
let movies = [];

const fetchPeliculasForModal = async () => {
    try {
        const response = await fetch(api_peliculas);
        movies = await response.json();
    } catch (error) {
        console.log("Error fetching data ", error);
    }
};

fetchPeliculasForModal()

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
        const movieElement = document.createElement('a');
        movieElement.className = 'movie__results-title';
        movieElement.textContent = movie.titulo;
        movieElement.href = `movieDetail.html?id=${movie.id}`;
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