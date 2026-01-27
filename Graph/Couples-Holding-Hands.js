/*

There are n couples sitting in 2n seats arranged in a row and want to hold hands.

The people and seats are represented by an integer array row where row[i] is the ID of the person sitting in the ith seat. The couples are numbered in order, the first couple being (0, 1), the second couple being (2, 3), and so on with the last couple being (2n - 2, 2n - 1).

Return the minimum number of swaps so that every couple is sitting side by side. A swap consists of choosing any two people, then they stand up and switch seats.

 

Example 1:

Input: row = [0,2,1,3]
Output: 1
Explanation: We only need to swap the second (row[1]) and third (row[2]) person.
Example 2:

Input: row = [3,2,0,1]
Output: 0
Explanation: All couples are already seated side by side.
 

Constraints:

2n == row.length
2 <= n <= 30​​​​​​​
0 <= row[i] < 2n
All the elements of row are unique.

*/



/**
 * @param {number[]} row
 * @return {number}
 */
var minSwapsCouples = function (row) {
    let n = row.length / 2;
    let dsu = new DSU(n);

    for (let i = 0; i < row.length; i += 2) {
        let first = Math.floor(row[i] / 2);
        let second = Math.floor(row[i + 1] / 2);

        dsu.union(first, second);
    }

    let connected = 0;

    for (let i = 0; i < n; i++) {
        if (dsu.find(i) === i) connected++;
    }

    return n - connected;
};

class DSU {

    constructor(n) {
        this.parents = new Array(n).fill(0).map((e, index) => index);
        this.ranks = new Array(n).fill(0);
    }

    find(a) {
        if (this.parents[a] !== a) {
            this.parents[a] = this.find(this.parents[a]);
        }
        return this.parents[a];
    }

    union(a, b) {
        let pa = this.find(a);
        let pb = this.find(b);

        if (pa === pb) {
            return false;
        }

        if (this.ranks[pa] > this.ranks[pb]) {
            this.parents[pb] = pa;
        } else if (this.ranks[pb] > this.ranks[pa]) {
            this.parents[pa] = pb;
        } else {
            this.parents[pa] = pb;
            this.ranks[pb]++;
        }

        return true;
    }
}