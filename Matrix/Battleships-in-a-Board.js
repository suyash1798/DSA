/*

Given an m x n matrix board where each cell is a battleship 'X' or empty '.', return the number of the battleships on board.

Battleships can only be placed horizontally or vertically on board. In other words, they can only be made of the shape 1 x k (1 row, k columns) or k x 1 (k rows, 1 column), where k can be of any size. At least one horizontal or vertical cell separates between two battleships (i.e., there are no adjacent battleships).


Example 1:


Input: board = [["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]]
Output: 2
Example 2:

Input: board = [["."]]
Output: 0


*/


/**
 * @param {character[][]} board
 * @return {number}
 */
var countBattleships = function(board) {
    let m = board.length, n = board[0].length, count = 0;

    function dfs(row, col){
        if(row < 0 || col < 0 || row >= m || col >= n) return;

        if(board[row][col] === '.') return;

        board[row][col] = '.';

        dfs(row+1,col);
        dfs(row-1,col);
        dfs(row,col+1);
        dfs(row,col-1);
    }

    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(board[i][j] === '.') continue;

            dfs(i,j);
            count++;
        }
    }

    return count;
};