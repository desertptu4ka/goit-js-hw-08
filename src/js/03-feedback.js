import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state'; //localStorage.getItem('feedback-form-state');

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
  localStorage.removeItem(STORAGE_KEY);
  console.log(currentData);
  form.reset();

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
}

function fillForm() {
  for (const key in currentData) {
    form[key].value = currentData[key];
  }
}

form.addEventListener('input', throttledSmthChange);
form.addEventListener('submit', submitForm);
window.addEventListener('load', onLoad);
