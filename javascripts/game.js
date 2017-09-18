$(function() {


  BLOCK_DIMENSIONS = {
    x: 89,
    y: 89
  }

  Game = {
    $elem: null,
    $world: null,
    keys: {
      '38':        {   action: 'move', params: { direction: 'n'  }  },
      '39':        {   action: 'move', params: { direction: 'e'  }  },
      '40':        {   action: 'move', params: { direction: 's'  }  },
      '37':        {   action: 'move', params: { direction: 'w'  }  },
      '38_39':     {   action: 'move', params: { direction: 'ne' }  },
      '39_40':     {   action: 'move', params: { direction: 'se' }  },
      '37_40':     {   action: 'move', params: { direction: 'sw' }  },
      '37_38':     {   action: 'move', params: { direction: 'nw' }  },
      '32_38':     {   action: 'move_atk', params: { direction: 'n' } },
      '32_39':     {   action: 'move_atk', params: { direction: 'e' } },
      '32_40':     {   action: 'move_atk', params: { direction: 's' } },
      '32_37':     {   action: 'move_atk', params: { direction: 'w' } },
      '32_38_39':  {   action: 'move_atk', params: { direction: 'ne' }  },
      '32_39_40':  {   action: 'move_atk', params: { direction: 'se' }  },
      '32_37_40':  {   action: 'move_atk', params: { direction: 'sw' }  },
      '32_37_38':  {   action: 'move_atk', params: { direction: 'nw' }  },
      '38_69':     {   action: 'move_use', params: { direction: 'n'  }  },
      '39_69':     {   action: 'move_use', params: { direction: 'e'  }  },
      '40_69':     {   action: 'move_use', params: { direction: 's'  }  },
      '37_69':     {   action: 'move_use', params: { direction: 'w'  }  },
      '38_39_69':  {   action: 'move_use', params: { direction: 'ne' }  },
      '39_40_69':  {   action: 'move_use', params: { direction: 'se' }  },
      '37_40_69':  {   action: 'move_use', params: { direction: 'sw' }  },
      '37_38_69':  {   action: 'move_use', params: { direction: 'nw' }  },

      pressed: [],
    },

    player: null,

    register_keypress: function(key_code, status) {
      if (status) {
        if ($.inArray(key_code, this.keys.pressed) < 0) {
          this.keys.pressed.push(key_code);
        } else { return false; }
      } else {
        while (this.keys.pressed.indexOf(key_code) >= 0) {
          this.keys.pressed.splice(this.keys.pressed.indexOf(key_code), 1);
        }
      }
      return true;
    },

    init: function() {
      var self = this;
      self.keys = this.keys;

      this.$elem = $('app');

      this.$world = $('<div class="world"></div>').appendTo(this.$elem);

      self.player = new Sprite({
        $world: this.$world,
        name: 'test_pattern'
      });
      self.player.init();

      $(document).on('keydown', function(e) {
        e.preventDefault();
        self.register_keypress(e.keyCode, true);
        return true;
      });

      $(document).on('keyup', function(e) {
        e.preventDefault();
        self.register_keypress(e.keyCode, false);
        return true;
      });

      // game loop
      setInterval(function() {
        if (self.keys.pressed.length > 0) {
          combined_key = self.keys.pressed.sort().join('_');
          console.log(combined_key);
          if (self.keys[combined_key]) {
            if (self.keys[combined_key].action == 'move') {
              self.player.move(self.keys[combined_key].params);
            } else if (self.keys[combined_key].action == 'move_atk') {
              self.player.move(self.keys[combined_key].params);
              self.player.attack(self.keys[combined_key].params);
            } else if (self.keys[combined_key].action == 'move_use') {
              self.player.move(self.keys[combined_key].params);
              self.player.use(self.keys[combined_key].params);
            }
          }
        }
      }, self.player.move_delay);

    },

  }
  Game.init();










//  Worlds = {
//    0: {
//      dimensions: {
//
//      },
//      object_types: {
//        g1: {
//          name: 'grass',
//          image: 'grass_0010.png'
//
//        },
//        t1: {
//          name: 'a tree',
//          image: 'tree_0010.png'
//
//        }
//
//      },
//      terrain: [
//        ['g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1'],
//        ['g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1'],
//        ['g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1'],
//        ['g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1'],
//        ['g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1'],
//        ['g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1'],
//        ['g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1'],
//        ['g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1'],
//        ['g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1'],
//        ['g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1'],
//        ['g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1'],
//        ['g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1','g1'],
//
//      ],
//      objects: [
//        ['__','__','t1','__','__','t1','__','t1','__','__','t1','__','__','t1','__','t1'],
//        ['__','__','__','t1','__','__','__','__','__','__','__','t1','__','__','__','__'],
//        ['t1','__','__','t1','__','__','t1','__','t1','__','__','t1','__','__','t1','__'],
//        ['__','__','__','t1','__','__','__','__','__','__','__','t1','__','__','__','__'],
//        ['__','__','__','__','t1','__','__','__','__','__','__','__','t1','__','__','__'],
//        ['__','__','t1','__','__','__','__','__','__','__','t1','__','__','__','__','__'],
//        ['t1','__','__','__','__','__','t1','t1','t1','__','__','__','__','__','t1','t1'],
//        ['__','__','__','__','__','__','__','__','__','__','__','__','__','__','__','__'],
//        ['__','__','__','__','t1','__','__','__','__','__','__','__','t1','__','__','__'],
//        ['__','__','t1','__','__','__','__','__','__','__','t1','__','__','__','__','__'],
//        ['t1','__','__','__','__','__','t1','t1','t1','__','__','__','__','__','t1','t1'],
//        ['__','__','__','__','__','__','__','__','__','__','__','__','__','__','__','__'],
//
//      ]
//    }
//
//  }
//
//
//  App = {
//    $app: $('app'),
//    $viewport: null,
//    $world: null,
//    $player: null,
//
//    current_world: null,
//
//    keys: { left: 37, up: 38, right: 39, down: 40, pressed: [] },
//
//    player: {
//      move_amount: 2,
//      current_cell: {
//        x: null,
//        y: null
//      },
//      dimensions: { x: 89, y: 89, },
//      position: { x: 300, y: 300 }
//    },
//
//    is_collision: function(x,y) {
//      self = this;
//      adjusted_x = parseInt( (x / self.current_world.terrain[0].length * 89) );
//      return false;
//    },
//
//    register_keypress: function(key_code, status) {
//      self = this;
//
//      if (status) {
//        if ($.inArray(key_code, self.keys.pressed) < 0) {
//          self.keys.pressed.push(key_code);
//        } else {
//          return false;
//        }
//      } else {
//        while (self.keys.pressed.indexOf(key_code) >= 0) {
//          self.keys.pressed.splice(self.keys.pressed.indexOf(key_code), 1);
//        }
//      }
//      return true;
//
//    },
//
//    move: function($obj, opts) {
//      self = this;
//
//      new_position = {};
//      new_position.x = self.player.position.x;
//      new_position.y = self.player.position.y;
//
//      axis = (opts.direction == 'left' || opts.direction == 'right') ? 'x' : 'y';
//      operator = (opts.direction == 'left' || opts.direction == 'up') ? { value: 1, token: '+=' } : { value: -1, token: '-=' };
//      new_position[axis] = new_position[axis] + (operator.value * self.player.move_amount);
//      if (!self.is_collision(new_position.x, new_position.y)) {
//        self.player.position[axis] = new_position[axis];
//        params = (axis == 'x') ?
//          { left: self.player.position[axis] } :
//          { top: self.player.position[axis] };
//        $obj.css(params);
//        self.player.current_cell.x = self.player.position.x;
//        self.player.current_cell.y = self.player.position.y;
//        console.log(self.player.current_cell.x);
//      }
//      return true;
//
//    },
//
//    draw_world: function($elem, opts) {
//      self = this;
//
//      world = Worlds[opts.world_num];
//
//      $elem.width(world.terrain[0].length * 89);
//
//      terrain = world.terrain;
//      objects = world.objects;
//
//      num_blocks = {};
//      num_blocks.y = terrain.length - 1;
//      num_blocks.x = terrain[0].length;
//
//      for (y=0; y < num_blocks.y; y++) {
//        for (x=0; x < num_blocks.x; x++) {
//          terrain_type = terrain[y][x];
//          object_type = objects[y][x];
//          $block = $('<div class="block"></div>').appendTo($elem);
//          $terrain = $('<div class="terrain"><img src="./images/' + world.object_types[terrain_type].image + '" /></div>')
//            .appendTo($block);
//          if (object_type !== '__') {
//            $object = $('<div class="object"><img src="./images/' + world.object_types[object_type].image + '" /></div>')
//              .appendTo($block);
//          }
//        }
//        $('<div class="defloat"></div>').appendTo($elem);
//      }
//      return world;
//
//    },
//
//    init: function(world_num) {
//      self = this;
//
//      self.$viewport = $('<div class="viewport"></div>').appendTo(self.$app);
//      self.$world = $('<div class="world"></div>').appendTo(self.$viewport);
//      self.$player = $('<div class="player"></div>').appendTo(self.$world);
//
//      self.current_world = self.draw_world(self.$world, world_num);
//
//      self.player.width = self.$player.width();
//      self.player.height = self.$player.height();
//
//      $(document).on('keydown', function(e) {
//        e.preventDefault();
//        self.register_keypress(e.keyCode, true);
//        return true;
//      });
//
//      $(document).on('keyup', function(e) {
//        e.preventDefault();
//        self.register_keypress(e.keyCode, false);
//        return true;
//      });
//
//      setInterval(function() {
//        if ($.inArray(self.keys.left, self.keys.pressed))   { self.move(self.$player, { direction: 'left'  }); }
//        if ($.inArray(self.keys.up, self.keys.pressed))     { self.move(self.$player, { direction: 'up'    }); }
//        if ($.inArray(self.keys.right, self.keys.pressed))  { self.move(self.$player, { direction: 'right' }); }
//        if ($.inArray(self.keys.down, self.keys.pressed))   { self.move(self.$player, { direction: 'down'  }); }
//      }, 0);
//      return true;
//
//    },
//
//  }
//  App.init({ world_num: 0 });

})
