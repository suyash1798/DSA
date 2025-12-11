/*

Given a string s, return the longest palindromic substring in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.


*/




/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    var expand = function (start, end) {
        while (start >= 0 && end < s.length) {
            if (s[start] !== s[end]) break;
            start--;
            end++;
        }

        return [start + 1, end - 1, end - start - 1];
    }

    let maxl = 0, start = 0, end = 0;

    for (let i = 0; i < s.length; i++) {
        let [s1, e1, l1] = expand(i, i);
        let [s2, e2, l2] = expand(i, i + 1);

        if (l1 > maxl) {
            start = s1;
            end = e1;
            maxl = l1;
        }

        if (l2 > maxl) {
            start = s2;
            end = e2;
            maxl = l2;
        }
    }

    return s.substring(start, end + 1);
};