World = function(opts) {
  this.level_name = opts.level_name;
  this.dimensions = {
    in_blocks: { x: null, y: null },
    in_pixels: { x: null, y: null }
  };
  this.position = {
    in_blocks: { x: null, y: null },
    in_pixels: { x: null, y: null }
  };
  this.terrain = [];

  this.$container = opts.$container;
  this.$elem = null;

  this.init = function() {
    var self = this;

    self.$container.find('.world').remove();
    self.$elem = $('<div class="world"></div>').appendTo(self.$container);

    self.terrain = LEVELS[self.level_name].terrain;

    // set world width
    self.dimensions.in_blocks.x = self.terrain[0].length;
    self.dimensions.in_pixels.x = self.dimensions.in_blocks.x * BLOCKS.dimensions.x;

    // set world height
    self.dimensions.in_blocks.y = self.terrain.length;
    self.dimensions.in_pixels.y = self.dimensions.in_blocks.y * BLOCKS.dimensions.y;

    self.centerize();
    self.draw();

    return self;
  };

  this.centerize = function() {
    var self = this;
    adjust_x = -((self.dimensions.in_pixels.x / 2) -
      (self.$container.width() / 2));
    self.position.in_pixels.x = adjust_x;
    self.$elem.css({ left: (self.position.in_pixels.x + 'px') });

    adjust_y = -((self.dimensions.in_pixels.y / 2) -
      (self.$container.height() / 2));
    self.position.in_pixels.y = adjust_y;
    self.$elem.css({ top: (self.position.in_pixels.y + 'px') });
  };

  this.draw = function() {
    var self = this;
    self.$elem.width(self.dimensions.in_pixels.x + 'px');
    self.$elem.height(self.dimensions.in_pixels.y + 'px');
    $.each(self.terrain, function(i, y) {
      $.each(y.split(''), function(n, x) {
        block_data = BLOCKS.types[x];
        $block = $('<div class="block ' + block_data.ident + '"></div>')
          .appendTo(self.$elem);
        $('<img src="' + TERRAIN_PATH + block_data.image_name + '" />').appendTo($block);
      });
    });
  };

};
