# You are given a string s consisting of '(' and ')', and an integer k.

# A string is k-balanced if it is exactly k consecutive '(' followed by k consecutive ')', i.e., '(' * k + ')' * k.

# For example, if k = 3, k-balanced is "((()))".

# You must repeatedly remove all non-overlapping k-balanced substrings from s, and then join the remaining parts. Continue this process until no k-balanced substring exists.

# Return the final string after all possible removals.

 

# ​​​​​​​Example 1:

# Input: s = "(())", k = 1

# Output: ""

# Explanation:

# k-balanced substring is "()"

# Step	Current s	k-balanced	Result s
# 1	(())	(())	()
# 2	()	()	Empty
# Thus, the final string is "".

# Example 2:

# Input: s = "(()(", k = 1

# Output: "(("

# Explanation:

# k-balanced substring is "()"

# Step	Current s	k-balanced	Result s
# 1	(()(	(()(	((
# 2	((	-	((
# Thus, the final string is "((".

# Example 3:

# Input: s = "((()))()()()", k = 3

# Output: "()()()"

# Explanation:

# k-balanced substring is "((()))"

# Step	Current s	k-balanced	Result s
# 1	((()))()()()	((()))()()()	()()()
# 2	()()()	-	()()()
# Thus, the final string is "()()()".

 

# Constraints:

# 2 <= s.length <= 105
# s consists only of '(' and ')'.
# 1 <= k <= s.length / 2



class Solution:
    def removeSubstring(self, s: str, k: int) -> str:
        stack = []
        i = 0

        while i < len(s):
            ch = s[i]
            count = 0
            index = i

            while index < len(s) and s[index] == ch:
                count += 1
                index += 1

            i = index

            if ch == '(':
                stack.append(count)
            else:
                stack.append(-count)
            
            while len(stack) >= 2 and stack[-1] >= 0 and stack[-2] >= 0:
                    c = stack.pop() + stack.pop()
                    stack.append(c)

            while len(stack) >= 2 and stack[-1] <= 0 and stack[-2] <= 0:
                c = stack.pop() + stack.pop()
                stack.append(c)
            
            while len(stack) >= 2 and stack[-1] <= -k and stack[-2] >= k:
                stack[-1] += k
                stack[-2] -= k

                while len(stack) >= 2 and stack[-1] >= 0 and stack[-2] >= 0:
                    c = stack.pop() + stack.pop()
                    stack.append(c)

                while len(stack) >= 2 and stack[-1] <= 0 and stack[-2] <= 0:
                    c = stack.pop() + stack.pop()
                    stack.append(c)

            # print(stack)

        final = []

        for i in range(len(stack)):
            c = abs(stack[i])

            for j in range(c):
                if stack[i] < 0:
                    final.append(')')
                elif stack[i] > 0:
                    final.append('(')
        
        return ''.join(final)