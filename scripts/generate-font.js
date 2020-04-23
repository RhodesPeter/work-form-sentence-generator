import getRandomNum from './get-random-num';
import fonts from './fonts';

const generateFont = () => {
    const activeFonts = [...document.querySelectorAll('.fonts__input:checked')];
    
    document
        .querySelectorAll('.result__word')
        .forEach(result => {
            const randomColour = activeFonts[getRandomNum(activeFonts)];

            // apercu added as a backup as not all fonts have ampersands.
            result.style.fontFamily = randomColour ? `${randomColour.value}, apercu` : 'apercu';

            if (randomColour && fonts[randomColour.value].caseLimitedTo) {
                result.style.textTransform = 'uppercase';
            } else {
                result.style.textTransform = 'none';
            }
        });
};

export default generateFont;