import { 
    preloadPeopleWords,
    preloadPlaceWords,
    preloadColourWords,
    preloadLocationWords,
    preloadAllWords
} from './preload-words';
import { colours, getColours, clearColours } from './colours';
import words from './words';
import makeGif from './make-gif';

const wordForms = document.querySelectorAll('.words__form');
const coloursForm = document.querySelector('.colours__form');
const captureGifBtn = document.querySelector('.capture__btn');
const speedRange = document.querySelector('.slider--speed');
const imageCountRange = document.querySelector('.slider--image-count');
const clearWordsBtns = document.querySelectorAll('.words__clear-all');

let imageChange = speedRange.value; // 2000 milliseconds default (2 seconds)
let imageCount = imageCountRange.value;
let interval = '';
let previousColor = '';

const handleAddWord = (event) => {
    event.preventDefault();

    const { people, places, locations } = words;
    const form = event.target;
    const input = form.querySelector('.words__input');
    const newWord = input.value;
    const formName = form.name;

    if (newWord.trim().length === 0) return;

    if (formName === 'people') {
        people.push(newWord);
        preloadPeopleWords();
    } else if (formName === 'places') {
        places.push(newWord);
        preloadPlaceWords();
    } else {
        locations.push(newWord);
        preloadLocationWords();
    }
    
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

    preloadColourWords();
    clearTimeout(interval);
    generateBackgroundColor();
    startCycle();

    input.value = '';
}

const getRandomNum = array => Math.floor(Math.random() * array.length) + 0;

const generateWords = () => {
    const { people, places, locations } = words;
    const newPeopleWord = people[getRandomNum(people)];
    const newPlaceWord = places[getRandomNum(places)];
    const newLocationWord = locations[getRandomNum(locations)];
    
    document
        .querySelector('.result__word--1')
        .textContent = newPeopleWord ? `${newPeopleWord},` : '';

    document
        .querySelector('.result__word--2')
        .textContent = newPlaceWord;

    document
        .querySelector('.result__word--4')
        .textContent = newLocationWord ? `the ${newLocationWord}` : '';
};

// Should changing the checkboxes automatically restart the cycle
const generateFont = () => {
    const activeFonts = [...document.querySelectorAll('.fonts__input:checked')];
    
    document
        .querySelectorAll('.result__word')
        .forEach(result => {
            result.style.fontFamily = activeFonts[getRandomNum(activeFonts)].value;
        });
};

const generateBackgroundColor = () => {
    const resultContainer = document.querySelector('.result');
    const latestColours = getColours();
    let nextColor = latestColours[getRandomNum(colours)];
    
    if (latestColours.length === 1) {
        resultContainer.style.backgroundColor = latestColours[0];
        return;
    }

    // After colours have been cleared
    if (!nextColor) {
        resultContainer.style.backgroundColor = '#fff';
        return;
    }

    while (nextColor === previousColor) {
        nextColor = latestColours[getRandomNum(colours)];
    }

    resultContainer.style.backgroundColor = nextColor;
    previousColor = nextColor;
}

const startCycle = () => {
    interval = setInterval(() => {
        generateWords();
        generateBackgroundColor();
        generateFont();
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

const resetCaptureControls = () => {
    const captureCount = document.querySelector('.capture__count');
    const renderCount = document.querySelector('.capture__render-count');

    captureCount.textContent = '';
    renderCount.textContent = '';

    [...document.querySelectorAll('.acquire-gif-link')].forEach(link => {
        link.classList.add('acquire-gif-link--disabled');
        link.href = '';
    })
}

const handleClearWords = (event) => {
    const formName = event.target.closest('form').name;

    if (formName === 'people') {
        document.querySelector('.words__list--1').innerHTML = '';
        words.people = [];
    } else if (formName === 'places') {
        document.querySelector('.words__list--2').innerHTML = '';
        words.places = [];
    } else if (formName === 'locations') {
        document.querySelector('.words__list--3').innerHTML = '';
        words.locations = [];
    } else {
        document.querySelector('.colours__list').innerHTML = '';
        clearColours();
    }

    generateWords();
    generateBackgroundColor();
    generateFont();
    clearTimeout(interval);
    startCycle();
    updateCanvas();
};

[...clearWordsBtns].forEach(form => form.addEventListener('click', handleClearWords));
[...wordForms].forEach(form => form.addEventListener('submit', handleAddWord));
coloursForm.addEventListener('submit', handleAddColour);
captureGifBtn.addEventListener('click', () => makeGif(resetCaptureControls, imageCount, imageChange));
speedRange.addEventListener('change', handleRangeChange);
imageCountRange.addEventListener('change', handleImageCountChange);

preloadAllWords();
generateWords();
generateBackgroundColor();
generateFont();
startCycle();
updateCanvas();

export { resetCaptureControls, imageCount, imageChange }