/*

An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

Given an integer n, return the nth ugly number.

 

Example 1:

Input: n = 10
Output: 12
Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.
Example 2:

Input: n = 1
Output: 1
Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
 

Constraints:

1 <= n <= 1690


*/




/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
    let index = 1, ugly = [1];

    let id2 = id3 = id5 = 0;

    while (index < n) {

        let value2 = ugly[id2] * 2;
        let value3 = ugly[id3] * 3;
        let value5 = ugly[id5] * 5;

        ugly.push(Math.min(value2, value3, value5));

        if(value2 === ugly[index]) id2++;
        if(value3 === ugly[index]) id3++;
        if(value5 === ugly[index]) id5++;

        index++;
    }

    return ugly[n-1];
};