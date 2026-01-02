/*

Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
Example 3:

Input: nums = [], target = 0
Output: [-1,-1]
 

Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109
nums is a non-decreasing array.
-109 <= target <= 109

*/



/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    let min = Infinity, max = -Infinity;

    function search(start, end) {
        if (start > end) return;

        let mid = start + Math.floor((end - start) / 2);

        if (nums[mid] === target) {
            min = Math.min(min, mid);
            max = Math.max(max, mid);
            search(start, mid - 1);
            search(mid + 1, end);
        } else if (nums[mid] < target) {
            search(mid + 1, end);
        } else {
            search(start, mid - 1);
        }
    }

    search(0, nums.length - 1);

    if (min === Infinity) return [-1, -1];

    return [min, max];
};