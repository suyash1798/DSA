# You are given a string text. You can swap two of the characters in the text.

# Return the length of the longest substring with repeated characters.

 

# Example 1:

# Input: text = "ababa"
# Output: 3
# Explanation: We can swap the first 'b' with the last 'a', or the last 'b' with the first 'a'. Then, the longest repeated character substring is "aaa" with length 3.
# Example 2:

# Input: text = "aaabaaa"
# Output: 6
# Explanation: Swap 'b' with the last 'a' (or the first 'a'), and we get longest repeated character substring "aaaaaa" with length 6.
# Example 3:

# Input: text = "aaaaa"
# Output: 5
# Explanation: No need to swap, longest repeated character substring is "aaaaa" with length is 5.
 

# Constraints:

# 1 <= text.length <= 2 * 104
# text consist of lowercase English characters only.
 


class Solution:
    def maxRepOpt1(self, text: str) -> int:
        
        fr = defaultdict(int)

        for ch in text:
            fr[ch] += 1
        
        maxi = 0

        for i in range(26):
            ch = chr(i + 97)
            
            if fr[ch] == 0:
                continue
            lastIndex = -1
            secondLastIndex = -1


            for i in range(len(text)):

                if text[i] != ch:
                    secondLastIndex = lastIndex
                    lastIndex = i

                if (i - secondLastIndex - 1) < fr[ch]:
                    maxi = max(maxi, i - secondLastIndex)
                
                maxi = max(maxi, i - lastIndex - 1)
        
        return maxi

                
