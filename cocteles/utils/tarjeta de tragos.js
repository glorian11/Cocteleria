
import { showDetailedData } from "./buscador por nombre.js";

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
  


       

