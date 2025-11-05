/*

Given a string s consisting only of characters a, b and c.

Return the number of substrings containing at least one occurrence of all these characters a, b and c.

Example 1:

Input: s = "abcabc"
Output: 10
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again). 
Example 2:

Input: s = "aaacb"
Output: 3
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb". 
Example 3:

Input: s = "abc"
Output: 1


*/

/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function (s) {
    let freq = new Array(3).fill(0);
    let unique = new Set(), count = 0, n = s.length;

    for (let i = 0; i < s.length; i++) {
        unique.add(s[i]);
        freq[s[i].charCodeAt(0) - 97] = i;

        if (unique.size === 3) {
            let minIndex = Math.min(...freq);
            count += (minIndex + 1);
        }
    }

    return count;
};