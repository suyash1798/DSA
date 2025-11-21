/*

You have n  tiles, where each tile has one letter tiles[i] printed on it.

Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles.

 

Example 1:

Input: tiles = "AAB"
Output: 8
Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".
Example 2:

Input: tiles = "AAABBC"
Output: 188
Example 3:

Input: tiles = "V"
Output: 1
 

Constraints:

1 <= tiles.length <= 7
tiles consists of uppercase English letters.


*/


/**
 * @param {string} tiles
 * @return {number}
 */
var numTilePossibilities = function (tiles) {
    const freq = {};
    for (const ch of tiles) freq[ch] = (freq[ch] || 0) + 1;

    let ans = 0;

    function dfs() {
        for (const ch in freq) {
            if (freq[ch] === 0) continue;

            ans++;
            freq[ch]--;
            dfs();
            freq[ch]++;
        }
    }

    dfs();
    return ans;
};