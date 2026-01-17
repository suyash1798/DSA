/*

You have two types of tiles: a 2 x 1 domino shape and a tromino shape. You may rotate these shapes.


Given an integer n, return the number of ways to tile an 2 x n board. Since the answer may be very large, return it modulo 109 + 7.

In a tiling, every square must be covered by a tile. Two tilings are different if and only if there are two 4-directionally adjacent cells on the board such that exactly one of the tilings has both squares occupied by a tile.

 

Example 1:


Input: n = 3
Output: 5
Explanation: The five different ways are shown above.
Example 2:

Input: n = 1
Output: 1
 

Constraints:

1 <= n <= 1000

*/



/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
    let memo = new Array(n + 1).fill(0).map(() => new Array(3).fill(-1));
    let MOD = 1000000007;

    function dfs(num, col) {
        if (num < 0) return 0;

        if (num === 0 && col === 2) return 1;

        if (num === 0 && col !== 2) return 0;

        if (memo[num][col] !== -1) return memo[num][col];

        let count = 0;

        if (col === 1) {
            count += dfs(num - 1, 1) + dfs(num - 2, 2);
        } else {
            count += dfs(num - 1, 2) + 2 * dfs(num - 1, 1) + dfs(num - 2, 2);
        }

        return memo[num][col] = count % MOD;
    }

    return dfs(n, 2);
};


var numTilings = function (n) {
    let dp = new Array(n + 2).fill(0).map(() => new Array(3).fill(0));
    let MOD = 1000000007;

    dp[n][2] = 1;

    for (let i = n - 1; i >= 0; i--) {
        dp[i][1] = (dp[i + 1][1] + dp[i + 2][2]) % MOD;
        dp[i][2] = (dp[i + 1][2] + 2 * dp[i + 1][1] + dp[i + 2][2]) % MOD;
    }

    return dp[0][2];
};