# In a string composed of 'L', 'R', and 'X' characters, like "RXXLRXRXL", a move consists of either replacing one occurrence of "XL" with "LX", or replacing one occurrence of "RX" with "XR". Given the starting string start and the ending string result, return True if and only if there exists a sequence of moves to transform start to result.

 

# Example 1:

# Input: start = "RXXLRXRXL", result = "XRLXXRRLX"
# Output: true
# Explanation: We can transform start to result following these steps:
# RXXLRXRXL ->
# XRXLRXRXL ->
# XRLXRXRXL ->
# XRLXXRRXL ->
# XRLXXRRLX
# Example 2:

# Input: start = "X", result = "L"
# Output: false
 

# Constraints:

# 1 <= start.length <= 104
# start.length == result.length
# Both start and result will only consist of characters in 'L', 'R', and 'X'.

class Solution:
    def canTransform(self, start: str, result: str) -> bool:
        l = len(start)
        i1, i2 = 0, 0

        while i1 < l or i2 < l:
            while i1 < l and start[i1] == "X":
                i1 += 1
            while i2 < l and result[i2] == "X":
                i2 += 1

            if i1 == l and i2 == l:
                return True

            if i1 == l or i2 == l:
                return False

            if start[i1] != result[i2]:
                return False

            if start[i1] == "R" and i1 > i2:
                return False

            if start[i1] == "L" and i2 > i1:
                return False

            i1 += 1
            i2 += 1

        return i1 == l and i2 == l
