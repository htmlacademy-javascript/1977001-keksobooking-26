import { debounce } from './util.js';
import { clearPins, renderPins } from './map.js';

const FILTER_DEFAULT = 'any';
const ADS_COUNT = 10;
const RERENDER_DELAY = 500;


const Price = {
  MEDIUM: 10000,
  HIGH: 50000,
};

const filterField = document.querySelector('.map__filters');
const typeInput = filterField.querySelector('#housing-type');
const roomsInput = filterField.querySelector('#housing-rooms');
const guestsInput = filterField.querySelector('#housing-guests');
const priceInput = filterField.querySelector('#housing-price');

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
  if (ad.offer.features) {
    return Array.from(selectedFeatures).every((element) => !ad.offer.features.includes(element.value));
  }
  return false;
};

const getFilteredAds = (data) => {
  const selectedType = typeInput.value;
  const selectedRooms = roomsInput.value;
  const selectedGuests = guestsInput.value;
  const selectedPrice = priceInput.value;
  const selectedFeatures = Array.from(filterField.querySelectorAll('input[type="checkbox"]:checked'));

  const ads = [];

  data.forEach((ad) => {
    const hasMatch = typeFilter(ad, selectedType)
      && roomsFilter(ad, selectedRooms)
      && guestsFilter(ad, selectedGuests)
      && priceFilter(ad, selectedPrice)
      && featuresFilter(ad, selectedFeatures);

    if (hasMatch && ads.length < ADS_COUNT) {
      ads.push(ad);
    }

  });
  return ads;
};

const onFilterChange = (data) => {
  clearPins();
  const matchedAds = getFilteredAds(data);
  renderPins(matchedAds);
};

const filterAds = (data) => {
  filterField.addEventListener('change', debounce(() => onFilterChange(data), RERENDER_DELAY));
};

export { filterAds };
