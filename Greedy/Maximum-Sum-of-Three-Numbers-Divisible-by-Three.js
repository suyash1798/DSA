/*

You are given an integer array nums.

Your task is to choose exactly three integers from nums such that their sum is divisible by three.

Return the maximum possible sum of such a triplet. If no such triplet exists, return 0.

 

Example 1:

Input: nums = [4,2,3,1]

Output: 9

Explanation:

The valid triplets whose sum is divisible by 3 are:

(4, 2, 3) with a sum of 4 + 2 + 3 = 9.
(2, 3, 1) with a sum of 2 + 3 + 1 = 6.
Thus, the answer is 9.

Example 2:

Input: nums = [2,1,5]

Output: 0

Explanation:

No triplet forms a sum divisible by 3, so the answer is 0.

 

Constraints:

3 <= nums.length <= 105
1 <= nums[i] <= 105

*/



/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumSum = function (nums) {
    let mod0 = [], mod1 = [], mod2 = [];
    let max = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 3 === 0) {
            mod0.push(nums[i]);
        } else if (nums[i] % 3 === 1) {
            mod1.push(nums[i]);
        } else {
            mod2.push(nums[i]);
        }
    }

    mod0.sort((a, b) => b - a);
    mod1.sort((a, b) => b - a);
    mod2.sort((a, b) => b - a);

    if (mod0.length >= 3) max = Math.max(max, mod0[0] + mod0[1] + mod0[2]);
    if (mod1.length >= 3) max = Math.max(max, mod1[0] + mod1[1] + mod1[2]);
    if (mod2.length >= 3) max = Math.max(max, mod2[0] + mod2[1] + mod2[2]);

    if (mod0.length >= 1 && mod1.length >= 1 && mod2.length >= 1)
        max = Math.max(max, mod0[0] + mod1[0] + mod2[0]);

    return max;
};