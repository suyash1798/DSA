/*

You are climbing a staircase with n + 1 steps, numbered from 0 to n.

You are also given a 1-indexed integer array costs of length n, where costs[i] is the cost of step i.

From step i, you can jump only to step i + 1, i + 2, or i + 3. The cost of jumping from step i to step j is defined as: costs[j] + (j - i)2

You start from step 0 with cost = 0.

Return the minimum total cost to reach step n.

 

Example 1:

Input: n = 4, costs = [1,2,3,4]

Output: 13

Explanation:

One optimal path is 0 → 1 → 2 → 4

Jump	Cost Calculation	Cost
0 → 1	costs[1] + (1 - 0)2 = 1 + 1	2
1 → 2	costs[2] + (2 - 1)2 = 2 + 1	3
2 → 4	costs[4] + (4 - 2)2 = 4 + 4	8
Thus, the minimum total cost is 2 + 3 + 8 = 13

Example 2:

Input: n = 4, costs = [5,1,6,2]

Output: 11

Explanation:

One optimal path is 0 → 2 → 4

Jump	Cost Calculation	Cost
0 → 2	costs[2] + (2 - 0)2 = 1 + 4	5
2 → 4	costs[4] + (4 - 2)2 = 2 + 4	6
Thus, the minimum total cost is 5 + 6 = 11

Example 3:

Input: n = 3, costs = [9,8,3]

Output: 12

Explanation:

The optimal path is 0 → 3 with total cost = costs[3] + (3 - 0)2 = 3 + 9 = 12

 

Constraints:

1 <= n == costs.length <= 105​​​​​​​
1 <= costs[i] <= 104

*/



/**
 * @param {number} n
 * @param {number[]} costs
 * @return {number}
 */
var climbStairs = function (n, costs) {
    let memo = new Array(n).fill(-1);

    costs.unshift(0);

    function dfs(index) {
        if (index === n) return 0;

        if (memo[index] !== -1) return memo[index];

        let min = Infinity;

        for (let i = index + 1; i <= Math.min(index + 3, n); i++) {
            min = Math.min(min, costs[i] + Math.pow(i - index, 2) + dfs(i))
        }

        return memo[index] = min;
    }

    return dfs(0);
};


var climbStairs = function (n, costs) {
    let dp = new Array(n + 1).fill(Infinity);

    dp[n] = 0;

    costs.unshift(0);

    for (let i = n - 1; i >= 0; i--) {
        let min = Infinity;

        for (let j = i + 1; j <= Math.min(i + 3, n); j++) {
            min = Math.min(min, costs[j] + Math.pow(j - i, 2) + dp[j]);
        }

        dp[i] = min;
    }

    return dp[0];
};