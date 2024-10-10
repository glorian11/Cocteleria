const buscador = document.querySelector('#buscador');
const contenedor = document.querySelector('#contenedor'); 
const form = document.querySelector('#form');
const input = document.querySelector('#input');


const buscar = () => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`)
    .then(response => response.json())
    .then(data => {
      showData(data);
    })
    .catch(error => console.log(error));
}



const showData = (data) => {
  if (data.drinks === null) {
    contenedor.innerHTML = 'No se encontraron resultados';
    return;
  }
  else if (data.drinks.length === 1) {
    contenedor.innerHTML = `
      <img src="${data.drinks[0].strDrinkThumb}" alt="${data.drinks[0].strDrink}">
      <h2>${data.drinks[0].strDrink}</h2>
    `;
    return;
  }
  for (let i = 0; i < data.drinks.length; i++) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    img.src = data.drinks[i].strDrinkThumb;
    img.alt = data.drinks[i].strDrink;
    h2.textContent = data.drinks[i].strDrink;
    li.appendChild(img);
    li.appendChild(h2);
   
    img.addEventListener('click', () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${data.drinks[i].idDrink}`)
      .then(response => response.json())
      .then(data => {
        showDetailedData(data);
      })
      .catch(error => console.log(error));
    })
    contenedor.appendChild(li);
  }
}
const showDetailedData = (data) => {
  contenedor.innerHTML = `
    <img src="${data.drinks[0].strDrinkThumb}" alt="${data.drinks[0].strDrink}">
    <h2>${data.drinks[0].strDrink}</h2>
    <p>${data.drinks[0].strInstructions}</p>
  `;
}

buscador.addEventListener('click', (buscar))





