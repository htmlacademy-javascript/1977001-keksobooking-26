import { createAds } from './data.js';
import { renderCard } from './card.js';
import { disableForm, activeForm } from './form.js';

const mapCanvas = document.querySelector('#map-canvas');
const ads = createAds();
const card = renderCard(ads[0]);

mapCanvas.appendChild(card);

disableForm();
activeForm();
