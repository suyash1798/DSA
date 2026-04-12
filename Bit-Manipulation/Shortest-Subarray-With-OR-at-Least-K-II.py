# You are given an array nums of non-negative integers and an integer k.

# An array is called special if the bitwise OR of all of its elements is at least k.

# Return the length of the shortest special non-empty subarray of nums, or return -1 if no special subarray exists.

 

# Example 1:

# Input: nums = [1,2,3], k = 2

# Output: 1

# Explanation:

# The subarray [3] has OR value of 3. Hence, we return 1.

# Example 2:

# Input: nums = [2,1,8], k = 10

# Output: 3

# Explanation:

# The subarray [2,1,8] has OR value of 11. Hence, we return 3.

# Example 3:

# Input: nums = [1,2], k = 0

# Output: 1

# Explanation:

# The subarray [1] has OR value of 1. Hence, we return 1.

 

# Constraints:

# 1 <= nums.length <= 2 * 105
# 0 <= nums[i] <= 109
# 0 <= k <= 109



class Solution:
    def minimumSubarrayLength(self, nums: List[int], k: int) -> int:
        bitCount = [0 for _ in range(32)]
        bit = 0

        left = 0
        mini = math.inf

        for i in range(len(nums)):
            
            for b in range(32):
                if ((1 << b) & nums[i]) != 0:
                    bitCount[b] += 1

            bit = bit | nums[i]

            while bit >= k and left <= i:
                mini = min(mini, i - left + 1)

                lnum = nums[left]

                for b in range(32):
                    if ((1 << b) & lnum) != 0:
                        bitCount[b] -= 1

                        if bitCount[b] == 0:
                            xor = (1 << b) ^ bit
                            bit = bit & xor
                
                left += 1
        
        return mini if mini != math.inf else -1