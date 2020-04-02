const words = ['Charlie', 'Jake', 'Alex'];

const form = document.querySelector('.words__form');

const addWordToDOMList = (newWord) => {
    const list = document.querySelector('.words__list');
    const newLi = document.createElement('li');
    newLi.classList.add('words__list-item');
    newLi.textContent = newWord;
    list.appendChild(newLi);
};

const handleAddWord = (event) => {
    event.preventDefault();

    console.log('submited?');

    const input = document.querySelector('.words__input');
    const newWord = input.value;
    
    if (newWord.length === 0) return;

    addWordToDOMList(newWord);
    words.push(newWord);
    generateWords();
    input.value = '';
};

const generateWords = () => {
    const wordOne = document.querySelector('.result__word--1');
    const wordTwo = document.querySelector('.result__word--2');
    const wordThree = document.querySelector('.result__word--4');
    const newSelectedWords = shuffleWords();
    wordOne.textContent = newSelectedWords[0];
    wordTwo.textContent = `${newSelectedWords[1]},`;
    wordThree.textContent = newSelectedWords[2];
};

const shuffleWords = () => {
    const array = [...words];
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

const startCycle = () => {
    setInterval(generateWords, 2000);
};

form.addEventListener('submit', handleAddWord);

generateWords();
startCycle();
