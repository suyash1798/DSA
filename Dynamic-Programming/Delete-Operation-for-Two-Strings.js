/*

Given two strings word1 and word2, return the minimum number of steps required to make word1 and word2 the same.

In one step, you can delete exactly one character in either string.

 

Example 1:

Input: word1 = "sea", word2 = "eat"
Output: 2
Explanation: You need one step to make "sea" to "ea" and another step to make "eat" to "ea".
Example 2:

Input: word1 = "leetcode", word2 = "etco"
Output: 4
 

Constraints:

1 <= word1.length, word2.length <= 500
word1 and word2 consist of only lowercase English letters.


*/



/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    let dp = new Array(word1.length).fill(0).map(() => new Array(word2.length).fill(-1));

    function dfs(index1, index2) {
        if (index1 === word1.length) return word2.length - index2;

        if (index2 === word2.length) return word1.length - index1;

        if(dp[index1][index2] !== -1) return dp[index1][index2];

        let min;

        if (word1[index1] === word2[index2]) {
            min = dfs(index1 + 1, index2 + 1);
        } else {
            min = 1 + Math.min(dfs(index1 + 1, index2), dfs(index1, index2 + 1));
        }

        return dp[index1][index2] = min;
    }

    return dfs(0, 0);
};