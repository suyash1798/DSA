/*

You are given a string s and an integer t, representing the number of transformations to perform. In one transformation, every character in s is replaced according to the following rules:

If the character is 'z', replace it with the string "ab".
Otherwise, replace it with the next character in the alphabet. For example, 'a' is replaced with 'b', 'b' is replaced with 'c', and so on.
Return the length of the resulting string after exactly t transformations.

Since the answer may be very large, return it modulo 109 + 7.

 

Example 1:

Input: s = "abcyy", t = 2

Output: 7

Explanation:

First Transformation (t = 1):
'a' becomes 'b'
'b' becomes 'c'
'c' becomes 'd'
'y' becomes 'z'
'y' becomes 'z'
String after the first transformation: "bcdzz"
Second Transformation (t = 2):
'b' becomes 'c'
'c' becomes 'd'
'd' becomes 'e'
'z' becomes "ab"
'z' becomes "ab"
String after the second transformation: "cdeabab"
Final Length of the string: The string is "cdeabab", which has 7 characters.
Example 2:

Input: s = "azbk", t = 1

Output: 5

Explanation:

First Transformation (t = 1):
'a' becomes 'b'
'z' becomes "ab"
'b' becomes 'c'
'k' becomes 'l'
String after the first transformation: "babcl"
Final Length of the string: The string is "babcl", which has 5 characters.
 

Constraints:

1 <= s.length <= 105
s consists only of lowercase English letters.
1 <= t <= 105

*/



/**
 * @param {string} s
 * @param {number} t
 * @return {number}
 */
var lengthAfterTransformationsMemo = function (s, t) { // gives TLE
    let n = s.length;
    let memo = new Map();
    let mod = 1000000007;

    function dfs(c, t) {
        if (t === 0) return 1;

        if (memo.has(`${c}-${t}`)) return memo.get(`${c}-${t}`);

        let ct = 0;

        if (c === 25) {
            ct = (dfs(0, t - 1) + dfs(1, t - 1)) % mod;
        } else {
            ct = dfs(c + 1, t - 1) % mod;
        }

        memo.set(`${c}-${t}`, ct);

        return ct;
    }

    let count = 0, freq = {};

    for (let ch of s) {
        freq[ch] = (freq[ch] || 0) + 1;
    }

    for (let key in freq) {
        count += (freq[key] * dfs(key.charCodeAt(0) - 97, t));
        count %= mod;
    }

    return count;
};


var lengthAfterTransformations = function (s, t) {
    let dp = new Array(26).fill(0);
    let mod = 1000000007;

    for (let ch of s) {
        let code = ch.charCodeAt(0) - 97;

        dp[code]++;
    }

    for (let i = 0; i < t; i++) {
        let next = new Array(26).fill(0);

        for (let j = 0; j < 26; j++) {
            if (dp[j] === 0) continue;

            if (j === 25) {
                next[0] = (next[0] + dp[j]) % mod;
                next[1] = (next[1] + dp[j]) % mod;
            } else {
                next[j + 1] += dp[j] % mod;
            }
        }

        dp = next;
    }

    let count = 0;

    for (let i = 0; i < 26; i++) {
        count += dp[i];
        count %= mod;
    }

    return count;
}