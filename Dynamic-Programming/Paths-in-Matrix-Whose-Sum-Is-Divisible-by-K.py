# You are given a 0-indexed m x n integer matrix grid and an integer k. You are currently at position (0, 0) and you want to reach position (m - 1, n - 1) moving only down or right.

# Return the number of paths where the sum of the elements on the path is divisible by k. Since the answer may be very large, return it modulo 109 + 7.

 

# Example 1:


# Input: grid = [[5,2,4],[3,0,5],[0,7,2]], k = 3
# Output: 2
# Explanation: There are two paths where the sum of the elements on the path is divisible by k.
# The first path highlighted in red has a sum of 5 + 2 + 4 + 5 + 2 = 18 which is divisible by 3.
# The second path highlighted in blue has a sum of 5 + 3 + 0 + 5 + 2 = 15 which is divisible by 3.
# Example 2:


# Input: grid = [[0,0]], k = 5
# Output: 1
# Explanation: The path highlighted in red has a sum of 0 + 0 = 0 which is divisible by 5.
# Example 3:


# Input: grid = [[7,3,4,9],[2,3,6,2],[2,3,7,0]], k = 1
# Output: 10
# Explanation: Every integer is divisible by 1 so the sum of the elements on every possible path is divisible by k.
 

# Constraints:

# m == grid.length
# n == grid[i].length
# 1 <= m, n <= 5 * 104
# 1 <= m * n <= 5 * 104
# 0 <= grid[i][j] <= 100
# 1 <= k <= 50




class Solution:
    def numberOfPaths(self, grid: List[List[int]], k: int) -> int:
        row, col = len(grid), len(grid[0])
        MOD = 1000000007

        @lru_cache
        def dfs(r, c, s):
            if r == row - 1 and c == col - 1:
                return 1 if (s + grid[r][c]) % k == 0 else 0

            if r < 0 or r >= row or c < 0 or c >= col:
                return 0

            s = s + grid[r][c]

            s = s % k

            count = dfs(r + 1, c, s) + dfs(r, c + 1, s)

            count = count % MOD

            return count

        return dfs(0, 0, 0)


class Solution:
    def numberOfPaths(self, grid: List[List[int]], k: int) -> int:
        row, col = len(grid), len(grid[0])
        MOD = 1000000007

        dp = [
            [[0 for _ in range(0, k)] for _ in range(0, col + 1)]
            for _ in range(0, row + 1)
        ]

        dp[row - 1][col - 1][grid[row - 1][col - 1] % k] = 1

        for r in range(row - 1, -1, -1):
            for c in range(col - 1, -1, -1):
                if r == row - 1 and c == col - 1:
                    continue

                value = grid[r][c]

                for s in range(k):

                    dp[r][c][s] = (
                        dp[r + 1][c][(s - value) % k] + dp[r][c + 1][(s - value) % k]
                    )

                    dp[r][c][s] %= MOD

        return dp[0][0][0]

 