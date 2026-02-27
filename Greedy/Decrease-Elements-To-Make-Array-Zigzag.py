# Given an array nums of integers, a move consists of choosing any element and decreasing it by 1.

# An array A is a zigzag array if either:

# Every even-indexed element is greater than adjacent elements, ie. A[0] > A[1] < A[2] > A[3] < A[4] > ...
# OR, every odd-indexed element is greater than adjacent elements, ie. A[0] < A[1] > A[2] < A[3] > A[4] < ...
# Return the minimum number of moves to transform the given array nums into a zigzag array.

 

# Example 1:

# Input: nums = [1,2,3]
# Output: 2
# Explanation: We can decrease 2 to 0 or 3 to 1.
# Example 2:

# Input: nums = [9,6,1,6,2]
# Output: 4
 

# Constraints:

# 1 <= nums.length <= 1000
# 1 <= nums[i] <= 1000





class Solution:
    def movesToMakeZigzag(self, nums: List[int]) -> int:
        even = 0
        odd = 0
        l = len(nums)

        for i in range(0, l, 2):
            min_value = math.inf

            if i > 0:
                min_value = nums[i - 1]

            if i < l - 1:
                min_value = min(min_value, nums[i + 1])

            even += max(0, nums[i] - min_value + 1)

        for i in range(1, l, 2):
            min_value = math.inf

            if i > 0:
                min_value = nums[i - 1]

            if i < l - 1:
                min_value = min(min_value, nums[i + 1])

            odd += max(0, nums[i] - min_value + 1)

        return min(even, odd)
