/*jshint esversion: 6 */
const BLOCKS = {
  dimensions: {
    x: 89,
    y: 89
  },
  types: {
    '.': {
      name: 'ground',
      ident: 'G0010',
      feature: 'ground:basic',
      image_name: 'grass_0010.png',
      is_walkable: true
    },
    'w': {
      name: 'wall',
      ident: 'W0010',
      feature: 'wall:basic',
      image_name: 'tree_0010.png',
      is_walkable: false
    }
  }
};
