/**
 * Given a set of positive numbers (non zero) and a target sum 'S'. Each number should be assigned either a '+' or '-'
 * sign. We need to find out total ways to assign symbols to make the sum of numbers equal to target 'S'.
 * 
 * Input: {1, 1, 2, 3}, S=1
 * Output: 3
 * Explanation: The given set has '3' ways to make a sum of '1': {+1-1-2+3} & {-1+1-2+3} & {+1+1+2-3}
 * 
 */

/** Recursive */

class Solution {

  findTargetSubsets(num, s) {
    let total = num.reduce((total, n) => total + n, 0);
    let memo = new Array(num.length).fill(0).map(() => []);
    
    return this.#findTargetSubsets(num, s, 0, memo, total);
  }

  #findTargetSubsets(num, s, index, memo, total){
    if(index === num.length){
      return s === 0 ? 1 : 0;
    }

    if(memo[index][total + s] !== undefined){
      return memo[index][total + s];
    }

    let positive = this.#findTargetSubsets(num, s + num[index], index+1, memo, total);
    let negative = this.#findTargetSubsets(num, s - num[index], index+1, memo, total);

    return memo[index][total + s] = (positive + negative);
  }
}

/** Bottom - Up */