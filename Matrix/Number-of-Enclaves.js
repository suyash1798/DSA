/*

You are given an m x n binary matrix grid, where 0 represents a sea cell and 1 represents a land cell.

A move consists of walking from one land cell to another adjacent (4-directionally) land cell or walking off the boundary of the grid.

Return the number of land cells in grid for which we cannot walk off the boundary of the grid in any number of moves.

 

Example 1:


Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
Output: 3
Explanation: There are three 1s that are enclosed by 0s, and one 1 that is not enclosed because its on the boundary.
Example 2:


Input: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
Output: 0
Explanation: All 1s are either on the boundary or can reach the boundary.


*/



/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function (grid) {
    let m = grid.length; n = grid[0].length;
    let count = 0;

    function dfs(row, col) {
        if (row < 0 || col < 0 || row >= m || col >= n) return;

        if(grid[row][col] === 0) return;

        grid[row][col] = 0;

        dfs(row - 1, col)
        dfs(row + 1, col) 
        dfs(row, col + 1) 
        dfs(row, col - 1);
    }

    for(let row = 0; row < m; row++){
        for(let col = 0; col < n; col++){
            if(row !== 0 && col !== 0 && row !== m-1 && col !== n-1) continue;

            dfs(row, col);
        }
    }

    for(let row = 0; row < m; row++){
        for(let col = 0; col < n; col++){
            if(grid[row][col] === 1) count++;
        }
    }

    return count;
};