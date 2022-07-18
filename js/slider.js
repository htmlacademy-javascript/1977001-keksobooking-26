const addSlider = (slider, field) => {

  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 0,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  slider.noUiSlider.on('update', () => {
    field.value = slider.noUiSlider.get();
  });

  const onFieldChange = (evt) => {
    slider.noUiSlider.set(parseInt(evt.target.value, 10));
  };

  field.addEventListener('change', onFieldChange);
};

export {addSlider};
