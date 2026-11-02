// Change these values to change how the stopwatch counts.
const stepSeconds = 3;
const maxSeconds = 30;
const intervalMilliseconds = 1000;

const timerDisplay = document.querySelector('#timer-display');
const startButton = document.querySelector('#start-button');
const stopButton = document.querySelector('#stop-button');
const resetButton = document.querySelector('#reset-button');

let elapsedSeconds = 0;
let timerInterval = null;

// Show the elapsed time as minutes:seconds, for example 00:06.
function showTime() {
  const secondsText = String(elapsedSeconds).padStart(2, '0');
  const time = `00:${secondsText}`;

  timerDisplay.textContent = time;
  timerDisplay.setAttribute('aria-label', `Elapsed time ${time}`);
}

// Start the timer unless it is already running or has reached its limit.
startButton.addEventListener('click', () => {
  if (timerInterval !== null || elapsedSeconds >= maxSeconds) return;

  timerInterval = window.setInterval(() => {
    elapsedSeconds = Math.min(elapsedSeconds + stepSeconds, maxSeconds);
    showTime();

    if (elapsedSeconds >= maxSeconds) {
      window.clearInterval(timerInterval);
      timerInterval = null;
    }
  }, intervalMilliseconds);
});

// Stop pauses the timer. The elapsed time stays where it is.
stopButton.addEventListener('click', () => {
  if (timerInterval === null) return;

  window.clearInterval(timerInterval);
  timerInterval = null;
});

// Reset stops the timer and returns the elapsed time to zero.
resetButton.addEventListener('click', () => {
  if (timerInterval !== null) {
    window.clearInterval(timerInterval);
    timerInterval = null;
  }

  elapsedSeconds = 0;
  showTime();
});

showTime();
