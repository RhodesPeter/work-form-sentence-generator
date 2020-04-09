import { people, places, locations } from './words';
import colours from './colours';

const preloadPeopleWords = () => {
    const list = document.querySelector('.words__list');
    const listItems = people.map(word => `<li class="words__list-item">${word}</li>`);

    list.innerHTML = '';
    list.insertAdjacentHTML('afterbegin', listItems.join(', '));
};

const preloadColourWords = () => {
    const list = document.querySelector('.colours__list');
    const listItems = colours.map(color => `<li class="colours__list-item">${color}</li>`);

    list.innerHTML = '';
    list.insertAdjacentHTML('afterbegin', listItems.join(', '));
};

export { preloadPeopleWords, preloadColourWords };
