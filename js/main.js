import { createAds } from './data.js';
import { renderCard } from './card.js';
import { disablePage, activateForm, activateFilters, initValidation } from './form.js';


const mapCanvas = document.querySelector('#map-canvas');
const ads = createAds();
const card = renderCard(ads[0]);

mapCanvas.appendChild(card);

disablePage();
activateFilters();
activateForm();
initValidation();
