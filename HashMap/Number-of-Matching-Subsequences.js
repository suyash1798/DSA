/*

Given a string s and an array of strings words, return the number of words[i] that is a subsequence of s.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
 

Example 1:

Input: s = "abcde", words = ["a","bb","acd","ace"]
Output: 3
Explanation: There are three strings in words that are a subsequence of s: "a", "acd", "ace".
Example 2:

Input: s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
Output: 2


*/

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
var numMatchingSubseq = function (s, words) {
    let count = 0, memo = new Map();

    for (let word of words) {
        if (word.length > s.length) continue;
        if (memo.has(word)) {
            memo.get(word) && count++;
            continue;
        }

        let index = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] !== word[index]) continue;

            index++;
            if (index === word.length) break;
        }
        if (index === word.length) {
            count++;
            memo.set(word, true);
        } else {
            memo.set(word, false);
        }
    }
    return count;
};