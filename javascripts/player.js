  Sprite = function(opts) {
    this.$elem = opts.$elem;
    this.$world = opts.$world;
    this.sprite_path = null;
    this.file_extension = null;
    this.$sprite = null;
    this.name = opts.name;
    this.dimensions = { x: BLOCK_DIMENSIONS.x, y: BLOCK_DIMENSIONS.y };
    this.position = { x: 240, y: 300 };
    this.move_amount = 2;
    this.move_delay = 0;
    this.current_direction = 's';
    this.current_frame = 1;
    this.num_frames = 2;
    this.swap_timer_max = 40;
    this.swap_timer = 0;
    this.diag_adj = 1.3;
    this.directions = {
      n:  {
        axes: {
          x: { operator: null, divisor: 1 },
          y: { operator: '-',  divisor: 1 }
        }
      },
      e:  {
        axes: {
          x: { operator: '+',  divisor: 1 },
          y: { operator: null, divisor: 1 }
        }
      },
      s:  {
        axes: {
          x: { operator: null, divisor: 1 },
          y: { operator: '+',  divisor: 1 }
        }
      },
      w:  {
        axes: {
          x: { operator: '-',  divisor: 1 },
          y: { operator: null, divisor: 1 }
        }
      },
      nw: {
        axes: {
          x: { operator: '-',  divisor: this.diag_adj  },
          y: { operator: '-',  divisor: this.diag_adj  }
        }
      },
      ne: {
        axes: {
          x: { operator: '+',  divisor: 1 },
          y: { operator: '-',  divisor: this.diag_adj  }
        }
      },
      se: {
        axes: {
          x: { operator: '+',  divisor: 1 },
          y: { operator: '+',  divisor: 1 }
        }
      },
      sw: {
        axes: {
          x: { operator: '-',  divisor: this.diag_adj },
          y: { operator: '+',  divisor: 1 }
        }
      },
    };

    this.init = function() {
      self = this;
      this.sprite_path = './images/sprites/' + this.name + '/';
      this.file_extension = '.png';

      $block = $('<div class="block"></div>').appendTo(this.$world);
      this.$sprite = $('<div class="sprite _' + this.name + '"></div>').appendTo($block);
      $('<img src="' + this.image_path() + '" />').appendTo(this.$sprite);

      this.name = name;

      this.$sprite.width(this.dimensions.x);
      this.$sprite.height(this.dimensions.y);

      this.$sprite.css('left', this.position.x);
      this.$sprite.css('top', this.position.y);

      return this;

    };

    this.image_path = function() {
      return (this.sprite_path + this.current_direction + '_' + '00' + this.current_frame + '0' + this.file_extension);
    };

    this.swap_image = function() {
      this.current_frame = (this.current_frame > (this.num_frames - 1)) ? 1 : this.current_frame += 1;
      this.$sprite.find('img').attr('src',this.image_path());
    }

    this.move = function(opts) {
      this.current_direction = opts.direction;
      var dir = self.directions[this.current_direction];

      if (this.swap_timer >= this.swap_timer_max) {
        this.swap_image();
        this.swap_timer = 0;
      } else {
        this.swap_timer++;
      }

      var new_pos = { x: this.position.x, y: this.position.y }
      if (dir.axes.x.operator) {
        new_pos.x = parseInt(eval(new_pos.x + dir.axes.x.operator + (this.move_amount + '/' + String(dir.axes.x.divisor))));
      }
      if (dir.axes.y.operator) {
        new_pos.y = parseInt(eval(new_pos.y + dir.axes.y.operator + (this.move_amount + '/' + String(dir.axes.y.divisor))));
      }

      if (new_pos.x % this.distance_per_frame_swap == 0) { this.swap_image(); }
      if (new_pos.y & this.distance_per_frame_swap == 0) { this.swap_image(); }

      this.position.x = new_pos.x;
      this.position.y = new_pos.y;

      this.$sprite.css({ left: new_pos.x });
      this.$sprite.css({ top: new_pos.y });

    };

    this.attack = function(opts) {
      this.current_direction = opts.direction;
      var dir = self.directions[this.current_direction];
      console.log("attacking!");
    };

    this.use = function(opts) {
      this.current_direction = opts.direction;
      var dir = self.directions[this.current_direction];
      console.log("using something!");
    };

  };
