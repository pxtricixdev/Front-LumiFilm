const api_pelis = 'http://34.202.78.59:8080/api/Pelicula/';

// Peticion a la api de peliculas /GET
const fetchPeliculas = async () => {
    try {
        const response = await fetch(api_pelis);
        const movies = await response.json();
        printMovies(movies);
    } catch (error) {
        console.log("Error fetching data ", error);
    }
};

// Función para elegir el svg segun la edad para la peli
const clasificacionEdad = (clasificacion) => {
    let rutaImagenClasificacion = '';
    switch (clasificacion) {
        case 0:
            rutaImagenClasificacion = '../assets/icons/edad0.svg';
            break;
        case 12:
            rutaImagenClasificacion = '../assets/icons/edad12.svg';
            break;
        case 16:
            rutaImagenClasificacion = '../assets/icons/edad16.svg';
            break;
        case 18:
            rutaImagenClasificacion = '../assets/icons/edad18.svg';
            break;
    }
    return `<img src="${rutaImagenClasificacion}" alt="Clasificación ${clasificacion}">`;
};

// Funcion para mostrar las peliculas 
const printMovies = (movies) => {
    const moviesList = document.getElementById('moviesList');

    movies.forEach(movie => {
        const { id, titulo, duracion, clasificacion, genero, imagen } = movie;

        const movieItem = document.createElement('li');
        movieItem.classList.add('movie-card');

        const movieLink = document.createElement('a');
        movieLink.href = `pelicula.html?id=${id}`;
        movieLink.classList.add('movie-card__link');

        const movieImage = document.createElement('img');
        movieImage.src = imagen;
        movieImage.classList.add('movies__imagen');
        movieImage.alt = `Poster de ${titulo}`;
        movieLink.appendChild(movieImage); 
        movieItem.appendChild(movieLink); 

        const movieContent = document.createElement('div');
        movieContent.classList.add('movies__content');

        const movieTitle = document.createElement('a');
        movieTitle.href = `movieDetail.html?id=${id}`; 
        movieTitle.textContent = titulo;
        movieTitle.classList.add('movies__title');
        movieContent.appendChild(movieTitle);

        const movieDuration = document.createElement('div');
        movieDuration.classList.add('movies__duration');
        movieDuration.innerHTML = `
            <img src="../assets/icons/reloj.svg" alt="Duración">
            <span class="movies__value">${duracion}</span>
            <span class="movies__value">min</span>
        `;
        
        movieContent.appendChild(movieDuration);

        const movieCategory = document.createElement('div');
        movieCategory.classList.add('movies__category');
        movieCategory.innerHTML = `
            <img src="../assets/icons/ticket.svg" alt="Genero">
            <span class="movies__value">${genero}</span>
        `;

        movieContent.appendChild(movieCategory);

        const moviePegi = document.createElement('div');
        moviePegi.classList.add('movies__pegi');
        moviePegi.innerHTML = clasificacionEdad(clasificacion); 
        movieContent.appendChild(moviePegi);

        movieItem.appendChild(movieContent);
        moviesList.appendChild(movieItem);
    });
};

fetchPeliculas()