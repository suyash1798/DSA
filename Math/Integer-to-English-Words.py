# Convert a non-negative integer num to its English words representation.

 

# Example 1:

# Input: num = 123
# Output: "One Hundred Twenty Three"
# Example 2:

# Input: num = 12345
# Output: "Twelve Thousand Three Hundred Forty Five"
# Example 3:

# Input: num = 1234567
# Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
 

# Constraints:

# 0 <= num <= 231 - 1



class Solution:
    def numberToWords(self, num: int) -> str:
        if num == 0:
            return "Zero"

        separators = ["Billion", "Million", "Thousand", ""]
        spell = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]
        spellAfterTen = [
            "Eleven",
            "Twelve",
            "Thirteen",
            "Fourteen",
            "Fifteen",
            "Sixteen",
            "Seventeen",
            "Eighteen",
            "Nineteen",
        ]
        spellTens = [
            "Ten",
            "Twenty",
            "Thirty",
            "Forty",
            "Fifty",
            "Sixty",
            "Seventy",
            "Eighty",
            "Ninety",
        ]
        spellH = "Hundred"

        words = []
        digits = []
        count = 0

        while num > 0:
            rem = num % 10

            num = num // 10

            if count % 3 == 0:
                si = len(separators) - 1 - (count // 3)

                if separators[si] != "":
                    words.append(separators[si])

            if rem == 0:
                count += 1
                digits.append(rem)
                continue
            place = count % 3

            if place == 0:
                words.append(spell[rem - 1])
            elif place == 1:
                if rem == 1 and len(digits) != 0 and digits[len(digits) - 1] != 0:
                    words.pop()
                    words.append(spellAfterTen[digits[len(digits) - 1] - 1])
                else:
                    words.append(spellTens[rem - 1])
            elif place == 2:
                words.append(spellH)
                words.append(spell[rem - 1])

            count += 1
            digits.append(rem)

        final = []

        for index in range(len(words)):
            if (
                index < len(words) - 1
                and words[index] in separators
                and words[index + 1] in separators
            ):
                continue
            final.append(words[index])

        return " ".join(reversed(final))
