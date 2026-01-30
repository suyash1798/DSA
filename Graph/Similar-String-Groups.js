/*

Two strings, X and Y, are considered similar if either they are identical or we can make them equivalent by swapping at most two letters (in distinct positions) within the string X.

For example, "tars" and "rats" are similar (swapping at positions 0 and 2), and "rats" and "arts" are similar, but "star" is not similar to "tars", "rats", or "arts".

Together, these form two connected groups by similarity: {"tars", "rats", "arts"} and {"star"}.  Notice that "tars" and "arts" are in the same group even though they are not similar.  Formally, each group is such that a word is in the group if and only if it is similar to at least one other word in the group.

We are given a list strs of strings where every string in strs is an anagram of every other string in strs. How many groups are there?

 

Example 1:

Input: strs = ["tars","rats","arts","star"]
Output: 2
Example 2:

Input: strs = ["omv","ovm"]
Output: 1
 

Constraints:

1 <= strs.length <= 300
1 <= strs[i].length <= 300
strs[i] consists of lowercase letters only.
All words in strs have the same length and are anagrams of each other.

*/



/**
 * @param {string[]} strs
 * @return {number}
 */
var numSimilarGroups = function (strs) {
    let n = strs.length;
    let dsu = new DSU(n);

    function canEqual(i, j) {
        let d = 0, len = strs[i].length;

        for (let k = 0; k < len; k++) {
            if (strs[i][k] !== strs[j][k]) d++;


            if (d > 2) return false;
        }

        return true;
    }

    for (let i = 0; i < n; i++) {

        for (let j = i + 1; j < n; j++) {

            if (canEqual(i, j)) {
                dsu.union(i, j);
            }
        }
    }

    let count = 0;

    for (let i = 0; i < n; i++) {
        if (dsu.findParent(i) === i) count++;
    }

    return count;
};

class DSU {
    constructor(n) {
        this.parents = new Array(n).fill(0).map((e, i) => i);
        this.ranks = new Array(n).fill(0);
    }

    findParent(x) {
        if (this.parents[x] !== x) {
            this.parents[x] = this.findParent(this.parents[x]);
        }
        return this.parents[x];
    }

    union(a, b) {
        let pa = this.findParent(a);
        let pb = this.findParent(b);

        if (pa === pb) return;

        if (this.ranks[pa] > this.ranks[pb]) {
            this.parents[pb] = pa;
        } else if (this.ranks[pb] > this.ranks[pa]) {
            this.parents[pa] = pb;
        } else {
            this.parents[pa] = pb;
            this.ranks[pb]++;
        }
    }
}