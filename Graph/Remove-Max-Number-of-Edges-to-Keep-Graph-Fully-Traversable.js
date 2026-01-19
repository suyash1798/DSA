/*

Alice and Bob have an undirected graph of n nodes and three types of edges:

Type 1: Can be traversed by Alice only.
Type 2: Can be traversed by Bob only.
Type 3: Can be traversed by both Alice and Bob.
Given an array edges where edges[i] = [typei, ui, vi] represents a bidirectional edge of type typei between nodes ui and vi, find the maximum number of edges you can remove so that after removing the edges, the graph can still be fully traversed by both Alice and Bob. The graph is fully traversed by Alice and Bob if starting from any node, they can reach all other nodes.

Return the maximum number of edges you can remove, or return -1 if Alice and Bob cannot fully traverse the graph.

 

Example 1:



Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]
Output: 2
Explanation: If we remove the 2 edges [1,1,2] and [1,1,3]. The graph will still be fully traversable by Alice and Bob. Removing any additional edge will not make it so. So the maximum number of edges we can remove is 2.
Example 2:



Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]
Output: 0
Explanation: Notice that removing any edge will not make the graph fully traversable by Alice and Bob.
Example 3:



Input: n = 4, edges = [[3,2,3],[1,1,2],[2,3,4]]
Output: -1
Explanation: In the current graph, Alice cannot reach node 4 from the other nodes. Likewise, Bob cannot reach 1. Therefore it's impossible to make the graph fully traversable.
 

 

Constraints:

1 <= n <= 105
1 <= edges.length <= min(105, 3 * n * (n - 1) / 2)
edges[i].length == 3
1 <= typei <= 3
1 <= ui < vi <= n
All tuples (typei, ui, vi) are distinct.
 

*/



/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var maxNumEdgesToRemove = function (n, edges) {
    let aliceDSU = new DSU(n + 1);
    let bobDSU = new DSU(n + 1);
    let count = 0;

    edges.sort((a, b) => b[0] - a[0])

    for (let [t, a, b] of edges) {
        if (t === 1) {
            if (aliceDSU.union(a, b)) count++;
        } else if (t === 2) {
            if (bobDSU.union(a, b)) count++;
        } else {
            let alice = aliceDSU.union(a, b);
            let bob = bobDSU.union(a, b);

            if (alice || bob) count++;
        }
    }

    if (aliceDSU.count !== n - 1 || bobDSU.count !== n - 1) return -1;

    return edges.length - count;
};

class DSU {

    constructor(n) {
        this.parents = new Array(n).fill(0).map((e, i) => i);
        this.ranks = new Array(n).fill(0);
        this.count = 0;
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

        if (pa === pb) return false;

        if (this.ranks[pa] > this.ranks[pb]) {
            this.parents[pb] = pa;
        } else if (this.ranks[pa] < this.ranks[pb]) {
            this.parents[pa] = pb;
        } else {
            this.ranks[pa]++;
            this.parents[pb] = pa;
        }
        this.count++;

        return true;
    }
}