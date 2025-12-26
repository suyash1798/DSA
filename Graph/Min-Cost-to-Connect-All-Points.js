/*

You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].

The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.

Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

 

Example 1:


Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20
Explanation: 

We can connect the points as shown above to get the minimum cost of 20.
Notice that there is a unique path between every pair of points.
Example 2:

Input: points = [[3,12],[-2,5],[-4,1]]
Output: 18
 

Constraints:

1 <= points.length <= 1000
-106 <= xi, yi <= 106
All pairs (xi, yi) are distinct.

*/




/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function(points) {
    let n = points.length;

    let heap = new MinPriorityQueue((a) => a[1]), visited = new Array(n).fill(false);
    let cost = 0;

    heap.push([0, 0]);

    while(heap.size()){
        let [node, distance] = heap.pop();

        if(visited[node]) continue;

        visited[node] = true;

        cost += distance;

        for(let i = 0; i < n; i++){
            if(visited[i]) continue;
            
            let val = Math.abs(points[i][0] - points[node][0]) + Math.abs(points[i][1] - points[node][1]);

            heap.push([i, val]);
        }
    }

    return cost;
};