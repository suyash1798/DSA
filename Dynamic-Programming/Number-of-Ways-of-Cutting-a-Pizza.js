/*

Given a rectangular pizza represented as a rows x cols matrix containing the following characters: 'A' (an apple) and '.' (empty cell) and given the integer k. You have to cut the pizza into k pieces using k-1 cuts. 

For each cut you choose the direction: vertical or horizontal, then you choose a cut position at the cell boundary and cut the pizza into two pieces. If you cut the pizza vertically, give the left part of the pizza to a person. If you cut the pizza horizontally, give the upper part of the pizza to a person. Give the last piece of pizza to the last person.

Return the number of ways of cutting the pizza such that each piece contains at least one apple. Since the answer can be a huge number, return this modulo 10^9 + 7.

 

Example 1:



Input: pizza = ["A..","AAA","..."], k = 3
Output: 3 
Explanation: The figure above shows the three ways to cut the pizza. Note that pieces must contain at least one apple.
Example 2:

Input: pizza = ["A..","AA.","..."], k = 3
Output: 1
Example 3:

Input: pizza = ["A..","A..","..."], k = 1
Output: 1
 

Constraints:

1 <= rows, cols <= 50
rows == pizza.length
cols == pizza[i].length
1 <= k <= 10
pizza consists of characters 'A' and '.' only.

*/



/**
 * @param {string[]} pizza
 * @param {number} k
 * @return {number}
 */
var ways = function (pizza, k) {
    let m = pizza.length, n = pizza[0].length;
    let MOD = 1000000007;
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0).map(() => new Array(k).fill(-1)));
    let prefix = new Array(m).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            prefix[i][j] = (pizza[i][j] === 'A' ? 1 : 0) +
                (i > 0 ? prefix[i - 1][j] : 0) + (j > 0 ? prefix[i][j - 1] : 0) -
                (i > 0 && j > 0 ? prefix[i - 1][j - 1] : 0);
        }
    }

    function valid(sr, sc, er, ec) {
        let count = prefix[er - 1][ec - 1];

        if (sr > 0) count -= prefix[sr - 1][ec - 1];
        if (sc > 0) count -= prefix[er - 1][sc - 1];
        if (sr > 0 && sc > 0) count += prefix[sr - 1][sc - 1];

        return count !== 0;
    }

    function dfs(row, col, c) {
        if (dp[row][col][c] !== -1) {
            return dp[row][col][c];
        }
        if (c === k - 1) {
            return valid(row, col, m, n) ? 1 : 0;
        }

        let count = 0;

        for (let i = row + 1; i < m; i++) {
            if (valid(row, col, i, n)) {
                count += dfs(i, col, c + 1);
            }
        }

        for (let i = col + 1; i < n; i++) {
            if (valid(row, col, m, i)) {
                count += dfs(row, i, c + 1);
            }
        }

        return dp[row][col][c] = count % MOD;
    }

    return dfs(0, 0, 0);
};