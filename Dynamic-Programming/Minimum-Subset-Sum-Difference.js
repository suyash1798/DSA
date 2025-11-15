/**
 * Given a set of positive numbers, partition the set into two subsets with a
 * minimum difference between their subset sums.
 * 
 * Input: {1, 2, 3, 9}
 * Output: 3
 * Explanation: We can partition the given set into two subsets where the minimum
 * absolute difference between the sum of numbers is '3'. Following are the two
 * subsets: {1, 2, 3} & {9}.
 * 
 */

class Solution {

  canPartition(num) {
    let total = num.reduce((total, n) => total + n, 0);

    let sum = Math.floor(total / 2);

    let dp = new Array(num.length).fill(0).map(() => new Array(sum + 1).fill(true));

    for (let i = 0; i <= sum; i++) {
      dp[0][i] = num[0] === i;
    }

    let maxSum = 0;

    for (let i = 1; i < num.length; i++) {
      for (let s = 1; s <= sum; s++) {
        dp[i][s] = dp[i - 1][s];
        if (num[i] <= s) {
          dp[i][s] = dp[i][s] || dp[i - 1][s - num[i]];
        }
        if (dp[i][s]) {
          maxSum = Math.max(maxSum, s);
        }
      }
    }

    return total - 2 * maxSum;
  }
}