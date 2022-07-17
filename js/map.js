const ZOOM_INDEX = 12;
const INIT_LAT = 35.68172;
const INIT_LNG = 139.75392;

const map = L.map('map-canvas')
  .setView({
    lat: INIT_LAT,
    lng: INIT_LNG,
  }, ZOOM_INDEX);

const initMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const isMapLoaded = map.on('load', () => true);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: 35.65749,
    lng: 139.71127,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const makePins = (lat, lng, info) => {
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

export { isMapLoaded, initMap, mainPinMarker, makePins };
