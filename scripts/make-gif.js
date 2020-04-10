const makeGif = (resetCaptureControls, imageCount, imageChange) => {  
    const canvas = document.querySelector('.canvas');
    const captureCount = document.querySelector('.capture__count');
    const renderCount = document.querySelector('.capture__render-count');

    const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: 'scripts/gif.worker.js',
    });

    resetCaptureControls();

    for(let i = 0; i < imageCount; i++){
        setTimeout(() => {
            gif.addFrame(canvas, {delay: imageChange, copy: true});
            captureCount.textContent = `Frames captured: ${i + 1}`
        }, i * imageChange);
    }

    setTimeout(() => gif.render(), imageChange * imageCount);

    // This is the progress of turning it into a gif after gif.render()
    gif.on('progress', function(p) {
        renderCount.textContent = `Rendering: ${Math.round(p * 100)}%`
    });
    
    gif.on('finished', function(blob) {
        const downloadLink = document.querySelector('.js-download-link');
        const viewLink = document.querySelector('.js-view-link');

        [downloadLink, viewLink].forEach(link => {
            link.classList.remove('acquire-gif-link--disabled');
        })

        viewLink.href = URL.createObjectURL(blob);
        downloadLink.href = URL.createObjectURL(blob);
    });      
};

export default makeGif;
