generatePalette();
function generateColors(){
  const hexChars = '0123456789ABCDEF';
  let color = '#';
  
  for(let i = 0; i < 6; i++){
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  
  return color;
}


function generatePalette(){
  let colorContainer = document.querySelector('.color-palette-container');
  colorContainer.innerHTML = '';

  for(let i = 0; i < 5; i++){
    const color = generateColors();
    colorContainer.innerHTML += `<div class="colors" style="background:${color}">${color}</div>`;
  }
}

const generateButton = document.querySelector('.gen-btn'); 
generateButton.addEventListener('click', () => {
  generatePalette();
}); 


let colorContainer = document.querySelector('.color-palette-container');

colorContainer.addEventListener('click', (event) => {
  if(event.target.classList.contains('colors')){
    const clickedColor = event.target;
    const colorText = clickedColor.textContent;
    const originalText = colorText;
    
    clickedColor.innerText = 'Copied!';
    
    navigator.clipboard.writeText(colorText);
    
    setTimeout(() => {
      clickedColor.innerText = originalText;
    }, 1000);
  }
});
