/*

You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.

Return the size of the largest island in grid after applying this operation.

An island is a 4-directionally connected group of 1s.

 

Example 1:

Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
Example 2:

Input: grid = [[1,1],[1,0]]
Output: 4
Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.
Example 3:

Input: grid = [[1,1],[1,1]]
Output: 4
Explanation: Can't change any 0 to 1, only one island with area = 4.
 

Constraints:

n == grid.length
n == grid[i].length
1 <= n <= 500
grid[i][j] is either 0 or 1.

*/



/**
 * @param {number[][]} grid
 * @return {number}
 */
var largestIsland = function (grid) {
    let n = grid.length;
    let dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    let dsu = new DSU(n * n);

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 0) continue;

            for (let [r, c] of dirs) {
                let nr = row + r;
                let nc = col + c;

                if (nr < 0 || nc < 0 || nr >= n || nc >= n) continue;

                if (grid[nr][nc] === 0) continue;

                dsu.union((row * n) + col, (nr * n) + nc);
            }
        }
    }

    let max = 0;

    for (let i = 0; i < n * n; i++) {
        if (i === dsu.parents[i]) max = Math.max(max, dsu.size[i]);
    }

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] !== 0) continue;

            let count = 1, uni = new Set();

            for (let [r, c] of dirs) {
                let nr = row + r;
                let nc = col + c;

                if (nr < 0 || nc < 0 || nr >= n || nc >= n) continue;

                if (grid[nr][nc] === 0) continue;

                let parent = dsu.findParent(nr * n + nc);

                if (uni.has(parent)) continue;
                uni.add(parent);

                count += dsu.size[parent];
            }

            max = Math.max(max, count);
        }
    }

    return max;
};

class DSU {

    constructor(n) {
        this.parents = new Array(n).fill(0).map((e, i) => i);
        this.ranks = new Array(n).fill(0);
        this.size = new Array(n).fill(1);
    }

    findParent(x) {
        if (this.parents[x] !== x) {
            this.parents[x] = this.findParent(this.parents[x]);
        }

        return this.parents[x];
    }

    union(a, b) {
        let pa = this.findParent(a);
        let pb = this.findParent(b);

        if (pa === pb) return true;

        if (this.ranks[pa] > this.ranks[pb]) {
            this.parents[pb] = pa;
            this.size[pa] += this.size[pb];
        } else if (this.ranks[pa] < this.ranks[pb]) {
            this.parents[pa] = pb;
            this.size[pb] += this.size[pa];
        } else {
            this.ranks[pa]++;
            this.parents[pb] = pa;
            this.size[pa] += this.size[pb];
        }

        return false;
    }
}