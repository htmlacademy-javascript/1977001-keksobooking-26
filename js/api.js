const getData = async (onSuccess, onFail) => {

  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/keksobooking/data'
    );
    if (!response.ok) {
      throw new Error('Не удалось загрузить объявления');
    }
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body,
      },
    );
    if (!response.ok) {
      throw new Error('Не удалось отправить объявление. Попробуйте ещё раз.');
    }

    onSuccess();

  } catch (error) {
    onFail(error.message);
  }
};

export { getData, sendData };
