/*

You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.

Return the single element that appears only once.

Your solution must run in O(log n) time and O(1) space.

 

Example 1:

Input: nums = [1,1,2,3,3,4,4,8,8]
Output: 2
Example 2:

Input: nums = [3,3,7,7,10,11,11]
Output: 10
 

Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 105

*/



/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
    let low = 0, high = nums.length - 1;

    function isCorrect(index) {
        if (index % 2 === 0) {
            return nums[index] === nums[index + 1];
        } else {
            return nums[index] !== nums[index + 1];
        }
    }

    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2);

        if (isCorrect(mid)) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return nums[low];
};