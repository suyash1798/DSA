/*

You are given an array start where start = [startX, startY] represents your initial position (startX, startY) in a 2D space. You are also given the array target where target = [targetX, targetY] represents your target position (targetX, targetY).

The cost of going from a position (x1, y1) to any other position in the space (x2, y2) is |x2 - x1| + |y2 - y1|.

There are also some special roads. You are given a 2D array specialRoads where specialRoads[i] = [x1i, y1i, x2i, y2i, costi] indicates that the ith special road goes in one direction from (x1i, y1i) to (x2i, y2i) with a cost equal to costi. You can use each special road any number of times.

Return the minimum cost required to go from (startX, startY) to (targetX, targetY).

 

Example 1:

Input: start = [1,1], target = [4,5], specialRoads = [[1,2,3,3,2],[3,4,4,5,1]]

Output: 5

Explanation:

(1,1) to (1,2) with a cost of |1 - 1| + |2 - 1| = 1.
(1,2) to (3,3). Use specialRoads[0] with the cost 2.
(3,3) to (3,4) with a cost of |3 - 3| + |4 - 3| = 1.
(3,4) to (4,5). Use specialRoads[1] with the cost 1.
So the total cost is 1 + 2 + 1 + 1 = 5.

Example 2:

Input: start = [3,2], target = [5,7], specialRoads = [[5,7,3,2,1],[3,2,3,4,4],[3,3,5,5,5],[3,4,5,6,6]]

Output: 7

Explanation:

It is optimal not to use any special edges and go directly from the starting to the ending position with a cost |5 - 3| + |7 - 2| = 7.

Note that the specialRoads[0] is directed from (5,7) to (3,2).

Example 3:

Input: start = [1,1], target = [10,4], specialRoads = [[4,2,1,1,3],[1,2,7,4,4],[10,3,6,1,2],[6,1,1,2,3]]

Output: 8

Explanation:

(1,1) to (1,2) with a cost of |1 - 1| + |2 - 1| = 1.
(1,2) to (7,4). Use specialRoads[1] with the cost 4.
(7,4) to (10,4) with a cost of |10 - 7| + |4 - 4| = 3.
 

Constraints:

start.length == target.length == 2
1 <= startX <= targetX <= 105
1 <= startY <= targetY <= 105
1 <= specialRoads.length <= 200
specialRoads[i].length == 5
startX <= x1i, x2i <= targetX
startY <= y1i, y2i <= targetY
1 <= costi <= 105


*/





/**
 * @param {number[]} start
 * @param {number[]} target
 * @param {number[][]} specialRoads
 * @return {number}
 */
var minimumCost = function (start, target, specialRoads) {
    let map = new Map();
    let getNode = (cor) => {
        let key = cor[0] + ':' + cor[1];
        map.set(key, cor);
        return key;
    };
    let graph = {};
    let getCor = (node) => {
        return map.get(node);
    };
    let minCost = Math.abs(start[0] - target[0]) + Math.abs(start[1] - target[1]);
    let nodes = new Set();

    for (let [x1, y1, x2, y2, c] of specialRoads) {
        let from = getNode([x1, y1]);
        let to = getNode([x2, y2]);

        if (!graph[from]) graph[from] = [];
        graph[from].push([to, c]);

        nodes.add(from);
        nodes.add(to);
    }

    let heap = new MinPriorityQueue((a) => a[1]);
    let distance = new Map();

    heap.push([getNode(start), 0]);

    while (heap.size()) {
        let [node, cost] = heap.pop();
        let [x, y] = getCor(node);

        if (cost >= minCost) continue;
        if (cost >= (distance.get(node) || Infinity)) continue;

        distance.set(node, cost);

        minCost = Math.min(minCost, cost + Math.abs(+x - target[0]) + Math.abs(+y - target[1]));

        for (let [n, c] of (graph[node] || [])) {
            if (n === node) continue;
            let [nx, ny] = getCor(n);
            let min = Math.min(c, Math.abs(+nx - +x) + Math.abs(+ny - +y));
            if ((distance.get(n) || Infinity) < (cost + min)) continue;
            heap.push([n, cost + min]);
        }

        for (let n of nodes.values()) {
            if (n === node) continue;
            let [nx, ny] = getCor(n);
            let c = cost + Math.abs(nx - x) + Math.abs(ny - y);

            if ((distance.get(n) || Infinity) < c) continue;
            heap.push([n, c]);
        }
    }

    return minCost;
};