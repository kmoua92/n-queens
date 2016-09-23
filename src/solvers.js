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


  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1; //fixme

  for (var i = n; i > 0; i--) {
    solutionCount *= i;
  }
  
  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  // var board.rows() =;
  var xValue = 1;
  var yValue = 0;
  var counter = 0;
  var solution = board.rows();
  // for (var i = 0; i < n; i++) {
  //   board.rows().push([]);
  //   for (var j = 0; j < n; j++) {
  //     board.rows()[i].push(0);
  //   }
  // }

  

  if (solution.length === 1) {
    solution[0][0] = 1;
    counter++;
  } else if (solution.length > 1) {
    while (solution[yValue][xValue] === 0) {
      solution[yValue][xValue] = 1;
      counter++;
      xValue += 2;
      yValue++;
    }

    for (var y = Math.floor(n / 2); y < solution.length; y++) {
      for (var x = 0; x < solution[y].length; x++) {
        solution[y][x] = 1;
        counter++;
        if (board.hasAnyQueensConflicts()) {
          solution[y][x] = 0;
          counter--;
        }
      }
    }
    // xValue = 1;
    // yValue = 0;

    // var slope = Math.floor(n / 2) > 1 ? Math.floor(n / 2) : 2;
    // while (yValue + slope < n) {
    //   solution[yValue + slope][xValue - 1] = 1;
    //   counter++;
    //   xValue += 2;
    //   yValue++;
    // }
  }

  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // if (counter === n) {
  //   return solution;
  // } else {
  //   return [];
  // }
  if (counter < n) {
    for (var y = 0; y < solution.length; y++) {
      for (var x = 0; x < solution.length; x++) {
        solution[y][x] = 0;
      }
    }
  }
  
  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  var rowBoard = board.rows();
  var rowIndex = 0;
  
  var findSolutions = function(currRow, counter) {
    counter = counter || 0;
    currRow = currRow || 0;
    
    for (var i = 0; i < rowBoard[currRow].length; i++) {
      rowBoard[currRow][i] = 1;

      if (board.hasAnyQueensConflicts()) {
        rowBoard[currRow][i] = 0;
        continue;
      } else {
        counter++;
      }

      if (counter === n) {
        solutionCount++;
        rowBoard[currRow][i] = 0;
        continue;
      } else {
        currRow++;
        findSolutions(currRow, counter);
        currRow--;
        counter--;
        rowBoard[currRow][i] = 0;
      }
    }
  };
  if (n > 0) {
    findSolutions();
  } else {
    return 1;
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
