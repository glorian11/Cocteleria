const buscador = document.querySelector('#buscador');
const contenedor = document.querySelector('#contenedor'); 
const tarjeta = document.querySelector('.tarjeta');
const logo = document.querySelector('.logo');

const browser = document.querySelector('#browser');
import { popularDrinks } from "./utils/tarjeta de tragos.js";
import { showData } from "./utils/buscador por nombre.js";
import { buscar } from "./utils/buscador por nombre.js";
import { ABC } from "./utils/buscador por letra.js";

await popularDrinks();

ABC();



browser.addEventListener('click', async (e) => {

  tarjeta.innerHTML = '';
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${e.target.textContent}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    contenedor.innerHTML = '';
    showData(data);
  })
  .catch(error => console.log(error));
  
})

buscador.addEventListener('click', (buscar));
logo.addEventListener('click', (e) => {
 location.reload();
})



