/*

Given the root of a binary tree, return the leftmost value in the last row of the tree.

 

Example 1:


Input: root = [2,1,3]
Output: 1
Example 2:


Input: root = [1,2,3,4,null,5,6,null,null,7]
Output: 7

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
 * @return {number}
 */
var findBottomLeftValue = function(root) {
    let queue = [root], left = null;

    while(queue.length){
        let nextQ = [];
        left = null;

        while(queue.length){
            let node = queue.shift();

            !left && (left = node);

            if(node.left) nextQ.push(node.left);
            if(node.right) nextQ.push(node.right);
        }

        queue = nextQ;
    }

    return left.val;
};