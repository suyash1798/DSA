/*

You are given the head of a linked list with n nodes.

For each node in the list, find the value of the next greater node. That is, for each node, find the value of the first node that is next to it and has a strictly larger value than it.

Return an integer array answer where answer[i] is the value of the next greater node of the ith node (1-indexed). If the ith node does not have a next greater node, set answer[i] = 0.

 

Example 1:


Input: head = [2,1,5]
Output: [5,5,0]
Example 2:


Input: head = [2,7,4,3,5]
Output: [7,0,5,5,0]


*/


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */


/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nextLargerNodes = function (head) {
    let [newHead, n] = reverse(head); stack = [], result = new Array(n).fill(0), index = n - 1;

    while (newHead) {
        let value = newHead.val;

        while (stack.length && stack[stack.length - 1] <= value) stack.pop();

        if (stack.length) {
            result[index] = stack[stack.length - 1];
        }
        index--;
        stack.push(value);
        newHead = newHead.next;
    }

    return result;
};

var reverse = function (head) {
    let prev = null, n = 0;

    while (head) {
        let next = head.next;
        head.next = prev;
        prev = head;
        head = next;
        n++;
    }

    return [prev, n];
}