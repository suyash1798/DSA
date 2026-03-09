# In a project, you have a list of required skills req_skills, and a list of people. The ith person people[i] contains a list of skills that the person has.

# Consider a sufficient team: a set of people such that for every required skill in req_skills, there is at least one person in the team who has that skill. We can represent these teams by the index of each person.

# For example, team = [0, 1, 3] represents the people with skills people[0], people[1], and people[3].
# Return any sufficient team of the smallest possible size, represented by the index of each person. You may return the answer in any order.

# It is guaranteed an answer exists.

 

# Example 1:

# Input: req_skills = ["java","nodejs","reactjs"], people = [["java"],["nodejs"],["nodejs","reactjs"]]
# Output: [0,2]
# Example 2:

# Input: req_skills = ["algorithms","math","java","reactjs","csharp","aws"], people = [["algorithms","math","java"],["algorithms","math","reactjs"],["java","csharp","aws"],["reactjs","csharp"],["csharp","math"],["aws","java"]]
# Output: [1,2]
 

# Constraints:

# 1 <= req_skills.length <= 16
# 1 <= req_skills[i].length <= 16
# req_skills[i] consists of lowercase English letters.
# All the strings of req_skills are unique.
# 1 <= people.length <= 60
# 0 <= people[i].length <= 16
# 1 <= people[i][j].length <= 16
# people[i][j] consists of lowercase English letters.
# All the strings of people[i] are unique.
# Every skill in people[i] is a skill in req_skills.
# It is guaranteed a sufficient team exists.


class Solution:
    def smallestSufficientTeam(
        self, req_skills: List[str], people: List[List[str]]
    ) -> List[int]:
        indexes, rq_mask, l = {}, 0, len(people)
        memo = {}
        masks = []

        for i in range(len(req_skills)):
            indexes[req_skills[i]] = i
            rq_mask = rq_mask | (1 << i)

        for item in people:
            new_mask = 0
            for skill in item:
                if skill in indexes:
                    new_mask = new_mask | (1 << indexes[skill])
            masks.append(new_mask)

        def dfs(index, mask):

            if mask == rq_mask:
                return []

            if index == l:
                return None

            if (index, mask) in memo:
                return (
                    memo[(index, mask)].copy()
                    if memo[(index, mask)] is not None
                    else memo[(index, mask)]
                )

            skip = dfs(index + 1, mask)

            new_mask = mask | masks[index]

            take = dfs(index + 1, new_mask)

            if take is not None:
                take = take + [index]

            if take is not None and skip is not None:
                if len(take) < len(skip):
                    memo[(index, mask)] = take.copy() if take is not None else take
                    return take

                memo[(index, mask)] = skip.copy() if skip is not None else skip
                return skip

            if take is not None:
                memo[(index, mask)] = take.copy() if take is not None else take
                return take

            memo[(index, mask)] = skip.copy() if skip is not None else skip
            return skip

        return dfs(0, 0)
