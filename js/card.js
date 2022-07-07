import { createAds } from './data.js';

const typeKey = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const mapCanvas = document.querySelector('#map-canvas');

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarAds = createAds(1);

const similarAdsFragment = document.createDocumentFragment();

similarAds.forEach(({ author, offer }) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--sum').textContent = `${offer.price} `;
  cardElement.querySelector('.popup__type').textContent = typeKey[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей.`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;

  const description = cardElement.querySelector('.popup__description');
  if (offer.description) {
    description.textContent = offer.description;
  }
  else {
    description.classList.add('hidden');
  }

  const adFeatures = offer.features;
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featureList = featuresContainer.querySelectorAll('.popup__feature');

  featureList.forEach((featureListItem) => {
    const isNecessary = adFeatures.some(
      (adFeature) => featureListItem.classList.contains(`popup__feature--${adFeature}`),
    );
    if (isNecessary) {
      featureListItem.remove();
    }
  });

  cardElement.querySelector('.popup__photo').src = offer.photos[0];
  if (offer.photos.length > 1) {

    for (let i = 1; i < offer.photos.length; i++) {
      const photo = cardElement.querySelector('.popup__photo').cloneNode(true);
      photo.src = offer.photos[i];
      cardElement.querySelector('.popup__photos').appendChild(photo);
    }

  }
  similarAdsFragment.appendChild(cardElement);
});

mapCanvas.appendChild(similarAdsFragment);
