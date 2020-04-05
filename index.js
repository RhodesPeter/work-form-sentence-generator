const words = ['Charlie', 'Jake', 'Alex'];
const colours = ['#4347F5', '#E77B65', '#E7658E', '#FFC300', '#65E7C6'];

const wordsForm = document.querySelector('.words__form');
const coloursForm = document.querySelector('.colours__form');
const captureGifBtn = document.querySelector('.word-generator__capture-gif');

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
    }, 2000);
};

const captureScreenshot = () => {
    const canvas = document.querySelector('.canvas');
    const png = canvas.toDataURL('png');
    console.log(png);
};

wordsForm.addEventListener('submit', handleAddWord);
coloursForm.addEventListener('submit', handleAddColour);
captureGifBtn.addEventListener('click', captureScreenshot);

generateWords();
generateBackgroundColor();
startCycle();

const addCanvas = () => {
    document.body.insertAdjacentHTML(
        'afterbegin',
        `<canvas class="canvas" width="300" height="300"></canvas>`
    );

    const result = document.querySelector('.result-wrapper');
    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');

    const data = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
            <foreignObject width="100%" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml">
                    ${result.innerHTML}
                </div>
            </foreignObject>
        </svg>
    `;

    const tempImg = document.createElement('img')
    tempImg.src = 'data:image/svg+xml,' + encodeURIComponent(data);
    
    tempImg.addEventListener('load', e => onTempImageLoad(e, ctx))
}

const onTempImageLoad = (e, ctx) => {
    ctx.drawImage(e.target, 0, 0)
}

addCanvas();
