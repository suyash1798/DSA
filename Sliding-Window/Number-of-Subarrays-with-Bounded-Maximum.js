/*

Given an integer array nums and two integers left and right, return the number of contiguous non-empty subarrays such that the value of the maximum array element in that subarray is in the range [left, right].

The test cases are generated so that the answer will fit in a 32-bit integer.

 

Example 1:

Input: nums = [2,1,4,3], left = 2, right = 3
Output: 3
Explanation: There are three subarrays that meet the requirements: [2], [2, 1], [3].
Example 2:

Input: nums = [2,9,2,5,6], left = 2, right = 8
Output: 7
 

Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 109
0 <= left <= right <= 109

*/


/**
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var numSubarrayBoundedMax = function (nums, left, right) {
    let last = 0, count = 0, max = 0, start = 0;

    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        if (num > right) {
            last = 0;
            max = 0;
            start = i + 1;
            continue;
        }

        if (num < left) {
            count += last;
        } else {
            last = (i - start + 1);
            count += last;
        }
    }

    return count;
};