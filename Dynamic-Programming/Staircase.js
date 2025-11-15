/**
 * Given a stair with 'n' steps, implement a method to count how many possible ways are there to reach the top of the
 * staircase, given that, at every step you can either take 1 step, 2 steps, or 3 steps.
 * 
 * Number of stairs (n) : 4
 * Number of ways = 7
 * Explanation: Following are the seven ways we can climb : {1,1,1,1}, {1,1,2}, {1,2,1}, {2,1,1}, 
 * {2,2}, {1,3}, {3,1}
 * 
 */


class Solution {

  countWays(n) {
    let dp = new Array(n + 1);

    dp[0] = dp[1] = 1;
    dp[2] = 2;

    for (let i = 3; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
    }

    return dp[n];
  }

}