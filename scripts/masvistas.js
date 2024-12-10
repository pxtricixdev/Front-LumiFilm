const api_masVistas = 'https://localhost:7024/api/Pelicula/MasVistas'

const fetchMasVistas = async () => {
    try {
        const response = await fetch(api_masVistas);
        const pelisMasVistas = await response.json(); 
        printMasVistas(pelisMasVistas); 

    } catch (error) {
        console.log("Error fetching data", error)
    }
}

const printMasVistas = (peliculas) => {
    const masVistoGrid = document.querySelector('.masVisto__grid');

    peliculas.forEach(pelicula => {
        const { id, titulo, genero, imagen } = pelicula;

        // Crear enlace de la película
        const peliculaLink = document.createElement('a');
        peliculaLink.href = `pelicula.html?id=${id}`; 
        peliculaLink.classList.add('masVisto__pelicula');
        peliculaLink.style.backgroundImage = `url(${imagen})`; 

        // Crear contenedor de datos
        const datosDiv = document.createElement('div');
        datosDiv.classList.add('masVisto__pelicula-datos');

        const tituloP = document.createElement('p');
        tituloP.classList.add('masVisto__pelicula-datos-titulo');
        tituloP.textContent = titulo;

        const generoP = document.createElement('p');
        generoP.classList.add('masVisto__pelicula-datos-genero');
        generoP.textContent = genero;

        datosDiv.appendChild(tituloP);
        datosDiv.appendChild(generoP);

        peliculaLink.appendChild(datosDiv);

        masVistoGrid.appendChild(peliculaLink);
    });
}

fetchMasVistas();