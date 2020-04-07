const words = ['Charlie', 'Jake', 'Alex', 'work-form'];
const colours = ['#4347F5', '#E77B65', '#E7658E', '#FFC300', '#65E7C6'];

const wordsForm = document.querySelector('.words__form');
const coloursForm = document.querySelector('.colours__form');
const captureGifBtn = document.querySelector('.word-generator__capture-gif');
const speedRange = document.querySelector('.slider--speed');
const imageCountRange = document.querySelector('.slider--image-count');

let imageChange = speedRange.value; // 2000 milliseconds default (2 seconds)
let imageCount = imageCountRange.value;
let interval = '';

const addWordToDOMList = (newWord) => {
    const list = document.querySelector('.words__list');
    const newLi = document.createElement('li');
    newLi.classList.add('words__list-item');
    newLi.textContent = newWord;
    list.appendChild(newLi);
};

const addColourToDOMList = (newColour) => {
    const list = document.querySelector('.colours__list');
    const newLi = document.createElement('li');
    newLi.classList.add('colours__list-item');
    newLi.textContent = newColour;
    list.appendChild(newLi);
}

const handleAddWord = (event) => {
    event.preventDefault();

    const input = document.querySelector('.words__input');
    const newWord = input.value;
    
    if (newWord.trim().length === 0) return;

    words.push(newWord);

    addWordToDOMList(newWord);
    clearTimeout(interval);
    generateWords();
    startCycle();

    input.value = '';
};

const handleAddColour = () => {
    event.preventDefault();

    const input = document.querySelector('.colours__input');
    const newColour = input.value;
    
    if (newColour.trim().length === 0) return;

    colours.push(newColour);

    addColourToDOMList(newColour);
    clearTimeout(interval);
    generateBackgroundColor();
    startCycle();

    input.value = '';
}

const generateWords = () => {
    const wordOne = document.querySelector('.result__word--1');
    const wordTwo = document.querySelector('.result__word--2');
    const wordThree = document.querySelector('.result__word--4');
    const newSelectedWords = shuffleArray(words);
    wordOne.textContent = newSelectedWords[0];
    wordTwo.textContent = `${newSelectedWords[1]},`;
    wordThree.textContent = newSelectedWords[2];
};

const shuffleArray = (arrayToShuffle) => {
    const array = [...arrayToShuffle];
    let j;
    let i;
    let x;

    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }

    return array;
}

const generateBackgroundColor = () => {
    const resultContainer = document.querySelector('.result');
    const randomNumber = Math.floor(Math.random() * colours.length) + 0;
    resultContainer.style.backgroundColor = colours[randomNumber];
}

const startCycle = () => {
    interval = setInterval(() => {
        generateWords();
        generateBackgroundColor();
        updateCanvas();
    }, imageChange);
};

const handleRangeChange = (event) => {
    const secondsElement = document.querySelector('.speed__seconds');
    const rangeValue = event.target.value;

    secondsElement.textContent = `${rangeValue / 1000} second${rangeValue === '1000' ? '' : 's'}`;
    imageChange = rangeValue;
    clearTimeout(interval);
    startCycle();
};

const handleImageCountChange = (event) => {
    const imageCountText = document.querySelector('.image-count__number');
    const imageCountValue = event.target.value;

    imageCount = imageCountValue;
    imageCountText.textContent = `${imageCountValue} image${imageCountValue === '1' ? '' : 's'}`;
};

const updateCanvas = () => {
    const resultWrapper = document.querySelector('.result-wrapper');
    const result = document.querySelector('.result');
    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    result.style.height = '100vh';
    result.style.width = '100vw';

    const data = `
        <svg xmlns="http://www.w3.org/2000/svg">
            <foreignObject width="100%" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml">
                    ${resultWrapper.innerHTML}
                </div>
            </foreignObject>
        </svg>
    `;

    const tempImg = document.createElement('img')
    tempImg.src = 'data:image/svg+xml,' + encodeURIComponent(data);
    
    tempImg.addEventListener('load', e => ctx.drawImage(e.target, 0, 0))
}

const makeGif = () => {  
    const canvas = document.querySelector('.canvas');
  
    const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: 'scripts/gif.worker.js',
    });

    for(let i = 0; i < imageCount; i++){
        setTimeout(() => {
            gif.addFrame(canvas, {delay: imageChange, copy: true});
        }, i * imageChange);
    }

    setTimeout(() => gif.render(), imageChange * imageCount);

    // This is the progress of turning it into a gif after gif.render()
    gif.on('progress', function(p) {
        console.log(`rendering: ${Math.round(p * 100)}%`);
    });
    
    gif.on('finished', function(blob) {
    //    saveData(URL.createObjectURL(blob));
       window.open(URL.createObjectURL(blob));
    });      
};

const saveData = (url) => {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'work-form-sentence-generator';
    a.click();
    window.URL.revokeObjectURL(url);
};

// Can this just be in the HTML, ot should this be somewhere else, or in a func? init func?
// might we want this width and height to be dynamic?
// we will need to also remove this canvas element if this func is run more than once.
document.body.insertAdjacentHTML(
    'afterbegin',
    `<canvas class="canvas"></canvas>`
);

wordsForm.addEventListener('submit', handleAddWord);
coloursForm.addEventListener('submit', handleAddColour);
captureGifBtn.addEventListener('click', makeGif);
speedRange.addEventListener('change', handleRangeChange);
imageCountRange.addEventListener('change', handleImageCountChange);

generateWords();
generateBackgroundColor();
startCycle();
updateCanvas();
