# Given a string s, find two disjoint palindromic subsequences of s such that the product of their lengths is maximized. The two subsequences are disjoint if they do not both pick a character at the same index.

# Return the maximum possible product of the lengths of the two palindromic subsequences.

# A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters. A string is palindromic if it reads the same forward and backward.

 

# Example 1:

# example-1
# Input: s = "leetcodecom"
# Output: 9
# Explanation: An optimal solution is to choose "ete" for the 1st subsequence and "cdc" for the 2nd subsequence.
# The product of their lengths is: 3 * 3 = 9.
# Example 2:

# Input: s = "bb"
# Output: 1
# Explanation: An optimal solution is to choose "b" (the first character) for the 1st subsequence and "b" (the second character) for the 2nd subsequence.
# The product of their lengths is: 1 * 1 = 1.
# Example 3:

# Input: s = "accbcaxxcxx"
# Output: 25
# Explanation: An optimal solution is to choose "accca" for the 1st subsequence and "xxcxx" for the 2nd subsequence.
# The product of their lengths is: 5 * 5 = 25.
 

# Constraints:

# 2 <= s.length <= 12
# s consists of lowercase English letters only.
 


class Solution:
    def maxProduct(self, s: str) -> int:
        
        @cache
        def isPalin(bit):
            left, right = 0, len(s) - 1
            count = 0
            
            while left <= right:
                while left <= right and not (bit & (1 << left)):
                    left += 1
                while left <= right and not (bit & (1 << right)):
                    right -= 1
                    
                if left <= right:
                    if s[left] != s[right]:
                        return 0
                    
                    count += 1 if left == right else 2
                    left += 1
                    right -= 1
                    
            return count

        def product(bit1, bit2):
            l1 = isPalin(bit1)
            l2 = isPalin(bit2)

            return l1*l2

        def dfs(index, bit1, bit2):
            if index == len(s):
                return product(bit1, bit2)
            
            maxi = dfs(index+1, bit1, bit2)

            maxi = max(maxi, dfs(index+1, bit1 | (1 << index), bit2))
            maxi = max(maxi, dfs(index+1, bit1, bit2 | (1 << index)))

            return maxi
        
        return dfs(0, 0, 0)
