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

var kL = Cohen.kappa(rev1, rev2, 5, 'linear');
var kS = Cohen.kappa(rev1, rev2, 5, 'squared');
var kU = Cohen.kappa(rev1, rev2, 5, 'none'); 

console.log("Linear weights: " + kL);
console.log("Squared weights: " + kS);
console.log("Unweighted: " + kU);



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
  L: 'benign'
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
  L: 'benign'
};

var numeric1 = Cohen.nominalConversion(['benign', 'malignant'], diagnoses1);
var numeric2 = Cohen.nominalConversion(['benign', 'malignant'], diagnoses2);

var kappDiagnose = Cohen.kappa(numeric1, numeric2, 2, 'none'); 

console.log("Converted nominal diagnoses, unweighted: " + kappDiagnose);



// The following calls should fail. 

// Rater contains category not given to conversion. 
//var conversionFail = Cohen.nominalConversion(['benign'], diagnoses1); 

// Passing an invalid weight type to Cohen.kappa() 
// TODO







