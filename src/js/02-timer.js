import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  dataPicker: document.querySelector('input#datetime-picker'),
  dataStart: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
  intervalId: null,
  isActive: true,
};

let selectedDate = null;
refs.dataStart.disabled = true; 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    else {
      refs.dataStart.disabled = false; 
      selectedDate = selectedDates[0];
    }
},
};

const result = flatpickr(refs.dataPicker, options);
refs.dataStart.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
    refs.intervalId = setInterval(() => {
    const newDate = new Date();
    const selectedDate = result.selectedDates[0];
    const timerData = selectedDate - newDate;
    
    if (timerData <= 0) {
      clearInterval(refs.intervalId);
      isActive = false;
      return;
    }
     const convertedData = convertMs(timerData);
     updateClock(convertedData);
  }, 1000);
}

  function updateClock(config) {
    refs.dataDays.textContent = addLeadingZero(config.days);
    refs.dataHours.textContent = addLeadingZero(config.hours);
    refs.dataMinutes.textContent = addLeadingZero(config.minutes);
    refs.dataSeconds.textContent = addLeadingZero(config.seconds);
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

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
};
