/*

You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

 

Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.
 

Constraints:

1 <= s.length <= 105
s consists of only uppercase English letters.
0 <= k <= s.length

*/



/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
    let frq = new Array(26).fill(0), max = 0, start = 0;
    let final = 0;

    for (let i = 0; i < s.length; i++) {
        let ch = s[i].charCodeAt(0) - 65;

        frq[ch] += 1;

        if (frq[ch] > max) {
            max = frq[ch];
        }

        let l = i - start + 1;

        while ((l - max) > k) {
            frq[s[start].charCodeAt(0) - 65]--;

            start++;

            max = 0;

            for (let i = 0; i < 26; i++) {
                if (frq[i] > max) {
                    max = frq[i];
                }
            }

            l = i - start + 1;
        }

        final = Math.max(final, l);
    }

    return final;
};