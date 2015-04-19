// Assumption about format of data: 'reviewer1' and 'reviewer2' should each be JSON objects
// with reviewed items as keys and numerical ratings as values. Important that the ratings
// be typed as numbers. 

// Example reviewer1 ratings: {'Terminator': 5, 'Speed': 3, 'Aliens': 5, 'Point Break': 2, 'Red Dawn': 2, 'Blond on Blond': 1};
// Example reviewer2 ratings: {'Terminator': 4, 'Speed': 2, 'Aliens': 5, 'Point Break': 3, 'Red Dawn': 3, 'Blond on Blond': 4}



function Cohen() {
}; 

Cohen.prototype.linear = function(rater1, rater2, weights, numOfCategories) {
  
  // Builds size x size matrix filled with defaultValue.
  function squareMatrix(size, defaultValue) {
    var ary = new Array(size);
    for (var i = 0; i < size; i++) {
      ary[i] = [];
      for (var j = 0; j < size; j++) {
        ary[i].push(defaultValue);
      };
    };
    return ary;
  };

  var observed = squareMatrix(numOfCategories, 0);
  var hypothetical = squareMatrix(numOfCategories, 0);
  var weightMatrix = squareMatrix(numOfCategories, 0);
  
  
  // Build the matrix of observed agreements/disagreements
  for (var item in rater1) { 
    if (rater1.hasOwnProperty(item) && rater2.hasOwnProperty(item)) {
      var rater1Rating = rater1[item] - 1;  // Sub 1 to get location in 0-idx matrix.
      var rater2Rating = rater2[item] - 1;
      observed[rater1Rating][rater2Rating] += 1;
    };
  };

  // Returns count of a given rating (eg, 1 star) for reviewer1
  function rev1Totals(category, obs) {
    category = category - 1;
    var categoryTotal = obs[category].reduce(function(sum, n) { return sum + n; });
    return categoryTotal;
  };

  function rev2Totals(category, obs) {
    category = category - 1;
    var count = 0;
    for (var i = 0; i < obs.length; i++) {
      count += obs[i][category];
    };
    return count;
  };

  var totalRatings = 0;
  for (category = 1; category < numOfCategories; category++) {
    totalRatings += rev1Totals(category, observed);
  };
  
  

  // Build matrix of hypothetical agreements/disagreements by chance 
  for (var i = 0; i < observed.length; i++) {
    var row = observed[i];
    for (var j = 0; j < observed[i].length; j++) {
      hypothetical[i][j] = (rev1Totals(i+1, observed)/totalRatings) *
        (rev2Totals(j+1, observed)/totalRatings);
    };
  };
    
  

  // Build weight matrix. Remember that the categories must start at 1, not 0, to compute
  // distances accurately. So add 1 to indexes to get category numbers. (Ie, index
  // 0 is for the count of 1-star agreements.)  Defaults to linear weights. 
  for (i = 0; i < weightMatrix.length; i++) {
    for (j = 0; j < weightMatrix.length; j++) {
      if (weights == "squared") {
        weightMatrix[i][j] = Math.pow((Math.abs((i+1) - (j+1))), 2);
      } else {
        weightMatrix[i][j] = Math.abs((i+1) - (j+1));
      }
    };
  };
  
  // Computes Kappa from observed, hyp, and weights. 
  function kappa() {
    var numerator = 0;
    for (var i = 0; i<observed.length; i++) {
      for (var j = 0; j<observed.length; j++) {
        numerator += observed[i][j] * weightMatrix[i][j];
      };
    };
    var denominator = 0;
    for (var i = 0; i < hypothetical.length; i++) {
      for (var j = 0; j < hypothetical.length; j++) {
        denominator += hypothetical[i][j] * totalRatings * weightMatrix[i][j];
      };
    };
    return 1 - (numerator / denominator);
  };
        
  //return kappa, rounded to 2 dec places;
  return Math.round(kappa()*100) / 100; 

}



Cohen.prototype.unweighted = function(rev1, rev2, numOfCategories) {
  
  // Builds size x size matrix filled with defaultValue.
  function squareMatrix(size, defaultValue) {
    var ary = new Array(size);
    for (var i = 0; i < size; i++) {
      ary[i] = [];
      for (var j = 0; j < size; j++) {
        ary[i].push(defaultValue);
      };
    };
    return ary;
  };

  var observed = squareMatrix(numOfCategories, 0);
  var hypothetical = squareMatrix(numOfCategories, 0);
  var weightMatrix = squareMatrix(numOfCategories, 0);
  
  
  // Build the matrix of observed agreements/disagreements
  for (var item in rater1) { 
    if (rater1.hasOwnProperty(item) && rater2.hasOwnProperty(item)) {
      var rater1Rating = rater1[item] - 1;  // Sub 1 to get location in 0-idx matrix.
      var rater2Rating = rater2[item] - 1;
      observed[rater1Rating][rater2Rating] += 1;
    };
  };

  // Returns count of a given rating (eg, 1 star) for reviewer1
  function rev1Totals(category, obs) {
    category = category - 1;
    var categoryTotal = obs[category].reduce(function(sum, n) { return sum + n; });
    return categoryTotal;
  };

  function rev2Totals(category, obs) {
    category = category - 1;
    var count = 0;
    for (var i = 0; i < obs.length; i++) {
      count += obs[i][category];
    };
    return count;
  };

  var totalRatings = 0;
  for (category = 1; category < numOfCategories; category++) {
    totalRatings += rev1Totals(category, observed);
  };
  
  

  // Build matrix of hypothetical agreements/disagreements by chance. You don't
  // have to actually build the fill matrix here, just the diagonal.  
  for (var i = 0; i < observed.length; i++) {
      hypothetical[i][i] = (rev1Totals(i+1, observed)/totalRatings) *
        (rev2Totals(i+1, observed)/totalRatings);
  };

  // Count agreements. 
  function agree(matrix) {
    var agrees = 0
    for (var i = 0; i < obs.length; i++) {
      agrees += obs[i][i];
    }
    return agrees;
  };
    
  function kappa() {
    obsAgreement = agree(observed) / totalRatings;
    hypAgreement = agree(hypothetical);

    var k = (obsAgreement - hypAgreement) / (1 - hypAgreement);

    return k;
  };

  return Math.round(kappa()*100) / 100; 

};

Cohen.prototype.kappa = function(reviewer1, reviewer2, numOfCategories, weights) {
  if (Object.keys(user).length < 2 || Object.keys(reviewer).length < 2) {
    return new Error("Each rater must have >1 rating.");
  }

  if (weights == undefined) {
    return this.unweighted(reviewer1, reviewer2, numOfCategories);
  } else if (weights == "none") {
    return this.unweighted(reviewer1, reviewer2);
  } else if (weights == "linear" || weights == "squared") {
    return this.linear(reviewer1, reviewer2, weights, numOfCategories);
  } else {
    return new Error("Invalid weight param: Weight must be \'none\', \'linear\', or \'squared\'");
  }
   
}


// Convert nominal categories to numeric before computing kappa. 
Cohen.prototype.nominalConversion = function(nominalCats, nominalRatings) {
  var conversion = Object.create(null);
  for (var i = 0; i < nominalCats.length; i++) {
    var numeric = i + 1;
    conversion[nominalCats[i]] = numeric;
  };

  var numericRatings = Object.create(null);
  for (item in nominalRatings) {
    if (!conversion.hasOwnProperty(item)) {
      return new Error("Category array must contain all categories.");
    }

    var number = conversion[item];
    numericRatings[item] = number;
  };

  return numericRatings;
}
  

var c = new Cohen();
module.exports = c;


