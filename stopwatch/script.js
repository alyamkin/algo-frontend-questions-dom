const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');
const timer = document.getElementById('timer');

let elapsedTime = 0;
let stopTime = 0;
let intervalTimer = null;

// 00:00:000
function formatTime({ minutes, seconds, milliseconds }) {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}:${String(milliseconds).padStart(3, '0')}`;
}

function extractTimeComponents(elapsedTime) {
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = elapsedTime % 1000;

  return { minutes, seconds, milliseconds };
}

function renderTime(elapsedTime) {
  const extractedTimeComponents = extractTimeComponents(elapsedTime);
  const formattedTime = formatTime(extractedTimeComponents);
  timer.innerText = formattedTime;
}

function setDisabledState(
  startDisabled = false,
  stopDisabled = true,
  resetDisabled = true
) {
  startButton.disabled = startDisabled;
  stopButton.disabled = stopDisabled;
  resetButton.disabled = resetDisabled;
}

function startWatch() {
  const startTime = Date.now();
  setDisabledState(true, false, true);
  intervalTimer = setInterval(() => {
    elapsedTime = stopTime + Date.now() - startTime;
    renderTime(elapsedTime);
  }, 1);
}

function stopWatch() {
  setDisabledState(false, true, false);
  clearInterval(intervalTimer);
  stopTime = elapsedTime;
}

function resetWatch() {
  elapsedTime = 0;
  stopTime = 0;
  clearInterval(intervalTimer);
  renderTime(0);
  setDisabledState(false, true, true);
}

function init() {
  setDisabledState(false, true, true);
  startButton.addEventListener('click', startWatch);
  stopButton.addEventListener('click', stopWatch);
  resetButton.addEventListener('click', resetWatch);
}

init();
