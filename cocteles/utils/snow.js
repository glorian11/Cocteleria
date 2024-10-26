
export async function snow() {
    const cuerpo = document.body;
const nieve = document.createElement('div');
nieve.classList.add('nieve');
cuerpo.appendChild(nieve);

const cantidadDeFloresDeNieve = 100;
for (let i = 0; i < cantidadDeFloresDeNieve; i++) {
  const florDeNieve = document.createElement('div');
  florDeNieve.classList.add('flor-de-nieve');
  florDeNieve.style.left = `${Math.random() * 100}%`;
  florDeNieve.style.animationDelay = `${Math.random() * 5}s`;
  nieve.appendChild(florDeNieve);
}
}
