/*

Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at least one permutation of the node values in the path is a palindrome.

Return the number of pseudo-palindromic paths going from the root node to leaf nodes.

 

Example 1:



Input: root = [2,3,1,3,1,null,1]
Output: 2 
Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the red path [2,3,3], the green path [2,1,1], and the path [2,3,1]. Among these paths only red path and green path are pseudo-palindromic paths since the red path [2,3,3] can be rearranged in [3,2,3] (palindrome) and the green path [2,1,1] can be rearranged in [1,2,1] (palindrome).
Example 2:



Input: root = [2,1,1,1,3,null,null,null,null,null,1]
Output: 1 
Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the green path [2,1,1], the path [2,1,3,1], and the path [2,1]. Among these paths only the green path is pseudo-palindromic since [2,1,1] can be rearranged in [1,2,1] (palindrome).
Example 3:

Input: root = [9]
Output: 1


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
var pseudoPalindromicPaths = function (root) {
    let count = 0, freq = new Array(10).fill(0);

    function dfs(root, freq) {
        if (!root) return;

        freq[root.val]++;

        if (!root.left && !root.right) {
            let odd = 0;

            for (let i = 1; i < 10; i++) {
                freq[i] % 2 !== 0 && odd++;

                if (odd === 2) break;
            }

            if (odd <= 1) count++;
            freq[root.val]--;
            return;
        }

        dfs(root.left, freq);
        dfs(root.right, freq);

        freq[root.val]--;
    }

    dfs(root, freq);
    return count;
};


/***         Masking Optmised              */



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
var pseudoPalindromicPaths = function (root) {

    function dfs(root, mask) {
        if (!root) return 0;

        mask = mask ^ (1 << root.val);

        if (!root.left && !root.right) {
            return (mask & (mask - 1)) === 0 ? 1 : 0;
        }

        return dfs(root.left, mask) + dfs(root.right, mask);
    }

    return dfs(root, 0);
};