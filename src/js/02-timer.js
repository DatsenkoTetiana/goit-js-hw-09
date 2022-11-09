import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';
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
let getEl = selector => document.querySelector(selector);
const inputPicker = getEl('#datetime-picker');
const btnStartEl = getEl('[data-start]');
const daysEl = getEl('[data-days]');
const hoursEl = getEl('[data-hours]');
const minutesEl = getEl('[data-minutes]');
const secondsEl = getEl('[data-seconds]');
let timerId = null;
btnStartEl.setAttribute('disabled', true);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      userDate = new Date();
      Notify.failure(`Please choose a date in the future`);
    } else {
      btnStartEl.disabled = false;
      btnStartEl.removeAttribute('disabled');
      timerId = selectedDates[0];
    }
  },
};
flatpickr(inputPicker, options);

function onStartBtn() {
  timerId = setInterval(startTimer, 1000);
}
