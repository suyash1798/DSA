/*

Given an integer array arr, partition the array into (contiguous) subarrays of length at most k. After partitioning, each subarray has their values changed to become the maximum value of that subarray.

Return the largest sum of the given array after partitioning. Test cases are generated so that the answer fits in a 32-bit integer.

 

Example 1:

Input: arr = [1,15,7,9,2,5,10], k = 3
Output: 84
Explanation: arr becomes [15,15,15,9,10,10,10]
Example 2:

Input: arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
Output: 83
Example 3:

Input: arr = [1], k = 1
Output: 1
 

Constraints:

1 <= arr.length <= 500
0 <= arr[i] <= 109
1 <= k <= arr.length


*/



/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var maxSumAfterPartitioningMemo = function (arr, k) {
    let memo = new Array(arr.length).fill(-1);

    function dfs(index) {
        if (index === arr.length) return 0;

        if (memo[index] !== -1) return memo[index];

        let max = arr[index], total = 0;

        for (let i = index; i < Math.min(index + k, arr.length); i++) {
            max = Math.max(max, arr[i]);

            total = Math.max(total, (i - index + 1) * max + dfs(i + 1));
        }

        return memo[index] = total;
    }

    return dfs(0);
};


//// Bottom Up DP

var maxSumAfterPartitioning = function (arr, k) {
    let dp = new Array(arr.length + 1).fill(0);
    let n = arr.length;

    for (let i = n - 1; i >= 0; i--) {
        let max = arr[i], total = 0;

        for (let j = i; j < Math.min(n, i + k); j++) {
            let len = j - i + 1;
            max = Math.max(max, arr[j]);

            total = Math.max(total, (len * max + dp[j + 1]));
        }

        dp[i] = total;
    }

    return dp[0];
};