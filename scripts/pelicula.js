const api_pelis = 'http://34.202.78.59:8080/api/Pelicula/';

const getMovieIdFromUrl = () => {
    const url = new URL(window.location.href);
    return url.searchParams.get('id');
};

// Funcion para el detalle de las peliculas 
const printMovieDetail = (movie) => {
    const movieDetail = document.getElementById('movieDetail'); 
    const { titulo, duracion, clasificacion, genero, imagen, sinopsis, direccion } = movie;

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-detail__container');

    const movieImage = document.createElement('img');
    movieImage.src = imagen;
    movieImage.classList.add('movie-detail__image');
    movieContainer.appendChild(movieImage);

    const movieContent = document.createElement('div');
    movieContent.classList.add('movie-detail__content');

    const movieTitle = document.createElement('h4');
    movieTitle.textContent = titulo;
    movieTitle.classList.add('movie-detail__title');
    movieContent.appendChild(movieTitle);

    const movieInfo = document.createElement('p');
    movieInfo.classList.add('movie-detail__info');
    movieInfo.innerHTML = `
        <span class="movie-detail__clasificacion">+ ${clasificacion}</span> |
        <span class="movie-detail__duracion">${duracion} min</span> |
        <span class="movie-detail__genero">${genero}</span>
    `;
    movieContent.appendChild(movieInfo);

    const movieSinopsisTitle = document.createElement('p');
    movieSinopsisTitle.classList.add('movie-detail__section-title');
    movieSinopsisTitle.textContent = 'Sinopsis:';
    movieContent.appendChild(movieSinopsisTitle);

    const movieSinopsis = document.createElement('p');
    movieSinopsis.classList.add('movie-detail__sinopsis');
    movieSinopsis.textContent = sinopsis;
    movieContent.appendChild(movieSinopsis);

    const movieDirectorTitle = document.createElement('p');
    movieDirectorTitle.classList.add('movie-detail__section-title');
    movieDirectorTitle.textContent = 'Director:';
    movieContent.appendChild(movieDirectorTitle);

    const movieDirector = document.createElement('p');
    movieDirector.classList.add('movie-detail__director');
    movieDirector.textContent = direccion;
    movieContent.appendChild(movieDirector);

    const movieActions = document.createElement('div');
    movieActions.classList.add('movie-detail__actions');

    const buyButton = document.createElement('button');
    buyButton.textContent = 'Comprar';
    buyButton.classList.add('movie-detail__button');
    buyButton.classList.add('button');
    buyButton.setAttribute('id', 'movie-detail__buy');
    buyButton.addEventListener('click', redireccionAsientos);

    movieActions.appendChild(buyButton);
    movieContent.appendChild(movieActions);
    movieContainer.appendChild(movieContent);
    movieDetail.appendChild(movieContainer);
};
 

const redireccionAsientos = () => {
    const movieId = new URLSearchParams(window.location.search).get('id');
    if (movieId) {
        window.location.href = `sesiones.html?id=${movieId}`;
    } else {
        console.error('No se encontró el ID de la película en la URL.');
    }
}

// Hacer la peticion a la api de pelis + id 
const fetchPeliculaById = async (id) => {
    try {
        const response = await fetch(`${api_pelis}${id}`);
        const movie = await response.json();
        localStorage.setItem('peliculaSeleccionada', JSON.stringify(movie));
        printMovieDetail(movie);
    } catch (error) {
        console.log("Error fetching data for movie ID: ", error);
    }
};

const movieId = getMovieIdFromUrl();

if (movieId) {
    fetchPeliculaById(movieId);
}
