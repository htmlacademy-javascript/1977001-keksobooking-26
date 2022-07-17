import { mainPinMarker } from './map.js';
import { addSlider } from './slider.js';

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
  const { lat, lng } = mainPinMarker.getLatLng();
  addressField.placeholder = `${lat}, ${lng}`;
  addSlider(sliderElement, priceField);
};

const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  toggleElements(mapFiltersElements, !isDisabled);
};

//Адрес
const setFormAddress = () => {
  addressField.readOnly = true;

  mainPinMarker.on('moveend', (evt) => {
    const { lat, lng } = evt.target.getLatLng();
    addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });
};

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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const initValidation = () => {
  pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);
  typeField.addEventListener('change', onTypeChange);

  pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);
  roomsField.addEventListener('change', onRoomChange);

  checkField.addEventListener('change', onCheckingChange);

  adForm.addEventListener('submit', onFormSubmit);
};

export { disablePage, activateForm, activateFilters, initValidation, setFormAddress };
