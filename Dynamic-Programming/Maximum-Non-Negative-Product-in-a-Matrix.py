# You are given a m x n matrix grid. Initially, you are located at the top-left corner (0, 0), and in each step, you can only move right or down in the matrix.

# Among all possible paths starting from the top-left corner (0, 0) and ending in the bottom-right corner (m - 1, n - 1), find the path with the maximum non-negative product. The product of a path is the product of all integers in the grid cells visited along the path.

# Return the maximum non-negative product modulo 109 + 7. If the maximum product is negative, return -1.

# Notice that the modulo is performed after getting the maximum product.

 

# Example 1:


# Input: grid = [[-1,-2,-3],[-2,-3,-3],[-3,-3,-2]]
# Output: -1
# Explanation: It is not possible to get non-negative product in the path from (0, 0) to (2, 2), so return -1.
# Example 2:


# Input: grid = [[1,-2,1],[1,-2,1],[3,-4,1]]
# Output: 8
# Explanation: Maximum non-negative product is shown (1 * 1 * -2 * -4 * 1 = 8).
# Example 3:


# Input: grid = [[1,3],[0,-4]]
# Output: 0
# Explanation: Maximum non-negative product is shown (1 * 0 * -4 = 0).
 

# Constraints:

# m == grid.length
# n == grid[i].length
# 1 <= m, n <= 15
# -4 <= grid[i][j] <= 4




class Solution:
    def maxProductPath(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dirs = [[1,0], [0, 1]]

        @cache
        def dfs(row, col):
            if row == m-1 and col == n-1:
                return [grid[row][col], grid[row][col]]
            
            if row >= m or col >= n:
                return [-math.inf, math.inf]
            
            maxip = -math.inf
            maxinp = math.inf

            for r, c in dirs:
                p, np = dfs(row + r, col + c)

                if grid[row][col] > 0:
                    maxip = max(maxip, grid[row][col] * p)
                    maxinp = min(maxinp, grid[row][col] * np)
                else:
                    maxip = max(maxip, grid[row][col] * np)
                    maxinp = min(maxinp, grid[row][col] * p)
            
            return [maxip, maxinp]
        
        maxi = max(-1, max(dfs(0,0)))

        if maxi > 0:
            maxi %= (10 ** 9 + 7)
            
        return maxi