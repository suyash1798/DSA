/*

You are given an integer array nums and an integer k.

Your task is to partition nums into exactly k subarrays and return an integer denoting the minimum possible score among all valid partitions.

The score of a partition is the sum of the values of all its subarrays.

The value of a subarray is defined as sumArr * (sumArr + 1) / 2, where sumArr is the sum of its elements.

 

Example 1:

Input: nums = [5,1,2,1], k = 2

Output: 25

Explanation:

We must partition the array into k = 2 subarrays. One optimal partition is [5] and [1, 2, 1].
The first subarray has sumArr = 5 and value = 5 × 6 / 2 = 15.
The second subarray has sumArr = 1 + 2 + 1 = 4 and value = 4 × 5 / 2 = 10.
The score of this partition is 15 + 10 = 25, which is the minimum possible score.
Example 2:

Input: nums = [1,2,3,4], k = 1

Output: 55

Explanation:

Since we must partition the array into k = 1 subarray, all elements belong to the same subarray: [1, 2, 3, 4].
This subarray has sumArr = 1 + 2 + 3 + 4 = 10 and value = 10 × 11 / 2 = 55.​​​​​​​
The score of this partition is 55, which is the minimum possible score.
Example 3:

Input: nums = [1,1,1], k = 3

Output: 3

Explanation:

We must partition the array into k = 3 subarrays. The only valid partition is [1], [1], [1].
Each subarray has sumArr = 1 and value = 1 × 2 / 2 = 1.
The score of this partition is 1 + 1 + 1 = 3, which is the minimum possible score.
 

Constraints:

1 <= nums.length <= 1000
1 <= nums[i] <= 104
1 <= k <= nums.length 

*/


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minPartitionScore = function (nums, k) {
    let sum = 0, n = nums.length;
    let dp = new Array(n).fill(0).map(() => new Array(k).fill(-1));

    let prefix = new Array(n).fill(0);

    prefix[0] = nums[0];

    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + nums[i];
    }

    function dfs(index, p) {
        if (dp[index][p] !== -1) return dp[index][p];

        if (p === 0) {
            let value = prefix[n - 1] - (index > 0 ? prefix[index - 1] : 0);

            return dp[index][p] = value * ((value + 1) / 2);
        };

        let min = Infinity;

        for (let i = index; i < n - p; i++) {
            let value = prefix[i] - (index > 0 ? prefix[index - 1] : 0);
            let cost = value * ((value + 1) / 2);

            if (cost >= min) break;

            min = Math.min(min, cost + dfs(i + 1, p - 1))
        }

        return dp[index][p] = min;
    }



    return dfs(0, k - 1);
};
