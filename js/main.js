import { createAds } from './data.js';
import { renderCard } from './card.js';
import { disablePage, activateForm, activateFilters, initValidation } from './form.js';
import { isMapLoaded, initMap, makePins } from './map.js';

disablePage();
initMap();

if (isMapLoaded) {
  activateFilters();
  activateForm();
  initValidation();
}

const ads = createAds();
ads.forEach((ad) => {
  makePins(ad.location.lat, ad.location.lng, renderCard(ad));
});
