const gridContainer = document.querySelector(`#grid-container`);
const stylesheet = document.styleSheets[0];
let gridContainerCSS;
for (let i = 0; i < stylesheet.cssRules.length; i++) {
  if (stylesheet.cssRules[i].selectorText === '#grid-container') {
    gridContainerCSS = stylesheet.cssRules[i];
  }
}

const colorPicker = document.querySelector('#color-toggle');
colorPicker.addEventListener('click', toggleCheckbox)

const rainbowToggle = document.querySelector('#rainbow-toggle');
rainbowToggle.addEventListener('click', toggleCheckbox);

const darkenToggle = document.querySelector('#darken-toggle');
darkenToggle.addEventListener('click', toggleCheckbox);

const resizeButton = document.querySelector('#resize-button')
resizeButton.addEventListener('click', resizeGrid);

function paintBox(e) {
  let color;
  if (rainbowToggle.checked) {
    color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  } else if (darkenToggle.checked) {
    let prevColor = e.target.style.backgroundColor;
    if (!prevColor) {
      prevColor = 'rgb(255,255,255)' //background color
    }
    let rgbArray = prevColor.slice(4, -1).split(',');
    for (let i = 0; i < 3; i++) {
      rgbArray[i] = Math.max(0, parseInt(rgbArray[i] - 26));
    }
    color = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`
  } else {
    color = colorPicker.value;
  }

  e.target.style.backgroundColor = color;
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
  if (sideSize ** 2 < gridContainer.children.length) {
    let squaresDiff = gridContainer.children.length - (sideSize ** 2)
    shrinkGrid(squaresDiff);
    resetGrid();
  }
  else if (sideSize ** 2 > gridContainer.children.length) {
    let squaresDiff = (sideSize ** 2) - gridContainer.children.length;
    resetGrid();
    expandGrid(squaresDiff);
  }
  else {resetGrid()}
  
  gridContainerCSS.style.setProperty('grid-template', `repeat(${sideSize}, 1fr) / repeat(${sideSize}, 1fr)`);
}

const checkboxes = document.querySelectorAll('input[type="checkbox"]')
function toggleCheckbox(e) {
  if (!e.target.checked) {
    return;
  }
  for (let checkbox of checkboxes) {
    console.log('looped')
    if (checkbox != e.target) { 
      checkbox.checked = false;
    }
  }
}

expandGrid(16);