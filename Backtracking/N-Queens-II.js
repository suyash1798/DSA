/*

The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return the number of distinct solutions to the n-queens puzzle.

 

Example 1:


Input: n = 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown.
Example 2:

Input: n = 1
Output: 1
 

Constraints:

1 <= n <= 9

*/



/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
    let cols = new Array(n).fill(false);
    let leftDaig = new Array(2 * n - 1).fill(false);
    let rightDaig = new Array(2 * n - 1).fill(false);
    let count = 0;

    function backtracking(row) {
        if (row === n) {
            count++;
            return;
        }

        for (let col = 0; col < n; col++) {
            let ld = row - col + n;
            let rd = row + col;

            if (cols[col] || leftDaig[ld] || rightDaig[rd]) continue;

            cols[col] = leftDaig[ld] = rightDaig[rd] = true;

            backtracking(row + 1);

            cols[col] = leftDaig[ld] = rightDaig[rd] = false;
        }
    }

    backtracking(0);

    return count;
};