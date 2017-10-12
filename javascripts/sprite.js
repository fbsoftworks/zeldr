Sprite = function(opts) {
  this.is_player = opts.is_player || false;
  this.dimensions = { x: BLOCKS.dimensions.x, y: BLOCKS.dimensions.y };
  this.file_extension = null;
  this.name = opts.name;
  this.position = { x: 240, y: 300 };
  this.current_direction = 's';
  this.current_frame = 1;
  this.swap_timer = 0;
  this.directions = DIRECTIONS;

  this.$elem = opts.$elem;
  this.$world = opts.$world;
  this.$sprite = null;

  this.init = function() {
    var self = this;
    self.$sprite = $('<div class="sprite _' + self.name + '"></div>').appendTo(self.$world);
    $('<img src="' + Helpers.get_image_path(self.name, self.current_direction, self.current_frame) + '" />').appendTo(self.$sprite);

    // set sprite dimensions
    self.$sprite.width(this.dimensions.x);
    self.$sprite.height(this.dimensions.y);

    // set sprite position
    self.$sprite.css('left', this.position.x);
    self.$sprite.css('top', this.position.y);

    return self;

  };

  this.swap_image = function() {
    this.current_frame = (this.current_frame > (this.num_frames - 1)) ? 1 : this.current_frame += 1;
    this.$sprite.find('img').attr('src', Helpers.get_image_path(this.name, self.current_direction, this.current_frame));
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

    this.$level.css({ right: new_pos.x });
    this.$level.css({ bottom: new_pos.y });

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
