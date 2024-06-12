const MIN_DURATION = 500;
const addButton = document.getElementById('add-button');
const clearButton = document.getElementById('clear-button');
const toasts = document.getElementById('toasts');

function removeToasts() {
  toasts.innerHTML = '';
}

function getToastDuration() {
  const duration = parseInt(document.getElementById('duration').value);

  if (isNaN(duration) || duration < MIN_DURATION) {
    return MIN_DURATION;
  }

  return duration;
}

function getDefaultMessage(type) {
  return type === 'success' ? 'Success!' : 'Error.';
}

function createToast(message, isCancelable, type) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.classList.add(`${type}-toast`);
  const paragraph = document.createElement('p');
  paragraph.classList.add('message');
  paragraph.textContent = message || getDefaultMessage(type);
  toast.appendChild(paragraph);

  if (isCancelable) {
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'X';
    cancelButton.classList.add('cancel-button');
    cancelButton.addEventListener('click', () => toast.remove());
    toast.appendChild(cancelButton);
  }

  return toast;
}

function addToast() {
  const message = document.getElementById('message-content').value;
  const isCancelable = document.getElementById('cancelable').checked;
  const type = document.querySelector('input[name="type"]:checked').value;
  const toast = createToast(message, isCancelable, type);

  toasts.prepend(toast);
  setTimeout(() => {
    toast.remove();
  }, getToastDuration());
}

function init() {
  addButton.addEventListener('click', addToast);
  clearButton.addEventListener('click', removeToasts);
}

init();
