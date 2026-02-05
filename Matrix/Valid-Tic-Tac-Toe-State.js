/*

Given a Tic-Tac-Toe board as a string array board, return true if and only if it is possible to reach this board position during the course of a valid tic-tac-toe game.

The board is a 3 x 3 array that consists of characters ' ', 'X', and 'O'. The ' ' character represents an empty square.

Here are the rules of Tic-Tac-Toe:

Players take turns placing characters into empty squares ' '.
The first player always places 'X' characters, while the second player always places 'O' characters.
'X' and 'O' characters are always placed into empty squares, never filled ones.
The game ends when there are three of the same (non-empty) character filling any row, column, or diagonal.
The game also ends if all squares are non-empty.
No more moves can be played if the game is over.
 

Example 1:


Input: board = ["O  ","   ","   "]
Output: false
Explanation: The first player always plays "X".
Example 2:


Input: board = ["XOX"," X ","   "]
Output: false
Explanation: Players take turns making moves.
Example 3:


Input: board = ["XOX","O O","XOX"]
Output: true
 

Constraints:

board.length == 3
board[i].length == 3
board[i][j] is either 'X', 'O', or ' '.

*/



/**
 * @param {string[]} board
 * @return {boolean}
 */
var validTicTacToe = function (board) {
    let o = 0, x = 0, owon = 0, xwon = 0;
    let rcount = new Array(3).fill(0).map(() => new Array(2).fill(0));
    let ccount = new Array(3).fill(0).map(() => new Array(2).fill(0));
    let dcount = new Array(2).fill(0).map(() => new Array(2).fill(0));

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 'O') {
                o++;
                rcount[i][1]++
                ccount[j][1]++;
                if (i === j) dcount[0][1]++;
                if (i + j === 2) dcount[1][1]++;
            } else if (board[i][j] === 'X') {
                x++;
                rcount[i][0]++;
                ccount[j][0]++;
                if (i === j) dcount[0][0]++;
                if (i + j === 2) dcount[1][0]++;
            }
        }
    }

    if ((x - o) > 1 || (x - o) < 0) return false;

    for (let i = 0; i < 3; i++) {
        if (rcount[i][0] === 3) xwon++;
        if (rcount[i][1] === 3) owon++;
        if (ccount[i][0] === 3) xwon++;
        if (ccount[i][1] === 3) owon++

        if (xwon >= 1 && owon >= 1) return false;
    }

    for (let i = 0; i < 2; i++) {
        if (dcount[i][0] === 3) xwon++;
        if (dcount[i][1] === 3) owon++;

        if (xwon >= 1 && owon >= 1) return false;
    }

    if (owon >= 1 && (x - o) === 1) return false;

    if (xwon >= 1 && (x - o) === 0) return false;

    return true;
};