const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const adPhotoChooser = document.querySelector('.ad-form__input');
const adPhotoPreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

adPhotoChooser.addEventListener('change', () => {
  const file = adPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const adPhoto = document.createElement('img');
    adPhoto.style.height = '100%';
    adPhoto.src = URL.createObjectURL(file);
    adPhotoPreview.appendChild(adPhoto);
  }
});


const resetPreview = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  adPhotoPreview.innerHtml = '';
};

export { resetPreview };
