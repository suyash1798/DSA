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
    let dp = new Array(s.length).fill(0).map(() => new Array(t.length).fill(-1));

    function dfs(index1, index2) {
        if (index2 === t.length) return 1;
        if (index1 === s.length) return 0;

        if(dp[index1][index2] !== -1) return dp[index1][index2];

        let count = 0;

        if (s[index1] === t[index2]) {
            count += dfs(index1 + 1, index2 + 1);
        }
        count += dfs(index1 + 1, index2);

        return dp[index1][index2] = count;
    }

    return dfs(0, 0);
};