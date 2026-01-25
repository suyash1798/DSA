/*

You have k lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the k lists.

We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.

 

Example 1:

Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation: 
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].
Example 2:

Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]
 

Constraints:

nums.length == k
1 <= k <= 3500
1 <= nums[i].length <= 50
-105 <= nums[i][j] <= 105
nums[i] is sorted in non-decreasing order.


*/


/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function (nums) {
    let minHeap = new MinPriorityQueue((a) => a[0]);
    let k = nums.length;
    let maxValue = -Infinity;
    let minRange = [-Infinity, Infinity];

    for (let i = 0; i < k; i++) {
        minHeap.push([nums[i][0], i, 0]);
        maxValue = Math.max(maxValue, nums[i][0]);
    }

    while (minHeap.size()) {
        let [minValue, listIndex, index] = minHeap.pop();
        let [r1, r2] = minRange;

        if (r2 - r1 > maxValue - minValue) {
            minRange = [minValue, maxValue];
        }

        if (index + 1 === nums[listIndex].length) break;

        minHeap.push([nums[listIndex][index + 1], listIndex, index + 1]);

        maxValue = Math.max(maxValue, nums[listIndex][index + 1]);
    }

    return minRange;
};