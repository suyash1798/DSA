/*

You have a grid of size n x 3 and you want to paint each cell of the grid with exactly one of the three colors: Red, Yellow, or Green while making sure that no two adjacent cells have the same color (i.e., no two cells that share vertical or horizontal sides have the same color).

Given n the number of rows of the grid, return the number of ways you can paint this grid. As the answer may grow large, the answer must be computed modulo 109 + 7.

 

Example 1:


Input: n = 1
Output: 12
Explanation: There are 12 possible way to paint the grid as shown.
Example 2:

Input: n = 5000
Output: 30228214
 

Constraints:

n == grid.length
1 <= n <= 5000

*/



/**
 * @param {number} n
 * @return {number}
 */
var numOfWays = function (n) {

    let memo = new Array(n).fill(0).map(() => new Array(4).fill(0).map(() => new Array(4).fill(0)
        .map(() => new Array(4).fill(-1))));
    let mod = 1000000007;

    function dfs(row, a, b, c) {
        if (row === n) return 1;

        if (memo[row][a][b][c] !== -1) return memo[row][a][b][c];

        let count = 0;

        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                for (let k = 1; k <= 3; k++) {
                    if (i === j || j === k || i === a || j === b || k === c) continue;

                    count += dfs(row + 1, i, j, k);
                }
            }
        }

        return memo[row][a][b][c] = count % mod;
    }

    return dfs(0, 0, 0, 0) % mod;
};