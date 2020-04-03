const words = ['Charlie', 'Jake', 'Alex'];
const colours = ['#4347F5', '#E77B65', '#E7658E', '#FFC300', '#65E7C6'];

const form = document.querySelector('.words__form');

let interval = '';

const addWordToDOMList = (newWord) => {
    const list = document.querySelector('.words__list');
    const newLi = document.createElement('li');
    newLi.classList.add('words__list-item');
    newLi.textContent = newWord;
    list.appendChild(newLi);
};

const handleAddWord = (event) => {
    event.preventDefault();

    const input = document.querySelector('.words__input');
    const newWord = input.value;
    
    if (newWord.length === 0) return;

    words.push(newWord);

    addWordToDOMList(newWord);
    clearTimeout(interval);
    generateWords();
    startCycle();

    input.value = '';
};

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

form.addEventListener('submit', handleAddWord);

generateWords(words);
generateBackgroundColor();
startCycle();
