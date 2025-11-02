/*

Design a data structure that keeps track of the values in it and answers some queries regarding their frequencies.

Implement the FrequencyTracker class.

FrequencyTracker(): Initializes the FrequencyTracker object with an empty array initially.
void add(int number): Adds number to the data structure.
void deleteOne(int number): Deletes one occurrence of number from the data structure. The data structure may not contain number, and in this case nothing is deleted.
bool hasFrequency(int frequency): Returns true if there is a number in the data structure that occurs frequency number of times, otherwise, it returns false.
 

Example 1:

Input
["FrequencyTracker", "add", "add", "hasFrequency"]
[[], [3], [3], [2]]
Output
[null, null, null, true]

Explanation
FrequencyTracker frequencyTracker = new FrequencyTracker();
frequencyTracker.add(3); // The data structure now contains [3]
frequencyTracker.add(3); // The data structure now contains [3, 3]
frequencyTracker.hasFrequency(2); // Returns true, because 3 occurs twice

*/


var FrequencyTracker = function () {
    this.count = {};
    this.freqCount = {};
};

/** 
 * @param {number} number
 * @return {void}
 */
FrequencyTracker.prototype.add = function (number) {
    this.count[number] = (this.count[number] || 0) + 1;

    let freq = this.count[number];

    this.freqCount[freq] = (this.freqCount[freq] || 0) + 1;
    if (this.freqCount[freq - 1]) {
        this.freqCount[freq - 1] = this.freqCount[freq - 1] - 1;
        if (!this.freqCount[freq - 1]) delete this.freqCount[freq - 1];
    }
};

/** 
 * @param {number} number
 * @return {void}
 */
FrequencyTracker.prototype.deleteOne = function (number) {
    if (!this.count[number]) return;
    this.count[number] = this.count[number] - 1;

    let freq = this.count[number];

    this.freqCount[freq] = (this.freqCount[freq] || 0) + 1;
    if (this.freqCount[freq + 1]) {
        this.freqCount[freq + 1] = this.freqCount[freq + 1] - 1;
        if (!this.freqCount[freq + 1]) delete this.freqCount[freq + 1];
    }
};

/** 
 * @param {number} frequency
 * @return {boolean}
 */
FrequencyTracker.prototype.hasFrequency = function (frequency) {
    return !!this.freqCount[frequency];
};

/** 
 * Your FrequencyTracker object will be instantiated and called as such:
 * var obj = new FrequencyTracker()
 * obj.add(number)
 * obj.deleteOne(number)
 * var param_3 = obj.hasFrequency(frequency)
 */