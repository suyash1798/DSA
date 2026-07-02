# You are given a 2D integer array grid of size m x n.

# You must select exactly one integer from each row of the grid.

# Return an integer denoting the minimum possible bitwise OR of the selected integers from each row.

 

# Example 1:

# Input: grid = [[1,5],[2,4]]

# Output: 3

# Explanation:

# Choose 1 from the first row and 2 from the second row.
# The bitwise OR of 1 | 2 = 3​​​​​​​, which is the minimum possible.
# Example 2:

# Input: grid = [[3,5],[6,4]]

# Output: 5

# Explanation:

# Choose 5 from the first row and 4 from the second row.
# The bitwise OR of 5 | 4 = 5​​​​​​​, which is the minimum possible.
# Example 3:

# Input: grid = [[7,9,8]]

# Output: 7

# Explanation:

# Choosing 7 gives the minimum bitwise OR.
 

# Constraints:

# 1 <= m == grid.length <= 105
# 1 <= n == grid[i].length <= 105
# m * n <= 105
# 1 <= grid[i][j] <= 105​​​​​​​



class Solution:
    def minimumOR(self, grid: List[List[int]]) -> int:
        notValid = {}

        for bit in range(30, -1, -1):
            canBeSkipped = True

            for i in range(len(grid)):
                has0 = False

                for j in range(len(grid[0])):
                    if (i, j) in notValid:
                        continue
                    
                    if (grid[i][j] & (1 << bit)) == 0:
                        has0 = True
                        break
                
                if has0 == False:
                    canBeSkipped = False
                    break
                
            if canBeSkipped == False:
                continue
            
            for i in range(len(grid)):
                for j in range(len(grid[0])):
                    if (grid[i][j] & (1 << bit)) != 0:
                        notValid[(i,j)] = True
        
        final = 0

        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if (i,j) in notValid:
                    continue
                final = final | grid[i][j]
                break
        
        return final