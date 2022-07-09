
const typeDictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderCard = (similarAd) => {

  const { author, offer } = similarAd;

  const cardElement = cardTemplate.cloneNode(true);

  const description = cardElement.querySelector('.popup__description');
  const adFeatures = offer.features;
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featureList = featuresContainer.querySelectorAll('.popup__feature');
  const adPhotos = cardElement.querySelector('.popup__photos');
  const adPhoto = cardElement.querySelector('.popup__photo').cloneNode(true);
  const adPrice = cardElement.querySelector('.popup__text--price');

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  adPrice.innerHTML = '';
  adPrice.insertAdjacentHTML('afterBegin', `${offer.price} <span>₽/ночь</span>`);

  cardElement.querySelector('.popup__type').textContent = typeDictionary[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей.`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;

  if (offer.description) {
    description.textContent = offer.description;
  } else {
    description.classList.add('hidden');
  }

  if (featureList.length > 0) {
    featureList.forEach((featureListItem) => {
      const isNecessary = adFeatures.some(
        (adFeature) => featureListItem.classList.contains(`popup__feature--${adFeature}`),
      );
      if (isNecessary) {
        featureListItem.remove();
      }
    });
  } else {
    featuresContainer.classList.add('hidden');
  }

  if (offer.photos.length > 0) {
    adPhotos.innerHTML = '';

    offer.photos.forEach((photo) => {
      const newPhoto = adPhoto.cloneNode(true);
      newPhoto.src = photo;
      adPhotos.appendChild(newPhoto);
    });

  } else {
    adPhotos.classList.add('hidden');
  }

  return cardElement;
};

export { renderCard };
