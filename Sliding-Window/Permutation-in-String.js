/*

Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.

 

Example 1:

Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
Example 2:

Input: s1 = "ab", s2 = "eidboaoo"
Output: false
 

Constraints:

1 <= s1.length, s2.length <= 104
s1 and s2 consist of lowercase English letters.
 

*/



/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
    let frq1 = new Array(26).fill(0);
    let frq2 = new Array(26).fill(0);

    for (let i = 0; i < s1.length; i++) {
        frq1[s1.charCodeAt(i) - 97]++;
    }

    let start = 0;

    for (let i = 0; i < s2.length; i++) {
        frq2[s2.charCodeAt(i) - 97]++;

        if (isValid()) {
            return true;
        } else {
            while (frq2[s2.charCodeAt(i) - 97] > frq1[s2.charCodeAt(i) - 97]) {
                frq2[s2.charCodeAt(start) - 97]--;
                start++;
            }
        }
    }

    function isValid() {
        for (let i = 0; i < 26; i++) {
            if (frq1[i] !== frq2[i]) return false;
        }
        return true;
    }

    return false;
};