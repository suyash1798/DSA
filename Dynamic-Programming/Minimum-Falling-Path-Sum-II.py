# Given an n x n integer matrix grid, return the minimum sum of a falling path with non-zero shifts.

# A falling path with non-zero shifts is a choice of exactly one element from each row of grid such that no two elements chosen in adjacent rows are in the same column.

 

# Example 1:


# Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
# Output: 13
# Explanation: 
# The possible falling paths are:
# [1,5,9], [1,5,7], [1,6,7], [1,6,8],
# [2,4,8], [2,4,9], [2,6,7], [2,6,8],
# [3,4,8], [3,4,9], [3,5,7], [3,5,9]
# The falling path with the smallest sum is [1,5,7], so the answer is 13.
# Example 2:

# Input: grid = [[7]]
# Output: 7
 

# Constraints:

# n == grid.length == grid[i].length
# 1 <= n <= 200
# -99 <= grid[i][j] <= 99



# class Solution:
#     def minFallingPathSum(self, grid: List[List[int]]) -> int:
#         n = len(grid)

#         @cache
#         def dfs(row, col):
#             if row == n:
#                 return 0

#             mini = math.inf

#             for c in range(n):
#                 if c == col:
#                     continue
#                 mini = min(mini, grid[row][c] + dfs(row + 1, c))

#             return mini

#         return dfs(0, -1)


class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        n = len(grid)

        dp = [[math.inf for _ in range(n + 1)] for _ in range(n + 1)]

        for i in range(n):
            dp[n][i] = 0

        for i in range(n - 1, -1, -1):
            for j in range(n - 1, -1, -1):

                mini = math.inf

                for c in range(n):
                    if c == j and j != n - 1:
                        continue

                    mini = min(mini, grid[i][c] + dp[i + 1][c])

                dp[i][j] = mini

        return min(dp[0])
