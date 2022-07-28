import { debounce } from './util.js';
import { clearPins, renderPins } from './map.js';

const FILTER_DEFAULT = 'any';
const ADS_COUNT = 10;

const Price = {
  MEDIUM: 10000,
  HIGH: 50000,
};

const filterForm = document.querySelector('.map__filters');
const typeInput = filterForm.querySelector('#housing-type');
const roomsInput = filterForm.querySelector('#housing-rooms');
const guestsInput = filterForm.querySelector('#housing-guests');
const priceInput = filterForm.querySelector('#housing-price');

const typeFilter = (ad, type) => type === FILTER_DEFAULT || type === ad.offer.type;

const roomsFilter = (ad, rooms) => rooms === FILTER_DEFAULT || parseInt(rooms, 10) === ad.offer.rooms;

const guestsFilter = (ad, guests) => guests === FILTER_DEFAULT || parseInt(guests, 10) === ad.offer.guests;

const priceFilter = (ad, price) => {
  switch (price) {
    case FILTER_DEFAULT:
      return true;
    case 'low':
      return ad.offer.price < Price.MEDIUM;
    case 'middle':
      return (ad.offer.price < Price.HIGH && ad.offer.price >= Price.MEDIUM);
    case 'high':
      return ad.offer.price > Price.HIGH;
  }
};

const featuresFilter = (ad, selectedFeatures) => {
  if (!selectedFeatures.length) {
    return true;
  }

  if (ad.offer.features) {
    return Array.from(selectedFeatures).every((element) => !ad.offer.features.includes(element.value));
  }
  return false;
};

const filterAds = (data) => {
  const selectedType = typeInput.value;
  const selectedRooms = roomsInput.value;
  const selectedGuests = guestsInput.value;
  const selectedPrice = priceInput.value;
  const selectedFeatures = Array.from(filterForm.querySelectorAll('input[type="checkbox"]:checked'));

  return data
    .filter((ad) => typeFilter(ad, selectedType)
      && roomsFilter(ad, selectedRooms)
      && guestsFilter(ad, selectedGuests)
      && priceFilter(ad, selectedPrice)
      && featuresFilter(ad, selectedFeatures))
    .slice(0, ADS_COUNT);
};

const onFilterChange = (data) => {
  clearPins();
  const matchedAds = filterAds(data);
  renderPins(matchedAds);
};

const initFilter = (data) => {
  filterForm.addEventListener('change', debounce(() => onFilterChange(data)));
  filterForm.addEventListener('reset', debounce(() => onFilterChange(data)));
};

export { initFilter };
