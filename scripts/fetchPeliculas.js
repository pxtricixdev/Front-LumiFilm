const api_pelis = 'https://localhost:7024/api/Pelicula'

const fetchPeliculas = async()=> {
    try {
        const response = await fetch(api_pelis);
        const movies = await response.json();
        console.log(movies)
        printMovies(movies);
    }
    catch(error) {
        console.log("Error fetching data ",error);
    }
}

 
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
}

const moviesGrid = document.getElementById('movies'); 
const moviesList = document.getElementById('moviesList')

const printMovies = (movies) => {

    movies.forEach(movie => {
        const { 
            titulo,  
            duracion, 
            clasificacion, 
            genero, 
            imagen 
        } = movie;
        
        const movieCard = document.createElement('li');
        movieCard.classList.add('movie-card');
        moviesList.appendChild(movieCard);

        const movieImage = document.createElement('img');
        movieImage.src = `${imagen}`;
        movieImage.classList.add('movies__imagen');
        movieCard.appendChild(movieImage);
        
        const movieContentRight = document.createElement('div');
        movieContentRight.classList.add('movies__content__right');

        const movieTitle = document.createElement('h2');
        movieTitle.innerText = titulo;
        movieTitle.classList.add('movies__title');
        movieContentRight.appendChild(movieTitle);
       
        const movieDuration = document.createElement('div');
        movieDuration.classList.add('movies__duration');
        movieDuration.innerHTML = `
        <img src="../assets/icons/butaca.svg" alt="Duración"> ${duracion} min.
        `;
        movieContentRight.appendChild(movieDuration);
        
        const movieCategory = document.createElement('div');
        movieCategory.classList.add('movies__category');
        movieCategory.innerHTML = `
        <img src="../assets/icons/butaca.svg" alt="Genero"> ${genero}
        `;
        movieContentRight.appendChild(movieCategory);
       
        const moviePegi = document.createElement('div');
        moviePegi.classList.add('movies__pegi');
        moviePegi.innerHTML = clasificacionEdad(clasificacion);
        console.log(clasificacionEdad());

        movieContentRight.appendChild(moviePegi);
        movieCard.appendChild(movieContentRight);
        moviesGrid.appendChild(movieCard);
    });
};
fetchPeliculas();