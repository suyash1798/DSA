/*

Given a string s. In one step you can insert any character at any index of the string.

Return the minimum number of steps to make s palindrome.

A Palindrome String is one that reads the same backward as well as forward.

 

Example 1:

Input: s = "zzazz"
Output: 0
Explanation: The string "zzazz" is already palindrome we do not need any insertions.
Example 2:

Input: s = "mbadm"
Output: 2
Explanation: String can be "mbdadbm" or "mdbabdm".
Example 3:

Input: s = "leetcode"
Output: 5
Explanation: Inserting 5 characters the string becomes "leetcodocteel".
 

Constraints:

1 <= s.length <= 500
s consists of lowercase English letters.


*/



/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s) {
    let dp = new Array(s.length).fill(0).map(() => new Array(s.length).fill(-1));

    function dfs(start, end) {
        if (start >= end) {
            return 0;
        }
        
        if(dp[start][end] !== -1) return dp[start][end];

        if (s[start] === s[end]) {
            return dp[start][end] = dfs(start + 1, end - 1);
        }

        return dp[start][end] = 1 + Math.min(dfs(start + 1, end), dfs(start, end - 1));
    }

    return dfs(0, s.length-1);
};