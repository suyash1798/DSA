/*

You have n dice, and each dice has k faces numbered from 1 to k.

Given three integers n, k, and target, return the number of possible ways (out of the kn total ways) to roll the dice, so the sum of the face-up numbers equals target. Since the answer may be too large, return it modulo 109 + 7.

 

Example 1:

Input: n = 1, k = 6, target = 3
Output: 1
Explanation: You throw one die with 6 faces.
There is only one way to get a sum of 3.
Example 2:

Input: n = 2, k = 6, target = 7
Output: 6
Explanation: You throw two dice, each with 6 faces.
There are 6 ways to get a sum of 7: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1.
Example 3:

Input: n = 30, k = 30, target = 500
Output: 222616187
Explanation: The answer must be returned modulo 109 + 7.
 

Constraints:

1 <= n, k <= 30
1 <= target <= 1000

*/



/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (n, k, target) {
    let memo = new Array(n + 1).fill(0).map(() => new Array(target + 1).fill(-1));
    let MOD = 1000000007;

    function dfs(index, t) {
        if (t === 0 && index === n) return 1;

        if (index === n || t <= 0) return 0;

        if (memo[index][t] !== -1) return memo[index][t];

        let count = 0;

        for (let i = 1; i <= k; i++) {
            count += dfs(index + 1, t - i);
        }

        return memo[index][t] = count % MOD;
    }

    return dfs(0, target);
};

// Bottom-top

var numRollsToTarget = function (n, k, target) {
    let dp = new Array(n + 1).fill(0).map(() => new Array(target + 1).fill(0));
    let MOD = 1000000007;

    dp[n][0] = 1;

    for (let i = n - 1; i >= 0; i--) {
        for (let j = target; j >= 0; j--) {
            let count = 0;

            for (let f = 1; f <= k && f <= j; f++) {
                count += dp[i + 1][j - f];
            }

            dp[i][j] = count % MOD;
        }
    }

    return dp[0][target];
};

// optimized bottom-top

var numRollsToTarget = function (n, k, target) {
    let dp = new Array(target + 1).fill(0);
    let MOD = 1000000007;

    dp[0] = 1;

    for (let i = n - 1; i >= 0; i--) {
        for (let j = target; j >= 0; j--) {
            let count = 0;

            for (let f = 1; f <= k && f <= j; f++) {
                count += dp[j - f];
            }

            dp[j] = count % MOD;
        }
    }

    return dp[target];
};