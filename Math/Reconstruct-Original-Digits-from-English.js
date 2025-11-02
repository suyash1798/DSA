/*

Given a string s containing an out-of-order English representation of digits 0-9, return the digits in ascending order.

 

Example 1:

Input: s = "owoztneoer"
Output: "012"
Example 2:

Input: s = "fviefuro"
Output: "45"
 

Constraints:

1 <= s.length <= 105
s[i] is one of the characters ["e","g","f","i","h","o","n","s","r","u","t","w","v","x","z"].
s is guaranteed to be valid.



*/


/**
 * @param {string} s
 * @return {string}
 */
var originalDigits = function (s) {
    let freq = new Array(26).fill(0), res = new Array(10).fill(0);
    let toCode = (c) => c.charCodeAt(0) - 97;

    for (let ch of s) {
        freq[toCode(ch)] = freq[toCode(ch)] + 1;
    }

    res[0] = freq[toCode('z')];
    res[2] = freq[toCode('w')];
    res[6] = freq[toCode('x')];
    res[8] = freq[toCode('g')];

    res[7] = freq[toCode('s')] - res[6];
    res[5] = freq[toCode('v')] - res[7];
    res[4] = freq[toCode('f')] - res[5];
    res[1] = freq[toCode('o')] - res[0] - res[2] - res[4];
    res[3] = freq[toCode('h')] - res[8];
    res[9] = freq[toCode('i')] - res[6] - res[8] - res[5];

    return res.reduce((total, count, index) => {
        if (count > 0) {
            total += index.toString().repeat(count)
        }
        return total;
    }, '');
};