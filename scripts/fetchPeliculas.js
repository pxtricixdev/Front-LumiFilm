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

const printMovies = (movies) => {
    const moviesGrid = document.getElementById('movies'); 

    movies.forEach(movie => {
        const { Titulo,  Duracion, Clasificacion, Genero, Imagen } = movie;

        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

      
        const movieImage = document.createElement('img');
        movieImage.src = `../assets/images/pelis/${Imagen}`;
        movieImage.classList.add('movies__imagen');
        movieCard.appendChild(movieImage);
        
        const movieContentRight = document.createElement('div');
        movieContentRight.classList.add('movies__content__right');

       
        const movieTitle = document.createElement('h2');
        movieTitle.textContent = Titulo;
        movieTitle.classList.add('movies__title');
        movieContentRight.appendChild(movieTitle);

       
        const movieDuration = document.createElement('div');
        movieDuration.classList.add('movies__duration');
        movieDuration.innerHTML = `
        <img src="../assets/icons/butaca.svg" alt="Duración"> ${Duracion} min.
        `;
        movieContentRight.appendChild(movieDuration);

        
        const movieCategory = document.createElement('div');
        movieCategory.classList.add('movies__category');
        movieCategory.innerHTML = `
        <img src="../assets/icons/butaca.svg" alt="Genero"> ${Genero}
        `;
        movieContentRight.appendChild(movieCategory);

        
        const moviePegi = document.createElement('div');
        moviePegi.classList.add('movies__pegi');
        moviePegi.innerHTML = `
        <img src="../assets/icons/butaca.svg" alt="Clasificación"> ${Clasificacion}
        `;

        movieContentRight.appendChild(moviePegi);

        
        movieCard.appendChild(movieContentRight);


        moviesGrid.appendChild(movieCard);
    });
};




fetchPeliculas();