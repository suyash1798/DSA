# You are given an integer array nums and an integer target.

# You may remove any number of elements from nums (possibly zero).

# Return the minimum number of removals required so that the bitwise XOR of the remaining elements equals target. If it is impossible to achieve target, return -1.

# The bitwise XOR of an empty array is 0.

 

# Example 1:

# Input: nums = [1,2,3], target = 2

# Output: 1

# Explanation:

# Removing nums[1] = 2 leaves [nums[0], nums[2]] = [1, 3].
# The XOR of [1, 3] is 2, which equals target.
# It is not possible to achieve XOR = 2 in less than one removal, therefore the answer is 1.
# Example 2:

# Input: nums = [2,4], target = 1

# Output: -1

# Explanation:

# It is impossible to remove elements to achieve target. Thus, the answer is -1.

# Example 3:

# Input: nums = [7], target = 7

# Output: 0

# Explanation:

# The XOR of all elements is nums[0] = 7, which equals target. Thus, no removal is needed.

 

# Constraints:

# 1 <= nums.length <= 40
# 0 <= nums[i] <= 104
# 0 <= target <= 104





class Solution:
    def minRemovals(self, nums: List[int], target: int) -> int:
        l = len(nums)
        memo = {}

        def dfs(index, xor):
            if index == l:
                return 0 if xor == target else math.inf

            if (index, xor) in memo:
                return memo[(index, xor)]

            take = dfs(index + 1, xor ^ nums[index])
            skip = 1 + dfs(index + 1, xor)

            memo[(index, xor)] = min(take, skip)

            return memo[(index, xor)]

        mini = dfs(0, 0)

        return mini if mini != math.inf else -1
