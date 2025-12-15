/*

Given an integer array nums, return the length of the longest strictly increasing subsequence.

 

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
 

Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104


*/




/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    let dp = new Array(nums.length).fill(1);

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], 1 + dp[j]);
            }
        }
    }

    return Math.max(...dp);
};





/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    let dp = new Array(nums.length).fill(0);

    function dfs(index){
        if(index === nums.length) return 0;

        if(dp[index] !== 0) return dp[index];

        let len = 0;

        for(let i = index; i < nums.length; i++){
            if(nums[index] >= nums[i]) continue;

            len = Math.max(len, dfs(i));
        }

        return dp[index] = 1 + len;
    }

    let max = 0;

    for(let i = 0; i < nums.length; i++){
        max = Math.max(max, dfs(i));
    }

    return max;
};