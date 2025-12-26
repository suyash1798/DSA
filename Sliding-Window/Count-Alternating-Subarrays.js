/*

You are given a binary array nums.

We call a subarray alternating if no two adjacent elements in the subarray have the same value.

Return the number of alternating subarrays in nums.

 

Example 1:

Input: nums = [0,1,1,1]

Output: 5

Explanation:

The following subarrays are alternating: [0], [1], [1], [1], and [0,1].

Example 2:

Input: nums = [1,0,1,0]

Output: 10

Explanation:

Every subarray of the array is alternating. There are 10 possible subarrays that we can choose.

 

Constraints:

1 <= nums.length <= 105
nums[i] is either 0 or 1.

*/




/**
 * @param {number[]} nums
 * @return {number}
 */
var countAlternatingSubarrays = function (nums) {
    let count = 1, start = 0;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            start = i;
        }

        count += (i - start + 1);
    }

    return count;
};