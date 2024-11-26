const goBack = document.getElementById('go-back');
const volverAtras = () => {
    window.history.back();
};

var notyf = new Notyf();
const peliculaSeleccionada = JSON.parse(localStorage.getItem('peliculaSeleccionada'));
const sesionSeleccionada = sessionStorage.getItem('sesionSeleccionada');
const asientosSeleccionados = JSON.parse(sessionStorage.getItem('asientosSeleccionados'));
const salaSeleccionada = JSON.parse(sessionStorage.getItem('salaSeleccionada'));

const formulario = document.getElementById('datosFormulario')
formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const datos = Object.fromEntries(formData.entries());

    const datosCompletos = {
        pelicula: {
            id: peliculaSeleccionada.id,
            titulo: peliculaSeleccionada.titulo,
            sinopsis: peliculaSeleccionada.sinopsis,
            duracion: peliculaSeleccionada.duracion,
            clasificacion: peliculaSeleccionada.clasificacion,
            genero: peliculaSeleccionada.genero,
            direccion: peliculaSeleccionada.direccion,
            imagen: peliculaSeleccionada.imagen,
        },
        sala: {
            id: salaSeleccionada, 
        },
        asientosReservados: asientosSeleccionados.map(asiento => ({
            columna: asiento.columna,
            fila: asiento.fila,
            ocupado: true,
            precio: asiento.precio,
        })),
        fechaTicket: new Date().toISOString(),
        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.tel,
        mail: datos.email,
        precioTotal: asientosSeleccionados.reduce((sum, asiento) => sum + parseFloat(asiento.precio), 0),
    };

    try {
        const response = await fetch('https://localhost:7024/api/Ticket', {
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
