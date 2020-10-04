import Canvas from './Canvas.js';

((window, document) => {
    const canvas = Canvas.from(document.querySelector('canvas[data-canvas]'));
    const renderButton = document.querySelector('button[data-render-button]');
    renderButton.addEventListener('click', () => {
        canvas.render();
    })
})(window, document);