/*

Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).

 

Example 1:


Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]
Example 2:

Input: root = [1,2,3]
Output: [1,3]
 

Constraints:

The number of nodes in the tree will be in the range [0, 104].
-231 <= Node.val <= 231 - 1


*/



/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function(root) {
    if(!root) return [];

    let queue = [root]; result = [];

    while(queue.length){
        let max = -Infinity, nextQ = [];

        while(queue.length){
            let node = queue.shift();

            max = Math.max(max, node.val);

            if(node.left) nextQ.push(node.left);
            if(node.right) nextQ.push(node.right);
        }

        queue = nextQ;
        result.push(max);
    }

    return result;
};