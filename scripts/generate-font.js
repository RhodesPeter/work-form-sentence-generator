import getRandomNum from './get-random-num';
import fonts from './fonts';

const numberOfLines = 4;

const generateFont = () => {
    const activeFonts = [...document.querySelectorAll('.fonts__input:checked')];
    const usedFonts = [];
    
    document
        .querySelectorAll('.result__word')
        .forEach(result => {
            let randomFont = activeFonts[getRandomNum(activeFonts)];

            if (activeFonts.length >= numberOfLines) {
                while (usedFonts.includes(randomFont.value)) {
                    randomFont = activeFonts[getRandomNum(activeFonts)];
                }
            } else if (activeFonts.length === 3) {
                while (count(usedFonts, randomFont.value) >= 2) {
                    randomFont = activeFonts[getRandomNum(activeFonts)];
                }
            } else if (activeFonts.length === 2) {
                while (count(usedFonts, randomFont.value) >= 2) {
                    randomFont = activeFonts[getRandomNum(activeFonts)];
                }
            }

            usedFonts.push(randomFont ? randomFont.value : 'apercu');

            // apercu added as a backup as not all fonts have ampersands.
            result.style.fontFamily = randomFont ? `${randomFont.value}, apercu` : 'apercu';

            if (randomFont && fonts[randomFont.value].caseLimitedTo === 'uppercase') {
                result.style.textTransform = 'uppercase';
            } else {
                result.style.textTransform = 'none';
            }
        });
};

const count = (arr, value) => arr.filter(val => val === value).length;

export default generateFont;