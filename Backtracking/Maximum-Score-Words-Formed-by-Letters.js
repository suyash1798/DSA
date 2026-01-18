/*

Given a list of words, list of  single letters (might be repeating) and score of every character.

Return the maximum score of any valid set of words formed by using the given letters (words[i] cannot be used two or more times).

It is not necessary to use all characters in letters and each letter can only be used once. Score of letters 'a', 'b', 'c', ... ,'z' is given by score[0], score[1], ... , score[25] respectively.

 

Example 1:

Input: words = ["dog","cat","dad","good"], letters = ["a","a","c","d","d","d","g","o","o"], score = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
Output: 23
Explanation:
Score  a=1, c=9, d=5, g=3, o=2
Given letters, we can form the words "dad" (5+1+5) and "good" (3+2+2+5) with a score of 23.
Words "dad" and "dog" only get a score of 21.
Example 2:

Input: words = ["xxxz","ax","bx","cx"], letters = ["z","a","b","c","x","x","x"], score = [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]
Output: 27
Explanation:
Score  a=4, b=4, c=4, x=5, z=10
Given letters, we can form the words "ax" (4+5), "bx" (4+5) and "cx" (4+5) with a score of 27.
Word "xxxz" only get a score of 25.
Example 3:

Input: words = ["leetcode"], letters = ["l","e","t","c","o","d"], score = [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]
Output: 0
Explanation:
Letter "e" can only be used once.
 

Constraints:

1 <= words.length <= 14
1 <= words[i].length <= 15
1 <= letters.length <= 100
letters[i].length == 1
score.length == 26
0 <= score[i] <= 10
words[i], letters[i] contains only lower case English letters.

*/



/**
 * @param {string[]} words
 * @param {character[]} letters
 * @param {number[]} score
 * @return {number}
 */
var maxScoreWords = function (words, letters, score) {
    let frq = new Array(26).fill(0);
    let max = 0;

    for (let ch of letters) {
        frq[ch.charCodeAt(0) - 97]++;
    }

    function backtracking(index, sc) {
        if (index === words.length) {
            max = Math.max(max, sc);
            return;
        }

        let isPossible = true;
        let wordFrq = new Array(26).fill(0);

        for (let ch of words[index]) {
            wordFrq[ch.charCodeAt(0) - 97]++;
        }

        for (let i = 0; i < 26; i++) {
            if (frq[i] < wordFrq[i]) {
                isPossible = false;
                break;
            }
        }

        if (isPossible) {
            let total = 0;

            for (let i = 0; i < 26; i++) {
                frq[i] = frq[i] - wordFrq[i];
                total = total + (wordFrq[i] * score[i]);
            }

            backtracking(index + 1, sc + total);

            for (let i = 0; i < 26; i++) {
                frq[i] = frq[i] + wordFrq[i];
            }
        }

        backtracking(index + 1, sc);
    }

    backtracking(0, 0);

    return max;
};