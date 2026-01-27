/*

You are given an integer array arr.

We split arr into some number of chunks (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.

Return the largest number of chunks we can make to sort the array.

 

Example 1:

Input: arr = [5,4,3,2,1]
Output: 1
Explanation:
Splitting into two or more chunks will not return the required result.
For example, splitting into [5, 4], [3, 2, 1] will result in [4, 5, 1, 2, 3], which isn't sorted.
Example 2:

Input: arr = [2,1,3,4,4]
Output: 4
Explanation:
We can split into two chunks, such as [2, 1], [3, 4, 4].
However, splitting into [2, 1], [3], [4], [4] is the highest number of chunks possible.
 

Constraints:

1 <= arr.length <= 2000
0 <= arr[i] <= 108

*/



/**
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted = function (arr) {
    let expected = [...arr].sort((a, b) => a - b);
    let map = new Map();
    let emap = new Map();

    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        let a = arr[i];
        let e = expected[i];

        map.set(a, (map.get(a) || 0) + 1);
        emap.set(e, (emap.get(e) || 0) + 1);

        let equal = true;

        for (let [key, value] of map.entries()) {
            if (emap.get(key) !== value) {
                equal = false;
                break;
            }
        }

        if (equal) count++;
    }

    return count;
};