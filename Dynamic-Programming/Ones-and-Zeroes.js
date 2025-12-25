/*

You are given an array of binary strings strs and two integers m and n.

Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.

A set x is a subset of a set y if all elements of x are also elements of y.

 

Example 1:

Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
{"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.
Example 2:

Input: strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: The largest subset is {"0", "1"}, so the answer is 2.
 

Constraints:

1 <= strs.length <= 600
1 <= strs[i].length <= 100
strs[i] consists only of digits '0' and '1'.
1 <= m, n <= 100


*/



/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxFormMemo = function (strs, m, n) {

    let ones = new Array(strs.length).fill(0);
    let zeros = new Array(strs.length).fill(0);

    for (let i = 0; i < strs.length; i++) {
        let word = strs[i];

        for (let j = 0; j < word.length; j++) {
            if (word[j] === '1') ones[i]++;
            else zeros[i]++;
        }
    }


    function dfs(index, m, n) {
        if (index === strs.length) return 0;

        let take = 0;

        if (m >= zeros[index] && n >= ones[index]) {
            take = 1 + dfs(index + 1, m - zeros[index], n - ones[index]);
        }
        let leave = dfs(index + 1, m, n);

        return Math.max(take, leave);
    }

    return dfs(0, m, n);
};



// Bottom Up DP


var findMaxForm = function (strs, m, n) {

    let ones = new Array(strs.length).fill(0);
    let zeros = new Array(strs.length).fill(0);

    for (let i = 0; i < strs.length; i++) {
        let word = strs[i];

        for (let j = 0; j < word.length; j++) {
            if (word[j] === '1') ones[i]++;
            else zeros[i]++;
        }
    }

    let dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    

    for (let i = 1; i < strs.length + 1; i++) {
        for (let j = m; j >= 0; j--) {
            for (let k = n; k >= 0; k--) {
                let one = ones[i - 1];
                let zero = zeros[i - 1];

                let take = 0;

                if (k >= one && j >= zero) {
                    take = 1 + dp[j - zero][k - one];
                }

                let leave = dp[j][k];

                dp[j][k] = Math.max(take, leave);
            }
        }
    }


    return dp[m][n];
};