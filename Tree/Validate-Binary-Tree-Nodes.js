/*

You have n binary tree nodes numbered from 0 to n - 1 where node i has two children leftChild[i] and rightChild[i], return true if and only if all the given nodes form exactly one valid binary tree.

If node i has no left child then leftChild[i] will equal -1, similarly for the right child.

Note that the nodes have no values and that we only use the node numbers in this problem.

 

Example 1:


Input: n = 4, leftChild = [1,-1,3,-1], rightChild = [2,-1,-1,-1]
Output: true
Example 2:


Input: n = 4, leftChild = [1,-1,3,-1], rightChild = [2,3,-1,-1]
Output: false
Example 3:


Input: n = 2, leftChild = [1,0], rightChild = [-1,-1]
Output: false
 

Constraints:

n == leftChild.length == rightChild.length
1 <= n <= 104
-1 <= leftChild[i], rightChild[i] <= n - 1

*/


/**
 * @param {number} n
 * @param {number[]} leftChild
 * @param {number[]} rightChild
 * @return {boolean}
 */
var validateBinaryTreeNodes = function (n, leftChild, rightChild) {
    let seen = new Set();
    let roots = new Array(n).fill(true);

    function dfs(root) {
        if (seen.has(root)) return false;

        seen.add(root);

        let left = right = true;

        if (leftChild[root] !== -1) {
            left = dfs(leftChild[root]);
        }

        if (rightChild[root] !== -1) {
            right = dfs(rightChild[root]);
        }

        return left && right;
    }

    for (let i = 0; i < n; i++) {
        if (leftChild[i] !== -1) roots[leftChild[i]] = false;
        if (rightChild[i] !== -1) roots[rightChild[i]] = false;
    }

    let parents = [];

    for (let i = 0; i < n; i++) {
        if (roots[i]) parents.push(i);
    }

    if (parents.length > 1) return false;

    return dfs(parents[0]) && seen.size === n;
};