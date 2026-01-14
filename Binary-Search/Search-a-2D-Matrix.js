/*

You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.

 

Example 1:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
Example 2:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 100
-104 <= matrix[i][j], target <= 104

*/



/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    let m = matrix.length, n = matrix[0].length;
    let rs = 0, re = m - 1;

    while (rs <= re) {
        let mid = rs + Math.floor((re - rs) / 2);

        if (target >= matrix[mid][0] && target <= matrix[mid][n - 1]) {
            let cs = 0, ce = n - 1;

            while (cs <= ce) {
                let mc = cs + Math.floor((ce - cs) / 2);

                if (matrix[mid][mc] === target) {
                    return true;
                }

                if (matrix[mid][mc] < target) {
                    cs = mc + 1;
                } else {
                    ce = mc - 1;
                }
            }

            return false;
        }

        if (target < matrix[mid][0]) {
            re = mid - 1;
        } else {
            rs = mid + 1;
        }
    }

    return false;
};