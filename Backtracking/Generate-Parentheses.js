/*

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

 

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 

Constraints:

1 <= n <= 8

*/


/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    let output = [];
    let comb = [];

    function backtracking(open, close) {
        if (open === 0 && close === 0) {
            output.push(comb.join(''));
            return;
        }

        if (open < close) {
            comb.push(')');
            backtracking(open, close - 1);
            comb.pop();
        }

        if (open > 0) {
            comb.push('(');
            backtracking(open - 1, close);
            comb.pop();
        }
    }

    backtracking(n, n);

    return output;
};