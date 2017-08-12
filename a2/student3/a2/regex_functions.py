"""
# Copyright Ansaf Ahmad 2016
# Distributed under the terms of the GNU General Public License.
#
# This file is part of Assignment 2, CSCA48, Winter 2016
#
# This is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This file is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this file.  If not, see <http://www.gnu.org/licenses/>.
"""

# Do not change this import statement, or add any of your own!
from regextree import RegexTree, StarTree, DotTree, BarTree, Leaf

# Do not change anything above this comment except for the copyright
# statement

# Student code below this comment.
SINGLE_CHAR = {'e', '0', '1', '2'}
# For Unary Char
UNARY = {"*"}
# For Binary Char
BINARY = {".": DotTree, "|": BarTree}


def is_regex(s):
    """
    (str) -> bool

    This function takes in a string and checks if it is a valid regex.
    It returns true if the string is a valid regex and false if the string
    is not a valid regex

    >>>is_regex('e')
    True

    >>>is_regex('0')
    True

    >>>is_regex('1')
    True

    >>>is_regex('2')
    True

    >>>is_regex('v')
    False

    >>>is_regex('a')
    False

    >>>is_regex('e*')
    True

    >>>is_regex('0*')
    True

    >>>is_regex('1*')
    True

    >>>is_regex('2*')
    True

    >>>is_regex('(e*)')
    True

    >>>is_regex('(0*)')
    True

    >>>is_regex('(1*)')
    True

    >>>is_regex('(2*)')
    True

    >>>is_regex('(0|1)')
    True

    >>>is_regex('(1|2)')
    True

    >>>is_regex('(0.1)')
    True

    >>>is_regex('(e*|(1.2))')
    True

    >>>is_regex('(e*.1.3')
    False
    """

    # Use Try except because a possible index error is raised iff s is not a
    # regex
    try:
        # Base case if length is 1
        if len(s) == 1:
            # Check if s is in SINGLE_CHAR
            return s in SINGLE_CHAR

        # Case where star tree is used
        # Example of e* or 1*
        elif s[-1] in UNARY:
            # Check if the regex holds for the string before s[-1]
            return is_regex(s[:-1])

        # If s is in brackets
        elif s[0] == "(" and s[-1] == ")":
            # We use try to copensate for the use of splicer
            # splicer expects to have a binary operation within the brackets
            try:
                # Store the left and right statements and the binary operation
                (left, operation, right) = splicer(s)

            # If error is raised
            except Exception:
                # Check if the error was raised due to having a non-binary
                # operation within a bracket
                return is_regex(s[1:-1])

            # Check if the operation is a valid Binary Operation
            # Check if the left statement is_regex
            # Check if the right statement is_regex
            return(operation in BINARY) and (is_regex(left)) and (is_regex(right))

        # If s does not match any of the top cases then return false
        else:
            return False
    # If s raises an exception then return False
    except Exception:
        return False


def splicer(s):
    """
    (str) -> (str,str,str)
    This function splices the string s on account of the binary operator
    and then returns a tuple in the form of (left expression, binary operator, right expression)

    >>>splicer('(2|e)')
    ('2','|','e')

    >>>splicer('((2|e).(e*|1))')
    ('(2|e)','.','(e*|1)')

    >>>splicer('((2|e)|(e*.1))')
    ('(2|e)','|','(e*.1)')

    >>>splicer('((2|e).(e*|1)*)')
    ('(2|e)','.','(e*|1)*')

    REQ: s[0] == '(' and s[-1] == ')'
    """

    # Remove parentheses
    s = s[1:-1]

    # Find the operation index
    index = find_operation_index(s)

    left = s[:index]
    operation = s[index]
    right = s[(index + 1):]
    return (left, operation, right)


def find_operation_index(s):
    """
    (str) -> int
    This function takes in a string and returns the operation of that particular string

    >>>find_operation_index('13.23')
    2

    >>>find_operation_index('13|23')
    2

    >>>find_operation_index('(1.3).(2|3)')
    5

    REQ:s[0] != '(' and s[-1] != ')'
    """

    # If string is empty return 0
    if not(s):
        return 0

    # Make a bool to check if the operation is found
    found = False
    # Create a counter equal to 0
    counter = 0

    # As long as operation is not found and counter is less than len(s)
    while not(found) and (counter < len(s)):
        # If the character is (
        if(s[counter] == '('):
            # Make the counter skip the expression in prantheses
            counter = find_end_of_parentheses(s, counter)

        # If the operator is a binary operator
        elif(s[counter] in BINARY):
            # Make found equals to true to break the loop
            found = True

        # Increment since no bracket or operation was found
        else:
            counter += 1

    return counter


def find_end_of_parentheses(s, index):
    """
    (str, int) -> int

    This function takes in a string s and a int index
    and returns the index where the bracket ends

    >>>find_end_of_parentheses('(1)',0)
    2

    >>>find_end_of_parentheses('(1)(())',3)
    6

    >>>find_end_of_parentheses('(1*3(((((((()))))))))',11)
    12


    REQ:s[index] == '('
    """
    # Make parentheses equals to one
    parentheses = 1

    # Staer the index after the bracket
    char = index + 1

    # As long as the matching left parentheses is not found
    # And char is less than the length of the string
    while (parentheses != 0) and (char < len(s)):
        # If there is a left parentheses then add to parentheses
        if(s[char] == '('):
            parentheses += 1
        # If there is a right parentheses then deduct from parentheses
        elif(s[char] == ')'):
            parentheses -= 1

        # Increment char to go through list
        char += 1

    # Return the index where the expression ends in the bracket
    return char


def build_regex_tree(regex):
    """
    (str) -> object
    This function takes in a regex and returns the root of the
    tree node. It returns None if the regex is not valid.

    >>>build_regex_tree("0")
    Leaf('0')

    >>>build_regex_tree("1")
    Leaf('1')

    >>>build_regex_tree("2")
    Leaf('2')

    >>>build_regex_tree("e")
    Leaf('e')

    >>>build_regex_tree("1*")
    StarTree(Leaf('1'))

    >>>build_regex_tree("(1|2)")
    BarTree(Leaf('1'), Leaf('2'))

    >>>build_regex_tree("(e.2)")
    DotTree(Leaf('e'), Leaf('2'))

    >>>build_regex_tree("(1|(0.2)*)")
    BarTree(Leaf('1'), StarTree(DotTree(Leaf('0'), Leaf('2'))))

    >>>build_regex_tree("(()")
    None

    >>>build_regex_tree("(1.(e*|(1*|2)))")
    DotTree(Leaf('1'), BarTree(StarTree(Leaf('e')), BarTree(StarTree(Leaf('1')), Leaf('2'))))

    """
    # If the regex is not correct return None
    if(not(is_regex(regex))):
        return None

    # If the length is one then return the leaf of the particular SINGLE_CHAR
    if(len(regex) == 1):
        return Leaf(regex)

    # If the last char is a Star, Create a star tree
    elif(regex[-1] == '*'):
        # Make the child equal to the rest of the regex
        return StarTree(build_regex_tree(regex[:-1]))

    # If regex has a bracket
    else:
        # Check if the expression in the bracket requires a Binary Tree
        try:
            # Get the left expression, operation and the right expression
            (left, operation, right) = splicer(regex)

        # If error raised check if it was a StarTree or a Leaf
        except Exception:
            # Remove Brackets
            return build_regex_tree(regex[1:-1])
        # Get the correct corresponding tree object
        tree = BINARY[operation]
        # Build the tree, also make the left and right children into trees
        return tree(build_regex_tree(left), build_regex_tree(right))


def regex_match(r, s):
    """
    (obj,str) -> bool

    This function takes in a regex root and a string
    and checks if the string matches the conditions
    put in by the regex root r

    >>>a = build_regex_tree("1")
    >>>regex_match(a,"1")
    True
    >>>regex_match(a,"12")
    False

    >>>a = build_regex_tree("2*")
    >>>regex_match(a,"")
    True
    >>>regex_match(a,"2")
    True
    >>>regex_match(a,"22222222222222")
    True
    >>>regex_match(a,"2222222222222222222221)
    False

    >>>a = build_regex_tree("(1|0)")
    >>>regex_match(a,"")
    True
    >>>regex_match(a,"1")
    True
    >>>regex_match(a,"0")
    True
    >>>regex_match(a,"2")
    False

    >>>a = build_regex_tree("(1.2)")
    >>>regex_match(a,"12")
    True
    >>>regex_match(a,"1")
    False
    >>>regex_match(a,"01")
    False
    >>>regex_match(a,"2")
    False

    REQ: r must be Leaf or BarTree or DotTree or StarTree
    """
    # Base Case if root is leaf
    if(isinstance(r, Leaf)):
        # Get the value of leaf
        leaf_val = r.get_symbol()
        # Return False if len(s) is bigger than one
        if (len(s) > 1):
            return False
        # If leaf_val is 0,1,2 then check if s == leaf_val
        elif(leaf_val in {'0', '1', '2'}):
            return s in leaf_val
        # If leaf_val is e then check if s is empty
        else:
            return len(s) == 0
    elif(isinstance(r, StarTree)):
        # Empty strings return True
        if(s == ""):
            return True

        elif(isinstance(r.get_child(), Leaf)):

            # Get the value of the Leaf
            leaf_val = r.get_child().get_symbol()
            # Check each string if it matches
            for i in s:
                # If string doesn't match return False
                if i != leaf_val:
                    return False

            # Return True if everything matches
            return True

        # Check if child is StarTree
        elif(r.get_child() is StarTree):
            return regex_match(r.get_child(), s)

        # If child is dot tree or bar tree
        else:
            # First, find pattern by going through the string
            for i in range(len(s)):
                # Get each substring starting at 2 to the end
                substring = s[0:i + 1]
                # Get the total occurances
                occurances = s.count(substring)

                # Since * is just a pattern, then substring * occurances == s
                if len(occurances * substring) == len(s):
                    # Return regex_match of the child
                    return regex_match(r.get_child(), substring)

    # If the root is a BarTree
    elif(isinstance(r, BarTree)):
        # Get the left child
        left = r.get_left_child()
        # Get the right child
        right = r.get_right_child()
        # Return the regex_match of left or right
        return (regex_match(left, s)) or (regex_match(right, s))

    # If the root is a DotTree
    elif(isinstance(r, DotTree)):
        # Get the left child
        left = r.get_left_child()
        # Get the right child
        right = r.get_right_child()

        # Check if the left char and right char matches the DotTree conditions
        # ex '12' iff 1.2
        for i in range(len(s) + 1):
            # Run through each char match the left and right char
            check_if_match = regex_match(
                left, s[
                    :i]) and regex_match(
                right, s[
                    i:])
            # If check_if_match is true then than return true
            if check_if_match:
                return True
        return False


def all_regex_permutations(s):
    """
    (str) -> set of str
    This function takes in a string and gives out all the permutations of
    the string that are valid regex

    >>>all_regex_permutations('1')
    {'1'}

    >>>all_regex_permutations('e')
    {'e'}

    >>>all_regex_permutations('*e')
    {'e*'}

    >>>all_regex_permutations('')
    set()

    >>>all_regex_permutations('1*2()|')
    {'(2|1*)', '(1|2*)', '(1*|2)', '(1|2)*', '(2*|1)', '(2|1)*'}


    all_regex_permutations('(1|2().0)')
    {'((2.0)|1)', '(0|(1.2))', '(0.(2|1))', '(1|(0.2))',
    '((2|0).1)', '(2|(0.1))', '((0.2)|1)', '((2|1).0)',
    '((1.0)|2)', '((1.2)|0)', '((0|2).1)', '((0|1).2)',
    '((1|2).0)', '(0.(1|2))', '((2.1)|0)', '(2.(1|0))',
    '(1|(2.0))', '((0.1)|2)', '(0|(2.1))', '(1.(0|2))',
    '(1.(2|0))', '(2|(1.0))', '(2.(0|1))', '((1|0).2)'}

    all_regex_permutations('(1|2(.0)')
    set()
    """
    # Get all the possible string permutations
    candidates = permutations(s)

    # Create a result var
    result = set()

    # Check if the candidate is a valid regex
    for i in candidates:
        # If valid then add to the result
        if is_regex(i):
            result.add(i)

    return result


def permutations(s):
    """
    (str) -> set of str
    This function creates all the permutations of a string

    >>>permutations('')
    {''}

    >>>permutations('a')
    {'a'}

    >>>permutations('ab')
    {'ba','ab'}

    >>>permutations('abc')
    {'abc','acb','bca','bac','cab','cba'}

    """
    # If the length of s is <= 1 then return the str itself
    if(len(s) <= 1):
        return set(s)

    # If the length of s is 2 then return s[0]+s[1] and s[1]+s[0]

    # Any other length
    else:
        # Get the permutations of the letters after s[0]
        permutation = permutations(s[1:])
        # Store the First letter
        char = s[0]
        # Create a result var
        result = set()

        # Algorithm: move char to each index while going through each permutation of the rest of the letters
        # Go through each permutation
        for perm in permutation:
            # Now go through each index level
            # Move char to different index levels for each permutation
            for i in range(len(perm) + 1):
                # Add the permutation to the result set
                result.add(perm[:i] + char + perm[i:])

        return result
