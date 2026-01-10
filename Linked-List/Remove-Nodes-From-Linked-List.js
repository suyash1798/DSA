/*

You are given the head of a linked list.

Remove every node which has a node with a greater value anywhere to the right side of it.

Return the head of the modified linked list.

 

Example 1:


Input: head = [5,2,13,3,8]
Output: [13,8]
Explanation: The nodes that should be removed are 5, 2 and 3.
- Node 13 is to the right of node 5.
- Node 13 is to the right of node 2.
- Node 8 is to the right of node 3.
Example 2:

Input: head = [1,1,1,1]
Output: [1,1,1,1]
Explanation: Every node has value 1, so no nodes are removed.
 

Constraints:

The number of the nodes in the given list is in the range [1, 105].
1 <= Node.val <= 105


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
 * @return {ListNode}
 */
var removeNodes = function (head) {
    let rhead = reverse(head);
    let dummy = new ListNode(0);
    let newHead = dummy;
    let max = 0;

    while (rhead) {

        if (rhead.val >= max) {
            dummy.next = rhead;
            dummy = dummy.next;
            max = rhead.val;
        }

        rhead = rhead.next;
    }

    dummy.next = null;

    return reverse(newHead.next);
};

var reverse = function (head) {
    let prev = null;

    while (head) {
        let next = head.next;

        head.next = prev;
        prev = head;
        head = next;
    }

    return prev;
};