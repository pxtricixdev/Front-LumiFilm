const api_sesion = 'https://localhost:7024/api/Sesion/';

const fethSesion = async () => {
    try {
        const response = await fetch(api_pelis);
        const sesiones = await response.json();
        console.log(sesiones);
    } catch (error) {
        console.log("Error fetching data ", error);
    }
};

fethSesion()