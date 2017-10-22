/*jshint esversion: 6 */
const DIAG_ADJ = PLAYER_MOVE_AMOUNT * 0.75;
const DIRECTIONS = {
  n:  {
    advance: function(pos) {
      pos.y += PLAYER_MOVE_AMOUNT;
      return pos;
    }
  },
  e:  {
    advance: function(pos) {
      pos.x -= PLAYER_MOVE_AMOUNT;
      return pos;
    }
  },
  s:  {
    advance: function(pos) {
      pos.y -= PLAYER_MOVE_AMOUNT;
      return pos;
    }
  },
  w:  {
    advance: function(pos) {
      pos.x += PLAYER_MOVE_AMOUNT;
      return pos;
    }
  },
  nw: {
    advance: function(pos) {
      pos.x += PLAYER_MOVE_AMOUNT / DIAG_ADJ;
      pos.y += PLAYER_MOVE_AMOUNT / DIAG_ADJ;
      return pos;
    }
  },
  ne: {
    advance: function(pos) {
      pos.x -= PLAYER_MOVE_AMOUNT / DIAG_ADJ;
      pos.y += PLAYER_MOVE_AMOUNT / DIAG_ADJ;
      return pos;
    }
  },
  se: {
    advance: function(pos) {
      pos.x -= PLAYER_MOVE_AMOUNT / DIAG_ADJ;
      pos.y -= PLAYER_MOVE_AMOUNT / DIAG_ADJ;
      return pos;
    }
  },
  sw: {
    advance: function(pos) {
      pos.x += PLAYER_MOVE_AMOUNT / DIAG_ADJ;
      pos.y -= PLAYER_MOVE_AMOUNT / DIAG_ADJ;
      return pos;
    }
  },
};
