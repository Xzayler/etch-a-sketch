const gridContainer = document.querySelector(`#grid-container`);

let gridBoxes = [];
for (let i = 0; i < 16; i++) {
  gridBoxes[i] = document.createElement('div');
  gridBoxes[i].classList.add("grid-box");
  gridContainer.appendChild(gridBoxes[i]);
}