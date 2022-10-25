const gridContainer = document.querySelector(`#grid-container`);
const stylesheet = document.styleSheets[0];
let gridContainerCSS;
for (let i = 0; i < stylesheet.cssRules.length; i++) {
  if (stylesheet.cssRules[i].selectorText === '#grid-container') {
    gridContainerCSS = stylesheet.cssRules[i];
    break;
  }
}

const penPicker = document.querySelector('#pen-picker');

const backgroundPicker = document.querySelector('#background-picker');
backgroundPicker.addEventListener('change', changeBackgroundColor)

const eraserToggle = document.querySelector('#eraser-toggle');
eraserToggle.addEventListener('click', toggleCheckbox);

const rainbowToggle = document.querySelector('#rainbow-toggle');
rainbowToggle.addEventListener('click', toggleCheckbox);

const darkenToggle = document.querySelector('#darken-toggle');
darkenToggle.addEventListener('click', toggleCheckbox);

const resizeButton = document.querySelector('#resize-button')
resizeButton.addEventListener('click', resizeGrid);

const clearButton = document.querySelector('#clear-button')
clearButton.addEventListener('click', clearGrid);

function changeBackgroundColor() {
  gridContainerCSS.style.setProperty('background-color', `${backgroundPicker.value}`);
  console.log(backgroundPicker.value)
}

function paintBox(e) {
  let color;
  console.log(eraserToggle.checked)
  if (rainbowToggle.checked) {
    color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  } else if (darkenToggle.checked) {
    let prevColor = e.target.style.backgroundColor;
    if (!prevColor) {
      prevColor = 'rgba(255,255,255,0)'
    }
    console.log('prevColor: ' + prevColor)
    if (prevColor.substr(0,4) === "rgba") {
      let rgbArray = prevColor.slice(5, -1).split(',');
      rgbArray[3] = parseFloat(rgbArray[3].trim()) + 0.1 ;
      console.log('alpha: ' + rgbArray[3])
      console.log(typeof(rgbArray[3]))
      color = `rgba(0,0,0,${rgbArray[3]})`;
      console.log(color)
    } else {
      let rgbArray = prevColor.slice(4, -1).split(',');
      for (let i = 0; i < 3; i++) {
        rgbArray[i] = Math.max(0, parseInt(rgbArray[i] - 26));
        color = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, ${rgbArray[3]})`;
      }
    }
  } else if(eraserToggle.checked) {
    e.target.removeAttribute('style')
  } else {
    color = penPicker.value;
  }

  e.target.style.backgroundColor = color;
}

function clearGrid() {
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
  if (sideSize ** 2 < gridContainer.children.length) {
    let squaresDiff = gridContainer.children.length - (sideSize ** 2)
    shrinkGrid(squaresDiff);
    clearGrid();
  }
  else if (sideSize ** 2 > gridContainer.children.length) {
    let squaresDiff = (sideSize ** 2) - gridContainer.children.length;
    clearGrid();
    expandGrid(squaresDiff);
  }
  else {clearGrid()}
  
  gridContainerCSS.style.setProperty('grid-template', `repeat(${sideSize}, 1fr) / repeat(${sideSize}, 1fr)`);
}

const checkboxes = document.querySelectorAll('input[type="checkbox"]')
function toggleCheckbox(e) {
  if (!e.target.checked) {
    return;
  }
  for (let checkbox of checkboxes) {
    if (checkbox != e.target) { 
      checkbox.checked = false;
    }
  }
}

expandGrid(16);