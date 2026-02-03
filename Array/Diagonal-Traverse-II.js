/*

Given a 2D integer array nums, return all elements of nums in diagonal order as shown in the below images.

 

Example 1:


Input: nums = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,4,2,7,5,3,8,6,9]
Example 2:


Input: nums = [[1,2,3,4,5],[6,7],[8],[9,10,11],[12,13,14,15,16]]
Output: [1,6,2,8,7,3,9,4,12,10,5,13,11,14,15,16]
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i].length <= 105
1 <= sum(nums[i].length) <= 105
1 <= nums[i][j] <= 105

*/



/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var findDiagonalOrder = function (nums) {
    let n = nums.length;
    let daig = new Array();
    let output = [];

    for (let i = 0; i < n; i++) {
        let m = nums[i].length;

        for (let j = 0; j < m; j++) {

            if (!daig[i + j]) daig[i + j] = new Array();

            daig[i + j].push(nums[i][j]);
        }
    }

    for (let i = 0; i < daig.length; i++) {
        if (daig[i].length) {
            output.push(...daig[i].reverse());
        }
    }

    return output;
};