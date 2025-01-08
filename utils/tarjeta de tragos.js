
import { showDetailedData } from "./buscador por nombre.js";
import { showData } from "./buscador por nombre.js";

export const popularDrinks = () => {
    const card = document.querySelector('.tarjeta1');
    const idDrink = ['11001 ', '11002', '11003', '11004', '11005', '11006', '11007', '11008'];
  
    idDrink.forEach(id => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
          
          const trago = data.drinks[0];
          
            const tragoElement = document.createElement('div');
            tragoElement.classList.add('trago');
            card.appendChild(tragoElement);
            const imgElement = document.createElement('img');
            imgElement.src = trago.strDrinkThumb;
            imgElement.alt = trago.strDrink;
            imgElement.classList.add('trago__imagen');
            tragoElement.textContent = trago.strDrink;
            tragoElement.appendChild(imgElement);

            
            tragoElement.addEventListener('click', () => {
                showDetailedData(data);
                
              });
          })
          .catch(error => console.log(error));
        })
        
    };
  

export const randomDrinks = () => {
    const card = document.querySelector('.tarjeta2');
    
    for(let i = 0; i < 8; i++){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then(response => response.json())
        .then(data => {
            const trago = data.drinks[0];
            const tragoElement = document.createElement('div');
            tragoElement.classList.add('trago');
            card.appendChild(tragoElement);
            const imgElement = document.createElement('img');
            imgElement.src = trago.strDrinkThumb;
            imgElement.alt = trago.strDrink;
            imgElement.classList.add('trago__imagen');
            tragoElement.textContent = trago.strDrink;
            tragoElement.appendChild(imgElement);
            tragoElement.addEventListener('click', () => {
                showDetailedData(data);
              });
          })
          .catch(error => console.log(error));
        }
    };


    
    export const randomIngredient = () => {
        const card = document.querySelector('.tarjeta3');
        const ingredientes = new Set(); // Utiliza un conjunto para almacenar los ingredientes
      
        const fetchIngredient = () => {
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
            .then(response => response.json())
            .then(data => {
              const ingredientesList = data.drinks;
              const randomIndex = Math.floor(Math.random() * ingredientesList.length);
              const randomIngredient = ingredientesList[randomIndex].strIngredient1;
      
              // Verifica si el ingrediente ya se encuentra en el conjunto
              if (!ingredientes.has(randomIngredient)) {
                ingredientes.add(randomIngredient); // Agrega el ingrediente al conjunto
      
                const ingredientElement = document.createElement('div');
                ingredientElement.classList.add('trago');
                ingredientElement.textContent = randomIngredient;
                card.appendChild(ingredientElement);
      
                const imgElement = document.createElement('img');
                imgElement.src = `https://www.thecocktaildb.com/images/ingredients/${(randomIngredient)}-Medium.png`;
                imgElement.alt = randomIngredient;
                imgElement.classList.add('trago__imagen');
                ingredientElement.appendChild(imgElement);
      
                ingredientElement.addEventListener('click', () => {
                  // Busca todos los tragos que coinciden con el ingrediente seleccionado
                  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${randomIngredient}`)
                    .then(response => response.json())
                    .then(data => {
                      showData(data);
                    })
                    .catch(error => console.log(error));
                });
                    
              } else {
                // Si el ingrediente ya se encuentra en el conjunto, vuelve a hacer la petición
                fetchIngredient();
              }
            })
            .catch(error => console.log(error));
        };
      
        for (let i = 0; i < 8; i++) {
          fetchIngredient();
        }
      };


      export const popularIngredient = () => {
        const card = document.querySelector('.tarjeta4');
        
      
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
          .then(response => response.json())
          .then(data => {
            const ingredientesList = data.drinks;
      
            // Selecciona 4 ingredientes estáticos de la lista
            const staticIngredientes = ingredientesList.slice(0, 4);
      
            staticIngredientes.forEach(ingrediente => {
              const ingredienteElement = document.createElement('div');
              ingredienteElement.classList.add('trago');
              ingredienteElement.textContent = ingrediente.strIngredient1;
              card.appendChild(ingredienteElement);
      
              const imgElement = document.createElement('img');
              imgElement.src = `https://www.thecocktaildb.com/images/ingredients/${ingrediente.strIngredient1}-Medium.png`;
              imgElement.alt = ingrediente.strIngredient1;
              imgElement.classList.add('trago__imagen');
              ingredienteElement.appendChild(imgElement);
      
              ingredienteElement.addEventListener('click', () => {
                  // Busca todos los tragos que coinciden con el ingrediente seleccionado
                  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente.strIngredient1}`)
                    .then(response => response.json())
                    .then(data => {
                      showData(data);
                  })
                  .catch(error => console.log(error));
              });
            });
          })
          .catch(error => console.log(error));
      };
      

