# You are given two integer arrays, technique1 and technique2, each of length n, where n represents the number of tasks to complete.

# If the ith task is completed using technique 1, you earn technique1[i] points.
# If it is completed using technique 2, you earn technique2[i] points.
# You are also given an integer k, representing the minimum number of tasks that must be completed using technique 1.

# You must complete at least k tasks using technique 1 (they do not need to be the first k tasks).

# The remaining tasks may be completed using either technique.

# Return an integer denoting the maximum total points you can earn.

 

# Example 1:

# Input: technique1 = [5,2,10], technique2 = [10,3,8], k = 2

# Output: 22

# Explanation:

# We must complete at least k = 2 tasks using technique1.

# Choosing technique1[1] and technique1[2] (completed using technique 1), and technique2[0] (completed using technique 2), yields the maximum points: 2 + 10 + 10 = 22.

# Example 2:

# Input: technique1 = [10,20,30], technique2 = [5,15,25], k = 2

# Output: 60

# Explanation:

# We must complete at least k = 2 tasks using technique1.

# Choosing all tasks using technique 1 yields the maximum points: 10 + 20 + 30 = 60.

# Example 3:

# Input: technique1 = [1,2,3], technique2 = [4,5,6], k = 0

# Output: 15

# Explanation:

# Since k = 0, we are not required to choose any task using technique1.

# Choosing all tasks using technique 2 yields the maximum points: 4 + 5 + 6 = 15.

 

# Constraints:

# 1 <= n == technique1.length == technique2.length <= 105
# 1 <= technique1[i], technique2​​​​​​​[i] <= 10​​​​​​​5
# 0 <= k <= n



class Solution:
    def maxPoints(self, technique1: List[int], technique2: List[int], k: int) -> int:
        combine = []

        for i in range(len(technique1)):
            combine.append([technique1[i], technique2[i], technique2[i] - technique1[i]])

        combine.sort(key=lambda x:x[2])

        total = 0

        for i in range(len(technique1)):
            if i < k:
                total += combine[i][0]
                continue
            
            total += max(combine[i][0], combine[i][1])
        
        return total