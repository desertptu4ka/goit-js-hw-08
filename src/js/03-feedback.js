import throttle from 'lodash.throttle';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

const STORAGE_KEY = 'feedback-form-state'; //localStorage.getItem('feedback-form-state');
const MIN_LENGTH = 10;

const form = document.querySelector('.feedback-form');

const throttledSmthChange = throttle(smthChange, 500, { trailing: false });

//there will be saved text from 'form'
//and than, currentData will be saved in the local storage
let currentData;

function smthChange() {
  const { name, value } = event.target;
  currentData[name] = value;

  updateLocalStorage();
}

function updateLocalStorage() {
  const formData = JSON.stringify(currentData);
  localStorage.setItem(STORAGE_KEY, formData);

  console.log('localStorage was updated');
}

function submitForm() {
  event.preventDefault();
  //validator
  const isEmailValid = isEmail(currentData.email + '');
  const IsMessageValid = isLength(currentData.message + '', { min: MIN_LENGTH });
  if (!isEmailValid || !IsMessageValid) {
    //modal window
    const textEmail = isEmailValid
      ? '<span class="correct">Email is correct</span>'
      : '<span class="error">Email is not correct</span>';
    const textMessage = IsMessageValid
      ? '<span class="correct">Message is correct</span>'
      : `<span class="error">Message length has to be more than ${MIN_LENGTH} charts</span>`;
    showError(textEmail, textMessage);
    return;
  }
  //end validator

  event.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  console.log(currentData);
  event.target.reset();

  //clear object
  for (const key in currentData) {
    delete currentData[key];
  }
}

function onLoad() {
  currentData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (currentData) {
    fillForm();
  } else {
    currentData = {};
  }
  //add modal window to show errors
  createModalWindow();
}

function fillForm() {
  for (const key in currentData) {
    form[key].value = currentData[key];
  }
}

//modal
function createModalWindow() {
  const modalHTML = `
    <div class="modal hiden">
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function showError(...args) {
  const el = document.querySelector('.modal');
  el.classList.remove('hiden');
  el.innerHTML = args.join('');

  setTimeout(() => {
    el.classList.add('hiden');
  }, 5000);
}

//collect data when element lose focus
[...form.elements].forEach(el => {
  if (el.name) {
    el.addEventListener('blur', smthChange);
  }
});

form.addEventListener('input', throttledSmthChange);
form.addEventListener('submit', submitForm);
window.addEventListener('load', onLoad);

//css
const style = document.createElement('STYLE');
style.type = 'text/css';
style.innerHTML = `.modal {position: absolute;
  top: 2px;
  left: 50%;
  width: 256px;
  height: 96px;
  border: dashed 2px orange;
  border-radius: 16px;
  transform: translate(-50%);
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 1000ms;
  }
  .correct {
    color: lime;
  }
  .error {
    color: tomato;
  }
  .hiden {
    transform: translate(-50%, -104%);
  }
  `;
document.body.append(style);
