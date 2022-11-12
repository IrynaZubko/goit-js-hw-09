import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  calendar: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  timer: {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
  },
};

class CountdownTimer {
  constructor({ onTick }) {
    this.selectedUserDates = null;
    this.nowDate = null;

    this.options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: selectedDates => {
        this.selectedUserDates = selectedDates[0];
        // console.log(this.selectedUserDates);
        this.onCloseCalendar();
      },
    };

    this.calendar = flatpickr('#datetime-picker', this.options);
    this.onTick = onTick;
  }

  onBlock() {
    refs.startButton.setAttribute('disabled', true);
    refs.calendar.setAttribute('disabled', true);
  }

  getNowDate() {
    this.nowDate = Date.now();
  }

  onCloseCalendar() {
    this.getNowDate();

    if (this.selectedUserDates < this.nowDate) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startButton.removeAttribute('disabled');
    }
  }

  startCountdownTimer() {
    this.onBlock();

    const timerId = setInterval(() => {
      this.getNowDate();

      const currentDate = this.selectedUserDates - this.nowDate;

      if (currentDate <= 0) {
        clearInterval(timerId);
        refs.calendar.removeAttribute('disabled');
        return;
      }

      this.onTick(this.convertMs(currentDate));
    }, 1000);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

refs.startButton.setAttribute('disabled', true);

const countdownTimer = new CountdownTimer({
  onTick: updateTimerFields,
});

refs.startButton.addEventListener(
  'click',
  countdownTimer.startCountdownTimer.bind(countdownTimer)
);

Notify.init({
  position: 'center-top',
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFields({ days, hours, minutes, seconds }) {
  refs.timer.days.textContent = addLeadingZero(days);
  refs.timer.hours.textContent = addLeadingZero(hours);
  refs.timer.minutes.textContent = addLeadingZero(minutes);
  refs.timer.seconds.textContent = addLeadingZero(seconds);
}
