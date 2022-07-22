import { sendData } from './api.js';
import { setAddress, resetMainPinMarker } from './map.js';
import { addSlider } from './slider.js';
import { isEscapeKey } from './util.js';

const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = document.querySelectorAll('.map__filters select, .map__filters fieldset');
const isDisabled = true;
const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const roomsField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');
const checkField = adForm.querySelector('#ad-form__element--time');
const addressField = adForm.querySelector('#address');
const sliderElement = adForm.querySelector('#ad-form__slider');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');

const success = document.querySelector('#success')
  .content
  .querySelector('.success');

const error = document.querySelector('#error')
  .content
  .querySelector('.error');

const typePrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

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
  addSlider(sliderElement, priceField);
};

const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  toggleElements(mapFiltersElements, !isDisabled);
};

//Адрес
addressField.readOnly = true;

//Валидация
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error-text',
  errorTextTag: 'span',
});

//Стоимость
const validatePrice = () => parseInt(priceField.value, 10) >= typePrices[typeField.value];

const getPriceErrorMessage = () => `Минимальная сумма для данного вида жилья ${typePrices[typeField.value]} руб.`;

const onTypeChange = () => {
  priceField.placeholder = typePrices[typeField.value];
  pristine.validate(priceField);
};

//Заезд-Выезд
const onCheckingChange = (evt) => {
  timeOutField.value = evt.target.value;
  timeInField.value = evt.target.value;
};

//Количество мест
const validateCapacity = () => capacityOptions[parseInt(roomsField.value, 10)].includes(parseInt(capacityField.value, 10));

const getCapacityErrorMessage = () => {
  switch (parseInt(roomsField.value, 10)) {
    case 1:
      return `оптимально для ${parseInt(roomsField.value, 10)} гостя`;
    case 100:
      return 'размещение гостей невозможно';
    default:
      return `оптимально для ${parseInt(roomsField.value, 10)} гостей`;
  }
};

const onRoomChange = () => {
  pristine.validate(capacityField);
};

//Отправка формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняем...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const showSuccessMessage = () => {
  document.body.append(success);
  document.addEventListener('click', () => { closeSuccessMessage(success); });
  document.addEventListener('keydown', onSuccessEscKeydown);
};

const showErrorMessage = () => {
  document.body.append(error);
  document.addEventListener('click', () => { closeErrorMessage(error); });
  document.addEventListener('keydown', onErrorEscKeydown);
};

function closeSuccessMessage() {
  success.remove();
}

function closeErrorMessage() {
  error.remove();
}

const formReset = () => {
  adForm.reset();
  resetMainPinMarker();
  setAddress();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  formReset();
});

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        showSuccessMessage();
        unblockSubmitButton();
        formReset();
      },
      () => {
        showErrorMessage();
        unblockSubmitButton();
      },
      formData
    );
  }
};

const initValidation = () => {
  pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);
  typeField.addEventListener('change', onTypeChange);

  pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);
  roomsField.addEventListener('change', onRoomChange);

  checkField.addEventListener('change', onCheckingChange);

  adForm.addEventListener('submit', onFormSubmit);
};

export { disablePage, activateForm, activateFilters, initValidation };
