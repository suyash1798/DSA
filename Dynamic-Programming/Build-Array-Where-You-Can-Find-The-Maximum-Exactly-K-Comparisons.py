# You are given three integers n, m and k. Consider the following algorithm to find the maximum element of an array of positive integers:


# You should build the array arr which has the following properties:

# arr has exactly n integers.
# 1 <= arr[i] <= m where (0 <= i < n).
# After applying the mentioned algorithm to arr, the value search_cost is equal to k.
# Return the number of ways to build the array arr under the mentioned conditions. As the answer may grow large, the answer must be computed modulo 109 + 7.

 

# Example 1:

# Input: n = 2, m = 3, k = 1
# Output: 6
# Explanation: The possible arrays are [1, 1], [2, 1], [2, 2], [3, 1], [3, 2] [3, 3]
# Example 2:

# Input: n = 5, m = 2, k = 3
# Output: 0
# Explanation: There are no possible arrays that satisfy the mentioned conditions.
# Example 3:

# Input: n = 9, m = 1, k = 1
# Output: 1
# Explanation: The only possible array is [1, 1, 1, 1, 1, 1, 1, 1, 1]
 

# Constraints:

# 1 <= n <= 50
# 1 <= m <= 100
# 0 <= k <= n




class Solution:
    def numOfArrays(self, n: int, m: int, k: int) -> int:

        memo = {}
        MOD = 1000000007

        def dfs(index, cost, lastMax):
            if index == n:
                return 1 if cost == k else 0

            if cost > k:
                return 0
            
            if (k - cost) > (n - index):
                return 0

            if (index, cost, lastMax) in memo:
                return memo[(index, cost, lastMax)]

            count = 0

            for i in range(1, m + 1):
                if i > lastMax:
                    count += dfs(index + 1, cost + 1, i)
                else:
                    count += dfs(index + 1, cost, lastMax)
                count %= MOD

            memo[(index, cost, lastMax)] = count % MOD

            return count

        return dfs(0, 0, -1)
