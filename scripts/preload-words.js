import { people, places, locations } from './words';
import colours from './colours';

const preloadWords = (listClassName, words) => {
    const list = document.querySelector(listClassName);
    const listItems = words.map(word => `<li class="word-generator__list-item">${word}</li>`);

    list.innerHTML = '';
    list.insertAdjacentHTML('afterbegin', listItems.join(', '));
};

const preloadPeopleWords = () => preloadWords('.words__list--1', people);
const preloadPlaceWords = () => preloadWords('.words__list--2', places);
const preloadLocationWords = () => preloadWords('.words__list--3', locations);
const preloadColourWords = () => preloadWords('.colours__list', colours);

export { preloadPeopleWords, preloadColourWords, preloadPlaceWords, preloadLocationWords };
