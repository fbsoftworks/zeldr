/*jshint esversion: 6 */
const DIAG_ADJ = PLAYER_MOVE_AMOUNT * 0.75;
const DIRECTIONS = {
  n:  {
    advance: function(pos) {
      return {
        position: {
          x: pos.x,
          y: pos.y + PLAYER_MOVE_AMOUNT
        },
        delta: {
          x: 0,
          y: PLAYER_MOVE_AMOUNT
        }
      };
    }
  },
  e:  {
    advance: function(pos) {
      return {
        position: {
          x: pos.x - PLAYER_MOVE_AMOUNT,
          y: pos.y
        },
        delta: {
          x: -PLAYER_MOVE_AMOUNT,
          y: 0
        }
      };
    }
  },
  s:  {
    advance: function(pos) {
      return {
        position: {
          x: pos.x,
          y: pos.y - PLAYER_MOVE_AMOUNT
        },
        delta: {
          x: 0,
          y: -PLAYER_MOVE_AMOUNT
        }
      };
    }
  },
  w:  {
    advance: function(pos) {
      return {
        position: {
          x: pos.x + PLAYER_MOVE_AMOUNT,
          y: pos.y
        },
        delta: {
          x: PLAYER_MOVE_AMOUNT,
          y: 0
        }
      };
    }
  },
  nw: {
    advance: function(pos) {
      return {
        position: {
          x: pos.x + PLAYER_MOVE_AMOUNT,
          y: pos.y + PLAYER_MOVE_AMOUNT
        },
        delta: {
          x: PLAYER_MOVE_AMOUNT,
          y: PLAYER_MOVE_AMOUNT
        }
      };
    }
  },
  ne: {
    advance: function(pos) {
      return {
        position: {
          x: pos.x - PLAYER_MOVE_AMOUNT,
          y: pos.y + PLAYER_MOVE_AMOUNT
        },
        delta: {
          x: -PLAYER_MOVE_AMOUNT,
          y: PLAYER_MOVE_AMOUNT
        }
      };
    }
  },
  se: {
    advance: function(pos) {
      return {
        position: {
          x: pos.x - PLAYER_MOVE_AMOUNT,
          y: pos.y - PLAYER_MOVE_AMOUNT
        },
        delta: {
          x: -PLAYER_MOVE_AMOUNT,
          y: -PLAYER_MOVE_AMOUNT
        }
      };
    }
  },
  sw: {
    advance: function(pos) {
      return {
        position: {
          x: pos.x - PLAYER_MOVE_AMOUNT,
          y: pos.y + PLAYER_MOVE_AMOUNT
        },
        delta: {
          x: -PLAYER_MOVE_AMOUNT,
          y: PLAYER_MOVE_AMOUNT
        }
      };
    }
  },
};
