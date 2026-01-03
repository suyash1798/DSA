/*

You are given an integer array rewardValues of length n, representing the values of rewards.

Initially, your total reward x is 0, and all indices are unmarked. You are allowed to perform the following operation any number of times:

Choose an unmarked index i from the range [0, n - 1].
If rewardValues[i] is greater than your current total reward x, then add rewardValues[i] to x (i.e., x = x + rewardValues[i]), and mark the index i.
Return an integer denoting the maximum total reward you can collect by performing the operations optimally.

 

Example 1:

Input: rewardValues = [1,1,3,3]

Output: 4

Explanation:

During the operations, we can choose to mark the indices 0 and 2 in order, and the total reward will be 4, which is the maximum.

Example 2:

Input: rewardValues = [1,6,4,3,2]

Output: 11

Explanation:

Mark the indices 0, 2, and 1 in order. The total reward will then be 11, which is the maximum.

 

Constraints:

1 <= rewardValues.length <= 2000
1 <= rewardValues[i] <= 2000


*/


/**
 * @param {number[]} rewardValues
 * @return {number}
 */
var maxTotalReward = function (rewardValues) {
    let memo = new Array(rewardValues.length).fill(0).map(() => new Array());

    rewardValues.sort((a, b) => a - b);

    function dfs(index, reward) {
        if (index === rewardValues.length || reward >= 4000) return 0;

        if (memo[index][reward] !== undefined) return memo[index][reward];

        let take = 0;

        if (reward < rewardValues[index]) {
            take = rewardValues[index] + dfs(index + 1, reward + rewardValues[index]);
        }

        let skip = dfs(index + 1, reward);

        return memo[index][reward] = Math.max(take, skip);
    }

    return dfs(0, 0);
};



var maxTotalReward = function (rewardValues) {
    let dp = new Array(rewardValues.length + 1).fill(0).map(() => new Array(4000).fill(0));

    rewardValues.sort((a, b) => a - b);

    for (let i = rewardValues.length - 1; i >= 0; i--) {
        for (let j = 4000; j >= 0; j--) {
            let take = 0;

            if (j < rewardValues[i]) {
                take = rewardValues[i] + dp[i + 1][j + rewardValues[i]];
            }

            let skip = dp[i + 1][j];

            dp[i][j] = Math.max(take, skip);
        }
    }

    return dp[0][0];
};