const gridContainer = document.querySelector(`#grid-container`);

function paintBox(e) {
  e.target.classList.add("painted");
}

function shrinkGrid(difference) {
  console.log("Boxes to remove: " + difference);
  for (let i = 0; i < difference; i++) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
}

function expandGrid(difference) {
  console.log(`Boxes to add: ${difference}`);
  let gridBoxes = [];
  for (let i = 0; i < difference; i++) {
    gridBoxes[i] = document.createElement('div');
    gridBoxes[i].classList.add("grid-box");
    gridBoxes[i].addEventListener('mouseenter', paintBox);
    gridContainer.appendChild(gridBoxes[i]);
  }
}

function resizeGrid() {
  let sideSize = parseInt(prompt("Set new grid size"));
  if (isNaN(sideSize)) {
    alert("Please give a valid number");
  }
  console.log("Number of boxes: " + gridContainer.children.length);
  console.log("New sideSize: " + sideSize);
  if (sideSize ** 2 < gridContainer.children.length) { //if sideSize > current side length
    let squaresDiff = gridContainer.children.length - (sideSize ** 2)
    shrinkGrid(squaresDiff); 
  }
  else if (sideSize ** 2 > gridContainer.children.length) {
    let squaresDiff = (sideSize ** 2) - gridContainer.children.length;
    expandGrid(squaresDiff);
  }

  const stylesheet = document.styleSheets[0];
  let gridContainerRules;
  
  for(let i = 0; i < stylesheet.cssRules.length; i++) {
    if(stylesheet.cssRules[i].selectorText === '#grid-container') {
      gridContainerRules = stylesheet.cssRules[i];
    }
  }
  
  gridContainerRules.style.setProperty('grid-template', `repeat(${sideSize}, 1fr) / repeat(${sideSize}, 1fr)`);

  console.log("--------------");
}
expandGrid(16);

const resetButton = document.querySelector('#reset-button')
resetButton.addEventListener('click', resizeGrid)