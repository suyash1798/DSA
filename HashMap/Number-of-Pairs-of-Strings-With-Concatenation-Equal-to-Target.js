/*

Given an array of digit strings nums and a digit string target, return the number of pairs of indices (i, j) (where i != j) such that the concatenation of nums[i] + nums[j] equals target.

 

Example 1:

Input: nums = ["777","7","77","77"], target = "7777"
Output: 4
Explanation: Valid pairs are:
- (0, 1): "777" + "7"
- (1, 0): "7" + "777"
- (2, 3): "77" + "77"
- (3, 2): "77" + "77"
Example 2:

Input: nums = ["123","4","12","34"], target = "1234"
Output: 2
Explanation: Valid pairs are:
- (0, 1): "123" + "4"
- (2, 3): "12" + "34"
Example 3:

Input: nums = ["1","1","1"], target = "11"
Output: 6
Explanation: Valid pairs are:
- (0, 1): "1" + "1"
- (1, 0): "1" + "1"
- (0, 2): "1" + "1"
- (2, 0): "1" + "1"
- (1, 2): "1" + "1"
- (2, 1): "1" + "1"
 

Constraints:

2 <= nums.length <= 100
1 <= nums[i].length <= 100
2 <= target.length <= 100
nums[i] and target consist of digits.
nums[i] and target do not have leading zeros.


*/



/**
 * @param {string[]} nums
 * @param {string} target
 * @return {number}
 */
var numOfPairs = function (nums, target) {
    let count = 0, len = nums.length, freq = new Map();
    let tl = target.length;

    for (let num of nums) {
        if (!freq.has(num)) freq.set(num, 0);

        freq.set(num, freq.get(num) + 1);
    }

    for (let num of nums) {
        let nl = num.length, start = 0;

        while (start < nl && start < tl && num[start] === target[start]) start++;

        if (start !== nl) continue;

        let rt = target.substring(start);

        if (freq.has(rt)) {
            let c = freq.get(rt);

            if (num === rt) count += c - 1;
            else count += c;
        }
    }

    return count;
};