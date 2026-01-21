/*

A k-booking happens when k events have some non-empty intersection (i.e., there is some time that is common to all k events.)

You are given some events [startTime, endTime), after each given event, return an integer k representing the maximum k-booking between all the previous events.

Implement the MyCalendarThree class:

MyCalendarThree() Initializes the object.
int book(int startTime, int endTime) Returns an integer k representing the largest integer such that there exists a k-booking in the calendar.
 

Example 1:

Input
["MyCalendarThree", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output
[null, 1, 1, 2, 3, 3, 3]

Explanation
MyCalendarThree myCalendarThree = new MyCalendarThree();
myCalendarThree.book(10, 20); // return 1
myCalendarThree.book(50, 60); // return 1
myCalendarThree.book(10, 40); // return 2
myCalendarThree.book(5, 15); // return 3
myCalendarThree.book(5, 10); // return 3
myCalendarThree.book(25, 55); // return 3

 

Constraints:

0 <= startTime < endTime <= 109
At most 400 calls will be made to book.

*/




var MyCalendarThree = function () {
    this.timeline = new Map();
};

/** 
 * @param {number} startTime 
 * @param {number} endTime
 * @return {number}
 */
MyCalendarThree.prototype.book = function (startTime, endTime) {
    this.timeline.set(startTime, (this.timeline.get(startTime) || 0) + 1);
    this.timeline.set(endTime, (this.timeline.get(endTime) || 0) - 1);

    let max = 0, ongoing = 0;
    let keys = Array.from(this.timeline.keys()).sort((a, b) => a - b);

    for (let key of keys) {

        ongoing += this.timeline.get(key);

        max = Math.max(max, ongoing);

    }

    return max;
};

/** 
 * Your MyCalendarThree object will be instantiated and called as such:
 * var obj = new MyCalendarThree()
 * var param_1 = obj.book(startTime,endTime)
 */