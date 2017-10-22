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
    this.sprite.set_initial_position(this.world.position.in_pixels, this.sprite.$elem.position());
  };

  this.move = function(opts) {
    // TODO: refactore this!
    var self = this;
    if (this.current_direction != opts.direction) {
      // player has changed directions
      this.current_direction = opts.direction;
      this.sprite.set_direction(this.current_direction);
    }

    movement = DIRECTIONS[this.current_direction]
      .advance(this.world.position.in_pixels);
    var delta = movement.delta;
    var new_sprite_pos = {
      x: this.sprite.position.in_pixels.x - (-delta.x),
      y: this.sprite.position.in_pixels.y - (-delta.y)
    };

    if (this.sprite.swap_timer >= PLAYER_SWAP_TIMER_MAX) {
      this.sprite.swap_image(); this.sprite.swap_timer = 0;
    } else { this.sprite.swap_timer++; }

    if (!this.is_collision(new_sprite_pos)) {
      // player can walk here
      this.world.position.in_pixels = movement.position;
      this.sprite.position.in_pixels.x = new_sprite_pos.x;
      this.sprite.position.in_pixels.y = new_sprite_pos.y;
      this.world.$elem.css({
        left: self.world.position.in_pixels.x + 'px',
        top: self.world.position.in_pixels.y + 'px'
      });
    }
  };

  this.is_collision = function(position) {
    b = this.sprite.get_block(position);
    terrain = BLOCKS.types[this.world.terrain[b.y][b.x]];
    console.log(terrain);
    return (terrain.is_walkable ? false : true);
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
