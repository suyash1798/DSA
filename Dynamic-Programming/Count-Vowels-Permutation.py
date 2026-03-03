# Given an integer n, your task is to count how many strings of length n can be formed under the following rules:

# Each character is a lower case vowel ('a', 'e', 'i', 'o', 'u')
# Each vowel 'a' may only be followed by an 'e'.
# Each vowel 'e' may only be followed by an 'a' or an 'i'.
# Each vowel 'i' may not be followed by another 'i'.
# Each vowel 'o' may only be followed by an 'i' or a 'u'.
# Each vowel 'u' may only be followed by an 'a'.
# Since the answer may be too large, return it modulo 10^9 + 7.

 

# Example 1:

# Input: n = 1
# Output: 5
# Explanation: All possible strings are: "a", "e", "i" , "o" and "u".
# Example 2:

# Input: n = 2
# Output: 10
# Explanation: All possible strings are: "ae", "ea", "ei", "ia", "ie", "io", "iu", "oi", "ou" and "ua".
# Example 3: 

# Input: n = 5
# Output: 68
 

# Constraints:

# 1 <= n <= 2 * 10^4



class Solution:
    def countVowelPermutation(self, n: int) -> int:
        MOD = 1000000007
        followed = [[1], [0, 2], [0, 1, 3, 4], [2, 4], [0]]

        dp = [1 for _ in range(5)]

        for index in range(n - 1, 0, -1):
            new_dp = [0 for _ in range(5)]
            for last in range(5):
                count = 0
                for ch in followed[last]:
                    count = (count + dp[ch]) % MOD
                new_dp[last] = count
            dp = new_dp

        total_count = 0
        for key in range(5):
            total_count = (total_count + dp[key]) % MOD

        return total_count
