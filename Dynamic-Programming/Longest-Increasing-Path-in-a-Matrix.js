/*

Given an m x n integers matrix, return the length of the longest increasing path in matrix.

From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

 

Example 1:


Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
Example 2:


Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.
Example 3:

Input: matrix = [[1]]
Output: 1
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 200
0 <= matrix[i][j] <= 231 - 1

*/



/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
    let n = matrix.length, m = matrix[0].length;
    let dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    let memo = new Array(n).fill(0).map(() => new Array(m).fill(-1));

    function dfs(row, col) {
        if (memo[row][col] !== -1) return memo[row][col];

        let max = 1;

        for (let [r, c] of dirs) {
            let nr = row + r;
            let nc = col + c;

            if (nr < 0 || nc < 0 || nr >= n || nc >= m) continue;

            if (matrix[nr][nc] > matrix[row][col]) {
                max = Math.max(max, 1 + dfs(nr, nc));
            }
        }

        return memo[row][col] = max;
    }

    let max = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            max = Math.max(max, dfs(i, j));
        }
    }

    return max;
};