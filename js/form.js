const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = document.querySelectorAll('.map__filters select, .map__filters fieldset');
const isDisabled = true;
const roomsField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');

const capacityOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
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

const validateCapacity = () => capacityOptions[parseInt(roomsField.value, 10)].includes(parseInt(capacityField.value, 10));

function getCapacityErrorMessage() {
  switch (parseInt(roomsField.value, 10)) {
    case 1:
      return `оптимально для ${parseInt(roomsField.value, 10)} гостя`;
    case 100:
      return 'размещение гостей невозможно';
    default:
      return `оптимально для ${parseInt(roomsField.value, 10)} гостей`;
  }
}

const onRoomChange = () => {
  pristine.validate(capacityField);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const initValidation = () => {
  pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);
  roomsField.addEventListener('change', onRoomChange);
  adForm.addEventListener('submit', onFormSubmit);
};

export { disablePage, activateForm, activateFilters, initValidation };
