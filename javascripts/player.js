// Player is a type of Sprite
Player = function(opts) {
  this.sprite_image_set = PLAYER_SPRITE_IMAGE_SET;
  this.$container = opts.$container;
  this.sprite = null;

  this.init = function() {
    self = this;
    self.sprite = new Sprite({
      name: self.sprite_image_set,
      $container: self.$container
    });
    self.sprite.init();
  };

  this.centerize = function() {
    this.set_position(
      (this.$container.width() / 2) - (this.$elem.width() / 2),
      (this.$container.height() / 2) - (this.$elem.height() / 2)
    );
  };

  this.move = function(opts) {
    var self = this;
    self.current_direction = opts.direction;
    var dir = DIRECTIONS[self.current_direction];
  };


};
