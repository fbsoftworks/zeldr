Sprite = function(opts) {
  this.name = opts.name;
  this.dimensions = {
    in_blocks: { x: 1, y: 1 },
    in_pixels: { x: BLOCKS.dimensions.x, y: BLOCKS.dimensions.y }
  };
  this.position = {
    in_pixels: { x: null, y: null }
  };
  this.current_direction = 's';
  this.current_frame = 1;
  this.current_image_path = null;
  this.swap_timer = 0;
  this.directions = DIRECTIONS;

  this.$container = opts.$container;
  this.$elem = null;

  this.init = function() {
    this.preload_images();
    this.set_direction(this.current_direction);

    this.$elem = $('<div class="sprite _' + this.name + '"></div>').appendTo(this.$container);
    $('<img src="' + this.current_image_path + '" />').appendTo(this.$elem);

    // set sprite dimensions
    this.$elem.width(this.dimensions.in_pixels.x);
    this.$elem.height(this.dimensions.in_pixels.y);

    return this;
  };

  this.set_direction = function(direction) {
    this.current_direction = direction;
    this.current_image_path = Helpers.get_image_path(this.name, this.current_direction, this.current_frame);
  };

  this.swap_image = function() {
    this.current_frame = (this.current_frame > (PLAYER_NUM_FRAMES - 1)) ? 1 : this.current_frame += 1;
    this.$elem.find('img').attr('src', Helpers.get_image_path(this.name, this.current_direction, this.current_frame));
  };

  this.set_initial_position = function(origin, location) {
    centerpoint = {
      x: (location.left - origin.x) + (this.dimensions.in_pixels.x / 2),
      y: (location.top - origin.y) + (this.dimensions.in_pixels.y / 2)
    };
    this.position.in_pixels.x = centerpoint.x;
    this.position.in_pixels.y = centerpoint.y;
  };

  this.get_block = function(centerpoint) {
    var self = this;
    return {
      x: Math.floor(centerpoint.x / BLOCKS.dimensions.x),
      y: Math.ceil(centerpoint.y / BLOCKS.dimensions.y)
    };
  };

  this.preload_images = function() {
    var self = this;
    n = 0;
    $.each(Object.keys(DIRECTIONS), function(i, direction) {
      for(frame = 1; frame <= PLAYER_NUM_FRAMES; frame++) {
        PRELOADED_IMAGES[n] = new Image();
        PRELOADED_IMAGES[n].src = Helpers.get_image_path(self.name, direction, frame);
        n++;
      }
    });
  };
};
