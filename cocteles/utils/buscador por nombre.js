


export async function buscar(e) {
  e.preventDefault();
  const tarjeta = document.querySelector('.tarjeta');
  tarjeta.innerHTML = '';
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

  export async function showData(data) {
   console.log(data);
   
    if (data.drinks == null) {
      contenedor.innerHTML = 'No se encontraron resultados';
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
    
    console.log(data);
    const imgDrink = document.createElement('img');
    imgDrink.src = data.drinks[0].strDrinkThumb;
    imgDrink.alt = data.drinks[0].strDrink;
    contenedor.appendChild(imgDrink);
    
    

  
    const h2Drink = document.createElement('h2');
    h2Drink.textContent = data.drinks[0].strDrink;
    pergamino.appendChild(h2Drink);

    
    contenedor.appendChild(pergamino);
  
    if (data.drinks[0].strAlcoholic === 'Alcoholic') {
      const pAlcohol = document.createElement('p');
      pAlcohol.textContent = 'Alcoholico';
      pergamino.appendChild(pAlcohol);
    } else {
      const pAlcohol = document.createElement('p');
      pAlcohol.textContent = 'No Alcoholico';
      pergamino.appendChild(pAlcohol);
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
          contenedor.appendChild(imgIngredient);
          const pIngredient = document.createElement('p');
          pIngredient.textContent = ingredientData.strIngredient;
          contenedor.appendChild(pIngredient);
        })
        .catch(error => console.log(error));
    });
  
    const pDrink = document.createElement('p');
    pDrink.textContent = data.drinks[0].strInstructions;
    pergamino.appendChild(pDrink);
  }