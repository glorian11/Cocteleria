const buscador = document.querySelector('#buscador');
const contenedor = document.querySelector('#contenedor'); 
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const browser = document.querySelector('#browser');
const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']



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

const getLetter = () => {
  for (let i = 0; i < 26; i++) {
    letter += letter[i];
  }
  return letter;
  }

const ABC = () => {
  letter.forEach(letter => { 
    const boton = document.createElement('button');
    boton.textContent = letter;
    browser.appendChild(boton);
  })
}

ABC();

browser.addEventListener('click', (e) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${e.target.textContent}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    showData(data);
  })
  .catch(error => console.log(error));
  
})



buscador.addEventListener('click', (buscar))





