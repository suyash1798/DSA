/*

Given a m x n matrix mat and an integer k, return a matrix answer where each answer[i][j] is the sum of all elements mat[r][c] for:

i - k <= r <= i + k,
j - k <= c <= j + k, and
(r, c) is a valid position in the matrix.
 

Example 1:

Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[12,21,16],[27,45,33],[24,39,28]]
Example 2:

Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 2
Output: [[45,45,45],[45,45,45],[45,45,45]]
 

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n, k <= 100
1 <= mat[i][j] <= 100


*/



/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[][]}
 */
var matrixBlockSum = function (mat, k) {
    let m = mat.length, n = mat[0].length;
    let prefix = new Array(m).fill(0).map(() => new Array(n).fill(0));
    let answer = new Array(m).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            prefix[i][j] = mat[i][j];

            if (i > 0) {
                prefix[i][j] += prefix[i - 1][j];
            }
            if (j > 0) {
                prefix[i][j] += prefix[i][j - 1];
            }
            if (i > 0 && j > 0) {
                prefix[i][j] -= prefix[i - 1][j - 1];
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let endRow = Math.min(i + k, m - 1);
            let endCol = Math.min(j + k, n - 1);
            let startRow = Math.max(i - k, 0);
            let startCol = Math.max(j - k, 0);

            answer[i][j] = prefix[endRow][endCol];

            if (startRow > 0) {
                answer[i][j] -= prefix[startRow - 1][endCol];
            }
            if (startCol > 0) {
                answer[i][j] -= prefix[endRow][startCol - 1];
            }
            if (startRow > 0 && startCol > 0) {
                answer[i][j] += prefix[startRow - 1][startCol - 1];
            }
        }
    }

    return answer;
};