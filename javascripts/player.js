Player = function(opts) {
  this.sprite_image_set = PLAYER_SPRITE_IMAGE_SET;
  this.$container = opts.$container;
  this.world = opts.world;
  this.sprite = null;

  this.init = function() {
    this.sprite = new Sprite({
      name: this.sprite_image_set,
      $container: this.$container
    });
    this.sprite.init();
    this.centerize();
  };

  this.centerize = function() {
    this.sprite.$elem.css({
      left: (this.$container.width() / 2) - (this.sprite.$elem.width() / 2) + 'px'
    });
    this.sprite.$elem.css({
      top: (this.$container.height() / 2) - (this.sprite.$elem.height() / 2) + 'px'
    });
  };

  this.move = function(opts) {
    if (this.current_direction != opts.direction) {
      this.current_direction = opts.direction;
      this.sprite.set_direction(this.current_direction);
    }
    var new_pos = DIRECTIONS[this.current_direction].advance(this.world.position.in_pixels);

    if (this.sprite.swap_timer >= PLAYER_SWAP_TIMER_MAX) {
      this.sprite.swap_image(); this.sprite.swap_timer = 0;
    } else {
      this.sprite.swap_timer++;
    }

    // TODO: check for collisions and such before updating real position
    console.log(this.sprite.get_current_block());

    this.world.position.in_pixels = new_pos;

    this.world.$elem.css({
      left: new_pos.x + 'px',
      top: new_pos.y + 'px'
    });
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
