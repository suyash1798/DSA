/*

An integer has monotone increasing digits if and only if each pair of adjacent digits x and y satisfy x <= y.

Given an integer n, return the largest number that is less than or equal to n with monotone increasing digits.

 

Example 1:

Input: n = 10
Output: 9
Example 2:

Input: n = 1234
Output: 1234
Example 3:

Input: n = 332
Output: 299
 

Constraints:

0 <= n <= 109

*/



/**
 * @param {number} n
 * @return {number}
 */
var monotoneIncreasingDigits = function (n) {
    let num = n.toString().split('').map((i) => parseInt(i));

    for (let i = 0; i < num.length - 1; i++) {
        if (num[i] > num[i + 1]) {
            let index = i;

            while (index >= 0 && num[index] === num[i]) index--;

            index = index + 1;

            num[index] = num[index] - 1;

            for (let j = index + 1; j < num.length; j++) {
                num[j] = 9;
            }

            break;
        }
    }

    return parseInt(num.join(''));
};