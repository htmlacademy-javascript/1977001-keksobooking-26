import {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomList} from './util.js';

//Константы
const LAT_FROM = 35.65000;
const LAT_TO = 35.70000;
const LNG_FROM = 139.70000;
const LNG_TO = 139.80000;

//Варианты заголовка
const TITLES = [
  'Отличный вариант в центре города',
  'Достопримечательности в пешей доступности',
  'Идеально для семейного отдыха',
  'Жилье для осознанных путешествий',
  'Роскошный вид на закат',
  'Идеально для молодежи',
  'Ночлег и завтрак',
  'Спокойное место для тихого отдыха',
  'Можно с домашними животными',
  'Комфортные условия для лиц с ограниченными возможностями',
];

//Типы размещения
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

//Время заезда
const CHECKING = [
  '12:00',
  '13:00',
  '14:00',
];

//Удобства
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

//Варианты описания
const DESCRIPTION = [
  'В окрестностях можно заняться пешим туризмом, лыжным спортом и велоспортом.',
  'На территории обустроена детская игровая площадка.',
  'К услугам гостей фитнес-центр, открытый бассейн и круглосуточная стойка регистрации.',
  'Осуществляется доставка еды и напитков в номер.',
  'К услугам гостей мини-бар и собственная терраса',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

//Создание объявления
const createAd = (id = getRandomInteger(1, 10)) => {
  const lat = getRandomFloat(LAT_FROM, LAT_TO, 5);
  const lng = getRandomFloat(LNG_FROM, LNG_TO, 5);

  const formatted = id > 9 ? id : `0${id}`;

  return {
    author: {
      avatar: `img/avatars/user${formatted}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomInteger(0, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 100),
      guests: getRandomInteger(1, 10),
      checkin: getRandomArrayElement(CHECKING),
      checkout: getRandomArrayElement(CHECKING),
      features: getRandomList(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomList(PHOTOS),
    },
    location: {
      lat,
      lng,
    },
  };
};

export {createAd};
