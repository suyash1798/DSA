/*

Given an integer array nums and an integer k, find three non-overlapping subarrays of length k with maximum sum and return them.

Return the result as a list of indices representing the starting position of each interval (0-indexed). If there are multiple answers, return the lexicographically smallest one.

 

Example 1:

Input: nums = [1,2,1,2,6,7,5,1], k = 2
Output: [0,3,5]
Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].
We could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically larger.
Example 2:

Input: nums = [1,2,1,2,1,2,1,2,1], k = 2
Output: [0,2,4]
 

Constraints:

1 <= nums.length <= 2 * 104
1 <= nums[i] < 216
1 <= k <= floor(nums.length / 3)

*/



/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSumOfThreeSubarrays = function (nums, k) {
    let n = nums.length;
    let w = n - k + 1;
    let left = new Array(n - k + 1).fill(0);
    let right = new Array(n - k + 1).fill(0);
    let sums = new Array(n).fill(0);
    let sum = 0;

    for (let i = 0; i < n; i++) {
        sum += nums[i];

        if (i >= k) sum -= nums[i - k];
        if (i >= k - 1) sums[i - k + 1] = sum;
    }

    for (let i = 1; i < w; i++) {
        let prev = left[i - 1];

        if (sums[prev] >= sums[i]) {
            left[i] = prev;
        } else {
            left[i] = i;
        }
    }

    right[w - 1] = w - 1;

    for (let i = w - 2; i >= 0; i--) {
        let prev = right[i + 1];

        if (sums[prev] > sums[i]) {
            right[i] = prev;
        } else {
            right[i] = i;
        }
    }

    let maxSum = 0;
    let output = [];

    for (let i = k; i < w - k; i++) {
        let l = left[i - k];
        let r = right[i + k];

        let total = sums[l] + sums[i] + sums[r];

        if (total > maxSum) {
            maxSum = total;
            output = [l, i, r];
        }
    }

    return output;
};