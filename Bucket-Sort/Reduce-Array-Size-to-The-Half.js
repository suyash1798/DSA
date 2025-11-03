/*

You are given an integer array arr. You can choose a set of integers and remove all the occurrences of these integers in the array.

Return the minimum size of the set so that at least half of the integers of the array are removed.

 

Example 1:

Input: arr = [3,3,3,3,5,5,5,2,2,7]
Output: 2
Explanation: Choosing {3,7} will make the new array [5,5,5,2,2] which has size 5 (i.e equal to half of the size of the old array).
Possible sets of size 2 are {3,5},{3,2},{5,2}.
Choosing set {2,7} is not possible as it will make the new array [3,3,3,3,5,5,5] which has a size greater than half of the size of the old array.
Example 2:

Input: arr = [7,7,7,7,7,7]
Output: 1
Explanation: The only possible set you can choose is {7}. This will make the new array empty.

 */


/**
 * @param {number[]} arr
 * @return {number}
 */
var minSetSize = function(arr) {
    let n = arr.length;
    let freq = {}, bucket = new Array(n+1).fill(0).map(() => []);

    for(let num of arr){
        freq[num] = (freq[num] || 0) + 1;
    }

    for(let key in freq){
        let count = freq[key];
        bucket[count].push(key);
    }

    let sum = 0, count = 0;

    for(let index = n; index >= 0; index--){
        if(bucket[index].length === 0) continue;

        for(let num of bucket[index]){
            sum += index;
            count++;

            if(sum >= Math.ceil(n/2)) break;
        }
        if(sum >= Math.ceil(n/2)) break;
    }

    return count;
};