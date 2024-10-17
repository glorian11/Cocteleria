
export async function getLetter() {
    const letters = [];
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i); // 65 is the ASCII code for 'A'
      letters.push(letter);
    }
    return letters;
  }

 
  

export async function ABC() {
  console.log('Cargando...');
  const letters = await getLetter();
  letters.forEach(letter => {
    const boton = document.createElement('button');
    boton.textContent = letter;
    browser.appendChild(boton);
  })
}