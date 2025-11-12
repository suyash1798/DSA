/*

Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

Return the number of closed islands.

 

Example 1:



Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
Output: 2
Explanation: 
Islands in gray are closed because they are completely surrounded by water (group of 1s).
Example 2:



Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
Output: 1
Example 3:

Input: grid = [[1,1,1,1,1,1,1],
               [1,0,0,0,0,0,1],
               [1,0,1,1,1,0,1],
               [1,0,1,0,1,0,1],
               [1,0,1,1,1,0,1],
               [1,0,0,0,0,0,1],
               [1,1,1,1,1,1,1]]
Output: 2
 

Constraints:

1 <= grid.length, grid[0].length <= 100
0 <= grid[i][j] <=1


*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function(grid) {
    let n = grid.length, m = grid[0].length, 
    visited = new Array(n).fill(0).map(() => new Array(m).fill(false));


    function dfs(row, col){
        if(row < 0 || row >= n || col < 0 || col >= m) return false;

        if(grid[row][col] === 1) return true;

        if(visited[row][col]) return true;

        visited[row][col] = true;

        let up = dfs(row +1, col);
        let down = dfs(row-1, col);
        let right = dfs(row,col+1);
        let left = dfs(row, col-1);

        return left && right && up && down;
    }

    let count = 0;

    for(let i=1;i<n-1;i++){
        for(let j=1;j<m-1;j++){
            if(visited[i][j] || grid[i][j] === 1) continue;

            if(dfs(i, j)) count++;
        }
    }
    
    return count;
};
