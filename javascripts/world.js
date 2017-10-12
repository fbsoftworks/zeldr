World = function(opts) {
  this.level_name = opts.level_name;
  this.dimensions = {
    in_blocks: { x: null, y: null },
    in_pixels: { x: null, y: null }
  };
  this.terrain = [];

  this.$container = opts.$container;

  this.init = function() {
    var self = this;

    $('.world').remove();
    self.$world = $('<div class="world"></div>').appendTo(self.$container);

    self.terrain = LEVELS[self.level_name].terrain;

    // set world width
    self.dimensions.in_blocks.x = self.terrain[0].length;
    self.dimensions.in_pixels.x = self.dimensions.in_blocks.x * BLOCKS.dimensions.x;

    // set world height
    self.dimensions.in_blocks.y = self.terrain.length;
    self.dimensions.in_pixels.y = self.dimensions.in_blocks.y * BLOCKS.dimensions.y;

    // centerize
    adjust_x = -((self.dimensions.in_pixels.x / 2) - (self.$container.width() / 2));
    self.$world.css('left', (adjust_x + 'px'));

    return self;

  };

  this.draw = function() {
    var self = this;
    self.$world.width(self.dimensions.in_pixels.x + 'px');
    self.$world.height(self.dimensions.in_pixels.y + 'px');
    $.each(self.terrain, function(i, y) {
      $.each(y.split(''), function(n, x) {
        block_data = BLOCKS.types[x];
        $block = $('<div class="block ' + block_data.ident + '"></div>')
          .appendTo(self.$world);
        $('<img src="' + TERRAIN_PATH + block_data.image_name + '" />').appendTo($block);
      });
    });
  };

};
