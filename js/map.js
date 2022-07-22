import { activateForm, activateFilters } from './form.js';
import { renderCard } from './card.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const addressField = document.querySelector('#address');

const ZOOM_INDEX = 12;
const INIT_LAT = 35.68172;
const INIT_LNG = 139.75392;
const MAIN_PIN_SIZE = 52;
const PIN_SIZE = 40;
const MAP_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_ATTRIBUTE = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
});

const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [PIN_SIZE, PIN_SIZE],
  iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
});

const mainPinMarker = L.marker(
  {
    lat: INIT_LAT,
    lng: INIT_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const renderPin = (lat, lng, info) => {
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    }
  );
  marker
    .addTo(map)
    .bindPopup(info);
};

const renderPins = (pins) => {
  pins.forEach((pin) => renderPin(pin.location.lat, pin.location.lng, renderCard(pin)));
};

const setAddress = () => {
  addressField.value = `${INIT_LAT}, ${INIT_LNG}`;
};

const resetMainPinMarker = () => {
  mainPinMarker.setLatLng([INIT_LAT, INIT_LNG]);
};

const onMarkerMove = (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const initMap = () => {
  map.setView({
    lat: INIT_LAT,
    lng: INIT_LNG,
  }, ZOOM_INDEX);

  L.tileLayer(
    MAP_TILE,
    {
      attribution: MAP_ATTRIBUTE,
    },
  ).addTo(map);
  setAddress();
};

map.on('load', () => {
  activateForm();
  mainPinMarker.addTo(map);
  mainPinMarker.on('move', onMarkerMove);
  getData(
    (data) => {
      renderPins(data.slice(0, 10));
      activateFilters();
    },
    () => {
      showAlert('Не удалось загрузить данные');
    }
  );
});

export { initMap, renderPins, resetMainPinMarker, setAddress };
