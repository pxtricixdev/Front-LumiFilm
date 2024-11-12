const api_pelis = 'https://localhost:7024/api/Pelicula'

const fetchPeliculas = async()=> {
    try {
        const response = await fetch(api_pelis);
        const data = await response.json();
        console.log(data)
    }
    catch(error) {
        console.log("Error fetching data ",error);
    }
}

fetchPeliculas();