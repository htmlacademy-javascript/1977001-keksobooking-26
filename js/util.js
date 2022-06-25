//Случайное целое число
const getRandomInteger = (min, max) => {
  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  if (min < 0) {
    min = 0;
  }
  const num = Math.round(Math.random() * (max - min) + min);
  return num;
};

//Случайное число с плавающей точкой
const getRandomFloat = (min, max, digits) => {
  if (min === max) {
    return +min.toFixed(digits);
  }
  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  if (min < 0) {
    min = 0;
  }
  const num = Math.random() * (max - min) + min;
  return +num.toFixed(digits);
};

//Случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Массив случайной длины
const getRandomList = (elements) => {
  const randomList = [];
  const count = getRandomInteger(1, elements.length);

  for (let i = 0; i < count; i++) {
    const random = getRandomArrayElement(elements);
    if (!randomList.includes(random)) {
      randomList.push(random);
    }
  }

  return randomList;
};

export {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomList};
