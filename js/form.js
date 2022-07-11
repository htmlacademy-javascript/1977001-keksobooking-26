const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = document.querySelectorAll('.map__filters select, .map__filters fieldset');
const isDisabled = true;

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

export { disablePage, activateForm, activateFilters };
