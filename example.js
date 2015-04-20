var Cohen = require('./cohens_kappa.js');

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
/*
var kL = Cohen.kappa(rev1, rev2, 5, 'linear');
var kS = Cohen.kappa(rev1, rev2, 5, 'squared');
var kU = Cohen.kappa(rev1, rev2, 5, 'none'); 

console.log("Linear weights: " + kL);   // Should be 0.028 (rounded to .03). 
console.log("Squared weights: " + kS);  // should be 0.167. 
console.log("Unweighted: " + kU);         // Should be -0.14
*/


var diagnoses1 = {
  A: 'malignant',
  B: 'benign',
  C: 'benign',
  D: 'malignant',
  E: 'malignant',
  F: 'malignant',
  G: 'benign',
  H: 'benign',
  I: 'benign',
  J: 'benign',
  K: 'malignant',
  L: 'benign',
  M: 'inconclusive',
  N: 'inconclusive',
  O: 'inconclusive',
  P: 'benign',
  Q: 'benign',
  R: 'malignant',
  S: 'benign',
  T: 'benign',
  U: 'malignant',
  V: 'malignant',
  W: 'inconclusive',
  X: 'benign',
  Y: 'inconclusive',
  Z: 'inconclusive',
  AA: 'benign',
  BB: 'benign',
  CC: 'malignant',
  DD: 'benign',
  EE: 'benign'
};

var diagnoses2 = {
  A: 'malignant',
  B: 'benign',
  C: 'benign',
  D: 'malignant',
  E: 'benign',
  F: 'malignant',
  G: 'benign',
  H: 'benign',
  I: 'malignant',
  J: 'benign',
  K: 'malignant',
  L: 'benign',
  M: 'inconclusive',
  N: 'inconclusive',
  O: 'inconclusive',
  P: 'benign',
  Q: 'benign',
  R: 'benign',
  S: 'benign',
  T: 'benign',
  U: 'malignant',
  V: 'benign',
  W: 'inconclusive',
  X: 'benign',
  Y: 'inconclusive',
  Z: 'inconclusive',
  AA: 'benign',
  BB: 'benign',
  CC: 'malignant',
  DD: 'benign',
  EE: 'benign'
};

var cats = ['benign', 'malignant', 'inconclusive'];
var numeric1 = Cohen.nominalConversion(cats, diagnoses1);
var numeric2 = Cohen.nominalConversion(cats, diagnoses2);

var kappDiagnose = Cohen.kappa(numeric1, numeric2, 3, 'none'); 

console.log("Converted nominal diagnoses, unweighted: " + kappDiagnose); // returns 0.78. Confirmed with kappaScript.R. 



// The following calls should fail. 

// Rater contains category not given to conversion. 
//var conversionFail = Cohen.nominalConversion(['benign'], diagnoses1); 

// Passing an invalid weight type to Cohen.kappa() 
// TODO







