/*

Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

 

Example 1:

Input: nums = [3,2,3]
Output: [3]
Example 2:

Input: nums = [1]
Output: [1]
Example 3:

Input: nums = [1,2]
Output: [1,2]
 

Constraints:

1 <= nums.length <= 5 * 104
-109 <= nums[i] <= 109
 

Follow up: Could you solve the problem in linear time and in O(1) space?

*/


/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function (nums) {
    let cand1 = nums[0], cand2 = nums[0];
    let count1 = 0, count2 = 0;
    let output = [];

    for (let n of nums) {
        if (n === cand1) {
            count1++
        } else if (n === cand2) {
            count2++
        } else if (count1 === 0) {
            cand1 = n;
            count1 = 1;
        } else if (count2 === 0) {
            cand2 = n;
            count2 = 1;
        } else {
            count1--;
            count2--;
        }
    }

    count1 = 0;
    count2 = 0;

    for (let n of nums) {
        if (n === cand1) count1++;
        else if (n === cand2) count2++;
    }

    if (count1 > nums.length / 3) output.push(cand1);
    if (count2 > nums.length / 3) output.push(cand2);

    return output;
};