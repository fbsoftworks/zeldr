Sprite = function(opts) {
  this.is_player = opts.is_player || false;
  this.dimensions = {
    in_blocks: { x: 1, y: 1 },
    in_pixels: { x: BLOCKS.dimensions.x, y: BLOCKS.dimensions.y }
  };
  this.file_extension = null;
  this.name = opts.name;
  this.position = {
    in_blocks: { x: null, y: null },
    in_pixels: { x: null, y: null }
  };
  this.current_direction = 's';
  this.current_frame = 1;
  this.swap_timer = 0;
  this.directions = DIRECTIONS;

  this.$container = opts.$container;
  this.$elem = null;

  this.init = function() {
    var self = this;
    self.$elem = $('<div class="sprite _' + self.name + '"></div>').appendTo(self.$container);
    $('<img src="' + Helpers.get_image_path(self.name, self.current_direction, self.current_frame) + '" />').appendTo(self.$elem);

    // set sprite dimensions
    self.$elem.width(this.dimensions.in_pixels.x);
    self.$elem.height(this.dimensions.in_pixels.y);

    return self;
  };

  this.set_position = function(x, y, $context) {
    $context = $context || this.$container;
    this.position.in_pixels.x = x;
    this.position.in_pixels.y = y;
    $context.css('left', x);
    $context.css('top', y);
  };

  this.swap_image = function() {
    this.current_frame = (this.current_frame > (PLAYER_NUM_FRAMES - 1)) ? 1 : this.current_frame += 1;
    this.$elem.find('img').attr('src', Helpers.get_image_path(this.name, this.current_direction, this.current_frame));
  };

};
