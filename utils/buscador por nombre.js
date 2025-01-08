


export async function buscar(e) {
  e.preventDefault();
  if (!input.value) {
    alert('Por favor ingresa un nombre ');
    return;
  }
  else {
  const contenedor = document.querySelector('#contenedor');
  contenedor.innerHTML = '';
  
  console.log('Buscar function called');
  const form = document.querySelector('#form');
  const input = document.querySelector('#input');
  contenedor.innerHTML = 'Cargando...';
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`)
    .then(response => response.json())
    .then(data => {
      console.log('Data received:', data);
      contenedor.innerHTML = '';
      console.log(data);
      showData(data);
    })
    .catch(error => console.log('Error:', error));

  }
}

  export async function showData(data) {
   console.log(data);
    
    const contenedor = document.querySelector('#contenedor');
    contenedor.innerHTML = '';
   
    if (data.drinks == null ) {
      const h1 = document.createElement('h1');
      h1.textContent = 'No se encontraron resultados :-(';
      h1.className = 'no-results';
      contenedor.appendChild(h1);
      return;
    }
    else if (data.drinks.length === 1) {
      const img = document.createElement('img');
      img.src = data.drinks[0].strDrinkThumb;
      img.alt = data.drinks[0].strDrink;
      contenedor.appendChild(img);
      return;
    }
    for (let i = 0; i < data.drinks.length; i++) {
      const div = document.createElement('div');
      div.classList.add('trago');
      contenedor.appendChild(div);
      const img = document.createElement('img');
      const h2 = document.createElement('h2');
      img.src = data.drinks[i].strDrinkThumb;
      img.alt = data.drinks[i].strDrink;
      h2.textContent = data.drinks[i].strDrink;
      div.appendChild(h2);
      div.appendChild(img);

      
  
      img.addEventListener('click', () => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${data.drinks[i].idDrink}`)
          .then(response => response.json())
          .then(data => {
            showDetailedData(data);
          })
          .catch(error => console.log(error));
      })
      contenedor.appendChild(div);
    }
  }

  export async function showDetailedData(data) {
    
    contenedor.innerHTML = '';
    const pergamino = document.createElement('div');
    const ingredientes = document.createElement('div');
    pergamino.classList.add('pergamino');
    ingredientes.classList.add('ingredientes');
    
    console.log(data);
    const imgDrink = document.createElement('img');
    imgDrink.classList.add('img-pergamino');
    imgDrink.src = data.drinks[0].strDrinkThumb;
    imgDrink.alt = data.drinks[0].strDrink;
    const solucion = document.createElement('div');
    solucion.classList.add('solucion');
    
    

  
    const h2Drink = document.createElement('h2');
    h2Drink.textContent = data.drinks[0].strDrink;
    pergamino.appendChild(h2Drink);
    pergamino.appendChild(imgDrink);

    
    contenedor.appendChild(pergamino);
  
    if (data.drinks[0].strAlcoholic === 'Alcoholic') {
      const pAlcohol = document.createElement('p');
      pAlcohol.textContent = 'Alcoholic';
      solucion.appendChild(pAlcohol);
    } else {
      const pAlcohol = document.createElement('p');
      pAlcohol.textContent = 'Non Alcoholic';
      solucion.appendChild(pAlcohol);
    }
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredientProperty = `strIngredient${i}`;
      if (data.drinks[0][ingredientProperty] !== null) {
        ingredients.push(data.drinks[0][ingredientProperty]);
        console.log(data.drinks[0][ingredientProperty]);

      }
    }
  
    ingredients.forEach((ingredient) => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const ingredientData = data.ingredients[0];
          const imgIngredient = document.createElement('img');
          const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`;
          imgIngredient.src = imageUrl;
          imgIngredient.alt = ingredientData.strIngredient;
          imgIngredient.onerror = () => {
            imgIngredient.src = 'placeholder-image.png'; // Replace with a placeholder image
          };
          ingredientes.appendChild(imgIngredient);
          const pIngredient = document.createElement('p');
          pIngredient.textContent = ingredientData.strIngredient;
          ingredientes.appendChild(pIngredient);
          imgIngredient.addEventListener('click', () => {
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
              .then(response => response.json())
              .then(data => {
                showData(data);
              })
              .catch(error => console.log(error));
          })
        })
        .catch(error => console.log(error));
    });
    
    const pDrink = document.createElement('p');
    pDrink.textContent = data.drinks[0].strInstructions;
    solucion.appendChild(pDrink);
pergamino.appendChild(solucion);
    pergamino.appendChild(ingredientes);
  }