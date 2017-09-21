class InvalidRegex(Exception):
    def __str__(self):
        return 'Invalid regular expression'


def is_regex(s):
    '''(str) -> bool
    Returns True if the given string is a valid regular expression, otherwise
    returns False.
    >>> is_regex("(1.0)*")
    True
    '''
    # stores if a term was found before the current item
    prev = False
    result = True
    # stores the current term (between operator and bracket)
    r = ''
    # ensures the number of brackets are correct
    bracket = 0

    # goes over every element of s
    for i in s:
        # returns False as soon as the first violation of regex is encountered
        if not result:
            return result

        # brackets add to the total bracket count and reset the term r
        if i == '(':
            bracket += 1
            r = ''

        # operators and closed brackets reset the term r
        elif i in ('|', '.', ')'):
            # if the term till that point isn't a valid term or there is no
            # valid term beforehand
            if not valid_expression(r) and not prev:
                result = False
                r = ''

            # if a closed bracket is encountered, total bracket count is
            # decreased by one and prev is stored as positive, showing that
            # a star is possible because a term was encountered
            if i == ')' and r not in ('', '120e'):
                bracket -= 1
                prev = True
            else:
                prev = False
                r = ''
        # if i is a valid regex expression, adds it to the current term
        elif i in ('012e*'):
            r += i

        # if i isn't a valid regular expression, the string fails the test
        else:
            result = False

        # if at any time, a closed bracket is identified without an earlier
        # open bracket, the test is failed
        if bracket < 0:
            result = False

    # returns True only if the criteria are met, all open brackets have a
    # closed counterpart and all terms are either operators or 012e
    return (result and bracket == 0 and valid_expression(r))


def all_regex_permutations(s):
    '''(str) -> set
    Given a string, returns a set of permutations of the string that are also
    valid regular expressions
    >>> all_regex_permutations("(1.2)*)
    {(1.2)*, (2.1)*}
    '''
    valid_perms = []

    # creates all possible permutations of s, then checks whether each is a
    # valid regex and returns only the valid ones.
    for i in perms(s):
        if is_regex(i):
            valid_perms.append(i)

    return valid_perms


def regex_match(r, s):
    '''(Tree, str) -> bool
    Returns True if the tree rooted at r matches the string s, otherwise
    returns False.
    >>> regex_match(StarTree(BarTree(Leaf('2'), Leaf('0'))), '(2|0)*')
    True
    '''

    left_result = True
    right_result = True

    # checks every elements of the given s against the tree
    for i in s:
        # if leaf is reached, its contents are matched
        if type(r) is Leaf:
            if i != r._symbol:
                return False
        # if intermediary trees are reached, they are traversed until
        # leaf is reached
        elif r._children[0] is not None:
            left_result = regex_match(r._children[0], i)
        elif r._children[1] is not None:
            right_result = regex_match(r._children[1], i)

    # returns true only if string is matched
    return (left_result and right_result)


def build_regex_tree(regex):
    '''(regex) -> Tree
    Given a valid regular expression, builds a regex tree and returns its root.
    >>> build_regex_tree('(2.0)')
    DotTreeHead
    '''

    # if an invalid regex is given, an error is raised
    if not is_regex(regex):
        raise InvalidRegex

    # convert the given regex to a list form
    regex_list = regex_to_list_converter(regex)

    # checks for the presence of stars
    if regex_list[0][0][-1] == '*':
        left = StarTree(Leaf(regex_list[0][0][0]))
    else:
        left = Leaf(regex_list[0][0])

    # checks for the presence of stars
    if regex_list[0][1][-1] == '*':
        right = StarTree(Leaf(regex_list[0][1][0]))
    else:
        right = Leaf(regex_list[0][1])

    # chooses the correct tree type
    if regex_list[1] == '|':
        root = BarTree(left, right)
    elif regex_list[1] == '.':
        root = DotTree(left, right)

    return root


def valid_expression(s):
    '''(str) -> bool
    Given an element, checks it against a list of valid regular expressions
    and returns True if it is present in the list. Returns False otherwise.
    '''
    # list of valid expressions
    valid_expressions = ('0', '1', '2', 'e', '0*', '1*', '2*')
    return (s in valid_expressions)


def regex_to_list_converter(s):
    '''
    Given a regex inside a bracket, returns the node which represents that
    regex
    '''
    # of the form [[left child, right child], operator]
    term_elements = [[], '']
    i = 0

    # continues until end of s is reached
    while i < len(s):
        # if a closed bracket is encountered, that specific term is deemed
        # to be ended and the term is returned as a list
        if s[i] == ')':
            return term_elements

        # if an open bracket is encountered, the term is recursively parsed
        elif s[i] == '(':
            term_elements[0] += (regex_to_list_converter(s[i+1:]))
            # the length of the term and the brackets (+3) are skipped in the
            # parent function
            i += len(term_elements[0][0]) + 3

        # if the element at index i is a recognized regular expression, it is
        # stored as a left or right element
        elif s[i] in ('012e*'):
            term_elements[0].append(s[i])
            # the index is advanced by 1
            i += 1

        # if the element is a known operator, it is stored as such
        elif s[i] in ('.|'):
            term_elements[1] = s[i]
            i += 1

    # attaches star to the regular expression if it is present
    for i in range(len(term_elements[0][0]) - 1):
        try:
            if term_elements[0][0][i+1] == '*':
                term_elements[0][0][i] += term_elements[0][0].pop(i+1)
        except IndexError:
            pass

    return term_elements[0]


def perms(s):
    '''
    (str) -> list
    Given a string s, returns all of its possible permutations.
    >>>perms('cat')
    ['cat', 'act', 'atc', 'cta', 'tca', 'tac']
    >>>perms('wooo')
    ['wooo', 'owoo', 'oowo', 'ooow']
    '''

    if len(s) > 1:
        # recursively continues until simplest case of 1 letter in list
        currList = perms(s[1:])

        # stores the list of permutations after current letter is added
        newList = []
        for item in currList:
            # finds all possible permutations of given letter and all
            # permutations obtained thus far
            newEntry = perms_helper(s[0], item)
            for permutation in newEntry:
                if permutation not in newList:  # checks for repetition
                    newList.append(permutation)
        return newList
    elif len(s) == 1:
        return [s[0]]  # if there is only one letter in the string, simply
    # returns this letter
    else:
        return []  # return empty list if empty string given


def perms_helper(letter, oldString):
    '''
    (str, str) -> list of str
    Given a letter and a string, returns a list containing the letter
    inserted at all points in the string. Does not return repetitions.
    >>>perms_helper('a', 'bnnn')
    ['abnnn', 'bannn', 'bnann', 'bnnan', 'bnnna']
    >>>perms_helper('o', 'll')
    ['oll', 'lol', 'llo']
    '''
    finalList = []
    # inserts before and after every character in the given string
    for index in range(len(oldString)+1):

        # inserting letter at index
        newString = oldString[0:index] + letter + oldString[index:]

        # avoids checking empty list for repetition
        if len(finalList) > 0:

            if finalList[-1] != newString:
                finalList.append(newString)
        else:
            finalList.append(newString)
    return finalList
