/*

Given two arrays nums1 and nums2.

Return the maximum dot product between non-empty subsequences of nums1 and nums2 with the same length.

A subsequence of a array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, [2,3,5] is a subsequence of [1,2,3,4,5] while [1,5,3] is not).

 

Example 1:

Input: nums1 = [2,1,-2,5], nums2 = [3,0,-6]
Output: 18
Explanation: Take subsequence [2,-2] from nums1 and subsequence [3,-6] from nums2.
Their dot product is (2*3 + (-2)*(-6)) = 18.
Example 2:

Input: nums1 = [3,-2], nums2 = [2,-6,7]
Output: 21
Explanation: Take subsequence [3] from nums1 and subsequence [7] from nums2.
Their dot product is (3*7) = 21.
Example 3:

Input: nums1 = [-1,-1], nums2 = [1,1]
Output: -1
Explanation: Take subsequence [-1] from nums1 and subsequence [1] from nums2.
Their dot product is -1.
 

Constraints:

1 <= nums1.length, nums2.length <= 500
-1000 <= nums1[i], nums2[i] <= 1000

*/



/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDotProduct = function (nums1, nums2) {
    let memo = new Array(nums1.length).fill(0).map(() => new Array(nums2.length).fill(-1));

    function dfs(i1, i2) {
        if (i1 === nums1.length || i2 === nums2.length) return -Infinity;

        if (memo[i1][i2] !== -1) return memo[i1][i2];

        let max = -Infinity;

        max = Math.max(max, (nums1[i1] * nums2[i2]) + Math.max(0, dfs(i1 + 1, i2 + 1)));
        max = Math.max(max, dfs(i1 + 1, i2));
        max = Math.max(max, dfs(i1, i2 + 1));

        return memo[i1][i2] = max;
    }

    return dfs(0, 0);
};


var maxDotProduct = function (nums1, nums2) {
    let dp = new Array(nums1.length + 1).fill(0).map(() => new Array(nums2.length + 1).fill(-Infinity));

    for (let i = nums1.length - 1; i >= 0; i--) {
        for (let j = nums2.length - 1; j >= 0; j--) {

            dp[i][j] = Math.max(nums1[i] * nums2[j] + Math.max(0, dp[i + 1][j + 1]));
            dp[i][j] = Math.max(dp[i][j], dp[i + 1][j], dp[i][j + 1]);
            
        }
    }

    return dp[0][0];
};
