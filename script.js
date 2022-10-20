const gridContainer = document.querySelector(`#grid-container`);

function paintBox(e) {
  e.target.classList.add("painted");
}

let gridBoxes = [];
for (let i = 0; i < 16; i++) {
  gridBoxes[i] = document.createElement('div');
  gridBoxes[i].classList.add("grid-box");
  gridBoxes[i].addEventListener('mouseenter', paintBox);
  gridContainer.appendChild(gridBoxes[i]);
}