"""
# Copyright Nick Cheng, Brian Harrington, Danny Heap, Babatope Adebayo 2013,
# 2014, 2015, 2016
# Distributed under the terms of the GNU General Public License.
#
# This file is part of Assignment 2, CSCA48, Winter 2016
#
# This is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This file is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this file.  If not, see .
"""

# Do not change this import statement, or add any of your own!
from regextree import RegexTree, StarTree, DotTree, BarTree, Leaf

# Do not change anything above this comment except for the copyright
# statement

# Student code below this comment.


def perms_helper(s):
    '''(string) -> list of string
    a helper function for all_regex_permutations
    '''
    # base case: length less than 1
    if len(s) <= 1:
        return [s]
    i = 0
    # empty list to store output
    res = []
    # while i is in range of imdex of the string
    while i < len(s) - 1:
        a = perms_helper(s[:i+1])
        b = perms_helper(s[i+1:])
        # iterate through elements
        for x in perms_helper(s[:i] + s[i+1:]):
            # if new permutation isnt already one
            if s[i] + x not in res:
                res.append(s[i] + x)
            # if new permutation isnt already one
            if x + s[i] not in res:
                res.append(x + s[i])
        # increment
        i += 1
    return res

def match_helper(s):
    '''(string) -> list of string
    a helper function for regex_match
    '''
    # base cases: length is one or two
    if len(s) == 1:
        return [[s]]
    if len(s) == 2:
        return ([[s[0], s[1]]])

    # empty lidt to store output
    res = []
    # recurse from second element
    x = match_helper(s[1:])
    # iterate through elements of x
    for a in x:
        # if concatenation of first element of s and a isnt already in res, add it
        if [s[0]] + a not in res:
            res.append([s[0]] + a)

        # assign a new value to first element of a
        a[0] = s[0] + a[0]
        # if a isnt already in res, add it
        if a not in res:
            res.append(a)

    # recurse up to last element
    x = match_helper(s[:-1])
    # iterate through elements of a
    for a in x:
        # if concatenation of a and last element of s isnt already in res, add it
        if a + [s[-1]] not in res:
            res.append(a + [s[-1]])
        # assign a new value to the last element of a
        a[-1] = a[-1] + s[-1]
        # if a isnt already in res, add it
        if a not in res:
            res.append(a)    
    return res

def is_regex(s):
    '''(string) -> bool
    takes a string s as input and returns True if said string is
    a valid regular expression otherwise returns False
    >>> is_regex('1')
    True
    >>> is_regex('0|2*')
    True
    >>> is_regex('q')
    False
    '''
    # base case: if s is one of the valid length 1 regexes
    if s in ['0', '1', '2', 'e']:
        return True
    # if it ends with star check if all but the last element is a regex
    if s.endswith('*'):
        return is_regex(s[:-1])
    # if it starts or ends with a parenthesis and has length greater than 5
    if s.startswith('(') and s.endswith(')') and len(s) >= 5:
        i = len(s) - 3
        while i > 1:
            # if an element is bar or dot and the rest is a regex
            if s[i] in ['.', '|'] and is_regex(s[1:i]) and is_regex(s[i+1:-1]):
                return True
            # decrement
            i -= 1
    return False

def all_regex_permutations(s):
    '''(string) -> list of string
    takes a string as input and returns a list of permutations that are
    valid regex expressions
    >>> all_regex_permutations('1|1')
    ['1|1']
    >>> all_regex_permutations('2|2')
    ['2|2']
    >>> all_regex_permutations('0|0')
    ['0|0']

    # empty list to store output
    res = []
    # iterate through output of helper function
    for r in perms_helper(s):
        # if the element is a valid regex, add it to thr output list
        if is_regex(r):
            res.append(r)
    # return output string
    return res

def regex_match(r, s):
    '''(RegexTree, string) -> bool
    returns true iff s matches the regular expression rooted at r
    '''

    # base cases:
    # if the symbol in the node is e and the string is empty return True
    if r.get_symbol() == 'e' and s == '':
        return True
    # if the symbol at the node is s and s is one of 0, 1 or 2 return True
    if r.get_symbol() == s and r.get_symbol() in ['0', '1', '2']:
        return True
    # if the symbol at the node is * and s is empty return True
    if r.get_symbol() == '*' and s == '':
        return True    

    # if the symbol st given node is *
    if r.get_symbol() == '*':
        # if the children of the given node abd the string match return True
        if regex_match(r.get_children()[0], s):
            return True
        # set a to output of helper function
        a = match_helper(s)
        # iterate through elements of a as x
        for x in match_helper(s):
            i = 0
            # iterate through elements of x as y
            for y in x:
                # if children of node and y match, increment
                if regex_match(r.get_children()[0], y):
                    i += 1
            # if x has only one element return True
            if i == len(x):
                return True

    # if symbol at given node is bar, recurse from 0 or 1
    if r.get_symbol() == '|':
        return (regex_match(r.get_children()[0], s) 
                or regex_match(r.get_children()[1], s))

    # if symbol at given node is dot
    if r.get_symbol() == '.':
        i = len(s) - 1
        while i >= 0:
            if (regex_match(r.get_children()[0], s[:i]) 
                and regex_match(r.get_children()[1], s[i:])):
                return True
            i -= 1
    return False

def build_regex_tree(regex):
    '''(string) -> RegexTree, list
    takes a valid regular expression string and builds the corresponding regular 
    expression tree and returns its root
    REQ: Input must be valid regex string
    '''
    # base case: if its a regex of length one
    if regex in ['0', '1', '2', 'e']:
        return RegexTree(regex, [])
    # if the regex string ends with *, make it the root
    if regex.endswith('*'):
        return RegexTree('*', [build_regex_tree(regex[:-1])])
    i = len(regex) - 3
    # while loop
    while i > 1:
        # if element of regex is bar or dot and the elements before and after are valid
        if (regex[i] in ['.', '|'] and is_regex(regex[1:i]) 
            and is_regex(regex[i+1:-1])):
            # return tree and root
            return RegexTree(regex[i], [build_regex_tree(regex[1:i]), 
                                        build_regex_tree(regex[i+1:-1])])
        # decrement
        i -= 1
