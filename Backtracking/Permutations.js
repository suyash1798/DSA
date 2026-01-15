/*

Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]
Example 3:

Input: nums = [1]
Output: [[1]]
 

Constraints:

1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.

*/


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    let n = nums.length;
    let visited = new Array(n).fill(false);
    let output = [];
    let comb = [];

    function backtracking() {
        if (comb.length === n) {
            output.push([...comb]);
            return;
        }

        for (let i = 0; i < n; i++) {
            if (visited[i]) continue;

            visited[i] = true;
            comb.push(nums[i]);

            backtracking();

            visited[i] = false;
            comb.pop();
        }
    }

    backtracking();

    return output;
};