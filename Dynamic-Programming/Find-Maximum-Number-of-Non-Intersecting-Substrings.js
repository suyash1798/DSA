/*

You are given a string word.

Return the maximum number of non-intersecting substrings of word that are at least four characters long and start and end with the same letter.

 

Example 1:

Input: word = "abcdeafdef"

Output: 2

Explanation:

The two substrings are "abcdea" and "fdef".

Example 2:

Input: word = "bcdaaaab"

Output: 1

Explanation:

The only substring is "aaaa". Note that we cannot also choose "bcdaaaab" since it intersects with the other substring.

 

Constraints:

1 <= word.length <= 2 * 105
word consists only of lowercase English letters.


*/



/**
 * @param {string} word
 * @return {number}
 */
var maxSubstrings = function (word) {
    let memo = new Array(word.length).fill(-1);

    function dfs(index) {
        if (index === word.length) return 0;

        if (memo[index] !== -1) return memo[index];

        let max = 0;

        for (let i = index + 3; i < word.length; i++) {
            if (word[index] === word[i]) {
                max = Math.max(max, 1 + dfs(i + 1));
                break;
            }
        }

        max = Math.max(max, dfs(index + 1));

        return memo[index] = max;
    }

    return dfs(0);
};

var maxSubstrings = function (word) {
    let dp = new Array(word.length + 1).fill(0);

    for (let i = word.length - 1; i >= 0; i--) {

        for (let j = i + 3; j < word.length; j++) {
            if (word[i] === word[j]) {
                dp[i] = Math.max(dp[i], 1 + dp[j + 1]);
                break;
            }
        }

        dp[i] = Math.max(dp[i], dp[i + 1]);
    }

    return dp[0];
}
