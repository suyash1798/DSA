/*

You are given an integer array nums of size n containing only 1 and -1, and an integer k.

You can perform the following operation at most k times:

Choose an index i (0 <= i < n - 1), and multiply both nums[i] and nums[i + 1] by -1.

Note that you can choose the same index i more than once in different operations.

Return true if it is possible to make all elements of the array equal after at most k operations, and false otherwise.

 

Example 1:

Input: nums = [1,-1,1,-1,1], k = 3

Output: true

Explanation:

We can make all elements in the array equal in 2 operations as follows:

Choose index i = 1, and multiply both nums[1] and nums[2] by -1. Now nums = [1,1,-1,-1,1].
Choose index i = 2, and multiply both nums[2] and nums[3] by -1. Now nums = [1,1,1,1,1].
Example 2:

Input: nums = [-1,-1,-1,1,1,1], k = 5

Output: false

Explanation:

It is not possible to make all array elements equal in at most 5 operations.

 

Constraints:

1 <= n == nums.length <= 105
nums[i] is either -1 or 1.
1 <= k <= n

*/


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canMakeEqual = function (nums, k) {
    let op = 0;
    let copy = [...nums];
    let can = true;

    for (let i = 0; i < copy.length - 1; i++) {
        if (copy[i] === 1) continue;

        copy[i] *= -1;
        copy[i + 1] *= -1;
        op++;

        if (op > k) {
            can = false;
            break;
        }
    }

    if (copy[copy.length - 1] === 1 && can) return true;

    op = 0;
    can = true;

    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === -1) continue;

        nums[i] *= -1;
        nums[i + 1] *= -1;
        op++;

        if (op > k) {
            can = false;
            break;
        }
    }

    if (nums[nums.length - 1] === -1 && can) return true;

    return false;
};