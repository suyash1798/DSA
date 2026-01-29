/*

You are given two strings word1 and word2.

A string x is called valid if x can be rearranged to have word2 as a prefix.

Return the total number of valid substrings of word1.

 

Example 1:

Input: word1 = "bcca", word2 = "abc"

Output: 1

Explanation:

The only valid substring is "bcca" which can be rearranged to "abcc" having "abc" as a prefix.

Example 2:

Input: word1 = "abcabc", word2 = "abc"

Output: 10

Explanation:

All the substrings except substrings of size 1 and size 2 are valid.

Example 3:

Input: word1 = "abcabc", word2 = "aaabc"

Output: 0

 

Constraints:

1 <= word1.length <= 105
1 <= word2.length <= 104
word1 and word2 consist only of lowercase English letters.

*/



/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var validSubstringCount = function (word1, word2) {
    let map1 = new Map(), map2 = new Map();
    let uni1 = 0, uni2 = 0, start = 0;
    let count = 0;

    for (let s of word2) {
        if (!map2.has(s)) {
            uni2++;
        }

        map2.set(s, (map2.get(s) || 0) + 1);
    }

    for (let i = 0; i < word1.length; i++) {
        let s = word1[i];

        map1.set(s, (map1.get(s) || 0) + 1);

        if (map1.get(s) === map2.get(s)) uni1++;

        while (map1.get(word1[start]) > (map2.get(word1[start]) || 0)) {
            map1.set(word1[start], map1.get(word1[start]) - 1);
            start++;
        }

        if (uni1 === uni2) count += (start + 1);
    }

    return count;
};