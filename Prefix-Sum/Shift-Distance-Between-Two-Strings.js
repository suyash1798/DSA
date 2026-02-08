/*

You are given two strings s and t of the same length, and two integer arrays nextCost and previousCost.

In one operation, you can pick any index i of s, and perform either one of the following actions:

Shift s[i] to the next letter in the alphabet. If s[i] == 'z', you should replace it with 'a'. This operation costs nextCost[j] where j is the index of s[i] in the alphabet.
Shift s[i] to the previous letter in the alphabet. If s[i] == 'a', you should replace it with 'z'. This operation costs previousCost[j] where j is the index of s[i] in the alphabet.
The shift distance is the minimum total cost of operations required to transform s into t.

Return the shift distance from s to t.

 

Example 1:

Input: s = "abab", t = "baba", nextCost = [100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], previousCost = [1,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

Output: 2

Explanation:

We choose index i = 0 and shift s[0] 25 times to the previous character for a total cost of 1.
We choose index i = 1 and shift s[1] 25 times to the next character for a total cost of 0.
We choose index i = 2 and shift s[2] 25 times to the previous character for a total cost of 1.
We choose index i = 3 and shift s[3] 25 times to the next character for a total cost of 0.
Example 2:

Input: s = "leet", t = "code", nextCost = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], previousCost = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

Output: 31

Explanation:

We choose index i = 0 and shift s[0] 9 times to the previous character for a total cost of 9.
We choose index i = 1 and shift s[1] 10 times to the next character for a total cost of 10.
We choose index i = 2 and shift s[2] 1 time to the previous character for a total cost of 1.
We choose index i = 3 and shift s[3] 11 times to the next character for a total cost of 11.
 

Constraints:

1 <= s.length == t.length <= 105
s and t consist only of lowercase English letters.
nextCost.length == previousCost.length == 26
0 <= nextCost[i], previousCost[i] <= 109

*/



/**
 * @param {string} s
 * @param {string} t
 * @param {number[]} nextCost
 * @param {number[]} previousCost
 * @return {number}
 */
var shiftDistance = function (s, t, nextCost, previousCost) {
    let prefixNext = new Array(26).fill(0);
    let prefixPrev = new Array(26).fill(0);
    let n = s.length;
    let total = 0;

    prefixNext[0] = nextCost[0];
    prefixPrev[0] = previousCost[0];

    for (let i = 1; i < 26; i++) {
        prefixNext[i] = nextCost[i] + prefixNext[i - 1];
        prefixPrev[i] = previousCost[i] + prefixPrev[i - 1];
    }

    for (let i = 0; i < n; i++) {
        let fromCode = s[i].charCodeAt(0) - 97;
        let toCode = t[i].charCodeAt(0) - 97;

        if (fromCode === toCode) continue;

        let next = 0, prev = 0;

        if (toCode < fromCode) {
            next = (prefixNext[25] - prefixNext[fromCode - 1]) + (toCode > 0 ? prefixNext[toCode - 1] : 0);
            prev = prefixPrev[fromCode] - prefixPrev[toCode];
        } else {
            next = prefixNext[toCode - 1] - (fromCode > 0 ? prefixNext[fromCode - 1] : 0);
            prev = prefixPrev[fromCode] + (prefixPrev[25] - prefixPrev[toCode]);
        }

        total += Math.min(next, prev);
    }

    return total;
};