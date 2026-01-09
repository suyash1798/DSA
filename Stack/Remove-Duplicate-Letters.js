/*

Given a string s, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.

 

Example 1:

Input: s = "bcabc"
Output: "abc"
Example 2:

Input: s = "cbacdcbc"
Output: "acdb"
 

Constraints:

1 <= s.length <= 104
s consists of lowercase English letters.

*/



/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
    let lastIndexes = {}, stack = [];
    let uni = new Set();

    for (let i = 0; i < s.length; i++) {
        lastIndexes[s[i]] = i;
    }

    for (let i = 0; i < s.length; i++) {
        let ch = s[i];

        if (uni.has(ch)) continue;

        while (stack.length && stack[stack.length - 1] > ch && lastIndexes[stack[stack.length - 1]] > i) {
            uni.delete(stack.pop());
        }

        uni.add(ch);
        stack.push(ch);
    }

    return stack.join('');
};