const modal = document.querySelector('.modal__search')
const btnSearch = document.getElementById('navbar-search')
const btnClose = document.getElementById('modal-close')
const openSearchLink = document.getElementById('search-link')

let movies = [];

btnSearch.addEventListener('click', () => {
    modal.style.display = 'flex';
})

btnClose.addEventListener('click', () => {
    modal.style.display = 'none'
})