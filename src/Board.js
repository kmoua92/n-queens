// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // fixme
      var counter = 0;

      for (var i = 0; i < rowIndex.length; i++) {
        if (rowIndex[i] === 1) {
          counter++;
        }
      }

      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function(board) {
      var board = board || this.rows(); // fixme
      var conflict = false;

      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(board[i])) {
          conflict = true;
        }
      }

      return conflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
       // fixme
      return this.hasAnyRowConflicts(colIndex);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.rows();
      var columns = [];
      // loop through board
        // board[i][0]
      for (var y = 0; y < board.length; y ++) {
        columns.push([]);
      }
      for (var i = 0; i < board.length; i++) {
        for (var x = 0; x < board[i].length; x++) {
          columns[x].push(board[i][x]);
        }
      }
    
      return this.hasAnyRowConflicts(columns);
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var coordinates = [];
      var coordinateGiven = [majorDiagonalColumnIndexAtFirstRow, 1];
      var conflict = false;

      for (var y = 1; y < board.length; y++) {
        for (var x = 0; x < board.length; x++) {
          if (board[y][x] === 1) { 
            coordinates.push([x, y]);
          }
        }
      }

      for (var i = 0; i < coordinates.length; i++) {
        var xDist = coordinateGiven[0] - coordinates[i][0];
        var yDist = coordinateGiven[1] - coordinates[i][1];
        if (xDist === yDist) {
          return conflict = true;
        }
      }

      return conflict; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      var coordinates = [];
      var conflict = false;

      for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board.length; x++) {
          if (board[y][x] === 1) { 
            coordinates.push([x, y]);
          }
        }
      }

      for (var i = 0; i < coordinates.length; i++) {
        for (var j = i + 1; j < coordinates.length; j++) {
          var xDist = coordinates[j][0] - coordinates[i][0];
          var yDist = coordinates[j][1] - coordinates[i][1];
          if (xDist === yDist) {
            return conflict = true;
          }
        }
      }

      return conflict; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var coordinates = [];
      var coordinateGiven = [minorDiagonalColumnIndexAtFirstRow, 1];
      var conflict = false;

      for (var y = 1; y < board.length; y++) {
        for (var x = 0; x < board.length; x++) {
          if (board[y][x] === 1) { 
            coordinates.push([x, y]);
          }
        }
      }

      for (var i = 0; i < coordinates.length; i++) {
        var xDist = coordinateGiven[0] - coordinates[i][0];
        var yDist = coordinateGiven[1] - coordinates[i][1];
        if (xDist + yDist === 0) {
          return conflict = true;
        }
      }

      return conflict; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();
      var coordinates = [];
      var conflict = false;
      
      for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board.length; x++) {
          if (board[y][x] === 1) { 
            coordinates.push([x, y]);
          }
        }
      }

      for (var i = 0; i < coordinates.length; i++) {
        for (var j = i + 1; j < coordinates.length; j++) {
          var xDist = coordinates[j][0] - coordinates[i][0];
          var yDist = coordinates[j][1] - coordinates[i][1];
          if (xDist + yDist === 0) {
            return conflict = true;
          }
        }
      }

      return conflict;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
