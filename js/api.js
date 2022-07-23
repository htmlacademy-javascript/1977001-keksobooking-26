const API_URL = 'https://26.javascript.pages.academy/keksobooking';
const ALERT_DOWNLOAD = 'Не удалось загрузить данные;';
const ALERT_UPLOAD = 'Не удалось отправить объявление. Попробуйте ещё раз.';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      `${API_URL  }/data`
    );

    if (!response.ok) {
      throw new Error(ALERT_DOWNLOAD);
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
      API_URL,
      {
        method: 'POST',
        body,
      },
    );

    if (!response.ok) {
      throw new Error(ALERT_UPLOAD);
    }

    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export { getData, sendData };
