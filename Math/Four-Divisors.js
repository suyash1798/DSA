/*

Given an integer array nums, return the sum of divisors of the integers in that array that have exactly four divisors. If there is no such integer in the array, return 0.

 

Example 1:

Input: nums = [21,4,7]
Output: 32
Explanation: 
21 has 4 divisors: 1, 3, 7, 21
4 has 3 divisors: 1, 2, 4
7 has 2 divisors: 1, 7
The answer is the sum of divisors of 21 only.
Example 2:

Input: nums = [21,21]
Output: 64
Example 3:

Input: nums = [1,2,3,4,5]
Output: 0
 

Constraints:

1 <= nums.length <= 104
1 <= nums[i] <= 105

*/



/**
 * @param {number[]} nums
 * @return {number}
 */
var sumFourDivisors = function (nums) {
    let sum = 0;

    for (let num of nums) {
        let output = findDivisors(num);

        if (output.length === 4) {
            sum += (output[0] + output[1] + output[2] + output[3]);
        }
    }

    return sum;
};

var findDivisors = function (n) {
    let top = Math.ceil(Math.sqrt(n));
    let uni = new Set([1, n]);

    for (let i = 2; i <= top; i++) {
        let rem = n % i;

        if (rem === 0) {
            uni.add(i);
            uni.add(n / i);
        }
    }

    return Array.from(uni.values());
}