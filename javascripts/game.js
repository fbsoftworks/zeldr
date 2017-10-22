Game = {
  player: null,
  level_name: '0000',
  keys: $.extend(KEYS, { pressed: [] }),

  $elem: null,
  $world: null,

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

  init: function(level_name) {
    var self = this;
    self.$elem = $('app');

    // set viewport dimensions
    self.$elem.width($(window).innerWidth());
    self.$elem.height($(window).innerHeight());

    // init world
    self.world  = new World({
      level_name: self.level_name,
      $container: self.$elem
    });
    self.world.init();

    // init player
    self.player = new Sprite({
      is_player: true,
      name: PLAYER_SPRITE_SHEET_NAME,
      $container: self.world.$elem
    })
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
          } else if (self.keys[combined_key].action == 'move_use') {
            self.player.use(self.keys[combined_key].params);
          }
        }
      }
    }, self.PLAYER_MOVE_DELAY);

  },
};

$(function() {
  Game.init();
});
