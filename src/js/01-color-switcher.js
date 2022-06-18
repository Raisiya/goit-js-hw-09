const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

const PROMPT_DELAY = 1000;
let intervalId = null;


refs.startBtn.addEventListener('click', srartChangeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);

function srartChangeColor() {
    refs.startBtn.setAttribute('disabled', true);
    refs.stopBtn.removeAttribute('disabled');
    intervalId = setInterval(changeColor, 1000);
};

function stopChangeColor() {
    refs.startBtn.removeAttribute('disabled');
    refs.stopBtn.setAttribute('disabled', true);
    clearInterval(intervalId);
};

function changeColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
