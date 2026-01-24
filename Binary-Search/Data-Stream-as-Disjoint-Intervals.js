/*

Given a data stream input of non-negative integers a1, a2, ..., an, summarize the numbers seen so far as a list of disjoint intervals.

Implement the SummaryRanges class:

SummaryRanges() Initializes the object with an empty stream.
void addNum(int value) Adds the integer value to the stream.
int[][] getIntervals() Returns a summary of the integers in the stream currently as a list of disjoint intervals [starti, endi]. The answer should be sorted by starti.
 

Example 1:

Input
["SummaryRanges", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals"]
[[], [1], [], [3], [], [7], [], [2], [], [6], []]
Output
[null, null, [[1, 1]], null, [[1, 1], [3, 3]], null, [[1, 1], [3, 3], [7, 7]], null, [[1, 3], [7, 7]], null, [[1, 3], [6, 7]]]

Explanation
SummaryRanges summaryRanges = new SummaryRanges();
summaryRanges.addNum(1);      // arr = [1]
summaryRanges.getIntervals(); // return [[1, 1]]
summaryRanges.addNum(3);      // arr = [1, 3]
summaryRanges.getIntervals(); // return [[1, 1], [3, 3]]
summaryRanges.addNum(7);      // arr = [1, 3, 7]
summaryRanges.getIntervals(); // return [[1, 1], [3, 3], [7, 7]]
summaryRanges.addNum(2);      // arr = [1, 2, 3, 7]
summaryRanges.getIntervals(); // return [[1, 3], [7, 7]]
summaryRanges.addNum(6);      // arr = [1, 2, 3, 6, 7]
summaryRanges.getIntervals(); // return [[1, 3], [6, 7]]
 

Constraints:

0 <= value <= 104
At most 3 * 104 calls will be made to addNum and getIntervals.
At most 102 calls will be made to getIntervals.
 

Follow up: What if there are lots of merges and the number of disjoint intervals is small compared to the size of the data stream?

*/




var SummaryRanges = function () {
    this.intervals = [
        [-Infinity, -Infinity],
        [Infinity, Infinity]
    ];
};

/** 
 * @param {number} value
 * @return {void}
 */
SummaryRanges.prototype.addNum = function (value) {
    let n = this.intervals.length;

    let start = 1, end = n - 2;

    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);

        if (value < this.intervals[mid][0]) {
            end = mid - 1;
        } else if (value > this.intervals[mid][1]) {
            start = mid + 1;
        } else {
            return;
        }
    }

    let before = this.intervals[start - 1];
    let after = this.intervals[start];

    if (before && before[1] === value - 1 && after && after[0] === value + 1) {
        before[1] = after[1];
        this.intervals.splice(start, 1);
    } else if (before && before[1] === value - 1) {
        before[1] = value;
    } else if (after && after[0] === value + 1) {
        after[0] = value;
    } else {
        this.intervals.splice(start, 0, [value, value]);
    }
};

/**
 * @return {number[][]}
 */
SummaryRanges.prototype.getIntervals = function () {
    return this.intervals.slice(1, this.intervals.length - 1);
};

/** 
 * Your SummaryRanges object will be instantiated and called as such:
 * var obj = new SummaryRanges()
 * obj.addNum(value)
 * var param_2 = obj.getIntervals()
 */