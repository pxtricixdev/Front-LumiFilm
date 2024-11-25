const goBack = document.getElementById('go-back');
const volverAtras = () => {
    window.history.back();
};

var notyf = new Notyf();
const peliculaSeleccionada = JSON.parse(localStorage.getItem('peliculaSeleccionada'));

const formulario = document.getElementById('datosFormulario')
formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const datos = Object.fromEntries(formData.entries());

    const datosCompletos = {
        pelicula: {
            titulo: peliculaSeleccionada.titulo,
            sinopsis: peliculaSeleccionada.sinopsis,
            duracion: peliculaSeleccionada.duracion,
            clasificacion: peliculaSeleccionada.clasificacion,
            genero: peliculaSeleccionada.genero,
            direccion: peliculaSeleccionada.direccion,
            imagen: peliculaSeleccionada.imagen,
        },
        sala: {
            id: 1 
        },
        asientosReservados: [
            {
                columna: 3,
                fila: "B",
                ocupado: true,
                precio: 10
            }
        ],
        fechaTicket: new Date().toISOString(),
        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.tel,
        mail: datos.email,
        total: 10,
    };

    try {
        const response = await fetch('https://34.202.78.59:8080/api/Ticket', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosCompletos) 
        });

        if(response.ok) {
            const result = await response.json();
            notyf.success('Compra realizada con éxito!');
            console.log('Respuesta de la API:', result);
        } else {
            const error = await response.json();
            notyf.error('Error en la compra: ' + error.message);
            console.error('Error en la API:', error);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('No se pudo realizar la compra. Intenta de nuevo.');
      }
});
