/*

The beauty of a string is the difference in frequencies between the most frequent and least frequent characters.

For example, the beauty of "abaacc" is 3 - 1 = 2.
Given a string s, return the sum of beauty of all of its substrings.

 

Example 1:

Input: s = "aabcb"
Output: 5
Explanation: The substrings with non-zero beauty are ["aab","aabc","aabcb","abcb","bcb"], each with beauty equal to 1.
Example 2:

Input: s = "aabcbaa"
Output: 17
 

Constraints:

1 <= s.length <= 500
s consists of only lowercase English letters.


*/



/**
 * @param {string} s
 * @return {number}
 */
var beautySum = function (s) {
    let sum = 0;
    const base = 'a'.charCodeAt(0);

    for (let i = 0; i < s.length; i++) {
        const freq = new Array(26).fill(0);

        for (let j = i; j < s.length; j++) {
            const idx = s[j].charCodeAt(0) - base;
            freq[idx]++;

            let max = 0, min = Infinity;

            for (let k = 0; k < 26; k++) {
                if (freq[k] > 0) {
                    max = Math.max(max, freq[k]);
                    min = Math.min(min, freq[k]);
                }
            }
            sum += max - min;
        }
    }
    return sum;
};