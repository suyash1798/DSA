# You are given two binary strings s and t​​​​​​​, each of length n.

# You may rearrange the characters of t in any order, but s must remain unchanged.

# Return a binary string of length n representing the maximum integer value obtainable by taking the bitwise XOR of s and rearranged t.

 

# Example 1:

# Input: s = "101", t = "011"

# Output: "110"

# Explanation:

# One optimal rearrangement of t is "011".
# The bitwise XOR of s and rearranged t is "101" XOR "011" = "110", which is the maximum possible.
# Example 2:

# Input: s = "0110", t = "1110"

# Output: "1101"

# Explanation:

# One optimal rearrangement of t is "1011".
# The bitwise XOR of s and rearranged t is "0110" XOR "1011" = "1101", which is the maximum possible.
# Example 3:

# Input: s = "0101", t = "1001"

# Output: "1111"

# Explanation:

# One optimal rearrangement of t is "1010".
# The bitwise XOR of s and rearranged t is "0101" XOR "1010" = "1111", which is the maximum possible.
 

# Constraints:

# 1 <= n == s.length == t.length <= 2 * 105
# s[i] and t[i] are either '0' or '1'.


class Solution:
    def maximumXor(self, s: str, t: str) -> str:
        digits = defaultdict(int)
        output = ""

        for ch in t:
            digits[ch] += 1

        for ch in s:
            if ch == "0" and digits["1"] > 0:
                digits["1"] -= 1
                output += "1"
            elif ch == "1" and digits["0"] > 0:
                digits["0"] -= 1
                output += "1"
            else:
                digits[ch] -= 1
                output += "0"

        return output
