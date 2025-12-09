/*

The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

 

Example 1:


Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
Example 2:

Input: n = 1
Output: [["Q"]]
 

Constraints:

1 <= n <= 9


*/



/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    let matrix = new Array(n).fill(0).map(() => new Array(n).fill('.'));
    let sols = [];
    let cols = new Set();
    let daig = new Set();
    let anti = new Set();

    function dfs(row) {
        if (row === n) {
            sols.push([...matrix.map((pattern) => pattern.join(''))]);
            return;
        }

        for (let i = 0; i < n; i++) {
            if(cols.has(i) || daig.has(row - i) || anti.has(row + i)) continue;

            matrix[row][i] = 'Q';

            cols.add(i);
            daig.add(row - i);
            anti.add(row + i);

            dfs(row+1);

            cols.delete(i);
            daig.delete(row - i);
            anti.delete(row + i);

            matrix[row][i] = '.';
        }
    }

    dfs(0);
    return sols;
};