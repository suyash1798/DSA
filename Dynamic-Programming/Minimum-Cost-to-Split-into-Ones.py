# You are given an integer n.

# In one operation, you may split an integer x into two positive integers a and b such that a + b = x.

# The cost of this operation is a * b.

# Return an integer denoting the minimum total cost required to split the integer n into n ones.

 

# Example 1:

# Input: n = 3

# Output: 3

# Explanation:

# One optimal set of operations is:

# x	a	b	a + b	a * b	Cost
# 3	1	2	3	2	2
# 2	1	1	2	1	1
# Thus, the minimum total cost is 2 + 1 = 3.

# Example 2:

# Input: n = 4

# Output: 6

# Explanation:

# One optimal set of operations is:

# x	a	b	a + b	a * b	Cost
# 4	2	2	4	4	4
# 2	1	1	2	1	1
# 2	1	1	2	1	1
# Thus, the minimum total cost is 4 + 1 + 1 = 6.

 

# Constraints:

# 1 <= n <= 500


class Solution:
    def minCost(self, n: int) -> int:
        memo = [-1 for _ in range(0, n + 1)]

        def dfs(num):
            if num == 1:
                return 0

            if num == 2:
                return 1

            if memo[num] != -1:
                return memo[num]

            min_value = math.inf

            for i in range(1, ceil(num / 2)):
                a = i
                b = num - i

                min_value = min(min_value, a * b + dfs(a) + dfs(b))

            memo[num] = min_value

            return memo[num]

        return dfs(n)
