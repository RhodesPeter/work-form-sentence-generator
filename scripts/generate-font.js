import getRandomNum from './get-random-num';
import fonts from './fonts';

const generateFont = () => {
    const activeFonts = [...document.querySelectorAll('.fonts__input:checked')];
    
    document
        .querySelectorAll('.result__word')
        .forEach(result => {
            const randomColour = activeFonts[getRandomNum(activeFonts)];
            result.style.fontFamily = randomColour ? randomColour.value : 'apercu';

            if (randomColour && fonts[randomColour.value].caseLimitedTo) {
                result.style.textTransform = 'uppercase';
            } else {
                result.style.textTransform = 'none';
            }
        });
};

export default generateFont;