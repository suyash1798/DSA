/*

You are given an m x n matrix grid of positive integers. Your task is to determine if it is possible to make either one horizontal or one vertical cut on the grid such that:

Each of the two resulting sections formed by the cut is non-empty.
The sum of the elements in both sections is equal.
Return true if such a partition exists; otherwise return false.

 

Example 1:

Input: grid = [[1,4],[2,3]]

Output: true

Explanation:



A horizontal cut between row 0 and row 1 results in two non-empty sections, each with a sum of 5. Thus, the answer is true.

Example 2:

Input: grid = [[1,3],[2,4]]

Output: false

Explanation:

No horizontal or vertical cut results in two non-empty sections with equal sums. Thus, the answer is false.

 

Constraints:

1 <= m == grid.length <= 105
1 <= n == grid[i].length <= 105
2 <= m * n <= 105
1 <= grid[i][j] <= 105


*/



/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var canPartitionGrid = function (grid) {
    let m = grid.length, n = grid[0].length;
    let rowSum = new Array(m).fill(0), colSum = new Array(n).fill(0), total = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            rowSum[i] += grid[i][j];
            colSum[j] += grid[i][j];
            total += grid[i][j];
        }
    }

    let target = total / 2, sum = 0;

    for (let i = 0; i < m; i++) {
        sum += rowSum[i];
        if(sum === target)  return true;
    }

    sum = 0;

    for (let i = 0; i < n; i++) {
        sum += colSum[i];
        if(sum === target)  return true;
    }

    return false;  
};