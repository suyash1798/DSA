# You are given an integer array nums.

# You are allowed to replace at most one element in the array with any other integer value of your choice.

# Return the length of the longest non-decreasing subarray that can be obtained after performing at most one replacement.

# An array is said to be non-decreasing if each element is greater than or equal to its previous one (if it exists).

 

# Example 1:

# Input: nums = [1,2,3,1,2]

# Output: 4

# Explanation:

# Replacing nums[3] = 1 with 3 gives the array [1, 2, 3, 3, 2].

# The longest non-decreasing subarray is [1, 2, 3, 3], which has a length of 4.

# Example 2:

# Input: nums = [2,2,2,2,2]

# Output: 5

# Explanation:

# All elements in nums are equal, so it is already non-decreasing and the entire nums forms a subarray of length 5.

 

# Constraints:

# 1 <= nums.length <= 105
# -109 <= nums[i] <= 109​​​​​​​


class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return 1

        prefix = [1] * len(nums)
        suffix = [1] * len(nums)
        maxi = 0

        for i in range(1, len(nums)):
            if nums[i] >= nums[i - 1]:
                prefix[i] = prefix[i - 1] + 1

            if prefix[i - 1] >= prefix[i]:
                maxi = max(maxi, prefix[i - 1] + 1)

            maxi = max(maxi, prefix[i])

        for i in range(len(nums) - 2, -1, -1):
            if nums[i] <= nums[i + 1]:
                suffix[i] = suffix[i + 1] + 1

            if suffix[i + 1] >= suffix[i]:
                maxi = max(maxi, suffix[i + 1] + 1)

            maxi = max(maxi, suffix[i])

        for i in range(1, len(nums) - 1):
            if nums[i - 1] <= nums[i + 1]:
                maxi = max(prefix[i - 1] + suffix[i], maxi)
                maxi = max(prefix[i] + suffix[i + 1], maxi)

        # print(prefix, suffix)

        return maxi
