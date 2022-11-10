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

let selectedUserDates = null;
let nowDate = null;

const getNowDate = () => (nowDate = Date.now());

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  clickOpens: false,
  onClose(selectedDates) {
    selectedUserDates = selectedDates[0];
    // console.log(selectedUserDates);
    onCloseCalendar();
  },
};

Notify.init({
  position: 'center-top',
});

let calendar = flatpickr('#datetime-picker', options);

refs.startButton.setAttribute('disabled', true);

refs.startButton.addEventListener('click', startCountdownTimer);
refs.calendar.addEventListener('click', onOpenCalendar);

function onOpenCalendar() {
  calendar.open();
}

function onCloseCalendar() {
  getNowDate();

  if (selectedUserDates < nowDate) {
    Notify.failure('Please choose a date in the future');
    // window.alert('Please choose a date in the future');
  } else {
    refs.startButton.removeAttribute('disabled');
  }
}

function startCountdownTimer() {
  refs.startButton.setAttribute('disabled', true);
  refs.calendar.removeEventListener('click', onOpenCalendar);

  const timerId = setInterval(() => {
    getNowDate();

    const currentDate = selectedUserDates - nowDate;

    if (currentDate <= 0) {
      clearInterval(timerId);
      refs.calendar.addEventListener('click', onOpenCalendar);
      return;
    }

    updateTimerFields(convertMs(currentDate));
  }, 1000);
}

function convertMs(ms) {
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFields({ days, hours, minutes, seconds }) {
  refs.timer.days.textContent = addLeadingZero(days);
  refs.timer.hours.textContent = addLeadingZero(hours);
  refs.timer.minutes.textContent = addLeadingZero(minutes);
  refs.timer.seconds.textContent = addLeadingZero(seconds);
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// class CountdownTimer {
//   constructor() {
//     // this.options = {
//     //   enableTime: true,
//     //   time_24hr: true,
//     //   defaultDate: new Date(),
//     //   minuteIncrement: 1,
//     //   onClose(selectedDates) {
//     //     // selectedDates = [];
//     //     console.log(selectedDates[0]);
//     //     // this.onCloseCalendar();
//     //   },
//     // };
//     // this.onCloseCalendar = this.onCloseCalendar();

//     this.calendar();
//     // this.onCloseCalendar();
//   }

//   calendar() {
//     flatpickr('#datetime-picker', options);
//   }

//   onCloseCalendar() {
//     console.log('ready');
//     // this.options.onClose();
//   }
// }

// const countdownTimer = new CountdownTimer();

// refs.calendar.addEventListener('click', countdownTimer.onCloseCalendar);

// console.log(refs.calendar);
