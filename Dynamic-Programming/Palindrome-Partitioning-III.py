# You are given a string s containing lowercase letters and an integer k. You need to :

# First, change some characters of s to other lowercase English letters.
# Then divide s into k non-empty disjoint substrings such that each substring is a palindrome.
# Return the minimal number of characters that you need to change to divide the string.

 

# Example 1:

# Input: s = "abc", k = 2
# Output: 1
# Explanation: You can split the string into "ab" and "c", and change 1 character in "ab" to make it palindrome.
# Example 2:

# Input: s = "aabbc", k = 3
# Output: 0
# Explanation: You can split the string into "aa", "bb" and "c", all of them are palindrome.
# Example 3:

# Input: s = "leetcode", k = 8
# Output: 0
 

# Constraints:

# 1 <= k <= s.length <= 100.
# s only contains lowercase English letters.
 



class Solution:
    def palindromePartition(self, s: str, k: int) -> int:
        l = len(s)
        cost = [[0 for _ in range(len(s))] for _ in range(len(s))]

        for i in range(0, l):
            for j in range(0, 2):
                if i == l - 1 and j == 2:
                    continue

                start, end = i, i + j
                count = 0

                while start >= 0 and end < l:
                    if s[start] != s[end]:
                        count += 1
                    cost[start][end] = count
                    start -= 1
                    end += 1

        @cache
        def dfs(index, p):
            if index == l:
                return 0 if p == k else math.inf

            if p >= k:
                return math.inf

            mini = math.inf

            for i in range(index, l):
                count = 0

                mini = min(mini, cost[index][i] + dfs(i + 1, p + 1))

            return mini

        return dfs(0, 0)
