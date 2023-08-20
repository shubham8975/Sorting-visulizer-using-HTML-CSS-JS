const arrayContainer = document.getElementById('arrayContainer');
const arraySizeInput = document.getElementById('arraySize');
const speedInput = document.getElementById('speed');
const bubbleSortBtn = document.getElementById('bubbleSortBtn');
const selectionSortBtn = document.getElementById('selectionSortBtn');
const insertionSortBtn = document.getElementById('insertionSortBtn');

let array = [];
let bars = [];
let animationSpeed = 100 - parseInt(speedInput.value);

function generateArray(size) {
  array = [];
  arrayContainer.innerHTML = '';
  bars=[];
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    array.push(value);
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${value * 3}px`;
    arrayContainer.appendChild(bar);
    bars.push(bar);

  }
  // bubbleSort();
}

function swapBars(index1, index2) {
  const tempHeight = bars[index1].style.height;
  bars[index1].style.height = bars[index2].style.height;
  bars[index2].style.height = tempHeight;
}

async function bubbleSort() {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      bars[j].style.backgroundColor = '#e74c3c'; // Highlight current comparison
      bars[j + 1].style.backgroundColor = '#e74c3c';

      await delay(animationSpeed);

      if (array[j] > array[j + 1]) {
        swapBars(j, j + 1);
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }

      bars[j].style.backgroundColor = '#3498db'; // Reset color
      bars[j + 1].style.backgroundColor = '#3498db';
    }
    bars[n - i - 1].style.backgroundColor = '#27ae60'; // Mark bar as sorted
  }
}

async function selectionSort() {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    bars[i].style.backgroundColor = '#e74c3c'; // Highlight current bar
    for (let j = i + 1; j < n; j++) {
      bars[j].style.backgroundColor = '#e74c3c'; // Highlight current comparison
      await delay(animationSpeed);

      if (array[j] < array[minIndex]) {
        bars[minIndex].style.backgroundColor = '#3498db'; // Reset previous min bar color
        minIndex = j;
      }

      bars[j].style.backgroundColor = '#3498db'; // Reset color
    }
    swapBars(i, minIndex);
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
    bars[i].style.backgroundColor = '#27ae60'; // Mark bar as sorted
  }
}

async function insertionSort() {
  let n = array.length;
  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;
    bars[i].style.backgroundColor = '#e74c3c'; // Highlight current bar

    while (j >= 0 && array[j] > key) {
      bars[j + 1].style.backgroundColor = '#e74c3c'; // Highlight swapping bar
      await delay(animationSpeed);

      array[j + 1] = array[j];
      swapBars(j, j + 1);

      bars[j + 1].style.backgroundColor = '#3498db'; // Reset color
      j--;
    }

    array[j + 1] = key;
    bars[j + 1].style.height = `${key * 3}px`;
    bars[j + 1].style.backgroundColor = '#27ae60'; // Mark bar as sorted
  }
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function disableButtons() {
  bubbleSortBtn.disabled = true;
  selectionSortBtn.disabled = true;
  insertionSortBtn.disabled = true;
  arraySizeInput.disabled = true;
  speedInput.disabled = true;
}

function enableButtons() {
  bubbleSortBtn.disabled = false;
  selectionSortBtn.disabled = false;
  insertionSortBtn.disabled = false;
  arraySizeInput.disabled = false;
  speedInput.disabled = false;
}


function updateAnimationSpeed() {
  animationSpeed = 100 - parseInt(speedInput.value);
}

bubbleSortBtn.addEventListener('click', async () => {
  disableButtons();
  await bubbleSort();
  enableButtons();
});

selectionSortBtn.addEventListener('click', async () => {
  disableButtons();
  await selectionSort();
  enableButtons();
});

insertionSortBtn.addEventListener('click', async () => {
  disableButtons();
  await insertionSort();
  enableButtons();
});

arraySizeInput.addEventListener('input', () => {
  generateArray(arraySizeInput.value);
});

speedInput.addEventListener('input', () => {
  updateAnimationSpeed();
});

generateArray(arraySizeInput.value);
