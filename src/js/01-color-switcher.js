const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

const changeBackgroundColor = () =>
  (refs.body.style.backgroundColor = colorSwitcher.getRandomHexColor());

class ColorSwitcher {
  constructor({ onClick }) {
    this.colorID = null;
    this.onClick = onClick;
    refs.stopButton.setAttribute('disabled', true);
  }

  onStartButtonClick() {
    this.colorID = setInterval(this.onClick, 1000);
    refs.startButton.setAttribute('disabled', true);
    refs.stopButton.removeAttribute('disabled');
  }

  onStopButtonClick() {
    clearInterval(this.colorID);
    refs.startButton.removeAttribute('disabled');
    refs.stopButton.setAttribute('disabled', true);
  }

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}

const colorSwitcher = new ColorSwitcher({
  onClick: changeBackgroundColor,
});

refs.startButton.addEventListener('click', () =>
  colorSwitcher.onStartButtonClick()
);

refs.stopButton.addEventListener('click', () =>
  colorSwitcher.onStopButtonClick()
);
