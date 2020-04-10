import words from './words';
import { getColours } from './colours';

const preloadWords = (listClassName, listName) => {    
    const list = document.querySelector(listClassName);
    const listItems = words[listName] || getColours()
        .map(word => `<li class="word-generator__list-item">${word}</li>`);

    list.innerHTML = '';
    list.insertAdjacentHTML('afterbegin', listItems.join(', '));
};

const preloadPeopleWords = () => preloadWords('.words__list--1', 'people');
const preloadPlaceWords = () => preloadWords('.words__list--2', 'places');
const preloadLocationWords = () => preloadWords('.words__list--3', 'locations');
const preloadColourWords = () => preloadWords('.colours__list', 'colours');

const preloadAllWords = () => {
    preloadPeopleWords();
    preloadColourWords();
    preloadPlaceWords();
    preloadLocationWords();
};

export { 
    preloadPeopleWords,
    preloadColourWords,
    preloadPlaceWords,
    preloadLocationWords,
    preloadAllWords
};
