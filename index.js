let interval;
let timer;

const inputElSeconds = document.querySelector('#seconds');
const buttonElStart = document.querySelector('#start');
const buttonElStop = document.querySelector('#stop');
const timerEl = document.querySelector('span');
const warningEl = document.querySelector('#warning');

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  time %= 3600;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return [hours, minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .join(":");
}

const createTimerAnimator = () => {
  return (seconds) => {
    clearInterval(interval);
    timer = seconds;
    timerEl.textContent = formatTime(timer);
    interval = setInterval(() => {
      timer--;
      if(timer < 0) {
        clearInterval(interval);
      } else {
        timerEl.textContent = formatTime(timer);
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

Inputmask({
  regex: "^[0-5][0-9]:[0-5][0-9]:[0-5][0-9]$",
  placeholder: "HH:MM:SS",
}).mask(inputElSeconds);

inputElSeconds.addEventListener('keydown', (event) => {
  if(!/\d|:/.test(event.key)) {
    event.preventDefault();
    warningEl.style.color = 'red';
  } else {
    warningEl.style.color = 'black';
  }
});

buttonElStart.addEventListener('click', () => {
  const [hours, minutes, seconds] = inputElSeconds.value.split(':').map(Number);
  const totalSeconds = seconds + minutes * 60 + hours * 3600;

  if (isNaN(totalSeconds) || totalSeconds <= 0) {
    alert("Please enter a valid time");
    inputElSeconds.value = '';
    return;
  }

  animateTimer(totalSeconds);
  inputElSeconds.value = '';
});

buttonElStop.addEventListener('click', () => {
  clearInterval(interval);
});
