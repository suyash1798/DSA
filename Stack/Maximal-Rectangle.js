/*

Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

 

Example 1:


Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.
Example 2:

Input: matrix = [["0"]]
Output: 0
Example 3:

Input: matrix = [["1"]]
Output: 1
 

Constraints:

rows == matrix.length
cols == matrix[i].length
1 <= rows, cols <= 200
matrix[i][j] is '0' or '1'.


*/



/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
    let n = matrix.length, m = matrix[0].length;
    let heights = new Array(m + 1).fill(0), max = 0;

    for (let row of matrix) {
        for (let i = 0; i < m; i++) {
            heights[i] = row[i] === "0" ? 0 : (heights[i] + 1);
        }

        let stack = [];

        for (let i = 0; i < m + 1; i++) {
            while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
                let mid = stack.pop();
                let left = stack.length ? stack[stack.length - 1] + 1 : 0;
                let right = i - 1;

                max = Math.max(max, heights[mid] * (right - left + 1));
            }

            stack.push(i);
        }
    }

    return max;
};