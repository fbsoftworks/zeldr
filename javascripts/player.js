Player = function(opts) {
  this.sprite_image_set = PLAYER_SPRITE_IMAGE_SET;
  this.$container = opts.$container;
  this.world = opts.world;
  this.sprite = null;

  this.init = function() {
    self = this;
    self.sprite = new Sprite({
      name: self.sprite_image_set,
      $container: self.$container
    });
    self.sprite.init();
    self.centerize();
  };

  this.centerize = function() {
    self.sprite.$elem.css({
      left: (self.$container.width() / 2) - (this.sprite.$elem.width() / 2) + 'px'
    });
    self.sprite.$elem.css({
      top: (self.$container.height() / 2) - (this.sprite.$elem.height() / 2) + 'px'
    });
  };

  this.move = function(opts) {
    var self = this;
    self.current_direction = opts.direction;
    var dir = DIRECTIONS[self.current_direction];
    var new_pos = {
      x: self.world.position.in_pixels.x,
      y: self.world.position.in_pixels.y
    };

    if (self.sprite.swap_timer >= PLAYER_SWAP_TIMER_MAX) {
      self.sprite.swap_image(); self.sprite.swap_timer = 0;
    } else {
      self.sprite.swap_timer++;
    }

    if (dir.axes.x.operator) {
      inverse_operator = Helpers.get_inverse_operator(dir.axes.x.operator);
      new_pos.x = parseInt(eval(
        new_pos.x + inverse_operator + (
          (PLAYER_MOVE_AMOUNT) + '/' + String(dir.axes.x.divisor)
        )
      ));
    }
    if (dir.axes.y.operator) {
      inverse_operator = Helpers.get_inverse_operator(dir.axes.y.operator);
      new_pos.y = parseInt(eval(
        new_pos.y + inverse_operator + (
          (PLAYER_MOVE_AMOUNT) + '/' + String(dir.axes.y.divisor)
        )
      ));
    }

    self.world.position.in_pixels.x = new_pos.x;
    self.world.position.in_pixels.y = new_pos.y;

    self.world.$elem.css({ left: new_pos.x + 'px' });
    self.world.$elem.css({ top: new_pos.y + 'px' });

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
