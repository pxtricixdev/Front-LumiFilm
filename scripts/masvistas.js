const api_masVistas = 'https://localhost:7024/api/Pelicula/MasVistas'

const fetchMasVistas = async () => {
    try {
        const response = await fetch(api_masVistas);
        const pelisMasVistas = await response.json();
        console.log(pelisMasVistas);
    
    } catch (error) {
        console.log("Error fetching data", error)
    }
}

const printData = (peliculas) => {
    const containerGrid = document.getElementById('masVisto-grid');

    peliculas.forEach(pelicula => {
        const { id, titulo, duracion, clasificacion, genero, imagen, masVistas } = pelicula;
    });
}

fetchMasVistas();