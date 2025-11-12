/*

Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.
 

Example 1:

Input: timePoints = ["23:59","00:00"]
Output: 1
Example 2:

Input: timePoints = ["00:00","23:59","00:00"]
Output: 0
 

Constraints:

2 <= timePoints.length <= 2 * 104
timePoints[i] is in the format "HH:MM".


*/



/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
    let day = 24 * 60;
    let times = timePoints.map(time => {
        let [h, m] = time.split(':');

        return ((Number(h) * 60) + Number(m));
    });

    times.sort((a, b) => a - b);

    let min = Infinity;

    for (let i = 1; i < times.length; i++) {
        min = Math.min(min, times[i] - times[i - 1]);
    }

    return Math.min(min, day + times[0] - times[times.length - 1]);
};