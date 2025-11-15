/**
 * Write a function to calculate the nth Fibonacci number.
 * Fibonacci numbers are a series of numbers in which each number is the sum of the two preceding numbers. First few
 * Fibonacci numbers are: 0, 1, 1, 2, 3, 5, 8, ...
 * 
 */


class Solution {

  calculateFibonacci(n) {
    if (n === 0 || n === 1) {
      return n;
    }

    let f1 = 0, f2 = 1;

    for (let f = 2; f <= n; f++) {
      [f1, f2] = [f2, f1 + f2];
    }

    return f2;
  }
}
