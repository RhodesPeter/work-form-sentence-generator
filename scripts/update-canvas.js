import base64Apercu from './base-64-fonts.js/apercu';
import base64Sheppy from './base-64-fonts.js/sheppy';
import base64Airspace from './base-64-fonts.js/airspace';
import base64JonesMono from './base-64-fonts.js/jones';
import base64LooseFit from './base-64-fonts.js/loose-fit';
import base64SelavyCross from './base-64-fonts.js/selavy-cross';
import base64WorkFormStandard from './base-64-fonts.js/work-form-standard';
import base64WorkCurvy from './base-64-fonts.js/work-curvy';
import base64WorkSlab from './base-64-fonts.js/work-slab';

const updateCanvas = () => {
    const resultWrapper = document.querySelector('.result-wrapper');
    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // To add custom fonts to an svg they have to be base64 encoded.
    // Apercu added as backup font as not all fonts have ampersands.
    const data = `
        <svg xmlns="http://www.w3.org/2000/svg">
            <style>
                * {
                    box-sizing: border-box;
                    padding: 0;
                    margin: 0;
                }
                @font-face { font-family: 'apercu'; src: url(${base64Apercu}) format('truetype'); }
                @font-face { font-family: 'sheppySans'; src: url(${base64Sheppy}) format('truetype'); }
                @font-face { font-family: 'airSpace'; src: url(${base64Airspace}) format('truetype'); }
                @font-face { font-family: 'jonesMono'; src: url(${base64JonesMono}) format('woff2'); }
                @font-face { font-family: 'LooseFit'; src: url(${base64LooseFit}) format('woff2'); }
                @font-face { font-family: 'SelavyCross'; src: url(${base64SelavyCross}) format('woff2'); }
                @font-face { font-family: 'WorkFormStandard'; src: url(${base64WorkFormStandard}) format('woff2'); }
                @font-face { font-family: 'WorkCurvy'; src: url(${base64WorkCurvy}) format('woff2'); }
                @font-face { font-family: 'WorkSlab'; src: url(${base64WorkSlab}) format('woff2'); }
            </style>
            <foreignObject width="100%" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml">
                    ${resultWrapper.innerHTML}
                </div>
            </foreignObject>
        </svg>
    `;

    const tempImg = document.createElement('img')
    tempImg.src = 'data:image/svg+xml,' + encodeURIComponent(data);
    
    tempImg.addEventListener('load', e => ctx.drawImage(e.target, 0, 0))
}

export default updateCanvas;
