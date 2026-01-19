/*

You are given a 0-indexed 2D integer array grid of size m x n. Each cell has one of two values:

0 represents an empty cell,
1 represents an obstacle that may be removed.
You can move up, down, left, or right from and to an empty cell.

Return the minimum number of obstacles to remove so you can move from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1).

 

Example 1:


Input: grid = [[0,1,1],[1,1,0],[1,1,0]]
Output: 2
Explanation: We can remove the obstacles at (0, 1) and (0, 2) to create a path from (0, 0) to (2, 2).
It can be shown that we need to remove at least 2 obstacles, so we return 2.
Note that there may be other ways to remove 2 obstacles to create a path.
Example 2:


Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]
Output: 0
Explanation: We can move from (0, 0) to (2, 4) without removing any obstacles, so we return 0.
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 105
2 <= m * n <= 105
grid[i][j] is either 0 or 1.
grid[0][0] == grid[m - 1][n - 1] == 0


*/



/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumObstacles = function (grid) {
    let m = grid.length, n = grid[0].length;
    let dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    let visited = new Array(m).fill(0).map(() => new Array(n).fill(false));

    let heap = new MinPriorityQueue((a) => a[2]);

    heap.push([0, 0, 0]);

    while (heap.size()) {
        let [row, col, obs] = heap.pop();

        if (row === m - 1 && col === n - 1) return obs;

        for (let [r, c] of dirs) {
            let nr = row + r;
            let nc = col + c;

            if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;

            if (visited[nr][nc]) continue;

            visited[nr][nc] = true;

            heap.push([nr, nc, obs + grid[nr][nc]]);
        }
    }
};