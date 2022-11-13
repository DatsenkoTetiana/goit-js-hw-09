import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

let getEl = selector => document.querySelector(selector);
const inputPicker = getEl('#datetime-picker');
const btnStartEl = getEl('[data-start]');
const daysEl = getEl('[data-days]');
const hoursEl = getEl('[data-hours]');
const minutesEl = getEl('[data-minutes]');
const secondsEl = getEl('[data-seconds]');

let timerId = null;

btnStartEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    if (selectedDate[0] <= new Date()) {
      btnStartEl.disabled = true;
      Notify.failure('Please choose a date in the future');
    } else {
      btnStartEl.disabled = false;
      btnStartEl.addEventListener('click', timer);

      function timer() {
        timerId = setInterval(() => {
          btnStartEl.disabled = true;

          const dateSelected = new Date(
            inputPicker.value.replace(/-/g, '/')
          ).getTime();
          const nowTime = new Date().getTime();
          const deltaTime = dateSelected - nowTime;

          const { days, hours, minutes, seconds } = convertMs(deltaTime);

          daysEl.innerHTML = days < 10 ? addLeadingZero(days) : days;
          hoursEl.innerHTML = hours < 10 ? addLeadingZero(hours) : hours;
          minutesEl.innerHTML =
            minutes < 10 ? addLeadingZero(minutes) : minutes;
          secondsEl.innerHTML =
            seconds < 10 ? addLeadingZero(seconds) : seconds;

          if (deltaTime < 1000) {
            clearInterval(timerId);
            btnStartEl.disabled = false;
          }
        }, 1000);
      }

      function addLeadingZero(value) {
        const stringValue = String(value);
        return stringValue.padStart(2, '0');
      }

      function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
      }
    }
  },
};

flatpickr(inputPicker, options);
// Список полезных модификаторов:

// g - глобальная замена. Замените все экземпляры совпадающей строки в предоставленном тексте.
// i - замена без учета регистра. Замените все экземпляры совпадающей строки, игнорируя различия в регистре.
// m - Многострочная замена. Регулярное выражение должно быть проверено на совпадения в нескольких строках.
