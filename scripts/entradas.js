const api_pelis = 'https://localhost:7024/api/Entrada/';

const fetchEntrada = async () => {
    try {
        const response = await fetch(api_pelis);
        const entradas = await response.json();
        console.log(entradas);
        printEntradas(entradas);
    } catch (error) {
        console.log("Error fetching data ", error);
    }
};

const printEntradas = (entradas) => {
    const entradasList = document.getElementById('entradasList');

    // Título de las columnas
    const titleRow = document.createElement('div');
    titleRow.classList.add('entradas-title');
    titleRow.innerHTML = `
        <span class="entradas-title__left">ENTRADA</span>
        <span class="entradas-title__right">CANTIDAD</span>
    `;
    entradasList.appendChild(titleRow);

    entradas.forEach((entrada) => {
        const { id, tipo, precio } = entrada;

        const entradaItem = document.createElement('li');
        entradaItem.classList.add('entrada-card');

        const entradaInfo = document.createElement('div');
        entradaInfo.classList.add('entrada-card__info');
   
        const punto = document.createElement('span');
        punto.classList.add('entrada-card__punto');
        punto.textContent = '•';

        // info entrada
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('entrada-card__text');

        const tipoElement = document.createElement('span');
        tipoElement.classList.add('entrada-card__tipo');
        tipoElement.textContent = tipo;

        const precioElement = document.createElement('span');
        precioElement.classList.add('entrada-card__precio');
        precioElement.textContent = `${precio.toFixed(2)}€`;

        infoContainer.appendChild(tipoElement);
        infoContainer.appendChild(precioElement);
        
        entradaInfo.appendChild(punto);
        entradaInfo.appendChild(infoContainer);

        entradaItem.appendChild(entradaInfo);

        // tipo de entrada + cantidad 
        const cantidadContainer = document.createElement('div');
        cantidadContainer.classList.add('entrada-card__cantidad');

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.classList.add('entrada-card__btn', 'entrada-card__btn--minus');
        minusButton.addEventListener('click', () => updateQuantity(id, -1));

        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = '0';
        quantityDisplay.classList.add('entrada-card__quantity');
        quantityDisplay.id = `quantity-${id}`;

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.classList.add('entrada-card__btn', 'entrada-card__btn--plus');
        plusButton.addEventListener('click', () => updateQuantity(id, 1));

        cantidadContainer.appendChild(minusButton);
        cantidadContainer.appendChild(quantityDisplay);
        cantidadContainer.appendChild(plusButton);

        entradaItem.appendChild(cantidadContainer);
        entradasList.appendChild(entradaItem);
    });

    // total container
    const totalContainer = document.createElement('div');
    totalContainer.classList.add('total-container');
    totalContainer.innerHTML = `
        <div class="total-container__info">
            <span class="total-container__title">TOTAL</span>
            <span class="total-container__amount" id="total-amount">0,00€</span>
        </div>
        <p class="total-container__note">Gastos de gestión e IVA incluidos.</p>
        <button class="total-container__btn">Proceder al pago</button>
    `;
    entradasList.appendChild(totalContainer);
};

// para seleccionar cantidad
const updateQuantity = (id, change) => {
    const quantityElement = document.getElementById(`quantity-${id}`);
    let currentQuantity = parseInt(quantityElement.textContent, 10);
    currentQuantity = Math.max(0, currentQuantity + change); // Evitar valores negativos
    quantityElement.textContent = currentQuantity;

    updateTotal();
};

// calcular total del predio
const updateTotal = () => {
    const entradasList = document.querySelectorAll('.entrada-card');
    let total = 0;

    entradasList.forEach((entrada) => {
        const priceText = entrada.querySelector('.entrada-card__precio').textContent.replace('€', '');
        const price = parseFloat(priceText);
        const quantity = parseInt(entrada.querySelector('.entrada-card__quantity').textContent, 10);
        total += price * quantity;
    });

    const totalElement = document.getElementById('total-amount');
    totalElement.textContent = `${total.toFixed(2)}€`;
};

fetchEntrada();
