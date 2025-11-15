/**
 * Given a set of positive numbers, find the total number of subsets whose sum is equal to a given number 'S'.
 * 
 * Input: {1, 1, 2, 3}, S=4
 * Output: 3
 * The given set has '3' subsets whose sum is '4': {1, 1, 2}, {1, 3}, {1, 3}
 * Note that we have two similar sets {1, 3}, because we have two '1' in our input.
 */

class Solution {
  countSubsets(num, sum) {
    let dp = new Array(num.length).fill(0).map(() => new Array(sum + 1).fill(1));

    for (let s = 0; s <= sum; s++) {
      dp[0][s] = (s === 0 || num[0] === s) ? 1 : 0;
    }

    for (let i = 1; i < num.length; i++) {
      for (let s = 1; s <= sum; s++) {
        dp[i][s] = dp[i - 1][s];

        if (num[i] <= s) {
          dp[i][s] += dp[i - 1][s - num[i]];
        }
      }
    }
    return dp[num.length - 1][sum];
  }
}
