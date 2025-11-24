/*

Given an array nums of integers, return the length of the longest arithmetic subsequence in nums.

Note that:

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.
A sequence seq is arithmetic if seq[i + 1] - seq[i] are all the same value (for 0 <= i < seq.length - 1).
 

Example 1:

Input: nums = [3,6,9,12]
Output: 4
Explanation:  The whole array is an arithmetic sequence with steps of length = 3.
Example 2:

Input: nums = [9,4,7,2,10]
Output: 3
Explanation:  The longest arithmetic subsequence is [4,7,10].
Example 3:

Input: nums = [20,1,15,3,10,5,8]
Output: 4
Explanation:  The longest arithmetic subsequence is [20,15,10,5].
 

Constraints:

2 <= nums.length <= 1000
0 <= nums[i] <= 500


*/


/**
 * @param {number[]} nums
 * @return {number}
 */
var longestArithSeqLength = function (nums) {
    let n = nums.length, dp = new Array(n).fill(0).map(() => new Map()), max = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            let diff = nums[i] - nums[j];

            let len = (dp[j].get(diff) || 0) + 1;

            dp[i].set(diff, len);

            max = Math.max(max, len);
        }
    }

    return max+1;
};