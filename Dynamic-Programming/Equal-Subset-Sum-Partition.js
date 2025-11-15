/** 
 * Given a set of positive numbers, find if we can partition it into two subsets 
 * such that the sum of elements in both the subsets is equal.
 * 
 * Input: {1, 2, 3, 4}
 * Output: True
 * Explanation: The given set can be partitioned into two subsets with equal sum:
 * {1, 4} & {2, 3}
 *  */

/** Recusrive */

class Solution {

  canPartition(num) {
    let sum = num.reduce((total, n) => total + n, 0);
    let partitionSum = sum / 2;

    if (sum % 2 !== 0) {
      return false;
    }

    let memo = new Array(num.length).fill(0).map(() => []);

    return this.canPartitionUtil(num, 0, partitionSum, memo);
  }

  canPartitionUtil(num, index, partitionSum, memo) {
    if (partitionSum === 0) {
      return true;
    }

    if (partitionSum < 0 || index === num.length) {
      return false;
    }

    if (memo[index][partitionSum] !== undefined) {
      return memo[index][partitionSum];
    }

    let include = this.canPartitionUtil(num, index + 1, partitionSum - num[index], memo);
    let exlude = this.canPartitionUtil(num, index + 1, partitionSum, memo);

    return memo[index][partitionSum] = (include || exlude);
  }
}

/** Bottom - top */

class Solution {

  canPartition(num) {
    let sum = num.reduce((total, n) => total + n, 0);
    let partitionSum = sum / 2;

    if (sum % 2 !== 0) {
      return false;
    }

    let dp = new Array(num.length).fill(0).map(() => new Array(partitionSum + 1).fill(false));

    for (let i = 0; i < num.length; i++) {
      dp[i][0] = true;
    }

    for (let i = 0; i <= partitionSum; i++) {
      dp[0][i] = num[0] === i;
    }

    for (let i = 1; i < num.length; i++) {
      for (let p = 1; p <= partitionSum; p++) {
        if (num[i] <= p) {
          dp[i][p] = dp[i - 1][p] || dp[i - 1][p - num[i]];
        } else {
          dp[i][p] = dp[i - 1][p];
        }
      }
    }

    return dp[num.length - 1][partitionSum];
  }
}
