const gridContainer = document.querySelector(`#grid-container`);
const stylesheet = document.styleSheets[0];
let gridContainerCSS;
for (let i = 0; i < stylesheet.cssRules.length; i++) {
  if (stylesheet.cssRules[i].selectorText === '#grid-container') {
    gridContainerCSS = stylesheet.cssRules[i];
  }
}

const rainbowToggle = document.querySelector('#rainbow-toggle');
rainbowToggle.addEventListener('click', toggleCheckbox);

const colorPicker = document.querySelector('#color-toggle');
colorPicker.addEventListener('click', toggleCheckbox)

const resetButton = document.querySelector('#reset-button')
resetButton.addEventListener('click', resizeGrid)

function paintBox(e) {
  let color;
  if (rainbowToggle.checked) {
    color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  } else {
    color = colorPicker.value;
    console.log(color)
  }

  e.target.setAttribute('style', `background-color: ${color};`)
}

function resetGrid() {
  for (const box of gridContainer.children) {
    box.removeAttribute('style');
  }
}

function shrinkGrid(difference) {
  for (let i = 0; i < difference; i++) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
}

function expandGrid(difference) {
  let gridBox;
  for (let i = 0; i < difference; i++) {
    gridBox = document.createElement('div');
    gridBox.classList.add("grid-box");
    gridBox.addEventListener('mouseenter', paintBox);
    gridContainer.appendChild(gridBox);
  }
}

function resizeGrid() {
  let sideSize = parseInt(prompt("Set new grid size"));
  if (isNaN(sideSize)) {
    alert("Please give a valid number");
  }
  if (sideSize ** 2 < gridContainer.children.length) { //if sideSize > current side length
    let squaresDiff = gridContainer.children.length - (sideSize ** 2)
    shrinkGrid(squaresDiff); 
  }
  else if (sideSize ** 2 > gridContainer.children.length) {
    let squaresDiff = (sideSize ** 2) - gridContainer.children.length;
    expandGrid(squaresDiff);
  }

  resetGrid();
  
  gridContainerCSS.style.setProperty('grid-template', `repeat(${sideSize}, 1fr) / repeat(${sideSize}, 1fr)`);
}
expandGrid(16);

function toggleCheckbox(e) {
  return;
}