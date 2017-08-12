"""
# Copyright Nick Cheng, Brian Harrington, Rishav Adhikari
# Danny Heap, 2013, 2014, 2015, 2016
# Distributed under the terms of the GNU General Public License.
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

# symbols of all Regex symbols
REGEX_SYMBOLS = {'0', '1', '2','e', '|','.', '*','(', ')'}
# len one regexes
REGEX_LEN_ONE = {'0', '1', '2', 'e'}
# Operations that can be done on a REGEX
REGEX_OPER = {'.', '|'}
def is_regex(s):
    '''
    (string) -> bool

    Take in a string variable and determine whether is a valid regex expression.
    Return True if it is and False if it is not.

    REQ: len(s) > 0
    s is NOT an empty string
    
    Example:
    >>>is_regex('0')
    True
    >>>is_regex('1*')
    True
    >>>is_regex('not a regex')
    False
    >>>is_regex('10103')
    False
    >>>is_regex('(1|2).(1*.2*)*')
    True
    '''
    # Base Case:
    if len(s) == 0:
        word = False
    # Base Case 2:
    elif len(s) == 1:
        word = (s in REGEX_LEN_ONE)
    # Recursive Step:
    else:
        # Check to see if there is a left and right paranthesis.
        lefty = s.count('(')
        righty = s.count(')')
        if lefty != righty:
            word = False
        else:
            if '*' in s:
                star_condition = conditioner(s,'*')
    return word

def conditioner(given_word, var):
    '''
    (string, string) -> bool
    REQ: var in word == True

    Given a word and a REGEX symbol, check to see if that symbol
    meets the condition for that symbol to be
    there.

    Ex:
    >>>conditioner('(2.2)*', '*')
    True
    >>>conditioner('(*)', '*')
    False
    '''
    # holding variable for given word so we can work with it more easily
    word = given_word
    # For star expressions:
    if var == '*':
        count_var = word.count(var)
        var_a = word.index(var)
        for i in range(len(word)-1):
            if i == 0:
                return False
            else:
                if '(*' in word:
                    return False
                else:
                    if word[i-1] in 


def all_regex_permutations(s):
    '''
    (string) -> set of string

    Given a string, produce the set of permutations of s
    that are valid regular expressions.
    
    REQ:
    Example:
    '''
    # First check to see if S is a valid regex
    if is_regex(s):
        all_perms = list(perms(s))
        regex_perms = set()
        for i in all_perms:
            if is_regex(i):
                regex_perms.add(i)
    else:
        regex_perms = set()
    return regex_perms
    
def perms(s):
    '''
    (string) -> int
    Given a string variable s, return a set of all possible permutations of the
    letters in s.
    example:
    >>>perms("")
    {""}
    >>>perms("abc")
    {"abc", "acb", "bac", "bca", "cab", "cba"}
    '''
    # empty list to add permutations onto
    perm_list = [s]
    length_str = len(s)
    if len(s) < 2:
        # if s is just one character or none, then return a set with s in it
        return {s}
    elif len(s) == 2:
        # if s has two letters, add s[-1] + s[0] to perm_list iff s[0] != s[-1]
        if s[0] == s[-1]:
            perm_list.append(s)
        else:
            perm_list.append(s[-1] + s[0])
    else:
        for permuting in perms(s[1:]):
            for j in range(length_str):
                # add the characters back into perm_list
                perm_list.append(permuting[:j] + s[0] + permuting[j:])
    # change perm_list into a set so duplicates are removed
    return set(perm_list)


def regex_match(r, s):
    '''
    (RegexTree)
    Given a regular expression tree rooted at r, and a string s.
    Return True if and only if the given string s
    matches the regular expression tree rooted at r. False otherwise.
    '''
    pass

def build_regex_tree(regex):
    '''
    (string) -> RegexTree

    Given a regular string expression regex, create the RegexTree for that
    expression and return the root.
    '''
    pass