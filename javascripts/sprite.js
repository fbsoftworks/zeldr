Sprite = function(opts) {
  this.is_player = opts.is_player || false;
  this.dimensions = {
    in_blocks: { x: 1, y: 1 },
    in_pixels: { x: BLOCKS.dimensions.x, y: BLOCKS.dimensions.y }
  };
  this.file_extension = null;
  this.name = opts.name;
  this.position = { x: null, y: null };
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

    // center player
    self.position.x = (self.$container.width() / 2) - (self.$elem.width() / 2);
    self.position.y = (self.$container.height() / 2) - (self.$elem.height() / 2);

    // set sprite position
    self.$elem.css('left', self.position.x);
    self.$elem.css('top', self.position.y);

    return self;
  };

  this.swap_image = function() {
    this.current_frame = (this.current_frame > (PLAYER_NUM_FRAMES - 1)) ? 1 : this.current_frame += 1;
    this.$elem.find('img').attr('src', Helpers.get_image_path(this.name, this.current_direction, this.current_frame));
  };

  this.move = function(opts) {
    this.current_direction = opts.direction;
    var dir = DIRECTIONS[this.current_direction];
    var new_pos = { x: this.position.x, y: this.position.y };

    if (this.swap_timer >= PLAYER_SWAP_TIMER_MAX) {
      this.swap_image(); this.swap_timer = 0;
    } else {
      this.swap_timer++;
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

    if (new_pos.x % this.distance_per_frame_swap == 0) { this.swap_image(); }
    if (new_pos.y & this.distance_per_frame_swap == 0) { this.swap_image(); }

    this.position.x = new_pos.x;
    this.position.y = new_pos.y;

    if (self.is_player) {
      this.$container.css({ right: new_pos.x });
      this.$container.css({ bottom: new_pos.y });
    } else {
      // move elemnt vs. moving the world around the element
    }
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
