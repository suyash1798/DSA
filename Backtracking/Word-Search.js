/*

Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

 

Example 1:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
Example 2:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
Example 3:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
 

Constraints:

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.

*/


/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    let m = board.length, n = board[0].length;
    let dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    function dfs(row, col, index) {

        if (index === word.length) return true;

        if (row < 0 || col < 0 || row >= m || col >= n) {
            return false;
        }

        if (board[row][col] !== word[index]) return false;

        let val = board[row][col];

        board[row][col] = '0';

        for (let [r, c] of dirs) {
            if (dfs(row + r, col + c, index + 1)) return true;
        }

        board[row][col] = val;

        return false;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }

    return false;
};