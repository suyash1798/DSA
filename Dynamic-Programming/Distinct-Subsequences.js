/*

Given two strings s and t, return the number of distinct subsequences of s which equals t.

The test cases are generated so that the answer fits on a 32-bit signed integer.

 

Example 1:

Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.
rabbbit
rabbbit
rabbbit
Example 2:

Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from s.
babgbag
babgbag
babgbag
babgbag
babgbag
 

Constraints:

1 <= s.length, t.length <= 1000
s and t consist of English letters.



*/





/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
    let memo = new Array(s.length).fill(0).map(() => new Array(t.length).fill(-1));
    function dfs(si, ti) {
        if (ti === t.length) return 1;

        if (si === s.length) return 0;

        if (memo[si][ti] !== -1) return memo[si][ti];

        let count = 0;

        if (s[si] === t[ti]) count += dfs(si + 1, ti + 1);

        count += dfs(si + 1, ti);

        return memo[si][ti] = count;
    }

    return dfs(0, 0);
};


/// Top Down


var numDistinct = function (s, t) {
    let dp = new Array(s.length + 1).fill(0).map(() => new Array(t.length + 1).fill(0));

    for (let i = 0; i < s.length + 1; i++) {
        dp[i][t.length] = 1;
    }

    for (let i = s.length - 1; i >= 0; i--) {
        for (let j = t.length - 1; j >= 0; j--) {
            dp[i][j] += dp[i + 1][j];

            if (s[i] === t[j]) {
                dp[i][j] += dp[i + 1][j + 1];
            }
        }
    }

    return dp[0][0];
};