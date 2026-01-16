/*

There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

 

Example 1:


Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
Example 2:


Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
 

Constraints:

1 <= n <= 200
n == isConnected.length
n == isConnected[i].length
isConnected[i][j] is 1 or 0.
isConnected[i][i] == 1
isConnected[i][j] == isConnected[j][i]

*/



/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
    let n = isConnected.length;
    let parents = new Array(n).fill(0).map((e, i) => i);
    let ranks = new Array(n).fill(0);

    function findParent(node) {
        if (parents[node] !== node) {
            parents[node] = findParent(parents[node]);
        }

        return parents[node];
    }

    function union(a, b) {
        let pa = findParent(a);
        let pb = findParent(b);

        if (pa === pb) return;

        if (ranks[pa] > ranks[pb]) {
            parents[pb] = pa;
        } else if (ranks[pa] < ranks[pb]) {
            parents[pa] = pb;
        } else {
            ranks[pa]++;
            parents[pb] = pa;
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (isConnected[i][j] === 1) {
                union(i, j);
            }
        }
    }

    let set = new Set();

    for (let i = 0; i < n; i++) {
        set.add(findParent(i));
    }

    return set.size;
};