const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('.ad-form-header__input');
const avatarPreviewField = document.querySelector('.ad-form-header__preview img');
const photoInput = document.querySelector('.ad-form__input');
const photoPreviewField = document.querySelector('.ad-form__photo');

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreviewField.src = URL.createObjectURL(file);
  }
});

photoInput.addEventListener('change', () => {
  const file = photoInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const adPhoto = document.createElement('img');
    adPhoto.style.height = '100%';
    adPhoto.src = URL.createObjectURL(file);
    photoPreviewField.appendChild(adPhoto);
  }
});

const resetPreview = () => {
  avatarPreviewField.src = 'img/muffin-grey.svg';
  photoPreviewField.innerHTML = '';
};

export { resetPreview };
