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

    self.centerize();
    self.set_position(self.position.in_pixels.x, self.position.in_pixels.y);

    return self;
  };

  this.centerize = function() {
    this.set_position(
      (this.$container.width() / 2) - (this.$elem.width() / 2),
      (this.$container.height() / 2) - (this.$elem.height() / 2)
    );
  };

  this.set_position = function(x, y) {
    this.position.in_pixels.x = x;
    this.position.in_pixels.y = y;
    this.$elem.css('left', x);
    this.$elem.css('top', y);
  };

  this.swap_image = function() {
    this.current_frame = (this.current_frame > (PLAYER_NUM_FRAMES - 1)) ? 1 : this.current_frame += 1;
    this.$elem.find('img').attr('src', Helpers.get_image_path(this.name, this.current_direction, this.current_frame));
  };

  this.move = function(opts) {
    var self = this;
    self.current_direction = opts.direction;
    var dir = DIRECTIONS[self.current_direction];
    var new_pos = {
      x: self.position.in_pixels.x,
      y: self.position.in_pixels.y
    };

    if (this.swap_timer >= PLAYER_SWAP_TIMER_MAX) {
      self.swap_image(); self.swap_timer = 0;
    } else {
      self.swap_timer++;
    }

    if (dir.axes.x.operator) {
      new_pos.x = parseInt(eval(
        new_pos.x + dir.axes.x.operator + (
          PLAYER_MOVE_AMOUNT + '/' + String(dir.axes.x.divisor)
        )
      ));
    }
    if (dir.axes.y.operator) {
      new_pos.y = parseInt(eval(
        new_pos.y + dir.axes.y.operator + (
          PLAYER_MOVE_AMOUNT + '/' + String(dir.axes.y.divisor)
        )
      ));
    }

    if (new_pos.x % self.distance_per_frame_swap == 0) { self.swap_image(); }
    if (new_pos.y & self.distance_per_frame_swap == 0) { self.swap_image(); }

    self.position.in_pixels.x = new_pos.x;
    self.position.in_pixels.y = new_pos.y;

    self.$elem.css({ left: new_pos.x });
    self.$elem.css({ top: new_pos.y });
  };

  this.attack = function(opts) {
    this.current_direction = opts.direction;
    var dir = DIRECTIONS[this.current_direction];
    console.log("attacking!");
  };

  this.use = function(opts) {
    this.current_direction = opts.direction;
    var dir = DIRECTIONS[this.current_direction];
    console.log("using something!");
  };

};
