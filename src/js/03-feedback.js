import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state'; //localStorage.getItem('feedback-form-state')

const form = document.querySelector('.feedback-form');

const throttledSmthChange = throttle(smthChange, 500, { trailing: false });

//there will be saved text from 'form'
//and than, currentData will be saved in local storage
let currentData;

function smthChange() {
  const el = event.target;
  currentData[el.name] = el.value;

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

  for (const key in currentData) {
    console.log(`${key} = ${currentData[key]}`);

    //clear object
    delete currentData[key];
  }
  form.reset();
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

form.addEventListener('input', smthChange);
form.addEventListener('submit', submitForm);
window.addEventListener('load', onLoad);
