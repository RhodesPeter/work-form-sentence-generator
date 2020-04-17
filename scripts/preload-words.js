import words from './words';
import { getFonts } from './fonts';
import { getColours } from './colours';

const preloadWords = (listClassName, listName) => {    
    const list = document.querySelector(listClassName);
    let listItems = [];

    if (listName === 'colours') {
        listItems = getColours();
    } else {
        listItems = words[listName];
    }

    const listItemsHTML = listItems
        .map(word => `<li class="word-generator__list-item">${word}</li>`)
        .join(', ');

    list.innerHTML = '';
    list.insertAdjacentHTML('afterbegin', listItemsHTML);
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
