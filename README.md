# Cohen's Kappa JS (CKJS)

CKJS is a javascript module providing functions for computing Cohen's Kappa for inter-rater
reliability with two raters (if you have more than two raters, you might want
Fleiss' Kappa). For example, if you want to know the degree to which two people
agree/disagree in their Yelp ratings, or the degree to which two doctors agree/disagree in their
diagnoses, Cohen's kappa is a good way to quantify it. 

CKJS can compute kappa for both categorical ratings and ordinal ratings. When
ratings are ordinal (e.g., Yelp reviews star ratings), you can specify weights and
CKJS will return Cohen's Weighted Kappa. Both linear and quadratic (squared)
weights are supported. The advantage of weighted kappa is that it counts some
disagreements (you give a restaurant 5 stars, I give it 4) as less disagree-ing
than others (you give it 5 stars and I give it 1). 

## How to interpret kappa  
If you are unfamiliar with kappa statistics, this is a very brief overview of what
they are. In essence, kappa is computed by first calculating how much agreement
there is between two reviewers and how much agreement we would expect to find due
to chance (if, for example, each rater gave out just as many 5-star reviews as they
in fact do but assigned them at random).  Kappa is a ratio of the *excess*
agreement over that expected by chance to the amount of *dis*agreement expected by
chance. 

Kappa ranges from -1 to 1. Kappa of 0 means there is exactly as much agreement as
would be expected by chance (i.e., not much), and 1 is perfect agreement.  Negative
values indicate more disagreement than is expected by chance, and are somewhat
harder to interpret (generally, you will just want to treat them as indicating no
agreement). 

A scale that is often used for interpreting kappa is the following:

- 0<*k*<= 0.2: poor agreement. 
- 0.21<=*k*<=0.40: fair agreement. 
- 0.41<=*k*<=0.6: moderate agreement.
- 0.61<=*k*<=0.8: substantial agreement. 
- 0.81<=*k*<=0.99: almost perfect agreement.

(See Viera and Garrett (2005), 'Understanding interobserver agreement:
The kappa statistic', *Family Medicine* 37(5): 360-3, available [here][viera].)

[viera]:http://virtualhost.cs.columbia.edu/~julia/courses/CS6998/Interrater_agreement.Kappa_statistic.pdf

**Weights**. If your rating categories are categorical, you shouldn't use weighted
kappa (selected by passing `'none'` as the weight parameter to the `kappa` function). For example,
if the data are left-swipes and right-swipes given out by two Tinder users, you want
unweighted kappa (unrelated question: Are two people who have similar reactions to the same
profiles on Tinder more or less likely to like each other's profiles?).  

However, if your ratings categories are ordinal (e.g., star ratings on Yelp), then
you probably want to use weighted kappa. With unweighted kappa, reviewers either
agree or not, and that's it. With weighted, they can agree to different degrees (if
we both give 5 stars to a restaurant, that's perfect agreement; if you give 5 and I
give 4, we still mostly agree but we also disagree a little). One option is to use
linear weights (used by passing `'linear'` as the weight parameter to the `kappa`
function). Linear
weighting interprets the amount of disagreement between two ratings as a, well,
linear function of their distance (e.g., 5 stars versus 3 stars has twice as much
disagreement as 5 stars versus 4 stars).  

The other option is to use squared weights (by passing `'squared'` as the weight
parameter to the `kappa` function).  Squared weighting interprets the amount of
disagreement between two raters as a function of the square of their distance. So,
5 stars versus 3 stars has four times as much disagreement as 5 versus 4. 

-----------

## Usage 

In general, the pattern is this:

```javascript
var Cohen = require('cohens-kappa');
Cohen.kappa(firstReviewer, secondReviewer, numberOfCategories, weights);
```
Both `firstReviewer` and `secondReviewer` should be objects, with items/subjects as keys and
ratings as values. CKJS will ignore any items that are not rated by both reviewers. 

### Weighted Kappa With Numeric, ordinal ratings 
```javascript
# Rate some animals in terms of friendliness, 1-5 scale:
var reviewer1 = {
  'dog': 5,
  'cat': 4,
  'octopus': 3,
  'octocat': 4,
  'cobra': 2,
  'The Predator': 1
};

var reviewer2 = {
  'dog': 5,
  'cat': 3,
  'octopus': 4,
  'octocat': 4,
  'cobra': 2,
  'The Predator': 2
};
```
Note that in a real application, you would need far more ratings (generally >30)
for kappa to be statistically meaningful. 

**Find weighted kappa with linear weights:**

```javascript
var kappaL = Cohen.kappa(reviewer1, reviewer2, 5, 'linear');
console.log("Linear weights: " + kappaL);
//=> Linear weights: 0.64
```
**Weighted kappa with squared weights:**

```javascript
var kappaS = Cohen.kappa(reviewer1, reviewer2, 5, 'squared');
console.log("Squared weights: " + kappaS);
//=> Squared weights: 0.84
```
### Categorical, not ordinal, ratings 
```javascript
var reviewer3 = {
  'dog': 'friendly',
  'cat': 'friendly',
  'octopus': 'unknown',
  'octocat': 'friendly',
  'cobra': 'unfriendly',
  'The Predator': 'unfriendly'
};

var reviewer4 = {
  'dog': 'friendly',
  'cat': 'unknown',
  'octopus': 'friendly',
  'octocat': 'friendly',
  'cobra': 'unfriendly',
  'The Predator': 'unfriendly'
};
```
First, convert nominal categories to numeric. Then find kappa:

```javascript
var categories = ['unfriendly', 'unknown', 'friendly'];
var rev3numeric = Cohen.nominalConversion(categories, reviewer3);
var rev4numeric = Cohen.nominalConversion(categories, reviewer4);

var kappaUnweighted = Cohen.kappa(rev3numeric, rev4numeric, 3, 'none');
console.log("Unweighted kappa: " + kappaUnweighted);
//=> Unweighted kappa: 0.45 
```
---------------

## Testing 

If you have node and jasmine installed, you can run the tests by typing `jasmine`
from the `cohens-kappa` directory. 

The values for the tests are derived from computing *k* using R. You can find a an
R script for doing this in `spec/kappa_script.R`. This script uses the package
`irr` to compute *k* and the package `jsonlite` to convert JSON strings into
R-style data structures. Its usage is documented in comments. 

In addition, `example.js`, contains several example usages of CKJS along with the
output they should produce. You can simply run the code and confirm that it puts
out what it's supposed to.

## What CKJS doesn't do (yet)  

Right now, there is no functionality for computing *p*-values or confidence intervals
for *k*. However, these are planned features.  

There is also no support for custom weighting schemes. Linear, squared, and
unweighted should be enough for most purposes, although custom weights may be
supported in the future as well. 





