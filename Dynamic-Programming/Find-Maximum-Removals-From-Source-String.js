/*

You are given a string source of size n, a string pattern that is a subsequence of source, and a sorted integer array targetIndices that contains distinct numbers in the range [0, n - 1].

We define an operation as removing a character at an index idx from source such that:

idx is an element of targetIndices.
pattern remains a subsequence of source after removing the character.
Performing an operation does not change the indices of the other characters in source. For example, if you remove 'c' from "acb", the character at index 2 would still be 'b'.

Return the maximum number of operations that can be performed.

 

Example 1:

Input: source = "abbaa", pattern = "aba", targetIndices = [0,1,2]

Output: 1

Explanation:

We can't remove source[0] but we can do either of these two operations:

Remove source[1], so that source becomes "a_baa".
Remove source[2], so that source becomes "ab_aa".
Example 2:

Input: source = "bcda", pattern = "d", targetIndices = [0,3]

Output: 2

Explanation:

We can remove source[0] and source[3] in two operations.

Example 3:

Input: source = "dda", pattern = "dda", targetIndices = [0,1,2]

Output: 0

Explanation:

We can't remove any character from source.

Example 4:

Input: source = "yeyeykyded", pattern = "yeyyd", targetIndices = [0,2,3,4]

Output: 2

Explanation:

We can remove source[2] and source[3] in two operations.

 

Constraints:

1 <= n == source.length <= 3 * 103
1 <= pattern.length <= n
1 <= targetIndices.length <= n
targetIndices is sorted in ascending order.
The input is generated such that targetIndices contains distinct elements in the range [0, n - 1].
source and pattern consist only of lowercase English letters.
The input is generated such that pattern appears as a subsequence in source.

*/



/**
 * @param {string} source
 * @param {string} pattern
 * @param {number[]} targetIndices
 * @return {number}
 */
var maxRemovals = function (source, pattern, targetIndices) {
    let memo = new Array(source.length).fill(0).map(() => new Array(pattern.length + 1).fill(null));
    let target = new Set(targetIndices);

    function dfs(si, pi) {
        if (si === source.length) {
            return pi === pattern.length ? 0 : -Infinity;
        }

        if (memo[si][pi] !== null) return memo[si][pi];

        let gain = target.has(si) ? 1 : 0;

        let take = gain + dfs(si + 1, pi);

        let skip = dfs(si + 1, pi);

        if (source[si] === pattern[pi]) {
            skip = Math.max(skip, dfs(si + 1, pi + 1));
        }

        return memo[si][pi] = Math.max(take, skip);
    }

    return dfs(0, 0);
};



/**
 * @param {string} source
 * @param {string} pattern
 * @param {number[]} targetIndices
 * @return {number}
 */
var maxRemovals = function (source, pattern, targetIndices) {
    let n = source.length;
    let m = pattern.length;

    let dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(-Infinity));
    let target = new Set(targetIndices);

    dp[n][m] = 0;

    for (let i = n - 1; i >= 0; i--) {
        for (let j = m; j >= 0; j--) {
            let gain = target.has(i) ? 1 : 0;

            let take = gain + dp[i + 1][j];

            let skip = dp[i + 1][j];

            if (j < m && source[i] === pattern[j]) {
                skip = Math.max(skip, dp[i + 1][j + 1]);
            }

            dp[i][j] = Math.max(take, skip);
        }
    }

    return dp[0][0];
};

