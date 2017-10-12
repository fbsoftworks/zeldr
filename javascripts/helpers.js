Helpers = {
  get_image_path: function(name, direction, frame) {
    return (
      IMAGES[name].path + direction + '_' + '00' +
      frame + '0' + '.' + IMAGES[name].extension
    );
  },
};
