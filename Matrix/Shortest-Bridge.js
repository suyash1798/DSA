/*

You are given an n x n binary matrix grid where 1 represents land and 0 represents water.

An island is a 4-directionally connected group of 1's not connected to any other 1's. There are exactly two islands in grid.

You may change 0's to 1's to connect the two islands to form one island.

Return the smallest number of 0's you must flip to connect the two islands.

 

Example 1:

Input: grid = [[0,1],[1,0]]
Output: 1
Example 2:

Input: grid = [[0,1,0],[0,0,0],[0,0,1]]
Output: 2
Example 3:

Input: grid = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
Output: 1
 

Constraints:

n == grid.length == grid[i].length
2 <= n <= 100
grid[i][j] is either 0 or 1.
There are exactly two islands in grid.

*/



/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestBridge = function (grid) {
    let n = grid.length, count = 0, queue = [];

    function markIsland(row, col) {
        if (row < 0 || col < 0 || row >= n || col >= n) return;

        if (grid[row][col] !== 1) return;

        grid[row][col] = 2;
        queue.push([row, col]);

        markIsland(row + 1, col);
        markIsland(row - 1, col);
        markIsland(row, col + 1);
        markIsland(row, col - 1);
    }

    for (let i = 0; i < n; i++) {
        let found = false;
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                markIsland(i, j)
                found = true;
                break;
            }
        }
        if (found) break;
    }

    let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    while (queue.length) {
        let nextQueue = [];

        while (queue.length) {
            let [row, col] = queue.shift();

            for (let [x, y] of directions) {
                let nRow = row + x;
                let nCol = col + y;

                if (nRow < 0 || nCol < 0 || nRow >= n || nCol >= n) continue;

                if (grid[nRow][nCol] === 1) {
                    return count;
                }
                if (grid[nRow][nCol] === 2) continue;

                grid[nRow][nCol] = 2;
                nextQueue.push([nRow, nCol]);
            }
        }

        queue = nextQueue;
        count++;
    }

    return -1;
};