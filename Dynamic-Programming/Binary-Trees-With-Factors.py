# Given an array of unique integers, arr, where each integer arr[i] is strictly greater than 1.

# We make a binary tree using these integers, and each number may be used for any number of times. Each non-leaf node's value should be equal to the product of the values of its children.

# Return the number of binary trees we can make. The answer may be too large so return the answer modulo 109 + 7.

 

# Example 1:

# Input: arr = [2,4]
# Output: 3
# Explanation: We can make these trees: [2], [4], [4, 2, 2]
# Example 2:

# Input: arr = [2,4,5,10]
# Output: 7
# Explanation: We can make these trees: [2], [4], [5], [10], [4, 2, 2], [10, 2, 5], [10, 5, 2].
 

# Constraints:

# 1 <= arr.length <= 1000
# 2 <= arr[i] <= 109
# All the values of arr are unique.



class Solution:
    def numFactoredBinaryTrees(self, arr: List[int]) -> int:
        unique = set(arr)
        mod = (10 ** 9) + 7

        @cache
        def dfs(parent):

            count = 1

            for i in range(2, int(sqrt(parent)) + 1):
                if parent % i != 0:
                    continue

                c1 = i
                c2 = parent // i

                if c1 not in unique or c2 not in unique:
                    continue

                ways = dfs(c1) * dfs(c2)

                if c1 != c2:
                    ways *= 2
                
                count += ways
                count %= mod
            
            return count
        
        c = 0

        for p in arr:
            c += dfs(p)
            c %= mod
        
        return c