/*jshint esversion: 6 */
const DIAG_ADJ = 1.3;
const DIRECTIONS = {
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
      x: { operator: '-',  divisor: DIAG_ADJ },
      y: { operator: '-',  divisor: DIAG_ADJ }
    }
  },
  ne: {
    axes: {
      x: { operator: '+',  divisor: 1 },
      y: { operator: '-',  divisor: DIAG_ADJ }
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
      x: { operator: '-',  divisor: DIAG_ADJ },
      y: { operator: '+',  divisor: 1 }
    }
  },
};
