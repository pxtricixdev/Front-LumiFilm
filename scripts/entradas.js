const api_tickets = 'https://localhost:7024/api/Ticket'

const fetchTickets = async () => {
    try {
        const response = await fetch(api_tickets);
        const tickets = await response.json();
        console.log(tickets);
        printTickets(tickets);
    
    } catch (error) {
        console.error("Hubo un error al realizar la petición", error)
    }
}

const printTickets = (tickets) => {
    const contenedor = document.querySelector('.mainEntradas__contenedor');
    const noHayEntradas = document.createElement('p')

    if (tickets.length <= 0) {
        noHayEntradas.textContent = 'Aún no has comprado ninguna entrada. ¡Explora nuestra cartelera y consigue la tuya!'
        noHayEntradas.classList.add('mainEntradas__empty');
        contenedor.appendChild(noHayEntradas);

    } else {
        tickets.forEach(ticket => {
            const { asientosReservados, fecha, hora, pelicula, sala, precioTotal } = ticket;
    
            const asientos = asientosReservados
            .map(asiento => `${asiento.fila}${asiento.columna}`)
            .join(', ');
    
            const content = document.createElement('div');
            content.classList.add('mainEntradas__content');
    
    
            const tituloPelicula = document.createElement('p');
            tituloPelicula.textContent =`${pelicula.titulo}`;
            tituloPelicula.classList.add('mainEntradas__pelicula');
    
            const salaTicket = document.createElement('p');
            salaTicket.textContent =`Sala ${sala.id}`;
            salaTicket.classList.add('mainEntradas__sala');
            
            const fechaTicket = document.createElement('p');
            const fechaSplit = fecha.split("-");
            const fechaFormateada = `${fechaSplit[2]}/${fechaSplit[1]}/${fechaSplit[0]}`;
            fechaTicket.textContent = `${fechaFormateada}`;;
            fechaTicket.classList.add('mainEntradas__fecha');
    
            const horaTicket = document.createElement('p');
            const horaFormateada = hora.substring(0, 5);
            horaTicket.textContent = `${horaFormateada}`;
            horaTicket.classList.add('mainEntradas__hora');
    
            const asientosTicket = document.createElement('p')
            asientosTicket.textContent =`Asientos: ${asientos}`;
            asientosTicket.classList.add('mainEntradas__asientos');
    
            const precioTicket = document.createElement('p');
            precioTicket.textContent =`Precio total: ${precioTotal} €`;
            precioTicket.classList.add('mainEntradas__precio');
    
            const recordatorio = document.createElement('p');
            recordatorio.innerHTML = `
                * Este código de barras será escaneado a la entrada.<br>
                * Entrada válida únicamente para la sala y la fecha señalada.<br>
            `;
            recordatorio.classList.add('mainEntradas__recordatorio')
    
            content.appendChild(tituloPelicula);
            content.appendChild(fechaTicket);
            content.appendChild(horaTicket);
            content.appendChild(salaTicket);
            content.appendChild(asientosTicket);
            content.appendChild(precioTicket);
            content.appendChild(recordatorio);
            contenedor.appendChild(content);
    
        });
    }
}

fetchTickets();

