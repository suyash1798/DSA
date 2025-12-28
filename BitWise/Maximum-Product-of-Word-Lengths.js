/*

Given a string array words, return the maximum value of length(word[i]) * length(word[j]) where the two words do not share common letters. If no such two words exist, return 0.

 

Example 1:

Input: words = ["abcw","baz","foo","bar","xtfn","abcdef"]
Output: 16
Explanation: The two words can be "abcw", "xtfn".
Example 2:

Input: words = ["a","ab","abc","d","cd","bcd","abcd"]
Output: 4
Explanation: The two words can be "ab", "cd".
Example 3:

Input: words = ["a","aa","aaa","aaaa"]
Output: 0
Explanation: No such pair of words.
 

Constraints:

2 <= words.length <= 1000
1 <= words[i].length <= 1000
words[i] consists only of lowercase English letters.

*/



/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function (words) {
    let n = words.length, masks = new Array(n).fill(0);
    let max = 0;

    for (let i = 0; i < n; i++) {
        let word = words[i];
        let mask = 0;

        for (let ch of word) {
            let code = ch.charCodeAt(0) - 97;

            mask = mask | (1 << code);
        }

        masks[i] = mask;
    }

    for (let i = 0; i < n; i++) {

        for (let j = i + 1; j < n; j++) {
            if ((masks[i] & masks[j]) === 0) {
                max = Math.max(max, words[i].length * words[j].length);
            }
        }
    }

    return max;
};