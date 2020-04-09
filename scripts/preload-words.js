import { people, places, locations } from './words';
import colours from './colours';

// This can be combined with the 2 functions below
const preloadPeopleWords = () => {
    const list = document.querySelector('.words__list--1');
    const listItems = people.map(word => `<li class="words__list-item">${word}</li>`);

    list.innerHTML = '';
    list.insertAdjacentHTML('afterbegin', listItems.join(', '));
};

const preloadPlaceWords = () => {
    const list = document.querySelector('.words__list--2');
    const listItems = places.map(word => `<li class="words__list-item">${word}</li>`);

    list.innerHTML = '';
    list.insertAdjacentHTML('afterbegin', listItems.join(', '));
};

const preloadLocationWords = () => {
    const list = document.querySelector('.words__list--3');
    const listItems = locations.map(word => `<li class="words__list-item">${word}</li>`);

    list.innerHTML = '';
    list.insertAdjacentHTML('afterbegin', listItems.join(', '));
};

const preloadColourWords = () => {
    const list = document.querySelector('.colours__list');
    const listItems = colours.map(color => `<li class="colours__list-item">${color}</li>`);

    list.innerHTML = '';
    list.insertAdjacentHTML('afterbegin', listItems.join(', '));
};

export { preloadPeopleWords, preloadColourWords, preloadPlaceWords, preloadLocationWords };
