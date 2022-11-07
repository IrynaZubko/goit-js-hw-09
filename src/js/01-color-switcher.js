const refs = {
    startButton: document.querySelector("button[data-start]"),
    stopButton: document.querySelector("button[data-stop]"),
    body: document.querySelector("body"),
}

let colorID = null;
const changeBackgroundColor = () => refs.body.style.backgroundColor = getRandomHexColor();

refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

refs.stopButton.setAttribute("disabled", true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartButtonClick() {
    colorID = setInterval(changeBackgroundColor, 1000);
    refs.startButton.setAttribute("disabled", true);
    refs.stopButton.removeAttribute("disabled");
}

function onStopButtonClick() {
    clearInterval(colorID);
    refs.startButton.removeAttribute("disabled");
    refs.stopButton.setAttribute("disabled", true);
}