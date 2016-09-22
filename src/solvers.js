/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];  //fixme

  for (var i = 0; i < n; i++) {
    solution.push([]);
    for (var j = 0; j < n; j++) {
      solution[i].push(0);
    }
  }

  var counter = 0;

  for (var k = 0; k < solution.length; k++) {
    solution[k][counter] = 1;
    counter++;
  }


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1; //fixme

  for (var i = n; i > 0; i--) {
    solutionCount *= i;
  }
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];  //fixme
  var xValue = 1;
  var yValue = 0;
  for (var i = 0; i < n; i++) {
    solution.push([]);
    for (var j = 0; j < n; j++) {
      solution[i].push(0);
    }
  }

  if (solution.length === 1) {
    solution[0].push(1);
  } else if (solution.length > 1) {
    while (solution[yValue][xValue] === 0) {
      solution[yValue][xValue] = 1;
      
      xValue += 2;
      yValue++;
    }

    xValue = 1;
    yValue = 0;

    while (solution[yValue + 2][xValue - 1] === 0) {
      solution[yValue + 2][xValue - 1] = 1;

      xValue += 2;
      yValue++;
    }
  }
  // make an array of nxn, filled with 0
  // if array1.length > 1
    // place queen at 1,0
  // else
    // set first value = array1.length || 2

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
