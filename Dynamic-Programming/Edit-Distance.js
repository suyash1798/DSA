/*

Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:

Insert a character
Delete a character
Replace a character
 

Example 1:

Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
Example 2:

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
 

Constraints:

0 <= word1.length, word2.length <= 500
word1 and word2 consist of lowercase English letters.


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
            min = 1 + Math.min(dfs(index1 + 1, index2), dfs(index1, index2 + 1), dfs(index1 + 1, index2 + 1));
        }

        return dp[index1][index2] = min;
    }

    return dfs(0,0);
};