Helpers = {
  get_image_path: function(name, direction, frame) {
    return (
      IMAGES[name].path + direction + '_' + '00' +
      frame + '0' + '.' + IMAGES[name].extension
    );
  },

  get_inverse_operator: function(operator) {
    if (operator == '-') { return '+'; }
    if (operator == '+') { return '-'; }
    return null;
  }
};
