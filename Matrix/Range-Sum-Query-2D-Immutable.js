/*

Given a 2D matrix matrix, handle multiple queries of the following type:

Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
Implement the NumMatrix class:

NumMatrix(int[][] matrix) Initializes the object with the integer matrix matrix.
int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
You must design an algorithm where sumRegion works on O(1) time complexity.

 

Example 1:


Input
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
Output
[null, 8, 11, 12]

Explanation
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)
numMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle)
numMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 200
-104 <= matrix[i][j] <= 104
0 <= row1 <= row2 < m
0 <= col1 <= col2 < n
At most 104 calls will be made to sumRegion.

*/



/**
 * @param {number[][]} matrix
 */
var NumMatrix = function (matrix) {
    let m = matrix.length, n = matrix[0].length;
    let prefixSum = new Array(m).fill(0).map(() => Array(n));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let sum = matrix[i][j];

            if (i > 0) {
                sum += prefixSum[i - 1][j];
            }

            if (j > 0) {
                sum += prefixSum[i][j - 1];
            }

            if (i > 0 && j > 0) {
                sum -= prefixSum[i - 1][j - 1];
            }

            prefixSum[i][j] = sum;
        }
    }

    this.prefixSum = prefixSum;
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
    let sum = this.prefixSum[row2][col2];

    if (col1 > 0) {
        sum -= this.prefixSum[row2][col1 - 1];
    }

    if (row1 > 0) {
        sum -= this.prefixSum[row1 - 1][col2];
    }

    if (col1 > 0 && row1 > 0) {
        sum += this.prefixSum[row1 - 1][col1 - 1];
    }

    return sum;
};

/** 
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */