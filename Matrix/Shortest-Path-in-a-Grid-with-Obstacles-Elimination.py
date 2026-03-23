# You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell in one step.

# Return the minimum number of steps to walk from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles. If it is not possible to find such walk return -1.

 

# Example 1:


# Input: grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1
# Output: 6
# Explanation: 
# The shortest path without eliminating any obstacle is 10.
# The shortest path with one obstacle elimination at position (3,2) is 6. Such path is (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) -> (3,2) -> (4,2).
# Example 2:


# Input: grid = [[0,1,1],[1,1,1],[1,0,0]], k = 1
# Output: -1
# Explanation: We need to eliminate at least two obstacles to find such a walk.
 

# Constraints:

# m == grid.length
# n == grid[i].length
# 1 <= m, n <= 40
# 1 <= k <= m * n
# grid[i][j] is either 0 or 1.
# grid[0][0] == grid[m - 1][n - 1] == 0





class Solution:
    def shortestPath(self, grid: List[List[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        queue = deque([(0, 0, 0, 0)])
        seen = [[[False for _ in range(k + 1)] for _ in range(n)] for _ in range(m)]

        seen[0][0][0] = True
        dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]

        while len(queue) != 0:
            row, col, ob, steps = queue.popleft()

            if row == m - 1 and col == n - 1:
                return steps

            for r, c in dirs:
                nr, nc = row + r, col + c

                if nr < 0 or nc < 0 or nr >= m or nc >= n:
                    continue

                if grid[nr][nc] == 1 and ob == k:
                    continue

                nob = (ob + 1) if grid[nr][nc] == 1 else ob

                if seen[nr][nc][nob] == True:
                    continue

                seen[nr][nc][nob] = True

                queue.append((nr, nc, nob, steps + 1))

        return -1
