const FRAME_INTERVAL_MS = 1000 / 60;
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');
const timer = document.getElementById('timer');

let elapsedTime = 0;
let stopTime = 0;
let startTime = 0;
let intervalID;
let frameID;

// 00:00:000
function formatTime({ minutes, seconds, milliseconds }) {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}:${String(milliseconds).padStart(3, '0')}`;
}

function extractTimeComponents(elapsedTime) {
  const milliseconds = elapsedTime % 1000;
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (60 * 1000)) % 60);
  console.log(milliseconds);
  return { minutes, seconds, milliseconds };
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

function updateTimer() {
  elapsedTime = Date.now() - startTime + stopTime;
  const extractedTimeComponents = extractTimeComponents(elapsedTime);
  const formattedTime = formatTime(extractedTimeComponents);
  timer.innerText = formattedTime;
  frameID = requestAnimationFrame(updateTimer);
}

function startTimer() {
  setDisabledState(true, false, true);
  startTime = Date.now();
  // intervalTimer = setInterval(updateTimer, FRAME_INTERVAL_MS);
  frameID = requestAnimationFrame(updateTimer);
}

function stopTimer() {
  setDisabledState(false, true, false);
  // clearInterval(intervalID);
  cancelAnimationFrame(frameID);
  stopTime = elapsedTime;
}

function resetTimer() {
  setDisabledState(false, true, true);
  elapsedTime = 0;
  stopTime = 0;
  // clearInterval(intervalID);
  cancelAnimationFrame(frameID);
  timer.innerText = '00:00:000';
}

function init() {
  setDisabledState(false, true, true);
  startButton.addEventListener('click', startTimer);
  stopButton.addEventListener('click', stopTimer);
  resetButton.addEventListener('click', resetTimer);
}

init();
