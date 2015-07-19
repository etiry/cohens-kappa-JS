var Cohen = require('../../cohens_kappa.js');

var rev1 = {
  'Rambo': 5, 
  'Point Break': 3, 
  'Speed': 2, 
  'Aliens': 5,
  'Red Dawn': 3, 
  'Blond on Blond': 4,
  'Terminator': 3
};

var rev2 = {
  'Terminator': 5, 
  'Speed': 3, 
  'Aliens': 5, 
  'Point Break': 2, 
  'Red Dawn': 2, 
  'Blond on Blond': 1,
  'Rambo': 3
};

var rev3 = {
  'dog': 'friendly',
  'cat': 'friendly',
  'octopus': 'unknown',
  'octocat': 'friendly',
  'cobra': 'unfriendly',
  'The Predator': 'unfriendly'
};

describe('#kappa', function() {
  it('should compute kappa with linear weights', function() {
    expect(Cohen.kappa(rev1, rev2, 5, 'linear')).toBe(0.03); // rounded from 0.028.
  });

  it('should compute kappa with squared weights', function() {
    expect(Cohen.kappa(rev1, rev2, 5, 'squared')).toBe(0.17); // rounded from 0.167.
  });

  it('should compute unweighted kappa', function() {
    expect(Cohen.kappa(rev1, rev2, 5, 'none')).toBe(-0.14);     
  });

}); 

describe('#nominalConversion', function() {
  it('should convert nominal categories to numbers', function() {
    var categories = ['unfriendly', 'unknown', 'friendly'];
    var rev3numeric = Cohen.nominalConversion(categories, rev3);
    expect(typeof rev3numeric.octocat).toBe('number');
  });    
});
