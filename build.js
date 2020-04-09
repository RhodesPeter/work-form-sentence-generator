var myBundle = (function (exports) {
    'use strict';

    const people = [
        'People',
        'Community',
        'Crowds',
        'Family',
        'Public',
        'Citizens',
        'Plants',
        'Cats',
        'Education',
        'Culture',
        'Detail',
        'Typefaces',
        'Tools',
        'Robots',
        'Dinosaurs',
        'Learning'
    ];

    const places = [
        'Place',
        'Area',
        'Research',
        'Experiments',
        'Printing',
        'Hangouts',
        'Vernacular',
        'Process',
        'Collaboration',
        'Mapping',
        'Co-design',
        'Production',
        'History',
        'Archives',
        'Photography',
        'Typography'
    ];

    const locations = [
        'Local',
        'Park',
        'Town',
        'City',
        'Village',
        'Pub',
        'Café',
        'Shops',
        'Supermarket',
        'Studio',
        'Workshop',
        'Neighbourhood',
        'Canteen',
        'Corner',
        'Field',
        'Home'
    ];

    const colours = [
        '#4347F5',
        '#E77B65',
        '#E7658E',
        '#FFC300',
        '#65E7C6'
    ];

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

    const makeGif = () => {  
        const canvas = document.querySelector('.canvas');
        const captureCount = document.querySelector('.capture__count');
        const renderCount = document.querySelector('.capture__render-count');

        const gif = new GIF({
            workers: 2,
            quality: 10,
            workerScript: 'scripts/gif.worker.js',
        });

        resetCaptureControls();

        for(let i = 0; i < exports.imageCount; i++){
            setTimeout(() => {
                gif.addFrame(canvas, {delay: exports.imageChange, copy: true});
                captureCount.textContent = `Frames captured: ${i + 1}`;
            }, i * exports.imageChange);
        }

        setTimeout(() => gif.render(), exports.imageChange * exports.imageCount);

        // This is the progress of turning it into a gif after gif.render()
        gif.on('progress', function(p) {
            renderCount.textContent = `Rendering: ${Math.round(p * 100)}%`;
        });
        
        gif.on('finished', function(blob) {
            const downloadLink = document.querySelector('.js-download-link');
            const viewLink = document.querySelector('.js-view-link');

            [downloadLink, viewLink].forEach(link => {
                link.classList.remove('acquire-gif-link--disabled');
            });

            viewLink.href = URL.createObjectURL(blob);
            downloadLink.href = URL.createObjectURL(blob);
        });      
    };

    const wordsForm = document.querySelector('.words__form');
    const coloursForm = document.querySelector('.colours__form');
    const captureGifBtn = document.querySelector('.capture__btn');
    const speedRange = document.querySelector('.slider--speed');
    const imageCountRange = document.querySelector('.slider--image-count');
    const renderCount = document.querySelector('.capture__render-count');

    exports.imageChange = speedRange.value; // 2000 milliseconds default (2 seconds)
    exports.imageCount = imageCountRange.value;
    let interval = '';
    let previousColor = '';

    const handleAddWord = (event) => {
        event.preventDefault();

        const input = document.querySelector('.words__input');
        const newWord = input.value;
        
        if (newWord.trim().length === 0) return;

        people.push(newWord);

        preloadPeopleWords();
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
    };

    const getRandomNum = array => Math.floor(Math.random() * array.length) + 0;

    const generateWords = () => {
        const wordOne = document.querySelector('.result__word--1');
        const wordTwo = document.querySelector('.result__word--2');
        const wordThree = document.querySelector('.result__word--4');
        
        wordOne.textContent = `${people[getRandomNum(people)]},`;
        wordTwo.textContent = places[getRandomNum(places)];
        wordThree.textContent = `the ${locations[getRandomNum(locations)]}`;
    };

    const generateBackgroundColor = () => {
        const resultContainer = document.querySelector('.result');
        let nextColor = colours[getRandomNum(colours)];
        
        while (nextColor === previousColor) {
            nextColor = colours[getRandomNum(colours)];
        }

        resultContainer.style.backgroundColor = nextColor;
        previousColor = nextColor;
    };

    const startCycle = () => {
        interval = setInterval(() => {
            generateWords();
            generateBackgroundColor();
            updateCanvas();
        }, exports.imageChange);
    };

    const handleRangeChange = (event) => {
        const secondsElement = document.querySelector('.speed__seconds');
        const rangeValue = event.target.value;

        secondsElement.textContent = `${rangeValue / 1000} second${rangeValue === '1000' ? '' : 's'}`;
        exports.imageChange = rangeValue;
        clearTimeout(interval);
        startCycle();
    };

    const handleImageCountChange = (event) => {
        const imageCountText = document.querySelector('.image-count__number');
        const imageCountValue = event.target.value;

        exports.imageCount = imageCountValue;
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

        const tempImg = document.createElement('img');
        tempImg.src = 'data:image/svg+xml,' + encodeURIComponent(data);
        
        tempImg.addEventListener('load', e => ctx.drawImage(e.target, 0, 0));
    };

    const resetCaptureControls = () => {
        const captureCount = document.querySelector('.capture__count');

        captureCount.textContent = '';
        renderCount.textContent = '';

        [...document.querySelectorAll('.acquire-gif-link')].forEach(link => {
            link.classList.add('acquire-gif-link--disabled');
            link.href = '';
        });
    };

    // Can this just be in the HTML, or should this be somewhere else, or in a func? init func?
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

    preloadPeopleWords();
    preloadColourWords();
    generateWords();
    generateBackgroundColor();
    startCycle();
    updateCanvas();

    exports.resetCaptureControls = resetCaptureControls;

    return exports;

}({}));
