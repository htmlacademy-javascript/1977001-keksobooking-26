const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = document.querySelectorAll('.map__filters select, .map__filters fieldset');
const isDisabled = true;
const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');
let roomNumber = adForm.querySelector('#room_number > option:checked').value;

const capacityOption = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};

//Активация
const toggleElements = (elements, state) => {
  elements.forEach((element) => {
    element.disabled = state;
  });
};

const disablePage = () => {
  adForm.classList.add('ad-form--disabled');
  toggleElements(adFormElements, isDisabled);
  mapFilters.classList.add('map__filters--disabled');
  toggleElements(mapFiltersElements, isDisabled);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  toggleElements(adFormElements, !isDisabled);
};

const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  toggleElements(mapFiltersElements, !isDisabled);
};


//Валидация
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error-text',
  errorTextTag: 'span',
});

// Такой был сначала вариант, чтобы не создавать массив, но подумала, что тебе он точно не понравится)))
// function validateСapacity (value) {
//   if (parseInt(roomNumber) === 100) {
//     return parseInt(capacity.value) === 0;
//   } else {
//     return parseInt(value) <= parseInt(roomNumber) && parseInt(value) !==0;
//   }
// }

function validateСapacity() {
  return capacityOption[parseInt(roomsField.value, 10)].includes(parseInt(capacityField.value, 10));
}

function getCapacityErrorMessage() {
  switch (parseInt(roomNumber, 10)) {
    case 1:
      return `оптимально для ${parseInt(roomNumber, 10)} гостя`;
    case 100:
      return 'размещение гостей невозможно';
    default:
      return `оптимально для ${parseInt(roomNumber, 10)} гостей`;
  }
}

pristine.addValidator(capacityField, validateСapacity, getCapacityErrorMessage);

function onRoomChange () {
  roomNumber = adForm.querySelector('#room_number > option:checked').value;
  pristine.validate(capacityField);
}

adForm
  .querySelectorAll('[name="rooms"]')
  .forEach((item) => item.addEventListener('change', onRoomChange));


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


export { disablePage, activateForm, activateFilters };
