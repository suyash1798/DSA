/*

You are given an integer array nums and three integers k, op1, and op2.

You can perform the following operations on nums:

Operation 1: Choose an index i and divide nums[i] by 2, rounding up to the nearest whole number. You can perform this operation at most op1 times, and not more than once per index.
Operation 2: Choose an index i and subtract k from nums[i], but only if nums[i] is greater than or equal to k. You can perform this operation at most op2 times, and not more than once per index.
Note: Both operations can be applied to the same index, but at most once each.

Return the minimum possible sum of all elements in nums after performing any number of operations.

 

Example 1:

Input: nums = [2,8,3,19,3], k = 3, op1 = 1, op2 = 1

Output: 23

Explanation:

Apply Operation 2 to nums[1] = 8, making nums[1] = 5.
Apply Operation 1 to nums[3] = 19, making nums[3] = 10.
The resulting array becomes [2, 5, 3, 10, 3], which has the minimum possible sum of 23 after applying the operations.
Example 2:

Input: nums = [2,4,3], k = 3, op1 = 2, op2 = 1

Output: 3

Explanation:

Apply Operation 1 to nums[0] = 2, making nums[0] = 1.
Apply Operation 1 to nums[1] = 4, making nums[1] = 2.
Apply Operation 2 to nums[2] = 3, making nums[2] = 0.
The resulting array becomes [1, 2, 0], which has the minimum possible sum of 3 after applying the operations.
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 105
0 <= k <= 105
0 <= op1, op2 <= nums.length

*/


/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} op1
 * @param {number} op2
 * @return {number}
 */
var minArraySum = function (nums, k, op1, op2) {

    let dp = new Array(nums.length).fill(0).map(() => new Array(op1 + 1).fill(0).map(() => new Array(op2 + 1).fill(-1)));

    function dfs(index, one, two) {

        if (index === nums.length) return 0;

        if (dp[index][one][two] !== -1) return dp[index][one][two];

        let min = nums[index] + dfs(index + 1, one, two);

        if (one > 0) {
            min = Math.min(min, Math.round(nums[index] / 2) + dfs(index + 1, one - 1, two));
        }

        if (two > 0 && nums[index] >= k) {
            min = Math.min(min, (nums[index] - k) + dfs(index + 1, one, two - 1));
        }

        if (one > 0) {
            let a = Math.round(nums[index] / 2);

            if (two > 0 && a >= k) {
                min = Math.min(min, (a - k) + dfs(index + 1, one - 1, two - 1));
            }
        }

        if (two > 0 && nums[index] >= k) {
            let a = nums[index] - k;

            if (one > 0) {
                min = Math.min(min, Math.round(a / 2) + dfs(index + 1, one - 1, two - 1));
            }
        }

        return dp[index][one][two] = min;
    }

    return dfs(0, op1, op2);
};