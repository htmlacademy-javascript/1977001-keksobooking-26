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

const getRandomFloat = (min, max, digits) => {
  if (min === max) {
    return min.toFixed(digits);
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

getRandomInteger(5, 10);
getRandomFloat(1, 13, 3);
