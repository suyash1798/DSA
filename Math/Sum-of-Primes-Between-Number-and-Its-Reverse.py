# You are given an integer n.

# Let r be the integer formed by reversing the digits of n.

# Return the sum of all prime numbers between min(n, r) and max(n, r), inclusive.

 

# Example 1:

# Input: n = 13

# Output: 132

# Explanation:

# The reverse of 13 is 31. Thus, the range is [13, 31].
# The prime numbers in this range are 13, 17, 19, 23, 29, and 31.
# The sum of these prime numbers is 13 + 17 + 19 + 23 + 29 + 31 = 132.
# Example 2:

# Input: n = 10

# Output: 17

# Explanation:

# The reverse of 10 is 1. Thus, the range is [1, 10].
# The prime numbers in this range are 2, 3, 5, and 7.
# The sum of these prime numbers is 2 + 3 + 5 + 7 = 17.
# Example 3:

# Input: n = 8

# Output: 0

# Explanation:

# The reverse of 8 is 8. Thus, the range is [8, 8].
# There are no prime numbers in this range, so the sum is 0.
 

# Constraints:

# 1 <= n <= 1000



class Solution:
    def sumOfPrimesInRange(self, n: int) -> int:
        rnum = 0
        num = n

        while num > 0:
            r = num % 10
            rnum = (rnum * 10) + r
            num = num // 10

        mini, maxi = min(n, rnum), max(n, rnum)

        seen = set()
        sum = 0

        for i in range(2, maxi+1):
            if i in seen:
                continue

            if i >= mini:
                sum += i

            start = i

            while start <= maxi:
                seen.add(start)
                start += i

        return sum